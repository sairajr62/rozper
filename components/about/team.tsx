"use client"

import { motion } from "framer-motion"
import { Linkedin } from "lucide-react"

type Person = {
  initials: string
  name: string
  role: string
  prev: string
  hue: number
}

const leadership: Person[] = [
  {
    initials: "MC",
    name: "Marcus Chen",
    role: "Co-founder & CEO",
    prev: "Prev. Twilio · Cloudflare",
    hue: 200,
  },
  {
    initials: "PS",
    name: "Priya Subramanian",
    role: "Co-founder & CTO",
    prev: "Prev. AWS · Bandwidth",
    hue: 220,
  },
  {
    initials: "DO",
    name: "David Okonkwo",
    role: "Chief Revenue Officer",
    prev: "Prev. RingCentral · 8x8",
    hue: 240,
  },
  {
    initials: "SK",
    name: "Sara Kowalski",
    role: "Head of Product",
    prev: "Prev. Notion · Front",
    hue: 195,
  },
  {
    initials: "TV",
    name: "Tomás Vargas",
    role: "Head of Engineering",
    prev: "Prev. Stripe · Vonage",
    hue: 210,
  },
  {
    initials: "AD",
    name: "Aïcha Diallo",
    role: "Head of Security",
    prev: "Prev. Cloudflare · Auth0",
    hue: 230,
  },
]

const backers = [
  "Hexa Ventures",
  "Greylight Partners",
  "Aperture Capital",
  "South Park Commons",
  "Maven Ridge",
  "Index Ventures",
]

export function AboutTeam() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-0 w-[500px] h-[500px] bg-[#22D3EE]/[0.08] blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
              Leadership
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-white tracking-tight leading-[1.1]">
              People who&apos;ve{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
                shipped this before.
              </span>
            </h2>
            <p className="mt-4 text-[#9AA8BC] leading-relaxed">
              Operators from the companies you already trust with parts of
              your stack — building the platform that replaces all of them.
            </p>
          </div>
        </div>

        {/* Leadership grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {leadership.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all p-5 sm:p-6"
            >
              <div className="flex items-center gap-4">
                <div
                  className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-sm font-bold text-white shadow-[0_0_25px_-8px_rgba(34,211,238,0.5)]"
                  style={{
                    background: `linear-gradient(135deg, hsl(${p.hue} 70% 45%), hsl(${p.hue + 20} 80% 55%))`,
                  }}
                >
                  {p.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-base sm:text-lg font-semibold text-white truncate">
                    {p.name}
                  </div>
                  <div className="text-xs sm:text-[13px] text-[#22D3EE]/85 mt-0.5">
                    {p.role}
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/45 font-mono mt-1.5 truncate">
                    {p.prev}
                  </div>
                </div>
                <a
                  href="#"
                  aria-label={`${p.name} on LinkedIn`}
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/5 text-white/45 hover:text-white hover:bg-white/[0.08] hover:border-white/15 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Backers */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 mb-7">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Backed by people who&apos;ve built networks.
            </h3>
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/35">
              Lead investors · Series A → C
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {backers.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors px-4 py-4 text-center"
              >
                <div className="font-display text-sm font-semibold text-white/85 truncate">
                  {b}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
