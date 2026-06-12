"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import {
  Network,
  Cable,
  Server,
  Code2,
  Workflow,
  ShieldCheck,
  Globe2,
  Cpu,
  ArrowRight,
  ChevronRight,
  Cloud,
  Activity,
  Zap,
  DollarSign,
  HeadphonesIcon,
  Settings2,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Bell,
  Radio,
  Building2,
  Wifi,
  Layers,
  Users,
} from "lucide-react"

// ──────────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────────

const WHO_WE_WORK_WITH = [
  { icon: Building2, label: "Wholesale carriers" },
  { icon: Wifi,      label: "VoIP service providers" },
  { icon: Layers,    label: "Telecom aggregators" },
  { icon: Globe2,    label: "Enterprise UCaaS platforms" },
  { icon: Radio,     label: "Mobile Network Operators" },
]

const OPERATOR_PRIORITIES = [
  { text: "Stable CLI protects reputation" },
  { text: "Consistent ASR protects margins" },
  { text: "Clean routing protects long-term growth" },
]

const WHAT_SETS_APART = [
  {
    icon: Globe2,
    tag: "01",
    title: "Global A-Z Coverage",
    desc: "Our wholesale voice network connects directly across key international destinations, delivering reliable A-Z VoIP termination with scalable capacity for high-volume traffic.",
  },
  {
    icon: Activity,
    tag: "02",
    title: "Performance-Optimized Routing",
    desc: "Intelligent route management ensures stable ASR, improved ACD, and low PDD — creating consistent international call completion without quality fluctuations.",
  },
  {
    icon: Cable,
    tag: "03",
    title: "Direct Carrier Interconnections",
    desc: "We maintain controlled routing paths through direct carrier relationships, reducing unnecessary hops and improving overall voice stability.",
  },
  {
    icon: Cpu,
    tag: "04",
    title: "Real-Time Network Monitoring",
    desc: "Continuous traffic analysis and live route testing allow us to proactively optimize voice wholesale performance before issues impact your network.",
  },
  {
    icon: ShieldCheck,
    tag: "05",
    title: "Advanced Fraud Protection",
    desc: "Built-in traffic monitoring and anomaly detection safeguard your voice routes with 24/7 protection against fraud and route manipulation.",
  },
  {
    icon: Server,
    tag: "06",
    title: "Scalable Infrastructure",
    desc: "Designed to handle both growing and high-volume VoIP wholesale traffic with redundancy, secure SIP connectivity, and global resilience.",
  },
]

const ADDITIONAL_FEATURES = [
  {
    icon: HeadphonesIcon,
    title: "24/7 Dedicated Support",
    desc: "Our support team is always available to assist with troubleshooting, scaling, or optimizing your VoIP services for a smooth experience.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    desc: "Clear and competitive pricing for wholesale VoIP services, with no hidden fees — making it easier to manage your costs and maximize value.",
  },
  {
    icon: Zap,
    title: "Easy Integration",
    desc: "Our voice services integrate with your existing systems, providing hassle-free setup and minimal downtime for carriers and VoIP providers of all sizes.",
  },
  {
    icon: Settings2,
    title: "Customizable Solutions",
    desc: "Tailored VoIP wholesale solutions to meet your specific business requirements, ensuring optimal performance and reliability at every scale.",
  },
]

const WHY_ROZPER = [
  {
    icon: ShieldCheck,
    title: "Reliability When You Need It Most",
    desc: "With direct carrier interconnections, optimized routes, and global coverage, we ensure your wholesale voice services are always stable and of top quality.",
    points: ["Direct Tier-1 carrier interconnects", "Automated failover & redundancy", "99.99% uptime SLA — backed by contract"],
  },
  {
    icon: TrendingUp,
    title: "Future-Proof Your Business",
    desc: "Rozper's scalable infrastructure grows with your business, giving you the flexibility to adapt to evolving needs and stay competitive in the wholesale VoIP provider market.",
    points: ["Elastic capacity — no channel caps", "White-label ready from day one", "API-driven provisioning at any scale"],
  },
]

const FRAUD_POINTS = [
  { icon: Activity, text: "Round-the-clock fraud detection to secure routes." },
  { icon: AlertTriangle, text: "Anomaly detection to prevent fraud attacks." },
  { icon: Bell, text: "Real-time alerts for immediate action." },
  { icon: Lock, text: "Secure SIP connections for reliable service." },
]

const STATS = [
  { v: "200+", k: "Countries covered" },
  { v: "99.99%", k: "Platform uptime SLA" },
  { v: "24/7", k: "NOC monitoring" },
  { v: "< 60s", k: "Trunk provisioning" },
]

const TESTIMONIALS = [
  {
    initials: "RK",
    quote: "Switching wholesale termination to Rozper cut our per-minute costs significantly. The direct carrier interconnects removed the aggregator margin we had been paying for years.",
    name: "Rajiv Kumar",
    role: "CTO · NexaTel Communications",
  },
  {
    initials: "ML",
    quote: "We needed a wholesale VoIP provider that could guarantee uptime for our reseller base. Rozper's redundant infrastructure and automatic failover have been flawless over 18 months.",
    name: "Maria Lopes",
    role: "VP Infrastructure · CloudVoice Brazil",
  },
  {
    initials: "JW",
    quote: "The programmable LCR rules alone saved us weeks of manual routing work. We tripled our outbound volume after migrating and the fraud detection blocked bad traffic immediately.",
    name: "James Walsh",
    role: "Head of Network · BrightLine Telecom",
  },
]

const FAQS = [
  {
    q: "What truly makes Rozper different?",
    a: "It's our commitment to partnership. We pair our carrier-grade network with a dedicated team that is genuinely invested in your success and available to you 24/7 — real engineers, not phone trees.",
  },
  {
    q: "Is your network secure for business-critical communications?",
    a: "Security and reliability are core to our platform. We use TLS + SRTP encryption, STIR/SHAKEN attestation, AI-driven fraud detection, and multiple layers of redundancy to protect your communications and data.",
  },
  {
    q: "How complicated is it to switch our services to Rozper?",
    a: "Our onboarding team makes it a smooth process. We guide you every step of the way — from SIP peering to number porting — to ensure a seamless transition with minimal downtime.",
  },
  {
    q: "How does your pricing work? Are there fixed plans?",
    a: "We provide custom quotes because every business has unique needs. This ensures you only pay for the capacity and features you actually use. Contact us for a transparent, no-obligation quote tailored to your requirements.",
  },
  {
    q: "Can we use our existing SIP phones or hardware with your service?",
    a: "Yes, absolutely. Our platform is compatible with all major SIP-based IP phones and PBX systems. Our technical team is here to ensure a smooth integration with your current equipment.",
  },
]

// ──────────────────────────────────────────────────────────────────────
// SIP Topology visual (kept from previous version)
// ──────────────────────────────────────────────────────────────────────
const TOPOLOGY_NODES = [
  { icon: Server, label: "Your SBC", sub: "BYOC / BYO-SBC" },
  { icon: Cloud,  label: "Rozper SIP edge", sub: "anycast · 8 PoPs" },
  { icon: Network, label: "200+ carriers", sub: "Tier-1 interconnects" },
]

function Connector() {
  return (
    <div className="relative mx-1 h-px flex-1 bg-gradient-to-r from-[#046BD2]/50 via-[#0086F9]/50 to-[#046BD2]/50">
      {[0, 1].map((dir) => (
        <motion.span
          key={dir}
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"
          initial={{ left: dir === 0 ? "0%" : "100%" }}
          animate={{ left: dir === 0 ? "100%" : "0%" }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: dir * 0.9 }}
        />
      ))}
    </div>
  )
}

function SipTopology() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#046BD2]/15 to-[#0B1220] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cable className="h-4 w-4 text-[#0086F9]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#2D98F1]">
            SIP Trunk · Topology
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-mono text-xs text-emerald-400">Trunk registered</span>
        </div>
      </div>

      <div className="flex items-stretch">
        {TOPOLOGY_NODES.map((n, i) => {
          const mid = i === 1
          return (
            <div key={n.label} className="flex flex-1 items-center">
              <div
                className={`flex w-full flex-col items-center rounded-2xl border p-3 text-center ${
                  mid
                    ? "border-[#22D3EE]/40 bg-gradient-to-br from-[#046BD2]/40 to-[#0086F9]/20 shadow-[0_0_30px_-8px_rgba(34,211,238,0.6)]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <span
                  className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${
                    mid ? "bg-gradient-to-br from-[#22D3EE] to-[#046BD2]" : "bg-white/[0.06]"
                  }`}
                >
                  <n.icon className="h-4 w-4 text-white" />
                </span>
                <span className="font-display text-[11px] font-semibold leading-tight text-white">
                  {n.label}
                </span>
                <span className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-white/40">
                  {n.sub}
                </span>
              </div>
              {i < TOPOLOGY_NODES.length - 1 && <Connector />}
            </div>
          )
        })}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { k: "Channels", v: "Elastic" },
          { k: "Codecs", v: "Opus · G.711" },
          { k: "Security", v: "TLS + SRTP" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="font-mono text-[9px] uppercase tracking-widest text-white/35">{s.k}</div>
            <div className="mt-1 font-display text-sm font-bold text-[#2D98F1]">{s.v}</div>
          </div>
        ))}
      </div>

      {/* route quality strip */}
      <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/35">Route health</span>
          <span className="font-mono text-[10px] text-emerald-400">All routes nominal</span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className={`h-5 flex-1 rounded-sm ${
                i === 5 ? "bg-amber-400/60" : "bg-emerald-400/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────
export function WholesaleVoipPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white overflow-x-clip">
      <Navbar />

      {/* ambient glow */}
      <div className="pointer-events-none absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-[#046BD2]/8 blur-[160px]" />

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 pt-20 sm:pt-28 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-xs text-white/40">
            <Link href="/" className="hover:text-[#2D98F1]">/</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#0086F9]">wholesale-voip</span>
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
              <Network className="h-3.5 w-3.5 text-[#0086F9]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#2D98F1]">
                Wholesale VoIP
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-2xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-6xl xl:text-7xl"
            >
              High-Performance
              <br />
              <span className="bg-gradient-to-r from-[#2D98F1] via-[#0086F9] to-[#22D3EE] bg-clip-text text-transparent">
                Wholesale VoIP Routes
              </span>
              <br />
              & Global Voice Termination
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-3 sm:mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
            >
              Wholesale voice solutions and international VoIP termination services powered by direct A-Z routes, secure interconnections, and performance-optimized global voice termination.
            </motion.p>

            {/* trust chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.25 } }}
              className="mt-3 sm:mt-6 flex flex-wrap gap-2"
            >
              {["Direct A-Z Routes", "Secure SIP Interconnects", "200+ Countries", "24/7 NOC"].map((chip) => (
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
            <SipTopology />
          </motion.div>
        </section>

        {/* ── Who We Work With ──────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="rounded-[2rem] border border-[#046BD2]/20 bg-gradient-to-br from-[#046BD2]/8 to-transparent p-8 sm:p-12 md:p-14">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">
              // who.we.serve
            </div>
            <h2 className="mb-3 font-display text-3xl font-bold sm:text-4xl">
              Designed for Carriers, VoIP Providers & Telecom Operators
            </h2>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
              Our wholesale VoIP platform is built from the ground up for operators who move serious traffic and can't afford a single dropped route.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mb-10">
              {WHO_WE_WORK_WITH.map((w, i) => (
                <motion.div
                  key={w.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 hover:border-[#046BD2]/30 transition"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#046BD2]/20 border border-[#046BD2]/25">
                    <w.icon className="h-4 w-4 text-[#0086F9]" />
                  </div>
                  <span className="text-sm font-medium text-white/80">{w.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-white/[0.07] pt-8">
              <p className="mb-5 text-sm font-semibold text-white/60 uppercase tracking-widest font-mono text-[11px]">
                Built for Telecom Operators Who Prioritize Quality
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {OPERATOR_PRIORITIES.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-white/80">{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── What Sets Our Wholesale VoIP Apart ────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="mb-14 text-center">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">// differentiators</div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              What Sets Our Wholesale VoIP Apart
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WHAT_SETS_APART.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative rounded-2xl border border-white/[0.07] bg-[#111B2D] p-6 transition hover:border-[#046BD2]/30"
              >
                <span className="absolute right-5 top-4 font-mono text-3xl font-bold text-white/[0.05] select-none">
                  {f.tag}
                </span>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#046BD2]/25 bg-[#046BD2]/15 group-hover:bg-[#046BD2]/25 transition">
                  <f.icon className="h-5 w-5 text-[#0086F9]" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Additional Features ───────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">// platform.extras</div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Everything You Need, Nothing You Don&apos;t
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ADDITIONAL_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl border border-[#046BD2]/20 bg-gradient-to-br from-[#046BD2]/[0.07] to-transparent p-6 transition hover:border-[#046BD2]/40"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#046BD2]/25 bg-[#046BD2]/15 group-hover:bg-[#046BD2]/25 transition">
                  <f.icon className="h-5 w-5 text-[#0086F9]" />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Why Rozper Wholesale VoIP ─────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="mb-14 text-center">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">// why.rozper</div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Why Rozper Wholesale VoIP?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {WHY_ROZPER.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative overflow-hidden rounded-2xl border border-[#046BD2]/20 bg-gradient-to-br from-[#046BD2]/[0.08] to-[#0B1220] p-8"
              >
                <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#046BD2]/10 blur-3xl" />
                <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#046BD2] to-[#22D3EE] shadow-[0_8px_24px_-8px_rgba(34,211,238,0.45)]">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="relative mb-3 font-display text-xl font-bold sm:text-2xl">{item.title}</h3>
                <p className="relative mb-6 text-sm leading-relaxed text-white/55 sm:text-base">{item.desc}</p>
                <ul className="relative space-y-2.5">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm text-white/70">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Fraud Prevention ──────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#046BD2]/20 bg-[#0D1627] p-8 sm:p-12 md:p-14 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-12 lg:items-center">
            {/* background glow */}
            <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[#046BD2]/10 blur-[100px]" />

            <div className="relative mb-8 lg:mb-0">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.08] px-3 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-red-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">Security</span>
              </div>
              <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
                Dedicated Fraud Prevention and Security
              </h2>
              <p className="text-sm leading-relaxed text-white/55 sm:text-base max-w-lg">
                With Rozper, your wholesale VoIP services come with built-in fraud prevention. Our advanced monitoring and anomaly detection systems safeguard your routes from fraud and route manipulation, ensuring security at every step.
              </p>
            </div>

            <div className="relative grid gap-4 sm:grid-cols-2">
              {FRAUD_POINTS.map((p, i) => (
                <motion.div
                  key={p.text}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#046BD2]/20 border border-[#046BD2]/25 mt-0.5">
                    <p.icon className="h-4 w-4 text-[#0086F9]" />
                  </div>
                  <span className="text-sm text-white/70 leading-relaxed">{p.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-[#046BD2]/20 bg-white/[0.03] p-7 text-center"
              >
                <div className="bg-gradient-to-br from-[#2D98F1] to-[#22D3EE] bg-clip-text font-display text-4xl font-bold text-transparent">
                  {s.v}
                </div>
                <div className="mt-2 text-sm text-white/55">{s.k}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="mb-14 text-center">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">// carrier.stories</div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Trusted by carriers globally
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
                <p className="mt-4 text-sm leading-relaxed text-white/60">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9] px-8 py-14 text-center sm:px-12 sm:py-20">
            {/* dot grid */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-[0.08]"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <Network className="relative mx-auto mb-6 h-12 w-12 text-white" />
            <h2 className="relative font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Stop Testing Routes.<br />Start Scaling Traffic.
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
              End the guesswork. Get stable, high-performance wholesale VoIP termination backed by direct carrier relationships and optimized routing intelligence.
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
