"use client"

import { motion } from "framer-motion"
import { Search, ArrowRight, BookOpen, Terminal, Cpu, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

const placeholders = [
  "Send your first SMS...",
  "Authenticate a webhook...",
  "Set up an AI agent...",
  "Provision a phone number...",
  "Stream call recordings...",
]

export function DocsHero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % placeholders.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative pt-36 pb-24 overflow-hidden">
      {/* Background grid + glow */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(120,160,220,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,160,220,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 60% 70% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 70% at 50% 0%, black 30%, transparent 75%)",
        }}
      />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#046BD2]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.18em] text-white/70"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
            </span>
            v2026.05 · 312 endpoints · 8 SDKs
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
          >
            The developer{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
              workshop
            </span>{" "}
            for voice.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-lg text-[#CCD6DF] leading-relaxed"
          >
            Quickstarts, SDKs, reference, and recipes. Ship your first call in
            under five minutes — or wire up an AI agent before lunch.
          </motion.p>

          {/* Command palette */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-9 relative max-w-xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#046BD2]/30 to-[#22D3EE]/30 blur-2xl rounded-2xl" />
            <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0F1A2E]/90 backdrop-blur-xl px-5 py-4 shadow-2xl">
              <Search className="w-5 h-5 text-white/40" />
              <div className="flex-1 text-left">
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/70 font-mono text-sm"
                >
                  {placeholders[idx]}
                </motion.span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md border border-white/10 bg-white/[0.04] text-[10px] font-mono text-white/50">
                ⌘ K
              </kbd>
            </div>
          </motion.div>

          {/* Quick chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 flex flex-wrap justify-center gap-2"
          >
            {[
              { Icon: BookOpen, label: "Quickstart" },
              { Icon: Terminal, label: "API reference" },
              { Icon: Cpu, label: "SDKs" },
              { Icon: Sparkles, label: "AI agents" },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 text-xs text-white/70 hover:text-white transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-[#22D3EE]" />
                {label}
                <ArrowRight className="w-3 h-3 opacity-50" />
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
