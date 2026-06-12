"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import {
  PhoneOutgoing,
  PhoneIncoming,
  Waypoints,
  Globe2,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  BarChart3,
  ShieldCheck,
  Zap,
  HeadphonesIcon,
  DollarSign,
  LayoutGrid,
  CheckCircle2,
  Activity,
  BrainCircuit,
} from "lucide-react"

// ──────────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────────
const ROUTES = [
  { code: "GB", name: "United Kingdom", rate: "0.0041", asr: 99 },
  { code: "US", name: "United States",  rate: "0.0029", asr: 98 },
  { code: "DE", name: "Germany",        rate: "0.0052", asr: 97 },
  { code: "IN", name: "India · Mobile", rate: "0.0118", asr: 96 },
  { code: "BR", name: "Brazil",         rate: "0.0089", asr: 95 },
  { code: "AE", name: "UAE",            rate: "0.0214", asr: 98 },
]

const WHY_CHOOSE = [
  {
    icon: ShieldCheck,
    title: "Carrier-Grade Quality",
    desc: "Crystal-clear audio and reliable connections backed by our premium QoS network and 99.99% uptime SLA.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    desc: "Cut operational costs with competitive rates and volume discounts — no hidden fees, no aggregator markup.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    desc: "Reliable call termination to 200+ countries through our direct carrier interconnect network.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Expert Support",
    desc: "Instant access to engineers and account managers — real humans, not bots, around the clock.",
  },
]

const SOLUTIONS = [
  {
    icon: PhoneOutgoing,
    tag: "01",
    title: "A-Z VoIP Termination",
    desc: "Take advantage of our reliable A-Z VoIP termination for seamless global call delivery.",
    benefits: [
      { label: "Global Reach", sub: "200+ Countries" },
      { label: "High Quality Routes", sub: "Premium Tier-1" },
      { label: "Affordable Rates", sub: "Market Leading" },
      { label: "Real-time Analytics", sub: "<50ms Latency" },
    ],
  },
  {
    icon: Waypoints,
    tag: "02",
    title: "SIP Trunking",
    desc: "Connect your IP-PBX with flexible, scalable wholesale SIP Trunking — keep your existing hardware.",
    benefits: [
      { label: "Seamless Scalability", sub: "Grow on demand" },
      { label: "Cost Savings",         sub: "vs. legacy PSTN" },
      { label: "Easy Integration",     sub: "All major PBX" },
      { label: "Advanced Features",    sub: "CLI, recording, LCR" },
    ],
  },
  {
    icon: PhoneIncoming,
    tag: "03",
    title: "DID & Toll-Free Numbers",
    desc: "Instantly establish a local presence with our extensive range of DID and toll-free numbers in 150+ countries.",
    benefits: [
      { label: "Local Presence",       sub: "150+ countries" },
      { label: "Instant Activation",   sub: "Minutes, not days" },
      { label: "Number Porting",       sub: "Minimal disruption" },
      { label: "Geographic Coverage",  sub: "City-level DIDs" },
    ],
  },
  {
    icon: LayoutGrid,
    tag: "04",
    title: "UCaaS & CPaaS Integration",
    desc: "Embed our dependable voice infrastructure into your UCaaS or CPaaS platform via API.",
    benefits: [
      { label: "API Integration",       sub: "REST & SIP" },
      { label: "White-label Ready",     sub: "Your brand" },
      { label: "Custom Development",    sub: "Dedicated team" },
      { label: "Full Support",          sub: "24/7 NOC" },
    ],
  },
]

const PERF_STATS = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "200+",   label: "Countries" },
  { value: "10M+",   label: "Calls / Day" },
  { value: "50ms",   label: "Response Time" },
]

const NETWORK_METRICS = [
  { label: "Packet Loss",     value: "0.01%",  pct: 99 },
  { label: "Jitter",          value: "2ms",     pct: 96 },
  { label: "Average ASR",     value: "99.2%",   pct: 99 },
  { label: "Post-Dial Delay", value: "< 1.4s",  pct: 90 },
]

const TECH_FEATURES = [
  {
    icon: BrainCircuit,
    title: "Smart Routing",
    desc: "Advanced algorithms evaluate network conditions, costs, and quality metrics in real time — every call takes the most efficient path automatically.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Intuitive dashboards with instant insights into call quality, volume, costs, and performance across all destinations — live, not in a monthly PDF.",
  },
  {
    icon: Activity,
    title: "Fraud Detection",
    desc: "AI-driven monitoring watches traffic patterns, flags anomalies, and automatically blocks suspicious activity before it reaches your network.",
  },
]

const TESTIMONIALS = [
  {
    initials: "AO",
    quote: "Moving A-Z termination to Rozper lifted our ASR by six points and the margin tooling paid for itself in the first month.",
    name: "Adaeze Okafor",
    role: "Head of Carrier Relations · Lumen Routes",
  },
  {
    initials: "GB",
    quote: "Rozper's wholesale voice network gives us exceptional call quality and the peace of mind we need to serve our own customers flawlessly.",
    name: "Gunnar Björnsson",
    role: "Director of Network Operations · Apex Communications",
  },
  {
    initials: "DV",
    quote: "The per-second CDR feed dropped straight into our mediation system. Reconciliation went from days to minutes.",
    name: "Diego Vargas",
    role: "Billing Lead · Andes Telecom",
  },
]

const FAQS = [
  {
    q: "What's the difference between wholesale and retail VoIP?",
    a: "Wholesale VoIP offers bulk rates for carriers and large-scale users, while retail VoIP caters to individual customers with a focus on user-friendly services. Wholesale buyers get carrier-grade pricing and direct interconnects — retail buyers get a polished end-user experience.",
  },
  {
    q: "What is A-Z Termination?",
    a: "A-Z Termination is the process of completing international calls from any origin (A) to any target destination (Z), ensuring global connectivity. Rozper maintains direct carrier interconnects across 200+ countries for end-to-end delivery.",
  },
  {
    q: "Can I connect my current PBX system to your service?",
    a: "Yes — our SIP Trunking connects directly to your existing IP-PBX over a standard SIP/TLS link. No hardware replacement needed. Most interconnects are live within a business day.",
  },
  {
    q: "How do you maintain high call quality?",
    a: "Every call is scored for ASR, ACD, and PDD in real time. You set quality floors per route — when a path drops below them, traffic re-routes automatically and you get an instant alert. Our NOC monitors 24/7.",
  },
  {
    q: "Is your service scalable for a growing business?",
    a: "Our infrastructure scales automatically with your traffic — no capacity pre-ordering, no re-provisioning. Start on a trial corridor, prove the quality, and grow from there. Volume pricing improves as you scale.",
  },
]

// ──────────────────────────────────────────────────────────────────────
// Route board visual
// ──────────────────────────────────────────────────────────────────────
function RouteBoard() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % ROUTES.length), 1900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#046BD2]/15 to-[#0B1220] p-6">
      {/* scan shimmer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 h-24"
        style={{ background: "linear-gradient(180deg, transparent, rgba(34,211,238,0.07), transparent)" }}
        animate={{ y: ["-20%", "420%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-[#0086F9]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#2D98F1]">Live Routes · A-Z</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-xs text-emerald-400">Rates live</span>
        </div>
      </div>

      <div className="relative grid grid-cols-[1fr_auto_72px] gap-3 border-b border-white/10 pb-2 font-mono text-[9px] uppercase tracking-widest text-white/35">
        <span>Destination</span>
        <span className="text-right">Rate / min</span>
        <span className="text-right">ASR</span>
      </div>

      <div className="relative">
        {ROUTES.map((r, i) => {
          const on = i === active
          return (
            <div
              key={r.code}
              className={`relative grid grid-cols-[1fr_auto_72px] items-center gap-3 border-b border-white/[0.05] py-2.5 transition-colors duration-300 ${on ? "bg-white/[0.04]" : ""}`}
            >
              {on && <span className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#22D3EE] to-[#046BD2]" />}
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] font-mono text-[9px] font-bold text-[#2D98F1]">
                  {r.code}
                </span>
                <span className="truncate text-sm text-white/85">{r.name}</span>
              </div>
              <span className="text-right font-mono text-sm tabular-nums text-white">${r.rate}</span>
              <div className="flex items-center justify-end gap-1.5">
                <span className="h-1 w-8 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-[#046BD2] to-[#22D3EE]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${r.asr}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.08 }}
                  />
                </span>
                <span className="font-mono text-[11px] tabular-nums text-white/60">{r.asr}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="relative mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-white/35">Live traffic</div>
          <div className="font-display text-xl font-bold text-white">
            128,400 <span className="text-sm font-normal text-white/40">concurrent calls</span>
          </div>
        </div>
        <Globe2 className="h-7 w-7 text-[#0086F9]/70" />
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────
export function WholesaleVoicePageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white overflow-x-clip">
      <Navbar />

      {/* ambient glow */}
      <div className="pointer-events-none absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[#046BD2]/8 blur-[160px]" />

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 pt-20 sm:pt-28 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-xs text-white/40">
            <Link href="/" className="hover:text-[#2D98F1]">/</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#0086F9]">wholesale-voice</span>
          </div>
        </div>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-6 sm:pb-20 sm:pt-12 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-[#046BD2]/30 bg-[#046BD2]/10 px-4 py-2"
            >
              <PhoneOutgoing className="h-3.5 w-3.5 text-[#0086F9]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#2D98F1]">
                Wholesale Voice
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-6xl xl:text-7xl"
            >
              Leading Global Provider of
              <br />
              <span className="bg-gradient-to-r from-[#2D98F1] via-[#0086F9] to-[#22D3EE] bg-clip-text text-transparent">
                Wholesale Voice Solutions
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-3 sm:mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base sm:text-lg"
            >
              Your trusted wholesale voice carrier for smooth international calls. High-quality voice termination, direct CLI and non-CLI routes, plus competitive global rates for telecom carriers, VoIP providers, and call centers.
            </motion.p>

            {/* trust chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.25 } }}
              className="mt-3 sm:mt-6 flex flex-wrap gap-2"
            >
              {["99.99% Uptime SLA", "200+ Countries", "10M+ Calls/Day", "24/7 NOC Support"].map((chip) => (
                <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              className="mt-4 sm:mt-8 flex gap-3"
            >
              <Link
                href="/free-trial"
                className="group inline-flex items-center gap-2 rounded-full bg-[#046BD2] px-6 py-3.5 font-semibold text-white transition hover:bg-[#0086F9] sm:px-7 sm:py-4"
              >
                Get a Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-medium text-white transition hover:bg-white/5 sm:px-7 sm:py-4"
              >
                See pricing
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="hidden lg:block w-full"
          >
            <RouteBoard />
          </motion.div>
        </section>

        {/* ── Why Industry Leaders Choose Rozper ────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="mb-14 text-center">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">// why.rozper</div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Why Industry Leaders Choose Rozper
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl border border-[#046BD2]/20 bg-gradient-to-br from-[#046BD2]/[0.07] to-transparent p-6 transition hover:border-[#046BD2]/40 hover:from-[#046BD2]/[0.12]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#046BD2]/30 bg-[#046BD2]/20 group-hover:bg-[#046BD2]/30 transition">
                  <f.icon className="h-5 w-5 text-[#0086F9]" />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Key Solutions ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="mb-14 text-center">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">// solutions</div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Discover Our Key Wholesale Voice Solutions
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {SOLUTIONS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative rounded-2xl border border-white/[0.07] bg-[#111B2D] p-7 transition hover:border-[#046BD2]/30"
              >
                {/* accent tag */}
                <span className="absolute right-5 top-5 font-mono text-3xl font-bold text-white/[0.06] select-none">
                  {s.tag}
                </span>

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#046BD2]/25 bg-[#046BD2]/15 group-hover:bg-[#046BD2]/25 transition">
                  <s.icon className="h-5 w-5 text-[#0086F9]" />
                </div>

                <h3 className="mb-2 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-white/55">{s.desc}</p>

                <div className="grid grid-cols-2 gap-2">
                  {s.benefits.map((b) => (
                    <div
                      key={b.label}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span className="text-xs font-semibold text-white/80">{b.label}</span>
                      </div>
                      <div className="text-[11px] font-mono text-[#22D3EE]">{b.sub}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Performance Stats ─────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="rounded-[2rem] border border-[#046BD2]/20 bg-gradient-to-br from-[#046BD2]/10 to-[#0B1220] p-8 sm:p-12 md:p-16">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60 text-center">
              // performance
            </div>
            <h2 className="mb-3 text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Designed for Unmatched Performance
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-white/50 sm:text-base">
              Our infrastructure ensures maximum reliability with built-in redundancy and automated failover protocols, delivering exceptional uptime backed by our SLA.
            </p>

            {/* Primary stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {PERF_STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-[#046BD2]/20 bg-[#0B1220]/60 p-6 text-center"
                >
                  <div className="bg-gradient-to-br from-[#2D98F1] to-[#22D3EE] bg-clip-text font-display text-4xl font-bold text-transparent">
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm text-white/50">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Network metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {NETWORK_METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.2 }}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {m.label}
                  </div>
                  <div className="mt-1.5 font-display text-2xl font-bold text-white">{m.value}</div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#22D3EE]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Technology Features ───────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="mb-14 text-center">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">// technology</div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Complete Control with Advanced Technology
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TECH_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111B2D] p-8 transition hover:border-[#046BD2]/30"
              >
                {/* glow */}
                <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#046BD2]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#046BD2] to-[#22D3EE] shadow-[0_8px_24px_-8px_rgba(34,211,238,0.5)]">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="relative mb-3 font-display text-xl font-semibold">{f.title}</h3>
                <p className="relative text-sm leading-relaxed text-white/55">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="mb-14 text-center">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">// carrier.stories</div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Carriers route smarter with Rozper
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.initials}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex flex-col rounded-3xl border border-[#046BD2]/20 bg-white/[0.03] p-7 transition hover:border-[#046BD2]/40"
              >
                <TrendingUp className="mb-5 h-5 w-5 text-[#0086F9]" />
                <blockquote className="flex-1 text-sm leading-relaxed text-white/70">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#046BD2]/40 bg-[#046BD2]/20 font-display text-xs font-bold text-[#2D98F1]">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="mt-0.5 text-[11px] text-white/45">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h2 className="mb-8 text-center font-display text-3xl font-bold sm:text-4xl">FAQ</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.05]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-display font-semibold">
                  <span>{f.q}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-[#0086F9] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 leading-relaxed text-white/60 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9] px-8 py-14 text-center sm:px-12 sm:py-20">
            {/* dot grid overlay */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-[0.08]"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <Globe2 className="relative mx-auto mb-6 h-12 w-12 text-white" />
            <h2 className="relative font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Start Your Free Trial
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
              Share your top destinations and monthly volume — we&apos;ll send back a tailored A-Z rate deck within a business day. No commitment required.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
              <Link
                href="/free-trial"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-[#046BD2] transition hover:scale-105 sm:px-7 sm:py-4 whitespace-nowrap"
              >
                Get a Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-6 py-3.5 font-semibold text-white transition hover:bg-white/25 sm:px-7 sm:py-4 whitespace-nowrap"
              >
                See pricing
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
