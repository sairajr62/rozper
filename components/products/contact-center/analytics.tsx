'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  BarChart3, TrendingUp, Clock, Users, Flag, Download,
  ArrowRight, ChevronRight,
} from 'lucide-react'

const features = [
  { icon: BarChart3, title: 'Real-Time Queue Stats', desc: 'Live call volume, wait times, abandonment rate, and agent availability in one view.' },
  { icon: TrendingUp, title: 'Historical Trend Reports', desc: 'SLA compliance, CSAT, AHT, and FCR trended by day, week, or custom range.' },
  { icon: Clock, title: 'SLA Tracking', desc: 'Monitor SLA adherence per queue and team — with alerts before breaches occur.' },
  { icon: Users, title: 'Agent Performance Boards', desc: 'Compare AHT, resolution rate, and CSAT per agent — sortable, filterable, exportable.' },
  { icon: Flag, title: 'Quality Scorecards', desc: 'Automated QA scoring on 100% of calls — no manual review sampling.' },
  { icon: Download, title: 'Export & BI Integration', desc: 'Export to CSV or push data to Looker, Tableau, or any BI tool via webhook.' },
]

const faqs = [
  { q: 'How fresh is the real-time data?', a: 'Under 5 seconds. Live dashboards update continuously — no page refresh needed.' },
  { q: 'Can supervisors get alerts on SLA breaches?', a: 'Yes. Configure threshold alerts via email, SMS, or Slack when SLA, queue depth, or wait time exceed limits.' },
  { q: 'Is historical data retained?', a: 'Yes. All call data and analytics are retained for your configured period — up to 7 years on Enterprise.' },
]

const kpiData = [
  { label: 'Avg Handle Time', value: '4:12', delta: '-0:18', good: true },
  { label: 'First Call Resolution', value: '78%', delta: '+4%', good: true },
  { label: 'CSAT Score', value: '4.6/5', delta: '+0.2', good: true },
  { label: 'Abandoned Rate', value: '3.1%', delta: '+0.4%', good: false },
  { label: 'SLA Adherence', value: '94.2%', delta: '+1.1%', good: true },
  { label: 'Avg Wait Time', value: '0:48', delta: '-0:06', good: true },
]

const chartBars = [62, 78, 55, 89, 74, 91, 83, 68, 94, 87, 72, 88]

function AnalyticsDashboard() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Contact Center Analytics · Live</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400">Updated 2s ago</span>
      </div>

      {/* CSAT chart */}
      <div className="p-5 border-b border-white/5">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">CSAT Trend · 12 hours</div>
        <div className="flex items-end gap-1 h-16">
          {chartBars.map((h, i) => (
            <motion.div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#046BD2] to-[#0086F9]"
              initial={{ height: 0 }} animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-2 text-[9px] font-mono text-white/25">
          <span>8am</span><span>12pm</span><span>4pm</span><span>8pm</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="p-5">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">Today vs Yesterday</div>
        <div className="grid grid-cols-2 gap-2.5">
          {kpiData.map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 + 0.3 }}
              className="p-3 rounded-xl bg-[#0B1220] border border-white/5">
              <div className="text-[9px] font-mono text-white/35 mb-1">{kpi.label}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-display font-bold text-white">{kpi.value}</span>
                <span className={`text-[9px] font-mono ${kpi.good ? 'text-emerald-400' : 'text-red-400'}`}>{kpi.delta}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-white/10 text-[10px] font-mono text-white/30">
        Real-time · Historical · Export to any BI tool
      </div>
    </div>
  )
}

export function ProdCCAnalyticsPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-hidden">
      <Navbar />

      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#046BD2]/7 blur-[160px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/contact-center" className="hover:text-[#0086F9]">contact-center</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">analytics</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <BarChart3 className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Contact Center · Analytics</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Every metric.<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">In real time</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Transcripts, sentiment, intent, and quality scores — on 100% of interactions. Every conversation analyzed, instantly surfaced.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                See live dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">See pricing</Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <AnalyticsDashboard />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Data that drives decisions.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-2xl bg-[#111B2D] border border-white/[0.07] p-6 hover:border-[#046BD2]/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-all">
                    <f.icon className="w-4.5 h-4.5 text-[#0086F9]" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[10px] text-white/20 font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
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
            <BarChart3 className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Real-time intelligence. Zero lag.</h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
                See live dashboard <ArrowRight className="w-4 h-4" />
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
