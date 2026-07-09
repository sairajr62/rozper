'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Activity, AlertTriangle, TrendingUp, BarChart3, Lightbulb, Shield,
  ArrowRight, ChevronRight, Smile,
} from 'lucide-react'

const features = [
  { icon: Activity, title: 'Real-Time Sentiment Scoring', desc: 'Every call scored live — positive, neutral, frustrated, escalation risk.' },
  { icon: AlertTriangle, title: 'Escalation Alerts', desc: 'Supervisors alerted the moment sentiment crosses a threshold.' },
  { icon: TrendingUp, title: 'Trend Analysis', desc: 'Spot sentiment patterns over time — by agent, queue, product, or campaign.' },
  { icon: BarChart3, title: '100% Coverage', desc: 'Every interaction scored — not just a random sample.' },
  { icon: Lightbulb, title: 'Intent Detection', desc: 'AI infers what the customer actually wants, beyond what they say.' },
  { icon: Shield, title: 'Churn Risk Scoring', desc: 'Flag interactions where churn signals are high before the customer hangs up.' },
]

const faqs = [
  { q: 'How accurate is sentiment detection?', a: 'Rozper sentiment is trained on millions of customer service calls, with >90% accuracy on clear audio.' },
  { q: 'Can I set custom alert thresholds?', a: 'Yes. Define your own thresholds for escalation alerts per queue, team, or individual.' },
  { q: 'Does it work on chat and SMS too?', a: 'Yes. Sentiment analysis runs on voice, chat, SMS, and email interactions.' },
]

const calls = [
  { id: 'C-0041', agent: 'Priya N.', sentiment: 88, trend: 'up', emotion: 'Satisfied', duration: '6:42', risk: 'low' },
  { id: 'C-0042', agent: 'Jordan K.', sentiment: 54, trend: 'down', emotion: 'Frustrated', duration: '9:11', risk: 'medium' },
  { id: 'C-0043', agent: 'Layla H.', sentiment: 72, trend: 'flat', emotion: 'Neutral', duration: '4:28', risk: 'low' },
  { id: 'C-0044', agent: 'Marcus L.', sentiment: 31, trend: 'down', emotion: 'Escalation Risk', duration: '12:03', risk: 'high' },
]

const riskStyle: Record<string, string> = {
  low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  high: 'text-red-400 bg-red-400/10 border-red-400/20',
}

function SentimentDashboard() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smile className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Sentiment · Live Queue</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400">4 active calls</span>
      </div>

      {/* Average gauge */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">Overall Sentiment Score</div>
        <div className="relative h-3 rounded-full bg-white/5 overflow-hidden mb-2">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 opacity-20 rounded-full" />
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#046BD2] to-[#0086F9]"
            initial={{ width: 0 }} animate={{ width: '68%' }}
            transition={{ duration: 1.5 }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-white/30">
          <span>Negative</span>
          <span className="text-[#0086F9] font-bold">68 / 100</span>
          <span>Positive</span>
        </div>
      </div>

      {/* Per-call rows */}
      <div className="divide-y divide-white/5">
        {calls.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-5 py-3 items-center hover:bg-white/[0.02] transition">
            <div className="text-[10px] font-mono text-white/30">{c.id}</div>
            <div>
              <div className="text-sm font-medium text-white/80">{c.agent}</div>
              <div className="text-[10px] font-mono text-white/40">{c.emotion} · {c.duration}</div>
            </div>
            <div className="text-center">
              <div className={`font-display text-lg font-bold ${c.sentiment > 70 ? 'text-emerald-400' : c.sentiment > 50 ? 'text-amber-400' : 'text-red-400'}`}>{c.sentiment}</div>
              <div className="text-[9px] font-mono text-white/30">{c.trend === 'up' ? '▲' : c.trend === 'down' ? '▼' : '–'}</div>
            </div>
            <span className={`px-2 py-0.5 rounded border text-[10px] font-mono ${riskStyle[c.risk]}`}>{c.risk}</span>
          </motion.div>
        ))}
      </div>

      <div className="px-5 py-3 bg-red-400/5 border-t border-red-400/10 flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
        <span className="text-[10px] font-mono text-red-400">Escalation risk detected on C-0044 — supervisor alerted</span>
      </div>
    </div>
  )
}

export function FeatAISentimentPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-x-clip">
      <Navbar />

      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#046BD2]/12 blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <span>features</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">ai-sentiment</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Activity className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">AI Features · Sentiment</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Know how every<br />customer{' '}
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">feels</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Real-time sentiment scoring on 100% of calls — alerts supervisors before frustrated customers hang up, and surfaces churn risk while there's still time to act.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact/" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                See it live <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <SentimentDashboard />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Sentiment intelligence at every level.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-7 rounded-3xl bg-[#111B2D] border border-white/10 hover:border-[#046BD2]/40 transition">
                <f.icon className="w-8 h-8 text-[#0086F9] mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8 text-center">FAQ</h2>
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
          <div className="relative rounded-3xl overflow-hidden bg-[#070B14] border border-white/10 p-6 sm:p-12 md:p-20 text-center">
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
              <Activity className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white">Turn customer emotion into action.</h2>
              <Link href="/contact/" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition">
                See it live <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
