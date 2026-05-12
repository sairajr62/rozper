'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Inbox, Phone, MessageSquare, Globe, Zap, BarChart3,
  ArrowRight, ChevronRight, Instagram, Twitter,
} from 'lucide-react'

const features = [
  { icon: Inbox, title: 'Unified Inbox', desc: 'Every channel — voice, SMS, WhatsApp, chat, social — in one agent inbox.' },
  { icon: Phone, title: 'Voice + Digital Routing', desc: 'Route calls and messages to the same queue with priority and skills-based logic.' },
  { icon: Globe, title: 'WhatsApp Business', desc: 'Native WhatsApp Business API — reply to customers where they prefer.' },
  { icon: Zap, title: 'Auto-Response Flows', desc: 'Trigger AI or templated responses when agents are unavailable — no customer left waiting.' },
  { icon: BarChart3, title: 'Cross-Channel Analytics', desc: 'Response time, CSAT, and volume across every channel in one dashboard.' },
  { icon: MessageSquare, title: 'Instagram & Facebook DM', desc: 'Manage Instagram DMs and Facebook Messenger alongside voice from one screen.' },
]

const faqs = [
  { q: 'Which channels are supported?', a: 'Voice, SMS, MMS, WhatsApp, Facebook Messenger, Instagram DM, live chat, and email — all in one inbox.' },
  { q: 'Can agents handle voice and chat at the same time?', a: 'Yes. The unified inbox shows all channels — agents can manage concurrent chats while on calls.' },
  { q: 'Does it include an AI chatbot?', a: 'Yes. AI chatbot handles FAQs, captures leads, and escalates to agents when needed — on every channel.' },
]

const channelTabs = [
  { id: 'voice', label: 'Voice', icon: Phone, color: 'text-[#0086F9]', count: 3 },
  { id: 'sms', label: 'SMS', icon: MessageSquare, color: 'text-emerald-400', count: 7 },
  { id: 'ig', label: 'Instagram', icon: Instagram, color: 'text-amber-400', count: 2 },
  { id: 'tw', label: 'Twitter', icon: Twitter, color: 'text-[#2D98F1]', count: 1 },
]

const conversations = [
  { name: 'Aisha K.', channel: 'SMS', preview: 'Can I change my delivery address?', time: '2m', unread: true },
  { name: 'Ben Torres', channel: 'Instagram', preview: 'Loved the product! Quick question…', time: '5m', unread: true },
  { name: 'Claire M.', channel: 'Voice', preview: 'Call ended · 4:12 · Resolved', time: '8m', unread: false },
  { name: 'David S.', channel: 'SMS', preview: 'I need to cancel my order', time: '11m', unread: false },
]

const channelColor: Record<string, string> = {
  SMS: 'text-emerald-400',
  Instagram: 'text-amber-400',
  Voice: 'text-[#0086F9]',
  Twitter: 'text-[#2D98F1]',
}

function UnifiedInboxUI() {
  const [activeTab, setActiveTab] = useState('sms')

  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Inbox className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Unified Inbox · All Channels</span>
        </div>
        <span className="text-[10px] font-mono text-amber-400">13 open</span>
      </div>

      {/* Channel tabs */}
      <div className="flex border-b border-white/5">
        {channelTabs.map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-mono transition border-b-2 ${activeTab === tab.id ? `${tab.color} border-current` : 'text-white/30 border-transparent hover:text-white/50'}`}>
              <Icon className="w-3 h-3" />
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-1 rounded text-[9px] ${activeTab === tab.id ? 'bg-current/20' : 'bg-white/10 text-white/30'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="divide-y divide-white/5">
        {conversations.map((conv, i) => (
          <motion.div key={conv.name} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
            className="px-5 py-3.5 flex items-center gap-3 hover:bg-white/[0.02] transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-[#046BD2]/15 border border-[#046BD2]/20 flex items-center justify-center text-[10px] font-bold text-[#2D98F1] flex-shrink-0">
              {conv.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-[9px] font-mono ${channelColor[conv.channel]}`}>{conv.channel}</span>
                <span className="text-xs font-medium text-white">{conv.name}</span>
              </div>
              <div className={`text-xs truncate ${conv.unread ? 'text-white/70' : 'text-white/35'}`}>{conv.preview}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-[10px] font-mono text-white/25">{conv.time}</div>
              {conv.unread && <div className="w-2 h-2 rounded-full bg-[#0086F9] ml-auto mt-1" />}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-white/10 text-[10px] font-mono text-white/30">
        Voice · SMS · WhatsApp · Instagram · Facebook — one screen
      </div>
    </div>
  )
}

export function ProdUCaaSCustomerEngagementPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-hidden">
      <Navbar />

      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#046BD2]/7 blur-[140px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/ucaas" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">customer-engagement</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Inbox className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · Customer Engagement</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Every channel,<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">one inbox</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Voice, SMS, WhatsApp, Instagram, Facebook, and web chat — unified for every agent. No tool-switching, no context loss, no missed conversations.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Unify your channels <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <UnifiedInboxUI />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Meet customers where they are.</h2>
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
            <Inbox className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">One inbox. Every customer.</h2>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
              Unify your channels <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
