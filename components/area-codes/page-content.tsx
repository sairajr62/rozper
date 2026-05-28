"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  MapPin, Building2, Phone, PhoneCall, Mic, MessageSquare, Link2,
  Cpu, UserCheck, Layers, ChevronDown, ArrowRight, Check, Zap, Globe, Shield,
} from "lucide-react"
import type { AreaCodeData } from "@/lib/area-code-data"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
})

// ─── Hero SVG Illustration ────────────────────────────────────────────────

function PhoneIllustration({ code, city }: { code: string; city: string }) {
  const gId = `g${code}`
  const glowId = `glow${code}`
  const screenId = `screen${code}`
  const pulseId = `pulse${code}`

  return (
    <div className="relative w-full flex items-center justify-center select-none pointer-events-none">
      {/* Ambient glow behind phone */}
      <div className="absolute w-64 h-64 rounded-full bg-[#046BD2]/20 blur-[70px]" />
      <div className="absolute w-40 h-40 rounded-full bg-[#22D3EE]/10 blur-[50px] translate-y-8" />

      <svg
        viewBox="0 0 360 460"
        className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
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
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id={pulseId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Ripple rings ── */}
        <circle cx="180" cy="230" r="175" stroke="#046BD2" strokeOpacity="0.06" strokeWidth="1" />
        <circle cx="180" cy="230" r="148" stroke="#046BD2" strokeOpacity="0.09" strokeWidth="1" strokeDasharray="5 9" />
        <circle cx="180" cy="230" r="120" stroke="#22D3EE" strokeOpacity="0.07" strokeWidth="1" />

        {/* ── Phone body ── */}
        <rect x="95" y="48" width="170" height="330" rx="26"
          fill="#0B1728"
          stroke={`url(#${gId})`} strokeWidth="1.5" strokeOpacity="0.55" />

        {/* ── Side buttons ── */}
        <rect x="89" y="118" width="6" height="28" rx="3" fill="#0D1E35" stroke="#046BD2" strokeOpacity="0.25" strokeWidth="1" />
        <rect x="265" y="108" width="6" height="20" rx="3" fill="#0D1E35" stroke="#046BD2" strokeOpacity="0.25" strokeWidth="1" />

        {/* ── Screen ── */}
        <rect x="106" y="66" width="148" height="292" rx="18" fill={`url(#${screenId})`} />

        {/* ── Status bar ── */}
        <rect x="118" y="75" width="24" height="3" rx="1.5" fill="white" fillOpacity="0.12" />
        <rect x="147" y="75" width="12" height="3" rx="1.5" fill="white" fillOpacity="0.08" />
        {/* Battery */}
        <rect x="225" y="74" width="16" height="5" rx="1.5" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
        <rect x="226" y="75.5" width="10" height="2" rx="0.5" fill="#22D3EE" fillOpacity="0.5" />
        <rect x="241" y="75.5" width="2" height="2" rx="0.5" fill="white" fillOpacity="0.15" />

        {/* ── Notch / camera ── */}
        <rect x="165" y="70" width="30" height="8" rx="4" fill="#060D1A" />
        <circle cx="180" cy="74" r="2.5" fill="#0D1E35" stroke="#046BD2" strokeOpacity="0.3" strokeWidth="0.5" />

        {/* ── Screen content: area code ── */}
        <text
          x="180" y="196"
          textAnchor="middle"
          fill={`url(#${gId})`}
          fontSize="58"
          fontWeight="900"
          fontFamily="system-ui,-apple-system,sans-serif"
          filter={`url(#${glowId})`}
        >
          {code}
        </text>

        {/* ── AREA CODE label ── */}
        <text x="180" y="216" textAnchor="middle" fill="#22D3EE" fontSize="8.5"
          fontFamily="system-ui,sans-serif" letterSpacing="4" fillOpacity="0.75">
          AREA CODE
        </text>

        {/* ── City name ── */}
        <text x="180" y="234" textAnchor="middle" fill="white" fontSize="11"
          fontFamily="system-ui,sans-serif" fillOpacity="0.45">
          {city || "United States"}
        </text>

        {/* ── Divider ── */}
        <line x1="148" y1="246" x2="212" y2="246" stroke="white" strokeOpacity="0.08" strokeWidth="1" />

        {/* ── Map pin on screen ── */}
        <circle cx="180" cy="275" r="18" fill="#046BD2" fillOpacity="0.1" />
        <circle cx="180" cy="275" r="11" fill="#046BD2" fillOpacity="0.18" />
        <path
          d="M180 263 C174.5 263 170 267.3 170 272.8 C170 280.8 180 291 180 291 C180 291 190 280.8 190 272.8 C190 267.3 185.5 263 180 263Z"
          fill={`url(#${gId})`}
          filter={`url(#${pulseId})`}
        />
        <circle cx="180" cy="272.8" r="4" fill="#060D1A" />

        {/* ── Signal bars on screen ── */}
        <rect x="140" y="307" width="4" height="8" rx="1" fill="#046BD2" fillOpacity="0.5" />
        <rect x="147" y="304" width="4" height="11" rx="1" fill="#046BD2" fillOpacity="0.6" />
        <rect x="154" y="301" width="4" height="14" rx="1" fill="#22D3EE" fillOpacity="0.7" />
        <rect x="161" y="298" width="4" height="17" rx="1" fill="#22D3EE" fillOpacity="0.8" />

        {/* Virtual label chip on screen */}
        <rect x="177" y="302" width="48" height="14" rx="7" fill="#046BD2" fillOpacity="0.2" stroke="#046BD2" strokeOpacity="0.4" strokeWidth="0.5" />
        <text x="201" y="312" textAnchor="middle" fill="#22D3EE" fontSize="7" fontFamily="system-ui,sans-serif" fillOpacity="0.9">VIRTUAL</text>

        {/* ── Home bar ── */}
        <rect x="161" y="352" width="38" height="3" rx="1.5" fill="white" fillOpacity="0.18" />

        {/* ── Floating location markers (outside phone) ── */}
        {/* Top-left marker */}
        <g filter={`url(#${pulseId})`}>
          <circle cx="55" cy="128" r="9" fill="#046BD2" fillOpacity="0.15" stroke="#046BD2" strokeOpacity="0.5" strokeWidth="1.5" />
          <circle cx="55" cy="128" r="4" fill="#046BD2" fillOpacity="0.8" />
        </g>
        <line x1="94" y1="145" x2="64" y2="130" stroke="#046BD2" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 5" />

        {/* Top-right marker */}
        <g filter={`url(#${pulseId})`}>
          <circle cx="308" cy="148" r="9" fill="#22D3EE" fillOpacity="0.15" stroke="#22D3EE" strokeOpacity="0.5" strokeWidth="1.5" />
          <circle cx="308" cy="148" r="4" fill="#22D3EE" fillOpacity="0.8" />
        </g>
        <line x1="265" y1="165" x2="299" y2="150" stroke="#22D3EE" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 5" />

        {/* Bottom-left marker */}
        <circle cx="45" cy="308" r="7" fill="#046BD2" fillOpacity="0.12" stroke="#046BD2" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="45" cy="308" r="3" fill="#046BD2" fillOpacity="0.6" />
        <line x1="94" y1="295" x2="52" y2="306" stroke="#046BD2" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 5" />

        {/* Bottom-right marker */}
        <circle cx="320" cy="320" r="7" fill="#22D3EE" fillOpacity="0.12" stroke="#22D3EE" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="320" cy="320" r="3" fill="#22D3EE" fillOpacity="0.6" />
        <line x1="265" y1="310" x2="313" y2="319" stroke="#22D3EE" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 5" />

        {/* Tiny scattered dots */}
        <circle cx="30" cy="200" r="2" fill="#046BD2" fillOpacity="0.3" />
        <circle cx="335" cy="225" r="2" fill="#22D3EE" fillOpacity="0.3" />
        <circle cx="22" cy="365" r="1.5" fill="#046BD2" fillOpacity="0.2" />
        <circle cx="342" cy="390" r="1.5" fill="#22D3EE" fillOpacity="0.2" />
        <circle cx="70" cy="415" r="1.5" fill="#046BD2" fillOpacity="0.25" />
        <circle cx="290" cy="430" r="1.5" fill="#22D3EE" fillOpacity="0.2" />
      </svg>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────

export function AreaCodeHero({ data }: { data: AreaCodeData }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/18 via-[#0B1220] to-[#0B1220]" />
      <div className="absolute -top-48 -left-24 w-[700px] h-[700px] rounded-full bg-[#046BD2]/12 blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#22D3EE]/5 blur-[120px]" />

      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left: text content ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/30 mb-7">
              <Link href="/" className="hover:text-white/60 transition">Home</Link>
              <span className="text-white/15">/</span>
              <Link href="/area-codes" className="hover:text-white/60 transition">Area Codes</Link>
              <span className="text-white/15">/</span>
              <span className="text-white/50">{data.code}</span>
            </nav>

            {/* State + code badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[#22D3EE] text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-sm">
              <MapPin className="w-3 h-3" />
              {data.state || "United States"} · Area Code {data.code}
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#046BD2] to-[#22D3EE]">
                {data.code}
              </span>
              <br />
              <span className="text-white">{data.city}</span>
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
                <span className="text-xs text-white/30">Overlay codes:</span>
                {data.overlays.map(o => (
                  <span key={o} className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-white/50">
                    {o}
                  </span>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#046BD2] to-[#0557b0] hover:from-[#0557b0] hover:to-[#044a9a] text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#046BD2]/20 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" />
                Get a {data.code} Number
              </Link>
              <Link
                href="#coverage"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-[#22D3EE]/40 hover:bg-white/[0.04] text-white/75 hover:text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm sm:text-base"
              >
                See Coverage
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.04]">
              {[
                { label: "Cities", value: data.cities.length || "15+" },
                { label: "Counties", value: data.counties.length || "3+" },
                { label: "Setup", value: "< 10 min" },
                { label: "Uptime SLA", value: "99.99%" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center justify-center py-4 px-3 bg-[#0B1220]">
                  <span className="text-xl sm:text-2xl font-black text-white">{value}</span>
                  <span className="text-[10px] text-white/35 mt-0.5 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: illustration ── */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
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

// ─── Coverage ─────────────────────────────────────────────────────────────

export function CoverageSection({ data }: { data: AreaCodeData }) {
  return (
    <section id="coverage" className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.012] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[#22D3EE] text-xs font-mono tracking-widest uppercase">Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            {data.code} Coverage Area
          </h2>
          <p className="text-white/45 text-base max-w-lg">
            Cities and counties served by the {data.code} area code.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Cities */}
          {data.cities.length > 0 && (
            <motion.div {...fadeUp(0.1)}
              className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-[#046BD2]/30 rounded-2xl p-7 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#046BD2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#046BD2]/30 to-[#046BD2]/10 flex items-center justify-center border border-[#046BD2]/20">
                    <Building2 className="w-4 h-4 text-[#046BD2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Cities Covered by {data.code}</h3>
                    <p className="text-xs text-white/35 mt-0.5">{data.cities.length} cities</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {data.cities.map(city => (
                    <div key={city} className="flex items-center gap-2 text-sm text-white/55 group/item">
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
              className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-[#22D3EE]/25 rounded-2xl p-7 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#22D3EE]/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#22D3EE]/20 to-[#22D3EE]/5 flex items-center justify-center border border-[#22D3EE]/15">
                    <MapPin className="w-4 h-4 text-[#22D3EE]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Counties Covered</h3>
                    <p className="text-xs text-white/35 mt-0.5">{data.counties.length} counties</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {data.counties.map(county => (
                    <div key={county} className="flex items-center gap-3 group/item">
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

// ─── Map ──────────────────────────────────────────────────────────────────

export function MapSection({ city, state, code }: { city: string; state: string; code: string }) {
  const location = [city, state].filter(Boolean).join(", ")
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(location || code)}&t=&z=11&ie=UTF8&iwloc=&output=embed`

  return (
    <section className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.012] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[#22D3EE] text-xs font-mono tracking-widest uppercase">Coverage Map</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            {code} Area Code — Where It Covers
          </h2>
          <p className="text-white/45 text-base max-w-lg">
            The geographic service area for{location ? ` ${location}` : ` area code ${code}`} virtual phone numbers.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50"
        >
          <div aria-hidden className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#0B1220] to-transparent z-10 pointer-events-none" />

          <iframe
            title={`${code} area code map — ${location}`}
            src={mapSrc}
            className="w-full h-[300px] sm:h-[420px] lg:h-[520px] block"
            style={{ border: 0, filter: "saturate(0.8) contrast(1.05) brightness(0.95)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div aria-hidden className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0B1220] to-transparent z-10 pointer-events-none" />

          {/* Location badge */}
          <div className="absolute bottom-6 left-4 sm:left-6 z-20 flex items-center gap-2 bg-[#0B1220]/90 backdrop-blur-md border border-white/[0.12] rounded-xl px-3.5 py-2.5 shadow-xl">
            <div className="w-6 h-6 rounded-lg bg-[#046BD2]/20 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#046BD2]" />
            </div>
            <div>
              <p className="text-white text-xs font-semibold leading-tight">{location || `Area Code ${code}`}</p>
              <p className="text-white/35 text-[10px] leading-tight">Area Code {code}</p>
            </div>
          </div>

          <a
            href={`https://maps.google.com/maps?q=${encodeURIComponent(location || code)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-4 sm:right-6 z-20 flex items-center gap-1.5 bg-[#0B1220]/90 backdrop-blur-md border border-white/[0.12] hover:border-[#046BD2]/50 rounded-xl px-3.5 py-2.5 text-xs text-white/45 hover:text-white/80 transition-all shadow-xl"
          >
            <ArrowRight className="w-3 h-3" />
            <span className="hidden sm:inline">Open in Google Maps</span>
            <span className="sm:hidden">Open</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Why section ──────────────────────────────────────────────────────────

const WHY_ITEMS = [
  {
    icon: PhoneCall,
    gradient: "from-[#046BD2]/25 to-[#046BD2]/5",
    border: "border-[#046BD2]/20",
    iconColor: "#046BD2",
    title: "Higher answer rates",
    body: "Local area codes are answered at significantly higher rates than toll-free or out-of-state numbers. Familiarity builds pickup before the call connects.",
  },
  {
    icon: UserCheck,
    gradient: "from-[#22D3EE]/15 to-[#22D3EE]/3",
    border: "border-[#22D3EE]/15",
    iconColor: "#22D3EE",
    title: "Instant local trust",
    body: "A local prefix signals accountability and presence. Customers know they're dealing with a business that's invested in their market.",
  },
  {
    icon: Building2,
    gradient: "from-[#046BD2]/25 to-[#046BD2]/5",
    border: "border-[#046BD2]/20",
    iconColor: "#046BD2",
    title: "No physical office needed",
    body: "A virtual number routes to wherever your team works. Local market presence without the cost of a physical location.",
  },
  {
    icon: Phone,
    gradient: "from-[#22D3EE]/15 to-[#22D3EE]/3",
    border: "border-[#22D3EE]/15",
    iconColor: "#22D3EE",
    title: "Customers call more freely",
    body: "Remove the hesitation over long-distance charges or unfamiliar prefixes. A local number makes calling feel natural.",
  },
]

export function WhySection({ city, code }: { city: string; code: string }) {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#046BD2]/5 via-transparent to-[#22D3EE]/5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[#22D3EE] text-xs font-mono tracking-widest uppercase">Local Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Why a Local {city || code} Number Matters
          </h2>
          <p className="text-white/45 text-base max-w-xl">
            A {code} area code does more than identify a city — it builds trust before the call connects.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {WHY_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp(i * 0.08)}
              className={`group relative bg-gradient-to-br ${item.gradient} border ${item.border} rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 border border-white/10 bg-[#0B1220]/60">
                <item.icon className="w-5 h-5" style={{ color: item.iconColor }} />
              </div>
              <h3 className="font-bold text-white text-sm mb-2.5 leading-snug">{item.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: PhoneCall, title: "Call forwarding & smart routing", body: "Route your number to any device — mobile, desk phone, or softphone. Define rules by time-of-day, caller location, or IVR selection." },
  { icon: Mic, title: "Call recording", body: "Every call logged, stored, and retrievable from your dashboard. Builds a training library and dispute record automatically." },
  { icon: MessageSquare, title: "Voicemail to text", body: "Transcribed voicemails delivered as readable text via email, app, or SMS. Prioritize urgent messages without listening to every one." },
  { icon: Link2, title: "CRM integration", body: "Native integrations with Salesforce, HubSpot, and Zoho. Every call auto-logged against the correct contact with timestamps and recording links." },
  { icon: Cpu, title: "AI transcription & analytics", body: "Captures every call, surfaces sentiment trends, keyword flags, and agent performance. Identifies what calls convert and where follow-up matters." },
  { icon: UserCheck, title: "Caller ID management", body: "Outbound calls from personal devices display your business number as the caller ID. Consistent branding on every outbound call." },
  { icon: Layers, title: "Instant scalability", body: "Add lines on the same day you need them. Cloud-based VoIP with no hardware and no installation delays — scale up or down freely." },
]

export function FeaturesSection({ code }: { code: string }) {
  return (
    <section className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.012] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[#22D3EE] text-xs font-mono tracking-widest uppercase">Included Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            What Your {code} Number Includes
          </h2>
          <p className="text-white/45 text-base max-w-xl">
            The area code gets you noticed. The features below are what build the business after the call connects.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp(i * 0.06)}
              className="group flex gap-4 bg-white/[0.03] hover:bg-white/[0.055] border border-white/[0.07] hover:border-[#046BD2]/35 rounded-2xl p-5 sm:p-6 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#046BD2]/20 to-[#046BD2]/5 flex items-center justify-center shrink-0 mt-0.5 border border-[#046BD2]/15 group-hover:border-[#046BD2]/35 transition-colors">
                <f.icon className="w-4.5 h-4.5 text-[#046BD2]" style={{ width: 18, height: 18 }} />
              </div>
              <div>
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

// ─── Getting started ───────────────────────────────────────────────────────

const STEPS = [
  { n: "01", icon: Zap, title: "Choose your plan", body: "Rozper offers plans for solo operators, growing teams, and enterprise contact centers. Every plan includes your number, calling, voicemail, and mobile apps." },
  { n: "02", icon: Phone, title: "Select your number", body: "Specify your area code and choose from available numbers. Vanity options available if you want a number that's easy to remember." },
  { n: "03", icon: Globe, title: "Configure your setup", body: "Set call forwarding rules, business hours, voicemail greeting, and IVR menus from your Rozper dashboard. No technician, no hardware." },
  { n: "04", icon: Shield, title: "Start calling", body: "Download the Rozper app, log in with your new number, and you're live. Both inbound and outbound calls work immediately." },
]

export function GettingStartedSection({ code, city }: { code: string; city: string }) {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#046BD2]/4 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[#22D3EE] text-xs font-mono tracking-widest uppercase">Get Started</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Getting a {code} Number with Rozper
          </h2>
          <p className="text-white/45 text-base">Takes under ten minutes. Active the same day.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#046BD2]/25 to-transparent z-0" />

          {STEPS.map((s, i) => (
            <motion.div key={s.n} {...fadeUp(i * 0.09)} className="relative z-10">
              <div className="group bg-white/[0.03] hover:bg-white/[0.055] border border-white/[0.08] hover:border-[#046BD2]/30 rounded-2xl p-6 h-full transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#046BD2]/25 to-[#046BD2]/5 border border-[#046BD2]/20 flex items-center justify-center shrink-0">
                    <s.icon className="w-5 h-5 text-[#046BD2]" />
                  </div>
                  <span className="text-3xl font-black text-white/[0.07] leading-none">{s.n}</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2.5 leading-snug">{s.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────

function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open ? "border-[#046BD2]/30 bg-white/[0.04]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14]"}`}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <span className="text-[#046BD2]/50 font-mono text-xs mt-0.5 shrink-0 font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold text-white/85 leading-snug">{faq.question}</span>
        </div>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${open ? "bg-[#046BD2]/20 rotate-180" : "bg-white/[0.06]"}`}>
          <ChevronDown className={`w-3.5 h-3.5 ${open ? "text-[#22D3EE]" : "text-white/40"}`} />
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-white/[0.06]">
          <p className="pt-4 text-sm text-white/50 leading-relaxed pl-7">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

export function FAQSection({ faqs, code }: { faqs: { question: string; answer: string }[]; code: string }) {
  if (faqs.length === 0) return null
  return (
    <section className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.012] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#046BD2] to-transparent" />
              <span className="text-[#22D3EE] text-xs font-mono tracking-widest uppercase">FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
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

// ─── CTA Band ─────────────────────────────────────────────────────────────

export function AreaCodeCTA({ code, city }: { code: string; city: string }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp()}
          className="relative overflow-hidden rounded-3xl border border-[#046BD2]/20"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/20 via-[#0B1220] to-[#22D3EE]/8" />
          <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#046BD2]/15 blur-[100px]" />
          <div className="absolute -bottom-24 right-1/4 w-64 h-64 rounded-full bg-[#22D3EE]/10 blur-[80px]" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative px-6 sm:px-12 py-16 sm:py-20 text-center">
            {/* Large bg code */}
            <div aria-hidden className="text-[80px] sm:text-[110px] font-black text-white/[0.04] leading-none mb-0 -mb-3 select-none">
              {code}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Get your {city || code} number today
            </h2>
            <p className="text-white/50 text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
              Active in under ten minutes. 99.99% uptime SLA. 24/7 expert support. Risk-free trial available.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#046BD2] to-[#0557b0] hover:from-[#0557b0] hover:to-[#044a9a] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#046BD2]/25 text-sm sm:text-base"
              >
                Start a No-Pressure Conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center border border-white/15 hover:border-white/30 hover:bg-white/[0.04] text-white/75 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all text-sm sm:text-base"
              >
                View Pricing
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/25">
              {["UCaaS", "Wholesale Voice", "Virtual Numbers", "SIP Trunking", "Bulk SMS"].map(s => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/20 mt-2">
              {["99.99% Uptime", "150+ Countries", "24/7 Expert Support", "Custom Pricing"].map(s => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
