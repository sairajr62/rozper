"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, MapPin, ArrowUpRight, Phone } from "lucide-react"
import type { AreaCodeMeta } from "@/lib/area-code-data"

// ─── Hub Hero SVG ─────────────────────────────────────────────────────────

const SAMPLE_CODES = ["212", "310", "312", "415", "305", "617", "713", "404", "702", "206"]

function HubIllustration() {
  return (
    <div className="relative w-full flex items-center justify-center select-none pointer-events-none">
      <div className="absolute w-72 h-48 rounded-full bg-[#046BD2]/15 blur-[60px]" />
      <div className="absolute w-48 h-48 rounded-full bg-[#22D3EE]/8 blur-[50px] translate-x-16" />

      <svg viewBox="0 0 520 340" className="relative w-full max-w-lg" fill="none" aria-hidden>
        <defs>
          <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#046BD2" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="hubGradH" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#046BD2" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>

        {/* Background rings */}
        <ellipse cx="260" cy="170" rx="240" ry="150" stroke="#046BD2" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="5 10" />
        <ellipse cx="260" cy="170" rx="185" ry="115" stroke="#22D3EE" strokeOpacity="0.05" strokeWidth="1" />

        {/* Central hub node */}
        <circle cx="260" cy="170" r="36" fill="#0D1B2E" stroke="url(#hubGrad)" strokeWidth="1.5" strokeOpacity="0.7" />
        <circle cx="260" cy="170" r="28" fill="#060D1A" />
        <text x="260" y="162" textAnchor="middle" fill="url(#hubGrad)" fontSize="9" fontFamily="system-ui,sans-serif" letterSpacing="2" fontWeight="700">U.S.</text>
        <text x="260" y="176" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="900" fillOpacity="0.85">AREA</text>
        <text x="260" y="189" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="900" fillOpacity="0.85">CODES</text>

        {/* Floating area code cards arranged in orbit */}
        {[
          { cx: 120, cy: 68,  code: "212", color: "#046BD2", city: "NYC"   },
          { cx: 260, cy: 42,  code: "617", color: "#22D3EE", city: "BOS"   },
          { cx: 398, cy: 68,  code: "310", color: "#046BD2", city: "LA"    },
          { cx: 448, cy: 180, code: "415", color: "#22D3EE", city: "SF"    },
          { cx: 398, cy: 290, code: "305", color: "#046BD2", city: "MIA"   },
          { cx: 260, cy: 318, code: "312", color: "#22D3EE", city: "CHI"   },
          { cx: 120, cy: 290, code: "713", color: "#046BD2", city: "HOU"   },
          { cx: 68,  cy: 180, code: "404", color: "#22D3EE", city: "ATL"   },
        ].map(({ cx, cy, code, color, city }) => {
          const w = 62, h = 38, r = 8
          const x = cx - w / 2, y = cy - h / 2
          return (
            <g key={code}>
              {/* Connection line to center */}
              <line
                x1={cx} y1={cy} x2={260} y2={170}
                stroke={color} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 6"
              />
              {/* Card */}
              <rect x={x} y={y} width={w} height={h} rx={r}
                fill="#0D1B2E" stroke={color} strokeOpacity="0.45" strokeWidth="1" />
              <text x={cx} y={cy - 4} textAnchor="middle"
                fill={color} fontSize="13" fontWeight="900" fontFamily="system-ui,sans-serif">
                {code}
              </text>
              <text x={cx} y={cy + 9} textAnchor="middle"
                fill="white" fontSize="7.5" fontFamily="system-ui,sans-serif" fillOpacity="0.4"
                letterSpacing="1">
                {city}
              </text>
            </g>
          )
        })}

        {/* Glowing dots on connecting lines */}
        {[
          { x: 188, y: 118, c: "#046BD2" },
          { x: 260, y: 105, c: "#22D3EE" },
          { x: 330, y: 118, c: "#046BD2" },
          { x: 357, y: 175, c: "#22D3EE" },
          { x: 330, y: 232, c: "#046BD2" },
          { x: 260, y: 246, c: "#22D3EE" },
          { x: 188, y: 232, c: "#046BD2" },
          { x: 163, y: 175, c: "#22D3EE" },
        ].map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="2.5" fill={d.c} fillOpacity="0.6" />
        ))}
      </svg>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────

export function HubHero() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/15 via-[#0B1220] to-[#22D3EE]/5" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#046BD2]/10 blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#22D3EE]/5 blur-[100px]" />
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 items-center">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[#22D3EE] text-xs font-mono tracking-widest uppercase mb-7 backdrop-blur-sm">
              <Phone className="w-3.5 h-3.5" />
              Virtual Numbers · 150+ Countries
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5">
              U.S. Area Code
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#046BD2] to-[#22D3EE]">
                Virtual Numbers
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/50 max-w-lg leading-relaxed mb-8">
              Get a local business number in any U.S. market — instantly. No physical office required.
            </p>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: "📍", label: "150+ countries" },
                { icon: "⚡", label: "< 10 min setup" },
                { icon: "🔒", label: "99.99% uptime" },
                { icon: "💬", label: "24/7 support" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white/50">
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:flex items-center justify-center"
          >
            <HubIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const STATE_ABBR: Record<string, string> = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
  Colorado: "CO", Connecticut: "CT", Delaware: "DE", Florida: "FL", Georgia: "GA",
  Hawaii: "HI", Idaho: "ID", Illinois: "IL", Indiana: "IN", Iowa: "IA",
  Kansas: "KS", Kentucky: "KY", Louisiana: "LA", Maine: "ME", Maryland: "MD",
  Massachusetts: "MA", Michigan: "MI", Minnesota: "MN", Mississippi: "MS",
  Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", Ohio: "OH", Oklahoma: "OK",
  Oregon: "OR", Pennsylvania: "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT",
  Virginia: "VA", Washington: "WA", "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY",
}

// ─── Searchable Grid ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.35 } }),
}

export function AreaCodeGrid({ codes }: { codes: AreaCodeMeta[] }) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return codes
    return codes.filter(
      c => c.code.includes(q) || c.city.toLowerCase().includes(q) || c.state.toLowerCase().includes(q),
    )
  }, [codes, query])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Search bar */}
      <div className="relative max-w-md mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by area code, city, or state…"
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#046BD2]/60 focus:bg-white/[0.07] transition"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-lg leading-none"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Result count */}
      {query && (
        <p className="text-sm text-white/40 mb-6">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <p className="text-2xl font-semibold mb-2">No matches</p>
          <p className="text-sm">Try a different area code, city, or state.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((ac, i) => (
            <motion.div
              key={ac.code}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i % 12}
            >
              <Link
                href={`/area-codes/${ac.code}`}
                className="group relative flex flex-col h-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#046BD2]/40 rounded-2xl p-5 transition-all duration-200"
              >
                {/* Area code number */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl font-black text-white/90 leading-none group-hover:text-[#22D3EE] transition-colors">
                    {ac.code}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#22D3EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                {/* City + state */}
                <div className="flex items-center gap-1.5 text-white/50 text-xs mb-3">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{ac.city}{ac.state ? `, ${STATE_ABBR[ac.state] ?? ac.state.slice(0, 2).toUpperCase()}` : ""}</span>
                </div>

                {/* Excerpt */}
                <p className="text-xs text-white/40 line-clamp-3 leading-relaxed mt-auto">
                  {ac.excerpt}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#046BD2]/0 to-transparent group-hover:via-[#046BD2]/40 transition-all rounded-b-2xl" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16 rounded-2xl bg-gradient-to-r from-[#046BD2]/20 to-[#22D3EE]/10 border border-[#046BD2]/20 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
            Need a number not listed here?
          </h3>
          <p className="text-white/50 text-sm">
            Rozper covers 150+ countries. Start a no-pressure conversation about your requirements.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 bg-[#046BD2] hover:bg-[#0557b0] text-white font-semibold px-6 py-3 rounded-xl transition whitespace-nowrap text-sm"
        >
          Start a Conversation →
        </Link>
      </motion.div>
    </section>
  )
}
