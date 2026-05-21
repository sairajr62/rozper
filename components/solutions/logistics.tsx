'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Smartphone, MessageSquare, Bot, Building, Settings, ArrowRight,
  ChevronRight, Truck, Package, MapPin, Navigation,
} from 'lucide-react'

const features = [
  { icon: Smartphone, title: 'Mobile-first calling', desc: 'Drivers call dispatch from the app — no personal numbers exposed.' },
  { icon: MessageSquare, title: 'Automated SMS updates', desc: 'Delivery ETA, delays, and confirmation — triggered by your system.' },
  { icon: Bot, title: 'AI Receptionist 24/7', desc: 'Handles inbound delivery enquiries — no after-hours staffing needed.' },
  { icon: Building, title: 'Multi-site routing', desc: 'Calls go to the right depot, region, or dispatch team.' },
  { icon: Settings, title: 'API integration', desc: 'Trigger calls and SMS from shipment events in your platform.' },
]

const dark = [
  'Real-time call activity dashboard — driver call volume and response rate',
  'Call recording on all customer interactions for dispute resolution',
  'Escalation routing: missed delivery disputes go straight to the right team',
]

const route = [
  { x: 8, label: 'Depot · NYC', state: 'sent' },
  { x: 32, label: 'Hub · NJ', state: 'in-transit' },
  { x: 56, label: 'Sort · PA', state: 'in-transit' },
  { x: 78, label: 'Local · CT', state: 'pending' },
  { x: 95, label: 'Customer', state: 'pending' },
]

const stats = [
  { v: '55%', k: 'Reduction in delivery enquiry calls' },
  { v: '24/7', k: 'AI-handled enquiries' },
  { v: '∞', k: 'Depot locations' },
]

const faqs = [
  { q: 'Can drivers use Rozper without a smartphone?', a: 'Rozper works on Android and iOS. Also supports SIP-enabled desk phones.' },
  { q: 'Can Rozper trigger SMS from dispatch software?', a: 'Yes. SMS API triggers delivery updates from your logistics platform automatically.' },
  { q: 'Does it work across multiple depots?', a: 'Yes. Multi-site routing, separate queues, region-based rules across unlimited locations.' },
]

function RouteVisual() {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#046BD2]/15 to-[#0B1220] p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Route · TRK-7821</span>
        </div>
        <div className="text-xs font-mono text-[#2D98F1]">ETA 14:32</div>
      </div>

      {/* Route line */}
      <div className="relative h-32">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#046BD2] via-[#046BD2] to-[#046BD2]/30" />
        <div className="absolute top-1/2 left-0 h-0.5 bg-[#2D98F1]" style={{ width: '56%' }} />

        {/* Animated truck */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          animate={{ left: ['0%', '56%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 -m-2 rounded-full bg-[#0086F9]/30 blur-md animate-pulse" />
            <div className="relative w-10 h-10 rounded-full bg-[#046BD2] flex items-center justify-center shadow-lg shadow-[#046BD2]/50">
              <Truck className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </motion.div>

        {/* Stops */}
        {route.map((r, i) => (
          <div key={i} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${r.x}%` }}>
            <div className={`w-3 h-3 rounded-full border-2 ${
              r.state === 'sent' ? 'bg-[#046BD2] border-[#2D98F1]' :
              r.state === 'in-transit' ? 'bg-[#046BD2]/50 border-[#0086F9]' :
              'bg-[#0B1220] border-white/20'
            }`} />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono text-white/60">{r.label}</div>
          </div>
        ))}
      </div>

      {/* Status grid */}
      <div className="mt-12 grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">In transit</div>
          <div className="font-display text-2xl font-bold text-emerald-300">142</div>
        </div>
        <div className="p-3 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20">
          <div className="text-[9px] font-mono uppercase tracking-widest text-[#0086F9]">SMS sent</div>
          <div className="font-display text-2xl font-bold text-[#2D98F1]">2.4k</div>
        </div>
        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <div className="text-[9px] font-mono uppercase tracking-widest text-cyan-400">AI handled</div>
          <div className="font-display text-2xl font-bold text-cyan-300">73%</div>
        </div>
      </div>
    </div>
  )
}

export function LogisticsPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#2D98F1]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/solutions" className="hover:text-[#2D98F1]">solutions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">logistics</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Truck className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Solutions · Logistics</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Dispatch and comms<br />
              <span className="bg-gradient-to-r from-[#2D98F1] to-[#0086F9] bg-clip-text text-transparent">that move</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Driver calls, customer updates, and dispatch coordination — all on one platform. A delayed shipment call that goes unanswered is a customer lost.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] text-[#0B1220] font-semibold hover:bg-[#0086F9] transition">
                Get logistics demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
            <RouteVisual />
          </motion.div>
        </section>

        {/* Features as pickup waypoints */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9]/60 mb-3">// waypoints</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Built for logistics operations.</h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-0.5 bg-gradient-to-b from-[#046BD2]/0 via-[#046BD2]/40 to-[#046BD2]/0 -translate-x-1/2" />

            <div className="space-y-8">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`grid lg:grid-cols-2 gap-6 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  <div className={`p-6 rounded-2xl bg-gradient-to-br from-[#046BD2]/[0.06] to-transparent border border-[#046BD2]/20 ${i % 2 === 1 ? 'lg:ml-12' : 'lg:mr-12'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center">
                        <f.icon className="w-5 h-5 text-[#0086F9]" />
                      </div>
                      <div className="font-mono text-xs text-[#0086F9]/60">STOP {String(i + 1).padStart(2, '0')}</div>
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Visibility */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-3xl bg-gradient-to-br from-[#046BD2]/10 to-[#2575FC]/5 border border-[#046BD2]/20 p-12 md:p-16">
            <div className="flex items-center gap-3 mb-8">
              <Package className="w-8 h-8 text-[#0086F9]" />
              <h2 className="font-display text-3xl md:text-4xl font-bold">Visibility across the operation.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {dark.map((d, i) => (
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

        {/* Testimonials — route-stop design */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9]/60 mb-3">// field.reports</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">From operations on the ground.</h2>
            <p className="mt-4 text-white/50">Logistics teams running leaner with Rozper.</p>
          </div>

          <div className="relative">
            {/* Route line connecting the waypoint dots */}
            <div className="hidden md:block absolute top-[1.35rem] left-[calc(16.67%+12px)] right-[calc(16.67%+12px)] h-px bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#046BD2] opacity-50" />
            {/* Animated progress on line */}
            <motion.div
              className="hidden md:block absolute top-[1.35rem] h-px bg-gradient-to-r from-[#2D98F1] to-[#0086F9]"
              style={{ left: 'calc(16.67% + 12px)' }}
              initial={{ width: 0 }}
              whileInView={{ width: 'calc(66.66% - 24px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.3 }}
            />

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  stop: '01', initials: 'AM', color: 'blue',
                  metric: '55%', metricLabel: 'fewer enquiry calls',
                  quote: 'Automated SMS updates meant customers stopped calling to check their delivery. Our dispatch team finally has headroom to focus on exceptions, not status updates.',
                  name: 'Aaron Müller', role: 'Operations Manager · SwiftRoute Logistics',
                  delay: 0,
                },
                {
                  stop: '02', initials: 'PS', color: 'cyan',
                  metric: '24/7', metricLabel: 'AI-handled after-hours',
                  quote: 'Missed delivery calls at 10 pm used to fall into a void. Now the AI Receptionist handles every inbound enquiry round the clock — no extra staff, no voicemail black hole.',
                  name: 'Priya Sood', role: 'Fleet Coordinator · FastFreight UK',
                  delay: 0.2,
                },
                {
                  stop: '03', initials: 'CV', color: 'emerald',
                  metric: '12', metricLabel: 'depots on one platform',
                  quote: 'Multi-site routing meant we could finally give customers one number that always reaches the right depot. No more "let me transfer you" — calls land where they belong instantly.',
                  name: 'Carlos Vega', role: 'Head of Dispatch · Meridian Freight',
                  delay: 0.4,
                },
              ].map((t) => {
                const accent = {
                  blue:    { dot: 'bg-[#046BD2] border-[#2D98F1] shadow-[#046BD2]/60', glow: 'bg-[#0086F9]/30', metric: 'text-[#2D98F1]', label: 'text-[#2D98F1]/70', avatar: 'bg-[#046BD2]/20 border-[#046BD2]/40 text-[#2D98F1]', card: 'border-[#046BD2]/25 hover:border-[#046BD2]/50' },
                  cyan:    { dot: 'bg-[#22D3EE] border-[#22D3EE]/70 shadow-[#22D3EE]/60', glow: 'bg-[#22D3EE]/20', metric: 'text-[#22D3EE]', label: 'text-[#22D3EE]/70', avatar: 'bg-[#22D3EE]/15 border-[#22D3EE]/30 text-[#22D3EE]', card: 'border-[#22D3EE]/20 hover:border-[#22D3EE]/40' },
                  emerald: { dot: 'bg-[#2575FC] border-[#2575FC]/70 shadow-[#2575FC]/60', glow: 'bg-[#2575FC]/20', metric: 'text-[#2575FC]', label: 'text-[#2575FC]/70', avatar: 'bg-[#2575FC]/15 border-[#2575FC]/30 text-[#2575FC]', card: 'border-[#2575FC]/20 hover:border-[#2575FC]/40' },
                }[t.color]!

                return (
                  <motion.div
                    key={t.stop}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: t.delay, duration: 0.5 }}
                    className={`flex flex-col items-center rounded-3xl bg-white/[0.03] border ${accent.card} transition-colors p-7`}
                  >
                    {/* Waypoint dot */}
                    <div className="relative mb-5 shrink-0">
                      <div className={`absolute inset-0 rounded-full ${accent.glow} blur-md scale-150`} />
                      <div className={`relative w-7 h-7 rounded-full border-2 ${accent.dot} shadow-lg flex items-center justify-center`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
                      </div>
                    </div>

                    {/* Stop label */}
                    <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mb-6">STOP {t.stop}</div>

                    {/* Big metric */}
                    <div className="text-center mb-6">
                      <div className={`font-display text-6xl font-bold leading-none ${accent.metric}`}>{t.metric}</div>
                      <div className={`text-xs font-mono mt-2 ${accent.label}`}>{t.metricLabel}</div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 fill-current ${accent.metric}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-sm text-white/70 leading-relaxed text-center flex-1 mb-6">
                      "{t.quote}"
                    </blockquote>

                    {/* Attribution */}
                    <div className="flex items-center gap-3 pt-5 border-t border-white/[0.07] w-full justify-center">
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
            <Truck className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-white">Get every shipment connected.</h2>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
              Get logistics demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
