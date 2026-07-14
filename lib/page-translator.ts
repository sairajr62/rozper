"use client"

import { LOCALE_CODES } from "./locale"

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "CODE", "PRE", "NOSCRIPT"])
const STORAGE_PREFIX = "ld_tx_"

let txMapCache: Record<string, string> | null = null
let ssrTranslatedValuesCache: Set<string> | null = null

function getTxMap(): Record<string, string> {
  if (txMapCache) return txMapCache
  txMapCache = (typeof window !== "undefined" && (window as unknown as { __LD_TX__?: Record<string, string> }).__LD_TX__) || {}
  return txMapCache
}

/** Guards against re-translating text that was already translated server-side (would otherwise double-translate/corrupt it). */
function getSsrTranslatedValues(): Set<string> {
  if (ssrTranslatedValuesCache) return ssrTranslatedValuesCache
  ssrTranslatedValuesCache = new Set(Object.values(getTxMap()))
  return ssrTranslatedValuesCache
}

export function isSsrTranslated(): boolean {
  return typeof window !== "undefined" && Boolean((window as unknown as { __LD_SSR_LANG__?: string }).__LD_SSR_LANG__)
}

export function getSsrLocale(): string | null {
  if (typeof window === "undefined") return null
  return (window as unknown as { __LD_SSR_LANG__?: string }).__LD_SSR_LANG__ ?? null
}

function isTranslatableNode(node: Node): node is Text {
  if (node.nodeType !== Node.TEXT_NODE) return false
  const text = node.textContent?.trim()
  if (!text || !/[a-zA-ZÀ-￿]/.test(text)) return false
  const parent = node.parentElement
  if (!parent) return false
  if (SKIP_TAGS.has(parent.tagName)) return false
  if (parent.closest("[data-no-translate]")) return false
  return true
}

function collectTextNodes(root: ParentNode): Text[] {
  const walker = document.createTreeWalker(root as Node, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let n: Node | null
  while ((n = walker.nextNode())) {
    if (isTranslatableNode(n)) nodes.push(n as Text)
  }
  return nodes
}

function localStorageGet(text: string, locale: string): string | null {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${locale}:${text}`)
  } catch {
    return null
  }
}

function localStorageSet(text: string, locale: string, translated: string) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${locale}:${text}`, translated)
  } catch {
    // storage full or unavailable — safe to ignore, just skip caching
  }
}

async function fetchTranslations(texts: string[], locale: string): Promise<Record<string, string>> {
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts, locale }),
    })
    if (!res.ok) return {}
    const data = (await res.json()) as { translations?: Record<string, string> }
    return data.translations ?? {}
  } catch {
    return {}
  }
}

/**
 * Synchronously repairs text nodes that React's hydration reverted back to
 * English. React reconciles server-rendered text against its own (English)
 * virtual DOM on mount — any text node whose SSR-translated content differs
 * from what React expects gets silently overwritten with the English version
 * during hydration, undoing the SSR proxy's translation. Since the original
 * translation is already known (the `window.__LD_TX__` bootstrap map injected
 * by the SSR proxy), this instantly restores it with zero network calls,
 * instead of waiting on an async re-fetch that would flash English first.
 */
export function repairFromTxMap(root: ParentNode, locale: string): void {
  if (!locale || locale === "en") return
  const txMap = getTxMap()
  if (Object.keys(txMap).length === 0) return
  const ssrValues = getSsrTranslatedValues()

  const nodes = collectTextNodes(root)
  for (const node of nodes) {
    const raw = node.textContent ?? ""
    const trimmed = raw.trim()
    if (!trimmed || ssrValues.has(trimmed)) continue // already correct
    const known = txMap[trimmed]
    if (known) node.textContent = raw.replace(trimmed, known)
  }
}

/**
 * Translates all translatable text nodes under `root` for the given locale.
 * Checks the SSR bootstrap map (never re-translate, and instantly repairs
 * anything hydration reverted) and localStorage (avoid refetching) before
 * hitting the client translate API. Intended for genuinely new dynamic DOM
 * not covered by SSR (menus, modals, client-only content).
 */
export async function translateDOM(root: ParentNode, locale: string): Promise<void> {
  if (!locale || locale === "en") return
  const nodes = collectTextNodes(root)
  if (nodes.length === 0) return

  const ssrValues = getSsrTranslatedValues()
  const txMap = getTxMap()
  const needed: string[] = []
  const nodesByText = new Map<string, Text[]>()

  for (const node of nodes) {
    const raw = node.textContent ?? ""
    const trimmed = raw.trim()
    if (ssrValues.has(trimmed)) continue // already correct

    const knownFromSsr = txMap[trimmed]
    if (knownFromSsr) {
      node.textContent = raw.replace(trimmed, knownFromSsr)
      continue
    }

    const cached = localStorageGet(trimmed, locale)
    if (cached) {
      node.textContent = raw.replace(trimmed, cached)
      continue
    }

    if (!nodesByText.has(trimmed)) {
      nodesByText.set(trimmed, [])
      needed.push(trimmed)
    }
    nodesByText.get(trimmed)!.push(node)
  }

  if (needed.length === 0) return

  const translations = await fetchTranslations(needed, locale)
  for (const [original, targetNodes] of nodesByText) {
    const translated = translations[original]
    if (!translated) continue
    for (const node of targetNodes) {
      node.textContent = (node.textContent ?? "").replace(original, translated)
    }
    localStorageSet(original, locale, translated)
  }
}

const LOCALE_PREFIX_RE = new RegExp(`^/(${LOCALE_CODES.join("|")})(/|$)`)

/**
 * Rewrites internal `<a href="/...">` links under `root` to carry the given
 * locale prefix, so browsing stays within the active language. Skips any
 * anchor inside a `[data-no-translate]` subtree (e.g. the language switcher,
 * whose links intentionally point to a *different* locale).
 */
export function rewriteLinks(root: ParentNode, locale: string): void {
  if (!locale || locale === "en") return
  const anchors = root.querySelectorAll<HTMLAnchorElement>("a[href^='/']")
  anchors.forEach((a) => {
    if (a.closest("[data-no-translate]")) return
    const href = a.getAttribute("href") ?? ""
    if (!href.startsWith("/") || href.startsWith("//")) return
    if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return
    const stripped = href.replace(LOCALE_PREFIX_RE, "/")
    const next = `/${locale}${stripped === "/" ? "" : stripped}`
    a.setAttribute("href", next)
  })
}

/** Updates document.title / meta description client-side if a route transition ever needs it (SSR already handles the initial load). */
export function translateMetaTags(locale: string, translatedTitle?: string, translatedDescription?: string): void {
  if (!locale || locale === "en") return
  if (translatedTitle) document.title = translatedTitle
  if (translatedDescription) {
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute("content", translatedDescription)
  }
}

export function markSsrTranslated(root: ParentNode): void {
  if (root instanceof Element) root.setAttribute("data-ssr-translated", "true")
}
