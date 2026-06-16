"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import React, { useState, useEffect } from "react"
import {
  MapPin, ArrowUpRight, Phone, ArrowRight, ArrowLeft,
  Hash, Globe, Clock, ShieldCheck, TrendingUp, Building2,
  Users, Zap, BadgeCheck, PhoneCall, CheckCircle2,
  ChevronDown, Star, BarChart3, Laptop, Headphones,
} from "lucide-react"

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

const fi = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] },
})

// ─── Animated network SVG ─────────────────────────────────────────────────────

function NetworkSVG({ codes, abbr }: { codes: string[]; abbr: string }) {
  const display = codes.slice(0, 8)
  const R = 145

  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[420px] mx-auto select-none pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#046BD2]/20 blur-[70px]" />
        <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#22D3EE]/15 blur-[50px]" />
      </div>
      <svg viewBox="0 0 360 360" className="relative w-full" aria-hidden>
        <defs>
          <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#046BD2" /><stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22D3EE" /><stop offset="100%" stopColor="#0086F9" />
          </linearGradient>
          <radialGradient id="sgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#046BD2" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#046BD2" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[160, 130, 100].map((r, i) => (
          <motion.circle key={r} cx={180} cy={180} r={r}
            fill="none" stroke={i === 1 ? "#22D3EE" : "#046BD2"}
            strokeOpacity={0.06 + i * 0.03} strokeWidth={1}
            strokeDasharray={i === 1 ? "5 12" : undefined}
            animate={{ r: [r, r + 4, r], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          />
        ))}
        <circle cx={180} cy={180} r={55} fill="url(#sgGlow)" />
        <circle cx={180} cy={180} r={42} fill="#0A1628" stroke="url(#sg1)" strokeWidth={1.5} strokeOpacity={0.8} />
        <circle cx={180} cy={180} r={34} fill="#060D1A" />
        <text x={180} y={174} textAnchor="middle" fill="url(#sg2)" fontSize="11" fontFamily="system-ui,sans-serif" letterSpacing="3" fontWeight="700">{abbr}</text>
        <text x={180} y={188} textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui,sans-serif" fillOpacity="0.45" letterSpacing="2">AREA CODES</text>
        {display.map((code, i) => {
          const angle = ((i * 360) / display.length * Math.PI) / 180
          const cx = 180 + R * Math.cos(angle - Math.PI / 2)
          const cy = 180 + R * Math.sin(angle - Math.PI / 2)
          const w = 58, h = 32, r = 7
          const x = cx - w / 2, y = cy - h / 2
          const color = i % 2 === 0 ? "#046BD2" : "#22D3EE"
          return (
            <motion.g key={code}
              animate={{ y: [0, i % 2 === 0 ? -3 : 3, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >
              <motion.line x1={cx} y1={cy} x2={180} y2={180}
                stroke={color} strokeOpacity={0.2} strokeWidth={1} strokeDasharray="4 8"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <rect x={x} y={y} width={w} height={h} rx={r}
                fill="#0D1B2E" stroke={color} strokeOpacity={0.55} strokeWidth={1.2} />
              <text x={cx} y={cy + 5} textAnchor="middle" fill={color} fontSize="14" fontWeight="900" fontFamily="system-ui,sans-serif">{code}</text>
              <motion.circle cx={180 + (cx - 180) * 0.5} cy={180 + (cy - 180) * 0.5} r={2.5}
                fill={color} fillOpacity={0.7}
                animate={{ r: [2, 3.5, 2], fillOpacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
              />
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}

// ─── 1. Hero ──────────────────────────────────────────────────────────────────

export function StateHero({ state, stateSlug, codeCount, codes }: {
  state: string; stateSlug: string; codeCount: number; codes: string[]
}) {
  const abbr = STATE_ABBR[state] ?? state.slice(0, 2).toUpperCase()

  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/12 via-[#0B1220] to-[#0B1220]" />
        <div className="absolute top-0 -left-40 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] rounded-full bg-[#046BD2]/12 blur-[160px]" />
        <div className="absolute top-20 right-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full bg-[#22D3EE]/7 blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(120,160,220,0.25) 1px,transparent 0)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Breadcrumb */}
        <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-white/30 mb-8 sm:mb-10"
        >
          <Link href="/" className="hover:text-white/60 transition">home</Link>
          <span className="text-white/15">/</span>
          <Link href="/area-codes" className="hover:text-white/60 transition">area-codes</Link>
          <span className="text-white/15">/</span>
          <span className="text-[#22D3EE]">{stateSlug}</span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-5 sm:mb-6"
            >
              <Hash className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
                {abbr} · {codeCount} Area Code{codeCount !== 1 ? "s" : ""}
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
              className="text-[2.4rem] sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-white mb-4 sm:mb-5"
            >
              {state}
              <br />
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                Area Codes
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-white/55 leading-relaxed max-w-lg mb-6 sm:mb-8"
            >
              Get a local virtual phone number with any {state} area code. Instant setup, no physical office required, 99.99% uptime.
            </motion.p>

            {/* Trust pills */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
              className="flex flex-wrap gap-2 mb-8 sm:mb-10"
            >
              {[
                { icon: Hash, label: `${codeCount} area codes` },
                { icon: Clock, label: "< 10 min setup" },
                { icon: ShieldCheck, label: "99.99% uptime" },
                { icon: Headphones, label: "24/7 support" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white/50">
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#22D3EE] shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.26 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3"
            >
              <Link href="/free-trial"
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0557b0] hover:to-[#0078e0] text-white font-semibold text-sm transition-all shadow-lg shadow-[#046BD2]/25"
              >
                <Phone className="w-4 h-4 shrink-0" />
                Start a Free Trial
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/area-codes"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl border border-white/15 hover:border-white/25 hover:bg-white/[0.04] text-white/70 hover:text-white font-medium text-sm transition-all"
              >
                <Globe className="w-4 h-4 shrink-0" />
                All U.S. codes
              </Link>
            </motion.div>
          </div>

          {/* Right: SVG — hidden below lg */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden lg:block"
          >
            <NetworkSVG codes={codes} abbr={abbr} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── 2. Area Code Grid ────────────────────────────────────────────────────────

type CodeEntry = { code: string; city: string; stateSlug: string; excerpt: string }

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] } }),
}

export function StateAreaCodeGrid({ state, stateSlug, codes }: {
  state: string; stateSlug: string; codes: CodeEntry[]
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
      <motion.div {...fi()} className="mb-8 sm:mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// {codes.length} area codes</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          {state} Virtual Phone Numbers
        </h2>
        <p className="text-white/45 text-sm sm:text-base max-w-xl">
          Select any area code to get a local virtual number for that region of {state}.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {codes.map((entry, i) => (
          <motion.div key={entry.code} variants={cardVariant} initial="hidden" whileInView="show"
            viewport={{ once: true }} custom={i % 12}
          >
            <Link href={`/area-codes/${stateSlug}/${entry.code}`}
              className="group relative flex flex-col h-full bg-[#0B1728]/80 hover:bg-[#111B2E] border border-white/[0.08] hover:border-[#046BD2]/40 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-[#046BD2]/0 group-hover:bg-[#046BD2]/12 blur-2xl transition-all duration-500" />
              <div className="flex items-start justify-between mb-3 relative">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#046BD2]/25 to-[#22D3EE]/10 border border-[#046BD2]/20 flex items-center justify-center">
                  <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#22D3EE]" />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#22D3EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-white/90 leading-none group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#22D3EE] group-hover:to-[#046BD2] group-hover:bg-clip-text transition-all duration-300 mb-1.5 relative">
                {entry.code}
              </span>
              {entry.city && (
                <div className="flex items-center gap-1 text-white/45 text-[10px] sm:text-xs mb-2 relative">
                  <MapPin className="w-2.5 h-2.5 shrink-0 text-[#22D3EE]/60" />
                  <span className="truncate">{entry.city}</span>
                </div>
              )}
              <p className="text-[10px] sm:text-[11px] text-white/35 line-clamp-2 leading-relaxed mt-auto relative">{entry.excerpt}</p>
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#046BD2]/0 to-transparent group-hover:via-[#22D3EE]/40 transition-all rounded-b-2xl" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── 3. Why Get a State Number ────────────────────────────────────────────────

export function StateBenefits({ state }: { state: string }) {
  const abbr = STATE_ABBR[state] ?? state.slice(0, 2).toUpperCase()
  const items = [
    {
      icon: TrendingUp, color: "#22D3EE",
      title: `Higher pickup rates in ${abbr}`,
      body: `${state} residents and businesses are significantly more likely to answer calls from a local area code than out-of-state or toll-free numbers. A local number is the first step to getting the call connected.`,
      stat: "3×", statLabel: "more likely to answer",
    },
    {
      icon: Building2, color: "#0086F9",
      title: `${state} presence, no office needed`,
      body: `Establish credibility in any ${state} market without renting office space or hiring local staff. A virtual number routes to your team wherever they work — same day, under 10 minutes.`,
      stat: "$0", statLabel: "physical office cost",
    },
    {
      icon: Users, color: "#22D3EE",
      title: `Scale across all of ${state}`,
      body: `${state} has ${abbr === "CA" ? "32" : abbr === "TX" ? "27" : abbr === "NY" ? "19" : "multiple"} area codes across different regions. Get numbers in multiple codes to cover every market in the state from one Rozper dashboard.`,
      stat: "1", statLabel: "dashboard for all codes",
    },
  ]

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#046BD2]/4 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div {...fi()} className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Why {abbr} Virtual Numbers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Why businesses choose a {state} virtual number
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-xl">
            A local {state} number builds trust before the call connects — and keeps costs at zero.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <motion.div key={item.title} {...fi(i * 0.1)}
              className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.07] hover:border-white/[0.15] rounded-2xl p-5 sm:p-6 overflow-hidden transition-all duration-300"
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/0 group-hover:bg-[#046BD2]/6 blur-xl transition-all duration-500" />
              <div className="flex items-start justify-between mb-5 relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border shrink-0"
                  style={{ background: `${item.color}18`, borderColor: `${item.color}28` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-black tabular-nums" style={{ color: item.color, opacity: 0.8 }}>{item.stat}</div>
                  <div className="text-[9px] font-mono text-white/30 leading-tight">{item.statLabel}</div>
                </div>
              </div>
              <h3 className="font-bold text-white text-sm sm:text-base mb-2.5 leading-snug relative">{item.title}</h3>
              <p className="text-xs sm:text-[13px] text-white/45 leading-relaxed relative">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 4. Industries ────────────────────────────────────────────────────────────

const INDUSTRIES = [
  { icon: Building2,  color: "#22D3EE", title: "Real Estate",         body: "Agents use local area codes to build trust with buyers and sellers. A local number signals community investment." },
  { icon: PhoneCall,  color: "#0086F9", title: "Sales Teams",          body: "Outbound sales teams with local codes see dramatically higher pickup rates and more productive conversations." },
  { icon: Headphones, color: "#22D3EE", title: "Customer Support",     body: "Support teams with local numbers reduce friction for customers who prefer calling a familiar prefix." },
  { icon: Laptop,     color: "#0086F9", title: "Remote & Hybrid Teams",body: "Distributed teams maintain a consistent local brand across all {state} markets without sharing personal numbers." },
  { icon: BarChart3,  color: "#22D3EE", title: "Professional Services", body: "Lawyers, accountants, and consultants use local numbers to signal proximity and professionalism." },
  { icon: Star,       color: "#0086F9", title: "Small Business",        body: "Local businesses use virtual numbers to expand service areas and handle overflow without extra staff." },
]

export function StateIndustries({ state }: { state: string }) {
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()} className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Who Uses {state} Numbers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            Industries that rely on {state} virtual numbers
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-xl">
            From solo agents to enterprise teams, local {state} numbers drive better outcomes across every industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06]">
          {INDUSTRIES.map((ind, i) => (
            <motion.div key={ind.title} {...fi(i * 0.06)}
              className="group flex gap-4 bg-[#0B1220] hover:bg-[#101C2E] p-5 sm:p-6 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#0086F9]/0 group-hover:bg-[#0086F9]/6 blur-2xl transition-all duration-500" />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border transition-colors relative"
                style={{ background: `${ind.color}18`, borderColor: `${ind.color}22` }}>
                <ind.icon className="w-5 h-5" style={{ color: ind.color }} />
              </div>
              <div className="relative min-w-0">
                <h3 className="font-bold text-white text-sm mb-1.5 leading-snug">{ind.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">
                  {ind.body.replace("{state}", state)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 5. How It Works ─────────────────────────────────────────────────────────

export function StateHowItWorks({ state, stateSlug }: { state: string; stateSlug: string }) {
  const abbr = STATE_ABBR[state] ?? state.slice(0, 2).toUpperCase()
  const steps = [
    { n: "01", icon: Hash,       color: "#22D3EE", title: `Choose a ${abbr} area code`, body: `Browse all ${state} area codes and pick the region that best serves your customers. Every ${state} code is available instantly.` },
    { n: "02", icon: Phone,      color: "#0086F9", title: "Select your number",           body: "Choose from available numbers in your selected area code. Vanity and memorable options available upon request." },
    { n: "03", icon: BadgeCheck, color: "#22D3EE", title: "Go live in under 10 minutes",  body: `Configure call routing, business hours, and voicemail from your Rozper dashboard. Your ${state} number is active immediately.` },
  ]

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#22D3EE]/4 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div {...fi()} className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Get Started</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            Get a {state} number in 3 steps
          </h2>
          <p className="text-white/45 text-sm sm:text-base">Active the same day. No hardware, no contracts.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 relative">
          {/* Connector line on sm+ */}
          <div className="hidden sm:block absolute top-9 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-[#046BD2]/25 to-transparent z-0" />
          {steps.map((s, i) => (
            <motion.div key={s.n} {...fi(i * 0.1)} className="relative z-10">
              <div className="group bg-[#0B1220] hover:bg-[#101C2E] border border-white/[0.07] hover:border-[#046BD2]/30 rounded-2xl p-5 sm:p-6 h-full transition-all duration-300 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#046BD2]/0 group-hover:bg-[#046BD2]/8 blur-2xl transition-all duration-500" />
                <div className="flex items-center gap-3 mb-4 relative">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ background: `${s.color}20`, borderColor: `${s.color}30` }}>
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <span className="text-3xl font-black text-white/[0.07] leading-none">{s.n}</span>
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base mb-2.5 leading-snug relative">{s.title}</h3>
                <p className="text-xs sm:text-[13px] text-white/40 leading-relaxed relative">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 6. State FAQ ─────────────────────────────────────────────────────────────

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border rounded-xl sm:rounded-2xl transition-all duration-200 ${open ? "border-[#046BD2]/30 bg-white/[0.04]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"}`}>
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
          <span className="text-[#22D3EE]/40 font-mono text-[10px] sm:text-xs mt-0.5 shrink-0 font-bold tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold text-white/85 leading-snug">{q}</span>
        </div>
        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${open ? "bg-[#046BD2]/20 rotate-180" : "bg-white/[0.05]"}`}>
          <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${open ? "text-[#22D3EE]" : "text-white/30"}`} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }} className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-5 border-t border-white/[0.05]">
              <p className="pt-3 sm:pt-4 text-sm text-white/50 leading-relaxed pl-5 sm:pl-8">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function StateFAQ({ state, codeCount }: { state: string; codeCount: number }) {
  const abbr = STATE_ABBR[state] ?? state.slice(0, 2).toUpperCase()
  const faqs = [
    {
      q: `What area codes are available in ${state}?`,
      a: `${state} has ${codeCount} active area code${codeCount !== 1 ? "s" : ""}. Rozper offers virtual phone numbers for all of them — you can browse, select, and activate any ${state} area code from one dashboard.`,
    },
    {
      q: `Do I need to live in ${state} to get a ${abbr} number?`,
      a: `No. Virtual numbers are location-independent. A business based anywhere in the U.S. or internationally can get a ${state} area code and route calls to any device, team, or call center.`,
    },
    {
      q: `How quickly can I get a ${state} virtual number?`,
      a: `Most ${state} numbers are activated in under 10 minutes. Choose your area code, select a number, configure basic routing, and you're live immediately. No hardware or technician required.`,
    },
    {
      q: `Can I get multiple ${state} area codes on one account?`,
      a: `Yes. Rozper lets you add as many numbers and area codes as your business needs, all managed from a single dashboard. Adding a second or third ${state} area code is as fast as the first.`,
    },
    {
      q: `Will a ${state} virtual number work with my existing CRM?`,
      a: `Yes. Rozper integrates natively with Salesforce, HubSpot, Zoho, Zendesk, Pipedrive, and 300+ other tools. Every call from your ${state} number logs automatically against the right contact.`,
    },
  ]

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
          {/* Left */}
          <motion.div {...fi()} className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              {state} area code questions
            </h2>
            <p className="text-white/45 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              Common questions about getting and using {state} virtual phone numbers for your business.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2 text-[#22D3EE] text-sm font-medium hover:text-white transition">
              Have more questions?
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Right */}
          <div className="space-y-2.5 sm:space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} {...fi(i * 0.06)}>
                <FAQItem q={f.q} a={f.a} i={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 7. State CTA ─────────────────────────────────────────────────────────────

export function StateCTA({ state }: { state: string }) {
  const abbr = STATE_ABBR[state] ?? state.slice(0, 2).toUpperCase()
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#046BD2]/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/18 via-[#0B1220] to-[#22D3EE]/8" />
          <div className="absolute -top-20 left-1/3 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full bg-[#046BD2]/12 blur-[100px]" />
          <div className="absolute -bottom-12 right-1/4 w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] rounded-full bg-[#22D3EE]/8 blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.022]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(120,160,220,0.25) 1px,transparent 0)", backgroundSize: "24px 24px" }} />

          <div className="relative px-5 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/15 border border-[#046BD2]/30 mb-5 sm:mb-6">
                  <Zap className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
                    Active in under 10 minutes
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  Get your {state} number
                  <br />
                  <span className="bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
                    live today.
                  </span>
                </h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-md">
                  No hardware. No physical office. No contracts. Pick a {state} area code and start calling in minutes.
                </p>
              </div>

              <div className="flex flex-col gap-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-1">
                  {[
                    `All ${state} area codes covered`,
                    "Works on any device",
                    "No physical office needed",
                    "Cancel anytime",
                    "24/7 live support",
                    "CRM integrations included",
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

        <div className="mt-6 sm:mt-8 flex justify-center">
          <Link href="/area-codes" className="inline-flex items-center gap-2 text-white/35 hover:text-white/65 text-sm transition group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All U.S. area codes
          </Link>
        </div>
      </div>
    </section>
  )
}
