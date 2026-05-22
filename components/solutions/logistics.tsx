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
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">See pricing</Link>
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

        {/* Testimonials — shipment manifest cards, all equal */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9]/60 mb-3">// field.reports</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">From operations on the ground.</h2>
            <p className="mt-4 text-white/50">Logistics teams running leaner with Rozper.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                routeId: 'OPS-7821', origin: 'Dispatch', dest: 'Customer', status: 'SMS −55%', statusCls: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
                initials: 'AM', name: 'Aaron Müller', role: 'Operations Manager · SwiftRoute Logistics',
                avatarBg: 'linear-gradient(135deg,#046BD2,#2575FC)',
                quote: 'Automated SMS updates meant customers stopped calling to check their delivery. Our dispatch team finally has headroom to focus on exceptions, not status updates.',
              },
              {
                routeId: 'OPS-4412', origin: 'AI Inbound', dest: '24/7', status: 'Zero missed', statusCls: 'text-[#2D98F1] bg-[#046BD2]/15 border-[#046BD2]/25',
                initials: 'PS', name: 'Priya Sood', role: 'Fleet Coordinator · FastFreight UK',
                avatarBg: 'linear-gradient(135deg,#046BD2,#0086F9)',
                quote: 'Missed delivery calls at 10 pm used to fall into a void. Now the AI Receptionist handles every inbound enquiry round the clock — no extra staff, no voicemail black hole.',
              },
              {
                routeId: 'OPS-9034', origin: 'One Number', dest: 'Right Depot', status: 'Instant route', statusCls: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                initials: 'CV', name: 'Carlos Vega', role: 'Head of Dispatch · Meridian Freight',
                avatarBg: 'linear-gradient(135deg,#0086F9,#2575FC)',
                quote: 'Multi-site routing meant we could finally give customers one number that always reaches the right depot. No more "let me transfer you" — calls land where they belong instantly.',
              },
            ].map((t, i) => (
              <motion.div
                key={t.initials}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex flex-col rounded-2xl border border-white/10 bg-[#111B2D] hover:border-[#046BD2]/40 transition overflow-hidden"
              >
                {/* Manifest header */}
                <div className="px-4 py-2.5 border-b border-white/[0.07] bg-[#0B1220]/60">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#0086F9]" />
                      <span className="font-mono text-[10px] text-white/30">{t.routeId}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${t.statusCls}`}>{t.status}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px] text-white/50">
                    <span>{t.origin}</span>
                    <span className="text-[#046BD2]">→</span>
                    <span>{t.dest}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <blockquote className="text-[14px] text-white/78 leading-relaxed flex-1 mb-5">{t.quote}</blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.07]">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0" style={{ background: t.avatarBg }}>{t.initials}</div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-[11px] text-white/40 mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
                Get logistics demo <ArrowRight className="w-4 h-4" />
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
