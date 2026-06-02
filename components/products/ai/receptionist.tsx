'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  PhoneIncoming, CalendarCheck, Database, Mic, Globe, GitBranch,
  MessageCircle, ArrowRight, ChevronRight, Bot, CheckCircle,
} from 'lucide-react'
import { ReceptionistHero } from '@/components/products/ai/receptionist-hero'

const features = [
  { icon: PhoneIncoming, title: '24/7 Call Answering', desc: 'Never miss a call — AI answers immediately at any hour, any day.' },
  { icon: MessageCircle, title: 'Natural Language Greetings', desc: 'Sounds human — no robotic prompts, no IVR trees. Just a natural conversation.' },
  { icon: CalendarCheck, title: 'Calendar Booking', desc: 'Books appointments directly into your calendar with instant SMS/email confirmation.' },
  { icon: Database, title: 'CRM Pre-Population', desc: 'Writes contact data and call summary to CRM before the agent picks up.' },
  { icon: Globe, title: 'Multi-Language Support', desc: 'Answers in the caller\'s language — 40+ languages supported automatically.' },
  { icon: GitBranch, title: 'Custom Call Flows', desc: 'Configure greeting, qualifying questions, and routing rules per number or department.' },
]

const faqs = [
  { q: 'Does it sound like a real person?', a: 'Yes. Natural language processing makes the AI indistinguishable from a professional receptionist — no robotic prompts.' },
  { q: 'What happens when the AI can\'t help?', a: 'It escalates the call to the right agent, voicemail, or callback flow based on your configured rules.' },
  { q: 'Which CRMs does it integrate with?', a: 'Salesforce, HubSpot, Zoho, Zendesk, Freshdesk, Pipedrive, and 300+ via API and Zapier.' },
]

const callFlow = [
  { step: 1, label: 'Call received', sub: 'Any hour, any day', done: true },
  { step: 2, label: 'AI greets caller', sub: 'Natural language', done: true },
  { step: 3, label: 'Qualifies & routes', sub: 'Dept / urgency / topic', done: true },
  { step: 4, label: 'Books or transfers', sub: 'Calendar or live agent', done: false },
  { step: 5, label: 'CRM updated', sub: 'Summary + contact data', done: false },
]

function ReceptionistFlowUI() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">AI Receptionist · Live Call</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#046BD2]/15 border border-[#046BD2]/25">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9] animate-pulse" />
          <span className="text-[10px] font-mono text-[#0086F9]">In Progress</span>
        </div>
      </div>

      {/* Waveform */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <Mic className="w-4 h-4 text-[#0086F9]" />
          <div className="text-[10px] font-mono text-white/50">+1 (312) 555-0188 · 0:38</div>
        </div>
        <div className="flex items-end gap-0.5 h-10">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div key={i} className={`flex-1 rounded-sm ${i % 4 === 0 ? 'bg-[#0086F9]' : 'bg-[#046BD2]'}`}
              animate={{ height: `${10 + Math.abs(Math.sin(i * 0.5)) * 90}%` }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse', delay: i * 0.03 }} />
          ))}
        </div>
        <div className="mt-2 p-3 rounded-xl bg-[#0B1220] border border-white/5">
          <div className="text-[9px] font-mono text-[#0086F9]/60 uppercase tracking-widest mb-1">AI Transcript</div>
          <p className="text-xs text-white/60 leading-relaxed italic">
            "Hi, I&apos;m calling about scheduling a product demo for next week — we have about 15 people on our team…"
          </p>
        </div>
      </div>

      {/* Progress steps */}
      <div className="px-5 pb-5">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">Call Progress</div>
        <div className="space-y-2">
          {callFlow.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-3 p-2.5 rounded-xl transition ${s.done ? 'bg-emerald-400/5 border border-emerald-400/15' : i === 3 ? 'bg-[#046BD2]/10 border border-[#046BD2]/25' : 'bg-white/[0.02] border border-white/5'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? 'bg-emerald-400/20' : i === 3 ? 'bg-[#046BD2]/20' : 'bg-white/5'}`}>
                {s.done
                  ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  : <span className="text-[9px] font-mono font-bold text-white/30">{s.step}</span>}
              </div>
              <div>
                <div className={`text-xs font-medium ${s.done ? 'text-emerald-400' : i === 3 ? 'text-[#0086F9]' : 'text-white/30'}`}>{s.label}</div>
                <div className="text-[10px] font-mono text-white/25">{s.sub}</div>
              </div>
              {i === 3 && (
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-[#0086F9] animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-[#0086F9] animate-pulse" style={{ animationDelay: '0.15s' }} />
                  <div className="w-1 h-1 rounded-full bg-[#0086F9] animate-pulse" style={{ animationDelay: '0.3s' }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-white/10 text-[10px] font-mono text-white/30">
        0 missed calls · 100% answered · CRM sync enabled
      </div>
    </div>
  )
}

export function ProdAIReceptionistPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#046BD2]/7 blur-[180px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/ai" className="hover:text-[#0086F9]">ai</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">receptionist</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-8 sm:pb-16 flex flex-col lg:grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-12 lg:items-center min-h-[calc(100dvh-200px)] lg:min-h-0">
          <div className="w-full shrink-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-6 sm:mb-8">
              <Bot className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">AI · Receptionist</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              24/7 call answering.<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">Zero hold time</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-5 sm:mt-6 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
              Answers calls, qualifies leads, books meetings, and writes to your CRM — around the clock. Included on every Rozper seat.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-8 sm:mt-10 flex flex-row flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-xs sm:text-base text-white font-semibold transition whitespace-nowrap">
                Start a free trial <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full border border-white/15 text-xs sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap">See pricing</Link>
            </motion.div>

          </div>

          <div className="flex-1 lg:flex-none flex items-start justify-center overflow-hidden min-h-[240px] sm:min-h-[300px] lg:min-h-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3, ease: 'easeOut' } }} className="relative">
              <ReceptionistHero />
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Your front desk never closes.</h2>
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
          <div className="relative rounded-[2.5rem] overflow-hidden p-6 sm:p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <Bot className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">Answer every call. Book every meeting.</h2>
            <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white text-[#046BD2] text-xs sm:text-base font-semibold hover:scale-105 transition whitespace-nowrap">
                Start a free trial <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white/15 border border-white/30 text-xs sm:text-base text-white font-semibold hover:bg-white/25 transition whitespace-nowrap">See pricing</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      </div>
    </main>
  )
}
