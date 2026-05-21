"use client"

import { motion } from "framer-motion"
import { ArrowDown, Sparkles } from "lucide-react"

const quickStats = [
  { v: "2018", l: "Founded" },
  { v: "150+", l: "Countries served" },
  { v: "240+", l: "Rozpernauts" },
  { v: "$140M", l: "ARR run-rate" },
]

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-16 sm:pb-20 overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 -left-32 w-[640px] h-[640px] bg-[#22D3EE]/12 blur-[150px] rounded-full" />
        <div className="absolute top-32 right-0 w-[520px] h-[520px] bg-[#046BD2]/15 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 left-1/3 w-[480px] h-[480px] bg-[#0086F9]/10 blur-[140px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(120,160,220,0.20) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.18em] text-white/70"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
          About Rozper
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display mt-7 text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-white leading-[1.04]"
        >
          Building the last{" "}
          <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
            comms platform
          </span>{" "}
          you&apos;ll ever buy.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-6 text-lg sm:text-xl text-[#CCD6DF] leading-relaxed max-w-2xl mx-auto"
        >
          Rozper was founded on the bet that voice, video, messaging, contact
          center, and AI belong on one carrier-grade network — not stitched
          together from five vendors and a Zapier subscription.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#story"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0078E0] hover:to-[#22D3EE] text-white font-medium transition-all"
          >
            Read our story
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 text-sm text-white/85 transition-colors"
          >
            Talk to us
          </a>
        </motion.div>

        {/* Quick stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
        >
          {quickStats.map((s) => (
            <div key={s.l} className="bg-[#0A1020]/80 backdrop-blur-md px-5 py-5">
              <div className="font-display text-2xl sm:text-3xl font-bold bg-gradient-to-br from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent tabular-nums">
                {s.v}
              </div>
              <div className="text-[10px] uppercase tracking-widest font-mono text-white/40 mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
