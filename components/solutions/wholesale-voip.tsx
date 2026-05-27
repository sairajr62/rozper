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
  Hash,
  Boxes,
  ShieldCheck,
  Globe2,
  Cpu,
  Workflow,
  Terminal,
  ArrowRight,
  ChevronRight,
  Cloud,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

// ──────────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────────
const CAPABILITIES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Cable,
    title: "Elastic SIP trunking",
    desc: "Burstable trunks that scale with demand — no channel caps, no provisioning queues, no surprise blocks at peak.",
  },
  {
    icon: Server,
    title: "BYOC & BYO-SBC",
    desc: "Bring your own carrier or SBC and peer directly with our SIP edge over TLS, in any region you operate.",
  },
  {
    icon: Code2,
    title: "Programmable routing API",
    desc: "Dial plans, LCR, failover, and time-of-day rules — every routing decision driven by REST and webhooks.",
  },
  {
    icon: Hash,
    title: "Number provisioning API",
    desc: "Search, buy, and port DIDs across 90+ countries programmatically — procurement becomes a single API call.",
  },
  {
    icon: Boxes,
    title: "White-label partner portals",
    desc: "Resell the whole platform under your brand: custom rate decks, margin controls, and partner logins included.",
  },
  {
    icon: ShieldCheck,
    title: "Carrier-grade security",
    desc: "TLS + SRTP encryption, STIR/SHAKEN attestation, fraud scoring, and IP access control on every trunk.",
  },
]

const ARCHITECTURE = [
  {
    icon: Globe2,
    title: "Anycast SIP edge, 8 regions",
    desc: "Calls register at the nearest PoP — not a single chokepoint half a world away.",
  },
  {
    icon: Cpu,
    title: "N+1 redundancy, sub-second failover",
    desc: "A PoP can drop mid-traffic and live calls stay up. No re-registration storms.",
  },
  {
    icon: Workflow,
    title: "One control plane",
    desc: "Every trunk, number, and route managed from a single API, dashboard, and webhook stream.",
  },
]

const STATS = [
  { v: "8", k: "Anycast PoP regions" },
  { v: "< 60s", k: "Trunk provisioning time" },
  { v: "99.99%", k: "Platform uptime SLA" },
  { v: "Elastic", k: "Channel capacity model" },
]

const TESTIMONIALS = [
  {
    initials: "HB",
    quote:
      "We white-labelled the entire portal in a weekend — our resellers genuinely think it's our own platform.",
    name: "Helena Brandt",
    role: "VP Product · Northwind Carriers",
  },
  {
    initials: "ST",
    quote:
      "Elastic trunks meant we stopped pre-provisioning for peak. Our busiest sales day just worked, with zero blocks.",
    name: "Sho Tanaka",
    role: "Infrastructure Lead · Kaze Telecom",
  },
  {
    initials: "RC",
    quote:
      "The number provisioning API turned a two-week procurement cycle into a script. Onboarding a customer is instant now.",
    name: "Rafael Costa",
    role: "Platform Engineer · Vível Communications",
  },
]

const FAQS = [
  {
    q: "What is wholesale VoIP and SIP trunking?",
    a: "Wholesale VoIP is the carrier-grade IP platform — SIP trunks, programmable routing, number APIs, and white-label tooling — that lets carriers, resellers, and enterprises run voice over IP at scale and resell it as their own.",
  },
  {
    q: "How is wholesale VoIP different from wholesale voice?",
    a: "Wholesale VoIP is the SIP infrastructure and platform; wholesale voice is the call minutes — termination and origination — carried over it. This page is about the platform. Most customers run both together.",
  },
  {
    q: "Can we white-label the whole platform?",
    a: "Yes. The partner portal, rate decks, margin configuration, and customer logins can all run under your brand and domain. Your resellers never see Rozper.",
  },
  {
    q: "Do you support BYOC and BYO-SBC?",
    a: "Absolutely. Point your own SBC or carrier at our SIP edge over TLS. We support SRTP, and G.711, G.729, and Opus codecs out of the box.",
  },
  {
    q: "How do the APIs and webhooks work?",
    a: "Everything — trunks, numbers, routing rules, CDRs — is exposed over a REST API with webhook events. Provision a trunk, buy a number, or change a route in a single call; subscribe to events for real-time state.",
  },
]

const TOPOLOGY_NODES: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Server, label: "Your SBC", sub: "BYOC / BYO-SBC" },
  { icon: Cloud, label: "Rozper SIP edge", sub: "anycast · 8 PoPs" },
  { icon: Network, label: "200+ carriers", sub: "Tier-1 interconnects" },
]

// ──────────────────────────────────────────────────────────────────────
// Hero visual — SIP trunk topology
// ──────────────────────────────────────────────────────────────────────
function Connector() {
  return (
    <div className="relative mx-1 h-px flex-1 bg-gradient-to-r from-[#046BD2]/50 via-[#0086F9]/50 to-[#046BD2]/50">
      {[0, 1].map((dir) => (
        <motion.span
          key={dir}
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"
          initial={{ left: dir === 0 ? "0%" : "100%" }}
          animate={{ left: dir === 0 ? "100%" : "0%" }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear",
            delay: dir * 0.9,
          }}
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
          <span className="font-mono text-xs text-emerald-400">
            Trunk registered
          </span>
        </div>
      </div>

      {/* pipeline */}
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
                    mid
                      ? "bg-gradient-to-br from-[#22D3EE] to-[#046BD2]"
                      : "bg-white/[0.06]"
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

      {/* status grid */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { k: "Channels", v: "Elastic" },
          { k: "Codecs", v: "Opus · G.711" },
          { k: "Security", v: "TLS + SRTP" },
        ].map((s) => (
          <div
            key={s.k}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
          >
            <div className="font-mono text-[9px] uppercase tracking-widest text-white/35">
              {s.k}
            </div>
            <div className="mt-1 font-display text-sm font-bold text-[#2D98F1]">
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Developer code panel
// ──────────────────────────────────────────────────────────────────────
function ApiPanel() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#070B14]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[11px] text-white/40">
          POST /v1/sip-trunks
        </span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed">
        <code>
          <span className="text-white/40">{"// provision an elastic trunk\n"}</span>
          <span className="text-white/80">{"{\n"}</span>
          <span className="text-[#2D98F1]">{'  "name"'}</span>
          <span className="text-white/50">{": "}</span>
          <span className="text-[#22D3EE]">{'"edge-eu-1"'}</span>
          <span className="text-white/50">{",\n"}</span>
          <span className="text-[#2D98F1]">{'  "transport"'}</span>
          <span className="text-white/50">{": "}</span>
          <span className="text-[#22D3EE]">{'"tls"'}</span>
          <span className="text-white/50">{",\n"}</span>
          <span className="text-[#2D98F1]">{'  "codecs"'}</span>
          <span className="text-white/50">{": ["}</span>
          <span className="text-[#22D3EE]">{'"opus"'}</span>
          <span className="text-white/50">{", "}</span>
          <span className="text-[#22D3EE]">{'"g711"'}</span>
          <span className="text-white/50">{"],\n"}</span>
          <span className="text-[#2D98F1]">{'  "routing"'}</span>
          <span className="text-white/50">{": "}</span>
          <span className="text-[#22D3EE]">{'"lcr"'}</span>
          <span className="text-white/50">{",\n"}</span>
          <span className="text-[#2D98F1]">{'  "channels"'}</span>
          <span className="text-white/50">{": "}</span>
          <span className="text-[#22D3EE]">{'"elastic"'}</span>
          <span className="text-white/80">{"\n}"}</span>
        </code>
      </pre>
      <div className="flex items-center gap-2 border-t border-white/[0.06] bg-emerald-500/[0.06] px-5 py-3">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="font-mono text-[11px] text-emerald-300">
          201 · trunk.created · ready in 42s
        </span>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────
export function WholesaleVoipPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <Navbar />

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-xs text-white/40">
            <Link href="/" className="hover:text-[#2D98F1]">
              /
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#0086F9]">wholesale-voip</span>
          </div>
        </div>

        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#046BD2]/30 bg-[#046BD2]/10 px-4 py-2"
            >
              <Network className="h-3.5 w-3.5 text-[#0086F9]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#2D98F1]">
                Wholesale VoIP
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
            >
              SIP infrastructure,
              <br />
              <span className="bg-gradient-to-r from-[#2D98F1] to-[#0086F9] bg-clip-text text-transparent">
                ready to white-label
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
            >
              Elastic SIP trunking, programmable routing, and number
              provisioning APIs — the carrier-grade VoIP platform you can run
              your business on and resell as your own.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#046BD2] px-7 py-4 font-semibold text-white transition hover:bg-[#0086F9]"
              >
                Talk to wholesale team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/docs/api"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Read the API docs
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">See pricing</Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          >
            <SipTopology />
          </motion.div>
        </section>

        {/* Capabilities */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="mb-16 text-center">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">
              // platform
            </div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              A VoIP platform you can build on.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl border border-[#046BD2]/20 bg-gradient-to-br from-[#046BD2]/[0.06] to-transparent p-6 transition hover:border-[#046BD2]/40"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#046BD2]/30 bg-[#046BD2]/20">
                  <f.icon className="h-5 w-5 text-[#0086F9]" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="rounded-[2rem] border border-[#046BD2]/20 bg-gradient-to-br from-[#046BD2]/10 to-[#2575FC]/5 p-10 md:p-14">
            <div className="mb-10 flex items-center gap-3">
              <Server className="h-8 w-8 text-[#0086F9]" />
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Infrastructure built for builders.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {ARCHITECTURE.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#046BD2] to-[#22D3EE]">
                    <a.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mb-1.5 font-display text-base font-semibold">
                    {a.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/55">
                    {a.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Developer */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">
              // for.developers
            </div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Provision a trunk in one API call.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/60">
              Trunks, numbers, routing rules, and CDRs are all exposed over a
              clean REST API with webhook events. No tickets, no portals to
              click through — just code.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {[
                { icon: Terminal, label: "REST + webhooks" },
                { icon: Code2, label: "SDKs & examples" },
                { icon: Workflow, label: "Sandbox environment" },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-2">
                  <d.icon className="h-4 w-4 text-[#0086F9]" />
                  <span className="text-sm text-white/70">{d.label}</span>
                </div>
              ))}
            </div>
            <Link
              href="/docs/api"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-[#2D98F1] hover:text-[#22D3EE]"
            >
              Browse the API reference
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ApiPanel />
          </motion.div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.k}
                className="rounded-3xl border border-[#046BD2]/20 bg-white/[0.03] p-7 text-center"
              >
                <div className="bg-gradient-to-br from-[#2D98F1] to-[#2575FC] bg-clip-text font-display text-4xl font-bold text-transparent">
                  {s.v}
                </div>
                <div className="mt-2 text-sm text-white/55">{s.k}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9]/60 mb-3">// carrier.stories</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Trusted by carriers globally.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                initials: 'RK', color: 'blue',
                metric: '40%', metricLabel: 'lower cost per minute',
                quote: 'Switching wholesale termination to Rozper cut our per-minute costs significantly. The direct carrier interconnects removed the aggregator margin we had been paying for years.',
                name: 'Rajiv Kumar', role: 'CTO · NexaTel Communications',
                delay: 0,
              },
              {
                initials: 'ML', color: 'cyan',
                metric: '99.99%', metricLabel: 'uptime achieved',
                quote: 'We needed a wholesale provider that could guarantee uptime for our reseller base. Rozper\'s redundant PoPs and automatic failover have been flawless over 18 months.',
                name: 'Maria Lopes', role: 'VP Infrastructure · CloudVoice Brazil',
                delay: 0.2,
              },
              {
                initials: 'JW', color: 'emerald',
                metric: '3×', metricLabel: 'volume scale in 6 months',
                quote: 'We tripled our outbound call volume after migrating. The programmable LCR rules alone saved us weeks of manual routing work and the fraud detection blocked bad traffic immediately.',
                name: 'James Walsh', role: 'Head of Network · BrightLine Telecom',
                delay: 0.4,
              },
            ].map((t) => {
              const accent = {
                blue:    { metric: 'text-[#2D98F1]', label: 'text-[#2D98F1]/70', avatar: 'bg-[#046BD2]/20 border-[#046BD2]/40 text-[#2D98F1]', card: 'border-[#046BD2]/25 hover:border-[#046BD2]/50' },
                cyan:    { metric: 'text-cyan-300',    label: 'text-cyan-400/70',   avatar: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',    card: 'border-cyan-500/20  hover:border-cyan-500/40' },
                emerald: { metric: 'text-emerald-300', label: 'text-emerald-400/70', avatar: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300', card: 'border-emerald-500/20 hover:border-emerald-500/40' },
              }[t.color]!

              return (
                <motion.div
                  key={t.initials}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: t.delay, duration: 0.5 }}
                  className={`flex flex-col rounded-3xl bg-white/[0.03] border ${accent.card} transition-colors p-7`}
                >
                  <div className="text-center mb-6">
                    <div className={`font-display text-6xl font-bold leading-none ${accent.metric}`}>{t.metric}</div>
                    <div className={`text-xs font-mono mt-2 ${accent.label}`}>{t.metricLabel}</div>
                  </div>

                  <div className="flex gap-1 justify-center mb-5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3.5 h-3.5 fill-current ${accent.metric}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>

                  <blockquote className="text-sm text-white/70 leading-relaxed text-center flex-1 mb-6">
                    "{t.quote}"
                  </blockquote>

                  <div className="flex items-center gap-3 pt-5 border-t border-white/[0.07] justify-center">
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center font-display font-bold text-xs shrink-0 ${accent.avatar}`}>{t.initials}</div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-[11px] text-white/45 mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
          <h2 className="mb-8 font-display text-4xl font-bold">FAQ</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.05]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-display font-semibold">
                  <span>{f.q}</span>
                  <ChevronRight className="h-5 w-5 text-[#0086F9] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 leading-relaxed text-white/60">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#046BD2] via-[#046BD2] to-[#0078E0] p-12 text-center md:p-20">
            <Cable className="mx-auto mb-6 h-12 w-12 text-white" />
            <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              Build your VoIP platform on Rozper.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
              Talk to our wholesale team for SIP trunk peering, white-label
              setup, and volume pricing — or jump straight into the API.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-[#046BD2] transition hover:scale-105"
              >
                Talk to wholesale team
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/15 border border-white/30 text-white font-semibold hover:bg-white/25 transition">See pricing</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
