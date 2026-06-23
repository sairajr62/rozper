'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Eye, Mic, AlertTriangle, BarChart3, Users, Shield,
  ArrowRight, ChevronRight, Radio,
} from 'lucide-react'

const features = [
  { icon: Eye, title: 'Live Call Monitoring', desc: 'Listen to any active call silently — agents and customers are unaware.' },
  { icon: Mic, title: 'Whisper Coaching', desc: 'Coach agents mid-call without the customer hearing a word.' },
  { icon: Radio, title: 'Barge-In', desc: 'Join any call as a full participant when the situation demands it.' },
  { icon: AlertTriangle, title: 'AI Escalation Alerts', desc: 'Get notified the moment sentiment, keywords, or duration cross your threshold.' },
  { icon: BarChart3, title: 'Real-Time Dashboards', desc: 'Live queue stats, agent status, and call volume — always up to date.' },
  { icon: Shield, title: 'Quality Scorecards', desc: 'Automated QA scoring on 100% of calls — no manual review bottleneck.' },
]

const faqs = [
  { q: 'Can agents tell when a supervisor is listening?', a: 'In listen mode, no. In whisper mode, agents hear you but customers do not. In barge-in mode, everyone hears.' },
  { q: 'How many agents can a supervisor monitor at once?', a: 'Supervisors can see all active agents simultaneously on the live dashboard, and listen to one call at a time.' },
  { q: 'Can I set custom alert conditions?', a: 'Yes. Configure alerts by sentiment score, keyword detection, call duration, or hold time — per queue or team.' },
]

const agents = [
  { name: 'Priya N.', status: 'On Call', duration: '6:18', sentiment: 88, queue: 'Sales' },
  { name: 'Marcus L.', status: 'On Call', duration: '12:44', sentiment: 42, queue: 'Support', alert: true },
  { name: 'Layla H.', status: 'Available', duration: '—', sentiment: null, queue: 'Sales' },
  { name: 'Jordan K.', status: 'On Call', duration: '2:31', sentiment: 74, queue: 'Billing' },
  { name: 'Sam T.', status: 'Wrap-Up', duration: '0:48', sentiment: null, queue: 'Support' },
  { name: 'Diego F.', status: 'On Call', duration: '4:03', sentiment: 91, queue: 'Enterprise' },
]

function LiveMonitorGrid() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const i = setInterval(() => setTick(t => t + 1), 2000)
    return () => clearInterval(i)
  }, [])

  const statusStyle: Record<string, string> = {
    'On Call': 'text-[#0086F9] bg-[#046BD2]/15 border-[#046BD2]/25',
    'Available': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    'Wrap-Up': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  }

  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Live Monitor · 6 agents</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono">
          <span className="text-[#0086F9]">4 on call</span>
          <span className="text-emerald-400">1 available</span>
          <span className="text-amber-400">1 wrap-up</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
        {agents.map((a, i) => (
          <motion.div key={a.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
            className={`p-4 bg-[#0B1220] hover:bg-[#111B2D] transition relative ${a.alert ? 'ring-1 ring-inset ring-red-400/30' : ''}`}>
            {a.alert && (
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-red-400" />
                <span className="text-[9px] font-mono text-red-400">Alert</span>
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[10px] font-bold text-[#2D98F1]">
                {a.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-xs font-medium text-white">{a.name}</div>
                <div className="text-[10px] font-mono text-white/30">{a.queue}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-1.5 py-0.5 rounded border text-[9px] font-mono ${statusStyle[a.status]}`}>{a.status}</span>
              {a.duration !== '—' && <span className="text-[10px] font-mono text-white/40">{a.duration}</span>}
            </div>
            {a.sentiment !== null && (
              <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div className={`h-full rounded-full ${a.sentiment > 70 ? 'bg-emerald-400' : a.sentiment > 50 ? 'bg-[#0086F9]' : 'bg-red-400'}`}
                  animate={{ width: `${a.sentiment + (tick % 3)}%` }}
                  transition={{ duration: 0.8 }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="px-5 py-3 bg-red-400/5 border-t border-red-400/10 flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
        <span className="text-[10px] font-mono text-red-400">Marcus L. — sentiment dropping · 12min call · tap to listen</span>
      </div>
    </div>
  )
}

export function FeatSupervisorToolsPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-x-clip">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,134,249,1) 0px, transparent 1px, transparent 4px)',
      }} />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/features" className="hover:text-[#0086F9]">features</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">supervisor-tools</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Eye className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Features · Supervisor Tools</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              See everything.<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">Fix it live.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Listen, whisper, barge, and alert — real-time supervisor controls that let you coach in the moment instead of reviewing yesterday's calls.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Book a demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <LiveMonitorGrid />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Every supervisor tool, in one place.</h2>
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
              <Eye className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white">Coach in the moment, not after.</h2>
              <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition">
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
