'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Brain, FileText, Zap, TrendingUp, Shield, MessageSquare,
  ArrowRight, ChevronRight, Sparkles, BarChart3,
} from 'lucide-react'

const features = [
  { icon: Brain, title: 'Real-Time Call Coaching', desc: 'AI whispers answers and objection handlers mid-call — invisible to the customer.' },
  { icon: FileText, title: 'Auto Call Summaries', desc: 'Every call summarized with next steps and action items — zero manual notes.' },
  { icon: MessageSquare, title: 'Suggested Replies', desc: 'Next best message drafted in chat and SMS channels based on conversation context.' },
  { icon: TrendingUp, title: 'Rep Performance Analytics', desc: 'Spot winning patterns across your team — talk ratio, close rate, objection handling.' },
  { icon: Shield, title: 'Compliance Monitoring', desc: 'Flags missing disclosures and prohibited language in real time on every call.' },
  { icon: Zap, title: 'Post-Call Follow-up Drafts', desc: 'Email follow-ups drafted from call summary — agents review, then send.' },
]

const faqs = [
  { q: 'Is it included on every Rozper seat?', a: 'Yes. AI Assistant is included on Business and Enterprise plans at no extra per-seat charge.' },
  { q: 'Can I train it on my own data?', a: 'Yes. Upload playbooks, FAQs, and product docs — the AI surfaces them during relevant calls.' },
  { q: 'Does it work on inbound and outbound?', a: 'Yes. Live coaching runs on all call types — inbound, outbound, transfers, and conference.' },
]

const metricsData = [
  { rep: 'Priya N.', score: 94, calls: 28, closed: 11 },
  { rep: 'Marcus L.', score: 81, calls: 22, closed: 7 },
  { rep: 'Layla H.', score: 88, calls: 31, closed: 14 },
  { rep: 'Jordan K.', score: 76, calls: 19, closed: 5 },
]

function AIAssistantDashboard() {
  return (
    <div className="space-y-4">
      {/* Coaching panel */}
      <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
        <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Live Coaching · Priya N.</span>
          <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#046BD2]/15 border border-[#046BD2]/25">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9] animate-pulse" />
            <span className="text-[9px] font-mono text-[#0086F9]">Active</span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {[
            { type: 'Objection', text: 'Offer 30-day trial to lower commitment barrier', color: 'border-amber-400/40 text-amber-400 bg-amber-400/5' },
            { type: 'Next Step', text: 'Ask: "Would a live demo work for your team this week?"', color: 'border-emerald-400/40 text-emerald-400 bg-emerald-400/5' },
          ].map((tip, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}
              className={`flex items-start gap-3 p-3 rounded-xl border ${tip.color}`}>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border flex-shrink-0 ${tip.color}`}>{tip.type}</span>
              <p className="text-xs text-white/70 leading-relaxed">{tip.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rep performance */}
      <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
        <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Rep Performance · This Week</span>
        </div>
        <div className="p-4 space-y-3">
          {metricsData.map((rep, i) => (
            <motion.div key={rep.rep} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 + 0.2 }}
              className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/25 flex items-center justify-center text-[9px] font-bold text-[#2D98F1] flex-shrink-0">
                {rep.rep.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/70">{rep.rep}</span>
                  <span className={`text-xs font-mono font-bold ${rep.score >= 90 ? 'text-emerald-400' : rep.score >= 80 ? 'text-[#0086F9]' : 'text-amber-400'}`}>{rep.score}</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div className={`h-full rounded-full ${rep.score >= 90 ? 'bg-emerald-400' : rep.score >= 80 ? 'bg-[#0086F9]' : 'bg-amber-400'}`}
                    initial={{ width: 0 }} animate={{ width: `${rep.score}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }} />
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[10px] font-mono text-emerald-400">{rep.closed}/{rep.calls}</div>
                <div className="text-[9px] font-mono text-white/25">closed</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProdAIAssistantPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-hidden">
      <Navbar />

      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#046BD2]/8 blur-[160px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/ai" className="hover:text-[#0086F9]">ai</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">assistant</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">AI · Virtual Assistant</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Per-seat AI for<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">every agent</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Live coaching, auto-summaries, and suggested replies — on every call and message. AI that makes every rep perform like your best rep.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                See AI in action <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">See pricing</Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <AIAssistantDashboard />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">AI that makes every rep your best rep.</h2>
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
          <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Your team. Powered by AI.</h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/15 border border-white/30 text-white font-semibold hover:bg-white/25 transition">See pricing</Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
                See AI in action <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
