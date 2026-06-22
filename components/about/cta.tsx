"use client"

import { motion } from "framer-motion"
import { ArrowRight, Tag } from "lucide-react"

export function AboutCTA() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#0B1220] overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/30 to-transparent shadow-[0_0_80px_-20px_rgba(4,107,210,0.5)]"
        >
          <div className="relative rounded-3xl bg-[#070B14] overflow-hidden p-8 sm:p-12 text-center">
            {/* Left arc glow */}
            <div
              className="hidden sm:block absolute -left-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none"
              aria-hidden
            >
              <motion.svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                style={{ filter: "blur(28px)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="100" cy="100" r="78" stroke="#22D3EE" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
                <circle cx="100" cy="100" r="54" stroke="#046BD2" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(40 100 100)" />
              </motion.svg>
            </div>

            {/* Right arc glow */}
            <div
              className="hidden sm:block absolute -right-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none"
              aria-hidden
            >
              <motion.svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                style={{ filter: "blur(28px)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="100" cy="100" r="78" stroke="#0086F9" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
                <circle cx="100" cy="100" r="54" stroke="#22D3EE" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(-40 100 100)" />
              </motion.svg>
            </div>

            {/* Faint background grid */}
            <div
              className="absolute inset-0 opacity-[0.18] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "56px 56px",
                maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)",
              }}
            />

            {/* Content */}
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.18em] text-white/70">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                4 SEs online · Avg 47s first response
              </div>

              <h2 className="font-display mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
                Want to see Rozper{" "}
                <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                  live?
                </span>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-[#CCD6DF] leading-relaxed max-w-xl mx-auto">
                No deck. No SDR phone tree. A solutions engineer who has read the
                docs, can architect your stack, and can quote your contract live.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0078E0] hover:to-[#22D3EE] text-white font-medium transition-all"
                >
                  Talk to a solutions engineer
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 text-sm text-white/85 transition-colors"
                >
                  <Tag className="w-4 h-4" />
                  See pricing
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
