"use client"

import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
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

const CountryLeafletMap = dynamic(
  () => import("@/components/country-code/country-leaflet-map").then(m => ({ default: m.CountryLeafletMap })),
  { ssr: false, loading: () => <div style={{ height: 440, borderRadius: 16, background: "#040d1a", border: "1px solid rgba(0,134,249,0.2)" }} /> }
)

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fi = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

// ─── Country map ──────────────────────────────────────────────────────────────

// Capital coords [lon, lat]
const CAPITAL_COORDS: Record<string, [number, number]> = {
  AF: [69.18, 34.52], AL: [19.82, 41.33], DZ: [3.05, 36.74], AS: [-170.70, -14.27],
  AD: [1.52, 42.51],  AO: [13.23, -8.84], AI: [-63.05, 18.22], AG: [-61.85, 17.12],
  AR: [-58.38, -34.61], AM: [44.50, 40.18], AW: [-70.02, 12.52], AU: [149.13, -35.31],
  AT: [16.37, 48.21], AZ: [49.87, 40.41], BS: [-77.34, 25.06], BH: [50.59, 26.21],
  BD: [90.41, 23.72], BB: [-59.62, 13.10], BY: [27.57, 53.90], BE: [4.35, 50.85],
  BZ: [-88.77, 17.25], BJ: [2.62, 6.37],  BM: [-64.78, 32.29], BT: [89.64, 27.47],
  BO: [-68.13, -16.50], BA: [18.42, 43.85], BW: [25.91, -24.65], BR: [-47.93, -15.78],
  BN: [114.94, 4.94], BG: [23.32, 42.70], BF: [-1.52, 12.37], BI: [29.36, -3.38],
  CV: [-23.51, 14.93], KH: [104.92, 11.57], CM: [11.52, 3.87], CA: [-75.70, 45.42],
  KY: [-81.38, 19.30], CF: [18.56, 4.36],  TD: [15.05, 12.11], CL: [-70.67, -33.46],
  CN: [116.39, 39.91], CO: [-74.08, 4.71], KM: [43.26, -11.70], CD: [15.32, -4.32],
  CG: [15.28, -4.26], CR: [-84.09, 9.93],  HR: [16.00, 45.80], CU: [-82.35, 23.13],
  CW: [-68.92, 12.11], CY: [33.36, 35.17], CZ: [14.47, 50.08], DK: [12.57, 55.68],
  DJ: [43.14, 11.59], DM: [-61.39, 15.30], DO: [-69.90, 18.48], EC: [-78.50, -0.23],
  EG: [31.24, 30.06], SV: [-89.20, 13.70], GQ: [8.78, 3.75],   ER: [38.93, 15.34],
  EE: [24.73, 59.44], SZ: [31.13, -26.32], ET: [38.70, 9.03],  FJ: [178.44, -18.14],
  FI: [25.00, 60.17], FR: [2.35, 48.85],   GF: [-52.33, 4.94], PF: [-149.57, -17.53],
  GA: [9.45, 0.39],   GM: [-15.59, 13.45], GE: [44.83, 41.69], DE: [13.41, 52.52],
  GH: [-0.19, 5.55],  GI: [-5.35, 36.14],  GR: [23.73, 37.98], GL: [-51.74, 64.18],
  GD: [-61.75, 12.05], GP: [-61.53, 16.00], GU: [144.79, 13.47], GT: [-90.52, 14.64],
  GN: [-13.71, 9.54], GW: [-15.18, 11.86], GY: [-58.16, 6.80], HT: [-72.34, 18.54],
  HN: [-87.22, 14.10], HK: [114.18, 22.32], HU: [19.04, 47.50], IS: [-21.82, 64.13],
  IN: [77.21, 28.61], ID: [106.82, -6.21], IR: [51.39, 35.69], IQ: [44.39, 33.34],
  IE: [-6.27, 53.33], IL: [35.22, 31.77],  IT: [12.48, 41.90], JM: [-76.79, 17.99],
  JP: [139.69, 35.69], JO: [35.93, 31.96], KZ: [71.43, 51.18], KE: [36.82, -1.29],
  KI: [173.02, -1.33], XK: [21.17, 42.67], KW: [47.98, 29.37], KG: [74.60, 42.87],
  LA: [102.60, 17.97], LV: [24.11, 56.95], LB: [35.49, 33.89], LS: [27.48, -29.32],
  LR: [-10.80, 6.30], LY: [13.18, 32.90],  LI: [9.52, 47.14],  LT: [25.28, 54.69],
  LU: [6.13, 49.61],  MO: [113.55, 22.20], MG: [47.53, -18.91], MW: [33.78, -13.97],
  MY: [101.69, 3.14], MV: [73.51, 4.18],   ML: [-8.00, 12.65], MT: [14.51, 35.90],
  MH: [171.38, 7.09], MQ: [-61.06, 14.61], MR: [-15.96, 18.08], MU: [57.50, -20.16],
  MX: [-99.13, 19.43], FM: [158.16, 6.92], MD: [28.86, 47.00], MC: [7.42, 43.73],
  MN: [106.92, 47.91], ME: [19.27, 42.44], MS: [-62.21, 16.71], MA: [-6.85, 33.99],
  MZ: [32.59, -25.97], MM: [96.13, 19.74], NA: [17.08, -22.56], NR: [166.92, -0.55],
  NP: [85.32, 27.72],  NL: [4.90, 52.37],  NC: [166.46, -22.27], NZ: [174.78, -41.29],
  NI: [-86.29, 12.13], NE: [2.11, 13.51],  NG: [7.53, 9.07],   NU: [-169.92, -19.02],
  NF: [167.97, -29.05], KP: [125.75, 39.02], MK: [21.43, 42.00], MP: [145.75, 15.21],
  NO: [10.75, 59.91],  OM: [58.59, 23.61], PK: [73.04, 33.72], PW: [134.62, 7.34],
  PS: [35.23, 31.90],  PA: [-79.52, 8.99], PG: [147.18, -9.44], PY: [-57.64, -25.28],
  PE: [-77.04, -12.05], PH: [120.98, 14.60], PL: [21.01, 52.23], PT: [-9.14, 38.72],
  PR: [-66.11, 18.47], QA: [51.53, 25.29],  RE: [55.45, -20.88], RO: [26.10, 44.44],
  RU: [37.62, 55.75],  RW: [30.06, -1.94], KN: [-62.72, 17.30], LC: [-61.00, 14.01],
  VC: [-61.21, 13.16], WS: [-171.77, -13.82], SM: [12.45, 43.94], ST: [6.73, 0.34],
  SA: [46.72, 24.69],  SN: [-17.44, 14.69], RS: [20.46, 44.80], SC: [55.45, -4.62],
  SL: [-13.23, 8.49],  SG: [103.85, 1.29],  SX: [-63.05, 18.03], SK: [17.11, 48.15],
  SI: [14.51, 46.05],  SB: [159.95, -9.43], SO: [45.34, 2.05],  ZA: [28.22, -25.75],
  GS: [-36.51, -54.28], SS: [31.62, 4.86],  ES: [-3.69, 40.42], LK: [80.64, 7.29],
  SD: [32.53, 15.55],  SR: [-55.17, 5.85],  SE: [18.07, 59.33], CH: [7.45, 46.95],
  SY: [36.29, 33.51],  TW: [121.53, 25.05], TJ: [68.78, 38.56], TZ: [39.29, -6.17],
  TH: [100.52, 13.75], TL: [125.58, -8.56], TG: [1.22, 6.14],  TO: [-175.22, -21.14],
  TT: [-61.52, 10.65], TN: [10.18, 36.82],  TR: [32.86, 39.93], TM: [58.38, 37.95],
  TC: [-71.14, 21.46], TV: [179.21, -8.52], UG: [32.58, 0.32],  UA: [30.52, 50.43],
  AE: [54.37, 24.47],  GB: [-0.13, 51.51],  US: [-77.04, 38.91], UY: [-56.19, -34.90],
  UZ: [69.27, 41.30],  VU: [168.32, -17.73], VE: [-66.86, 10.49], VN: [105.85, 21.03],
  VG: [-64.62, 18.42], VI: [-64.93, 18.34], WF: [-171.93, -13.28], EH: [-13.20, 27.17],
  YE: [44.19, 15.35],  ZM: [28.29, -15.41], ZW: [31.05, -17.83],
  KR: [126.98, 37.57], TF: [70.22, -49.35],
  CC: [96.83, -12.16], CK: [-159.78, -21.21], FK: [-57.85, -51.70], FO: [-6.91, 62.01],
  GG: [-2.54, 49.46], IM: [-4.48, 54.15], JE: [-2.10, 49.19], PM: [-56.18, 46.78],
  SH: [-5.72, -15.93], SJ: [15.63, 78.22], TC: [-71.14, 21.46], VA: [12.45, 41.90],
  AX: [19.95, 60.12], BL: [-62.85, 17.90], MF: [-63.05, 18.07], CX: [105.72, -10.49],
  IO: [72.38, -7.34], HM: [73.50, -53.10], PN: [-130.10, -25.07], TK: [-171.84, -9.17],
}

// Map center [lon, lat]
const COUNTRY_CENTERS: Record<string, [number, number]> = {
  AL: [20.17, 41.15], US: [-98.5, 39.5], GB: [-3.4, 55.4], DE: [10.4, 51.2],
  FR: [2.2, 46.2], IN: [78.9, 20.6], CN: [104.2, 35.9], JP: [138.3, 36.2],
  BR: [-51.9, -14.2], AU: [133.8, -25.3], CA: [-96.8, 56.1], RU: [105.3, 61.5],
  MX: [-102.6, 23.6], ZA: [25.1, -29.0], NG: [8.7, 9.1], KE: [37.9, 0.0],
  EG: [30.8, 26.8], SA: [44.8, 24.7], AE: [53.8, 23.4], TR: [35.2, 38.9],
  IT: [12.6, 42.5], ES: [-3.7, 40.2], PL: [19.1, 51.9], NL: [5.3, 52.1],
  SE: [18.6, 59.3], NO: [15.5, 65.5], CH: [8.2, 46.8], AT: [14.6, 47.7],
  PK: [69.3, 30.4], BD: [90.4, 23.7], PH: [121.8, 12.9], ID: [117.9, -2.5],
  MY: [109.7, 3.1], TH: [100.9, 15.9], VN: [108.3, 14.1], KR: [127.8, 36.5],
  AR: [-63.6, -38.4], CL: [-71.5, -35.7], CO: [-74.3, 4.6], PE: [-75.0, -9.2],
}

function CountryMapSVG({ country }: { country: CountryData }) {
  const coords = CAPITAL_COORDS[country.isoCode2]
  const lat = coords ? coords[1] : 41.33
  const lon = coords ? coords[0] : 19.82

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-[580px] mx-auto"
    >
      <CountryLeafletMap
        capital={country.capital}
        lat={lat}
        lon={lon}
        dialCode={formatDialCode(country.dialCode)}
        isoCode2={country.isoCode2}
        countryName={country.name}
      />
    </motion.div>
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
              <Link href="/country-code/" className="hover:text-white/60 transition">country-code</Link>
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


            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/contact/"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0557b0] hover:to-[#0078e0] text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#046BD2]/20 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" />
                Start a Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href={`/country-code/${country.slug}/best-time-to-call/`}
                className="inline-flex items-center gap-2 border border-white/15 hover:border-[#22D3EE]/40 hover:bg-white/[0.04] text-white/75 hover:text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm sm:text-base"
              >
                Best Time to Call
              </Link>
            </div>
          </motion.div>

          {/* Right: country map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden md:flex items-center justify-center"
          >
            <CountryMapSVG country={country} />
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
            <Link href={`/country-code/${country.slug}/best-time-to-call/`}
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
              <Link href={`/country-code/${rc.slug}/`}
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
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4">
              Start calling {country.name} today
            </h2>
            <p className="text-white/50 text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
              Get a virtual {country.name} number or make direct international calls to {formatDialCode(country.dialCode)} — active in under ten minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link href="/contact/"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0557b0] hover:to-[#0078e0] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#046BD2]/25 text-sm sm:text-base"
              >
                Start a Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/pricing/"
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
