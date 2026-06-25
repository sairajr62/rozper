'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  MessageSquare, Bot, Bell, Database, ThumbsUp, ArrowRight, ChevronRight,
  ShoppingBag, TrendingUp, Zap, Activity,
} from 'lucide-react'

const features = [
  { icon: MessageSquare, title: 'Every channel in one inbox', desc: 'Voice, SMS, WhatsApp, Instagram, Facebook, and web chat — unified.' },
  { icon: Bot, title: 'AI Receptionist for WISMO', desc: 'Handles "Where Is My Order" calls 24/7 — freeing agents for complex issues.' },
  { icon: Bell, title: 'Outbound SMS notifications', desc: 'Order updates, shipping alerts, and restock notifications.' },
  { icon: Database, title: 'CRM integration', desc: 'Shopify, Salesforce Commerce, and major retail platforms.' },
  { icon: ThumbsUp, title: 'AI sentiment analysis', desc: 'Flags unhappy customers before they post a negative review.' },
]

const dark = [
  'Add seats in minutes — no hardware, no procurement lead time',
  '99.99% uptime SLA on your highest traffic day',
  'Real-time queue analytics so managers see demand and staff accordingly',
]

const stats = [
  { v: '3x', k: 'Capacity scaled in 2 days' },
  { v: '99.99%', k: 'Uptime SLA' },
  { v: '0', k: 'Outages on peak days' },
]

const faqs = [
  { q: 'Can Rozper handle seasonal volume spikes?', a: 'Yes. Seats added and removed monthly — scale up for peak, down after.' },
  { q: 'Does it integrate with Shopify?', a: 'Yes. Shopify, Salesforce Commerce Cloud, and major eCommerce platforms via API.' },
  { q: 'Can AI answer WISMO calls automatically?', a: 'Yes. Configure AI Receptionist with order tracking logic for Where Is My Order calls.' },
]

function PeakChart() {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-[#111B2D] p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#0086F9]">Volume · Black Friday</div>
          <div className="font-display text-2xl font-bold mt-1">12,847 <span className="text-xs font-normal text-[#0086F9]">interactions/hr</span></div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0086F9]/10 border border-[#0086F9]/30">
          <TrendingUp className="w-3 h-3 text-[#0086F9]" />
          <span className="text-[10px] font-mono text-[#0086F9]">▲ 1024%</span>
        </div>
      </div>
      <svg viewBox="0 0 400 200" className="w-full h-44">
        <defs>
          <linearGradient id="peak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0086F9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#046BD2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 180 L40 175 L80 170 L120 160 L160 140 L180 100 L200 30 L220 60 L240 90 L280 130 L320 155 L360 165 L400 170 L400 200 L0 200 Z"
          fill="url(#peak)"
        />
        <motion.path
          d="M0 180 L40 175 L80 170 L120 160 L160 140 L180 100 L200 30 L220 60 L240 90 L280 130 L320 155 L360 165 L400 170"
          stroke="#0086F9" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }}
        />
        <line x1="200" y1="30" x2="200" y2="200" stroke="#046BD2" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
        <circle cx="200" cy="30" r="5" fill="#0086F9" />
        <text x="210" y="25" fill="#2D98F1" fontSize="10" fontFamily="monospace">PEAK</text>
      </svg>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[{ k: 'Voice', v: '4.2k' }, { k: 'Chat', v: '3.8k' }, { k: 'WhatsApp', v: '2.1k' }].map(c => (
          <div key={c.k} className="p-2.5 rounded-xl bg-[#046BD2]/5 border border-[#046BD2]/15">
            <div className="text-[9px] font-mono uppercase tracking-widest text-white/40">{c.k}</div>
            <div className="font-display text-base font-bold text-white">{c.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RetailPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/solutions/" className="hover:text-[#0086F9]">solutions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">retail</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <ShoppingBag className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Solutions · Retail & eCommerce</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Contact center built for{' '}
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">retail peaks</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Omnichannel support that scales for Black Friday and handles every return with ease. Your contact center gets 10x the volume on peak days — Rozper scales instantly.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-row flex-wrap gap-3">
              <Link href="/contact/" className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-xs sm:text-base whitespace-nowrap font-semibold transition">
                Prepare for peak <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing/" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full border border-white/15 text-white text-xs sm:text-base whitespace-nowrap font-medium hover:bg-white/5 transition">See pricing</Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <PeakChart />
          </motion.div>
        </section>

        {/* Features as shelves */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Every retail channel in one platform.</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className={`group relative p-7 rounded-3xl border border-white/10 hover:border-[#046BD2]/40 transition overflow-hidden ${i === 0 || i === 3 ? 'lg:col-span-2 bg-gradient-to-br from-[#046BD2]/10 to-[#111B2D]' : 'bg-[#111B2D]'}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#046BD2]/15 border border-[#046BD2]/30 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-[#0086F9]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-1.5">{f.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Scale up */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#046BD2]/15 via-[#0B1220] to-[#0B1220] border border-[#046BD2]/20 p-12 md:p-16">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-8 h-8 text-[#0086F9]" />
              <h2 className="font-display text-3xl md:text-4xl font-bold">Scale up instantly for peak season.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {dark.map((d, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative">
                  <div className="absolute top-4 right-4 font-mono text-[10px] text-[#046BD2]">·{i + 1}</div>
                  <p className="text-sm text-white/70 leading-relaxed pr-8">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 text-center">
                <div className="font-display text-5xl font-bold bg-gradient-to-br from-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">{s.v}</div>
                <div className="text-sm text-white/60 mt-2">{s.k}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-5">
              <Activity className="w-3.5 h-3.5 text-[#2D98F1]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Customer Stories</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Retail teams scaling on Rozper.</h2>
          </div>

          {/* Channel inbox cards — all equal */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                channel: 'Voice',
                channelColor: 'text-[#0086F9] bg-[#046BD2]/15 border-[#046BD2]/30',
                metric: '3×', metricLabel: 'CAPACITY',
                initials: 'AT', name: 'Adriana Torres', role: 'CX Director · Luminary Commerce',
                avatarClass: 'bg-[#046BD2]/15 border-[#046BD2]/40 text-[#2D98F1]',
                quote: 'We tripled our contact center capacity for the holiday season in two days. Rozper handled the surge without a single outage.',
              },
              {
                channel: 'AI + Chat',
                channelColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
                metric: '−68%', metricLabel: 'WISMO CALLS',
                initials: 'JK', name: 'Jamie Kowalski', role: 'Head of Customer Care · Northstone Outdoors',
                avatarClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
                quote: 'The AI Receptionist deflected 68% of "where is my order" calls overnight. Our agents finally have time for returns, refunds, and exchanges.',
              },
              {
                channel: 'Omnichannel',
                channelColor: 'text-amber-400 bg-amber-400/10 border-amber-400/25',
                metric: '12k', metricLabel: 'PEAK / DAY',
                initials: 'MO', name: 'Marisol Ortiz', role: 'eCommerce Ops · Velara Beauty',
                avatarClass: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
                quote: "Cyber Monday traffic broke every prior tool we used. With Rozper's auto-scaling and unified inbox our team handled 12k interactions in a day — CSAT stayed at 4.8.",
              },
            ].map((t, i) => (
              <motion.div
                key={t.initials}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col rounded-3xl bg-[#111B2D] border border-white/10 hover:border-[#046BD2]/30 transition overflow-hidden"
              >
                {/* Channel header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.07] bg-[#0B1220]/60">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-mono border ${t.channelColor}`}>{t.channel}</span>
                  <div className="text-right">
                    <span className="font-display font-bold text-base text-white">{t.metric}</span>
                    <span className="font-mono text-[9px] text-white/40 ml-1 tracking-widest">{t.metricLabel}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-3 h-3 fill-[#0086F9]" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <blockquote className="text-[14px] text-white/80 leading-relaxed flex-1 mb-5">{t.quote}</blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06] mt-auto">
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center font-display font-bold text-xs shrink-0 ${t.avatarClass}`}>{t.initials}</div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-[11px] text-white/45 mt-0.5">{t.role}</div>
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

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="relative rounded-3xl overflow-hidden bg-[#070B14] border border-white/10 p-6 sm:p-6 sm:p-12 md:p-20 text-center">
            {/* Left arc glow */}
            <div className="hidden sm:block absolute -left-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none" aria-hidden>
              <motion.svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "blur(28px)" }} animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
                <circle cx="100" cy="100" r="78" stroke="#22D3EE" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
                <circle cx="100" cy="100" r="54" stroke="#046BD2" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(40 100 100)" />
              </motion.svg>
            </div>
            {/* Right arc glow */}
            <div className="hidden sm:block absolute -right-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none" aria-hidden>
              <motion.svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "blur(28px)" }} animate={{ rotate: -360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
                <circle cx="100" cy="100" r="78" stroke="#0086F9" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
                <circle cx="100" cy="100" r="54" stroke="#22D3EE" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(-40 100 100)" />
              </motion.svg>
            </div>
            {/* Faint background grid */}
            <div className="absolute inset-0 opacity-[0.18] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)" }} />
            <div className="relative">
              <ShoppingBag className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold leading-tight text-white">Built for the busiest day of the year.</h2>
              <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
                <Link href="/contact/" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-xs sm:text-base whitespace-nowrap font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition">
                  Prepare for peak <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing/" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-white text-xs sm:text-base whitespace-nowrap font-semibold transition">See pricing</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
