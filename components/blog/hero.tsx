"use client"

import { motion } from "framer-motion"
import { Sparkles, Search, ArrowRight, Rss, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const stats = [
  { value: "240+", label: "Articles" },
  { value: "18M", label: "Calls analyzed" },
  { value: "42", label: "Expert authors" },
  { value: "Weekly", label: "New issues" },
]

export function BlogHero() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get("q") ?? ""
  const [query, setQuery] = useState(urlQuery)

  // Keep the input synced if the URL changes from outside (e.g. back/forward).
  useEffect(() => {
    setQuery(urlQuery)
  }, [urlQuery])

  const goto = (q: string) => {
    const next = q.trim()
    const target = next
      ? `/blog?q=${encodeURIComponent(next)}#articles`
      : `/blog#articles`
    router.push(target, { scroll: false })
    // After router navigates, scroll the articles section into view smoothly.
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        document
          .getElementById("articles")
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }
  }

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background — soft conic + grid, consistent with landing hero */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#070B14]" />

        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120, 160, 220, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120, 160, 220, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)",
          }}
        />

        <motion.div
          className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[1300px] h-[1300px] rounded-full opacity-50"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 50%, rgba(4,107,210,0) 0deg, rgba(4,107,210,0.35) 60deg, rgba(0,134,249,0.15) 140deg, rgba(34,211,238,0.25) 220deg, rgba(4,107,210,0) 360deg)",
            filter: "blur(90px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute top-[18%] right-[8%] w-[440px] h-[440px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(4,107,210,0.4) 0%, rgba(4,107,210,0) 65%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[12%] left-[6%] w-[380px] h-[380px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0) 65%)",
            filter: "blur(70px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0B1220] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm"
        >
          <span className="flex items-center gap-1.5 text-[#22D3EE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-mono uppercase tracking-[0.18em] text-[10px] sm:text-[11px]">
              The Rozper Field Notes
            </span>
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="text-white/60">Issue 47 · May 2026</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-7 text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.02] tracking-[-0.035em] font-semibold text-white"
        >
          Field notes from{" "}
          <span
            className="bg-gradient-to-r from-[#2D98F1] via-[#0086F9] to-[#22D3EE] bg-clip-text text-transparent"
            style={{ textShadow: "0 0 60px rgba(4,107,210,0.45)" }}
          >
            the global voice layer.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#B8C4D4] max-w-2xl mx-auto leading-relaxed font-light"
        >
          Research, engineering deep-dives, and operator playbooks from the team
          routing <span className="text-white">2.4M+ daily calls</span> across
          150+ countries.
        </motion.p>

        {/* Search bar */}
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onSubmit={(e) => {
            e.preventDefault()
            goto(query)
          }}
          className="mt-9 max-w-xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#046BD2]/0 via-[#046BD2]/30 to-[#22D3EE]/30 opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500" />
            <div className="relative flex items-center rounded-2xl border border-white/10 bg-[#0A1020]/80 backdrop-blur-xl pl-4 pr-2 py-2 focus-within:border-[#046BD2]/50 transition-colors">
              <Search className="w-4 h-4 text-white/40 shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, authors, topics…"
                aria-label="Search blog"
                className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder:text-white/40 px-3 py-2 outline-none"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setQuery("")
                    goto("")
                  }}
                  className="shrink-0 mr-1 w-8 h-8 inline-flex items-center justify-center rounded-lg text-white/45 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm font-medium px-4 py-2 transition-colors"
              >
                Search
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-white/40">
              <span className="font-mono uppercase tracking-wider text-[10px]">
                Popular
              </span>
              {["AI agents", "Wholesale margins", "HIPAA", "SIP trunking"].map(
                (t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setQuery(t)
                      goto(t)
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {t}
                  </button>
                ),
              )}
            </div>
          </div>
        </motion.form>

        {/* Mini stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 inline-flex flex-wrap items-stretch justify-center gap-0 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md divide-x divide-white/5 overflow-hidden"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="px-5 sm:px-7 py-3 text-left first:pl-6 last:pr-6"
            >
              <div className="text-lg sm:text-xl font-semibold text-white tabular-nums">
                {s.value}
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-white/40 font-mono mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2 text-xs text-white/40"
        >
          <Rss className="w-3 h-3" />
          <span>
            Subscribe via RSS, email, or your favorite podcast app —{" "}
            <a
              href="#newsletter"
              className="text-[#22D3EE] hover:text-[#0086F9] transition-colors"
            >
              scroll for options
            </a>
          </span>
        </motion.div>
      </div>
    </section>
  )
}
