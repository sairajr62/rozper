import { serverTranslateBatch } from "./server-translator"
import { isRTL } from "./translate"

// Tags whose content must never be re-tokenized: script/style content is raw
// text that can contain arbitrary "<"/">" characters (e.g. Next.js's RSC
// flight-data payload, which embeds the ALREADY-translated title/meta as a
// serialized string for client hydration). A naive tag-token regex applied
// to that raw text gets desynced by those stray characters, "closes" the
// skip region early, and re-sends the already-translated text through
// translation a second time — corrupting it. So these tags are treated as
// fully opaque blocks located by a literal `</tagname>` string search, never
// re-parsed for nested tags at all.
const RAW_TEXT_TAGS = new Set(["script", "style", "textarea", "noscript"])
// "title" is included because Next.js streams async-resolved metadata
// (generateMetadata depends on our translate calls, so it can't render
// synchronously in the initial <head>) as literal <title>/<meta> elements
// near the end of the body stream, to be hoisted into <head> client-side
// after hydration. Since that title text is the ALREADY-translated value,
// treating it like any other body text re-sends it through translation a
// second time, corrupting it (e.g. "California" -> "Laboratory" in Hindi).
// <meta> itself is a void element (no text content, only attributes) so it
// needs no special handling here.
const SKIP_TAGS = new Set(["script", "style", "textarea", "code", "pre", "noscript", "title"])

function isWhitespaceOrSymbolsOnly(text: string): boolean {
  return !/[a-zA-ZÀ-￿]/.test(text)
}

function getTagName(tag: string): string {
  const m = tag.match(/^<\/?\s*([a-zA-Z0-9-]+)/)
  return m ? m[1].toLowerCase() : ""
}

function isClosingTag(tag: string): boolean {
  return tag.startsWith("</")
}

function isCommentOrDoctype(tag: string): boolean {
  return tag.startsWith("<!")
}

function isSelfClosing(tag: string): boolean {
  return tag.endsWith("/>") || /^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\b/i.test(tag)
}

function tagHasNoTranslate(tag: string): boolean {
  return /data-no-translate/.test(tag)
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
}

function encodeHtmlEntities(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

/**
 * Walks the HTML by explicit index (not a regex split) so raw-text elements
 * (script/style/etc.) can be jumped over as opaque blocks via a literal
 * closing-tag search, immune to stray "<"/">" characters in their content.
 * `onText(text, skipping)` is called for every text run between tags.
 * `onTag(tag)` is called for every tag/comment token verbatim, in order —
 * the caller is responsible for emitting it unchanged when rebuilding.
 */
function walkHtml(html: string, onText: (text: string, skipping: boolean) => void, onTag?: (tag: string) => void): void {
  const skipStack: boolean[] = []
  let i = 0
  const len = html.length

  while (i < len) {
    if (html[i] === "<") {
      const tagEnd = html.indexOf(">", i)
      if (tagEnd === -1) {
        onText(html.slice(i), skipStack.some(Boolean))
        break
      }
      const tag = html.slice(i, tagEnd + 1)
      onTag?.(tag)

      if (isCommentOrDoctype(tag)) {
        i = tagEnd + 1
        continue
      }

      const name = getTagName(tag)

      if (isClosingTag(tag)) {
        skipStack.pop()
        i = tagEnd + 1
        continue
      }

      if (isSelfClosing(tag)) {
        i = tagEnd + 1
        continue
      }

      if (RAW_TEXT_TAGS.has(name)) {
        // Opaque block: find the LITERAL closing tag by index search (no
        // slicing/re-tokenizing the content), immune to stray "<"/">" inside it.
        const closeTag = `</${name}>`
        const closeIdx = html.indexOf(closeTag, tagEnd + 1)
        const rawEnd = closeIdx === -1 ? len : closeIdx
        onText(html.slice(tagEnd + 1, rawEnd), true) // skipping=true, never translated
        if (closeIdx !== -1) onTag?.(closeTag)
        i = closeIdx === -1 ? len : closeIdx + closeTag.length
        continue
      }

      const skip = SKIP_TAGS.has(name) || tagHasNoTranslate(tag)
      skipStack.push(skip)
      i = tagEnd + 1
      continue
    }

    const nextTag = html.indexOf("<", i)
    const textEnd = nextTag === -1 ? len : nextTag
    onText(html.slice(i, textEnd), skipStack.some(Boolean))
    i = textEnd
  }
}

/** Collects every translatable text node in the HTML body, skipping script/style/no-translate subtrees. */
function collectTranslatableStrings(bodyHtml: string): string[] {
  const unique = new Set<string>()

  walkHtml(bodyHtml, (text, skipping) => {
    if (skipping) return
    const trimmed = text.trim()
    if (!trimmed || isWhitespaceOrSymbolsOnly(trimmed)) return
    unique.add(decodeHtmlEntities(trimmed))
  })

  return [...unique]
}

/** Rebuilds the HTML, substituting each translatable text node with its translation. */
function rebuildHtml(bodyHtml: string, translations: Map<string, string>): string {
  let out = ""

  walkHtml(
    bodyHtml,
    (text, skipping) => {
      if (skipping) {
        out += text
        return
      }
      const leadingWs = text.match(/^\s*/)?.[0] ?? ""
      const trailingWs = text.match(/\s*$/)?.[0] ?? ""
      const trimmed = text.trim()
      if (!trimmed || isWhitespaceOrSymbolsOnly(trimmed)) {
        out += text
        return
      }
      const decoded = decodeHtmlEntities(trimmed)
      const translated = translations.get(decoded)
      out += leadingWs + (translated ? encodeHtmlEntities(translated) : trimmed) + trailingWs
    },
    (tag) => {
      out += tag
    },
  )

  return out
}

/** Rewrites site-relative internal links to carry the locale prefix, e.g. href="/pricing/" -> href="/fr/pricing/". Anchors marked data-no-translate (on the anchor tag itself) are left alone. */
function localizeInternalLinks(html: string, locale: string): string {
  return html.replace(/<a\s+([^>]*?)href="(\/[^"#][^"]*)"/gi, (full, attrsBefore, href) => {
    if (/data-no-translate/.test(attrsBefore)) return full
    if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return full
    const rewritten = `/${locale}${href.startsWith("/") ? href : `/${href}`}`
    return `<a ${attrsBefore}href="${rewritten}"`
  })
}

function markHtml(html: string, locale: string): string {
  let out = html
  out = out.replace(/<html\b([^>]*)>/i, (full, attrs) => {
    let next = attrs
    if (!/\blang=/.test(next)) next += ` lang="${locale}"`
    else next = next.replace(/\blang="[^"]*"/, `lang="${locale}"`)
    if (!/data-ssr-lang=/.test(next)) next += ` data-ssr-lang="${locale}"`
    if (isRTL(locale) && !/\bdir=/.test(next)) next += ` dir="rtl"`
    return `<html${next}>`
  })
  return out
}

function injectBootstrapScript(html: string, txMap: Record<string, string>, locale: string): string {
  const script = `<script>window.__LD_TX__=${JSON.stringify(txMap)};window.__LD_SSR_LANG__=${JSON.stringify(locale)};</script>`
  if (html.includes("</body>")) return html.replace("</body>", `${script}</body>`)
  return html + script
}

/**
 * Translates the `<body>` text of a fully rendered English HTML page for the
 * given locale, rewrites internal links to carry the locale prefix, marks
 * `<html>` with `lang`/`dir`/`data-ssr-lang`, and injects the client-side
 * bootstrap data (`window.__LD_TX__`, `window.__LD_SSR_LANG__`) so hydration
 * knows this page was already translated server-side.
 */
export async function translateHtmlBody(html: string, locale: string): Promise<string> {
  if (!locale || locale === "en") return html

  const bodyMatch = html.match(/<body[^>]*>[\s\S]*<\/body>/i)
  const bodyHtml = bodyMatch ? bodyMatch[0] : html

  const strings = collectTranslatableStrings(bodyHtml)
  const translations = strings.length ? await serverTranslateBatch(strings, locale) : new Map<string, string>()

  const translatedBody = rebuildHtml(bodyHtml, translations)
  let out = bodyMatch ? html.replace(bodyMatch[0], translatedBody) : translatedBody

  out = localizeInternalLinks(out, locale)
  out = markHtml(out, locale)

  const txMap: Record<string, string> = {}
  for (const [original, translated] of translations) txMap[original] = translated

  out = injectBootstrapScript(out, txMap, locale)

  return out
}
