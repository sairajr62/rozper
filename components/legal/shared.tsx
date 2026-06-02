"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ChevronRight, ShieldCheck } from "lucide-react"

/** Shared aurora + dot-grid background used across legal/security pages. */
export function LegalBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-10 -left-32 w-[600px] h-[600px] bg-[#22D3EE]/12 blur-[140px] rounded-full" />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-[#046BD2]/15 blur-[120px] rounded-full" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(120,160,220,0.18) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)",
        }}
      />
    </div>
  )
}

type HeroProps = {
  eyebrow: string
  title: string
  /** Optional second half of the title rendered with the brand gradient. */
  gradientTail?: string
  description: string
  lastUpdated?: string
}

/** Centered hero for legal/security pages — matches the Rozper landing style. */
export function LegalHero({
  eyebrow,
  title,
  gradientTail,
  description,
  lastUpdated,
}: HeroProps) {
  return (
    <section className="relative pt-32 pb-12 sm:pb-16 overflow-hidden">
      <LegalBackdrop />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.18em] text-white/70"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]"
        >
          {title}
          {gradientTail && (
            <>
              {" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                {gradientTail}
              </span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-lg text-[#CCD6DF] leading-relaxed"
        >
          {description}
        </motion.p>

        {lastUpdated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-white/45"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
            Last updated · {lastUpdated}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export type LegalSection = {
  id: string
  title: string
  /** Section content as nodes — write JSX inline at the call site. */
  body: React.ReactNode
}

/** Two-column long-form article wrapper with a sticky TOC sidebar. */
export function LegalArticle({ sections }: { sections: LegalSection[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "")

  // Highlight the TOC entry for whichever section is closest to the top of the viewport.
  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 1] },
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  return (
    <section className="relative pb-24 sm:pb-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* TOC sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-28">
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 mb-4">
                On this page
              </div>
              <nav className="space-y-1 border-l border-white/[0.06]">
                {sections.map((s) => {
                  const isActive = active === s.id
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`group flex items-center gap-2 -ml-px pl-4 py-2 text-sm border-l transition-all ${
                        isActive
                          ? "border-[#22D3EE] text-white"
                          : "border-transparent text-white/55 hover:text-white/85 hover:border-white/20"
                      }`}
                    >
                      <ChevronRight
                        className={`w-3 h-3 shrink-0 transition-transform ${
                          isActive
                            ? "text-[#22D3EE] translate-x-0.5"
                            : "text-white/30"
                        }`}
                      />
                      <span className="truncate">{s.title}</span>
                    </a>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Body */}
          <article className="lg:col-span-8 xl:col-span-9 max-w-3xl">
            {sections.map((s, i) => (
              <motion.section
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}
                className="scroll-mt-28 mb-12 last:mb-0"
              >
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  {s.title}
                </h2>
                <div className="prose-rozper mt-4 text-[15px] sm:text-base leading-relaxed text-[#CCD6DF] space-y-4">
                  {s.body}
                </div>
              </motion.section>
            ))}

            <div className="mt-16 pt-8 border-t border-white/5 text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
              Questions? · legal@rozper.com
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
