'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Mic, Brain, FileText, RefreshCw, BarChart3, Shield,
  ArrowRight, ChevronRight, Zap, MessageSquare,
} from 'lucide-react'

const features = [
  { icon: Mic, title: 'Real-Time Whisper Coaching', desc: 'Live guidance appears silently — only the agent sees it, not the customer.' },
  { icon: Brain, title: 'Objection Handling Scripts', desc: 'AI surfaces the right response the moment it detects a known objection pattern.' },
  { icon: FileText, title: 'Auto Call Summary', desc: 'Full summary, action items, and CRM notes generated within seconds of hang-up.' },
  { icon: RefreshCw, title: 'CRM Auto-Logging', desc: 'Duration, outcome, transcript, and AI summary synced automatically — zero manual entry.' },
  { icon: BarChart3, title: 'Sentiment Detection', desc: 'Real-time customer sentiment so agents can adjust tone before things escalate.' },
  { icon: Shield, title: 'Compliance Monitoring', desc: 'Flags required disclosures and prohibited language the moment they\'re missed.' },
]

const faqs = [
  { q: 'Is whisper coaching visible to customers?', a: 'No. Whisper coaching appears only on the agent\'s screen — customers hear nothing.' },
  { q: 'Does AI Assist work on inbound and outbound calls?', a: 'Yes. It activates on all calls — inbound, outbound, and transferred.' },
  { q: 'How quickly does the AI respond?', a: 'Sub-second. Suggestions appear while the customer is still speaking.' },
]

const suggestions = [
  { trigger: 'Customer: "That\'s too expensive..."', suggestion: 'Acknowledge the concern, then reframe around ROI. Mention the 14-day trial to reduce commitment risk.', type: 'objection' },
  { trigger: 'Customer: "What\'s your uptime guarantee?"', suggestion: 'We offer 99.99% uptime SLA — that\'s less than 5 minutes of downtime per year, backed by contract.', type: 'answer' },
  { trigger: 'Sentiment: Frustrated (↓ 42%)', suggestion: 'Customer tone has shifted. Slow down, acknowledge their frustration explicitly before continuing.', type: 'sentiment' },
]

const typeStyle: Record<string, string> = {
  objection: 'border-l-[#0086F9] bg-[#046BD2]/8',
  answer: 'border-l-[#2D98F1] bg-[#2575FC]/8',
  sentiment: 'border-l-amber-400 bg-amber-400/8',
}

const typeBadge: Record<string, string> = {
  objection: 'text-[#0086F9] bg-[#046BD2]/15 border-[#046BD2]/30',
  answer: 'text-[#2D98F1] bg-[#2575FC]/15 border-[#2575FC]/30',
  sentiment: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
}

function WhisperPanel() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">AI Agent Assist · Whisper Panel</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400">LIVE</span>
        </div>
      </div>

      <div className="p-5 border-b border-white/5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">Call in Progress · 4:12</div>
        <div className="flex items-end gap-0.5 h-8 mb-3">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-[#046BD2] to-[#0086F9]"
              animate={{ height: `${15 + Math.abs(Math.sin(i * 0.7)) * 85}%` }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse', delay: i * 0.05 }}
            />
          ))}
        </div>
        <div className="text-xs text-white/50 font-mono">"{suggestions[activeIdx].trigger}"</div>
      </div>

      <div className="p-5 space-y-3">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#0086F9]/60 mb-2">AI Suggestion</div>
        {suggestions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: activeIdx === i ? 1 : 0.3, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            onClick={() => setActiveIdx(i)}
            className={`p-4 rounded-xl border-l-2 cursor-pointer transition ${typeStyle[s.type]}`}
          >
            <span className={`inline-block px-2 py-0.5 rounded border text-[9px] font-mono uppercase tracking-widest mb-2 ${typeBadge[s.type]}`}>
              {s.type}
            </span>
            <p className="text-xs text-white/75 leading-relaxed">{s.suggestion}</p>
          </motion.div>
        ))}
      </div>

      <div className="px-5 pb-4 flex items-center gap-2">
        <Zap className="w-3.5 h-3.5 text-[#0086F9]" />
        <span className="text-[10px] font-mono text-white/40">Only you see this · customer hears nothing</span>
      </div>
    </div>
  )
}

export function FeatAIAgentAssistPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-hidden">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,134,249,1) 0px, transparent 1px, transparent 3px)',
      }} />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/features" className="hover:text-[#0086F9]">features</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">ai-agent-assist</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Brain className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">AI Features · Agent Assist</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Your best agent.<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">On every call.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              AI listens to every call in real-time and whispers the perfect response — objection handlers, compliance cues, and sentiment alerts — while the customer hears nothing.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Book a demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <WhisperPanel />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Everything AI does during your calls.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="group p-7 rounded-3xl bg-[#111B2D] border border-white/10 hover:border-[#046BD2]/40 transition relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#046BD2]/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
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
            <MessageSquare className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Coach every rep. On every call.</h2>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
              Book a demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
