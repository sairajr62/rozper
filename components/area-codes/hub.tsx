"use client"

import React, { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, MapPin, ArrowUpRight, Phone, ArrowRight, Hash,
  Globe, Clock, TrendingUp, Building2, Zap, ChevronDown,
  PhoneCall, BadgeCheck, BarChart3, Users, Star, CheckCircle2, X,
} from "lucide-react"
import type { AreaCodeMeta } from "@/lib/area-code-data"

// ─── Types ────────────────────────────────────────────────────────────────────

export type StateGroup = {
  state: string
  stateSlug: string
  abbr: string
  codes: string[]
  totalCodes: number
}

// ─── Animated hub SVG ─────────────────────────────────────────────────────────

function HubSVG() {
  const nodes = [
    { cx: 120, cy: 68,  code: "212", color: "#22D3EE", city: "NYC" },
    { cx: 260, cy: 42,  code: "310", color: "#0086F9", city: "LA"  },
    { cx: 400, cy: 68,  code: "312", color: "#22D3EE", city: "CHI" },
    { cx: 448, cy: 180, code: "415", color: "#0086F9", city: "SF"  },
    { cx: 400, cy: 292, code: "305", color: "#22D3EE", city: "MIA" },
    { cx: 260, cy: 318, code: "617", color: "#0086F9", city: "BOS" },
    { cx: 120, cy: 292, code: "713", color: "#22D3EE", city: "HOU" },
    { cx: 72,  cy: 180, code: "404", color: "#0086F9", city: "ATL" },
  ]

  return (
    <div className="relative w-full flex items-center justify-center select-none pointer-events-none">
      <div className="absolute w-80 h-56 rounded-full bg-[#046BD2]/15 blur-[80px]" />
      <div className="absolute w-56 h-56 rounded-full bg-[#22D3EE]/8 blur-[60px] translate-x-12" />
      <svg viewBox="0 0 520 360" className="relative w-full max-w-xl" fill="none" aria-hidden>
        <defs>
          <linearGradient id="hg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#046BD2" /><stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="hg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22D3EE" /><stop offset="100%" stopColor="#0086F9" />
          </linearGradient>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#046BD2" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#046BD2" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[155, 122, 90].map((r, i) => (
          <motion.ellipse key={r} cx={260} cy={180} rx={r * 1.6} ry={r}
            stroke={i === 1 ? "#22D3EE" : "#046BD2"}
            strokeOpacity={0.06 + i * 0.02} strokeWidth={1}
            strokeDasharray={i === 1 ? "5 12" : undefined} fill="none"
            animate={{ rx: [r * 1.6, r * 1.6 + 6, r * 1.6], ry: [r, r + 4, r], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 4.5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          />
        ))}
        <circle cx={260} cy={180} r={64} fill="url(#hubGlow)" />
        <circle cx={260} cy={180} r={44} fill="#0A1628" stroke="url(#hg1)" strokeWidth={1.5} strokeOpacity={0.8} />
        <circle cx={260} cy={180} r={36} fill="#060D1A" />
        <text x={260} y={172} textAnchor="middle" fill="url(#hg2)" fontSize="8.5" fontFamily="system-ui,sans-serif" letterSpacing="2.5" fontWeight="700">U.S.</text>
        <text x={260} y={185} textAnchor="middle" fill="white" fontSize="10" fontFamily="system-ui,sans-serif" fontWeight="900" fillOpacity={0.9}>AREA</text>
        <text x={260} y={197} textAnchor="middle" fill="white" fontSize="10" fontFamily="system-ui,sans-serif" fontWeight="900" fillOpacity={0.9}>CODES</text>
        {nodes.map(({ cx, cy, code, color, city }, i) => {
          const w = 64, h = 38, rx = 8
          const x = cx - w / 2, y = cy - h / 2
          return (
            <motion.g key={code}
              animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
              transition={{ duration: 3.2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.28 }}
            >
              <motion.line x1={cx} y1={cy} x2={260} y2={180}
                stroke={color} strokeOpacity={0.18} strokeWidth={1} strokeDasharray="4 9"
                animate={{ strokeDashoffset: [0, -26] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: i * 0.15 }}
              />
              <motion.circle cx={260 + (cx - 260) * 0.5} cy={180 + (cy - 180) * 0.5} r={2.5}
                fill={color} fillOpacity={0.65}
                animate={{ r: [2, 3.5, 2], fillOpacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.22 }}
              />
              <rect x={x} y={y} width={w} height={h} rx={rx}
                fill="#0D1B2E" stroke={color} strokeOpacity={0.5} strokeWidth={1.2} />
              <text x={cx} y={cy - 3} textAnchor="middle" fill={color} fontSize="14" fontWeight="900" fontFamily="system-ui,sans-serif">{code}</text>
              <text x={cx} y={cy + 10} textAnchor="middle" fill="white" fontSize="7.5" fontFamily="system-ui,sans-serif" fillOpacity={0.4} letterSpacing="1">{city}</text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}

// ─── 1. Hero ──────────────────────────────────────────────────────────────────

interface HeroProps {
  totalCodes: number
  totalStates: number
  query: string
  setQuery: (q: string) => void
}

export function HubHero({ totalCodes, totalStates, query, setQuery }: HeroProps) {
  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-0 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/14 via-[#0B1220] to-[#0B1220]" />
        <div className="absolute -top-40 -right-40 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[#046BD2]/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-[#22D3EE]/5 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(120,160,220,0.22) 1px,transparent 0)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center pb-14 sm:pb-16 lg:pb-20">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-5 sm:mb-7"
            >
              <Globe className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE] leading-none">
                Virtual Numbers · 150+ Countries
              </span>
            </motion.div>

            {/* Heading — smaller on mobile to prevent overflow */}
            <h1 className="text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-4 sm:mb-5">
              U.S. Area Code
              <br />
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                Virtual Numbers
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/50 max-w-xl leading-relaxed mb-6 sm:mb-8">
              Establish local presence in any U.S. market instantly — no physical office, no hardware, no waiting.
            </p>

            {/* Search bar */}
            <div className="relative w-full max-w-lg mb-6 sm:mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              <input
                type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search area code, city, or state…"
                className="w-full bg-white/[0.06] border border-white/10 rounded-2xl pl-11 pr-10 py-3.5 sm:py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#046BD2]/60 focus:bg-white/[0.08] transition-all"
              />
              {query && (
                <button onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition"
                  aria-label="Clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* CTAs — stack on small, side by side on sm+ */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/free-trial"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0557b0] hover:to-[#0078e0] text-white font-semibold px-5 sm:px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#046BD2]/20 text-sm whitespace-nowrap"
              >
                <Phone className="w-4 h-4 shrink-0" />
                Start a Free Trial
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/pricing"
                className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/25 hover:bg-white/[0.04] text-white/70 hover:text-white font-medium px-5 sm:px-6 py-3.5 rounded-xl transition-all text-sm whitespace-nowrap"
              >
                See Pricing
              </Link>
            </div>
          </motion.div>

          {/* Right: SVG — hidden on mobile, shown from lg */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:flex items-center justify-center"
          >
            <HubSVG />
          </motion.div>
        </div>

        {/* Stats ribbon — 2 cols on mobile, 4 on sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.07] -mb-px relative z-10"
        >
          {[
            { icon: Hash,  value: `${totalCodes}+`, label: "Area Codes" },
            { icon: MapPin, value: `${totalStates}`, label: "States & Territories" },
            { icon: Globe,  value: "150+", label: "Countries" },
            { icon: Clock,  value: "< 10 min", label: "Setup Time" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center justify-center py-4 sm:py-5 px-2 sm:px-4 bg-[#0A1525]">
              <Icon className="w-3.5 h-3.5 text-[#22D3EE]/60 mb-1.5 sm:mb-2" />
              <span className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent tabular-nums leading-none">
                {value}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wide sm:tracking-widest text-white/35 mt-1 text-center leading-tight">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 2. Why Virtual Local Numbers ─────────────────────────────────────────────

const WHY_ITEMS = [
  { icon: TrendingUp, color: "#22D3EE", stat: "3×",     title: "Higher answer rates",      body: "Calls from a recognizable local area code are answered up to 3× more often than unknown out-of-state or toll-free numbers." },
  { icon: Building2,  color: "#0086F9", stat: "0",      title: "No physical office needed", body: "Get a local presence in any U.S. market without renting office space, hiring local staff, or installing hardware." },
  { icon: Users,      color: "#22D3EE", stat: "150+",   title: "Covers every U.S. market",  body: "From major metros to mid-size markets, Rozper offers virtual numbers across all U.S. area codes — instantly." },
  { icon: BarChart3,  color: "#0086F9", stat: "99.99%", title: "Carrier-grade reliability", body: "Built on a carrier-grade network with 99.99% uptime SLA. Your local number stays live around the clock." },
  { icon: PhoneCall,  color: "#22D3EE", stat: "< 10s",  title: "Instant call routing",      body: "Calls ring your team's existing devices — mobiles, desktops, desk phones — in under 10 seconds, anywhere." },
  { icon: BadgeCheck, color: "#0086F9", stat: "24/7",   title: "Expert support included",   body: "Every plan includes round-the-clock live support from real VoIP engineers — not bots, not email tickets." },
]

export function WhyVirtualNumbers() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute -top-40 left-0 w-[500px] h-[500px] rounded-full bg-[#046BD2]/6 blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div {...fi()} className="mb-10 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/25 mb-4 sm:mb-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Why Local Numbers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Why businesses choose local area codes
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-xl mx-auto">
            A local number isn't just a format — it changes how customers perceive and respond to your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {WHY_ITEMS.map((item, i) => (
            <motion.div key={item.title} {...fi(i * 0.07)}
              className="group relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.07] hover:border-white/[0.14] rounded-2xl p-5 sm:p-6 overflow-hidden transition-all duration-300"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/0 group-hover:bg-[#046BD2]/6 blur-xl transition-all duration-500" />
              <div className="flex items-start justify-between mb-4 sm:mb-5 relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border shrink-0"
                  style={{ background: `${item.color}18`, borderColor: `${item.color}28` }}
                >
                  <item.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" style={{ color: item.color, width: 18, height: 18 }} />
                </div>
                <span className="text-xl sm:text-2xl font-black tabular-nums" style={{ color: item.color, opacity: 0.7 }}>
                  {item.stat}
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mb-2 leading-snug relative">{item.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed relative">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 3. Browse by State ───────────────────────────────────────────────────────

export function BrowseByState({ stateGroups }: { stateGroups: StateGroup[] }) {
  const [stateQuery, setStateQuery] = useState("")

  const filtered = useMemo(() => {
    const q = stateQuery.toLowerCase().trim()
    if (!q) return stateGroups
    return stateGroups.filter(s =>
      s.state.toLowerCase().includes(q) ||
      s.abbr.toLowerCase().includes(q) ||
      s.codes.some(c => c.includes(q))
    )
  }, [stateGroups, stateQuery])

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row — stacks on mobile */}
        <motion.div {...fi()} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-5 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Browse by State</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
              All U.S. States & Territories
            </h2>
            <p className="text-white/45 text-sm max-w-lg">
              {stateGroups.length} states and territories — click any to see all available area codes.
            </p>
          </div>

          {/* State filter — full width on mobile, fixed on sm+ */}
          <div className="relative w-full sm:w-60 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input type="text" value={stateQuery} onChange={e => setStateQuery(e.target.value)}
              placeholder="Filter states…"
              className="w-full bg-white/[0.05] border border-white/[0.09] rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#046BD2]/55 transition-all"
            />
            {stateQuery && (
              <button onClick={() => setStateQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center py-14 text-white/30">
            <p className="text-lg font-semibold mb-1">No states match</p>
            <p className="text-sm">Try a different state name or area code.</p>
          </div>
        ) : (
          /* 2 cols on mobile → 3 sm → 4 md → 5 lg → 6 xl */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
            {filtered.map((sg, i) => (
              <motion.div key={sg.stateSlug}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 18) * 0.025, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/area-codes/${sg.stateSlug}`}
                  className="group relative flex flex-col bg-white/[0.03] hover:bg-[#0F1D30] border border-white/[0.07] hover:border-[#046BD2]/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-250 overflow-hidden h-full"
                >
                  <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-[#046BD2]/0 group-hover:bg-[#046BD2]/10 blur-xl transition-all duration-400" />

                  {/* Abbreviation */}
                  <span className="text-xl sm:text-2xl font-black bg-gradient-to-br from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent leading-none mb-1 relative">
                    {sg.abbr}
                  </span>

                  {/* State name */}
                  <span className="text-[10px] sm:text-[11px] font-medium text-white/65 leading-tight mb-2.5 sm:mb-3 relative line-clamp-1">
                    {sg.state}
                  </span>

                  {/* Code chips — show 2 on mobile, 3 on sm+ */}
                  <div className="flex flex-wrap gap-1 mb-2 relative">
                    {sg.codes.slice(0, 2).map(c => (
                      <span key={c} className="sm:hidden text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-white/40 group-hover:border-[#046BD2]/30 group-hover:text-white/60 transition-colors">
                        {c}
                      </span>
                    ))}
                    {sg.codes.slice(0, 3).map(c => (
                      <span key={`sm-${c}`} className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-white/40 group-hover:border-[#046BD2]/30 group-hover:text-white/60 transition-colors">
                        {c}
                      </span>
                    ))}
                    {sg.totalCodes > 3 && (
                      <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.04] text-white/25">
                        +{sg.totalCodes - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between relative mt-auto">
                    <span className="text-[9px] sm:text-[10px] text-white/25 font-mono">{sg.totalCodes} code{sg.totalCodes !== 1 ? "s" : ""}</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/20 group-hover:text-[#22D3EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── 4. Popular Area Codes ────────────────────────────────────────────────────

const POPULAR = [
  { code: "212", city: "New York City", stateSlug: "new-york",     abbr: "NY", desc: "Manhattan's iconic code" },
  { code: "310", city: "Los Angeles",   stateSlug: "california",   abbr: "CA", desc: "West LA, Santa Monica" },
  { code: "312", city: "Chicago",       stateSlug: "illinois",     abbr: "IL", desc: "Downtown Chicago loop" },
  { code: "415", city: "San Francisco", stateSlug: "california",   abbr: "CA", desc: "SF & Marin County" },
  { code: "305", city: "Miami",         stateSlug: "florida",      abbr: "FL", desc: "Miami-Dade area" },
  { code: "617", city: "Boston",        stateSlug: "massachusetts", abbr: "MA", desc: "Greater Boston" },
  { code: "713", city: "Houston",       stateSlug: "texas",        abbr: "TX", desc: "Central Houston" },
  { code: "404", city: "Atlanta",       stateSlug: "georgia",      abbr: "GA", desc: "Metro Atlanta" },
  { code: "702", city: "Las Vegas",     stateSlug: "nevada",       abbr: "NV", desc: "Las Vegas metro" },
  { code: "512", city: "Austin",        stateSlug: "texas",        abbr: "TX", desc: "Austin & Round Rock" },
  { code: "206", city: "Seattle",       stateSlug: "washington",   abbr: "WA", desc: "Seattle metro" },
  { code: "303", city: "Denver",        stateSlug: "colorado",     abbr: "CO", desc: "Denver metro area" },
]

export function PopularAreaCodes() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-[#22D3EE]/5 blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div {...fi()} className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Most Requested</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            Popular area codes
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-xl">
            The area codes businesses request most for local presence in major U.S. markets.
          </p>
        </motion.div>

        {/* 2 cols mobile → 3 sm → 4 md → 6 lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {POPULAR.map(({ code, city, stateSlug, abbr, desc }, i) => (
            <motion.div key={code}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/area-codes/${stateSlug}/${code}`}
                className="group relative flex flex-col h-full bg-[#0B1728]/80 hover:bg-[#101C2E] border border-white/[0.07] hover:border-[#22D3EE]/35 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-[#22D3EE]/0 group-hover:bg-[#22D3EE]/8 blur-xl transition-all duration-500" />
                {/* State badge */}
                <div className="flex items-center justify-between mb-2.5 sm:mb-3 relative">
                  <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-[#046BD2]/15 border border-[#046BD2]/25 text-[#22D3EE]/80">
                    {abbr}
                  </span>
                  <Star className="w-3 h-3 text-[#22D3EE]/30 group-hover:text-[#22D3EE]/70 transition-colors" />
                </div>
                {/* Code */}
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white/90 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#22D3EE] group-hover:to-[#046BD2] group-hover:bg-clip-text transition-all duration-300 leading-none mb-1 relative">
                  {code}
                </span>
                {/* City */}
                <span className="text-[11px] sm:text-xs font-semibold text-white/65 mb-0.5 sm:mb-1 relative line-clamp-1">{city}</span>
                <span className="text-[10px] text-white/30 leading-snug relative line-clamp-2">{desc}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 5. Full Directory ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.03, duration: 0.36 } }),
}

const STATE_ABBR: Record<string, string> = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
  Colorado: "CO", Connecticut: "CT", Delaware: "DE", "District of Columbia": "DC",
  Florida: "FL", Georgia: "GA", Hawaii: "HI", Idaho: "ID", Illinois: "IL",
  Indiana: "IN", Iowa: "IA", Kansas: "KS", Kentucky: "KY", Louisiana: "LA",
  Maine: "ME", Maryland: "MD", Massachusetts: "MA", Michigan: "MI", Minnesota: "MN",
  Mississippi: "MS", Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", Ohio: "OH", Oklahoma: "OK",
  Oregon: "OR", Pennsylvania: "PA", "Puerto Rico": "PR", "Rhode Island": "RI",
  "South Carolina": "SC", "South Dakota": "SD", Tennessee: "TN", Texas: "TX",
  Utah: "UT", Vermont: "VT", Virginia: "VA", Washington: "WA",
  "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY",
}

export function AreaCodeDirectory({ codes, stateGroups, query, setQuery }: {
  codes: AreaCodeMeta[]
  stateGroups: StateGroup[]
  query: string
  setQuery: (q: string) => void
}) {
  const [MapComp, setMapComp] = useState<React.ComponentType<{
    stateGroups: StateGroup[]
    onStateHover?: (state: string | null) => void
    onStateSelect?: (state: string) => void
  }> | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)

  useEffect(() => {
    import("@/components/area-codes/us-hub-map").then(m => setMapComp(() => m.default))
  }, [])

  const isSearching = query.trim().length > 0

  const sidebarCodes = useMemo(() => {
    if (isSearching) {
      const q = query.toLowerCase().trim()
      return codes.filter(c =>
        c.code.includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        (STATE_ABBR[c.state] ?? "").toLowerCase() === q
      ).slice(0, 60)
    }
    if (selectedState) return codes.filter(c => c.state === selectedState)
    return []
  }, [codes, query, selectedState, isSearching])

  const activeGroup = !isSearching && selectedState
    ? stateGroups.find(g => g.state === selectedState) ?? null
    : null

  return (
    <section id="directory" className="py-14 sm:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div {...fi()} className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
            Explore by state
          </h2>
          <p className="text-white/45 text-sm">
            {isSearching
              ? `${sidebarCodes.length} result${sidebarCodes.length !== 1 ? "s" : ""} for "${query}"`
              : `Click any state on the map to browse its area codes`}
          </p>
        </motion.div>

        <motion.div {...fi(0.06)}
          className="rounded-2xl border border-white/[0.08] bg-[#0B1728]/60 overflow-hidden"
        >
          <div className="grid lg:grid-cols-[1fr_360px]" style={{ minHeight: 480 }}>

            {/* Left: interactive map */}
            <div className="relative flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#046BD2]/6 via-transparent to-[#22D3EE]/4">
              {MapComp ? (
                <MapComp stateGroups={stateGroups} onStateSelect={setSelectedState} />
              ) : (
                <div className="w-full aspect-[960/560] rounded-xl bg-[#0D1E33]/60 animate-pulse flex items-center justify-center">
                  <span className="text-white/20 text-xs font-mono">Loading map…</span>
                </div>
              )}
            </div>

            {/* Right: sidebar */}
            <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-white/[0.06]">

              {activeGroup ? (
                <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="text-xl font-black text-white">{activeGroup.state}</span>
                    <span className="text-[10px] font-mono text-[#22D3EE]/70 bg-[#22D3EE]/10 border border-[#22D3EE]/20 px-2 py-0.5 rounded-full">
                      {activeGroup.abbr}
                    </span>
                  </div>
                  <p className="text-white/35 text-xs">
                    {activeGroup.totalCodes} area code{activeGroup.totalCodes !== 1 ? "s" : ""} · click any to get a number
                  </p>
                </div>
              ) : isSearching ? (
                <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
                  <p className="text-white font-semibold text-sm">
                    {sidebarCodes.length} result{sidebarCodes.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-white/35 text-xs mt-0.5">for &ldquo;{query}&rdquo;</p>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center px-8 py-16">
                  <p className="text-white/25 text-sm text-center">Click to explore the area codes</p>
                </div>
              )}

              {sidebarCodes.length > 0 && (
                <div
                  className="flex-1 overflow-y-auto px-3 py-3"
                  style={{ maxHeight: 360, scrollbarWidth: "thin", scrollbarColor: "rgba(4,107,210,0.25) transparent" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeGroup?.state ?? query}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1"
                    >
                      {sidebarCodes.map(c => (
                        <Link
                          key={c.code + c.state}
                          href={`/area-codes/${c.stateSlug}/${c.code}`}
                          className="group flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl hover:bg-[#046BD2]/10 border border-transparent hover:border-[#046BD2]/25 transition-all duration-150"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-base font-black text-white group-hover:text-[#22D3EE] transition-colors tabular-nums leading-none shrink-0">
                              {c.code}
                            </span>
                            {c.city && (
                              <span className="text-white/35 text-xs truncate group-hover:text-white/55 transition-colors">
                                {c.city}
                              </span>
                            )}
                            {isSearching && (
                              <span className="text-white/20 text-[10px] font-mono shrink-0">
                                {STATE_ABBR[c.state] ?? c.state.slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-white/15 group-hover:text-[#22D3EE]/60 shrink-0 transition-colors" />
                        </Link>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {activeGroup && (
                <div className="p-4 border-t border-white/[0.06] mt-auto">
                  <Link
                    href={`/area-codes/${activeGroup.stateSlug}`}
                    className="group flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#046BD2]/12 hover:bg-[#046BD2]/22 border border-[#046BD2]/25 hover:border-[#046BD2]/50 text-[#22D3EE] text-xs font-semibold transition-all"
                  >
                    Explore all {activeGroup.state} numbers
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              )}

              {isSearching && sidebarCodes.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-12">
                  <Search className="w-8 h-8 text-white/10 mb-3" />
                  <p className="text-white/30 text-sm">No results</p>
                  <p className="text-white/20 text-xs mt-1">Try a different code, city, or state</p>
                  <button onClick={() => setQuery("")} className="mt-4 text-[#22D3EE]/60 text-xs hover:text-[#22D3EE] transition-colors">
                    Clear search
                  </button>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── 6. FAQ ───────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "What is a virtual area code number?",           a: "A virtual area code number is a phone number with a specific regional area code that routes calls to any device or team you choose — without requiring a physical office or landline in that area. You can have a 212 (New York) number while your team works from anywhere in the world." },
  { q: "Can I choose any U.S. area code for my business?", a: "Yes. Rozper offers virtual numbers across all 300+ U.S. area codes. Simply select the area code you want during setup, choose an available number, and you're live in under 10 minutes." },
  { q: "How quickly can I activate a new area code number?", a: "Setup takes under 10 minutes. Select your plan, pick your area code and number, configure basic routing rules, and your number is immediately active. No hardware installation or waiting period required." },
  { q: "Can I port my existing number to a different area code?", a: "You can port your existing phone number to Rozper to keep your current number and gain access to all platform features. If you want a new area code, you can add additional numbers to your account without losing your existing one." },
  { q: "Do I need to be located in the area code's geographic region?", a: "No. Virtual numbers work independently of your physical location. A business in Texas can have a 212 New York number, and calls to that number will route directly to your team wherever they work." },
  { q: "What features are included with every virtual number?",  a: "Every Rozper number includes call forwarding, voicemail-to-text, call recording, IVR/auto-attendant, caller ID management, mobile apps for iOS and Android, and integrations with Salesforce, HubSpot, Zoho, and 300+ other tools." },
]

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border rounded-xl sm:rounded-2xl transition-all duration-200 ${open ? "border-[#046BD2]/30 bg-white/[0.04]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"}`}>
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
          <span className="text-[#22D3EE]/40 font-mono text-[10px] sm:text-xs mt-0.5 shrink-0 tabular-nums font-bold">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold text-white/85 leading-snug">{q}</span>
        </div>
        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${open ? "bg-[#046BD2]/20 rotate-180" : "bg-white/[0.05]"}`}>
          <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${open ? "text-[#22D3EE]" : "text-white/30"}`} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }} className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/[0.05]">
              <p className="pt-3 sm:pt-4 text-sm text-white/50 leading-relaxed pl-5 sm:pl-8">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function HubFAQ() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-col on lg, single-col on mobile */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
          {/* Left — sticky only on lg */}
          <motion.div {...fi()} className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Common questions
            </h2>
            <p className="text-white/45 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              Everything you need to know about getting and using virtual area code numbers for your business.
            </p>
            <Link href="/contact"
              className="group inline-flex items-center gap-2 text-[#22D3EE] text-sm font-medium hover:text-white transition"
            >
              Have more questions?
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: accordion */}
          <div className="space-y-2.5 sm:space-y-3">
            {FAQS.map((f, i) => (
              <motion.div key={i} {...fi(i * 0.05)}>
                <FAQItem q={f.q} a={f.a} i={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 7. Final CTA ─────────────────────────────────────────────────────────────

export function HubCTA() {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()} className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#046BD2]/20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/18 via-[#0B1220] to-[#22D3EE]/8" />
          <div className="absolute -top-24 left-1/3 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full bg-[#046BD2]/12 blur-[100px]" />
          <div className="absolute -bottom-16 right-1/4 w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] rounded-full bg-[#22D3EE]/8 blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(120,160,220,0.25) 1px,transparent 0)", backgroundSize: "24px 24px" }} />

          <div className="relative px-5 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20">
            {/* Two-col on lg, stacked on mobile */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/15 border border-[#046BD2]/30 mb-5 sm:mb-6">
                  <Zap className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
                    Ready in under 10 minutes
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  Get your local number
                  <br />
                  <span className="bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
                    today, not tomorrow.
                  </span>
                </h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-md">
                  No hardware. No contracts. No waiting. Pick an area code, choose your number, and start calling immediately.
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col gap-4">
                {/* Buttons — stack on mobile, row on sm+ */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/free-trial"
                    className="group flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0557b0] hover:to-[#0078e0] text-white font-bold px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl transition-all shadow-lg shadow-[#046BD2]/25 text-sm"
                  >
                    Start a Free Trial
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link href="/pricing"
                    className="inline-flex items-center justify-center border border-white/15 hover:border-white/30 hover:bg-white/[0.04] text-white/75 hover:text-white font-semibold px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl transition-all text-sm whitespace-nowrap"
                  >
                    See Pricing
                  </Link>
                </div>

                {/* Checklist — 1 col on xs, 2 cols on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-1 sm:pt-2">
                  {[
                    "No physical office needed",
                    "Works on any device",
                    "99.99% uptime SLA",
                    "24/7 live support",
                    "Cancel anytime",
                    "Instant number portability",
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs text-white/45">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3EE]/60 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Shared animation helper ──────────────────────────────────────────────────

function fi(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] },
  }
}
