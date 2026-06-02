"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone, Globe, Clock, ArrowRight, ArrowLeft, Check,
  PhoneCall, Mic, MessageSquare, Link2, BarChart3, UserCheck,
  Layers, Headphones, ShieldCheck, BadgeCheck, Zap,
  MapPin, DollarSign, Languages, Users, Landmark, Calendar,
  ArrowUpRight, ChevronDown, Star,
} from "lucide-react"
import type { CountryData, BestCallingTimes } from "@/lib/country-code-data"
import { formatDialCode, formatUTCOffset, formatPopulation, formatGDP } from "@/lib/country-code-data"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fi = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

// ─── Country SVG ─────────────────────────────────────────────────────────────

function CountryNetworkSVG({ country }: { country: CountryData }) {
  const grad = `cpg-${country.isoCode2}`
  const glow = `cpgw-${country.isoCode2}`
  const dialNodes = [
    { code: formatDialCode(country.dialCode), label: country.isoCode2, color: "#22D3EE", cx: 180, cy: 180 },
  ]
  const orbits = [
    { cx: 60,  cy: 80,  color: "#22D3EE" },
    { cx: 300, cy: 70,  color: "#0086F9" },
    { cx: 330, cy: 210, color: "#22D3EE" },
    { cx: 280, cy: 300, color: "#046BD2" },
    { cx: 80,  cy: 300, color: "#0086F9" },
    { cx: 30,  cy: 190, color: "#22D3EE" },
  ]

  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[420px] mx-auto select-none pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-52 h-52 rounded-full bg-[#046BD2]/20 blur-[70px]" />
        <div className="absolute w-32 h-32 rounded-full bg-[#22D3EE]/15 blur-[50px]" />
      </div>
      <svg viewBox="0 0 360 360" className="relative w-full" aria-hidden fill="none">
        <defs>
          <linearGradient id={grad} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#046BD2" /><stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <filter id={glow} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Pulsing rings */}
        {[160, 128, 96].map((r, i) => (
          <motion.circle key={r} cx={180} cy={180} r={r}
            fill="none" stroke={i === 1 ? "#22D3EE" : "#046BD2"}
            strokeOpacity={0.05 + i * 0.03} strokeWidth={1}
            strokeDasharray={i === 1 ? "5 12" : undefined}
            animate={{ r: [r, r + 5, r], opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          />
        ))}

        {/* Center globe */}
        <circle cx={180} cy={180} r={60} fill="#0A1628" stroke={`url(#${grad})`} strokeWidth={1.5} strokeOpacity={0.75} />
        <circle cx={180} cy={180} r={52} fill="#060D1A" />

        {/* Latitude lines on center */}
        {[-1, 0, 1].map((l, i) => (
          <ellipse key={i} cx={180} cy={180 + l * 16} rx={i === 1 ? 52 : 38} ry={i === 1 ? 6 : 4}
            stroke="#22D3EE" strokeOpacity={0.07} strokeWidth={0.5} fill="none" />
        ))}
        <path d="M180 128 Q198 180 180 232" stroke="#046BD2" strokeOpacity={0.07} strokeWidth={0.5} fill="none" />
        <path d="M180 128 Q162 180 180 232" stroke="#046BD2" strokeOpacity={0.07} strokeWidth={0.5} fill="none" />

        {/* Dial code text */}
        <motion.text x={180} y={173} textAnchor="middle"
          fill={`url(#${grad})`}
          fontSize={country.dialCode.length > 4 ? "22" : "28"}
          fontWeight="900" fontFamily="system-ui,-apple-system,sans-serif"
          filter={`url(#${glow})`}
          animate={{ opacity: [0.82, 1, 0.82] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          {formatDialCode(country.dialCode)}
        </motion.text>
        <text x={180} y={188} textAnchor="middle" fill="#22D3EE" fontSize="7"
          fontFamily="system-ui,sans-serif" letterSpacing="3.5" fillOpacity={0.7}>DIAL CODE</text>
        <text x={180} y={202} textAnchor="middle" fill="white" fontSize="8.5"
          fontFamily="system-ui,sans-serif" fillOpacity={0.4}>
          {country.isoCode2} · {formatUTCOffset(country.utcOffset)}
        </text>

        {/* Orbit nodes */}
        {orbits.map((node, i) => (
          <motion.g key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.55, ease: "easeInOut" }}>
            <motion.line x1={node.cx} y1={node.cy} x2={180} y2={180}
              stroke={node.color} strokeOpacity={0.15} strokeWidth={1} strokeDasharray="4 8"
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
            />
            <circle cx={node.cx} cy={node.cy} r={9}
              fill={node.color} fillOpacity={0.1} stroke={node.color} strokeOpacity={0.4} strokeWidth={1.2} />
            <circle cx={node.cx} cy={node.cy} r={4} fill={node.color} fillOpacity={0.85} />
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function CountryPageHero({ country, times }: { country: CountryData; times: BestCallingTimes }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
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
            </nav>

            {/* Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-6 max-w-full">
              <Globe className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#22D3EE] break-all">
                {formatDialCode(country.dialCode)} · {country.isoCode2} · {formatUTCOffset(country.utcOffset)}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[1.9rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-5">
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                {country.name}
              </span>
              <br />
              <span className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white/50 tracking-normal">
                Country Code & Virtual Numbers
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/55 mb-6 leading-relaxed max-w-lg">
              The international dialing code for {country.name} is <strong className="text-white/85">{formatDialCode(country.dialCode)}</strong>.
              Capital: <strong className="text-white/80">{country.capital}</strong> · Timezone: <strong className="text-white/80">{formatUTCOffset(country.utcOffset)}</strong> ·
              Business hours: {times.est.start}–{times.est.end} EST.
            </p>

            {/* Sub-page links */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Link href={`/country-code/${country.slug}/best-time-to-call`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/25 hover:bg-[#22D3EE]/15 transition text-xs font-mono text-[#22D3EE]"
              >
                <Clock className="w-3.5 h-3.5" />
                Best Time to Call
                <ArrowRight className="w-3 h-3" />
              </Link>
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
              <Link href={`/country-code/${country.slug}/best-time-to-call`}
                className="inline-flex items-center gap-2 border border-white/15 hover:border-[#22D3EE]/40 hover:bg-white/[0.04] text-white/75 hover:text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm sm:text-base"
              >
                Calling Guide
              </Link>
            </div>
          </motion.div>

          {/* Right: SVG — shown from md upwards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden md:flex items-center justify-center"
          >
            <CountryNetworkSVG country={country} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Quick Facts ──────────────────────────────────────────────────────────────

export function CountryQuickFacts({ country }: { country: CountryData }) {
  const facts = [
    { icon: Phone,      label: "Dial Code",   value: formatDialCode(country.dialCode), color: "#22D3EE" },
    { icon: Landmark,   label: "Capital",     value: country.capital,                  color: "#0086F9" },
    { icon: DollarSign, label: "Currency",    value: `${country.currencyCode}`,        color: "#22D3EE" },
    { icon: Clock,      label: "Time Zone",   value: formatUTCOffset(country.utcOffset), color: "#046BD2" },
    { icon: Calendar,   label: "Work Days",   value: country.workingDays,              color: "#22D3EE" },
    { icon: Languages,  label: "Language",    value: country.language,                 color: "#0086F9" },
    { icon: Users,      label: "Population",  value: formatPopulation(country.population), color: "#22D3EE" },
    { icon: Globe,      label: "GDP",         value: formatGDP(country.gdpUsd),        color: "#046BD2" },
  ]

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#046BD2]/4 via-transparent to-[#22D3EE]/4 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Country Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            {country.name} at a Glance
          </h2>
          <p className="text-white/45 text-base max-w-xl">
            Key facts about {country.name} for business communication planning.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {facts.map((f, i) => (
            <motion.div key={f.label} {...fi(i * 0.05)}
              className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-[#046BD2]/30 rounded-2xl p-5 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#046BD2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 border"
                  style={{ background: `${f.color}18`, borderColor: `${f.color}22` }}>
                  <f.icon className="w-4 h-4" style={{ color: f.color }} strokeWidth={1.8} />
                </div>
                <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">{f.label}</p>
                <p className="text-xs sm:text-sm font-semibold text-white/85 leading-snug break-words">{f.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Calling Guide Banner ─────────────────────────────────────────────────────

export function CallingGuideBanner({ country, times }: { country: CountryData; times: BestCallingTimes }) {
  return (
    <section className="py-8 sm:py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()}
          className="relative overflow-hidden rounded-2xl border border-[#22D3EE]/20 bg-gradient-to-r from-[#0D1B2E] to-[#0A1525] p-6 sm:p-8"
        >
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-[#22D3EE]/5 to-transparent pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22D3EE]/20 to-[#22D3EE]/5 border border-[#22D3EE]/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#22D3EE]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base mb-1">
                  Best time to call {country.name} from the US
                </h3>
                <p className="text-sm text-white/50">
                  {country.name} is on <span className="text-[#22D3EE]">{formatUTCOffset(country.utcOffset)}</span> · Business hours
                  = <span className="text-white/70">{times.est.start}–{times.est.end} EST</span> · {country.workingDays}
                </p>
              </div>
            </div>
            <Link href={`/country-code/${country.slug}/best-time-to-call`}
              className="group shrink-0 w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2 bg-[#22D3EE]/10 hover:bg-[#22D3EE]/20 border border-[#22D3EE]/25 hover:border-[#22D3EE]/50 text-[#22D3EE] font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
            >
              Full Calling Guide
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Virtual Number Benefits ───────────────────────────────────────────────────

export function VirtualNumberBenefits({ country }: { country: CountryData }) {
  const items = [
    { icon: PhoneCall,  color: "#22D3EE", title: "Local caller ID in " + country.name, body: `When you call from your virtual ${country.name} number, contacts see a local ${formatDialCode(country.dialCode)} number — dramatically improving answer rates.` },
    { icon: Globe,      color: "#0086F9", title: "No office needed",                    body: `Establish a local presence in ${country.name} without renting space, hiring locally, or installing any hardware.` },
    { icon: UserCheck,  color: "#22D3EE", title: "Instant credibility",                 body: `A local ${country.name} number signals commitment to the market. Customers in ${country.capital} trust local numbers more than unfamiliar international ones.` },
    { icon: Layers,     color: "#046BD2", title: "Routes to any device",                body: `Calls to your ${country.name} number ring your team on mobile, desktop, or desk phone — wherever they work.` },
  ]

  return (
    <section className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Why a Virtual Number</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Why get a {country.name} virtual number?
          </h2>
          <p className="text-white/45 text-base max-w-xl">
            A {formatDialCode(country.dialCode)} virtual number gives your business instant local presence in {country.name} — without the overhead.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <motion.div key={item.title} {...fi(i * 0.07)}
              className="group relative bg-gradient-to-br from-[#046BD2]/10 to-[#046BD2]/3 border border-[#046BD2]/18 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            >
              <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/0 group-hover:bg-white/[0.03] blur-xl transition-all duration-500" />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 border relative"
                style={{ background: `${item.color}18`, borderColor: `${item.color}22` }}>
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
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
  { icon: Globe,        title: "150+ country coverage",        body: "Get virtual numbers in over 150 countries on the same platform — one dashboard, one bill." },
  { icon: PhoneCall,    title: "HD voice quality",             body: "Crystal-clear calls over our optimised global carrier network. No degraded quality from international routing." },
  { icon: Mic,          title: "Call recording",               body: "Every call recorded and transcribed automatically. Review, share, and reference conversations easily." },
  { icon: MessageSquare,title: "Voicemail to text",            body: "Voicemails transcribed and delivered by email or SMS. Never miss a message across time zones." },
  { icon: Link2,        title: "CRM auto-logging",             body: "All calls to and from your international number auto-logged in Salesforce, HubSpot, or Zoho." },
  { icon: BarChart3,    title: "International analytics",      body: "Call volume, answer rates, and duration broken down by country, region, and time of day." },
  { icon: UserCheck,    title: "Local Caller ID",              body: "Show a local country number as your caller ID when dialling internationally. Improves pickup rates significantly." },
  { icon: Layers,       title: "Instant provisioning",         body: "Activate a new country number in under 60 seconds. No contracts, no hardware, no waiting." },
  { icon: ShieldCheck,  title: "99.99% uptime SLA",            body: "Enterprise-grade reliability for your international calling infrastructure, 24/7." },
]

export function CountryFeaturesSection({ country }: { country: CountryData }) {
  return (
    <section className="py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Platform Features</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Everything to call {country.name}
          </h2>
          <p className="text-white/45 text-base max-w-xl">
            The tools to reach {country.name} contacts reliably and scale your international presence globally.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] rounded-3xl overflow-hidden border border-white/[0.06]">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} {...fi(i * 0.05)}
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

// ─── Getting Started ──────────────────────────────────────────────────────────

const STEPS = [
  { n: "01", icon: Zap,       color: "#22D3EE", title: "Sign up",                  body: "Create your Rozper account in under 2 minutes. No credit card required to start your free trial." },
  { n: "02", icon: Globe,     color: "#0086F9", title: "Get your number",           body: "Browse available numbers in your target country and activate instantly." },
  { n: "03", icon: Phone,     color: "#046BD2", title: "Configure routing",         body: "Route calls to any device. Set business hours, voicemail, and IVR from your dashboard." },
  { n: "04", icon: BadgeCheck,color: "#22D3EE", title: "Start calling globally",    body: "Make and receive international calls immediately. Active in under 10 minutes." },
]

export function CountryGettingStarted({ country }: { country: CountryData }) {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#046BD2]/4 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// Get Started</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Get a {country.name} number today
          </h2>
          <p className="text-white/45 text-base">Active in under ten minutes. No contracts required.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#046BD2]/25 to-transparent z-0" />
          {STEPS.map((s, i) => (
            <motion.div key={s.n} {...fi(i * 0.09)} className="relative z-10">
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

// ─── Related Countries ────────────────────────────────────────────────────────

export function CountryPageRelated({ country, related }: { country: CountryData; related: CountryData[] }) {
  if (related.length === 0) return null
  const regionLabel: Record<string, string> = {
    europe: "European", asia: "Asian", africa: "African",
    americas: "American", oceania: "Pacific", mideast: "Middle Eastern",
  }

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#22D3EE]/4 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div {...fi()} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">
              // More {regionLabel[country.region]} Countries
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
            Other countries in the region
          </h2>
          <p className="text-white/45 text-sm">Dial codes and calling guides for nearby countries.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {related.slice(0, 12).map((rc, i) => (
            <motion.div key={rc.slug}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/country-code/${rc.slug}`}
                className="group relative flex flex-col bg-white/[0.025] hover:bg-[#0F1D30] border border-white/[0.07] hover:border-[#046BD2]/35 rounded-xl p-3.5 sm:p-4 transition-all duration-250 overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#046BD2]/0 to-transparent group-hover:via-[#22D3EE]/35 transition-all" />
                <div className="flex items-start justify-between mb-2">
                  <span className="text-base sm:text-lg font-black text-white/85 group-hover:text-[#22D3EE] transition-colors leading-none">
                    {formatDialCode(rc.dialCode)}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/15 group-hover:text-[#22D3EE]/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
                <span className="text-[10px] text-white/45 font-mono truncate">{rc.name}</span>
                <span className="text-[9px] text-white/25 font-mono mt-0.5">{formatUTCOffset(rc.utcOffset)}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open ? "border-[#046BD2]/30 bg-white/[0.04]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"}`}>
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left" aria-expanded={open}>
        <div className="flex items-start gap-3">
          <span className="text-[#22D3EE]/40 font-mono text-xs mt-0.5 shrink-0 font-bold tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold text-white/85 leading-snug">{q}</span>
        </div>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${open ? "bg-[#046BD2]/20 rotate-180" : "bg-white/[0.05]"}`}>
          <ChevronDown className={`w-4 h-4 transition-colors ${open ? "text-[#22D3EE]" : "text-white/35"}`} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/[0.05]">
              <p className="pt-4 text-sm text-white/50 leading-relaxed pl-4 sm:pl-8">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function CountryPageFAQ({ country, times }: { country: CountryData; times: BestCallingTimes }) {
  const diffH = country.utcOffset - (-5)
  const aheadBehind = diffH > 0 ? `${Math.abs(diffH)} hours ahead of` : diffH < 0 ? `${Math.abs(diffH)} hours behind` : "the same time as"

  const faqs = [
    { q: `What is the country code for ${country.name}?`,             a: `The international dialing code for ${country.name} is ${formatDialCode(country.dialCode)}. When calling from the US, dial 011 + ${country.dialCode} + the local number. Rozper handles this automatically.` },
    { q: `How do I call ${country.name} from the United States?`,     a: `From the US, dial the exit code 011, then ${country.dialCode}, followed by the local phone number (drop any leading 0). With Rozper, simply enter the full number in international format: ${formatDialCode(country.dialCode)} followed by the local number.` },
    { q: `Can I get a virtual ${country.name} phone number?`,          a: `Yes. Rozper offers local virtual numbers in ${country.name} and 150+ other countries. Your team can make and receive calls as if they were based in ${country.capital}, with all calls routing to your existing devices.` },
    { q: `What time zone is ${country.name} in?`,                     a: `${country.name} operates on ${formatUTCOffset(country.utcOffset)}, which is ${aheadBehind} US Eastern time (UTC−5). Business hours in ${country.name} (9 AM–5 PM local) fall between ${times.est.start} and ${times.est.end} EST.` },
    { q: `What are the working days in ${country.name}?`,             a: `Standard working days in ${country.name} are ${country.workingDays}. The official language is ${country.language} and the currency is ${country.currency} (${country.currencyCode}). Always confirm specific holiday schedules with your contact.` },
    { q: `What's the best way to manage international calls to ${country.name}?`, a: `Rozper gives you a local ${country.name} virtual number, call recording, voicemail-to-text, CRM integration, and AI analytics — all in one platform. You can monitor call quality, review conversations, and track international activity from a single dashboard.` },
  ]

  return (
    <section className="py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fi()} className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#22D3EE]/80">// FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              {country.name} — Common Questions
            </h2>
            <p className="text-white/45 text-base">Answers about calling {country.name} and getting a local virtual number.</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
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

// ─── CTA ─────────────────────────────────────────────────────────────────────

export function CountryPageCTA({ country }: { country: CountryData }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()}
          className="relative overflow-hidden rounded-3xl border border-[#046BD2]/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/20 via-[#0B1220] to-[#22D3EE]/8" />
          <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-[#046BD2]/12 blur-[100px]" />
          <div className="absolute -bottom-24 right-1/4 w-[300px] h-[300px] rounded-full bg-[#22D3EE]/8 blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(120,160,220,0.25) 1px,transparent 0)", backgroundSize: "24px 24px" }} />

          <div className="relative px-6 sm:px-12 py-16 sm:py-20 text-center">
            <div aria-hidden className="text-[80px] sm:text-[110px] font-black text-white/[0.04] leading-none -mb-2 select-none">
              {formatDialCode(country.dialCode)}
            </div>

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#046BD2]/30 to-[#046BD2]/10 border border-[#046BD2]/25 mb-6">
              <Globe className="w-6 h-6 text-[#22D3EE]" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4">
              Start calling {country.name} today
            </h2>
            <p className="text-white/50 text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
              Get a virtual {country.name} number or make direct international calls to {formatDialCode(country.dialCode)} — active in under ten minutes.
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
