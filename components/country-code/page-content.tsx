"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Phone, Globe, Clock, Shield, ArrowRight, Check, Zap,
  PhoneCall, Mic, MessageSquare, Link2, BarChart3, UserCheck,
  Layers, Headphones, Star, ShieldCheck, BadgeCheck,
  MapPin, Building2, DollarSign, Languages, Users, Landmark,
  ChevronDown, ArrowUpRight, Calendar, Sun, Moon, Sunset,
} from "lucide-react"
import type { CountryData, BestCallingTimes } from "@/lib/country-code-data"
import { formatDialCode, formatUTCOffset, formatPopulation, formatGDP } from "@/lib/country-code-data"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] },
})

// ─── Animated Globe SVG ───────────────────────────────────────────────────────

export function GlobalIllustration({ country }: { country: CountryData }) {
  const grad = "cc-grad"
  const glow = "cc-glow"
  const screen = "cc-screen"

  return (
    <div className="relative w-full flex items-center justify-center select-none pointer-events-none">
      <div className="absolute w-72 h-72 rounded-full bg-[#046BD2]/20 blur-[90px]" />
      <div className="absolute w-48 h-48 rounded-full bg-[#22D3EE]/10 blur-[60px] translate-y-6" />

      <svg viewBox="0 0 380 400" className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]" fill="none" aria-hidden>
        <defs>
          <linearGradient id={grad} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#046BD2" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id={screen} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0D1B2E" />
            <stop offset="100%" stopColor="#060D1A" />
          </linearGradient>
          <filter id={glow} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Pulsing rings */}
        {[155, 130, 108].map((r, i) => (
          <motion.circle key={r} cx={190} cy={200} r={r}
            stroke={i === 0 ? "#046BD2" : "#22D3EE"}
            strokeOpacity={0.04 + i * 0.025}
            strokeWidth={1} fill="none"
            animate={{ r: [r, r + 7, r], opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }}
          />
        ))}

        {/* Globe body */}
        <circle cx={190} cy={200} r={100} fill={`url(#${screen})`}
          stroke={`url(#${grad})`} strokeWidth={1.5} strokeOpacity={0.55} />

        {/* Latitude lines */}
        {[-60, -36, -12, 12, 36, 60].map((lat) => {
          const ry = 100 * Math.abs(Math.sin((lat * Math.PI) / 180)) + 3
          const cy = 200 + (lat / 90) * 100
          const rx = Math.sqrt(Math.max(0, 100 * 100 - ((lat / 90) * 100) ** 2))
          return (
            <ellipse key={lat} cx={190} cy={cy} rx={rx * 0.95} ry={Math.max(ry * 0.3, 2)}
              stroke="#22D3EE" strokeOpacity={0.07} strokeWidth={0.6} fill="none" />
          )
        })}

        {/* Longitude lines */}
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <ellipse key={deg} cx={190} cy={200}
            rx={Math.abs(Math.cos((deg * Math.PI) / 180)) * 100}
            ry={100}
            stroke="#046BD2" strokeOpacity={0.06} strokeWidth={0.6} fill="none"
            transform={`rotate(${deg},190,200)`}
          />
        ))}

        {/* Connection arcs — animated dashes */}
        {[
          { d: "M 70 240 Q 130 160 190 200", delay: 0 },
          { d: "M 310 160 Q 260 175 190 200", delay: 1.4 },
          { d: "M 190 95 Q 182 148 190 200",  delay: 2.6 },
        ].map((arc, i) => (
          <motion.path key={i} d={arc.d}
            stroke={i % 2 === 0 ? "#22D3EE" : "#046BD2"}
            strokeWidth={1} fill="none" strokeOpacity={0.55}
            strokeDasharray="5 9"
            animate={{ strokeDashoffset: [0, -140] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: arc.delay }}
          />
        ))}

        {/* Travelling call dots */}
        {[
          { path: "M 70 240 Q 130 160 190 200", dur: 2.8, delay: 0, color: "#22D3EE" },
          { path: "M 310 160 Q 260 175 190 200", dur: 2.8, delay: 1.4, color: "#046BD2" },
          { path: "M 190 95 Q 182 148 190 200",  dur: 2.8, delay: 2.6, color: "#22D3EE" },
        ].map((dot, i) => (
          <motion.circle key={i} r={3.5} fill={dot.color} fillOpacity={0.9}
            animate={{ offsetDistance: ["0%","100%"] }}
            style={{ offsetPath: `path('${dot.path}')` } as React.CSSProperties}
            transition={{ duration: dot.dur, repeat: Infinity, ease: "linear", delay: dot.delay }}
          />
        ))}

        {/* Central dial code */}
        <motion.text x={190} y={190} textAnchor="middle"
          fill={`url(#${grad})`} fontSize={country.dialCode.length > 4 ? "26" : "34"}
          fontWeight="900" fontFamily="system-ui,-apple-system,sans-serif"
          filter={`url(#${glow})`}
          animate={{ opacity: [0.82, 1, 0.82] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          {formatDialCode(country.dialCode)}
        </motion.text>

        <text x={190} y={205} textAnchor="middle" fill="#22D3EE" fontSize="7"
          fontFamily="system-ui,sans-serif" letterSpacing="4" fillOpacity={0.7}>
          DIAL CODE
        </text>

        <text x={190} y={220} textAnchor="middle" fill="white" fontSize="9.5"
          fontFamily="system-ui,sans-serif" fillOpacity={0.4}>
          {country.name.length > 16 ? country.name.split(" ").slice(0, 2).join(" ") : country.name}
        </text>

        {/* UTC offset badge */}
        <rect x={148} y={228} width={84} height={16} rx={8}
          fill="#046BD2" fillOpacity={0.15} stroke="#046BD2" strokeOpacity={0.35} strokeWidth={0.6} />
        <text x={190} y={239.5} textAnchor="middle" fill="#22D3EE" fontSize="7.5"
          fontFamily="system-ui,sans-serif" fillOpacity={0.85} letterSpacing="1">
          {formatUTCOffset(country.utcOffset)}
        </text>

        {/* Equator line */}
        <line x1={90} y1={200} x2={290} y2={200}
          stroke="white" strokeOpacity={0.05} strokeWidth={0.8} />

        {/* Node markers */}
        {[
          { cx: 70,  cy: 240, color: "#046BD2" },
          { cx: 310, cy: 160, color: "#22D3EE" },
          { cx: 190, cy: 95,  color: "#046BD2" },
          { cx: 50,  cy: 155, color: "#22D3EE" },
        ].map((node, i) => (
          <motion.g key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}>
            <circle cx={node.cx} cy={node.cy} r={9}
              fill={node.color} fillOpacity={0.1} stroke={node.color} strokeOpacity={0.45} strokeWidth={1.2} />
            <circle cx={node.cx} cy={node.cy} r={4} fill={node.color} fillOpacity={0.85} />
          </motion.g>
        ))}

        {/* Signal arcs around globe edge */}
        <motion.path d="M 100 120 Q 145 88 190 95"
          stroke="#22D3EE" strokeWidth={1} fill="none" strokeOpacity={0.3}
          strokeDasharray="3 7"
          animate={{ strokeDashoffset: [0, -60] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path d="M 280 120 Q 235 88 190 95"
          stroke="#046BD2" strokeWidth={1} fill="none" strokeOpacity={0.3}
          strokeDasharray="3 7"
          animate={{ strokeDashoffset: [0, -60] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
        />
      </svg>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function CountryHero({ country, times }: { country: CountryData; times: BestCallingTimes }) {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/15 via-[#0B1220] to-[#0B1220]" />
        <div className="absolute -top-48 -left-24 w-[700px] h-[700px] rounded-full bg-[#046BD2]/10 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-[#22D3EE]/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(120,160,220,0.2) 1px,transparent 0)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full py-12 lg:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-8 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[11px] font-mono text-white/30 mb-6 sm:mb-8 flex-wrap">
              <Link href="/" className="hover:text-white/60 transition">home</Link>
              <span className="text-white/15">/</span>
              <Link href="/country-code" className="hover:text-white/60 transition">country-code</Link>
              <span className="text-white/15">/</span>
              <span className="text-[#22D3EE]">{country.slug}</span>
              <span className="text-white/15">/</span>
              <span className="text-white/40">best-time-to-call</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-6 max-w-full">
              <Globe className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22D3EE]">
                {country.dialCode.startsWith("1-") ? `+${country.dialCode}` : `+${country.dialCode}`} · {formatUTCOffset(country.utcOffset)}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[1.9rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-5">
              Best Time to Call
              <br />
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                {country.name}
              </span>
              <br />
              <span className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-white/40 tracking-normal">
                from the United States
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/55 mb-6 leading-relaxed max-w-lg">
              {country.name} operates on <strong className="text-white/80">{formatUTCOffset(country.utcOffset)}</strong> with business hours
              typically {times.localBizStart}–{times.localBizEnd} local time. From US East Coast,
              that window falls between <strong className="text-white/80">{times.est.start}</strong> and <strong className="text-white/80">{times.est.end}</strong> EST.
            </p>

            {/* Best window pill */}
            <div className="flex flex-wrap gap-2 mb-8">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-mono text-emerald-300">
                  Best EST: {times.est.start} – {times.est.end}
                  {times.est.crossesMidnight && " (+1 day)"}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/25">
                <Calendar className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span className="text-xs font-mono text-[#22D3EE]">{country.workingDays}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0557b0] hover:to-[#0078e0] text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#046BD2]/20 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" />
                Start a Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="#best-time"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-[#22D3EE]/40 hover:bg-white/[0.04] text-white/75 hover:text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm sm:text-base"
              >
                View Call Windows
              </Link>
            </div>
          </motion.div>

          {/* Right: Globe — shown from md upwards, stacks below text on md, side-by-side on lg */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden md:flex items-center justify-center"
          >
            <GlobalIllustration country={country} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Best Time Section ─────────────────────────────────────────────────────────

const TIME_ICONS = { morning: Sun, afternoon: Sunset, evening: Moon }

export function BestTimeSection({ country, times }: { country: CountryData; times: BestCallingTimes }) {
  const slots = [
    {
      key: "morning",
      icon: Sun,
      label: "Early Window",
      localTime: "9:00 AM – 12:00 PM",
      desc: `Morning hours in ${country.name} — contacts are fresh and meetings are scheduled.`,
      est: times.est.start,
      pst: times.pst.start,
      quality: "best" as const,
    },
    {
      key: "afternoon",
      icon: Sunset,
      label: "Prime Window",
      localTime: "12:00 PM – 5:00 PM",
      desc: `Afternoon in ${country.name} — ideal for decision-makers and follow-up calls.`,
      est: `${times.est.start.replace(":00", "")} – ${times.est.end}`,
      pst: `${times.pst.start.replace(":00", "")} – ${times.pst.end}`,
      quality: "best" as const,
    },
    {
      key: "evening",
      icon: Moon,
      label: "Avoid",
      localTime: "After 6:00 PM",
      desc: `Outside business hours in ${country.name}. Calls will likely go to voicemail or be unwelcome.`,
      est: "Late night / early AM",
      pst: "Late night / early AM",
      quality: "avoid" as const,
    },
  ]

  const qualityStyle = {
    best:  { card: "border-emerald-500/25 bg-emerald-500/5",  badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20", dot: "bg-emerald-400" },
    avoid: { card: "border-red-500/20 bg-red-500/[0.04]",     badge: "bg-red-500/10 text-red-400 border-red-500/15",            dot: "bg-red-400" },
  }

  return (
    <section id="best-time" className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Best Time to Call</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            When to Call {country.name}
          </h2>
          <p className="text-white/45 text-base max-w-xl">
            {times.recommendation}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-10">
          {slots.map((slot, i) => {
            const style = qualityStyle[slot.quality]
            return (
              <motion.div key={slot.key} {...fadeUp(i * 0.08)}
                className={`group relative border rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] overflow-hidden ${style.card}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#046BD2]/20 to-[#046BD2]/5 border border-[#046BD2]/20 flex items-center justify-center">
                    <slot.icon className="w-5 h-5 text-[#22D3EE]" />
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wide ${style.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    {slot.quality === "best" ? "Ideal" : "Avoid"}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{slot.label}</h3>
                <p className="text-[#22D3EE] font-mono text-xs mb-3">{slot.localTime} local</p>
                <p className="text-xs text-white/40 leading-relaxed mb-4">{slot.desc}</p>
                <div className="space-y-1.5 border-t border-white/[0.06] pt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/30 font-mono">EST (UTC−5)</span>
                    <span className="text-white/65">{slot.est}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/30 font-mono">PST (UTC−8)</span>
                    <span className="text-white/65">{slot.pst}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Time conversion table */}
        <motion.div {...fadeUp(0.2)}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
        >
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/[0.06] flex items-center gap-2 sm:gap-3">
            <Clock className="w-4 h-4 text-[#22D3EE] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-white truncate">
              {country.name} Business Hours → US Time Zones
            </span>
          </div>
          <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
            <table className="w-full text-xs sm:text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {["Local Time", "UTC", "EST / New York", "CST / Chicago", "PST / LA"].map((h) => (
                    <th key={h} className="text-left px-3 sm:px-4 py-2 sm:py-3 text-[9px] font-mono uppercase tracking-wide text-white/30 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { local: "9:00 AM", label: "Open" },
                  { local: "12:00 PM", label: "Noon" },
                  { local: "3:00 PM", label: "PM" },
                  { local: "5:00 PM", label: "Close" },
                ].map(({ local, label }, i) => {
                  const localH = parseInt(local) + (local.includes("PM") && parseInt(local) !== 12 ? 12 : 0)
                  const utcH = localH - country.utcOffset
                  const fmt = (h: number) => {
                    const n = ((h % 24) + 24) % 24
                    const h12 = n % 12 || 12
                    return `${h12}:00 ${n >= 12 ? "PM" : "AM"}`
                  }
                  const isGood = localH >= 9 && localH <= 17
                  return (
                    <tr key={local} className={`border-b border-white/[0.04] ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">
                        <span className="text-white/80 font-mono">{local}</span>
                        <span className="hidden sm:inline ml-1.5 text-white/25 text-[10px]">{label}</span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 font-mono text-white/45">{fmt(utcH)}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 font-mono">
                        <span className={isGood ? "text-emerald-400" : "text-white/40"}>{fmt(utcH - 5)}</span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 font-mono">
                        <span className={isGood ? "text-emerald-400" : "text-white/40"}>{fmt(utcH - 6)}</span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 font-mono">
                        <span className={isGood ? "text-emerald-400" : "text-white/40"}>{fmt(utcH - 8)}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Country Overview ─────────────────────────────────────────────────────────

export function CountryOverviewSection({ country }: { country: CountryData }) {
  const stats = [
    { icon: Phone,     label: "Dial Code",     value: formatDialCode(country.dialCode),            color: "#22D3EE" },
    { icon: Landmark,  label: "Capital",        value: country.capital,                             color: "#0086F9" },
    { icon: DollarSign,label: "Currency",       value: `${country.currency} (${country.currencyCode})`, color: "#22D3EE" },
    { icon: Clock,     label: "Time Zone",      value: formatUTCOffset(country.utcOffset),          color: "#046BD2" },
    { icon: Calendar,  label: "Working Days",   value: country.workingDays,                         color: "#22D3EE" },
    { icon: Languages, label: "Language",       value: country.language,                            color: "#0086F9" },
    { icon: Users,     label: "Population",     value: formatPopulation(country.population),        color: "#22D3EE" },
    { icon: Globe,     label: "GDP",            value: formatGDP(country.gdpUsd),                   color: "#046BD2" },
  ]

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#046BD2]/4 via-transparent to-[#22D3EE]/4 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Country Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            {country.name} at a Glance
          </h2>
          <p className="text-white/45 text-base max-w-xl">
            Key facts about {country.name} to inform your international communication strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} {...fadeUp(i * 0.05)}
              className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-[#046BD2]/30 rounded-2xl p-5 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#046BD2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 border"
                  style={{ background: `${stat.color}18`, borderColor: `${stat.color}22` }}>
                  <stat.icon className="w-4.5 h-4.5" style={{ color: stat.color }} strokeWidth={1.8} />
                </div>
                <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">{stat.label}</p>
                <p className="text-xs sm:text-sm font-semibold text-white/85 leading-snug break-words">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Business Etiquette ────────────────────────────────────────────────────────

const ETIQUETTE: Record<CountryData["region"], { title: string; tips: { icon: typeof Phone; title: string; body: string }[] }> = {
  europe: {
    title: "European Business Calling Etiquette",
    tips: [
      { icon: Clock,       title: "Punctuality matters",     body: "Europeans value starting calls on time. Send a calendar invite and dial in exactly at the scheduled hour." },
      { icon: Phone,       title: "Formal introductions",    body: "Begin with a professional greeting. In many European countries, titles matter — use Mr./Ms. until invited to use first names." },
      { icon: MessageSquare,title: "Direct communication",  body: "Most European business cultures appreciate concise, fact-based communication. Prepare your agenda in advance." },
      { icon: Globe,       title: "Language considerations", body: "English is widely used in business, but opening with a greeting in the local language is well received." },
    ],
  },
  asia: {
    title: "Asian Business Calling Etiquette",
    tips: [
      { icon: Users,        title: "Respect hierarchy",       body: "Identify the most senior person on the call and address them first. Titles and seniority carry significant weight." },
      { icon: Clock,        title: "Build the relationship first", body: "Don't jump straight to business. Invest a few minutes in pleasantries — it builds the trust needed for long-term partnerships." },
      { icon: MessageSquare,title: "Avoid direct refusal",    body: "In many Asian cultures, 'maybe' or silence can mean 'no'. Listen for subtle signals rather than expecting blunt feedback." },
      { icon: Globe,        title: "Time zone diligence",     body: "Asia covers many time zones. Confirm the exact local time with your counterpart and schedule conservatively." },
    ],
  },
  africa: {
    title: "African Business Calling Etiquette",
    tips: [
      { icon: Users,        title: "Relationship-first culture", body: "Business in most African markets starts with personal connection. Introductions and small talk are not just courtesy — they're expected." },
      { icon: Clock,        title: "Flexible with time",      body: "Schedules may run loosely. Build buffer time into your calling schedule and follow up proactively." },
      { icon: Phone,        title: "Speak clearly",           body: "Network quality can vary. Speak clearly, confirm key points, and follow up in writing to avoid misunderstandings." },
      { icon: Globe,        title: "French/Portuguese markets", body: "Much of West and Central Africa conducts business in French or Portuguese. Consider language carefully when preparing materials." },
    ],
  },
  americas: {
    title: "Americas Business Calling Etiquette",
    tips: [
      { icon: Clock,        title: "Time zone variance",      body: "The Americas span multiple time zones. Double-check local time — a 9 AM EST call may be 6 AM in the Pacific zone." },
      { icon: Users,        title: "Informal but professional", body: "North American and Caribbean markets often use first names quickly. Latin America may be more formal — follow the lead of your counterpart." },
      { icon: Phone,        title: "Confirm before calling",  body: "Send a brief message before calling internationally to confirm availability and prevent missed connections." },
      { icon: Globe,        title: "Spanish/Portuguese markets", body: "Most of Latin America conducts business in Spanish or Portuguese. Local-language materials significantly improve rapport." },
    ],
  },
  oceania: {
    title: "Oceania Business Calling Etiquette",
    tips: [
      { icon: Clock,        title: "Plan for major time differences", body: "Australia and New Zealand are 10–16 hours ahead of the US East Coast. Most calls require early morning or evening scheduling." },
      { icon: Users,        title: "Informal communication style",  body: "Australian and New Zealand business culture is direct and informal. First names are used quickly." },
      { icon: Phone,        title: "Pacific islands patience",       body: "Pacific island nations have a more relaxed pace. Build in extra time for decisions and follow-ups." },
      { icon: Globe,        title: "Check public holidays",          body: "Public holidays vary significantly across the region. Verify the local calendar before scheduling important calls." },
    ],
  },
  mideast: {
    title: "Middle Eastern Business Calling Etiquette",
    tips: [
      { icon: Calendar,     title: "Friday prayer time",      body: "Avoid scheduling calls on Friday afternoons. In most Middle Eastern countries, Friday is the holy day with prayer around midday." },
      { icon: Users,        title: "Relationship-driven decisions", body: "Contracts and deals are built on trust developed over time. Expect multiple calls before any commitment is made." },
      { icon: Phone,        title: "Formal and respectful",   body: "Use titles and formal language. Avoid bluntness — frame requests politely and give people room to respond in their own time." },
      { icon: Clock,        title: "Sunday–Thursday workweek", body: "Many Middle Eastern countries work Sun–Thu. Plan your call schedule to avoid reaching them on Friday/Saturday." },
    ],
  },
}

export function BusinessEtiquetteSection({ country }: { country: CountryData }) {
  const etq = ETIQUETTE[country.region]

  return (
    <section className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Calling Etiquette</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            {etq.title}
          </h2>
          <p className="text-white/45 text-base max-w-xl">
            Cultural context for calling contacts in {country.name} — know what to expect before you dial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {etq.tips.map((tip, i) => (
            <motion.div key={tip.title} {...fadeUp(i * 0.07)}
              className="group relative bg-gradient-to-br from-[#046BD2]/12 to-[#046BD2]/3 border border-[#046BD2]/20 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            >
              <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/0 group-hover:bg-white/[0.03] blur-xl transition-all duration-500" />
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#046BD2]/30 to-[#046BD2]/10 flex items-center justify-center mb-5 border border-[#046BD2]/20 relative">
                <tip.icon className="w-5 h-5 text-[#22D3EE]" />
              </div>
              <h3 className="font-bold text-white text-sm mb-2.5 leading-snug relative">{tip.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed relative">{tip.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────

const INT_FEATURES = [
  { icon: Globe,        title: "150+ country coverage",          body: "Get virtual numbers in over 150 countries. Establish local presence in any market without a physical office." },
  { icon: PhoneCall,    title: "HD voice quality",               body: "Crystal-clear international calls over our optimised carrier network. No degraded quality from overseas routing." },
  { icon: Mic,          title: "Call recording & transcription", body: "Every international call is recorded and transcribed. Review conversations and share notes across your team instantly." },
  { icon: MessageSquare,title: "Voicemail to text",              body: "International voicemails transcribed and delivered via email or SMS so you never miss a message across time zones." },
  { icon: Link2,        title: "CRM auto-logging",               body: "Calls to and from any international number are automatically logged in Salesforce, HubSpot, or Zoho CRM." },
  { icon: BarChart3,    title: "International analytics",        body: "See call volume, answer rates, and duration broken down by country, region, and time of day." },
  { icon: UserCheck,    title: "Local Caller ID",                body: "Display your virtual local number as the caller ID when dialling internationally. Dramatically improve pickup rates." },
  { icon: Layers,       title: "Instant number provisioning",    body: "Activate a new country virtual number in under 60 seconds. No contracts, no hardware, no delays." },
  { icon: ShieldCheck,  title: "99.99% uptime SLA",              body: "Enterprise-grade reliability for your international calling infrastructure with 24/7 expert support." },
]

export function FeaturesSection({ country }: { country: CountryData }) {
  return (
    <section className="py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Platform Features</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Everything You Need to Call {country.name}
          </h2>
          <p className="text-white/45 text-base max-w-xl">
            Rozper provides the tools to reach {country.name} contacts reliably, track every conversation, and scale globally.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] rounded-3xl overflow-hidden border border-white/[0.06]">
          {INT_FEATURES.map((f, i) => (
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

// ─── Getting Started ───────────────────────────────────────────────────────────

const STEPS = [
  { n: "01", icon: Zap,        color: "#22D3EE", title: "Sign up for Rozper",         body: "Create your account in under 2 minutes. No credit card required to start your free trial." },
  { n: "02", icon: Globe,       color: "#0086F9", title: `Select ${""} virtual number`, body: "Browse available numbers in your target country. Pick a local or toll-free number that fits your needs." },
  { n: "03", icon: Phone,       color: "#046BD2", title: "Configure call routing",     body: "Route incoming calls to any device — mobile, desk phone, or browser. Set business hours and voicemail greetings." },
  { n: "04", icon: BadgeCheck,  color: "#22D3EE", title: "Start calling internationally", body: "Make and receive calls from your new international number. Active and ready in under 10 minutes." },
]

export function GettingStartedSection({ country }: { country: CountryData }) {
  const steps = STEPS.map((s, i) =>
    i === 1 ? { ...s, title: `Get a ${country.name} virtual number` } : s
  )

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#046BD2]/4 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Get Started</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Start Calling {country.name} Today
          </h2>
          <p className="text-white/45 text-base">Active in under ten minutes. No contracts or hardware needed.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#046BD2]/25 to-transparent z-0" />
          {steps.map((s, i) => (
            <motion.div key={s.n} {...fadeUp(i * 0.09)} className="relative z-10">
              <div className="group bg-[#0B1220] hover:bg-[#101C2E] border border-white/[0.07] hover:border-[#046BD2]/30 rounded-2xl p-6 h-full transition-all duration-300 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#046BD2]/0 group-hover:bg-[#046BD2]/8 blur-2xl transition-all duration-500" />
                <div className="relative flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ background: `${s.color}22`, borderColor: `${s.color}33` }}>
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

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open ? "border-[#046BD2]/30 bg-white/[0.04]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"}`}>
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left" aria-expanded={open}>
        <div className="flex items-start gap-3">
          <span className="text-[#22D3EE]/40 font-mono text-xs mt-0.5 shrink-0 font-bold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold text-white/85 leading-snug">{q}</span>
        </div>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${open ? "bg-[#046BD2]/20 rotate-180" : "bg-white/[0.05]"}`}>
          <ChevronDown className={`w-4 h-4 transition-colors ${open ? "text-[#22D3EE]" : "text-white/35"}`} />
        </div>
      </button>
      {open && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/[0.05]">
          <p className="pt-4 text-sm text-white/50 leading-relaxed pl-4 sm:pl-8">{a}</p>
        </div>
      )}
    </motion.div>
  )
}

function buildFAQs(country: CountryData, times: BestCallingTimes) {
  const diffH = country.utcOffset - (-5)
  const aheadBehind = diffH > 0 ? `${Math.abs(diffH)} hour${Math.abs(diffH) !== 1 ? "s" : ""} ahead of` : diffH < 0 ? `${Math.abs(diffH)} hour${Math.abs(diffH) !== 1 ? "s" : ""} behind` : "the same as"

  return [
    {
      q: `What is the country code for ${country.name}?`,
      a: `The international dialing code for ${country.name} is ${formatDialCode(country.dialCode)}. To call ${country.name} from the US, dial 011 + ${country.dialCode} + the local phone number (omitting the leading 0 if present).`,
    },
    {
      q: `What is the best time to call ${country.name} from the United States?`,
      a: `${country.name} is ${aheadBehind} US Eastern time (${formatUTCOffset(country.utcOffset)}). Business hours in ${country.name} (9 AM–5 PM local) correspond to ${times.est.start}–${times.est.end} EST. For the best chance of reaching someone, call between those hours on ${country.workingDays}.`,
    },
    {
      q: `What are the business hours in ${country.name}?`,
      a: `Standard business hours in ${country.name} are roughly 9:00 AM to 5:00 PM local time (${formatUTCOffset(country.utcOffset)}), ${country.workingDays}. Some industries — banking, government, retail — may have slightly different hours. Always confirm with your specific contact.`,
    },
    {
      q: `Do I need to include the ${formatDialCode(country.dialCode)} country code when calling ${country.name}?`,
      a: `Yes. When calling ${country.name} internationally, dial the exit code for your country (011 from the US), followed by ${country.dialCode}, then the local number. Rozper's platform handles international dialing automatically — just dial the full international number.`,
    },
    {
      q: `Can I get a virtual ${country.name} phone number with Rozper?`,
      a: `Yes. Rozper provides local virtual phone numbers in ${country.name} and 150+ other countries. A local ${country.name} number lets your team make and receive calls as if they were based in ${country.capital}, with all calls routed to your existing devices via the Rozper app.`,
    },
    {
      q: `What is the time difference between ${country.name} and the US?`,
      a: `${country.name} is on ${formatUTCOffset(country.utcOffset)}, which puts it ${aheadBehind} US Eastern time (UTC−5). Compared to US Pacific time (UTC−8), ${country.name} is ${country.utcOffset - (-8) > 0 ? `${country.utcOffset - (-8)} hours ahead` : `${Math.abs(country.utcOffset - (-8))} hours behind`}.`,
    },
  ]
}

export function FAQSection({ country, times }: { country: CountryData; times: BestCallingTimes }) {
  const faqs = buildFAQs(country, times)
  return (
    <section className="py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Calling {country.name} — Common Questions
            </h2>
            <p className="text-white/45 text-base">Everything you need to know about reaching contacts in {country.name}.</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)}>
                <FAQItem q={faq.q} a={faq.a} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Related Countries ─────────────────────────────────────────────────────────

export function RelatedCountriesSection({ country, related }: { country: CountryData; related: CountryData[] }) {
  if (related.length === 0) return null
  const regionLabel = {
    europe: "European", asia: "Asian", africa: "African",
    americas: "American", oceania: "Pacific", mideast: "Middle Eastern",
  }[country.region] ?? ""

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#22D3EE]/4 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div {...fadeUp()} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// More {regionLabel} Countries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
            Other {regionLabel} country calling guides
          </h2>
          <p className="text-white/45 text-sm sm:text-base">
            Explore best-time-to-call guides for other countries in the region.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {related.slice(0, 12).map((rc, i) => (
            <motion.div key={rc.slug}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/country-code/${rc.slug}/best-time-to-call`}
                className="group relative flex flex-col bg-white/[0.025] hover:bg-[#0F1D30] border border-white/[0.07] hover:border-[#046BD2]/35 rounded-xl p-3.5 sm:p-4 transition-all duration-250 overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#046BD2]/0 to-transparent group-hover:via-[#22D3EE]/35 transition-all" />
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm sm:text-base font-black text-white/85 group-hover:text-[#22D3EE] transition-colors leading-none">
                    {formatDialCode(rc.dialCode)}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/15 group-hover:text-[#22D3EE]/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
                <span className="text-[10px] text-white/40 font-mono truncate">{rc.name}</span>
                <span className="text-[9px] text-white/25 font-mono mt-0.5">{formatUTCOffset(rc.utcOffset)}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

export function CountryCodeCTA({ country }: { country: CountryData }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()}
          className="relative overflow-hidden rounded-3xl border border-[#046BD2]/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/20 via-[#0B1220] to-[#22D3EE]/8" />
          <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-[#046BD2]/12 blur-[100px]" />
          <div className="absolute -bottom-24 right-1/4 w-[300px] h-[300px] rounded-full bg-[#22D3EE]/8 blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(120,160,220,0.25) 1px,transparent 0)", backgroundSize: "24px 24px" }} />

          <div className="relative px-6 sm:px-12 py-16 sm:py-20 text-center">
            <div aria-hidden className="text-[70px] sm:text-[100px] font-black text-white/[0.04] leading-none -mb-2 select-none">
              {formatDialCode(country.dialCode)}
            </div>

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#046BD2]/30 to-[#046BD2]/10 border border-[#046BD2]/25 mb-6">
              <Globe className="w-6 h-6 text-[#22D3EE]" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4">
              Ready to call {country.name}?
            </h2>
            <p className="text-white/50 text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
              Get a local {country.name} number or make international calls to {formatDialCode(country.dialCode)} numbers — active in under ten minutes.
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
                View Pricing
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { icon: ShieldCheck, label: "99.99% Uptime" },
                { icon: Globe,       label: "150+ Countries" },
                { icon: Headphones,  label: "24/7 Expert Support" },
                { icon: Star,        label: "No contracts" },
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
