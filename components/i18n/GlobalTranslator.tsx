"use client"

import { useLayoutEffect } from "react"
import { addLocaleToPath } from "@/lib/locale"

interface GlobalTranslatorProps {
  locale: string
}

/**
 * Client controller for the translation system. React's hydration reconciles
 * server-rendered (translated) text against its own English virtual DOM and
 * silently reverts every mismatched text node back to English on mount — so
 * this always runs translateDOM (not just on non-SSR pages): it repairs any
 * reverted text synchronously from the already-known `window.__LD_TX__` map
 * (no network wait, no flash of English) and only falls back to the
 * translate API for genuinely new/dynamic content the SSR pass never saw.
 * useLayoutEffect (not useEffect) so the repair commits before the browser
 * paints the hydrated (English) frame.
 */
export function GlobalTranslator({ locale }: GlobalTranslatorProps) {
  useLayoutEffect(() => {
    if (!locale || locale === "en") return

    // Dynamically imported (instead of a static top-level import) so the
    // translation engine — and everything it pulls in — is never bundled
    // into the initial JS for the (default) English path, which is what
    // Lighthouse/PageSpeed measures. Non-English visitors pay one extra
    // chunk fetch here in exchange.
    let cancelled = false
    let observer: MutationObserver | null = null
    let onClick: ((e: MouseEvent) => void) | null = null

    import("@/lib/page-translator").then(({ translateDOM, rewriteLinks }) => {
      if (cancelled) return

      void translateDOM(document.body, locale)
      rewriteLinks(document.body, locale)

      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "characterData") {
            const parent = mutation.target.parentElement
            if (parent) void translateDOM(parent, locale)
            continue
          }
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== Node.ELEMENT_NODE) return
            const el = node as Element
            void translateDOM(el, locale)
            rewriteLinks(el, locale)
          })
        }
      })
      observer.observe(document.body, { childList: true, subtree: true, characterData: true })

      // Keeps regular content links (nav, footer, in-page CTAs) within the
      // active locale. Anchors inside a [data-no-translate] subtree — e.g. the
      // language switcher, whose links intentionally point to another locale —
      // are left alone so switching languages doesn't get forced back.
      onClick = (e: MouseEvent) => {
        const anchor = (e.target as Element | null)?.closest?.("a[href^='/']") as HTMLAnchorElement | null
        if (!anchor) return
        if (anchor.closest("[data-no-translate]")) return

        const href = anchor.getAttribute("href") ?? ""
        if (!href.startsWith("/") || href.startsWith("//")) return
        if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return

        const localized = addLocaleToPath(href, locale)
        if (localized === href) return

        e.preventDefault()
        window.location.href = localized
      }
      document.addEventListener("click", onClick, true)
    })

    return () => {
      cancelled = true
      observer?.disconnect()
      if (onClick) document.removeEventListener("click", onClick, true)
    }
  }, [locale])

  return null
}
