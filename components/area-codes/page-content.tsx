"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  MapPin, Building2, Phone, PhoneCall, Mic, MessageSquare, Link2,
  Cpu, UserCheck, Layers, ChevronDown, ArrowRight, Check, Zap,
  Globe, Shield, Hash, Clock, ShieldCheck, TrendingUp,
  BarChart3, Users, Headphones, BadgeCheck, Star, ArrowUpRight,
  Laptop, Briefcase,
} from "lucide-react"
import type { AreaCodeData } from "@/lib/area-code-data"

// ─── Shared helpers ────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] },
})

// ─── Animated phone SVG ───────────────────────────────────────────────────────

function PhoneIllustration({ code, city }: { code: string; city: string }) {
  const gId = `pg${code}`
  const glowId = `pglow${code}`
  const screenId = `pscr${code}`

  return (
    <div className="relative w-full flex items-center justify-center select-none pointer-events-none">
      {/* Ambient glows */}
      <div className="absolute w-64 h-64 rounded-full bg-[#046BD2]/20 blur-[80px]" />
      <div className="absolute w-40 h-40 rounded-full bg-[#22D3EE]/10 blur-[60px] translate-y-8" />

      <svg viewBox="0 0 360 480" className="relative w-full max-w-[260px] sm:max-w-[290px] lg:max-w-[310px]" fill="none" aria-hidden>
        <defs>
          <linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#046BD2" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id={screenId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0A1628" />
            <stop offset="100%" stopColor="#060D1A" />
          </linearGradient>
          <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer ripple rings */}
        {[175, 148, 120].map((r, i) => (
          <motion.circle key={r} cx={180} cy={240} r={r}
            stroke={i === 0 ? "#046BD2" : "#22D3EE"}
            strokeOpacity={0.05 + i * 0.03}
            strokeWidth={1}
            strokeDasharray={i === 1 ? "5 10" : undefined}
            fill="none"
            animate={{ r: [r, r + 5, r], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }}
          />
        ))}

        {/* Phone body */}
        <rect x={92} y={55} width={176} height={346} rx={28}
          fill="#0B1728" stroke={`url(#${gId})`} strokeWidth={1.5} strokeOpacity={0.6} />

        {/* Screen */}
        <rect x={103} y={73} width={154} height={308} rx={20}
          fill={`url(#${screenId})`} />

        {/* Notch */}
        <rect x={163} y={77} width={34} height={9} rx={4.5} fill="#060D1A" />
        <circle cx={180} cy={81.5} r={3} fill="#0D1E35" stroke="#046BD2" strokeOpacity={0.35} strokeWidth={0.5} />

        {/* Side buttons */}
        <rect x={86} y={126} width={6} height={30} rx={3} fill="#0D1E35" stroke="#046BD2" strokeOpacity={0.2} strokeWidth={1} />
        <rect x={268} y={115} width={6} height={22} rx={3} fill="#0D1E35" stroke="#046BD2" strokeOpacity={0.2} strokeWidth={1} />

        {/* Area code — big number with glow */}
        <motion.text
          x={180} y={208}
          textAnchor="middle"
          fill={`url(#${gId})`}
          fontSize="62" fontWeight="900"
          fontFamily="system-ui,-apple-system,sans-serif"
          filter={`url(#${glowId})`}
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {code}
        </motion.text>

        {/* AREA CODE label */}
        <text x={180} y={225} textAnchor="middle" fill="#22D3EE" fontSize="8"
          fontFamily="system-ui,sans-serif" letterSpacing="5" fillOpacity={0.75}>
          AREA CODE
        </text>

        {/* City */}
        <text x={180} y={243} textAnchor="middle" fill="white" fontSize="10.5"
          fontFamily="system-ui,sans-serif" fillOpacity={0.4}>
          {city || "United States"}
        </text>

        {/* Divider */}
        <line x1={150} y1={254} x2={210} y2={254} stroke="white" strokeOpacity={0.07} strokeWidth={1} />

        {/* Map pin icon */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx={180} cy={283} r={20} fill="#046BD2" fillOpacity={0.1} />
          <circle cx={180} cy={283} r={12} fill="#046BD2" fillOpacity={0.18} />
          <path
            d="M180 271 C174.5 271 170 275.3 170 280.8 C170 288.8 180 299 180 299 C180 299 190 288.8 190 280.8 C190 275.3 185.5 271 180 271Z"
            fill={`url(#${gId})`}
          />
          <circle cx={180} cy={280.8} r={4} fill="#060D1A" />
        </motion.g>

        {/* Signal bars */}
        <rect x={136} y={317} width={5} height={9} rx={1.5} fill="#046BD2" fillOpacity={0.5} />
        <rect x={144} y={313} width={5} height={13} rx={1.5} fill="#046BD2" fillOpacity={0.65} />
        <rect x={152} y={309} width={5} height={17} rx={1.5} fill="#22D3EE" fillOpacity={0.75} />
        <rect x={160} y={305} width={5} height={21} rx={1.5} fill="#22D3EE" fillOpacity={0.85} />

        {/* Virtual chip */}
        <rect x={177} y={311} width={52} height={15} rx={7.5}
          fill="#046BD2" fillOpacity={0.18} stroke="#046BD2" strokeOpacity={0.4} strokeWidth={0.6} />
        <text x={203} y={321.5} textAnchor="middle" fill="#22D3EE" fontSize="7.5"
          fontFamily="system-ui,sans-serif" fillOpacity={0.9} letterSpacing="1">
          VIRTUAL
        </text>

        {/* Home bar */}
        <rect x={161} y={369} width={38} height={3} rx={1.5} fill="white" fillOpacity={0.15} />

        {/* Floating markers */}
        <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.5 }}>
          <circle cx={52} cy={136} r={10} fill="#046BD2" fillOpacity={0.12} stroke="#046BD2" strokeOpacity={0.45} strokeWidth={1.5} />
          <circle cx={52} cy={136} r={4.5} fill="#046BD2" fillOpacity={0.8} />
          <line x1={91} y1={152} x2={62} y2={138} stroke="#046BD2" strokeOpacity={0.2} strokeWidth={1} strokeDasharray="3 6" />
        </motion.g>
        <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.8, repeat: Infinity, delay: 1 }}>
          <circle cx={310} cy={156} r={10} fill="#22D3EE" fillOpacity={0.12} stroke="#22D3EE" strokeOpacity={0.45} strokeWidth={1.5} />
          <circle cx={310} cy={156} r={4.5} fill="#22D3EE" fillOpacity={0.8} />
          <line x1={268} y1={174} x2={300} y2={158} stroke="#22D3EE" strokeOpacity={0.2} strokeWidth={1} strokeDasharray="3 6" />
        </motion.g>
        <circle cx={42} cy={320} r={7} fill="#046BD2" fillOpacity={0.1} stroke="#046BD2" strokeOpacity={0.3} strokeWidth={1} />
        <circle cx={42} cy={320} r={3} fill="#046BD2" fillOpacity={0.55} />
        <circle cx={322} cy={332} r={7} fill="#22D3EE" fillOpacity={0.1} stroke="#22D3EE" strokeOpacity={0.3} strokeWidth={1} />
        <circle cx={322} cy={332} r={3} fill="#22D3EE" fillOpacity={0.55} />
      </svg>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function AreaCodeHero({ data, stateSlug }: { data: AreaCodeData; stateSlug?: string }) {
  const resolvedStateSlug = stateSlug ?? data.stateSlug

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/15 via-[#0B1220] to-[#0B1220]" />
        <div className="absolute -top-48 -left-24 w-[700px] h-[700px] rounded-full bg-[#046BD2]/12 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#22D3EE]/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(120,160,220,0.2) 1px,transparent 0)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[11px] font-mono text-white/30 mb-8">
              <Link href="/" className="hover:text-white/60 transition">home</Link>
              <span className="text-white/15">/</span>
              <Link href="/area-codes" className="hover:text-white/60 transition">area-codes</Link>
              {data.state && resolvedStateSlug && (
                <>
                  <span className="text-white/15">/</span>
                  <Link href={`/area-codes/${resolvedStateSlug}`} className="hover:text-white/60 transition">
                    {resolvedStateSlug}
                  </Link>
                </>
              )}
              <span className="text-white/15">/</span>
              <span className="text-[#22D3EE]">{data.code}</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-6">
              <Hash className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22D3EE]">
                {data.state || "United States"} · Area Code {data.code}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.04] tracking-tight mb-5">
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                {data.code}
              </span>
              <br />
              <span>{data.city || data.state}</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/40 tracking-normal">
                Virtual Numbers
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/55 mb-8 leading-relaxed max-w-lg">
              {data.excerpt}
            </p>

            {/* Overlay codes */}
            {data.overlays.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest">Overlay:</span>
                {data.overlays.map(o => (
                  <span key={o} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-white/50">
                    {o}
                  </span>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/contact"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0557b0] hover:to-[#0078e0] text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#046BD2]/20 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" />
                Start a Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="#coverage"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-[#22D3EE]/40 hover:bg-white/[0.04] text-white/75 hover:text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm sm:text-base"
              >
                See Coverage
              </Link>
            </div>
          </motion.div>

          {/* Right: illustration */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:flex items-center justify-center"
          >
            <PhoneIllustration code={data.code} city={data.city} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Coverage ─────────────────────────────────────────────────────────────────

export function CoverageSection({ data }: { data: AreaCodeData }) {
  if (data.cities.length === 0 && data.counties.length === 0) return null

  return (
    <section id="coverage" className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {data.code} Coverage Area
          </h2>
          <p className="text-white/45 text-base max-w-lg">
            Cities and counties served by the {data.code} area code in {data.state || "the United States"}.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Cities */}
          {data.cities.length > 0 && (
            <motion.div {...fadeUp(0.1)}
              className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-[#046BD2]/30 rounded-2xl p-7 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#046BD2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#046BD2]/30 to-[#046BD2]/10 flex items-center justify-center border border-[#046BD2]/20">
                    <Building2 className="w-5 h-5 text-[#046BD2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Cities Covered by {data.code}</h3>
                    <p className="text-xs text-white/35 mt-0.5 font-mono">{data.cities.length} cities</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {data.cities.map(city => (
                    <div key={city} className="flex items-center gap-2 text-sm text-white/55">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#046BD2] to-[#22D3EE] shrink-0" />
                      <span className="truncate">{city}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Counties */}
          {data.counties.length > 0 && (
            <motion.div {...fadeUp(0.15)}
              className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-[#22D3EE]/25 rounded-2xl p-7 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#22D3EE]/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE]/20 to-[#22D3EE]/5 flex items-center justify-center border border-[#22D3EE]/15">
                    <MapPin className="w-5 h-5 text-[#22D3EE]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Counties Covered</h3>
                    <p className="text-xs text-white/35 mt-0.5 font-mono">{data.counties.length} counties</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {data.counties.map(county => (
                    <div key={county} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#22D3EE]/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#22D3EE]" />
                      </div>
                      <span className="text-sm text-white/55">{county}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Map ──────────────────────────────────────────────────────────────────────

export function MapSection({ city, state, code }: { city: string; state: string; code: string }) {
  const location = [city, state].filter(Boolean).join(", ")
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(location || code)}&t=&z=11&ie=UTF8&iwloc=&output=embed`

  return (
    <section className="py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Coverage Map</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {code} Area Code — Where It Covers
          </h2>
          <p className="text-white/45 text-base max-w-lg">
            The geographic service area for{location ? ` ${location}` : ` area code ${code}`} virtual phone numbers.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50">
          <div aria-hidden className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#0B1220] to-transparent z-10 pointer-events-none" />
          <iframe
            title={`${code} area code map — ${location}`}
            src={mapSrc}
            className="w-full h-[280px] sm:h-[400px] lg:h-[500px] block"
            style={{ border: 0, filter: "saturate(0.8) contrast(1.05) brightness(0.95)" }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
          <div aria-hidden className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0B1220] to-transparent z-10 pointer-events-none" />

          <div className="absolute bottom-6 left-4 sm:left-6 z-20 flex items-center gap-2.5 bg-[#0B1220]/90 backdrop-blur-md border border-white/[0.12] rounded-xl px-3.5 py-2.5 shadow-xl">
            <div className="w-7 h-7 rounded-lg bg-[#046BD2]/20 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#046BD2]" />
            </div>
            <div>
              <p className="text-white text-xs font-semibold leading-tight">{location || `Area Code ${code}`}</p>
              <p className="text-white/35 text-[10px] font-mono leading-tight">Area Code {code}</p>
            </div>
          </div>

          <a href={`https://maps.google.com/maps?q=${encodeURIComponent(location || code)}`}
            target="_blank" rel="noopener noreferrer"
            className="absolute bottom-6 right-4 sm:right-6 z-20 flex items-center gap-1.5 bg-[#0B1220]/90 backdrop-blur-md border border-white/[0.12] hover:border-[#046BD2]/50 rounded-xl px-3.5 py-2.5 text-xs text-white/45 hover:text-white/80 transition-all shadow-xl"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open in Google Maps</span>
            <span className="sm:hidden">Open</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Why section ──────────────────────────────────────────────────────────────

const WHY_ITEMS = [
  {
    icon: TrendingUp,
    gradient: "from-[#046BD2]/20 to-[#046BD2]/5",
    border: "border-[#046BD2]/20",
    iconBg: "from-[#046BD2]/30 to-[#046BD2]/10",
    iconBorder: "border-[#046BD2]/20",
    iconColor: "#22D3EE",
    title: "Higher answer rates",
    body: "Local area codes are answered significantly more than toll-free or out-of-state numbers. Familiarity builds pickup before the call connects.",
  },
  {
    icon: UserCheck,
    gradient: "from-[#22D3EE]/12 to-[#22D3EE]/3",
    border: "border-[#22D3EE]/15",
    iconBg: "from-[#22D3EE]/20 to-[#22D3EE]/5",
    iconBorder: "border-[#22D3EE]/15",
    iconColor: "#22D3EE",
    title: "Instant local trust",
    body: "A local prefix signals accountability and presence. Customers know they're dealing with a business invested in their market.",
  },
  {
    icon: Building2,
    gradient: "from-[#0086F9]/15 to-[#046BD2]/5",
    border: "border-[#0086F9]/15",
    iconBg: "from-[#0086F9]/25 to-[#0086F9]/8",
    iconBorder: "border-[#0086F9]/20",
    iconColor: "#0086F9",
    title: "No physical office needed",
    body: "Route your virtual number to wherever your team works. Local market presence without the cost of a physical location.",
  },
  {
    icon: Phone,
    gradient: "from-[#22D3EE]/10 to-[#0086F9]/5",
    border: "border-[#22D3EE]/15",
    iconBg: "from-[#22D3EE]/20 to-[#0086F9]/5",
    iconBorder: "border-[#22D3EE]/15",
    iconColor: "#22D3EE",
    title: "Customers call more freely",
    body: "Remove hesitation over unfamiliar prefixes. A local number makes calling feel natural and removes long-distance barriers.",
  },
]

export function WhySection({ city, code }: { city: string; code: string }) {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#046BD2]/4 via-transparent to-[#22D3EE]/4 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Local Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Why a Local {city || code} Number Matters
          </h2>
          <p className="text-white/45 text-base max-w-xl">
            A {code} area code does more than identify a city — it builds trust before the call connects.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {WHY_ITEMS.map((item, i) => (
            <motion.div key={item.title} {...fadeUp(i * 0.07)}
              className={`group relative bg-gradient-to-br ${item.gradient} border ${item.border} rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] overflow-hidden`}
            >
              <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/0 group-hover:bg-white/[0.03] blur-xl transition-all duration-500" />
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center mb-5 border ${item.iconBorder} relative`}>
                <item.icon className="w-5 h-5" style={{ color: item.iconColor }} />
              </div>
              <h3 className="font-bold text-white text-sm mb-2.5 leading-snug relative">{item.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed relative">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: PhoneCall, title: "Call forwarding & smart routing", body: "Route to any device — mobile, desk phone, or softphone. Define rules by time-of-day, caller location, or IVR menu." },
  { icon: Mic, title: "Call recording & transcription", body: "Every call logged and retrievable from your dashboard. Builds a training library and dispute record automatically." },
  { icon: MessageSquare, title: "Voicemail to text", body: "Transcribed voicemails delivered as readable text via email, app, or SMS. Prioritize messages without listening to each one." },
  { icon: Link2, title: "CRM integration", body: "Native integrations with Salesforce, HubSpot, and Zoho. Every call auto-logged against the correct contact with recordings." },
  { icon: BarChart3, title: "AI analytics & insights", body: "Surfaces sentiment trends, keyword flags, and agent performance. Identifies what calls convert and where follow-up matters." },
  { icon: UserCheck, title: "Caller ID management", body: "Outbound calls from personal devices display your business number. Consistent branding on every outbound interaction." },
  { icon: Layers, title: "Instant scalability", body: "Add lines the same day you need them. No hardware, no installation delays — scale up or down freely." },
  { icon: Headphones, title: "24/7 live support", body: "Expert support team available around the clock. Real humans, not bots, for your critical business communications." },
  { icon: Globe, title: "150+ countries", body: "Get numbers in over 150 countries on the same platform. Global presence, one unified dashboard." },
]

export function FeaturesSection({ code }: { code: string }) {
  return (
    <section className="py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Included Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            What Your {code} Number Includes
          </h2>
          <p className="text-white/45 text-base max-w-xl">
            The area code gets you noticed. These features build the business after the call connects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] rounded-3xl overflow-hidden border border-white/[0.06]">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} {...fadeUp(i * 0.05)}
              className="group flex gap-4 bg-[#0B1220] hover:bg-[#101C2E] p-6 sm:p-7 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#0086F9]/0 group-hover:bg-[#0086F9]/6 blur-2xl transition-all duration-500" />
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#046BD2]/20 to-[#046BD2]/5 flex items-center justify-center shrink-0 mt-0.5 border border-[#046BD2]/15 group-hover:border-[#046BD2]/35 transition-colors relative">
                <f.icon className="w-[18px] h-[18px] text-[#22D3EE]" strokeWidth={1.8} />
              </div>
              <div className="relative">
                <h3 className="font-bold text-white text-sm mb-2 leading-snug">{f.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Getting started ───────────────────────────────────────────────────────────

const STEPS = [
  { n: "01", icon: Zap, color: "#22D3EE", title: "Choose your plan", body: "Rozper offers plans for solo operators, growing teams, and enterprise contact centers. Every plan includes calling, voicemail, and mobile apps." },
  { n: "02", icon: Hash, color: "#0086F9", title: "Select your number", body: "Choose the area code and pick your preferred number. Vanity options available if you want something easy to remember." },
  { n: "03", icon: Globe, color: "#046BD2", title: "Configure your setup", body: "Set call forwarding, business hours, voicemail greeting, and IVR menus from your Rozper dashboard. No technician required." },
  { n: "04", icon: BadgeCheck, color: "#22D3EE", title: "Go live", body: "Download the Rozper app, sign in, and start receiving and making calls immediately. Fully active in under 10 minutes." },
]

export function GettingStartedSection({ code, city }: { code: string; city: string }) {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#046BD2]/4 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Get Started</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Getting a {code} Number with Rozper
          </h2>
          <p className="text-white/45 text-base">Takes under ten minutes. Active the same day.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#046BD2]/25 to-transparent z-0" />

          {STEPS.map((s, i) => (
            <motion.div key={s.n} {...fadeUp(i * 0.09)} className="relative z-10">
              <div className="group bg-[#0B1220] hover:bg-[#101C2E] border border-white/[0.07] hover:border-[#046BD2]/30 rounded-2xl p-6 h-full transition-all duration-300 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#046BD2]/0 group-hover:bg-[#046BD2]/8 blur-2xl transition-all duration-500" />
                <div className="relative flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ background: `${s.color}22`, borderColor: `${s.color}33` }}
                  >
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <span className="text-3xl font-black text-white/[0.07] leading-none">{s.n}</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2.5 leading-snug relative">{s.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed relative">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open ? "border-[#046BD2]/30 bg-white/[0.04]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"}`}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <span className="text-[#22D3EE]/40 font-mono text-xs mt-0.5 shrink-0 font-bold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold text-white/85 leading-snug">{faq.question}</span>
        </div>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${open ? "bg-[#046BD2]/20 rotate-180" : "bg-white/[0.05]"}`}>
          <ChevronDown className={`w-4 h-4 transition-colors ${open ? "text-[#22D3EE]" : "text-white/35"}`} />
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-white/[0.05]">
          <p className="pt-4 text-sm text-white/50 leading-relaxed pl-8">{faq.answer}</p>
        </div>
      )}
    </motion.div>
  )
}

export function FAQSection({ faqs, code }: { faqs: { question: string; answer: string }[]; code: string }) {
  if (faqs.length === 0) return null
  return (
    <section className="py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {code} Area Code FAQ
            </h2>
            <p className="text-white/45 text-base">Common questions about virtual {code} numbers.</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)}>
                <FAQItem faq={faq} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA Band ─────────────────────────────────────────────────────────────────

export function AreaCodeCTA({ code, city }: { code: string; city: string }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()}
          className="relative overflow-hidden rounded-3xl border border-[#046BD2]/20"
        >
          {/* Layered background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/20 via-[#0B1220] to-[#22D3EE]/8" />
          <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-[#046BD2]/12 blur-[100px]" />
          <div className="absolute -bottom-24 right-1/4 w-[300px] h-[300px] rounded-full bg-[#22D3EE]/8 blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(120,160,220,0.25) 1px,transparent 0)", backgroundSize: "24px 24px" }} />

          <div className="relative px-6 sm:px-12 py-16 sm:py-20 text-center">
            {/* Large background code */}
            <div aria-hidden className="text-[80px] sm:text-[110px] font-black text-white/[0.04] leading-none -mb-2 select-none">
              {code}
            </div>

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#046BD2]/30 to-[#046BD2]/10 border border-[#046BD2]/25 mb-6">
              <Phone className="w-6 h-6 text-[#22D3EE]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Get your {city || code} number today
            </h2>
            <p className="text-white/50 text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
              Active in under ten minutes. 99.99% uptime SLA. 24/7 expert support. Risk-free trial available.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0557b0] hover:to-[#0078e0] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#046BD2]/25 text-sm sm:text-base"
              >
                Start a Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/pricing"
                className="inline-flex items-center justify-center border border-white/15 hover:border-white/30 hover:bg-white/[0.04] text-white/75 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all text-sm sm:text-base"
              >
                See Pricing
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { icon: ShieldCheck, label: "99.99% Uptime" },
                { icon: Globe, label: "150+ Countries" },
                { icon: Headphones, label: "24/7 Expert Support" },
                { icon: Star, label: "No contracts" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-white/30">
                  <Icon className="w-3 h-3 text-[#22D3EE]/40" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Industries that use this area code ────────────────────────────────────────

const INDUSTRY_ITEMS = [
  { icon: Building2,  color: "#22D3EE", title: "Real Estate",          body: "Agents use local area codes to build immediate trust with buyers and sellers. A local number signals community investment." },
  { icon: PhoneCall,  color: "#0086F9", title: "Sales Teams",           body: "Outbound sales with a local code get dramatically higher answer rates and more productive first conversations." },
  { icon: Headphones, color: "#22D3EE", title: "Customer Support",      body: "Support teams with local numbers reduce friction for customers who hesitate to call unfamiliar or toll-free prefixes." },
  { icon: Laptop,     color: "#0086F9", title: "Remote Teams",          body: "Distributed teams maintain a consistent local brand without sharing personal numbers or installing hardware." },
  { icon: Briefcase,  color: "#22D3EE", title: "Professional Services", body: "Lawyers, accountants, and consultants use local numbers to signal proximity and build client confidence." },
  { icon: BarChart3,  color: "#0086F9", title: "Small Business",        body: "Local businesses expand service areas and handle overflow calls without hiring additional staff or renting space." },
]

export function IndustriesSection({ code, city, state }: { code: string; city: string; state: string }) {
  const location = city || state || `the ${code} area`
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Who Uses {code} Numbers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            Industries that rely on {code} area code numbers
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-xl">
            From solo professionals to enterprise teams, a {code} local number drives better outcomes across every sector in {location}.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06]">
          {INDUSTRY_ITEMS.map((item, i) => (
            <motion.div key={item.title} {...fadeUp(i * 0.06)}
              className="group flex gap-4 bg-[#0B1220] hover:bg-[#101C2E] p-5 sm:p-6 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#0086F9]/0 group-hover:bg-[#0086F9]/6 blur-2xl transition-all duration-500" />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border transition-colors relative"
                style={{ background: `${item.color}18`, borderColor: `${item.color}22` }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <div className="relative min-w-0">
                <h3 className="font-bold text-white text-sm mb-1.5 leading-snug">{item.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Related codes in the same state ──────────────────────────────────────────

export type RelatedCode = { code: string; stateSlug: string }

export function RelatedCodesSection({ code, state, stateSlug, relatedCodes }: {
  code: string; state: string; stateSlug: string; relatedCodes: RelatedCode[]
}) {
  if (relatedCodes.length === 0) return null

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#22D3EE]/4 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div {...fadeUp()} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// More {state} Codes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
              Other {state} area codes
            </h2>
            <p className="text-white/45 text-sm sm:text-base">
              Explore all {relatedCodes.length + 1} area codes available across {state}.
            </p>
          </div>
          <Link href={`/area-codes/${stateSlug}`}
            className="shrink-0 inline-flex items-center gap-2 text-[#22D3EE] text-sm font-medium hover:text-white transition group whitespace-nowrap"
          >
            View all {state} codes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {relatedCodes.slice(0, 12).map((rc, i) => (
            <motion.div key={rc.code}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/area-codes/${rc.stateSlug}/${rc.code}`}
                className="group relative flex flex-col bg-white/[0.025] hover:bg-[#0F1D30] border border-white/[0.07] hover:border-[#046BD2]/35 rounded-xl p-3.5 sm:p-4 transition-all duration-250 overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#046BD2]/0 to-transparent group-hover:via-[#22D3EE]/35 transition-all" />
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl sm:text-3xl font-black text-white/85 group-hover:text-[#22D3EE] transition-colors leading-none">
                    {rc.code}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/15 group-hover:text-[#22D3EE]/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-white/35">
                  <MapPin className="w-2.5 h-2.5 text-[#22D3EE]/40 shrink-0" />
                  <span className="truncate font-mono">{state}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {relatedCodes.length > 12 && (
          <div className="mt-5 sm:mt-6 text-center">
            <Link href={`/area-codes/${stateSlug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-[#046BD2]/40 hover:bg-white/[0.04] text-white/50 hover:text-white text-sm transition-all"
            >
              View all {relatedCodes.length + 1} {state} area codes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
