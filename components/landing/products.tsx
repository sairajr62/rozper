"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, Phone, Headphones, Bot, Server } from "lucide-react"

const capabilities = [
  {
    icon: Phone,
    title: "UCaaS Platform",
    tag: "Anchor",
    description:
      "Calling, video, SMS, and AI on one seat. Replace four vendors with one bill.",
    href: "/products/unified-communications/",
    bullets: ["Cloud PBX", "Video meetings", "SMS / MMS", "Team chat"],
    accent: "from-[#046BD2] to-[#22D3EE]",
    featured: true,
  },
  {
    icon: Headphones,
    title: "Contact Center",
    tag: "CCaaS",
    description: "Omnichannel inbox, dialers, and analytics — built for scale.",
    href: "/products/contact-center/",
    accent: "from-[#0078E0] to-[#2575FC]",
  },
  {
    icon: Bot,
    title: "AI Suite",
    tag: "Intelligence",
    description: "Receptionist, agent assist, and conversation analytics.",
    href: "/products/ai/",
    accent: "from-[#22D3EE] to-[#046BD2]",
  },
  {
    icon: Server,
    title: "SIP Trunking",
    tag: "Infra",
    description: "Flexible SIP for any PBX — bring your own session border controller.",
    href: "/products/unified-communications/hosted-phone-system/",
    accent: "from-[#0078E0] to-[#046BD2]",
  },
]

export function Products() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="products"
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-[#0A1020]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(4,107,210,0.18) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-14"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-mono text-white/50">
              <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#0086F9]" />
              Explore the Full Library
            </div>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]">
              Every capability,{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                in one place.
              </span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#9AA8BC] leading-relaxed max-w-md">
            From the seat your reps log into, all the way down to the SIP trunks
            carrying the call.
          </p>
        </motion.div>

        {/* Editorial ledger — full-width rows divided by hairlines */}
        <div className="border-t border-white/[0.08]">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.a
                key={cap.title}
                href={cap.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex items-center gap-4 sm:gap-7 border-b border-white/[0.08] py-7 sm:py-9 transition-colors duration-300 hover:bg-white/[0.02]"
              >
                {/* hover accent rail */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-gradient-to-b from-[#22D3EE] to-[#046BD2] transition-transform duration-500 group-hover:scale-y-100"
                />

                {/* index */}
                <span className="font-display text-3xl sm:text-5xl font-bold tabular-nums leading-none text-white/[0.09] transition-colors duration-300 group-hover:text-white/25 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* icon */}
                <span
                  className={`hidden sm:flex w-12 h-12 rounded-xl bg-gradient-to-br ${cap.accent} items-center justify-center shadow-[0_0_24px_-6px_rgba(4,107,210,0.5)] shrink-0`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </span>

                {/* content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight">
                      {cap.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/35">
                      {cap.tag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm sm:text-[0.95rem] text-[#9AA8BC] leading-relaxed max-w-xl">
                    {cap.description}
                  </p>
                  {cap.featured && cap.bullets && (
                    <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-white/55">
                      {cap.bullets.map((b, bi) => (
                        <span key={b} className="inline-flex items-center gap-2.5">
                          {bi > 0 && (
                            <span className="w-1 h-1 rounded-full bg-[#22D3EE]/60" />
                          )}
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* explore */}
                <div className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-white/45 group-hover:text-[#22D3EE] transition-colors">
                  <span className="hidden sm:inline">Explore</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Footer line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center text-sm text-white/40"
        >
          Plus bulk SMS, MMS, WhatsApp Business, IVR, call recording, number porting,
          voicemail-to-text, and 200+ more.
        </motion.p>
      </div>
    </section>
  )
}
