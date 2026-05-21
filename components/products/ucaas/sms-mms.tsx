'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  MessageSquare, Users, Zap, Shield, BarChart3, Globe,
  ArrowRight, ChevronRight, Send,
} from 'lucide-react'

const features = [
  { icon: MessageSquare, title: 'Two-Way SMS', desc: 'Send and receive SMS from your business number — agents reply from one inbox.' },
  { icon: Users, title: 'Bulk Campaigns', desc: 'Send personalized SMS blasts to thousands of contacts with merge fields.' },
  { icon: Zap, title: 'WhatsApp Business', desc: 'Native WhatsApp Business integration — same inbox, zero switching.' },
  { icon: Shield, title: 'TCPA Compliance Tools', desc: 'Opt-out handling, consent tracking, and DNC list management built in.' },
  { icon: BarChart3, title: 'Delivery Analytics', desc: 'Real-time delivery reports, open rates, and response tracking per campaign.' },
  { icon: Globe, title: 'MMS & Rich Media', desc: 'Send images, PDFs, and rich media — supported in 30+ countries.' },
]

const faqs = [
  { q: 'Can customers reply to bulk SMS?', a: 'Yes. Replies route to the shared inbox where any agent can respond, or trigger automated flows.' },
  { q: 'Is WhatsApp included?', a: 'Yes. WhatsApp Business API is fully integrated — no separate account or meta setup needed.' },
  { q: 'How does TCPA compliance work?', a: 'Opt-out keywords (STOP, UNSUBSCRIBE) are auto-processed. Consent timestamps are stored and exportable.' },
]

const messages = [
  { from: 'customer', text: 'Hi, I\'d like to upgrade my plan. Can someone help?', time: '10:42 AM' },
  { from: 'agent', text: 'Hi Sarah! Happy to help. Which plan are you currently on?', time: '10:43 AM' },
  { from: 'customer', text: 'I\'m on the Starter — thinking about moving to Business.', time: '10:43 AM' },
  { from: 'agent', text: 'Great choice. I can upgrade you right now and prorate the difference. Ready?', time: '10:44 AM' },
  { from: 'customer', text: 'Yes please!', time: '10:44 AM' },
]

function SMSConversation() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[10px] font-bold text-[#2D98F1]">
          SC
        </div>
        <div>
          <div className="text-xs font-medium text-white">Sarah Chen</div>
          <div className="text-[10px] font-mono text-[#0086F9]">+1 (415) 555-0182 · SMS</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400">Live</span>
        </div>
      </div>

      <div className="p-5 space-y-3 min-h-[260px]">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
            className={`flex ${m.from === 'agent' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
              m.from === 'agent'
                ? 'bg-[#046BD2] text-white rounded-br-sm'
                : 'bg-white/[0.06] border border-white/8 text-white/80 rounded-bl-sm'
            }`}>
              {m.text}
              <div className={`text-[9px] mt-1 ${m.from === 'agent' ? 'text-white/50' : 'text-white/30'}`}>{m.time}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-white/10 flex items-center gap-3">
        <div className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/8 text-xs text-white/30 font-mono">
          Type a reply…
        </div>
        <button className="w-9 h-9 rounded-xl bg-[#046BD2] flex items-center justify-center hover:bg-[#0086F9] transition">
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="px-5 py-3 bg-[#0B1220] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/30">
        <span>Campaign: Plan Upgrade · 2,841 sent</span>
        <span className="text-emerald-400">97.2% delivered</span>
      </div>
    </div>
  )
}

export function ProdUCaaSSMSMMSPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-hidden">
      <Navbar />

      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#046BD2]/8 blur-[140px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/ucaas" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">sms-mms</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <MessageSquare className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · SMS & MMS</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Messaging built<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">for business scale</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Two-way SMS, MMS, bulk campaigns, and WhatsApp — all from your business number, all in one inbox. TCPA compliance included.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Start messaging <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">See pricing</Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <SMSConversation />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Every messaging channel, one platform.</h2>
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
          <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <MessageSquare className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Text your customers. Win their loyalty.</h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/15 border border-white/30 text-white font-semibold hover:bg-white/25 transition">See pricing</Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
                Start messaging <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
