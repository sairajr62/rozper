"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  Link2,
  Twitter,
  Linkedin,
  Check,
  ArrowRight,
  Sparkles,
  Tag,
} from "lucide-react"
import { motion } from "framer-motion"
import type { BlogAuthor } from "@/lib/blog-api"

type TocEntry = { id: string; text: string; level: 2 | 3 }

// HTML for the inline mid-article CTA card. Inserted client-side after every
// Nth H2 in the rendered article. Kept compact so it doesn't break the
// reading flow — different framing from the big end-of-article CTA so
// readers see contextual offers, not the same one repeated.
// ── FAQ accordion transformer ────────────────────────────────────────────
// Rewrites a WordPress-rendered "FAQ" section into a native-<details>
// accordion card. Detection is loose: any H2 whose text matches /faq/i
// becomes the trigger; siblings up to the next H2 are grouped into
// Q/A pairs (Q = an H3/H4 OR a <p> ending with "?" that contains a link
// or strong tag, A = subsequent paragraphs).
const ICON_PLUS_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>'

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function buildFaqAccordion(
  title: string,
  items: { q: string; aHtml: string }[],
): string {
  const rows = items
    .map(
      (item) => `
    <details class="rozper-faq-row">
      <summary>
        <span class="rozper-faq-question">${escapeHtml(item.q)}</span>
        <span class="rozper-faq-icon">${ICON_PLUS_SVG}</span>
      </summary>
      <div class="rozper-faq-answer">${item.aHtml}</div>
    </details>`,
    )
    .join("")
  return `
    <div class="rozper-faq-accordion not-prose">
      <h2 class="rozper-faq-title" id="faqs">${escapeHtml(title)}</h2>
      <div class="rozper-faq-list">${rows}</div>
    </div>
  `.trim()
}

function transformFaqSections(article: HTMLElement) {
  const h2s = Array.from(article.querySelectorAll<HTMLHeadingElement>("h2"))
  for (const h2 of h2s) {
    const text = (h2.textContent || "").trim()
    if (!/^(faqs?|faq'?s|frequently\s+asked\s+questions?)\b/i.test(text)) {
      continue
    }

    // Walk siblings → collect Q/A pairs until next H2.
    const items: { q: string; aHtml: string }[] = []
    const toRemove: Element[] = []
    let currentQ = ""
    let currentA: string[] = []
    const flush = () => {
      if (currentQ) {
        items.push({
          q: currentQ.trim(),
          aHtml: currentA
            .map((p) => `<p>${p}</p>`)
            .join(""),
        })
      }
      currentQ = ""
      currentA = []
    }

    let cursor: Element | null = h2.nextElementSibling
    while (cursor) {
      if (cursor.tagName === "H2") break
      toRemove.push(cursor)
      const tag = cursor.tagName
      const txt = (cursor.textContent || "").trim()
      const isHeading = tag === "H3" || tag === "H4"
      const looksLikeQuestionP =
        tag === "P" &&
        txt.endsWith("?") &&
        (cursor.querySelector("a, strong, b") !== null ||
          // bare-text paragraphs that just end in "?" — still a question
          txt.length < 180)

      if (isHeading || looksLikeQuestionP) {
        flush()
        currentQ = txt
      } else if (tag === "P" && txt) {
        currentA.push(cursor.innerHTML)
      }
      cursor = cursor.nextElementSibling
    }
    flush()

    if (items.length < 2) continue // not really an FAQ — leave it alone

    const wrapper = document.createElement("div")
    wrapper.innerHTML = buildFaqAccordion("FAQs", items)
    const accordion = wrapper.firstElementChild
    if (!accordion) continue

    h2.replaceWith(accordion)
    toRemove.forEach((n) => n.remove())
  }
}

const INLINE_CTA_MARKER = "data-rozper-inline-cta"
const INLINE_CTA_HTML = `
<aside class="${INLINE_CTA_MARKER}-yes my-10 not-prose">
  <div class="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#22D3EE]/30 via-[#046BD2]/25 to-transparent">
    <div class="rounded-2xl bg-[#0A1020]/85 backdrop-blur-md p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <div class="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#046BD2] to-[#22D3EE] shadow-[0_8px_22px_-8px_rgba(34,211,238,0.55)]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-1.5">Worth a quick chat</div>
        <div class="font-display text-lg font-semibold text-white tracking-tight leading-snug">Want this mapped to your operation?</div>
        <div class="mt-1 text-sm text-[#9AA8BC] leading-relaxed">A real solutions engineer at Rozper can size the routes, regions, and rates against your traffic in under an hour.</div>
      </div>
      <a href="/contact" class="shrink-0 inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0078E0] hover:to-[#22D3EE] text-white text-sm font-medium transition-all whitespace-nowrap">
        Talk to us
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
    </div>
  </div>
</aside>
`.trim()

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60)
}

// Inject stable `id`s into the article's H2/H3 *in the HTML string itself*
// (server-safe, no DOMParser) and return the TOC entries built from them.
//
// Why string-level and not DOM mutation: the article is rendered via
// dangerouslySetInnerHTML. Mutating heading IDs in a useEffect gets wiped
// whenever React re-applies that innerHTML on a re-render, leaving the TOC
// anchors pointing at IDs that no longer exist. Baking the IDs into the
// string makes them part of the React-managed DOM, so they persist — and
// they're present in the SSR HTML too (works before hydration / for SEO).
function injectHeadingIds(html: string): {
  html: string
  toc: TocEntry[]
} {
  const toc: TocEntry[] = []
  const seen = new Set<string>()

  const stripTags = (s: string) => s.replace(/<[^>]+>/g, "")
  const decode = (s: string) =>
    s
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;|&#x27;|&rsquo;|&#8217;/g, "'")
      .replace(/&nbsp;/g, " ")

  const out = html.replace(
    /<(h2|h3)\b([^>]*)>([\s\S]*?)<\/\1>/gi,
    (full, tag: string, attrs: string, inner: string) => {
      const text = decode(stripTags(inner)).trim()
      if (!text) return full

      const idMatch = attrs.match(/\bid\s*=\s*["']([^"']+)["']/i)
      let id = idMatch?.[1] ?? ""
      if (!id) {
        const base = slugify(text) || `section-${toc.length}`
        id = base
        let n = 2
        while (seen.has(id)) id = `${base}-${n++}`
      }
      seen.add(id)
      toc.push({ id, text, level: tag.toLowerCase() === "h3" ? 3 : 2 })

      const newAttrs = idMatch ? attrs : `${attrs} id="${id}"`
      return `<${tag}${newAttrs}>${inner}</${tag}>`
    },
  )

  return { html: out, toc }
}

function ShareButtons({
  url,
  title,
  layout = "row",
}: {
  url: string
  title: string
  layout?: "row" | "col"
}) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  const links = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      Icon: Twitter,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: Linkedin,
    },
  ]

  return (
    <div className={`flex items-center gap-2 ${layout === "col" ? "flex-col items-start" : ""}`}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className="group inline-flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] text-white/65 hover:text-white hover:bg-white/[0.06] hover:border-[#22D3EE]/30 transition-colors"
        >
          <l.Icon className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] text-white/65 hover:text-white hover:bg-white/[0.06] hover:border-[#22D3EE]/30 transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}

function AuthorBio({ author }: { author: BlogAuthor }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mt-14 sm:mt-16 max-w-3xl"
    >
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 mb-5">
        <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#0086F9]" />
        About the author
      </div>
      <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="relative shrink-0">
            {author.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={author.avatar}
                alt={author.name}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-white/10"
              />
            ) : (
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center text-sm font-semibold text-white border border-white/15 shadow-[0_8px_24px_-8px_rgba(34,211,238,0.5)]">
                {author.initials}
              </div>
            )}
            <span
              aria-hidden
              className="absolute -inset-1 rounded-full -z-10"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(34,211,238,0.25), transparent 60%)",
                filter: "blur(6px)",
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <div className="font-display text-base sm:text-lg font-semibold text-white">
                {author.name}
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE]">
                Rozper Editorial
              </div>
            </div>
            {author.bio ? (
              <p className="mt-2 text-sm text-[#9AA8BC] leading-relaxed">
                {author.bio}
              </p>
            ) : (
              <p className="mt-2 text-sm text-[#9AA8BC] leading-relaxed">
                Writes about the global voice layer, AI in the contact center,
                and the operator playbooks that come out of running Rozper&apos;s
                network in production.
              </p>
            )}
            <Link
              href="/blog"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#22D3EE] hover:text-white transition-colors"
            >
              More from {author.name.split(" ")[0]}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

function PostEndCta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-14 sm:mt-20 max-w-3xl"
    >
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/30 to-transparent shadow-[0_30px_80px_-30px_rgba(4,107,210,0.55)]">
        <div className="relative rounded-3xl bg-[#0A1020]/85 backdrop-blur-md overflow-hidden p-7 sm:p-10 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[260px] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(ellipse, rgba(4,107,210,0.4) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
          <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22D3EE]/25 bg-[#22D3EE]/[0.08] text-[10px] font-mono uppercase tracking-[0.22em] text-[#22D3EE]">
            <Sparkles className="w-3 h-3" />
            From the field to your stack
          </div>
          <h3 className="font-display relative mt-6 text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold text-white tracking-tight leading-[1.1]">
            Want this running on{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
              your numbers?
            </span>
          </h3>
          <p className="relative mt-5 text-[#9AA8BC] leading-relaxed max-w-md mx-auto">
            No SDR phone tree. The person on the call has read the docs, can
            quote your contract live, and can spin up a POC on your traffic in
            under 24 hours.
          </p>
          <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0078E0] hover:to-[#22D3EE] text-white font-medium transition-all"
            >
              Talk to a solutions engineer
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 text-sm text-white/85 transition-colors"
            >
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PostLayout({
  html,
  shareUrl,
  title,
  tags,
  author,
}: {
  html: string
  shareUrl: string
  title: string
  tags: { id: number; name: string }[]
  author: BlogAuthor
}) {
  const articleRef = useRef<HTMLElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const tocListRef = useRef<HTMLUListElement>(null)
  const activeIdRef = useRef<string>("")
  const [activeId, setActiveId] = useState<string>("")
  const [tocVisible, setTocVisible] = useState(false)
  // Blocks scroll-spy from overriding an explicit click selection while the
  // smooth-scroll animation is still in progress.
  const clickLockRef = useRef(false)
  const clickLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Show the TOC only while the article prose is in view:
  // - starts when the section top crosses the navbar (prevents hero overlap)
  // - stops when the article's bottom edge scrolls within 200px of the navbar
  //   (hides before the author bio / end CTA / footer area)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const check = () => {
      const sectionTop = el.getBoundingClientRect().top
      const articleBottom =
        articleRef.current?.getBoundingClientRect().bottom ?? Infinity
      setTocVisible(sectionTop <= 112 && articleBottom > 200)
    }
    check()
    window.addEventListener("scroll", check, { passive: true })
    return () => window.removeEventListener("scroll", check)
  }, [])

  // Bake heading IDs into the HTML string up-front (runs identically on
  // server and client, so no hydration mismatch). The TOC is derived from
  // the SAME pass, so every anchor is guaranteed to point at a real heading
  // id that lives in the React-managed DOM and survives re-renders.
  const { html: processedHtml, toc: rawToc } = useMemo(
    () => injectHeadingIds(html),
    [html],
  )

  const introHtml = processedHtml
  const toc = rawToc

  // TOC click: scroll the heading to just below the fixed navbar explicitly.
  // The anchors keep their real `href="#id"` (SSR-friendly, right-click /
  // open-in-new-tab still work, and they're keyboard-focusable), but we
  // intercept the plain click so the scroll is deterministic — relying on the
  // browser's native fragment scroll proved unreliable here. We mirror the
  // section into the URL hash (replaceState, no history spam) and optimistically
  // set the active row; the scroll-spy keeps it in sync afterward.
  const NAV_OFFSET = 112
  const handleTocClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    // let modified clicks (new tab, etc.) behave natively
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, "", `#${id}`)
      }
    }
    activeIdRef.current = id
    setActiveId(id)
    // Lock scroll-spy for 1 s so the smooth-scroll animation doesn't
    // immediately override the item the user just clicked.
    clickLockRef.current = true
    if (clickLockTimer.current) clearTimeout(clickLockTimer.current)
    clickLockTimer.current = setTimeout(() => {
      clickLockRef.current = false
    }, 1000)
  }

  // Hide broken images inside the WordPress-rendered article HTML.
  // wp-content images that 404 would otherwise show the browser's broken-image
  // icon; hiding them degrades gracefully without disrupting the layout.
  useEffect(() => {
    const article = articleRef.current
    if (!article) return
    const imgs = Array.from(article.querySelectorAll<HTMLImageElement>("img"))
    const handlers: Array<() => void> = []
    for (const img of imgs) {
      const onErr = () => {
        img.style.display = "none"
        img.closest("figure")?.remove()
      }
      img.addEventListener("error", onErr)
      handlers.push(() => img.removeEventListener("error", onErr))
      // Trigger for already-broken images (src already evaluated before the handler was attached).
      if (img.complete && img.naturalWidth === 0 && img.src) onErr()
    }
    return () => handlers.forEach((fn) => fn())
  }, [processedHtml])

  // Post-render enhancements (FAQ accordion + mid-article CTAs) and scroll-spy.
  // IDs are already in the markup, so this no longer touches them.
  useEffect(() => {
    const article = articleRef.current
    if (!article) return

    // Clear any previously injected inline CTAs (so re-runs don't dupe).
    article
      .querySelectorAll(`[class^="${INLINE_CTA_MARKER}-yes"]`)
      .forEach((el) => el.remove())

    // Transform any FAQ section into a collapsible accordion.
    transformFaqSections(article)

    const h2s = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("h2"),
    )

    // Inject a mid-article CTA before every 3rd H2 (needs ≥ 4 H2s; never on
    // the final one so it doesn't collide with the end CTA card).
    if (h2s.length >= 4) {
      h2s.forEach((h, idx) => {
        if (idx > 0 && (idx + 1) % 3 === 0 && idx < h2s.length - 1) {
          const nextH2 = h2s[idx + 1]
          if (nextH2 && nextH2.parentNode) {
            const tpl = document.createElement("template")
            tpl.innerHTML = INLINE_CTA_HTML
            const node = tpl.content.firstElementChild
            if (node) nextH2.parentNode.insertBefore(node, nextH2)
          }
        }
      })
    }

    // ── Scroll-spy ────────────────────────────────────────────────────────
    // Position-based rather than IntersectionObserver: the active section is
    // the *last* heading whose top has crossed the offset line just under the
    // fixed navbar. This tracks the section you're actually reading
    // continuously — even through long sections that never put a heading
    // inside a narrow observer band — which is what makes the reference TOC
    // feel "live". We mirror the active section into the URL hash (via
    // replaceState, so the Back button isn't polluted) and keep the active
    // TOC row scrolled into view inside its (scrollable) list.
    // Re-query the headings on every tick rather than capturing them once:
    // post-render mutations (FAQ accordion, injected CTAs) and dev-mode
    // re-renders can detach the original nodes, leaving stale references
    // whose getBoundingClientRect() reads as 0 — which would pin the active
    // section to the last heading forever. A fresh query is cheap (≈30 nodes,
    // throttled to one rAF per scroll) and always reflects the live DOM.
    const getHeadings = () =>
      Array.from(
        article.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"),
      )
    if (!getHeadings().length) return

    const OFFSET = 140 // px from top ≈ navbar height + breathing room
    let ticking = false

    const computeActive = () => {
      ticking = false
      if (clickLockRef.current) return
      const headings = getHeadings()
      if (!headings.length) return
      const scrollY = window.scrollY
      const doc = document.documentElement
      const atBottom = window.innerHeight + scrollY >= doc.scrollHeight - 4

      let current = headings[0]
      if (atBottom) {
        current = headings[headings.length - 1]
      } else {
        for (const h of headings) {
          if (h.getBoundingClientRect().top - OFFSET <= 0) current = h
          else break
        }
      }

      const id = current.id
      if (!id || id === activeIdRef.current) return
      activeIdRef.current = id
      setActiveId(id)

      // Reflect active section in the URL without jumping or adding history.
      const newHash = `#${id}`
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, "", newHash)
      }

      // Keep the active TOC row visible inside the scrollable list.
      const list = tocListRef.current
      if (list) {
        const row = list.querySelector<HTMLElement>(`[data-toc-id="${id}"]`)
        if (row) {
          const rTop = row.offsetTop
          const rBot = rTop + row.offsetHeight
          if (
            rTop < list.scrollTop ||
            rBot > list.scrollTop + list.clientHeight
          ) {
            list.scrollTo({
              top: rTop - list.clientHeight / 2 + row.offsetHeight / 2,
              behavior: "smooth",
            })
          }
        }
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(computeActive)
      }
    }

    computeActive()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [processedHtml])

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="relative pb-12 sm:pb-16 lg:pb-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-20">
        {/* Fixed TOC — visible on lg+ screens once the article is in view */}
        {toc.length > 0 && (
          <aside
            aria-label="Table of contents"
            className={`hidden lg:flex flex-col transition-opacity duration-300 ${tocVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            style={{
              position: "fixed",
              top: "7rem",
              left: "max(1rem, calc(50vw - 40rem + 1.5rem))",
              width: "14rem",
              maxHeight: "calc(100vh - 8rem)",
              zIndex: 30,
            }}
          >
            <nav className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 flex flex-col min-h-0">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-4 shrink-0">
                <span className="w-4 h-px bg-gradient-to-r from-transparent to-[#0086F9]" />
                Table of contents
              </div>
              <ul
                ref={tocListRef}
                className="space-y-0.5 overflow-y-auto min-h-0"
                style={{ scrollbarWidth: "none" }}
              >
                {toc.map((entry, i) => {
                  const isActive = activeId === entry.id
                  return (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        data-toc-id={entry.id}
                        onClick={(e) => handleTocClick(e, entry.id)}
                        aria-current={isActive ? "location" : undefined}
                        className={`group flex items-start gap-2.5 rounded-lg py-1.5 px-2 text-sm border-l-2 transition-colors ${
                          isActive
                            ? "border-[#22D3EE] bg-[#046BD2]/15 text-white"
                            : "border-transparent text-white/55 hover:text-white/90 hover:bg-white/[0.04]"
                        } ${entry.level === 3 ? "pl-6 text-[13px]" : ""}`}
                      >
                        <span
                          className={`shrink-0 mt-px font-mono text-[11px] tabular-nums transition-colors ${
                            isActive ? "text-[#22D3EE]" : "text-white/30"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-snug">{entry.text}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>
        )}

        <div style={{ paddingLeft: "16rem" }}>
          <article
            ref={articleRef as React.RefObject<HTMLElement>}
            className="blog-prose max-w-3xl"
            dangerouslySetInnerHTML={{ __html: introHtml }}
          />

          <AuthorBio author={author} />

          {/* Tags + share row at the article end */}
          <div className="mt-10 max-w-3xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-6 border-t border-white/[0.08]">
            {tags.length > 0 ? (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-white/35" />
                {tags.map((t) => (
                  <span
                    key={t.id}
                    className="inline-flex items-center text-[11px] text-white/70 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03]"
                  >
                    #{t.name}
                  </span>
                ))}
              </div>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40">
                Share
              </span>
              <ShareButtons url={shareUrl} title={title} layout="row" />
            </div>
          </div>

          <PostEndCta />
        </div>
      </div>
    </section>
  )
}
