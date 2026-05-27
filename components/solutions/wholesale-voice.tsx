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
  Gauge,
  Activity,
  Receipt,
  Globe2,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Plug,
  Search,
  BarChart3,
  Wallet,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

// ──────────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────────
const ROUTES = [
  { code: "GB", name: "United Kingdom", rate: "0.0041", asr: 99 },
  { code: "US", name: "United States", rate: "0.0029", asr: 98 },
  { code: "DE", name: "Germany", rate: "0.0052", asr: 97 },
  { code: "IN", name: "India · Mobile", rate: "0.0118", asr: 96 },
  { code: "BR", name: "Brazil", rate: "0.0089", asr: 95 },
  { code: "AE", name: "United Arab Emirates", rate: "0.0214", asr: 98 },
]

const CAPABILITIES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: PhoneOutgoing,
    title: "A-Z voice termination",
    desc: "Route outbound traffic to every destination on earth through direct carrier interconnects — no aggregator margin.",
  },
  {
    icon: Waypoints,
    title: "CLI & non-CLI routes",
    desc: "Pick premium CLI, standard, or cost-optimised routes per destination and per customer, swappable on the fly.",
  },
  {
    icon: PhoneIncoming,
    title: "Origination & DID ranges",
    desc: "Inbound numbers and origination across 90+ countries, provisioned in minutes with full porting support.",
  },
  {
    icon: Gauge,
    title: "Least-cost routing",
    desc: "Automatic LCR with quality floors, instant failover, and per-route margin rules you stay in control of.",
  },
  {
    icon: Activity,
    title: "Live quality monitoring",
    desc: "ASR, ACD, and PDD tracked per route in real time, with automatic re-route the moment a path degrades.",
  },
  {
    icon: Receipt,
    title: "Per-second CDR billing",
    desc: "Real-time call detail records, true per-second billing, and rate-deck APIs that plug into your mediation.",
  },
]

const QUALITY = [
  { label: "Average ASR", value: 99.2, display: "99.2%" },
  { label: "Average ACD", value: 86, display: "6m 14s" },
  { label: "Average PDD", value: 92, display: "< 1.4s" },
  { label: "Fraud blocked", value: 100, display: "real-time" },
]

const FLOW: { icon: LucideIcon; step: string; title: string; desc: string }[] = [
  {
    icon: Plug,
    step: "01",
    title: "Interconnect",
    desc: "Point your SBC at our termination gateways over TLS — peering live in under a day.",
  },
  {
    icon: Waypoints,
    step: "02",
    title: "Route",
    desc: "LCR selects the best path per call against your quality floors and margin rules.",
  },
  {
    icon: Activity,
    step: "03",
    title: "Monitor",
    desc: "Every call is scored for ASR, ACD, and PDD — degraded routes are pulled automatically.",
  },
  {
    icon: Wallet,
    step: "04",
    title: "Bill",
    desc: "Per-second CDRs stream to your dashboard, API, and webhooks in real time.",
  },
]

const STATS = [
  { v: "2.4B+", k: "Minutes terminated / month" },
  { v: "1,400+", k: "Active A-Z routes" },
  { v: "150+", k: "Countries & territories" },
  { v: "< 1.4s", k: "Average post-dial delay" },
]

const TESTIMONIALS = [
  {
    initials: "AO",
    quote:
      "Moving A-Z termination to Rozper lifted our ASR by six points and the margin tooling paid for itself in the first month.",
    name: "Adaeze Okafor",
    role: "Head of Carrier Relations · Lumen Routes",
  },
  {
    initials: "DV",
    quote:
      "The per-second CDR feed dropped straight into our mediation system. Reconciliation went from days to minutes.",
    name: "Diego Vargas",
    role: "Billing Lead · Andes Telecom",
  },
  {
    initials: "PN",
    quote:
      "Quality floors plus auto re-route means we stopped babysitting routes. Bad paths get pulled before customers ever notice.",
    name: "Priya Nair",
    role: "VOC Manager · Meridian Voice",
  },
]

const FAQS = [
  {
    q: "What's the difference between wholesale voice and wholesale VoIP?",
    a: "Wholesale voice is the business of buying and selling call minutes — termination and origination — at carrier rates. Wholesale VoIP is the SIP infrastructure that delivers those minutes. Many customers use both; this page is about the minutes and routes.",
  },
  {
    q: "How fast can we get a rate deck?",
    a: "Tell our wholesale team your top destinations and monthly volume and you'll have a tailored A-Z rate deck — CLI and non-CLI — within one business day.",
  },
  {
    q: "Do you offer both CLI and non-CLI routes?",
    a: "Yes. You can mix premium CLI, standard, and cost-optimised routes per destination and per customer, and switch route classes without re-provisioning.",
  },
  {
    q: "How is voice quality guaranteed?",
    a: "Every call is scored for ASR, ACD, and PDD in real time. You set quality floors per route; when a path drops below them, traffic re-routes automatically and you're alerted.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "Wholesale pricing scales with volume, but there's no long lock-in. Start on a trial corridor, prove the quality, and grow from there.",
  },
]

// ──────────────────────────────────────────────────────────────────────
// Hero visual — live route board
// ──────────────────────────────────────────────────────────────────────
function RouteBoard() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % ROUTES.length),
      1900,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#046BD2]/15 to-[#0B1220] p-6">
      {/* scan shimmer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 h-24"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(34,211,238,0.07), transparent)",
        }}
        animate={{ y: ["-20%", "420%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-[#0086F9]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#2D98F1]">
            Live Routes · A-Z
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-xs text-emerald-400">
            Rates live
          </span>
        </div>
      </div>

      {/* column header */}
      <div className="relative grid grid-cols-[1fr_auto_72px] gap-3 border-b border-white/10 pb-2 font-mono text-[9px] uppercase tracking-widest text-white/35">
        <span>Destination</span>
        <span className="text-right">Rate / min</span>
        <span className="text-right">ASR</span>
      </div>

      {/* route rows */}
      <div className="relative">
        {ROUTES.map((r, i) => {
          const on = i === active
          return (
            <div
              key={r.code}
              className={`relative grid grid-cols-[1fr_auto_72px] items-center gap-3 border-b border-white/[0.05] py-2.5 transition-colors duration-300 ${
                on ? "bg-white/[0.04]" : ""
              }`}
            >
              {on && (
                <span className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#22D3EE] to-[#046BD2]" />
              )}
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] font-mono text-[9px] font-bold text-[#2D98F1]">
                  {r.code}
                </span>
                <span className="truncate text-sm text-white/85">
                  {r.name}
                </span>
              </div>
              <span className="text-right font-mono text-sm tabular-nums text-white">
                ${r.rate}
              </span>
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
                <span className="font-mono text-[11px] tabular-nums text-white/60">
                  {r.asr}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="relative mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-white/35">
            Live traffic
          </div>
          <div className="font-display text-xl font-bold text-white">
            128,400{" "}
            <span className="text-sm font-normal text-white/40">
              concurrent calls
            </span>
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
            <span className="text-[#0086F9]">wholesale-voice</span>
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
              <PhoneOutgoing className="h-3.5 w-3.5 text-[#0086F9]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#2D98F1]">
                Wholesale Voice
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
            >
              Move millions of minutes
              <br />
              <span className="bg-gradient-to-r from-[#2D98F1] to-[#0086F9] bg-clip-text text-transparent">
                on routes built to convert
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
            >
              Direct A-Z voice termination and origination at true carrier
              rates. Premium CLI routes, real-time quality scoring, and
              transparent per-second billing — wholesale voice, done right.
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
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">See pricing</Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          >
            <RouteBoard />
          </motion.div>
        </section>

        {/* Capabilities */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="mb-16 text-center">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">
              // capabilities
            </div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Everything your traffic needs.
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

        {/* Quality panel */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="rounded-[2rem] border border-[#046BD2]/20 bg-gradient-to-br from-[#046BD2]/10 to-[#2575FC]/5 p-10 md:p-14">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">
                  // route.quality
                </div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  Quality you can audit, route by route.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/55">
                Every metric below is measured per call, per route — and
                exposed to you live, not buried in a monthly report.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {QUALITY.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {m.label}
                  </div>
                  <div className="mt-2 font-display text-3xl font-bold text-white">
                    {m.display}
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#22D3EE]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.08 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How traffic flows */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="mb-16 text-center">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">
              // the.flow
            </div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              How your traffic flows.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {FLOW.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#046BD2] to-[#22D3EE]">
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-display text-3xl font-bold text-white/10">
                    {s.step}
                  </span>
                </div>
                <h3 className="mb-1.5 font-display text-lg font-semibold">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
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
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="mb-16 text-center">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">
              // carrier.stories
            </div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Carriers route smarter with Rozper.
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
                className="flex flex-col rounded-3xl border border-[#046BD2]/20 bg-white/[0.03] p-7 transition-colors hover:border-[#046BD2]/45"
              >
                <TrendingUp className="mb-5 h-6 w-6 text-[#0086F9]" />
                <blockquote className="flex-1 text-sm leading-relaxed text-white/70">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#046BD2]/40 bg-[#046BD2]/20 font-display text-xs font-bold text-[#2D98F1]">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="mt-0.5 text-[11px] text-white/45">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <Search className="mx-auto mb-6 h-12 w-12 text-white" />
            <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              Start routing minutes with Rozper.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
              Share your top destinations and monthly volume — we&apos;ll send
              back a tailored A-Z rate deck within a business day.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-[#046BD2] transition hover:scale-105"
              >
                Request a rate deck
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
