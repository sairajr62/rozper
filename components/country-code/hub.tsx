"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import {
  Search, Globe, ArrowUpRight, Phone, ArrowRight, Clock,
  TrendingUp, Building2, Users, BarChart3, PhoneCall, BadgeCheck,
  Zap, CheckCircle2, ChevronDown, Star, X, MapPin, Shield,
  Landmark, Sunrise, Sun, TreePine, Waves, Moon, type LucideIcon,
} from "lucide-react"
import type { CountryData } from "@/lib/country-code-data"
import { formatDialCode, formatUTCOffset, COUNTRIES } from "@/lib/country-code-data"
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

const HERO_COUNTRIES = [
  { flag: "🇺🇸", name: "United States",   code: "+1",    capital: "Washington D.C.", utc: "UTC−5", region: "Americas" },
  { flag: "🇬🇧", name: "United Kingdom",  code: "+44",   capital: "London",          utc: "UTC+0", region: "Europe"   },
  { flag: "🇯🇵", name: "Japan",           code: "+81",   capital: "Tokyo",           utc: "UTC+9", region: "Asia"     },
  { flag: "🇩🇪", name: "Germany",         code: "+49",   capital: "Berlin",          utc: "UTC+1", region: "Europe"   },
  { flag: "🇮🇳", name: "India",           code: "+91",   capital: "New Delhi",       utc: "UTC+5:30", region: "Asia" },
  { flag: "🇧🇷", name: "Brazil",          code: "+55",   capital: "Brasília",        utc: "UTC−3", region: "Americas" },
  { flag: "🇦🇺", name: "Australia",       code: "+61",   capital: "Canberra",        utc: "UTC+10", region: "Oceania" },
  { flag: "🇫🇷", name: "France",          code: "+33",   capital: "Paris",           utc: "UTC+1", region: "Europe"   },
  { flag: "🇨🇳", name: "China",           code: "+86",   capital: "Beijing",         utc: "UTC+8", region: "Asia"     },
  { flag: "🇿🇦", name: "South Africa",    code: "+27",   capital: "Pretoria",        utc: "UTC+2", region: "Africa"   },
  { flag: "🇸🇦", name: "Saudi Arabia",    code: "+966",  capital: "Riyadh",          utc: "UTC+3", region: "Mid East" },
  { flag: "🇨🇦", name: "Canada",          code: "+1",    capital: "Ottawa",          utc: "UTC−5", region: "Americas" },
]

function HeroDialWidget() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % HERO_COUNTRIES.length)
        setVisible(true)
      }, 350)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const country = HERO_COUNTRIES[idx]

  return (
    <div className="relative w-full h-full flex flex-col gap-3 select-none">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#046BD2]/20 blur-[80px]" />
      </div>

      {/* Main card — animates in/out */}
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -14, scale: visible ? 1 : 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 bg-[#0d1e35] border border-[#22D3EE]/20 rounded-2xl p-5 shadow-2xl shadow-black/40"
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
            <span className="text-[10px] font-mono text-[#22D3EE]/60 uppercase tracking-widest">Live · Country Code</span>
          </div>
          <span className="text-[10px] font-mono text-white/20 bg-white/[0.05] px-2 py-0.5 rounded-full">{country.region}</span>
        </div>

        {/* Flag + code */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl leading-none">{country.flag}</span>
          <div>
            <div className="text-4xl font-black font-mono text-[#22D3EE] tabular-nums leading-none">{country.code}</div>
            <div className="text-sm font-semibold text-white mt-1">{country.name}</div>
          </div>
        </div>

        {/* Info row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/[0.04] rounded-lg px-3 py-2">
            <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-0.5">Capital</p>
            <p className="text-xs font-semibold text-white/70 truncate">{country.capital}</p>
          </div>
          <div className="bg-white/[0.04] rounded-lg px-3 py-2">
            <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-0.5">Timezone</p>
            <p className="text-xs font-semibold text-white/70">{country.utc}</p>
          </div>
        </div>
      </motion.div>

      {/* Progress dots */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 pt-1">
        {HERO_COUNTRIES.map((_, i) => (
          <button key={i} onClick={() => { setVisible(false); setTimeout(() => { setIdx(i); setVisible(true) }, 200) }}
            className={`h-1 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-[#22D3EE]" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
          />
        ))}
      </div>

      {/* Mini preview cards stacked behind */}
      <div className="relative z-0 -mt-2 space-y-2 opacity-40">
        {[1, 2].map(offset => {
          const c = HERO_COUNTRIES[(idx + offset) % HERO_COUNTRIES.length]
          return (
            <div key={offset} className="bg-[#0a1828]/80 border border-white/[0.06] rounded-xl px-4 py-2.5 flex items-center gap-3"
              style={{ transform: `scale(${1 - offset * 0.03}) translateY(${-offset * 4}px)`, transformOrigin: "top center" }}>
              <span className="text-xl leading-none">{c.flag}</span>
              <span className="text-sm font-semibold text-white/50 flex-1 truncate">{c.name}</span>
              <span className="text-sm font-black font-mono text-[#22D3EE]/50 tabular-nums">{c.code}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const HERO_REGION_META: Record<string, { label: string; color: string; codes: string[] }> = {
  europe:   { label: "Europe",       color: "#60a5fa", codes: ["+44", "+49", "+33", "+39"] },
  asia:     { label: "Asia",         color: "#fb923c", codes: ["+91", "+86", "+81", "+82"] },
  africa:   { label: "Africa",       color: "#4ade80", codes: ["+27", "+234", "+20", "+254"] },
  americas: { label: "Americas",     color: "#a78bfa", codes: ["+1", "+55", "+52", "+54"] },
  oceania:  { label: "Oceania",      color: "#22d3ee", codes: ["+61", "+64", "+679", "+675"] },
  mideast:  { label: "Middle East",  color: "#fbbf24", codes: ["+966", "+971", "+98", "+972"] },
}

function HeroContinentMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const nameMap = useMemo(() => {
    const map = new Map<string, string>()
    COUNTRIES.forEach(c => map.set(c.name.toLowerCase(), c.region))
    return map
  }, [])

  function getRegion(geoName: string): string | null {
    const lower = geoName.toLowerCase()
    if (nameMap.has(lower)) return nameMap.get(lower)!
    for (const [key, val] of nameMap) {
      if (lower.includes(key) || key.includes(lower)) return val
    }
    return null
  }

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    COUNTRIES.forEach(c => { counts[c.region] = (counts[c.region] || 0) + 1 })
    return counts
  }, [])

  const meta = hoveredRegion ? HERO_REGION_META[hoveredRegion] : null

  return (
    <div className="relative w-full select-none">
      <p className="text-[10px] font-mono text-white/25 text-center mb-2 tracking-widest uppercase">hover a region</p>

      <div className="relative rounded-2xl overflow-hidden border border-[#0086F9]/20" style={{ background: "radial-gradient(ellipse at 50% 40%, #0d2d50 0%, #081628 55%, #040d1a 100%)", boxShadow: "0 0 60px rgba(0,134,249,0.12), inset 0 0 80px rgba(0,134,249,0.04)" }}>
        {/* Inner glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,134,249,0.08) 0%, transparent 70%)" }} />
        <ComposableMap
          projectionConfig={{ scale: 170, center: [10, 10] as [number, number] }}
          width={960} height={650}
          style={{ width: "100%", height: "auto", position: "relative" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => {
                const geoName = geo.properties.name as string
                const region = getRegion(geoName)
                const isHov = region === hoveredRegion
                const regionColor = region ? HERO_REGION_META[region]?.color : null
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => region && setHoveredRegion(region)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    fill={isHov ? "#0086F9cc" : "#0d1e35"}
                    stroke="#0086F9"
                    strokeWidth={isHov ? 0.8 : 0.4}
                    strokeOpacity={isHov ? 0.9 : 0.6}
                    style={{
                      default: { outline: "none", cursor: region ? "pointer" : "default", transition: "fill 0.15s" },
                      hover:   { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
        {!hoveredRegion && (
          <div className="absolute bottom-2 right-3 flex items-center gap-1.5 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] opacity-60 animate-pulse" />
            <span className="text-[9px] font-mono text-white/20">hover any region</span>
          </div>
        )}
      </div>

      <div style={{ minHeight: 64 }} className="mt-3">
        <AnimatePresence mode="wait">
          {meta && hoveredRegion && (
            <motion.div
              key={hoveredRegion}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              style={{ borderColor: meta.color + "44", background: "#0a1828ee" }}
              className="rounded-xl border p-3 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div style={{ background: meta.color }} className="w-2 h-2 rounded-full" />
                  <span className="text-sm font-bold text-white">{meta.label}</span>
                </div>
                <span style={{ color: meta.color }} className="text-xs font-mono font-bold">
                  {regionCounts[hoveredRegion] ?? 0} countries
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {meta.codes.map(code => (
                  <span key={code} style={{ color: meta.color, borderColor: meta.color + "33", background: meta.color + "18" }}
                    className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border">
                    {code}
                  </span>
                ))}
                <span className="text-[11px] font-mono text-white/30 px-2 py-0.5">& more…</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function CountryHubHero({ total, query, setQuery }: HubHeroProps) {
  const hasScrolled = useRef(false)

  useEffect(() => {
    if (query && !hasScrolled.current) {
      hasScrolled.current = true
      const el = document.getElementById("directory")
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    if (!query) {
      hasScrolled.current = false
    }
  }, [query])

  return (
    <section className="relative pt-20 sm:pt-24 pb-0 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/10 via-[#0B1220] to-[#0B1220]" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#046BD2]/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#22D3EE]/5 blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(120,160,220,0.22) 1px,transparent 0)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pb-0">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          {/* Left — text content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-1 py-8 flex flex-col justify-center"
          >
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/15 border border-[#046BD2]/30 mb-5">
                <Globe className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
                  International Calling · {total}+ Countries
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3 leading-[1.1]">
                Global Country
                <br />
                <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                  Dial Codes
                </span>
              </h1>

              <p className="text-sm sm:text-base text-white/50 max-w-sm leading-relaxed mb-6">
                Find country calling codes, best times to call, and get virtual local numbers in {total}+ countries — instantly with Rozper.
              </p>

              <div className="flex flex-row flex-wrap gap-3">
                <Link href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0557b0] hover:to-[#0078e0] text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-[#046BD2]/25 text-sm whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Start a Free Trial
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/pricing"
                  className="inline-flex items-center justify-center gap-2 bg-white/[0.07] border border-white/20 hover:bg-white/[0.12] hover:border-white/30 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm whitespace-nowrap"
                >
                  See Pricing
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right — continent SVG map */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex flex-1 items-center justify-center py-6"
          >
            <HeroContinentMap />
          </motion.div>
        </div>

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

const REGION_PAGE_SIZE = 12

const REGION_STYLES: Record<string, { badge: string; dot: string; tzSpan: string }> = {
  europe:   { badge: "bg-[#1e3a5f] text-[#60a5fa] border-[#3b6cb7]/40",   dot: "bg-[#60a5fa]",  tzSpan: "UTC−1 to UTC+3"   },
  asia:     { badge: "bg-[#3b2008] text-[#fb923c] border-[#b45309]/40",   dot: "bg-[#fb923c]",  tzSpan: "UTC+5 to UTC+12"  },
  africa:   { badge: "bg-[#052e16] text-[#4ade80] border-[#166534]/40",   dot: "bg-[#4ade80]",  tzSpan: "UTC+0 to UTC+4"   },
  americas: { badge: "bg-[#2d1c5e] text-[#a78bfa] border-[#6d28d9]/40",  dot: "bg-[#a78bfa]",  tzSpan: "UTC−11 to UTC−3"  },
  oceania:  { badge: "bg-[#0c2a30] text-[#22d3ee] border-[#0e7490]/40",  dot: "bg-[#22d3ee]",  tzSpan: "UTC+8 to UTC+13"  },
  mideast:  { badge: "bg-[#2d1c08] text-[#fbbf24] border-[#b45309]/40",  dot: "bg-[#fbbf24]",  tzSpan: "UTC+2 to UTC+5"   },
}

function getLocalTime(utcOffset: number): string {
  const now = new Date()
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000
  const local = new Date(utcMs + utcOffset * 3600000)
  const h = local.getHours()
  const m = local.getMinutes().toString().padStart(2, "0")
  const ampm = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${m} ${ampm}`
}

export function BrowseByRegion({ countries }: { countries: CountryData[] }) {
  const [expandedRegion, setExpandedRegion] = useState<CountryData["region"] | null>(null)
  const [visibleCount, setVisibleCount] = useState(REGION_PAGE_SIZE)
  const [search, setSearch] = useState("")
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60000)
    return () => clearInterval(id)
  }, [])

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    countries.forEach(c => { map[c.region] = (map[c.region] || 0) + 1 })
    return map
  }, [countries])

  const regionCountries = useMemo(() => {
    if (!expandedRegion) return []
    const base = countries.filter(c => c.region === expandedRegion)
    if (!search.trim()) return base
    const q = search.toLowerCase()
    return base.filter(c => c.name.toLowerCase().includes(q) || c.dialCode.includes(q))
  }, [countries, expandedRegion, search, tick])

  function handleToggle(key: CountryData["region"]) {
    if (expandedRegion === key) {
      setExpandedRegion(null)
      setSearch("")
    } else {
      setExpandedRegion(key)
      setVisibleCount(REGION_PAGE_SIZE)
      setSearch("")
    }
  }

  const visible = regionCountries.slice(0, visibleCount)
  const hasMore = visibleCount < regionCountries.length

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fi()} className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Browse by Region</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">All world regions</h2>
              <p className="text-white/40 text-sm">{REGIONS.length} regions · {countries.length} countries</p>
            </div>
          </div>
        </motion.div>

        {/* Log panel */}
        <motion.div {...fi(0.1)} className="rounded-2xl border border-white/[0.08] bg-[#060D18] overflow-hidden">

          {/* Panel header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div>
              <p className="text-sm font-semibold text-white/80">Regions</p>
              <p className="text-[11px] text-white/30 font-mono">{REGIONS.length} of {REGIONS.length} regions</p>
            </div>
            <Globe className="w-4 h-4 text-white/20" />
          </div>

          {/* Region rows */}
          <div className="divide-y divide-white/[0.04]">
            {REGIONS.map((r, i) => {
              const style = REGION_STYLES[r.key] ?? REGION_STYLES.europe
              const isOpen = expandedRegion === r.key
              const Icon = r.icon
              const count = counts[r.key] || 0

              return (
                <div key={r.key}>
                  {/* Region row */}
                  <motion.button
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => handleToggle(r.key)}
                    className={`group w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 text-left transition-colors duration-200 ${
                      isOpen ? "bg-white/[0.04]" : "hover:bg-white/[0.025]"
                    }`}
                  >
                    {/* Chevron */}
                    <ChevronDown className={`w-4 h-4 shrink-0 text-white/25 transition-transform duration-200 ${isOpen ? "rotate-180 text-white/50" : "group-hover:text-white/40"}`} />

                    {/* Region badge */}
                    <span style={{ background: "#0a3a7a", color: "#ffffff", borderColor: "#0086F9" }} className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold">
                      <span style={{ background: "#22D3EE" }} className="w-1.5 h-1.5 rounded-full" />
                      {r.label}
                    </span>

                    {/* Timezone span */}

                    {/* Icon + description */}
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Icon className="w-3.5 h-3.5 text-white/25 shrink-0" />
                      <span className="text-sm text-white/50 truncate group-hover:text-white/70 transition-colors">
                        {count} countries with international dial codes
                      </span>
                    </div>

                    {/* Count badge */}
                    <span className={`shrink-0 text-xs font-mono font-bold px-2 py-0.5 rounded ${isOpen ? "text-white bg-white/10" : "text-white/30 group-hover:text-white/50"}`}>
                      {count}
                    </span>

                    {/* Duration-like indicator */}
                    <span className="hidden lg:block shrink-0 text-[11px] font-mono text-white/20 w-10 text-right">
                      {r.desc.split("·")[1]?.trim() ?? ""}
                    </span>
                  </motion.button>

                  {/* Expanded country rows */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        {/* Search within region */}
                        <div className="px-4 sm:px-6 py-3 border-b border-white/[0.04] bg-white/[0.02] flex items-center gap-3">
                          <Search className="w-3.5 h-3.5 text-white/25 shrink-0" />
                          <input
                            type="text"
                            value={search}
                            onChange={e => { setSearch(e.target.value); setVisibleCount(REGION_PAGE_SIZE) }}
                            placeholder={`Search in ${r.label}…`}
                            className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/20 outline-none font-mono"
                          />
                          {search && (
                            <button onClick={() => setSearch("")} className="text-white/25 hover:text-white/50 transition">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <span className="text-[10px] font-mono text-white/20">{regionCountries.length} results</span>
                        </div>

                        {/* Country rows */}
                        <div className="divide-y divide-white/[0.03]">
                          {visible.map((c, ci) => (
                            <motion.div
                              key={c.slug}
                              initial={{ opacity: 0, x: -4 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: ci * 0.018, duration: 0.22 }}
                              className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 hover:bg-white/[0.03] transition-colors"
                            >
                              {/* Current local time */}
                              <div className="flex items-center gap-1.5 shrink-0 w-24">
                                <Clock className="w-3 h-3 text-white/20" />
                                <span className="text-[11px] font-mono text-white/40 tabular-nums">{getLocalTime(c.utcOffset)}</span>
                              </div>


                              {/* Dial code */}
                              <span className="shrink-0 text-sm font-black font-mono text-[#22D3EE]/70 w-12 tabular-nums">
                                {formatDialCode(c.dialCode)}
                              </span>

                              {/* Country name */}
                              <span className="flex-1 text-sm text-white/60 group-hover:text-white/85 transition-colors font-medium truncate">
                                {c.name}
                              </span>

                              {/* UTC offset */}
                              <span className="hidden md:block shrink-0 text-[10px] font-mono text-white/20 w-16 text-right">
                                {formatUTCOffset(c.utcOffset)}
                              </span>

                              {/* View country button */}
                              <Link
                                href={`/country-code/${c.slug}`}
                                className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border border-white/[0.07] hover:border-[#046BD2]/50 bg-white/[0.03] hover:bg-[#0F1D30] text-[11px] text-white/40 hover:text-white transition-all"
                                onClick={e => e.stopPropagation()}
                              >
                                View
                                <ArrowUpRight className="w-3 h-3" />
                              </Link>
                            </motion.div>
                          ))}

                          {regionCountries.length === 0 && (
                            <div className="px-6 py-6 text-center text-sm text-white/25 font-mono">no results for "{search}"</div>
                          )}
                        </div>

                        {/* Show more */}
                        {hasMore && (
                          <div className="px-4 sm:px-6 py-3 border-t border-white/[0.04] bg-white/[0.01]">
                            <button
                              onClick={() => setVisibleCount(regionCountries.length)}
                              className="flex items-center gap-2 text-[11px] font-mono text-white/35 hover:text-[#22D3EE]/70 transition-colors"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                              Show all {regionCountries.length} countries in {r.label}
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Popular Countries — Card Grid ───────────────────────────────────────────

const POPULAR_LIST = [
  { dialCode: "+91",  name: "India",                utc: "UTC+5:30" },
  { dialCode: "+44",  name: "United Kingdom",        utc: "UTC+0"    },
  { dialCode: "+49",  name: "Germany",               utc: "UTC+1"    },
  { dialCode: "+33",  name: "France",                utc: "UTC+1"    },
  { dialCode: "+1",   name: "Canada",                utc: "UTC−5"    },
  { dialCode: "+61",  name: "Australia",             utc: "UTC+10"   },
  { dialCode: "+81",  name: "Japan",                 utc: "UTC+9"    },
  { dialCode: "+55",  name: "Brazil",                utc: "UTC−3"    },
  { dialCode: "+971", name: "United Arab Emirates",  utc: "UTC+4"    },
  { dialCode: "+65",  name: "Singapore",             utc: "UTC+8"    },
  { dialCode: "+82",  name: "South Korea",           utc: "UTC+9"    },
  { dialCode: "+52",  name: "Mexico",                utc: "UTC−6"    },
]

export function PopularCountriesGrid() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fi()} className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Most Requested</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Popular countries</h2>
          <p className="text-white/45 text-sm sm:text-base max-w-xl">
            The most-searched country calling codes and virtual number destinations.
          </p>
        </motion.div>

        <motion.div {...fi(0.1)} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {POPULAR_LIST.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="group relative bg-white/[0.03] border border-white/[0.07] hover:border-[#22D3EE]/30 hover:bg-white/[0.06] rounded-2xl p-4 transition-all cursor-pointer"
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-3">
                <span style={{ background: "rgba(34,211,238,0.12)", color: "#22D3EE", border: "1px solid rgba(34,211,238,0.2)" }}
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded-full">
                  {c.utc}
                </span>
                <Star className="w-3 h-3 text-white/15 group-hover:text-[#22D3EE]/40 transition-colors" />
              </div>

              {/* Dial code */}
              <p className="text-2xl font-black text-white tabular-nums leading-none mb-1">{c.dialCode}</p>
              <p className="text-xs text-white/45 group-hover:text-white/65 transition-colors leading-tight">{c.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Popular Countries — World Map (click country area) ───────────────────────

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

function flagEmoji(iso2: string) {
  return iso2.toUpperCase().split("").map(c => String.fromCodePoint(c.charCodeAt(0) + 127397)).join("")
}

function fmtPop(n: number | null) {
  if (!n) return "—"
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B"
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M"
  return n.toLocaleString()
}


// ─── Popular Countries — World Map ────────────────────────────────────────────

export function PopularCountries({ countries }: { countries: CountryData[] }) {
  const [hoveredGeo, setHoveredGeo]   = useState<string | null>(null)
  const [selected, setSelected]       = useState<{ geoName: string; data: CountryData } | null>(null)

  const nameMap = useMemo(() => {
    const map = new Map<string, CountryData>()
    countries.forEach(c => {
      map.set(c.name.toLowerCase(), c)
      map.set(c.name.toLowerCase().replace(/\s+/g, " "), c)
    })
    return map
  }, [countries])

  function findByGeoName(geoName: string): CountryData | null {
    const lower = geoName.toLowerCase()
    if (nameMap.has(lower)) return nameMap.get(lower)!
    for (const [key, val] of nameMap) {
      if (lower.includes(key) || key.includes(lower)) return val
    }
    return null
  }

  function handleGeoClick(geoName: string) {
    if (selected?.geoName === geoName) { setSelected(null); return }
    const data = findByGeoName(geoName)
    if (data) setSelected({ geoName, data })
  }

  const projConfig = useMemo(() => ({ scale: 138, center: [10, 10] as [number, number] }), [])

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-[#22D3EE]/5 blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div {...fi()} className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Explore Countries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            Interactive world map
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-xl">
            Click any country on the map to see its dial code, timezone, and calling info.
          </p>
        </motion.div>

        <motion.div {...fi(0.1)} className="flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-white/[0.06] bg-[#071828]" style={{ minHeight: "460px", background: "radial-gradient(ellipse at center, #0a2240 0%, #071828 60%, #040e1e 100%)" }}>
          <div className="relative flex-1 min-h-[320px] lg:min-h-0">
            <ComposableMap projectionConfig={projConfig} width={980} height={500} style={{ width: "100%", height: "100%" }}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const geoName = geo.properties.name as string
                    const hasData = !!findByGeoName(geoName)
                    const isSel   = selected?.geoName === geoName
                    const isHov   = hoveredGeo === geoName
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleGeoClick(geoName)}
                        onMouseEnter={() => hasData && setHoveredGeo(geoName)}
                        onMouseLeave={() => setHoveredGeo(null)}
                        fill={isSel ? "#0f6fcc" : isHov ? "#1e4a7a" : "#0d1e35"}
                        stroke="#0086F9"
                        strokeWidth={isSel ? 1 : 0.45}
                        strokeOpacity={isSel ? 1 : 0.6}
                        style={{
                          default: { outline: "none", cursor: hasData ? "pointer" : "default", transition: "fill 0.15s" },
                          hover:   { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    )
                  })
                }
              </Geographies>
            </ComposableMap>
            {hoveredGeo && !selected && (
              <div className="absolute bottom-3 left-4 flex items-center gap-2 pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] opacity-80" />
                <span className="text-[11px] font-mono text-[#22D3EE]/70">{hoveredGeo}</span>
              </div>
            )}
            <div className="absolute bottom-3 right-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22D3EE] opacity-40" />
              <span className="text-[10px] font-mono text-white/20">click any country</span>
            </div>
          </div>

          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: "easeInOut" }}
                className="overflow-hidden lg:border-l border-t lg:border-t-0 border-white/[0.08] shrink-0"
              >
                <div className="w-full lg:w-72 xl:w-80 h-full flex flex-col bg-[#060D18]">
                  <div className="flex items-start justify-between p-5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl leading-none">{flagEmoji(selected.data.isoCode2)}</span>
                      <div>
                        <p className="text-sm font-bold text-white leading-tight">{selected.data.name}</p>
                        <p className="text-[10px] font-mono text-white/30 mt-0.5">{selected.data.isoCode2} · {selected.data.isoCode3}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelected(null)} className="text-white/25 hover:text-white/60 transition mt-0.5">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto divide-y divide-white/[0.05]">
                    <div className="flex items-center justify-between px-5 py-3">
                      <span className="text-[11px] text-white/35 font-mono">Dial Code</span>
                      <span className="text-lg font-black font-mono text-[#22D3EE]">{formatDialCode(selected.data.dialCode)}</span>
                    </div>
                    <div className="flex items-center justify-between px-5 py-3">
                      <span className="text-[11px] text-white/35 font-mono">Current Time</span>
                      <div className="text-right">
                        <p className="text-sm font-mono font-bold text-white">{getLocalTime(selected.data.utcOffset)}</p>
                        <p className="text-[9px] font-mono text-white/25">{formatUTCOffset(selected.data.utcOffset)}</p>
                      </div>
                    </div>
                    {selected.data.capital && (
                      <div className="flex items-center justify-between px-5 py-3">
                        <span className="text-[11px] text-white/35 font-mono">Capital</span>
                        <span className="text-sm text-white/70">{selected.data.capital}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between px-5 py-3">
                      <span className="text-[11px] text-white/35 font-mono">Currency</span>
                      <span className="text-sm text-white/70">{selected.data.currency} <span className="text-white/30 text-[10px]">({selected.data.currencyCode})</span></span>
                    </div>
                    {selected.data.language && (
                      <div className="flex items-center justify-between px-5 py-3">
                        <span className="text-[11px] text-white/35 font-mono">Language</span>
                        <span className="text-sm text-white/70 text-right max-w-[140px] truncate">{selected.data.language}</span>
                      </div>
                    )}
                    {selected.data.population && (
                      <div className="flex items-center justify-between px-5 py-3">
                        <span className="text-[11px] text-white/35 font-mono">Population</span>
                        <span className="text-sm text-white/70">{fmtPop(selected.data.population)}</span>
                      </div>
                    )}
                    {selected.data.workingDays && (
                      <div className="flex items-center justify-between px-5 py-3">
                        <span className="text-[11px] text-white/35 font-mono">Work Days</span>
                        <span className="text-[11px] text-white/55 font-mono">{selected.data.workingDays}</span>
                      </div>
                    )}
                    {selected.data.region && (
                      <div className="flex items-center justify-between px-5 py-3">
                        <span className="text-[11px] text-white/35 font-mono">Region</span>
                        <span className="text-[11px] text-white/55 capitalize">{selected.data.region === "mideast" ? "Middle East" : selected.data.region}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Full Country Directory — Phone Book Style ────────────────────────────────

function PhoneBookRow({ c }: { c: CountryData }) {
  return (
    <Link
      href={`/country-code/${c.slug}`}
      className="group flex items-center gap-3 py-2.5 px-3 hover:bg-white/[0.04] rounded-lg transition-all border-b border-white/[0.04] last:border-0"
    >
      <span className="text-[#22D3EE] font-black font-mono text-sm w-20 shrink-0 tabular-nums">
        {formatDialCode(c.dialCode)}
      </span>
      <span className="flex-1 text-white/60 text-sm group-hover:text-white/90 transition-colors font-mono truncate">
        {c.name}
      </span>
      <span className="text-white/20 text-[10px] font-mono w-14 text-right shrink-0 hidden sm:block">
        {formatUTCOffset(c.utcOffset)}
      </span>
      <ArrowUpRight className="w-3 h-3 text-white/10 group-hover:text-[#22D3EE]/60 transition shrink-0" />
    </Link>
  )
}

const DIR_REGIONS = [
  { key: "all",      label: "All",       icon: Globe,    color: "#22D3EE", bg: "bg-[#0e2a3a]"  },
  { key: "asia",     label: "Asia",      icon: Sun,      color: "#fb923c", bg: "bg-[#2a1505]"  },
  { key: "europe",   label: "Europe",    icon: Landmark, color: "#60a5fa", bg: "bg-[#0f1e38]"  },
  { key: "americas", label: "Americas",  icon: TreePine, color: "#a78bfa", bg: "bg-[#1a0f38]"  },
  { key: "africa",   label: "Africa",    icon: Sunrise,  color: "#4ade80", bg: "bg-[#031a0c]"  },
  { key: "oceania",  label: "Oceania",   icon: Waves,    color: "#22d3ee", bg: "bg-[#031a20]"  },
  { key: "mideast",  label: "Mid East",  icon: Moon,     color: "#fbbf24", bg: "bg-[#1a1003]"  },
] as const

type DirRegionKey = typeof DIR_REGIONS[number]["key"]

function CountryCard({ c, delay }: { c: CountryData; delay: number }) {
  const [time, setTime] = useState(() => getLocalTime(c.utcOffset))
  useEffect(() => {
    const id = setInterval(() => setTime(getLocalTime(c.utcOffset)), 30000)
    return () => clearInterval(id)
  }, [c.utcOffset])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/country-code/${c.slug}`}
        className="group flex flex-col gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-[#046BD2]/40 transition-all duration-200"
      >
        {/* Top row: flag + arrow */}
        <div className="flex items-start justify-between">
          <span className="text-3xl leading-none">{flagEmoji(c.isoCode2)}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-white/15 group-hover:text-[#22D3EE]/60 transition-colors shrink-0 mt-0.5" />
        </div>

        {/* Country name */}
        <div>
          <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors leading-tight line-clamp-1">{c.name}</p>
          {c.capital && <p className="text-[10px] text-white/30 font-mono mt-0.5 truncate">{c.capital}</p>}
        </div>

        {/* Dial code */}
        <div className="text-lg font-black font-mono text-[#22D3EE]/80 group-hover:text-[#22D3EE] transition-colors tabular-nums leading-none">
          {formatDialCode(c.dialCode)}
        </div>

        {/* Local time + UTC */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/[0.05]">
          <span className="text-[10px] font-mono text-white/40 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 opacity-60" />{time}
          </span>
          <span className="text-[9px] font-mono text-white/20">{formatUTCOffset(c.utcOffset)}</span>
        </div>
      </Link>
    </motion.div>
  )
}

export function CountryDirectory({
  countries, query, setQuery,
}: { countries: CountryData[]; query: string; setQuery: (q: string) => void }) {
  const [activeRegion, setActiveRegion] = useState<DirRegionKey>("all")

  const searchFiltered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return null
    return countries.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.dialCode.includes(q) ||
      c.capital.toLowerCase().includes(q) ||
      c.isoCode2.toLowerCase() === q ||
      c.isoCode3.toLowerCase() === q
    )
  }, [countries, query])

  const regionList = useMemo(() => {
    if (activeRegion === "all") return countries
    return countries.filter(c => c.region === activeRegion)
  }, [countries, activeRegion])

  const displayList = searchFiltered ?? regionList

  const activeRegionMeta = DIR_REGIONS.find(r => r.key === activeRegion)!

  return (
    <section id="directory" className="py-14 sm:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fi()} className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#046BD2] to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22D3EE]/80">// Full Directory</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Complete country code directory</h2>
              <p className="text-white/40 text-sm font-mono mt-1">
                {searchFiltered
                  ? `${searchFiltered.length} result${searchFiltered.length !== 1 ? "s" : ""} for "${query}"`
                  : `${displayList.length} countries${activeRegion !== "all" ? ` in ${activeRegionMeta.label}` : " worldwide"}`}
              </p>
            </div>
            {/* Search */}
            <div className="relative w-72 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
              <input
                type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search country or code…"
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#046BD2]/50 transition-all font-mono"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Region tabs */}
        {!searchFiltered && (
          <motion.div {...fi(0.08)} className="flex flex-wrap gap-2 mb-6">
            {DIR_REGIONS.map(r => {
              const Icon = r.icon
              const isActive = activeRegion === r.key
              const count = r.key === "all" ? countries.length : countries.filter(c => c.region === r.key).length
              return (
                <button
                  key={r.key}
                  onClick={() => setActiveRegion(r.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    isActive
                      ? `${r.bg} border-current text-[${r.color}]`
                      : "bg-white/[0.03] border-white/[0.07] text-white/45 hover:text-white/70 hover:bg-white/[0.06]"
                  }`}
                  style={isActive ? { color: r.color, borderColor: r.color + "55" } : {}}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {r.label}
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/10" : "bg-white/[0.05] text-white/25"}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </motion.div>
        )}

        {/* Country card grid */}
        <AnimatePresence mode="wait">
          {displayList.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20 text-white/30">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-mono">No results for "{query}"</p>
              <button onClick={() => setQuery("")} className="mt-3 text-[#22D3EE] text-xs hover:underline font-mono">Clear search</button>
            </motion.div>
          ) : (
            <motion.div
              key={searchFiltered ? `s-${query}` : activeRegion}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
            >
              {displayList.map((c, i) => (
                <CountryCard key={c.slug} c={c} delay={Math.min(i * 0.025, 0.6)} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function RegionLetterBrowser({ countries }: { countries: CountryData[] }) {
  const [activeRegion, setActiveRegion] = useState<CountryData["region"] | null>(null)
  const [activeLetter, setActiveLetter] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)

  const regionCountries = useMemo(() =>
    activeRegion ? countries.filter(c => c.region === activeRegion) : countries
  , [countries, activeRegion])

  const letters = useMemo(() => {
    const set = new Set<string>()
    regionCountries.forEach(c => set.add(c.name[0].toUpperCase()))
    return Array.from(set).sort()
  }, [regionCountries])

  const letterCountries = useMemo(() =>
    activeLetter ? regionCountries.filter(c => c.name[0].toUpperCase() === activeLetter) : []
  , [regionCountries, activeLetter])

  useEffect(() => { setActiveLetter(null); setExpanded(false) }, [activeRegion])
  useEffect(() => { setExpanded(false) }, [activeLetter])

  return (
    <motion.div {...fi(0.25)} className="mt-14">
      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/25">or browse by region & letter</span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>

      {/* Region tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {REGIONS.map(r => {
          const Icon = r.icon
          const isActive = activeRegion === r.key
          return (
            <button
              key={r.key}
              onClick={() => setActiveRegion(prev => prev === r.key ? null : r.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#046BD2] border-[#046BD2] text-white"
                  : "bg-white/[0.03] border-white/[0.08] text-white/50 hover:border-[#046BD2]/40 hover:text-white/80 hover:bg-white/[0.05]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {r.label}
            </button>
          )
        })}
        {activeRegion && (
          <button onClick={() => setActiveRegion(null)} className="flex items-center gap-1 px-3 py-2 text-xs text-white/25 hover:text-white/50 transition font-mono">
            <X className="w-3 h-3" /> clear
          </button>
        )}
      </div>

      {/* Letter bar */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {letters.map(letter => (
          <button
            key={letter}
            onClick={() => setActiveLetter(prev => prev === letter ? null : letter)}
            className={`min-w-[36px] h-9 px-2 rounded-lg text-[13px] font-bold font-mono border transition-all duration-200 ${
              activeLetter === letter
                ? "bg-[#046BD2] border-[#046BD2] text-white"
                : "bg-transparent border-white/[0.1] text-white/40 hover:border-[#046BD2]/50 hover:text-white/80 hover:bg-[#046BD2]/10"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Countries for selected letter */}
      <AnimatePresence>
        {activeLetter && letterCountries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28 }}
            className="bg-white/[0.015] border border-white/[0.06] rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-3 py-2.5 border-b border-white/[0.08] bg-white/[0.02]">
              <span className="text-2xl font-black text-white/[0.06] font-mono w-8 leading-none">{activeLetter}</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/25 w-20 shrink-0">Dial Code</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/25 flex-1">Country</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/25 w-14 text-right shrink-0 hidden sm:block">Timezone</span>
              <span className="w-3 shrink-0" />
            </div>
            <div>
              {(expanded ? letterCountries : letterCountries.slice(0, 10)).map(c => (
                <PhoneBookRow key={c.slug} c={c} />
              ))}
            </div>
            {letterCountries.length > 10 && (
              <button
                onClick={() => setExpanded(e => !e)}
                className="w-full py-2.5 text-[11px] font-mono text-white/30 hover:text-[#22D3EE] hover:bg-white/[0.02] transition-all flex items-center justify-center gap-1.5 border-t border-white/[0.04]"
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
                {expanded ? "Show less" : `Show ${letterCountries.length - 10} more`}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prompt */}
      {!activeLetter && (
        <div className="text-center py-8">
          <p className="text-xs font-mono text-white/20">
            {activeRegion ? `Select a letter to browse ${REGIONS.find(r => r.key === activeRegion)?.label} countries` : "Select a region, then a letter"}
          </p>
        </div>
      )}
    </motion.div>
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
                  <Link href="/contact"
                    className="group flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0557b0] hover:to-[#0078e0] text-white font-bold px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl transition-all shadow-lg shadow-[#046BD2]/25 text-sm"
                  >
                    Start a Free Trial
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link href="/pricing"
                    className="inline-flex items-center justify-center bg-white/[0.08] border border-white/20 hover:bg-white/[0.14] hover:border-white/35 text-white font-semibold px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl transition-all text-sm whitespace-nowrap"
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
