'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  BarChart3, TrendingUp, Search, Users, Brain, Flag,
  ArrowRight, ChevronRight, MessageSquare,
} from 'lucide-react'

const features = [
  { icon: BarChart3, title: '100% Call Analysis', desc: 'Every conversation transcribed and analyzed — not a sampled subset.' },
  { icon: TrendingUp, title: 'Topic Trends', desc: 'Surface what customers are asking about most — by week, team, or campaign.' },
  { icon: Search, title: 'Keyword Intelligence', desc: 'Track competitor mentions, objections, product names, and custom terms.' },
  { icon: Users, title: 'Rep Performance', desc: 'Compare talk ratios, question rates, and winning patterns across your team.' },
  { icon: Brain, title: 'Deal Intelligence', desc: 'Flag risk signals: competitor mentions, pricing objections, stalling behavior.' },
  { icon: Flag, title: 'Compliance Monitoring', desc: 'Automated detection of required disclosures and prohibited language.' },
]

const faqs = [
  { q: 'Does it work on recorded calls only?', a: 'It runs on both live and recorded calls — real-time coaching and post-call analysis.' },
  { q: 'Can I track custom keywords?', a: 'Yes. Define any keywords, competitor names, or product terms you want flagged across all conversations.' },
  { q: 'How do I find my best rep\'s winning behaviors?', a: 'Conversation Intelligence identifies common patterns in closed-won calls — questions asked, talk ratio, objection handling.' },
]

const insights = [
  { topic: 'Pricing objections', count: 142, delta: '+18%', color: 'text-amber-400' },
  { topic: 'Competitor: Acme mentioned', count: 87, delta: '+34%', color: 'text-red-400' },
  { topic: 'Demo requests', count: 219, delta: '+12%', color: 'text-emerald-400' },
  { topic: '"Too complex"', count: 61, delta: '-8%', color: 'text-[#0086F9]' },
  { topic: 'Follow-up committed', count: 381, delta: '+5%', color: 'text-emerald-400' },
]

const transcript = [
  { speaker: 'Rep', text: 'What\'s the biggest challenge you\'re facing with your current phone system?', tag: null },
  { speaker: 'Customer', text: 'Honestly, it\'s the cost. We\'re paying three vendors right now.', tag: 'price-objection' },
  { speaker: 'Rep', text: 'That\'s really common. Most teams we talk to are consolidating — how much are you spending across all three?', tag: 'objection-handled' },
  { speaker: 'Customer', text: 'Probably $2,400 a month combined.', tag: null },
]

const tagStyle: Record<string, string> = {
  'price-objection': 'text-amber-400 bg-amber-400/10 border-amber-400/25',
  'objection-handled': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
}

function IntelDashboard() {
  return (
    <div className="space-y-4">
      {/* Topic trends */}
      <div className="rounded-3xl bg-[#111B2D] border border-white/10 p-5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#0086F9]/60 mb-4">Top Topics · This Week</div>
        <div className="space-y-2.5">
          {insights.map((ins, i) => (
            <motion.div key={ins.topic} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/70">{ins.topic}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white/50">{ins.count}</span>
                    <span className={`text-[10px] font-mono ${ins.color}`}>{ins.delta}</span>
                  </div>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-[#046BD2] to-[#0086F9]"
                    initial={{ width: 0 }} animate={{ width: `${(ins.count / 381) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transcript snippet */}
      <div className="rounded-3xl bg-[#111B2D] border border-white/10 p-5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#0086F9]/60 mb-4">Annotated Transcript · REC-1841</div>
        <div className="space-y-3">
          {transcript.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 + 0.4 }}
              className="flex items-start gap-3">
              <div className={`w-12 text-[10px] font-mono flex-shrink-0 pt-0.5 ${t.speaker === 'Rep' ? 'text-[#0086F9]' : 'text-white/40'}`}>
                {t.speaker}
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/75 leading-relaxed">{t.text}</p>
                {t.tag && (
                  <span className={`mt-1 inline-block px-2 py-0.5 rounded border text-[9px] font-mono ${tagStyle[t.tag]}`}>
                    {t.tag}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FeatConversationIntelligencePageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-x-clip">
      <Navbar />

      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#046BD2]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/features" className="hover:text-[#0086F9]">features</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">conversation-intelligence</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <MessageSquare className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">AI Features · Conversation Intelligence</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Every conversation<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">tells a story</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              AI analyzes 100% of your conversations — surfacing trends, rep patterns, deal risks, and competitor signals hidden across thousands of calls.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                See a live demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <IntelDashboard />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Intelligence across every conversation.</h2>
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
              <BarChart3 className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white">Turn conversations into strategy.</h2>
              <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition">
                See a live demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
