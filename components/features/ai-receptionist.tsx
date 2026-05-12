'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Phone, Bot, Calendar, Database, Settings, Target,
  ArrowRight, ChevronRight, MessageSquare, Mic, Zap,
} from 'lucide-react'

const features = [
  { icon: MessageSquare, title: 'Natural Language Greetings', desc: 'Greets callers in your brand voice — natural, not robotic.' },
  { icon: Target, title: 'Qualifying Questions', desc: 'Asks reason for call, company name, urgency — intelligently.' },
  { icon: ArrowRight, title: 'Smart Call Routing', desc: 'Routes to the right agent, team, or voicemail based on your rules.' },
  { icon: Calendar, title: 'Calendar Booking', desc: 'Books appointments with instant SMS/email confirmation.' },
  { icon: Database, title: 'CRM Pre-Population', desc: 'Writes summary and contact data to CRM before agent picks up.' },
  { icon: Settings, title: 'Visual Call Flow Builder', desc: 'Set up call flows visually — no code, no developer needed.' },
]

const faqs = [
  { q: 'Does it work for multiple departments?', a: 'Yes. Configure separate AI flows per department, number, or time-of-day rule.' },
  { q: 'Can it handle multiple languages?', a: 'Yes. Configure in any supported language — ideal for international businesses.' },
  { q: 'What CRMs does it write to?', a: 'Salesforce, HubSpot, Zoho, Zendesk, Freshdesk, Pipedrive, and 300+ more via API.' },
]

const callLog = [
  { time: '09:04', caller: '+1 (415) 882-3310', intent: 'Book demo', action: 'Booked · Thur 2pm', status: 'booked' },
  { time: '09:17', caller: '+44 20 7946 0321', intent: 'Billing inquiry', action: 'Routed → Finance', status: 'routed' },
  { time: '09:31', caller: '+1 (212) 555-0192', intent: 'Technical support', action: 'Ticket created · CRM', status: 'logged' },
  { time: '09:48', caller: '+61 2 9000 1234', intent: 'Partnership', action: 'Routed → Sales', status: 'routed' },
]

const statusStyle: Record<string, string> = {
  booked: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  routed: 'text-[#0086F9] bg-[#046BD2]/10 border-[#046BD2]/20',
  logged: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
}

function CallLogVisual() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % callLog.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 border-b border-white/10 bg-[#0B1220] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-white/60">AI Receptionist · Live</span>
        </div>
        <span className="text-[10px] font-mono text-[#0086F9]">24/7 Active</span>
      </div>

      {/* Waveform */}
      <div className="px-5 pt-4 pb-2">
        <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">Voice · Active Call</div>
        <div className="flex items-end gap-0.5 h-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-[#046BD2] to-[#2D98F1]"
              animate={{ height: `${20 + Math.abs(Math.sin(i * 0.5 + Date.now() / 500)) * 80}%` }}
              transition={{ duration: 0.3, delay: i * 0.01 }}
            />
          ))}
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {callLog.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`grid grid-cols-[auto_1fr_auto] gap-4 px-5 py-3 items-center transition ${active === i ? 'bg-white/[0.03]' : ''}`}
          >
            <div className="text-[10px] font-mono text-white/30">{c.time}</div>
            <div>
              <div className="text-xs text-white/70 font-mono">{c.caller}</div>
              <div className="text-[11px] text-white/40">{c.intent}</div>
            </div>
            <span className={`px-2 py-0.5 rounded border text-[10px] font-mono whitespace-nowrap ${statusStyle[c.status]}`}>
              {c.action}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-white/10 bg-[#046BD2]/5">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-white/40">Today · All calls handled</span>
          <span className="text-[#0086F9]">0 missed</span>
        </div>
      </div>
    </div>
  )
}

export function FeatAIReceptionistPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] relative overflow-hidden">
      <Navbar />

      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[#046BD2]/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-[#0086F9]/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/features" className="hover:text-[#0086F9]">features</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">ai-receptionist</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Bot className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">AI Features · Receptionist</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              24/7 call answering.<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">Zero hold times.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Your front desk closes at 5pm. Your AI Receptionist doesn't. Answers every call, qualifies leads, routes intelligently, and books meetings — around the clock.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Start a No-Pressure Conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">
                See pricing
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="mt-10 grid grid-cols-4 gap-3">
              {[{ v: '100%', k: 'Answered' }, { v: '<1s', k: 'Response' }, { v: '24/7', k: 'Available' }, { v: '0s', k: 'Hold Time' }].map(s => (
                <div key={s.k} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="font-display text-xl font-bold bg-gradient-to-br from-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">{s.v}</div>
                  <div className="text-[10px] font-mono text-white/40 mt-1 uppercase tracking-wider">{s.k}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <CallLogVisual />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#0086F9]/80 mb-4">// capabilities</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">How it works on every call.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="group p-8 bg-[#0B1220] hover:bg-[#111B2D] transition relative">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#0086F9]/0 group-hover:bg-[#0086F9]/8 blur-2xl transition-all duration-500" />
                <f.icon className="w-8 h-8 text-[#0086F9] mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#046BD2]/15 via-[#111B2D] to-[#0B1220] border border-[#046BD2]/20 p-12 md:p-16">
            <Mic className="w-10 h-10 text-[#0086F9] mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 max-w-2xl">Configurable for any business, any workflow.</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {['Custom greetings, question sets, and routing rules per department', 'Works on your existing Rozper number — no new number required', 'Configure separate AI flows per number or time-of-day rule', 'Integrates with Salesforce, HubSpot, Zoho, and 300+ CRMs'].map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/8">
                  <div className="w-5 h-5 rounded-full bg-[#046BD2]/30 border border-[#046BD2]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9]" />
                  </div>
                  <span className="text-sm text-white/75 leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
            <Phone className="w-12 h-12 mx-auto mb-6 text-white relative" />
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight relative">Ready to answer every call?</h2>
            <p className="mt-6 text-white/80 max-w-md mx-auto relative">AI Receptionist included on every seat. No extra charge.</p>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition relative">
              Start a No-Pressure Conversation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
