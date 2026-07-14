"use client"

import { useEffect, useRef, useState } from "react"
import { addLocaleToPath } from "@/lib/locale"
import { ENGLISH, LANGUAGES, getLanguageInfo } from "@/lib/translate"

function FlagIcon({ country, alt }: { country: string; alt: string }) {
  return (
    <img
      src={`https://flagcdn.com/h40/${country}.png`}
      alt={alt}
      width={20}
      height={14}
      className="inline-block rounded-[2px] object-cover"
    />
  )
}

/**
 * Flag-based language switcher. Uses plain <a href> (not next/link) since a
 * real navigation is required to hit the SSR translation proxy and get the
 * actual translated page rather than a client-side route transition.
 * Root carries data-no-translate so the translation system's own link
 * rewriting/click interception and DOM translator leave it alone.
 */
export function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState("/")
  const [activeLocale, setActiveLocale] = useState("en")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pathname = window.location.pathname
    setCurrentPath(pathname)
    const segment = pathname.split("/").filter(Boolean)[0]
    const known = LANGUAGES.find((l) => l.code === segment)
    setActiveLocale(known ? known.code : "en")
  }, [])

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("click", onOutsideClick)
    document.addEventListener("keydown", onEscape)
    return () => {
      document.removeEventListener("click", onOutsideClick)
      document.removeEventListener("keydown", onEscape)
    }
  }, [])

  const active = getLanguageInfo(activeLocale) ?? ENGLISH

  return (
    <div ref={ref} data-no-translate className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0B1220] px-3 py-1.5 text-sm text-white hover:bg-[#0B1220]/80 transition-colors"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <FlagIcon country={active.flagCountry} alt={active.name} />
        <span className="uppercase text-xs font-semibold text-white">{active.code}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={open ? "rotate-180 transition-transform text-white/60" : "transition-transform text-white/60"}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 max-h-80 w-56 overflow-y-auto rounded-xl border border-white/10 bg-neutral-900 shadow-xl">
          <a
            href={addLocaleToPath(currentPath, "en") || "/"}
            className="flex items-center gap-2 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            <FlagIcon country={ENGLISH.flagCountry} alt={ENGLISH.name} />
            <span>{ENGLISH.nativeName}</span>
            <span className="ml-auto text-xs uppercase text-white/40">en</span>
          </a>
          {LANGUAGES.map((lang) => (
            <a
              key={lang.code}
              href={addLocaleToPath(currentPath, lang.code)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              <FlagIcon country={lang.flagCountry} alt={lang.name} />
              <span>{lang.nativeName}</span>
              <span className="ml-auto text-xs uppercase text-white/40">{lang.code}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
