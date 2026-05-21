"use client"

import { motion } from "framer-motion"
import { Activity, Layers, ShieldCheck, Zap } from "lucide-react"

const principles = [
  {
    Icon: Activity,
    title: "Carrier-grade or it doesn't ship.",
    body: "Every line of code in Rozper has to survive an Atlanta thunderstorm and a Tokyo undersea-cable cut. If it can't, it stays on the branch.",
    accent: "from-[#22D3EE] to-[#0086F9]",
  },
  {
    Icon: Zap,
    title: "Latency is a feature.",
    body: "Faster trumps fancier. We measure round-trip time in milliseconds because our customers' agents do — and so do their customers.",
    accent: "from-[#0086F9] to-[#046BD2]",
  },
  {
    Icon: Layers,
    title: "One platform. No silos.",
    body: "We refuse to ship a feature that requires a second login, a second invoice, or a second vendor to answer the support ticket. That's the whole point.",
    accent: "from-[#046BD2] to-[#2575FC]",
  },
  {
    Icon: ShieldCheck,
    title: "Show, don't sell.",
    body: "The product is the demo. The demo is the trial. The trial is the contract. We&apos;d rather you spin up a sandbox at 11pm than book a 30-minute deck.",
    accent: "from-[#2575FC] to-[#22D3EE]",
  },
]

export function AboutPrinciples() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[420px] h-[420px] bg-[#22D3EE]/[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
            How we work
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-white tracking-tight leading-[1.1]">
            Four principles. Pinned to{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
              every wall.
            </span>
          </h2>
          <p className="mt-5 text-[#9AA8BC] leading-relaxed">
            They aren&apos;t aspirational, they&apos;re operational. Every
            roadmap review starts by checking the next quarter against this
            list.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-6 sm:p-7"
            >
              <div
                className={`absolute -top-px left-6 right-6 h-px bg-gradient-to-r ${p.accent} opacity-60`}
              />
              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center shadow-[0_0_25px_-5px_rgba(34,211,238,0.4)]`}
                >
                  <p.Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/35">
                    Principle {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display mt-1.5 text-xl font-semibold text-white tracking-tight leading-snug">
                    {p.title}
                  </h3>
                </div>
              </div>
              <p className="mt-5 text-sm text-[#9AA8BC] leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
