'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  PhoneCall, PhoneIncoming, ClipboardList, Bot, Workflow,
  Phone, Zap, TrendingUp,
  ArrowRight, ChevronRight, RefreshCw, Check, CircleDot,
} from 'lucide-react'

const features = [
  { icon: PhoneCall, title: 'Click-to-Call', desc: 'Click-to-call any HubSpot contact, company, or deal — directly from the record.' },
  { icon: PhoneIncoming, title: 'Caller ID Match', desc: 'HubSpot contact record opens automatically when an inbound call arrives.' },
  { icon: ClipboardList, title: 'Auto-Logging', desc: 'Duration, recording, transcript, and disposition logged to HubSpot timeline automatically.' },
  { icon: Bot, title: 'AI Summaries', desc: 'AI call summary posted to HubSpot within seconds of hang-up — no manual notes.' },
  { icon: Workflow, title: 'Deal Automation', desc: 'Advance deal stages, create tasks, and trigger sequences from call outcomes.' },
]

const detail = [
  { title: 'Embedded Widget', desc: 'Calling widget lives inside HubSpot — zero tab switching, zero context loss.' },
  { title: 'Full Hub Support', desc: 'Works with CRM, Sales Hub, Service Hub, and Marketing Hub.' },
  { title: 'Custom Properties', desc: 'All Rozper data flows into HubSpot custom properties — fully mappable, no dev needed.' },
]

const stats = [
  { v: '100%', k: 'Calls Auto-Logged' },
  { v: '<10 min', k: 'Setup Time' },
  { v: '0', k: 'Tab Switching' },
  { v: '4', k: 'Hubs Supported' },
]

const faqs = [
  { q: 'Does it work with HubSpot Free?', a: 'Yes. Integration works on Free through Enterprise tiers.' },
  { q: 'Can it trigger HubSpot sequences?', a: 'Yes. Enroll sequences, email workflows, and notifications from call outcomes.' },
  { q: 'Complex setup?', a: 'No. Connect under 10 minutes from Rozper admin panel — no developer needed.' },
]

const syncFlow = [
  { step: '01', label: 'Call initiated', detail: 'Click any phone number inside HubSpot to dial', side: 'hubspot' },
  { step: '02', label: 'Contact pops', detail: 'Caller ID matched — full contact history loaded instantly', side: 'rozper' },
  { step: '03', label: 'Call recorded', detail: 'Recording, transcript captured in real time', side: 'rozper' },
  { step: '04', label: 'AI summary written', detail: 'Summary generated and posted within seconds of hang-up', side: 'ai' },
  { step: '05', label: 'Deal advanced', detail: 'Stage updated, task created, sequence triggered — automatically', side: 'hubspot' },
]

const sideColors: Record<string, string> = {
  hubspot: 'text-[#0086F9] bg-[#046BD2]/15 border-[#046BD2]/30',
  rozper: 'text-[#2D98F1] bg-[#0086F9]/10 border-[#0086F9]/20',
  ai: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
}

const sideLabel: Record<string, string> = {
  hubspot: 'HubSpot',
  rozper: 'Rozper',
  ai: 'AI',
}

function HubSpotWidgetAnimation() {
  const [cycleKey, setCycleKey] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCycleKey(k => k + 1), 9000)
    return () => clearInterval(t)
  }, [])

  const waveH = [4, 8, 13, 10, 15, 9, 12, 7, 11, 6]

  const timeline = [
    { Icon: Phone,      label: 'Call · 14m 22s · Recorded', color: 'text-[#0086F9]',   delay: 5.8 },
    { Icon: Zap,        label: 'AI Summary posted',          color: 'text-emerald-400',  delay: 6.4 },
    { Icon: TrendingUp, label: 'Deal moved → Proposal',      color: 'text-[#2D98F1]',   delay: 7.1 },
  ]

  return (
    <motion.div
      key={cycleKey}
      className="relative w-full max-w-[440px] mx-auto lg:mx-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Ambient glow */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-20 bg-[#046BD2]/10 blur-3xl rounded-full pointer-events-none" />

      {/* HubSpot CRM Record Card */}
      <motion.div
        className="relative rounded-2xl bg-[#111B2D] border border-white/10 overflow-hidden"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Brand header bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0c1422] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#FF7A59]/15 border border-[#FF7A59]/25 flex items-center justify-center">
              <span className="text-[9px] font-black text-[#FF7A59]">H</span>
            </div>
            <span className="text-[11px] font-semibold text-white/65 uppercase tracking-wider">HubSpot CRM</span>
            <span className="text-[10px] font-mono text-white/20">· Contact</span>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/10" />)}
          </div>
        </div>

        {/* Contact row */}
        <div className="flex items-center gap-3 px-4 pt-2 pb-2 border-b border-white/[0.06]">
          <div className="w-9 h-9 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[#2D98F1] text-xs font-bold shrink-0">EB</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white">Elliot Barnes</div>
            <div className="text-[10px] font-mono text-white/35 truncate">Sales Manager · Pivot Growth Agency</div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#046BD2] text-white text-[11px] font-semibold shrink-0">
            <Phone className="w-3 h-3" /><span>Call</span>
          </div>
        </div>

        {/* Deal Pipeline */}
        <div className="px-4 py-2 border-b border-white/[0.06]">
          <div className="text-[9px] font-mono uppercase tracking-widest text-white/25 mb-2">Deal Pipeline</div>
          <div className="flex gap-1.5 mb-1">
            {['Prospect', 'Demo', 'Proposal', 'Closed'].map((s, i) => (
              <div key={s} className="flex-1 flex flex-col gap-1">
                {i < 2 ? (
                  <div className="h-1.5 rounded-full bg-[#046BD2]" />
                ) : i === 2 ? (
                  <motion.div
                    className="h-1.5 rounded-full"
                    initial={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
                    animate={{ backgroundColor: '#0086F9' }}
                    transition={{ delay: 7.2, duration: 0.6 }}
                  />
                ) : (
                  <div className="h-1.5 rounded-full bg-white/[0.07]" />
                )}
                <span className="text-[8px] font-mono text-white/20 truncate">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Rozper calling widget */}
        <div className="mx-3 my-2 rounded-xl bg-[#0B1220] border border-[#046BD2]/40 overflow-hidden">
          {/* Widget header */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#046BD2]/20 border-b border-[#046BD2]/30">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#0086F9]"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.2, repeat: 5, delay: 0.4 }}
            />
            <span className="text-[9px] font-mono text-[#2D98F1] uppercase tracking-widest">Rozper · Embedded</span>
            <span className="ml-auto text-[8px] font-mono text-white/25">no tab switching</span>
          </div>

          {/* Phase container — fixed height, phases overlap via absolute */}
          <div className="relative h-[44px] overflow-hidden">

            {/* Phase 1: Screen pop (0.2 → 1.8s) */}
            <motion.div
              className="absolute inset-0 flex items-center gap-2.5 px-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 0.2, times: [0, 0.05, 0.72, 1], duration: 1.6 }}
            >
              <div className="w-7 h-7 rounded-full bg-[#0086F9]/15 border border-[#0086F9]/30 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5 text-[#0086F9]" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#0086F9]">Screen pop — incoming call</div>
                <div className="text-[11px] font-semibold text-white">Elliot Barnes · Pivot Growth</div>
              </div>
            </motion.div>

            {/* Phase 2: In call with waveform (1.8 → 5.2s) */}
            <motion.div
              className="absolute inset-0 flex items-center gap-2.5 px-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.8, times: [0, 0.06, 0.88, 1], duration: 3.4 }}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono text-emerald-400">In call</span>
                  <span className="text-[10px] font-mono text-white/30 ml-auto">14:22</span>
                </div>
                <div className="flex items-end gap-[2px] h-4">
                  {waveH.map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-[3px] rounded-full bg-[#0086F9]/60"
                      style={{ height: `${h}px` }}
                      animate={{ height: [`${h}px`, `${Math.max(2, Math.floor(h * 0.3))}px`, `${h}px`] }}
                      transition={{ duration: 0.55 + i * 0.07, repeat: Infinity, ease: 'easeInOut', delay: i * 0.06 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Phase 3: Logging (5.2 → 6.4s) */}
            <motion.div
              className="absolute inset-0 flex items-center gap-2.5 px-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 5.2, times: [0, 0.1, 0.78, 1], duration: 1.2 }}
            >
              <motion.div
                className="w-4 h-4 rounded-full border-2 border-[#0086F9]/40 border-t-[#0086F9] shrink-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
              />
              <span className="text-[11px] font-mono text-[#2D98F1]">Logging to HubSpot CRM…</span>
            </motion.div>

            {/* Phase 4: Done (6.4s+) */}
            <motion.div
              className="absolute inset-0 flex items-center gap-2.5 px-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6.4, duration: 0.3 }}
            >
              <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-emerald-400" />
              </div>
              <span className="text-[11px] font-mono text-white/50">Synced · 0 manual entries</span>
            </motion.div>
          </div>
        </div>

        {/* Activity timeline */}
        <div className="px-4 pb-2">
          <div className="text-[9px] font-mono uppercase tracking-widest text-white/25 mb-1.5">Activity · Auto-logged by Rozper</div>
          <div className="space-y-1.5">
            {timeline.map(({ Icon, label, color, delay }) => (
              <motion.div
                key={label}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay, duration: 0.3 }}
              >
                <div className={`w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${color} shrink-0`}>
                  <Icon className="w-3 h-3" />
                </div>
                <span className="text-[11px] text-white/60 flex-1">{label}</span>
                <span className="text-[9px] font-mono text-white/20 shrink-0">just now</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Summary */}
        <motion.div
          className="mx-3 mb-2 p-2.5 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7.5, duration: 0.4 }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <Zap className="w-3 h-3 text-[#0086F9]" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#2D98F1]">AI Summary</span>
          </div>
          <p className="text-[10px] text-white/55 leading-relaxed">Discussed Q3 proposal. Client requested pricing by seat. Follow-up Thursday. Deal → Proposal.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function HubSpotPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <span>integrations</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">hubspot</span>
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-4 flex flex-col lg:grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10 items-center min-h-[calc(100dvh-120px)] lg:min-h-0">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-5">
              <RefreshCw className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Integrations · HubSpot</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Rozper syncs with{' '}
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">HubSpot,</span>{' '}
              automatically.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-4 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              Click-to-call, auto-logging, AI summaries, and deal-stage triggers — without ever leaving HubSpot. Every call logged. Every deal updated. Zero manual entry.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-7 flex flex-row flex-nowrap gap-3">
              <Link href="/contact/" className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold whitespace-nowrap transition">
                Connect HubSpot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing/" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full border border-white/15 text-sm sm:text-base text-white font-medium whitespace-nowrap hover:bg-white/5 transition">
                See pricing
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="mt-6 flex flex-wrap gap-2">
              {['Free → Enterprise', 'Embedded widget', 'Real-time sync'].map(b => (
                <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white/60">
                  <Check className="w-3 h-3 text-[#0086F9]" />{b}
                </span>
              ))}
            </motion.div>
          </div>

          <HubSpotWidgetAnimation />
        </section>

        {/* Sync flow — numbered steps */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold">What happens on every call.</h2>
            <p className="mt-4 text-white/50">Five automatic steps — zero manual action.</p>
          </div>

          <div className="max-w-xl mx-auto">
          <div className="relative">
            {/* Vertical journey path */}
            <div className="absolute left-[1.85rem] top-7 bottom-7 w-px bg-gradient-to-b from-[#046BD2] via-[#0086F9]/70 to-[#046BD2]/20" />

            <div className="space-y-12">
              {syncFlow.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-5"
                >
                  {/* Node — opaque bg so the line visually terminates here */}
                  <div className="relative w-14 h-14 flex-shrink-0 rounded-2xl bg-[#0B1220] border border-[#046BD2]/40 flex items-center justify-center z-10 shadow-[0_0_0_4px_rgba(4,107,210,0.12),0_0_18px_rgba(0,134,249,0.12)]">
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-[#046BD2]/10"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
                    />
                    <span className="font-mono text-xs text-[#0086F9] font-bold relative z-10">{s.step}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-3 pb-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-display font-semibold text-white text-[1.05rem]">{s.label}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${sideColors[s.side]}`}>{sideLabel[s.side]}</span>
                    </div>
                    <p className="text-sm text-white/65 leading-relaxed">{s.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          </div>
        </section>

        {/* Features — full-width row table */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Everything the integration does.</h2>
            <p className="mt-4 text-white/50">Every feature fires automatically — no manual steps, no missed data.</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group grid sm:grid-cols-[56px_220px_1fr] items-center gap-6 px-8 py-6 border-b border-white/[0.06] last:border-0 hover:bg-[#046BD2]/[0.05] transition-colors duration-300"
              >
                {/* Icon */}
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 group-hover:border-[#046BD2]/40 transition-all duration-300">
                  <f.icon className="w-4.5 h-4.5 text-[#0086F9]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-white group-hover:text-[#0086F9] transition-colors duration-300">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/65 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Native experience section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#046BD2]/12 via-[#111B2D] to-[#0B1220] border border-[#046BD2]/20 p-10 md:p-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 max-w-2xl">A HubSpot-native calling experience.</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {detail.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.04] border border-white/10"
                >
                  <CircleDot className="w-5 h-5 text-[#0086F9] mb-3" />
                  <h3 className="font-display font-semibold mb-2">{d.title}</h3>
                  <p className="text-sm text-white/65">{d.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-6 rounded-2xl bg-[#111B2D] border border-white/10 text-center">
                <div className="font-display text-3xl font-bold bg-gradient-to-br from-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">{s.v}</div>
                <div className="text-xs text-white/50 mt-2 font-mono uppercase tracking-wider">{s.k}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials — deal record cards, all equal */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-12">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#0086F9]/60 mb-3">// hs.deals.feedback[]</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">From HubSpot teams.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                dealId: 'HS-4821', dealName: 'Q3 Enterprise Renewal',
                stage: 'Closed Won', stageCls: 'bg-[#2D98F1]/10 border-[#2D98F1]/25 text-[#2D98F1]',
                amount: '$84K ARR',
                initials: 'EB', name: 'Elliot Barnes', title: 'Sales Manager · Pivot Growth Agency',
                avatarBg: 'bg-[#046BD2]/20 border-[#046BD2]/30 text-[#2D98F1]',
                outcome: '100% auto-logged', outcomeCls: 'text-[#0086F9]',
                quote: '"Our HubSpot pipeline stays clean now. Every call logged, every deal stage moves automatically, and our reps have more time for actual selling."',
              },
              {
                dealId: 'HS-5903', dealName: 'SDR → AE Handoff',
                stage: 'Proposal', stageCls: 'bg-[#046BD2]/10 border-[#046BD2]/25 text-[#0086F9]',
                amount: '$42K ARR',
                initials: 'NK', name: 'Naomi Khalil', title: 'RevOps Lead · Forge Labs',
                avatarBg: 'bg-[#0086F9]/15 border-[#0086F9]/25 text-[#0086F9]',
                outcome: '<10s summary to HubSpot', outcomeCls: 'text-[#2D98F1]',
                quote: '"AI summaries land in the deal record before the rep is even back at their desk. Our handoff between SDR and AE got dramatically cleaner."',
              },
              {
                dealId: 'HS-7112', dealName: 'Automation Playbook',
                stage: 'Closed Won', stageCls: 'bg-[#2D98F1]/10 border-[#2D98F1]/25 text-[#2D98F1]',
                amount: '$61K ARR',
                initials: 'DR', name: 'Diego Reyes', title: 'Sales Director · Loop Studio',
                avatarBg: 'bg-[#046BD2]/15 border-[#046BD2]/25 text-[#2D98F1]',
                outcome: '+27% rep selling time', outcomeCls: 'text-[#2D98F1]',
                quote: '"Deal stages move themselves based on call outcomes. My team went from chasing data entry to chasing pipeline."',
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-[#111B2D] border border-white/[0.08] hover:border-[#046BD2]/35 transition overflow-hidden flex flex-col"
              >
                {/* Deal record header */}
                <div className="px-4 py-2.5 bg-[#0B1220]/70 border-b border-white/[0.06]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[9px] text-white/25 uppercase tracking-wider">{t.dealId}</span>
                    <span className={`px-2 py-0.5 rounded border text-[9px] font-mono ${t.stageCls}`}>{t.stage}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-white/60 font-medium truncate pr-2">{t.dealName}</span>
                    <span className="font-mono text-[10px] text-white/35 shrink-0">{t.amount}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <blockquote className="text-sm text-white/75 leading-relaxed flex-1 mb-5">{t.quote}</blockquote>

                  {/* Outcome */}
                  <div className="flex items-center gap-1.5 mb-4 py-2.5 border-y border-white/[0.06]">
                    <span className="font-mono text-[9px] text-white/30 uppercase">outcome:</span>
                    <span className={`font-mono text-[10px] font-semibold ${t.outcomeCls}`}>{t.outcome}</span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-display font-bold text-[11px] shrink-0 ${t.avatarBg}`}>{t.initials}</div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{t.name}</div>
                      <div className="text-xs text-white/65 truncate">{t.title}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8 text-center">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-2xl bg-[#111B2D] border border-white/10 p-6 hover:bg-[#1A2638] transition">
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
          <div className="relative rounded-3xl overflow-hidden bg-[#070B14] border border-white/10 p-12 md:p-20 text-center">
            {/* Left arc glow */}
            <div className="hidden sm:block absolute -left-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none" aria-hidden>
              <motion.svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: 'blur(28px)' }} animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}>
                <circle cx="100" cy="100" r="78" stroke="#22D3EE" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
                <circle cx="100" cy="100" r="54" stroke="#046BD2" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(40 100 100)" />
              </motion.svg>
            </div>
            {/* Right arc glow */}
            <div className="hidden sm:block absolute -right-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none" aria-hidden>
              <motion.svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: 'blur(28px)' }} animate={{ rotate: -360 }} transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}>
                <circle cx="100" cy="100" r="78" stroke="#0086F9" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
                <circle cx="100" cy="100" r="54" stroke="#22D3EE" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(-40 100 100)" />
              </motion.svg>
            </div>
            {/* Faint background grid */}
            <div className="absolute inset-0 opacity-[0.18] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)`, backgroundSize: '56px 56px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)' }} />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-white">Your CRM. Always accurate.</h2>
              <p className="mt-6 text-white/60 max-w-md mx-auto">Connect in under 10 minutes. No credit card required.</p>
              <div className="mt-10 flex flex-row flex-nowrap items-center justify-center gap-3">
                <Link href="/contact/" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm sm:text-base font-semibold whitespace-nowrap shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition">
                  Connect HubSpot <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing/" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-sm sm:text-base text-white font-semibold whitespace-nowrap transition">
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
