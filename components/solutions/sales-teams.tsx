'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Phone, Brain, Globe, RefreshCw, BarChart3, Users, Headphones, Bell,
  ArrowRight, ChevronRight, TrendingUp, Trophy, Target,
} from 'lucide-react'

const features = [
  { icon: Phone, title: 'Power Dialer', desc: 'Connect to live calls the moment someone picks up — zero wait time between dials.' },
  { icon: Brain, title: 'AI Live Coaching', desc: 'Whispers objection handlers and pricing guidance mid-call for real-time support.' },
  { icon: Globe, title: 'Local Presence Dialing', desc: "Match caller ID to prospect's area code for higher pickup rates." },
  { icon: RefreshCw, title: 'Automatic CRM Logging', desc: 'Outcome, summary, and next action synced to Salesforce or HubSpot automatically.' },
  { icon: BarChart3, title: 'Conversation Intelligence', desc: 'Find patterns from top reps and replicate winning behaviors across the team.' },
]

const detail = [
  { icon: Users, title: 'Leaderboard', desc: 'Calls made, connect rate, talk time, and AI quality score visible to the whole team.' },
  { icon: Headphones, title: 'Manager Live Listen', desc: 'Listen to any live call and whisper coach without the prospect hearing.' },
  { icon: Bell, title: 'Deal Risk Alerts', desc: 'Conversation signals pushed to CRM pipeline to flag at-risk opportunities.' },
]

const leaders = [
  { rep: 'Sarah K.', dials: 312, connect: '47%', score: 9.4 },
  { rep: 'Marcus L.', dials: 287, connect: '42%', score: 9.1 },
  { rep: 'Priya N.', dials: 261, connect: '40%', score: 8.9 },
  { rep: 'Diego F.', dials: 248, connect: '38%', score: 8.6 },
]

const pipeline = [
  { stage: 'Discovery', count: 142, pct: 100 },
  { stage: 'Demo', count: 87, pct: 72 },
  { stage: 'Proposal', count: 51, pct: 48 },
  { stage: 'Negotiation', count: 28, pct: 28 },
  { stage: 'Closed Won', count: 19, pct: 18 },
]

const stats = [
  { v: '3x', k: 'More Calls Per Rep' },
  { v: '47%', k: 'Higher Connect Rate' },
  { v: '100%', k: 'CRM Sync Accuracy' },
  { v: '24/7', k: 'AI Coaching Available' },
]

const faqs = [
  { q: 'Does the power dialer work from mobile?', a: 'Yes. Rozper mobile app supports power dialing from anywhere.' },
  { q: 'Can AI coach during a live sales call?', a: 'Yes. Whisper panel shows suggested responses, objection handlers, and pricing guidance in real time.' },
  { q: 'How does conversation intelligence help sales?', a: 'Identifies winning patterns from top performers, flags deal risks, finds competitor mentions.' },
]

function SalesPipeline() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Pipeline · This Quarter</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400">▲ +24%</span>
      </div>
      <div className="space-y-2">
        {pipeline.map((p, i) => (
          <motion.div
            key={p.stage}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className="relative h-12 rounded-lg bg-white/[0.03] border border-white/10 overflow-hidden"
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#046BD2] to-[#0086F9] opacity-30"
              initial={{ width: 0 }} animate={{ width: `${p.pct}%` }} transition={{ duration: 1.2, delay: i * 0.1 }}
            />
            <div className="relative h-full px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-white/40">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm font-medium text-white">{p.stage}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display font-bold text-white">{p.count}</span>
                <span className="text-[10px] font-mono text-[#0086F9]">{p.pct}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Leaderboard() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Leaderboard · Today</span>
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 px-5 py-2 border-b border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/40">
        <span>#</span><span>Rep</span><span>Dials</span><span>Conn</span><span>AI</span>
      </div>
      {leaders.map((l, i) => (
        <div key={l.rep} className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 px-5 py-3 border-b border-white/5 items-center text-sm hover:bg-white/[0.02]">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-[#046BD2] text-white' : 'bg-white/10 text-white/60'}`}>{i + 1}</span>
          <span className="font-medium">{l.rep}</span>
          <span className="font-mono text-white">{l.dials}</span>
          <span className="font-mono text-emerald-400">{l.connect}</span>
          <span className="font-mono text-[#0086F9]">{l.score}</span>
        </div>
      ))}
    </div>
  )
}

export function SalesTeamsPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/solutions" className="hover:text-[#0086F9]">solutions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">sales-teams</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <TrendingUp className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Solutions · Sales Teams</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Dial more.<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">Close more.</span><br />
              Zero friction.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Power dialer, AI coaching, CRM sync, and conversation intelligence — for sales teams that move fast. Reps spend 40% of their day on admin. Rozper removes that friction.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Book a demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">See pricing</Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="mt-10 flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-white/40">CRM-native:</span>
              {['Salesforce', 'HubSpot', 'Zoho', 'Pipedrive'].map(t => (
                <span key={t} className="px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-white/70">{t}</span>
              ))}
            </motion.div>
          </div>

          <div className="hidden sm:block">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} className="space-y-4">
              <Leaderboard />
              <SalesPipeline />
            </motion.div>
          </div>
        </section>

        {/* Features grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Built for high-velocity sales.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`relative rounded-2xl bg-[#111B2D] border border-white/[0.08] hover:border-[#046BD2]/30 p-6 overflow-hidden group transition-colors ${i === 4 ? 'md:col-span-2 flex items-start gap-6' : ''}`}
              >
                <span className="absolute top-4 right-5 font-mono text-4xl font-bold text-white/[0.04] select-none leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-all relative z-10">
                  <f.icon className="w-4.5 h-4.5 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <div className={`relative z-10 ${i === 4 ? 'flex-1' : 'mt-4'}`}>
                  <h3 className="font-display font-semibold text-white mb-1.5">{f.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Visibility */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-3xl bg-gradient-to-br from-[#046BD2]/15 to-[#0B1220] border border-[#046BD2]/20 p-12 md:p-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 max-w-2xl">Visibility that drives coaching.</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {detail.map((d, i) => (
                <div key={d.title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <d.icon className="w-7 h-7 text-[#0086F9] mb-4" strokeWidth={1.5} />
                  <h3 className="font-display font-semibold mb-2">{d.title}</h3>
                  <p className="text-sm text-white/55">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl bg-[#111B2D] border border-white/10 text-center">
                <div className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-br from-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">{s.v}</div>
                <div className="text-xs text-white/50 mt-2 font-mono uppercase tracking-wider">{s.k}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials — performance scorecards, all equal */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-[#2D98F1] mb-3">Rep Stories</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Numbers don't lie.</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                rank: '#01', kpi: '3×', kpiLabel: 'calls per rep',
                kpiColor: 'text-[#0086F9]', borderColor: 'border-[#0086F9]/20',
                initials: 'MR', name: 'Marcus Reid', title: 'VP Sales · Northgate Growth',
                avatarClass: 'bg-[#046BD2]/20 border-[#046BD2]/30 text-[#2D98F1]',
                quote: '"Our reps make 3× the calls since switching to Rozper. The AI summaries mean they\'re talking to the next lead before they\'ve finished the last one."',
              },
              {
                rank: '#02', kpi: '−3 wks', kpiLabel: 'rep ramp time',
                kpiColor: 'text-[#2575FC]', borderColor: 'border-[#2575FC]/20',
                initials: 'SB', name: 'Sophia Bell', title: 'Sales Manager · Vertex SaaS',
                avatarClass: 'bg-[#2575FC]/20 border-[#2575FC]/30 text-[#2575FC]',
                quote: '"Whisper coaching changed how I develop reps. I can guide someone through a tough negotiation in real time without the prospect ever knowing I\'m there."',
              },
              {
                rank: '#03', kpi: '+16 pp', kpiLabel: 'connect rate lift',
                kpiColor: 'text-[#22D3EE]', borderColor: 'border-[#22D3EE]/20',
                initials: 'RC', name: 'Ryan Chen', title: 'Account Executive · Elevate Cloud',
                avatarClass: 'bg-[#22D3EE]/20 border-[#22D3EE]/30 text-[#22D3EE]',
                quote: '"Local presence dialing alone was worth the switch. My connect rate went from 22% to 38% in the first month — without changing my script."',
              },
              {
                rank: '#04', kpi: '+28%', kpiLabel: 'win rate after',
                kpiColor: 'text-[#0078E0]', borderColor: 'border-[#0078E0]/20',
                initials: 'FN', name: 'Fatima Nour', title: 'VP Revenue · Horizon B2B',
                avatarClass: 'bg-[#0078E0]/20 border-[#0078E0]/30 text-[#0078E0]',
                quote: '"Conversation intelligence surfaced a closing pattern we didn\'t know our top reps were using. We trained the whole team in two weeks."',
              },
            ].map((t, i) => (
              <motion.div
                key={t.initials}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`group flex flex-col rounded-3xl bg-[#111B2D] border border-white/10 hover:${t.borderColor} hover:bg-[#1A2638] transition p-7 relative overflow-hidden`}
              >
                <div className="absolute -top-px -left-px w-20 h-px bg-gradient-to-r from-[#046BD2] to-transparent" />
                {/* Rank + KPI */}
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-[10px] text-white/30 border border-white/10 px-2 py-0.5 rounded">{t.rank}</span>
                  <div className="text-right">
                    <div className={`font-display text-3xl font-bold ${t.kpiColor}`}>{t.kpi}</div>
                    <div className="font-mono text-[10px] text-white/40 mt-0.5">{t.kpiLabel}</div>
                  </div>
                </div>
                <blockquote className="font-display text-base font-medium text-white/80 leading-relaxed flex-1 mb-6">{t.quote}</blockquote>
                <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.06]">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-display font-bold text-xs shrink-0 ${t.avatarClass}`}>{t.initials}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-[11px] text-white/40 font-mono">{t.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8 text-center">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-2xl bg-[#111B2D] border border-white/10 p-6 hover:bg-[#1A2638] transition">
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
          <div className="relative rounded-[2rem] overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <Trophy className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-white">Sell more, type less.</h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
                Book a demo <ArrowRight className="w-4 h-4" />
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
