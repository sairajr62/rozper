'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  BarChart3, TrendingUp, Search, Flag, Brain, Users,
  ArrowRight, ChevronRight, MessageSquare,
} from 'lucide-react'

const features = [
  { icon: BarChart3, title: '100% Coverage', desc: 'Every conversation transcribed and analyzed — not a sampled 5% subset.' },
  { icon: Brain, title: 'Intent & Sentiment', desc: 'Understand why customers call and how they feel — across every interaction.' },
  { icon: TrendingUp, title: 'Topic Trend Reports', desc: 'Surface what customers ask most — by week, team, product, or campaign.' },
  { icon: Search, title: 'Keyword Intelligence', desc: 'Track competitor mentions, objections, and custom terms across all calls.' },
  { icon: Users, title: 'Quality Scorecards', desc: 'Automated QA scoring on 100% of calls — no manual review bottleneck.' },
  { icon: Flag, title: 'Compliance Detection', desc: 'Auto-flag missing disclosures and prohibited language across every team.' },
]

const faqs = [
  { q: 'Is transcription real-time or post-call?', a: 'Both. Real-time transcription for live coaching, and post-call analysis for trends and QA.' },
  { q: 'Can I build custom dashboards?', a: 'Yes. Filter by team, queue, date range, and custom tags — export to CSV or connect to your BI tool.' },
  { q: 'How does compliance monitoring work?', a: 'Define required phrases and prohibited language — AI flags any violation across 100% of calls automatically.' },
]

const trendTopics = [
  { label: 'Pricing objections', count: 142, delta: '+18%', bar: 74, color: 'amber' },
  { label: 'Competitor mentions', count: 87, delta: '+34%', bar: 46, color: 'red' },
  { label: 'Demo requests', count: 219, delta: '+12%', bar: 92, color: 'emerald' },
  { label: '"Too complex" sentiment', count: 61, delta: '-8%', bar: 32, color: 'blue' },
]

const colorMap: Record<string, string> = {
  amber: 'bg-amber-400',
  red: 'bg-red-400',
  emerald: 'bg-emerald-400',
  blue: 'bg-[#0086F9]',
}
const textMap: Record<string, string> = {
  amber: 'text-amber-400',
  red: 'text-red-400',
  emerald: 'text-emerald-400',
  blue: 'text-[#0086F9]',
}

function ConversationAnalyticsDash() {
  return (
    <div className="space-y-4">
      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        {[{ v: '100%', k: 'Coverage' }, { v: '<5s', k: 'Transcript' }, { v: '98.4%', k: 'Accuracy' }].map(s => (
          <div key={s.k} className="p-4 rounded-2xl bg-[#111B2D] border border-white/10 text-center">
            <div className="font-display text-2xl font-bold text-[#0086F9]">{s.v}</div>
            <div className="text-[9px] font-mono text-white/35 mt-1 uppercase tracking-wider">{s.k}</div>
          </div>
        ))}
      </div>

      {/* Topic trends */}
      <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
        <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Topic Trends · This Week</span>
        </div>
        <div className="p-5 space-y-3">
          {trendTopics.map((topic, i) => (
            <motion.div key={topic.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-white/70">{topic.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/40">{topic.count}</span>
                  <span className={`text-[10px] font-mono ${textMap[topic.color]}`}>{topic.delta}</span>
                </div>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div className={`h-full rounded-full ${colorMap[topic.color]}`}
                  initial={{ width: 0 }} animate={{ width: `${topic.bar}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* QA score card */}
      <div className="rounded-3xl bg-[#111B2D] border border-white/10 p-5">
        <div className="text-[10px] font-mono text-[#0086F9]/60 uppercase tracking-widest mb-3">Auto QA · Call REC-1841</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Empathy', score: 94 },
            { label: 'Resolution', score: 88 },
            { label: 'Compliance', score: 100 },
            { label: 'Pacing', score: 79 },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 + 0.4 }}
              className="p-3 rounded-xl bg-[#0B1220] border border-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-white/40">{item.label}</span>
                <span className={`text-xs font-mono font-bold ${item.score >= 90 ? 'text-emerald-400' : item.score >= 75 ? 'text-[#0086F9]' : 'text-amber-400'}`}>{item.score}</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div className={`h-full rounded-full ${item.score >= 90 ? 'bg-emerald-400' : item.score >= 75 ? 'bg-[#0086F9]' : 'bg-amber-400'}`}
                  initial={{ width: 0 }} animate={{ width: `${item.score}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.5 }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProdAIConversationPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#046BD2]/7 blur-[160px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/ai" className="hover:text-[#0086F9]">ai</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">conversation</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start">
          <div className="w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-6 sm:mb-8">
              <MessageSquare className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">AI · Conversation Analytics</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Every conversation<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">analyzed</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-5 sm:mt-6 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
              Transcripts, sentiment, intent, and keyword trends — on 100% of conversations. Turn every call into actionable insight, automatically.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-8 sm:mt-10 flex flex-row flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-xs sm:text-base text-white font-semibold transition whitespace-nowrap">
                See a live demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full border border-white/15 text-xs sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap">See pricing</Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} className="w-full">
            <ConversationAnalyticsDash />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Intelligence across every conversation.</h2>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group flex items-start gap-6 py-7 first:pt-0 last:pb-0 hover:pl-2 transition-all duration-300"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 group-hover:border-[#046BD2]/40 transition-all mt-0.5">
                  <f.icon className="w-4.5 h-4.5 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-white mb-1.5 group-hover:text-[#0086F9] transition-colors">{f.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                </div>
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
              <BarChart3 className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">Turn conversations into strategy.</h2>
              <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-xs sm:text-base font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition whitespace-nowrap">
                  See a live demo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-xs sm:text-base text-white font-semibold transition whitespace-nowrap">See pricing</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      </div>
    </main>
  )
}
