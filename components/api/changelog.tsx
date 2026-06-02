"use client"

import { motion } from "framer-motion"
import { GitCommit, Sparkles, Bug, Wrench } from "lucide-react"

const entries = [
  {
    date: "2026-05-10",
    version: "v2026.05",
    items: [
      { kind: "feat", Icon: Sparkles, text: "Voice agents now support tool calling with streaming responses." },
      { kind: "feat", Icon: Sparkles, text: "New /v2/numbers/port endpoint for programmatic LNP submissions." },
    ],
  },
  {
    date: "2026-04-22",
    version: "v2026.04",
    items: [
      { kind: "fix", Icon: Bug, text: "Idempotency cache now correctly honors 24h TTL on POST /calls." },
      { kind: "chore", Icon: Wrench, text: "Deprecated v1 endpoints removed (announced 2025-11)." },
    ],
  },
  {
    date: "2026-03-31",
    version: "v2026.03",
    items: [
      { kind: "feat", Icon: Sparkles, text: "WebSocket media-streams beta is now generally available." },
      { kind: "feat", Icon: Sparkles, text: "WhatsApp template messages added under /v2/messages." },
    ],
  },
]

const kindClasses: Record<string, string> = {
  feat: "bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/30",
  fix: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  chore: "bg-white/10 text-white/60 border-white/15",
}

export function ApiChangelog() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
            <GitCommit className="w-3.5 h-3.5" />
            §05 · Changelog
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Every change, in plain English.
          </h2>
        </div>

        <div className="relative">
          {/* Timeline rail */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

          <ol className="space-y-10">
            {entries.map((e, i) => (
              <motion.li
                key={e.version}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12"
              >
                {/* Dot */}
                <span className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-[#046BD2] ring-4 ring-[#0B1220] z-10" />

                {/* Date */}
                <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:order-2 md:pl-12"}`}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    {e.date}
                  </div>
                  <div className="font-display text-2xl font-bold text-white mt-1">
                    {e.version}
                  </div>
                </div>

                {/* Items */}
                <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pl-12" : "md:order-1 md:text-right md:pr-12"}`}>
                  <ul className="space-y-2.5">
                    {e.items.map((it, j) => {
                      const Icon = it.Icon
                      return (
                        <li
                          key={j}
                          className={`flex items-start gap-3 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                        >
                          <span
                            className={`shrink-0 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider border ${kindClasses[it.kind]}`}
                          >
                            {it.kind}
                          </span>
                          <span className="text-sm text-white/80 leading-relaxed text-left">
                            {it.text}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/25 text-sm text-white/80 hover:text-white transition-colors"
          >
            Subscribe to the API changelog feed →
          </a>
        </div>
      </div>
    </section>
  )
}
