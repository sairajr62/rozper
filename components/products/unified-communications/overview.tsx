'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { LaptopHero } from '@/components/products/unified-communications/laptop-hero'
import { OmniChannelInboxAnimation } from '@/components/products/unified-communications/customer-engagement'
import {
  Globe2, Phone, Video, MessageSquare, Bot, Inbox, Zap, Shield,
  ArrowRight, ChevronRight, Wifi, Plug, Layers, MapPin,
  Clock, BarChart3, UserCheck, CalendarDays, Sun, BrainCircuit, Check,
} from 'lucide-react'

const products = [
  { icon: Phone, name: 'Business Phone', desc: 'Cloud calling in 150+ countries', href: '/products/unified-communications/business-phone' },
  { icon: Video, name: 'HD Video Meetings', desc: 'AI transcripts built in', href: '/products/unified-communications/video-meetings' },
  { icon: MessageSquare, name: 'Team Chat', desc: 'Channels, DMs, file share', href: '/products/unified-communications/team-chat' },
  { icon: Bot, name: 'AI Assistant', desc: 'Live coaching on every call', href: '/products/ai-features/ai-assistant' },
  { icon: Phone, name: 'SMS & MMS', desc: 'Two-way business SMS', href: '/products/unified-communications/sms-mms' },
  { icon: Plug, name: 'Customer Engagement', desc: 'Omnichannel customer hub', href: '/products/unified-communications/customer-engagement' },
  { icon: Layers, name: 'Online Fax', desc: 'Send & receive without hardware', href: '/products/unified-communications/online-fax' },
  { icon: MessageSquare, name: 'Website Chatbot', desc: 'Convert visitors instantly', href: '/products/unified-communications/website-chatbot' },
]

const benefits = [
  'Voice, video, SMS, and chat on every seat',
  'AI Receptionist answers and qualifies 24/7',
  'CRM sync with Salesforce, HubSpot, and Zoho',
  'Extensions, hunt groups, and multi-level IVR',
  '300+ integrations available out of the box',
  'No long-term contracts — cancel anytime',
]

const sections = [
  { title: 'Every Channel in One Inbox', desc: 'Voice, SMS, WhatsApp, Instagram, Facebook, and web chat — unified for every agent. Stop switching between apps and start focusing on customers.', icon: Inbox, bullets: [{ icon: Layers, label: 'Omnichannel routing' }, { icon: Clock, label: 'Unified conversation history' }, { icon: BarChart3, label: 'Real-time analytics' }], image: '/images/ucaas-unified-inbox.png' },
  { title: 'AI That Works While You Sleep', desc: 'AI Receptionist answers calls 24/7, qualifies leads, books appointments, and routes to the right team. No more missed opportunities.', icon: BrainCircuit, bullets: [{ icon: Bot, label: '24/7 AI answering' }, { icon: UserCheck, label: 'Lead qualification' }, { icon: CalendarDays, label: 'Appointment booking' }], image: '/images/ucass-unified-ai.png' },
  { title: 'Built for Global Teams', desc: 'Local numbers in 150+ countries, carrier-grade routing, and 99.99% uptime. Your team works globally — your phone system should too.', icon: Globe2, bullets: [{ icon: MapPin, label: 'Local presence worldwide' }, { icon: Wifi, label: 'Carrier-grade network' }, { icon: Sun, label: 'Follow-the-sun support' }], image: '/images/ucass-unified-global.png' },
]

const steps = [
  { n: '1', title: 'Sign Up', desc: 'Create your account in minutes. No credit card required for the 14-day trial.' },
  { n: '2', title: 'Configure', desc: 'Set up your numbers, extensions, and call flows with our intuitive admin portal.' },
  { n: '3', title: 'Go Live', desc: 'Start making calls, hosting meetings, and messaging — all from one platform.' },
]

const faqs = [
  { q: "What plans does Rozper offer?", a: 'Starter ($12.99/user/mo), Professional ($19.99/user/mo), and Enterprise ($29.99/user/mo). Annual billing saves up to 38% — Starter as low as $7.99/user/mo. All plans include calling, extensions, voicemail, recording, IVR, SMS, video, AI Receptionist, omnichannel chat, and CRM sync.' },
  { q: 'Does Rozper work outside the USA?', a: '150+ countries with local virtual numbers, global outbound, and carrier-grade routing. Built for international teams.' },
  { q: 'Can I use my existing SIP phones?', a: 'Yes. Rozper supports all major SIP phones and PBX systems with no custom configuration.' },
  { q: 'Is there a long-term contract?', a: 'No. Month-to-month plan with a 14-day free trial — no credit card required.' },
  { q: 'How quickly can we get started?', a: 'Most teams are up and running within a day. Port existing numbers or get new ones instantly.' },
]

function AICallFlowAnimation() {
  const [cycleKey, setCycleKey] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCycleKey(k => k + 1), 10000)
    return () => clearInterval(t)
  }, [])

  const waveH = [3, 7, 11, 8, 13, 9, 12, 6, 10, 5, 8, 4]

  return (
    <motion.div
      key={cycleKey}
      className="relative w-full max-w-[440px] mx-auto lg:mx-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-20 bg-violet-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="rounded-2xl bg-[#111B2D] border border-white/10 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0c1422] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-3.5 h-3.5 text-[#0086F9]" />
            <span className="text-[11px] font-semibold text-white/65 uppercase tracking-wider">AI Receptionist</span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-[9px] font-mono text-emerald-400">Active · 02:47 AM</span>
          </div>
        </div>

        {/* Phase 1 — Incoming call */}
        <motion.div
          className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <motion.div
            className="w-8 h-8 rounded-full bg-[#0086F9]/15 border border-[#0086F9]/30 flex items-center justify-center shrink-0"
            animate={{ boxShadow: ['0 0 0 0 rgba(0,134,249,0)', '0 0 0 6px rgba(0,134,249,0.15)', '0 0 0 0 rgba(0,134,249,0)'] }}
            transition={{ duration: 1, repeat: 3, delay: 0.4 }}
          >
            <Phone className="w-3.5 h-3.5 text-[#0086F9]" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white">+1 (555) 847-2910</div>
            <div className="text-[10px] font-mono text-white/35">Inbound · 02:47 AM · AI intercepting</div>
          </div>
          <motion.div
            className="px-2 py-0.5 rounded-full bg-[#0086F9]/10 border border-[#0086F9]/25 shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <span className="text-[9px] font-mono text-[#0086F9]">Answering</span>
          </motion.div>
        </motion.div>

        {/* Phase 2 — AI speaks + waveform */}
        <motion.div
          className="px-4 py-3 border-b border-white/[0.04] space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.35 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center shrink-0">
              <BrainCircuit className="w-3 h-3 text-[#0086F9]" />
            </div>
            <div className="flex items-end gap-[2px] flex-1 h-[14px]">
              {waveH.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-full bg-[#0086F9]/60"
                  style={{ height: `${h}px` }}
                  animate={{ height: [`${h}px`, `${Math.max(2, Math.floor(h * 0.3))}px`, `${h}px`] }}
                  transition={{ duration: 0.5 + i * 0.06, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
                />
              ))}
            </div>
          </div>
          <motion.p
            className="ml-7 text-[10px] text-white/50 italic leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.4 }}
          >
            "Hi, you've reached Rozper Solutions — how can I help you today?"
          </motion.p>
        </motion.div>

        {/* Phase 3 — Lead qualification */}
        <motion.div
          className="px-4 py-3 border-b border-white/[0.04]"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 4.1, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[11px] font-semibold text-white">Lead Qualification</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-amber-400/10 border border-amber-400/25 text-amber-400">Demo request detected</span>
            <motion.span
              className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-400/10 border border-emerald-400/25 text-emerald-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.6, duration: 0.3 }}
            >
              Lead score: High
            </motion.span>
          </div>
          <motion.div
            className="mt-1.5 text-[9px] font-mono text-white/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.0, duration: 0.3 }}
          >
            CRM record created · Owner notified
          </motion.div>
        </motion.div>

        {/* Phase 4 — Appointment booked */}
        <motion.div
          className="px-4 py-3 border-b border-white/[0.04]"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 6.0, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="w-3.5 h-3.5 text-[#2D98F1] shrink-0" />
            <span className="text-[11px] font-semibold text-white">Appointment Booked</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 text-center shrink-0">
              <div className="text-[8px] font-mono text-[#2D98F1] uppercase tracking-wider">Thursday</div>
              <div className="text-base font-bold text-white leading-none">10 AM</div>
            </div>
            <div>
              <div className="text-[11px] text-white/70">Product demo · 30 min</div>
              <motion.div
                className="text-[9px] font-mono text-white/30 mt-0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6.5, duration: 0.3 }}
              >
                Calendar invite sent · Confirmation SMS
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Phase 5 — Complete */}
        <motion.div
          className="px-4 py-2.5 bg-[#0c1422] flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8.2, duration: 0.4 }}
        >
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Check className="w-2.5 h-2.5 text-emerald-400" />
          </div>
          <div className="flex gap-1.5">
            {['Answered', 'Qualified', 'Booked'].map(label => (
              <span key={label} className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">{label}</span>
            ))}
          </div>
          <span className="ml-auto text-[9px] font-mono text-white/25">0 missed</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

function GlobalNetworkAnimation() {
  const [cycleKey, setCycleKey] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCycleKey(k => k + 1), 10000)
    return () => clearInterval(t)
  }, [])

  const regions = [
    { name: 'North America', ping: 12,  uptime: 99.99, delay: 0.5 },
    { name: 'Europe',        ping: 18,  uptime: 99.99, delay: 1.1 },
    { name: 'Asia Pacific',  ping: 24,  uptime: 99.98, delay: 1.7 },
    { name: 'Middle East',   ping: 31,  uptime: 99.97, delay: 2.3 },
    { name: 'Latin America', ping: 28,  uptime: 99.99, delay: 2.9 },
  ]

  const footerDelay = 4.0

  return (
    <motion.div
      key={cycleKey}
      className="relative w-full max-w-[440px] mx-auto lg:mx-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-20 bg-emerald-500/[0.08] blur-3xl rounded-full pointer-events-none" />

      <div className="rounded-2xl bg-[#111B2D] border border-white/10 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0c1422] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Globe2 className="w-3.5 h-3.5 text-[#0086F9]" />
            <span className="text-[11px] font-semibold text-white/65 uppercase tracking-wider">Global Network</span>
          </div>
          <motion.div
            className="flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: footerDelay, duration: 0.3 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-[9px] font-mono text-emerald-400">All Systems Operational</span>
          </motion.div>
        </div>

        {/* Column labels */}
        <div className="flex items-center px-4 py-1.5 border-b border-white/[0.04]">
          <span className="flex-1 text-[8px] font-mono text-white/20 uppercase tracking-widest">Region</span>
          <span className="w-[130px] shrink-0 text-[8px] font-mono text-white/20 uppercase tracking-widest">Uptime</span>
          <span className="w-12 text-right shrink-0 text-[8px] font-mono text-white/20 uppercase tracking-widest">Ping</span>
        </div>

        {/* Region rows */}
        <div className="divide-y divide-white/[0.04]">
          {regions.map(r => (
            <motion.div
              key={r.name}
              className="flex items-center gap-3 px-4 py-3"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: r.delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Status dot */}
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: r.delay * 0.5 }}
              />

              {/* Region name */}
              <span className="flex-1 text-[11px] text-white/70 min-w-0 truncate">{r.name}</span>

              {/* Uptime bar + value */}
              <div className="w-[130px] shrink-0 flex items-center gap-2">
                <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    initial={{ width: '0%' }}
                    animate={{ width: `${r.uptime}%` }}
                    transition={{ delay: r.delay + 0.3, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                  />
                </div>
                <motion.span
                  className="text-[9px] font-mono text-emerald-400 shrink-0 w-[38px] text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: r.delay + 0.7, duration: 0.3 }}
                >
                  {r.uptime}%
                </motion.span>
              </div>

              {/* Ping */}
              <motion.span
                className="w-12 text-right text-[10px] font-mono text-[#2D98F1] shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: r.delay + 0.5, duration: 0.3 }}
              >
                {r.ping}ms
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Live health-check ping sweep */}
        <motion.div
          className="px-4 py-2 border-t border-white/[0.04] flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: footerDelay + 0.2, duration: 0.4 }}
        >
          <span className="text-[9px] font-mono text-white/25 shrink-0">Live health check</span>
          <div className="relative flex-1 h-[2px] bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full w-5 rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
              animate={{ x: [-20, 500] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: footerDelay + 0.6 }}
            />
          </div>
          <span className="text-[9px] font-mono text-emerald-400 shrink-0">OK</span>
        </motion.div>

        {/* Stats footer */}
        <motion.div
          className="px-4 py-2.5 bg-[#0c1422] border-t border-white/[0.05] flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: footerDelay + 0.5, duration: 0.4 }}
        >
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono font-bold text-[#0086F9]">150+</span>
            <span className="text-[9px] font-mono text-white/30 ml-1">countries</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400">99.99%</span>
            <span className="text-[9px] font-mono text-white/30 ml-1">uptime SLA</span>
          </div>
          <span className="ml-auto text-[9px] font-mono text-white/25">Carrier-grade routing</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function UcaasPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-white/70">home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/platform" className="hover:text-white/70">platform</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">ucaas</span>
          </div>
        </div>

        {/* Hero — 2-column */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start">

            {/* ── Left: copy ── */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#046BD2]/30 bg-[#046BD2]/5 mb-5 sm:mb-8">
                <Globe2 className="w-4 h-4 text-[#0086F9]" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wide sm:tracking-widest text-[#2D98F1] whitespace-nowrap">UCaaS · Unified Communications</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight whitespace-nowrap"
              >
                One platform.<br />
                <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent italic">Every country</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                className="mt-6 text-lg text-white/60 max-w-lg leading-relaxed"
              >
                Voice, video, messaging, and AI in one platform. One seat. One bill. One support team.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                className="mt-7 sm:mt-10 flex flex-row flex-nowrap gap-3"
              >
                <Link href="/free-trial" className="group inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold transition whitespace-nowrap">
                  Start a free trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full border border-white/15 text-sm sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap">
                  See Pricing
                </Link>
              </motion.div>

            </div>

            {/* ── Right: GSAP laptop — hidden on mobile, visible sm+ ── */}
            <div className="hidden sm:flex items-start justify-center overflow-hidden sm:h-[298px] lg:h-[397px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25, ease: 'easeOut' } }}
                className="relative"
              >
                <LaptopHero />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product orbit */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Everything on every seat.</h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">No tiers. No upcharges. Eight tools, one platform, one bill.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              >
                <Link href={p.href} className="group block p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#046BD2]/30 hover:bg-white/[0.05] transition h-full">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#046BD2]/20 to-[#2575FC]/20 border border-[#046BD2]/30 flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-[#0086F9]" />
                  </div>
                  <h3 className="font-display font-semibold mb-1 group-hover:text-[#0086F9] transition">{p.name}</h3>
                  <p className="text-sm text-white/50">{p.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* One platform feature dark */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-3xl bg-gradient-to-br from-[#111B2D] via-[#111B2D] to-[#046BD2]/15 border border-white/10 p-6 sm:p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#046BD2]/10 blur-3xl" />
            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9] mb-4">// platform</div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                  One platform.<br />
                  <span className="text-[#0086F9]">Zero compromises.</span>
                </h2>
                <p className="text-white/60 mb-8 max-w-md mx-auto lg:mx-0">Replace your patchwork of vendors with a single carrier-grade solution.</p>
                <Link href="/features" className="inline-flex items-center gap-2 text-[#0086F9] font-semibold group mx-auto lg:mx-0">
                  See all features <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="w-5 h-5 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9]" />
                    </div>
                    <span className="text-sm text-white/80">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Get started in <span className="text-[#0086F9]">minutes</span>.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <div className="font-display text-7xl font-bold bg-gradient-to-br from-[#046BD2]/30 to-[#2575FC]/10 bg-clip-text text-transparent mb-2">{s.n}</div>
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-white/60">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Alternating */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 space-y-12 sm:space-y-16 lg:space-y-24">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              <div>
                <s.icon className="w-12 h-12 text-[#0086F9] mb-6" strokeWidth={1.5} />
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">{s.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{s.desc}</p>
                <ul className="space-y-2">
                  {s.bullets.map((b) => {
                    const BulletIcon = b.icon
                    return (
                      <li key={b.label} className="flex items-center gap-3 text-white/80">
                        <BulletIcon className="w-4 h-4 text-[#0086F9] flex-shrink-0" /> {b.label}
                      </li>
                    )
                  })}
                </ul>
              </div>
              {i === 0 ? (
                <OmniChannelInboxAnimation />
              ) : i === 1 ? (
                <AICallFlowAnimation />
              ) : i === 2 ? (
                <GlobalNetworkAnimation />
              ) : s.image ? (
                <div className="relative w-full rounded-3xl overflow-hidden border border-white/10">
                  <Image
                    src={s.image}
                    alt={s.title}
                    width={2752}
                    height={1536}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-square max-w-md mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-[#046BD2]/15 to-[#0B1220] flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-8 rounded-full border border-white/5"
                  />
                  <motion.div
                    animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-16 rounded-full border border-white/10"
                  />
                  <s.icon className="w-32 h-32 text-[#0086F9]/80 relative" strokeWidth={1} />
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-12">FAQ</h2>
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

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="relative rounded-3xl overflow-hidden bg-[#070B14] border border-white/10 p-6 sm:p-6 sm:p-12 md:p-20 text-center">
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
              <Shield className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Ready to unify<br />your communications?</h2>
              <p className="mt-6 text-lg text-white/85 max-w-xl mx-auto">Start with a 14-day free trial. No credit card required. Join teams across 150+ countries.</p>
              <div className="mt-10 flex flex-row flex-nowrap justify-center gap-4">
                <Link href="/free-trial" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm sm:text-base font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition whitespace-nowrap">
                  Start a Free Trial <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-sm sm:text-base text-white font-medium transition whitespace-nowrap">
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
