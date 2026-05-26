'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Layers, Phone, MessageSquare, Globe, Zap, BarChart3,
  ArrowRight, ChevronRight, Inbox,
} from 'lucide-react'
import { OmnichannelIllustration } from '@/components/ui/omnichannel-illustration'
import { ChannelCollapseAnimation } from '@/components/ui/channel-collapse-animation'

const features = [
  { icon: Layers, title: 'Unified Agent Desktop', desc: 'Every channel — voice, chat, SMS, social, email — in one screen with full CRM context.' },
  { icon: Phone, title: 'Voice + Digital Routing', desc: 'Route voice and digital contacts to the same queue with skills-based logic.' },
  { icon: Zap, title: 'AI Channel Selection', desc: 'AI routes customers to the fastest channel based on intent, history, and agent availability.' },
  { icon: Globe, title: 'Social & WhatsApp', desc: 'Instagram, Facebook, Twitter DMs, and WhatsApp Business — natively integrated.' },
  { icon: MessageSquare, title: 'Email Queuing', desc: 'Email enters the same queue as calls — SLA tracked, assigned, and resolved in one place.' },
  { icon: BarChart3, title: 'Cross-Channel Analytics', desc: 'CSAT, resolution rate, and handle time across every channel in a unified report.' },
]

const faqs = [
  { q: 'Can agents handle multiple channels simultaneously?', a: 'Yes. The unified desktop shows all active conversations — agents manage concurrent chats while on a call.' },
  { q: 'Is context preserved when switching channels?', a: 'Yes. CRM history, previous interactions, and sentiment carry across every channel — no re-introduction needed.' },
  { q: 'Which social channels are supported?', a: 'Instagram DMs, Facebook Messenger, Twitter/X DMs, and WhatsApp Business — all in the same inbox.' },
]

const channels = [
  { icon: Phone, label: 'Voice', count: 4, color: 'text-[#0086F9] bg-[#046BD2]/10 border-[#046BD2]/20' },
  { icon: MessageSquare, label: 'SMS/Chat', count: 9, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { icon: Globe, label: 'WhatsApp', count: 3, color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  { icon: Inbox, label: 'Email', count: 7, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
]

const conversations = [
  { name: 'Rosa M.', channel: 'Voice', msg: 'Inbound · Billing queue · 2:14', agent: 'Priya N.', urgent: true },
  { name: 'James W.', channel: 'Chat', msg: 'Needs upgrade help → Auto-routed to Sales', agent: 'Marcus L.', urgent: false },
  { name: 'Anya K.', channel: 'WhatsApp', msg: '"When will my order ship?"', agent: 'AI Bot', urgent: false },
  { name: 'Tom B.', channel: 'Email', msg: 'Complaint re: invoice #44821', agent: 'Layla H.', urgent: true },
]

const channelBadge: Record<string, string> = {
  Voice: 'text-[#0086F9] bg-[#046BD2]/10 border-[#046BD2]/20',
  Chat: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  WhatsApp: 'text-green-400 bg-green-400/10 border-green-400/20',
  Email: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
}

function OmnichannelInbox() {
  const [active, setActive] = useState('all')

  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Omnichannel Inbox · 23 open</span>
        </div>
        <span className="text-[10px] font-mono text-amber-400">2 urgent</span>
      </div>

      {/* Channel filters */}
      <div className="p-3 border-b border-white/5 flex gap-2 flex-wrap">
        <button onClick={() => setActive('all')} className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition border ${active === 'all' ? 'bg-[#046BD2] border-[#046BD2] text-white' : 'bg-white/[0.03] border-white/8 text-white/40 hover:border-white/20'}`}>
          All · 23
        </button>
        {channels.map(ch => {
          const Icon = ch.icon
          return (
            <button key={ch.label} onClick={() => setActive(ch.label)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono transition border ${active === ch.label ? `${ch.color}` : 'bg-white/[0.03] border-white/8 text-white/40 hover:border-white/20'}`}>
              <Icon className="w-3 h-3" />
              {ch.label} · {ch.count}
            </button>
          )
        })}
      </div>

      <div className="divide-y divide-white/5">
        {conversations.map((conv, i) => (
          <motion.div key={conv.name} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
            className={`px-5 py-3.5 flex items-center gap-3 hover:bg-white/[0.02] transition cursor-pointer ${conv.urgent ? 'bg-red-400/[0.03]' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-[#046BD2]/15 border border-[#046BD2]/20 flex items-center justify-center text-[10px] font-bold text-[#2D98F1] flex-shrink-0">
              {conv.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                {conv.urgent && <div className="w-1.5 h-1.5 rounded-full bg-red-400" />}
                <span className="text-xs font-medium text-white">{conv.name}</span>
                <span className={`px-1.5 py-0.5 rounded border text-[9px] font-mono ${channelBadge[conv.channel]}`}>{conv.channel}</span>
              </div>
              <div className="text-[10px] text-white/40 truncate">{conv.msg}</div>
            </div>
            <div className="text-[9px] font-mono text-white/25 flex-shrink-0">{conv.agent}</div>
          </motion.div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-white/10 text-[10px] font-mono text-white/30">
        Voice · SMS · Chat · Email · WhatsApp · Social — one screen
      </div>
    </div>
  )
}

export function ProdCCOmnichannelPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-hidden">
      <Navbar />

      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#046BD2]/7 blur-[140px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/contact-center" className="hover:text-[#0086F9]">contact-center</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">omnichannel</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Layers className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Contact Center · Omnichannel</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Every channel.<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">One screen</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Voice, chat, social, and SMS unified — with AI routing and full CRM context on every conversation. Your agents never need to switch tools again.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-row flex-nowrap gap-2 sm:gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold transition whitespace-nowrap">
                Unify your contact center <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full border border-white/15 text-sm sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap">See pricing</Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="w-full">
            <OmnichannelIllustration />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Meet customers where they are.</h2>
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
          <div className="relative rounded-[2.5rem] overflow-hidden p-6 sm:p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <Layers className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">All channels. One contact center.</h2>
            <div className="mt-10 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-white text-[#046BD2] text-sm sm:text-base font-semibold hover:scale-105 transition whitespace-nowrap">
                Unify your contact center <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-white/15 border border-white/30 text-sm sm:text-base text-white font-semibold hover:bg-white/25 transition whitespace-nowrap">See pricing</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
