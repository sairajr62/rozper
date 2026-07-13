'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Inbox, PhoneForwarded, MessageSquare, Smartphone, Bot, BarChart3,
  Share2, ArrowRight, ChevronRight, Instagram, Twitter,
  RefreshCw, UserCheck, Workflow, Route, Activity, Users,
} from 'lucide-react'

const features = [
  { icon: Inbox, title: 'Unified Inbox', desc: 'Every channel — voice, SMS, WhatsApp, chat, social — in one agent inbox.' },
  { icon: PhoneForwarded, title: 'Voice + Digital Routing', desc: 'Route calls and messages to the same queue with priority and skills-based logic.' },
  { icon: Smartphone, title: 'WhatsApp Business', desc: 'Native WhatsApp Business API — reply to customers where they prefer.' },
  { icon: Bot, title: 'Auto-Response Flows', desc: 'Trigger AI or templated responses when agents are unavailable — no customer left waiting.' },
  { icon: BarChart3, title: 'Cross-Channel Analytics', desc: 'Response time, CSAT, and volume across every channel in one dashboard.' },
  { icon: Share2, title: 'Instagram & Facebook DM', desc: 'Manage Instagram DMs and Facebook Messenger alongside voice from one screen.' },
]

const faqs = [
  { q: 'Which channels are supported?', a: 'Voice, SMS, MMS, WhatsApp, Facebook Messenger, Instagram DM, live chat, and email — all in one inbox.' },
  { q: 'Can agents handle voice and chat at the same time?', a: 'Yes. The unified inbox shows all channels — agents can manage concurrent chats while on calls.' },
  { q: 'Does it include an AI chatbot?', a: 'Yes. AI chatbot handles FAQs, captures leads, and escalates to agents when needed — on every channel.' },
]

const crmConnected = [
  { icon: RefreshCw, title: 'Auto-synced to your CRM', desc: 'Every interaction syncs automatically to Salesforce, HubSpot, Zoho, and Zendesk.' },
  { icon: UserCheck, title: 'Instant customer context', desc: 'Customer profiles surface instantly — name, history, open tickets — before the agent types a word.' },
  { icon: Workflow, title: 'Automations from the inbox', desc: 'Trigger automations: follow-up SMS, ticket creation, status updates — all from the inbox.' },
]

const queueManagement = [
  { icon: Route, title: 'Smart routing by priority', desc: 'Set routing rules by skill, priority, or customer value, so your best agents handle your best accounts automatically. Overflow rules kick in before wait times spike, redirecting conversations to the next available agent. You define the logic once; the system runs it every time.' },
  { icon: Activity, title: 'Live queue monitoring', desc: 'Supervisors watch live queue depth and average response time from one screen, across every channel. Alerts fire when a conversation sits too long without a reply. You catch the bottleneck before the customer complains about it.' },
  { icon: Users, title: 'Team-level demand reporting', desc: "Team-level reporting shows which channels are overloaded and which agents are underused, week over week. You staff shifts based on actual demand, not guesswork. It's the data you need to justify your next hire." },
]

const channelTabs = [
  { id: 'voice', label: 'Voice', icon: PhoneForwarded, color: 'text-[#0086F9]', count: 3 },
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

export function OmniChannelInboxAnimation() {
  const [cycleKey, setCycleKey] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCycleKey(k => k + 1), 10000)
    return () => clearInterval(t)
  }, [])

  const channels = [
    {
      id: 'voice',     label: 'Voice',
      textCls: 'text-[#0086F9]',   dotCls: 'bg-[#0086F9]',
      pillCls: 'text-[#0086F9] border-[#0086F9]/25 bg-[#0086F9]/[0.08]',
      avatarCls: 'bg-[#0086F9]/10 text-[#0086F9]',  barCls: 'bg-[#0086F9]',
      name: 'Sarah K.',    initials: 'SK',
      preview: 'Can I speak to billing?',  time: 'just now', unread: true,  delay: 0.5,
    },
    {
      id: 'sms',       label: 'SMS',
      textCls: 'text-emerald-400', dotCls: 'bg-emerald-400',
      pillCls: 'text-emerald-400 border-emerald-400/25 bg-emerald-400/[0.08]',
      avatarCls: 'bg-emerald-400/10 text-emerald-400', barCls: 'bg-emerald-400',
      name: 'Mike R.',     initials: 'MR',
      preview: 'Need to change my delivery date', time: '1m', unread: true,  delay: 1.9,
    },
    {
      id: 'whatsapp',  label: 'WhatsApp',
      textCls: 'text-green-400',   dotCls: 'bg-green-400',
      pillCls: 'text-green-400 border-green-400/25 bg-green-400/[0.08]',
      avatarCls: 'bg-green-400/10 text-green-400',   barCls: 'bg-green-400',
      name: 'Priya L.',    initials: 'PL',
      preview: 'Order #4821 status update?', time: '2m',      unread: true,  delay: 3.3,
    },
    {
      id: 'instagram', label: 'Instagram',
      textCls: 'text-amber-400',   dotCls: 'bg-amber-400',
      pillCls: 'text-amber-400 border-amber-400/25 bg-amber-400/[0.08]',
      avatarCls: 'bg-amber-400/10 text-amber-400',   barCls: 'bg-amber-400',
      name: '@jay.brands', initials: 'JB',
      preview: 'Loved the product! Quick q…', time: '3m',      unread: true,  delay: 4.7,
    },
    {
      id: 'facebook',  label: 'Facebook',
      textCls: 'text-[#2D98F1]',   dotCls: 'bg-[#2D98F1]',
      pillCls: 'text-[#2D98F1] border-[#2D98F1]/25 bg-[#2D98F1]/[0.08]',
      avatarCls: 'bg-[#2D98F1]/10 text-[#2D98F1]',  barCls: 'bg-[#2D98F1]',
      name: 'Carlos M.',   initials: 'CM',
      preview: 'Is there a promo code available?', time: '5m', unread: false, delay: 6.1,
    },
  ]

  const statsDelay = 7.6

  return (
    <motion.div
      key={cycleKey}
      className="relative w-full max-w-[440px] mx-auto lg:mx-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-20 bg-[#046BD2]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="rounded-2xl bg-[#111B2D] border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0c1422] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Inbox className="w-3.5 h-3.5 text-[#0086F9]" />
            <span className="text-[11px] font-semibold text-white/65 uppercase tracking-wider">Unified Inbox</span>
            <span className="text-[10px] font-mono text-white/20">· All Channels</span>
          </div>
          <motion.div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: statsDelay, duration: 0.3 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[9px] font-mono text-amber-400">12 open</span>
          </motion.div>
        </div>

        {/* Channel pills — light up as each channel comes online */}
        <div className="flex flex-wrap gap-1.5 px-4 py-2 border-b border-white/[0.04]">
          {channels.map(ch => (
            <motion.div
              key={ch.id}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono shrink-0 border ${ch.pillCls}`}
              initial={{ opacity: 0.15 }}
              animate={{ opacity: 1 }}
              transition={{ delay: ch.delay + 0.15, duration: 0.3 }}
            >
              <div className={`w-1 h-1 rounded-full ${ch.dotCls}`} />
              {ch.label}
            </motion.div>
          ))}
        </div>

        {/* Conversation rows */}
        <div className="divide-y divide-white/[0.04]">
          {channels.map(ch => (
            <motion.div
              key={ch.id}
              className="relative flex items-center gap-3 px-4 py-3 overflow-hidden"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: ch.delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Left channel colour bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${ch.barCls}`} />

              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[9px] font-bold shrink-0 ${ch.avatarCls}`}>
                {ch.initials}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[9px] font-mono ${ch.textCls}`}>{ch.label}</span>
                  <span className="text-xs font-medium text-white truncate">{ch.name}</span>
                </div>
                <div className="relative h-[16px]">
                  {/* Typing indicator — fades out when message arrives */}
                  <motion.div
                    className="absolute inset-0 flex items-center gap-[3px]"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: ch.delay + 0.65, duration: 0.15 }}
                  >
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-[5px] h-[5px] rounded-full bg-white/25"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </motion.div>
                  {/* Message preview */}
                  <motion.span
                    className="absolute inset-0 flex items-center text-[11px] text-white/50 truncate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: ch.delay + 0.65, duration: 0.25 }}
                  >
                    {ch.preview}
                  </motion.span>
                </div>
              </div>

              {/* Time + unread dot */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[9px] font-mono text-white/25">{ch.time}</span>
                {ch.unread && <div className={`w-1.5 h-1.5 rounded-full ${ch.dotCls}`} />}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats footer */}
        <motion.div
          className="px-4 py-2.5 bg-[#0c1422] border-t border-white/[0.05] flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: statsDelay, duration: 0.4 }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[9px] font-mono text-white/30">5 channels live</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono font-bold text-[#0086F9]">12</span>
            <span className="text-[9px] font-mono text-white/30 ml-1">conversations</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400">2</span>
            <span className="text-[9px] font-mono text-white/30 ml-1">AI-handled</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function ProdUCaaSCustomerEngagementPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative overflow-hidden">
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#046BD2]/7 blur-[140px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/unified-communications/" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">customer-engagement</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-8 sm:pb-16 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-10 items-center">
          <div className="w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-5 sm:mb-6">
              <Inbox className="w-3.5 h-3.5 text-[#0086F9] shrink-0" />
              <span className="text-xs font-mono uppercase tracking-wide text-[#2D98F1]">UCaaS · Customer Engagement</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Every channel,<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">one inbox</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-4 sm:mt-5 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
              Voice, SMS, WhatsApp, Instagram, Facebook, and web chat — unified for every agent. No tool-switching, no context loss, no missed conversations.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-6 sm:mt-8 flex flex-row flex-wrap gap-3">
              <Link href="/contact/" className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-xs sm:text-base text-white font-semibold transition whitespace-nowrap">
                Unify your channels <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing/" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full border border-white/15 text-xs sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap">See pricing</Link>
            </motion.div>
          </div>

          <OmniChannelInboxAnimation />
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Meet customers where they are.</h2>
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
                  <p className="text-sm text-white/65 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">CRM-connected from day one.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {crmConnected.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#111B2D] border border-white/[0.07] hover:border-[#046BD2]/30 transition-colors group"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-all mt-0.5">
                  <it.icon className="w-4 h-4 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-[#0086F9] transition-colors">{it.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{it.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Queue management that keeps SLAs on track.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {queueManagement.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#111B2D] border border-white/[0.07] hover:border-[#046BD2]/30 transition-colors group"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-all mt-0.5">
                  <it.icon className="w-4 h-4 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-[#0086F9] transition-colors">{it.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{it.desc}</p>
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
          <div className="relative rounded-3xl overflow-hidden bg-[#0B1220] border border-white/10 p-6 sm:p-12 md:p-20 text-center">
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
              <Inbox className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">One inbox. Every customer.</h2>
              <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
                <Link href="/contact/" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-xs sm:text-base font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition whitespace-nowrap">
                  Unify your channels <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing/" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-xs sm:text-base text-white font-semibold transition whitespace-nowrap">See pricing</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      </div>
    </main>
  )
}
