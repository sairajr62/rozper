"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false })
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

// Capital coords map [lon, lat] for country pins
const CAPITAL_COORDS_MAP: Record<string, [number, number]> = {
  AF:[69.18,34.52],AL:[19.82,41.33],DZ:[3.05,36.74],AO:[13.23,-8.84],AR:[-58.38,-34.61],
  AM:[44.50,40.18],AU:[149.13,-35.31],AT:[16.37,48.21],AZ:[49.87,40.41],BS:[-77.34,25.06],
  BH:[50.59,26.21],BD:[90.41,23.72],BY:[27.57,53.90],BE:[4.35,50.85],BZ:[-88.77,17.25],
  BJ:[2.62,6.37],BT:[89.64,27.47],BO:[-68.13,-16.50],BA:[18.42,43.85],BW:[25.91,-24.65],
  BR:[-47.93,-15.78],BN:[114.94,4.94],BG:[23.32,42.70],BF:[-1.52,12.37],BI:[29.36,-3.38],
  KH:[104.92,11.57],CM:[11.52,3.87],CA:[-75.70,45.42],CF:[18.56,4.36],TD:[15.05,12.11],
  CL:[-70.67,-33.46],CN:[116.39,39.91],CO:[-74.08,4.71],CD:[15.32,-4.32],CG:[15.28,-4.26],
  CR:[-84.09,9.93],HR:[16.00,45.80],CU:[-82.35,23.13],CY:[33.36,35.17],CZ:[14.47,50.08],
  DK:[12.57,55.68],DJ:[43.14,11.59],DO:[-69.90,18.48],EC:[-78.50,-0.23],EG:[31.24,30.06],
  SV:[-89.20,13.70],GQ:[8.78,3.75],ER:[38.93,15.34],EE:[24.73,59.44],ET:[38.70,9.03],
  FJ:[178.44,-18.14],FI:[25.00,60.17],FR:[2.35,48.85],GA:[9.45,0.39],GM:[-15.59,13.45],
  GE:[44.83,41.69],DE:[13.41,52.52],GH:[-0.19,5.55],GR:[23.73,37.98],GT:[-90.52,14.64],
  GN:[-13.71,9.54],GW:[-15.18,11.86],GY:[-58.16,6.80],HT:[-72.34,18.54],HN:[-87.22,14.10],
  HU:[19.04,47.50],IS:[-21.82,64.13],IN:[77.21,28.61],ID:[106.82,-6.21],IR:[51.39,35.69],
  IQ:[44.39,33.34],IE:[-6.27,53.33],IL:[35.22,31.77],IT:[12.48,41.90],JM:[-76.79,17.99],
  JP:[139.69,35.69],JO:[35.93,31.96],KZ:[71.43,51.18],KE:[36.82,-1.29],KW:[47.98,29.37],
  KG:[74.60,42.87],LA:[102.60,17.97],LV:[24.11,56.95],LB:[35.49,33.89],LS:[27.48,-29.32],
  LR:[-10.80,6.30],LY:[13.18,32.90],LT:[25.28,54.69],LU:[6.13,49.61],MG:[47.53,-18.91],
  MW:[33.78,-13.97],MY:[101.69,3.14],MV:[73.51,4.18],ML:[-8.00,12.65],MT:[14.51,35.90],
  MR:[-15.96,18.08],MU:[57.50,-20.16],MX:[-99.13,19.43],MD:[28.86,47.00],MN:[106.92,47.91],
  ME:[19.27,42.44],MA:[-6.85,33.99],MZ:[32.59,-25.97],MM:[96.13,19.74],NA:[17.08,-22.56],
  NP:[85.32,27.72],NL:[4.90,52.37],NZ:[174.78,-41.29],NI:[-86.29,12.13],NE:[2.11,13.51],
  NG:[7.53,9.07],KP:[125.75,39.02],NO:[10.75,59.91],OM:[58.59,23.61],PK:[73.04,33.72],
  PA:[-79.52,8.99],PG:[147.18,-9.44],PY:[-57.64,-25.28],PE:[-77.04,-12.05],PH:[120.98,14.60],
  PL:[21.01,52.23],PT:[-9.14,38.72],QA:[51.53,25.29],RO:[26.10,44.44],RU:[37.62,55.75],
  RW:[30.06,-1.94],SA:[46.72,24.69],SN:[-17.44,14.69],RS:[20.46,44.80],SL:[-13.23,8.49],
  SG:[103.85,1.29],SK:[17.11,48.15],SI:[14.51,46.05],SO:[45.34,2.05],ZA:[28.22,-25.75],
  SS:[31.62,4.86],ES:[-3.69,40.42],LK:[80.64,7.29],SD:[32.53,15.55],SR:[-55.17,5.85],
  SE:[18.07,59.33],CH:[7.45,46.95],SY:[36.29,33.51],TW:[121.53,25.05],TJ:[68.78,38.56],
  TZ:[39.29,-6.17],TH:[100.52,13.75],TL:[125.58,-8.56],TG:[1.22,6.14],TT:[-61.52,10.65],
  TN:[10.18,36.82],TR:[32.86,39.93],TM:[58.38,37.95],UG:[32.58,0.32],UA:[30.52,50.43],
  AE:[54.37,24.47],GB:[-0.13,51.51],US:[-77.04,38.91],UY:[-56.19,-34.90],UZ:[69.27,41.30],
  VE:[-66.86,10.49],VN:[105.85,21.03],YE:[44.19,15.35],ZM:[28.29,-15.41],ZW:[31.05,-17.83],
  KR:[126.98,37.57],
  AI:[-63.05,18.22],AS:[-170.70,-14.28],AG:[-61.85,17.12],BB:[-59.62,13.10],BM:[-64.78,32.29],
  CV:[-23.51,14.93],KM:[43.26,-11.70],DM:[-61.39,15.30],GD:[-61.75,12.06],
  GY:[-58.16,6.80],KN:[-62.72,17.30],LC:[-61.00,14.00],VC:[-61.22,13.16],
  SC:[55.45,-4.62],SB:[159.95,-9.43],TO:[-175.20,-21.14],TV:[-179.22,-8.53],
  VU:[168.32,-17.73],WS:[-171.77,-13.83],MH:[171.37,7.12],FM:[158.15,6.92],
  NR:[166.92,-0.55],PW:[134.62,7.34],KI:[-157.36,1.87],TL:[125.58,-8.56],
  LS:[27.48,-29.32],SZ:[31.13,-26.32],BN:[114.94,4.94],CY:[33.36,35.17],
  LU:[6.13,49.61],MT:[14.51,35.90],MV:[73.51,4.18],MU:[57.50,-20.16],
}

const GEO_URL = "https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json"

// ISO2 → ISO3 (johan GeoJSON uses ISO3 as geo.id)
const ISO2_TO_ISO3: Record<string,string> = {
  AF:"AFG",AL:"ALB",DZ:"DZA",AO:"AGO",AR:"ARG",AM:"ARM",AU:"AUS",AT:"AUT",AZ:"AZE",
  BS:"BHS",BH:"BHR",BD:"BGD",BY:"BLR",BE:"BEL",BZ:"BLZ",BJ:"BEN",BT:"BTN",
  BO:"BOL",BA:"BIH",BW:"BWA",BR:"BRA",BN:"BRN",BG:"BGR",BF:"BFA",BI:"BDI",
  KH:"KHM",CM:"CMR",CA:"CAN",CF:"CAF",TD:"TCD",CL:"CHL",CN:"CHN",CO:"COL",
  CD:"COD",CG:"COG",CR:"CRI",HR:"HRV",CU:"CUB",CY:"CYP",CZ:"CZE",DK:"DNK",
  DJ:"DJI",DO:"DOM",EC:"ECU",EG:"EGY",SV:"SLV",GQ:"GNQ",ER:"ERI",EE:"EST",
  ET:"ETH",FJ:"FJI",FI:"FIN",FR:"FRA",GA:"GAB",GM:"GMB",GE:"GEO",DE:"DEU",
  GH:"GHA",GR:"GRC",GT:"GTM",GN:"GIN",GW:"GNB",GY:"GUY",HT:"HTI",HN:"HND",
  HU:"HUN",IS:"ISL",IN:"IND",ID:"IDN",IR:"IRN",IQ:"IRQ",IE:"IRL",IL:"ISR",
  IT:"ITA",JM:"JAM",JP:"JPN",JO:"JOR",KZ:"KAZ",KE:"KEN",KW:"KWT",KG:"KGZ",
  LA:"LAO",LV:"LVA",LB:"LBN",LS:"LSO",LR:"LBR",LY:"LBY",LT:"LTU",LU:"LUX",
  MG:"MDG",MW:"MWI",MY:"MYS",MV:"MDV",ML:"MLI",MT:"MLT",MR:"MRT",MU:"MUS",
  MX:"MEX",MD:"MDA",MN:"MNG",ME:"MNE",MA:"MAR",MZ:"MOZ",MM:"MMR",NA:"NAM",
  NP:"NPL",NL:"NLD",NZ:"NZL",NI:"NIC",NE:"NER",NG:"NGA",KP:"PRK",NO:"NOR",
  OM:"OMN",PK:"PAK",PA:"PAN",PG:"PNG",PY:"PRY",PE:"PER",PH:"PHL",PL:"POL",
  PT:"PRT",QA:"QAT",RO:"ROU",RU:"RUS",RW:"RWA",SA:"SAU",SN:"SEN",RS:"SRB",
  SL:"SLE",SG:"SGP",SK:"SVK",SI:"SVN",SO:"SOM",ZA:"ZAF",SS:"SSD",ES:"ESP",
  LK:"LKA",SD:"SDN",SR:"SUR",SE:"SWE",CH:"CHE",SY:"SYR",TW:"TWN",TJ:"TJK",
  TZ:"TZA",TH:"THA",TL:"TLS",TG:"TGO",TT:"TTO",TN:"TUN",TR:"TUR",TM:"TKM",
  UG:"UGA",UA:"UKR",AE:"ARE",GB:"GBR",US:"USA",UY:"URY",UZ:"UZB",
  VE:"VEN",VN:"VNM",YE:"YEM",ZM:"ZMB",ZW:"ZWE",KR:"KOR",
}

// Map dimensions & projection constants
const W = 680, H = 320
const SCALE = 140
const TX = W / 2  // 340
const TY = H / 2  // 160

// Latitude → pixel Y (Mercator)
function latToY(lat: number, scale = SCALE) {
  const phi = (lat * Math.PI) / 180
  const centerPhi = (30 * Math.PI) / 180
  return TY - scale * (Math.log(Math.tan(Math.PI / 4 + phi / 2)) - Math.log(Math.tan(Math.PI / 4 + centerPhi / 2)))
}

export function GlobalIllustration({ country }: { country: CountryData }) {
  const ctryUtc = country.utcOffset
  const usUtc   = -5
  const ctryCoords = (CAPITAL_COORDS_MAP[country.isoCode2] || [20, 41]) as [number, number]
  const usCoords: [number, number] = [-77.04, 38.91]

  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const fmtTZ = (tz: string) => now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: tz })
  const getHourTZ = (tz: string) => parseInt(now.toLocaleString("en-US", { hour: "numeric", hour12: false, timeZone: tz }))

  const usTime = fmtTZ("America/New_York")
  const usH    = getHourTZ("America/New_York")

  // now.getTime() is already UTC — just shift by country's UTC offset
  const ctryDate = new Date(now.getTime() + ctryUtc * 3600000)
  const ctryTime = ctryDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "UTC" })
  const ctH      = ctryDate.getUTCHours()

  // Calculate actual US Eastern offset (accounts for DST)
  const utcH = now.getUTCHours()
  const actualUsOffset = ((usH - utcH + 36) % 24) - 12
  const diffH = Math.abs(ctryUtc - actualUsOffset)

  const isBizUS   = usH >= 9 && usH < 17
  const isBizCtry = ctH >= 9 && ctH < 17
  const statusCol = (biz: boolean, h: number) => biz ? "#22c55e" : (h >= 7 && h < 22) ? "#f59e0b" : "#64748b"
  const statusLbl = (biz: boolean, h: number) => biz ? "Business hours" : (h >= 7 && h < 22) ? "Outside office" : "Sleeping"

  const countryIso2 = country.isoCode2
  const countryIso3 = country.isoCode3

  return (
    <div className="relative w-full select-none rounded-2xl overflow-hidden border border-[#0086F9]/20"
      style={{ background: "#040d1a" }}>

      {/* Leaflet map */}
      <LeafletMap
        ctryCoords={ctryCoords}
        usCoords={usCoords}
        countryIso3={countryIso3}
      />

      {/* Bottom time strip */}
      <div className="grid grid-cols-3 border-t border-[#0086F9]/15" style={{ background: "#071428" }}>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0086F9] shrink-0" style={{ boxShadow: "0 0 6px #0086F9" }}/>
          <div>
            <p className="text-[10px] font-mono text-[#0086F9] font-bold">United States</p>
            <p className="text-base font-bold text-white font-mono">{usTime}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusCol(isBizUS, usH) }}/>
              <span className="text-[9px] font-mono" style={{ color: statusCol(isBizUS, usH) }}>{statusLbl(isBizUS, usH)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-x border-[#0086F9]/10 py-3">
          <p className="text-2xl font-black text-white">{diffH}h</p>
          <p className="text-[8px] font-mono text-white/25 uppercase tracking-widest">difference</p>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 justify-end text-right">
          <div>
            <p className="text-[10px] font-mono text-[#22D3EE] font-bold">{country.name}</p>
            <p className="text-base font-bold text-white font-mono">{ctryTime}</p>
            <div className="flex items-center gap-1 mt-0.5 justify-end">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusCol(isBizCtry, ctH) }}/>
              <span className="text-[9px] font-mono" style={{ color: statusCol(isBizCtry, ctH) }}>{statusLbl(isBizCtry, ctH)}</span>
            </div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] shrink-0" style={{ boxShadow: "0 0 6px #22D3EE" }}/>
        </div>
      </div>
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
              <Link href="/country-code/" className="hover:text-white/60 transition">country-code</Link>
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
              <Link href="/contact/"
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

          <div className="relative px-6 sm:px-12 py-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4">
              Ready to call {country.name}?
            </h2>
            <p className="text-white/50 text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
              Get a local {country.name} number or make international calls to {formatDialCode(country.dialCode)} numbers — active in under ten minutes.
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
