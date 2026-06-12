"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Globe, ArrowUpRight, Phone, ArrowRight, Clock,
  TrendingUp, Building2, Users, BarChart3, PhoneCall, BadgeCheck,
  Zap, CheckCircle2, ChevronDown, Star, X, MapPin, Shield,
  Landmark, Sunrise, Sun, TreePine, Waves, Moon, type LucideIcon,
} from "lucide-react"
import type { CountryData } from "@/lib/country-code-data"
import { formatDialCode, formatUTCOffset } from "@/lib/country-code-data"
import { GlobeOrb } from "@/components/ui/globe"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fi = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

// ─── World Hub SVG ─────────────────────────────────────────────────────────────

function WorldHubSVG() {
  return (
    <div className="relative w-full flex items-center justify-center select-none pointer-events-none">
      <div className="absolute w-80 h-56 rounded-full bg-[#046BD2]/15 blur-[80px]" />
      <div className="absolute w-56 h-40 rounded-full bg-[#22D3EE]/6 blur-[50px] translate-x-8" />
      <GlobeOrb className="relative w-64 h-64 sm:w-80 sm:h-80" />
    </div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

interface HubHeroProps {
  total: number
  query: string
  setQuery: (q: string) => void
}

export function CountryHubHero({ total, query, setQuery }: HubHeroProps) {
  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-0 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/14 via-[#0B1220] to-[#0B1220]" />
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#046BD2]/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#22D3EE]/5 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(120,160,220,0.22) 1px,transparent 0)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-8 md:gap-6 items-center pb-14 sm:pb-16 lg:pb-20">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-5 sm:mb-7"
            >
              <Globe className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
                International Calling · {total}+ Countries
              </span>
            </motion.div>

            <h1 className="text-[1.85rem] leading-[1.08] sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-4 sm:mb-5">
              Global Country
              <br />
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                Dial Codes
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/50 max-w-xl leading-relaxed mb-6 sm:mb-8">
              Find country calling codes, best times to call, and get virtual local numbers in {total}+ countries worldwide — instantly with Rozper.
            </p>

            <div className="relative w-full max-w-lg mb-6 sm:mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              <input
                type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search country name or dial code…"
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

          {/* Right: SVG — shown from md upwards */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:flex items-center justify-center"
          >
            <WorldHubSVG />
          </motion.div>
        </div>

        {/* Stats ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.07] -mb-px relative z-10"
        >
          {[
            { icon: Globe, value: `${total}+`, label: "Countries" },
            { icon: Phone, value: "150+", label: "Number Markets" },
            { icon: Clock, value: "< 10 min", label: "Setup Time" },
            { icon: Shield, value: "99.99%", label: "Uptime SLA" },
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

// ─── Why International ─────────────────────────────────────────────────────────

const WHY_ITEMS = [
  { icon: TrendingUp, color: "#22D3EE", stat: "3×",    title: "Higher answer rates",         body: "Calls from a local country number are answered far more often than unknown international numbers — driving more productive first conversations." },
  { icon: Building2,  color: "#0086F9", stat: "0",     title: "No local office required",     body: "Get a virtual presence in any country without renting space, hiring locally, or installing hardware. All calls route to your existing team." },
  { icon: Users,      color: "#22D3EE", stat: "237+",  title: "Every country covered",        body: "From Afghanistan to Zimbabwe, Rozper provides dial codes, calling guides, and virtual numbers for every country in the world." },
  { icon: BarChart3,  color: "#0086F9", stat: "99.99%","title": "Carrier-grade reliability",  body: "Built on a global carrier network with 99.99% uptime SLA. Your international number stays live around the clock in every market." },
  { icon: PhoneCall,  color: "#22D3EE", stat: "< 10s", title: "Instant global routing",       body: "International calls connect to your team's existing devices — mobile, desktop, or desk phone — in under 10 seconds from anywhere." },
  { icon: BadgeCheck, color: "#0086F9", stat: "24/7",  title: "Expert support included",      body: "Every plan includes round-the-clock live support from real VoIP engineers. Not bots, not email tickets — real people when you need them." },
]

export function WhyInternational() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute -top-40 left-0 w-[500px] h-[500px] rounded-full bg-[#046BD2]/6 blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div {...fi()} className="mb-10 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/25 mb-4 sm:mb-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Why International Numbers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Why businesses use international virtual numbers
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-xl mx-auto">
            A local number in any country changes how prospects and customers respond to your business.
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
                  style={{ background: `${item.color}18`, borderColor: `${item.color}28` }}>
                  <item.icon className="w-[18px] h-[18px]" style={{ color: item.color }} />
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

// ─── Browse by Region ──────────────────────────────────────────────────────────

const REGIONS: { key: CountryData["region"]; label: string; icon: LucideIcon; desc: string }[] = [
  { key: "europe",   label: "Europe",      icon: Landmark, desc: "44 countries · UTC−1 to UTC+3"   },
  { key: "asia",     label: "Asia",        icon: Sunrise,  desc: "50+ countries · UTC+5 to UTC+12" },
  { key: "africa",   label: "Africa",      icon: Sun,      desc: "54 countries · UTC+0 to UTC+4"   },
  { key: "americas", label: "Americas",    icon: TreePine, desc: "35+ countries · UTC−11 to UTC−3" },
  { key: "oceania",  label: "Oceania",     icon: Waves,    desc: "20+ countries · UTC−11 to UTC+13"},
  { key: "mideast",  label: "Middle East", icon: Moon,     desc: "15 countries · UTC+2 to UTC+5"   },
]

export function BrowseByRegion({ countries }: { countries: CountryData[] }) {
  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    countries.forEach(c => { map[c.region] = (map[c.region] || 0) + 1 })
    return map
  }, [countries])

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()} className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Browse by Region</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
            All world regions
          </h2>
          <p className="text-white/45 text-sm sm:text-base">
            Select a region to browse countries, dial codes, and calling guides.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {REGIONS.map((r, i) => (
            <motion.div key={r.key} {...fi(i * 0.06)}>
              <Link href={`#region-${r.key}`}
                className="group relative flex flex-col items-center text-center bg-white/[0.03] hover:bg-[#0F1D30] border border-white/[0.07] hover:border-[#046BD2]/40 rounded-2xl p-3 sm:p-4 lg:p-5 transition-all duration-250 overflow-hidden"
              >
                <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-[#046BD2]/0 group-hover:bg-[#046BD2]/10 blur-xl transition-all duration-400" />
                <r.icon className="w-7 h-7 sm:w-8 sm:h-8 mb-2 relative text-[#22D3EE] group-hover:text-[#0086F9] transition-colors duration-250" />
                <span className="text-sm font-bold text-white/85 group-hover:text-white mb-1 relative">{r.label}</span>
                <span className="text-[10px] font-mono text-white/30 relative leading-tight">{counts[r.key] || 0} countries</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Popular Countries ─────────────────────────────────────────────────────────

const POPULAR_SLUGS = [
  "india","united-kingdom","germany","france","canada","australia",
  "japan","brazil","united-arab-emirates","singapore","south-korea","mexico",
]

export function PopularCountries({ countries }: { countries: CountryData[] }) {
  const popular = useMemo(
    () => POPULAR_SLUGS.map(s => countries.find(c => c.slug === s)).filter(Boolean) as CountryData[],
    [countries]
  )

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
            Popular countries
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-xl">
            The most-searched country calling codes and virtual number destinations.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {popular.map(({ slug, name, dialCode, utcOffset }, i) => (
            <motion.div key={slug}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/country-code/${slug}`}
                className="group relative flex flex-col h-full bg-[#0B1728]/80 hover:bg-[#101C2E] border border-white/[0.07] hover:border-[#22D3EE]/35 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-[#22D3EE]/0 group-hover:bg-[#22D3EE]/8 blur-xl transition-all duration-500" />
                <div className="flex items-center justify-between mb-2.5 sm:mb-3 relative">
                  <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-[#046BD2]/15 border border-[#046BD2]/25 text-[#22D3EE]/80">
                    {formatUTCOffset(utcOffset)}
                  </span>
                  <Star className="w-3 h-3 text-[#22D3EE]/30 group-hover:text-[#22D3EE]/70 transition-colors" />
                </div>
                <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white/90 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#22D3EE] group-hover:to-[#046BD2] group-hover:bg-clip-text transition-all duration-300 leading-none mb-1 relative">
                  {formatDialCode(dialCode)}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-white/65 mb-0.5 sm:mb-1 relative line-clamp-1">{name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Full Country Directory ────────────────────────────────────────────────────

const REGION_ORDER: CountryData["region"][] = ["europe", "asia", "africa", "americas", "oceania", "mideast"]
const REGION_LABELS: Record<CountryData["region"], string> = {
  europe: "Europe", asia: "Asia", africa: "Africa",
  americas: "Americas", oceania: "Oceania", mideast: "Middle East",
}

export function CountryDirectory({
  countries, query, setQuery,
}: { countries: CountryData[]; query: string; setQuery: (q: string) => void }) {
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return countries
    return countries.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.dialCode.includes(q) ||
      c.capital.toLowerCase().includes(q) ||
      c.isoCode2.toLowerCase() === q ||
      c.isoCode3.toLowerCase() === q
    )
  }, [countries, query])

  const grouped = useMemo(() => {
    if (query.trim()) return null
    const map: Record<string, CountryData[]> = {}
    REGION_ORDER.forEach(r => { map[r] = [] })
    filtered.forEach(c => { if (map[c.region]) map[c.region].push(c) })
    return map
  }, [filtered, query])

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.025, duration: 0.36 } }),
  }

  const CountryCard = ({ c, i }: { c: CountryData; i: number }) => (
    <motion.div key={c.slug} variants={fadeUp} initial="hidden" whileInView="show"
      viewport={{ once: true }} custom={i % 20}
    >
      <Link href={`/country-code/${c.slug}`}
        className="group relative flex flex-col bg-white/[0.025] hover:bg-[#0F1D30] border border-white/[0.06] hover:border-[#046BD2]/35 rounded-xl p-3 sm:p-4 transition-all duration-250 overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#046BD2]/0 to-transparent group-hover:via-[#22D3EE]/35 transition-all" />
        <div className="flex items-start justify-between mb-1.5">
          <span className="text-lg sm:text-xl font-black text-white/85 group-hover:text-[#22D3EE] transition-colors leading-none">
            {formatDialCode(c.dialCode)}
          </span>
          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/15 group-hover:text-[#22D3EE]/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </div>
        <span className="text-[10px] sm:text-[11px] text-white/55 font-medium truncate leading-snug">{c.name}</span>
        <span className="text-[9px] sm:text-[10px] font-mono text-white/25 mt-0.5">{formatUTCOffset(c.utcOffset)}</span>
      </Link>
    </motion.div>
  )

  return (
    <section id="directory" className="py-14 sm:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()} className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Full Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
            Complete country code directory
          </h2>
          <p className="text-white/45 text-sm">
            {query.trim()
              ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${query}"`
              : `${countries.length} countries with dial codes, timezones, and calling guides`}
          </p>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <Search className="w-10 h-10 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold mb-2">No results</p>
            <p className="text-sm">Try a country name, dial code, or ISO code.</p>
            <button onClick={() => setQuery("")} className="mt-4 text-[#22D3EE] text-sm hover:underline">Clear search</button>
          </div>
        ) : query.trim() ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
            {filtered.map((c, i) => <CountryCard key={c.slug} c={c} i={i} />)}
          </div>
        ) : (
          <div className="space-y-12">
            {REGION_ORDER.map(region => {
              const list = grouped?.[region] ?? []
              if (list.length === 0) return null
              return (
                <div key={region} id={`region-${region}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-8 bg-gradient-to-r from-[#046BD2] to-transparent" />
                    <h3 className="text-sm font-bold text-white/60 font-mono uppercase tracking-widest">
                      {REGION_LABELS[region]} ({list.length})
                    </h3>
                    <div className="flex-1 h-px bg-white/[0.05]" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
                    {list.map((c, i) => <CountryCard key={c.slug} c={c} i={i} />)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Hub FAQ ──────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "What is a country calling code?",                   a: "A country calling code (or international dialing code) is the numeric prefix you dial before a local phone number when calling internationally. For example, +44 for the UK, +91 for India, and +49 for Germany. These codes are assigned by the ITU (International Telecommunication Union)." },
  { q: "How do I call internationally from the US?",        a: "From the US, dial the exit code (011), followed by the country calling code, then the local number (omitting any leading 0). For example, to call India: 011 + 91 + local number. Rozper handles this automatically — just dial the full international number in E.164 format (+91XXXXXXXXXX)." },
  { q: "Can I get a local virtual number in any country?",  a: "Rozper offers local virtual numbers in 150+ countries. A virtual number lets your business appear local in any market — calls ring your team's existing devices without requiring a physical presence in that country." },
  { q: "What is the best time to call an international contact?", a: "The best time to call internationally depends on the destination's timezone and business hours. Each country page on Rozper includes a detailed best-time-to-call guide that shows the optimal calling window from every major US timezone." },
  { q: "How do I find a country's dial code?",              a: "Use the search bar above to find any country by name, dial code, or ISO code. Each country entry shows its international dialing code, timezone, capital, and links to a full best-time-to-call guide." },
  { q: "What features come with a Rozper international number?", a: "Every Rozper number includes HD voice calling, call recording and transcription, voicemail-to-text, CRM integration (Salesforce, HubSpot, Zoho), AI analytics, call forwarding to any device, and 24/7 expert support — all accessible from a single dashboard." },
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

export function CountryHubFAQ() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
          <motion.div {...fi()} className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Common questions
            </h2>
            <p className="text-white/45 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              Everything you need to know about international calling codes and virtual numbers.
            </p>
            <Link href="/contact"
              className="group inline-flex items-center gap-2 text-[#22D3EE] text-sm font-medium hover:text-white transition"
            >
              Have more questions?
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
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

// ─── Hub CTA ──────────────────────────────────────────────────────────────────

export function CountryHubCTA() {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()} className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#046BD2]/20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/18 via-[#0B1220] to-[#22D3EE]/8" />
          <div className="absolute -top-24 left-1/3 w-[500px] h-[500px] rounded-full bg-[#046BD2]/12 blur-[100px]" />
          <div className="absolute -bottom-16 right-1/4 w-[300px] h-[300px] rounded-full bg-[#22D3EE]/8 blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.02]"
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
                  Go global with
                  <br />
                  <span className="bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
                    Rozper today.
                  </span>
                </h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-md">
                  No hardware. No contracts. No waiting. Get a virtual number in any country and start calling globally immediately.
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
                  {["No physical office needed","Works on any device","99.99% uptime SLA","24/7 live support","Cancel anytime","150+ virtual number markets"].map(item => (
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
