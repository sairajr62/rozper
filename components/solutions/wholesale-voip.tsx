'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Phone, Globe, Shield, Zap, BarChart3, Settings, ArrowRight,
  ChevronRight, Network, Server, Wifi, Lock,
} from 'lucide-react'

const features = [
  { icon: Globe, title: 'Global carrier network', desc: 'Reach 200+ countries with direct carrier interconnects and lowest-latency routes.' },
  { icon: Zap, title: 'High-volume call termination', desc: 'Handle millions of minutes per month with 99.999% uptime SLA and auto-failover.' },
  { icon: Shield, title: 'Fraud protection & STIR/SHAKEN', desc: 'Built-in call authentication, fraud scoring, and real-time anomaly detection on every call.' },
  { icon: BarChart3, title: 'Real-time CDR & analytics', desc: 'Per-minute billing, live traffic dashboards, and detailed call detail records via API.' },
  { icon: Network, title: 'SIP trunking & peering', desc: 'Direct IP peering with Tier-1 carriers. Bring your own SBC or use ours.' },
  { icon: Settings, title: 'Programmable routing', desc: 'LCR, time-of-day routing, failover rules, and custom dial plans via REST API.' },
]

const highlights = [
  'Carrier-grade infrastructure with N+1 redundancy across 6 PoPs worldwide',
  'Dedicated interconnects with major telcos — no aggregator middlemen',
  'White-label ready: resell under your brand with full control over margins',
]

const stats = [
  { v: '200+', k: 'Countries & territories' },
  { v: '99.999%', k: 'Platform uptime SLA' },
  { v: '<18ms', k: 'Average call setup time' },
]

const faqs = [
  { q: 'What is wholesale VOIP termination?', a: 'Wholesale VOIP termination lets carriers, resellers, and large enterprises route high volumes of calls over our infrastructure at bulk per-minute rates — far cheaper than retail.' },
  { q: 'Do you support SIP trunking and BYOC?', a: 'Yes. Bring your own SBC or SIP trunk and point it at our termination gateways. We support TLS + SRTP, G.711, G.729, and Opus codecs.' },
  { q: 'How is billing handled?', a: 'Per-second billing with real-time CDR export. You get an API endpoint, webhook events, and a live dashboard — or integrate with your own mediation system.' },
  { q: 'Can we white-label and resell?', a: 'Yes. Our wholesale program includes white-label portals, custom rate decks, and a reseller margin configuration panel.' },
]

function NetworkVisual() {
  const nodes = [
    { x: 50, y: 10, label: 'Your SBC', primary: true },
    { x: 15, y: 50, label: 'US-EAST' },
    { x: 85, y: 50, label: 'EU-WEST' },
    { x: 30, y: 85, label: 'APAC' },
    { x: 70, y: 85, label: 'LATAM' },
  ]

  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#046BD2]/15 to-[#0B1220] p-8 overflow-hidden min-h-[340px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Global · PoP Network</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400">All systems nominal</span>
        </div>
      </div>

      {/* SVG network diagram */}
      <svg viewBox="0 0 100 100" className="w-full h-48" preserveAspectRatio="xMidYMid meet">
        {/* Lines from center to edge nodes */}
        {nodes.slice(1).map((n, i) => (
          <motion.line
            key={i}
            x1={nodes[0].x} y1={nodes[0].y}
            x2={n.x} y2={n.y}
            stroke="#046BD2"
            strokeWidth="0.5"
            strokeOpacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.2 }}
          />
        ))}
        {/* Animated packets */}
        {nodes.slice(1).map((n, i) => (
          <motion.circle
            key={`pkt-${i}`}
            r="1.2"
            fill="#2D98F1"
            initial={{ cx: nodes[0].x, cy: nodes[0].y, opacity: 0 }}
            animate={{ cx: [nodes[0].x, n.x, nodes[0].x], cy: [nodes[0].y, n.y, nodes[0].y], opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.primary ? 5 : 3.5} fill={n.primary ? '#046BD2' : '#0B1220'} stroke={n.primary ? '#2D98F1' : '#046BD2'} strokeWidth="1" />
            <text x={n.x} y={n.y + (n.primary ? -7 : 6.5)} textAnchor="middle" fontSize="3.5" fill="#94a3b8" className="font-mono">{n.label}</text>
          </g>
        ))}
      </svg>

      {/* Status grid */}
      <div className="mt-2 grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">Active calls</div>
          <div className="font-display text-2xl font-bold text-emerald-300">84k</div>
        </div>
        <div className="p-3 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20">
          <div className="text-[9px] font-mono uppercase tracking-widest text-[#0086F9]">ASR</div>
          <div className="font-display text-2xl font-bold text-[#2D98F1]">98.2%</div>
        </div>
        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <div className="text-[9px] font-mono uppercase tracking-widest text-cyan-400">ACD</div>
          <div className="font-display text-2xl font-bold text-cyan-300">4m12s</div>
        </div>
      </div>
    </div>
  )
}

export function WholesaleVoipPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#2D98F1]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">wholesale-voip</span>
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Phone className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Wholesale VOIP</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Carrier-grade voice<br />
              <span className="bg-gradient-to-r from-[#2D98F1] to-[#0086F9] bg-clip-text text-transparent">at scale</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Terminate and originate millions of minutes monthly on a global Tier-1 network. Built for carriers, resellers, and enterprises that need quality, volume, and control.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] text-white font-semibold hover:bg-[#0086F9] transition">
                Talk to wholesale team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 border border-white/15 text-white font-semibold hover:bg-white/10 transition">
                View rate deck
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
            <NetworkVisual />
          </motion.div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9]/60 mb-3">// capabilities</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Everything a carrier needs.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#046BD2]/[0.06] to-transparent border border-[#046BD2]/20 hover:border-[#046BD2]/40 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-[#0086F9]" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Infrastructure highlights */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-3xl bg-gradient-to-br from-[#046BD2]/10 to-[#2575FC]/5 border border-[#046BD2]/20 p-12 md:p-16">
            <div className="flex items-center gap-3 mb-8">
              <Server className="w-8 h-8 text-[#0086F9]" />
              <h2 className="font-display text-3xl md:text-4xl font-bold">Infrastructure built for carriers.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {highlights.map((d, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="font-display text-3xl font-bold text-[#0086F9]/60 mb-2">·{i + 1}</div>
                  <p className="text-sm text-white/70 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-[#046BD2]/20 text-center">
                <div className="font-display text-5xl font-bold bg-gradient-to-br from-[#2D98F1] to-[#2575FC] bg-clip-text text-transparent">{s.v}</div>
                <div className="text-sm text-white/60 mt-2">{s.k}</div>
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
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:bg-white/[0.05] transition">
                <summary className="flex items-center justify-between cursor-pointer list-none font-display font-semibold">
                  <span>{f.q}</span>
                  <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform text-[#0086F9]" />
                </summary>
                <p className="mt-4 text-white/60">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="relative rounded-[2rem] overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#046BD2] to-[#0078E0]">
            <Lock className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-white">Scale your voice traffic with confidence.</h2>
            <p className="mt-4 text-white/75 text-lg max-w-xl mx-auto">Talk to our wholesale team for custom rate decks, dedicated interconnects, and volume pricing.</p>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
              Contact wholesale team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
