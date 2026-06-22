'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Headphones, ClipboardCheck, MessageCircle, TrendingUp, ShieldAlert, Mail,
  ArrowRight, ChevronRight, Sparkles,
} from 'lucide-react'

const features = [
  { icon: Headphones, title: 'Live Call Coaching', desc: 'AI whispers objection handlers and product info to agents mid-call — invisible to the customer.' },
  { icon: ClipboardCheck, title: 'Auto Call Summaries', desc: 'Every call summarized with action items, topics, and next steps — zero manual notes.' },
  { icon: MessageCircle, title: 'Suggested Replies', desc: 'AI suggests the next best response based on conversation context and your knowledge base.' },
  { icon: TrendingUp, title: 'Performance Insights', desc: 'Trend reports on talk ratios, objection patterns, and winning call behaviors per rep.' },
  { icon: ShieldAlert, title: 'Compliance Alerts', desc: 'Real-time flagging of prohibited language, missing disclosures, and policy violations.' },
  { icon: Mail, title: 'Draft Email Follow-ups', desc: 'Post-call email drafts generated from the summary — agents send, AI writes.' },
]

const faqs = [
  { q: 'Can I customize the knowledge base?', a: 'Yes. Upload your playbooks, FAQs, and product docs — AI uses them to surface relevant answers in real time.' },
  { q: 'Does it work on inbound and outbound calls?', a: 'Yes. Live coaching runs on all calls — inbound, outbound, and transfers.' },
  { q: 'How do agents see suggestions?', a: 'Suggestions appear in a sidebar panel on the agent\'s screen — invisible to the customer, real-time.' },
]

const suggestions = [
  {
    type: 'Objection Handle',
    label: 'Price too high',
    text: '"Most customers on our Business plan save 40% versus running 3 separate tools. Want me to show you a quick comparison?"',
    color: 'border-amber-400/40 bg-amber-400/5',
    badge: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  },
  {
    type: 'Product Info',
    label: 'Porting timeline',
    text: '"Number porting typically takes 7–14 business days. We handle all the paperwork with your current carrier."',
    color: 'border-[#046BD2]/40 bg-[#046BD2]/5',
    badge: 'text-[#0086F9] bg-[#046BD2]/10 border-[#046BD2]/20',
  },
  {
    type: 'Next Action',
    label: 'Ready to close',
    text: '"Would you like to start with a 14-day trial today? I can have your numbers active within the hour."',
    color: 'border-emerald-400/40 bg-emerald-400/5',
    badge: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
]

function AIAssistantPanel() {
  const [active, setActive] = useState(0)

  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">AI Assistant · Agent View</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#046BD2]/15 border border-[#046BD2]/25">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9] animate-pulse" />
          <span className="text-[10px] font-mono text-[#0086F9]">Live</span>
        </div>
      </div>

      {/* Live waveform */}
      <div className="px-5 pt-4 pb-3">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">Current call · 3:47</div>
        <div className="flex items-end gap-0.5 h-8">
          {Array.from({ length: 36 }).map((_, i) => (
            <motion.div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-[#046BD2] to-[#0086F9]"
              animate={{ height: `${15 + Math.abs(Math.sin(i * 0.6)) * 85}%` }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.04 }} />
          ))}
        </div>
      </div>

      <div className="px-5 pb-4">
        <div className="text-[10px] font-mono text-[#0086F9]/60 uppercase tracking-widest mb-3">AI Suggestions</div>
        <div className="space-y-2.5">
          {suggestions.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              onClick={() => setActive(i)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition ${active === i ? s.color : 'bg-white/[0.02] border-white/8 hover:border-white/15'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded border text-[9px] font-mono ${active === i ? s.badge : 'text-white/30 bg-white/5 border-white/10'}`}>
                  {s.type}
                </span>
                <span className="text-[10px] font-mono text-white/40">{s.label}</span>
              </div>
              {active === i && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-white/75 leading-relaxed font-mono italic">
                  {s.text}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-white/10 bg-[#0B1220]">
        <div className="text-[10px] font-mono text-white/30 mb-1.5">Post-call summary · auto-generating</div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-[#046BD2] to-[#0086F9] rounded-full"
            animate={{ width: ['0%', '78%'] }}
            transition={{ duration: 2, ease: 'easeOut' }} />
        </div>
      </div>
    </div>
  )
}

export function ProdUCaaSAIAssistantPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#046BD2]/8 blur-[140px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/unified-communications" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">ai-assistant</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start">
          <div className="w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-6 sm:mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · AI Assistant</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              AI for every<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">team member</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-5 sm:mt-6 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
              Per-seat AI that coaches live, writes summaries, and surfaces the right answer — on every call and message. Works before your team arrives and after they log off.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-8 sm:mt-10 flex flex-row flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-xs sm:text-base text-white font-semibold transition whitespace-nowrap">
                See AI in action <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full border border-white/15 text-xs sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap">See pricing</Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} className="w-full">
            <AIAssistantPanel />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">AI that makes every rep your best rep.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#111B2D] border border-white/[0.07] hover:border-[#046BD2]/30 transition-colors group"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-all mt-0.5">
                  <f.icon className="w-4 h-4 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-[#0086F9] transition-colors">{f.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
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
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">Smarter calls. Every time.</h2>
            <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white text-[#046BD2] text-xs sm:text-base font-semibold hover:scale-105 transition whitespace-nowrap">
                See AI in action <ArrowRight className="w-4 h-4" />
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
