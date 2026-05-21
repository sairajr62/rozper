"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  MessageSquare,
  Phone,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react"

const channels = [
  {
    Icon: Calendar,
    title: "Book a 30-min call",
    body: "Pick a slot on a solutions engineer's live calendar. Demo + Q&A.",
    cta: "Open calendar",
    accent: "from-[#22D3EE] to-[#046BD2]",
    badge: "Most common",
  },
  {
    Icon: MessageSquare,
    title: "Chat with sales",
    body: "Average answer under a minute during business hours, globally.",
    cta: "Start chat",
    accent: "from-[#A78BFA] to-[#2575FC]",
  },
  {
    Icon: Phone,
    title: "Call us now",
    body: "+1 (415) 555-0199 · also reachable on local numbers in 19 countries.",
    cta: "See numbers",
    accent: "from-[#34D399] to-[#0086F9]",
  },
  {
    Icon: ShieldCheck,
    title: "Procurement & security",
    body: "Requesting our SOC 2 pack, BAA, or DPA? Direct line to compliance.",
    cta: "Email legal",
    accent: "from-[#F472B6] to-[#A78BFA]",
  },
]

export function ContactChannels() {
  return (
    <section className="relative py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
              Channels · pick yours
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Whichever way works for you.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((c, i) => {
            const Icon = c.Icon
            return (
              <motion.a
                key={c.title}
                href="#"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/25 p-6 transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${c.accent} opacity-25 blur-2xl pointer-events-none`}
                />
                {c.badge && (
                  <span className="absolute top-4 right-4 text-[9px] uppercase tracking-widest font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    {c.badge}
                  </span>
                )}
                <div
                  className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${c.accent} bg-opacity-20 border border-white/15 flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="relative mt-5 font-display text-lg font-bold text-white">
                  {c.title}
                </h3>
                <p className="relative mt-2 text-sm text-[#9AA8BC] leading-relaxed">
                  {c.body}
                </p>
                <div className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#22D3EE] group-hover:text-white">
                  {c.cta}
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
