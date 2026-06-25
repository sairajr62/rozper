'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Phone, PhoneCall, PhoneIncoming, ClipboardList, Zap, Bot, UserPlus,
  ArrowRight, ChevronRight, Check, Layers, ArrowLeftRight, RefreshCw,
} from 'lucide-react'

const features = [
  { icon: PhoneCall, title: 'Click-to-Call', desc: 'Click-to-call any Zoho contact, lead, or account — directly from CRM without switching apps.' },
  { icon: PhoneIncoming, title: 'Screen-Pop', desc: "Incoming call screen-pop: caller's Zoho record opens automatically when the call rings." },
  { icon: ClipboardList, title: 'Auto-Logging', desc: 'Every call logged: duration, recording, transcript, and outcome — zero manual entry.' },
  { icon: Bot, title: 'AI Summaries', desc: 'AI call summary written to Zoho activity log within seconds of hang-up.' },
  { icon: UserPlus, title: 'Auto-Create Records', desc: 'Create leads, contacts, and tasks from call events automatically.' },
]

const detail = [
  { icon: Layers, title: 'Full Zoho Suite', desc: 'Connects to Zoho CRM, Desk, Recruit, and Bigin — all from one integration.' },
  { icon: ArrowLeftRight, title: 'Custom Field Mapping', desc: 'Map Rozper fields to custom Zoho fields — no developer required.' },
  { icon: Zap, title: 'Workflow Triggers', desc: 'Trigger Zoho workflows from call events: deal stage, follow-up task, SLA breach.' },
]

const stats = [
  { v: '100%', k: 'Calls Auto-Logged' },
  { v: '<5s', k: 'AI Summary Speed' },
  { v: '0', k: 'Manual Data Entry' },
  { v: '4', k: 'Zoho Products' },
]

const faqs = [
  { q: 'Does the Zoho integration require a developer?', a: 'No. Connect in minutes from the Rozper admin panel — no code required.' },
  { q: 'Which Zoho products does it support?', a: 'Zoho CRM, Desk, Recruit, and Bigin. More via API.' },
  { q: 'Can I trigger Zoho automations from call events?', a: 'Yes. Deal updates, task creation, and email sequences from call events.' },
]

const zohoProducts = [
  { name: 'Zoho CRM', badge: 'CRM', desc: 'Contacts, leads, deals' },
  { name: 'Zoho Desk', badge: 'Desk', desc: 'Support tickets & SLA' },
  { name: 'Zoho Recruit', badge: 'Recruit', desc: 'Hiring & candidates' },
  { name: 'Zoho Bigin', badge: 'Bigin', desc: 'SMB pipeline' },
]

const events = [
  { trigger: 'Call connected', outcomes: ['Screen-pop contact record', 'Log call start time'] },
  { trigger: 'Call ended', outcomes: ['Save recording & transcript', 'Generate AI summary', 'Update activity log'] },
  { trigger: 'Lead identified', outcomes: ['Auto-create lead record', 'Assign to owner', 'Trigger follow-up task'] },
  { trigger: 'Deal keyword detected', outcomes: ['Advance deal stage', 'Notify account executive', 'Queue email sequence'] },
]

function ZohoCRMAnimation() {
  const [cycleKey, setCycleKey] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCycleKey(k => k + 1), 8500)
    return () => clearInterval(t)
  }, [])

  const waveH = [3, 7, 12, 9, 14, 8, 11, 6, 10, 5, 8, 4]
  const rows = [
    { label: 'Duration',    value: '3m 42s',                   pct: 72,  d: 0.5 },
    { label: 'Recording',   value: 'Saved',                    pct: 88,  d: 1.3 },
    { label: 'AI Summary',  value: '"Interested in enterprise..."', pct: 100, d: 2.1 },
    { label: 'Next Action', value: '+ Follow-up task',         pct: 60,  d: 3.0 },
    { label: 'Lead Stage',  value: 'Prospect → Qualified',     pct: 50,  d: 3.8 },
  ]

  return (
    <motion.div
      key={cycleKey}
      className="relative w-full max-w-[440px] mx-auto lg:mx-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Ambient glow */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-72 h-28 bg-[#046BD2]/10 blur-3xl rounded-full pointer-events-none" />

      {/* ── CALL ENDED CARD ─────────────────────────────────────────── */}
      <motion.div
        className="relative rounded-2xl bg-[#111B2D] border border-white/10 p-3 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#046BD2] to-[#0086F9] flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white leading-none">John Davis</div>
              <div className="text-[10px] font-mono text-white/35 mt-0.5">+1 (555) 234-8901</div>
            </div>
          </div>
          <motion.div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-400">Call ended</span>
          </motion.div>
        </div>

        {/* Waveform collapsing */}
        <div className="flex items-center gap-[3px] h-6">
          {waveH.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-full bg-[#0086F9]"
              initial={{ height: `${h * 2}px`, opacity: 0.7 }}
              animate={{ height: '2px', opacity: 0.15 }}
              transition={{ delay: 0.15 + i * 0.04, duration: 0.9, ease: 'easeOut' }}
            />
          ))}
          <motion.span
            className="ml-2 text-[11px] font-mono text-white/40 shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            3m 42s
          </motion.span>
        </div>
      </motion.div>

      {/* ── SYNC CONNECTOR ──────────────────────────────────────────── */}
      <motion.div
        className="flex items-center gap-2 mb-2 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#046BD2]/40 to-[#046BD2]/60" />
        <div className="flex items-center gap-1.5 shrink-0">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#0086F9]"
            animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
          />
          <span className="text-[10px] font-mono text-[#2D98F1]/70 uppercase tracking-wider">Syncing to Zoho CRM</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#046BD2]/40 to-[#046BD2]/60" />
      </motion.div>

      {/* ── CRM RECORD CARD ─────────────────────────────────────────── */}
      <motion.div
        className="rounded-2xl bg-[#111B2D] border border-white/10 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        {/* Zoho header bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0c1422] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#e04545]/15 border border-[#e04545]/20 flex items-center justify-center">
              <span className="text-[9px] font-black text-[#e04545]">Z</span>
            </div>
            <span className="text-[11px] font-semibold text-white/65 uppercase tracking-wider">Zoho CRM</span>
            <span className="text-[10px] font-mono text-white/20">· Activity Log</span>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-white/10" />
            ))}
          </div>
        </div>

        {/* Field rows */}
        <div className="p-3 space-y-2">
          {rows.map(row => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-white/30 w-[72px] shrink-0">{row.label}</span>
              <div className="flex-1 h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#046BD2] to-[#2D98F1]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${row.pct}%` }}
                  transition={{ delay: row.d, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                />
              </div>
              <motion.div
                className="flex items-center gap-1.5 shrink-0"
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: row.d + 0.85, duration: 0.3 }}
              >
                <span className="text-[10px] text-white/55 max-w-[110px] truncate">{row.value}</span>
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                  <Check className="w-2 h-2 text-emerald-400" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Status footer */}
        <motion.div
          className="px-4 py-2.5 border-t border-white/[0.05] bg-[#0c1422] flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.1, duration: 0.4 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[10px] font-mono text-white/30">
            5 fields synced · 0 manual entries · AI summary written
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function EventAutomation() {
  return (
    <div className="space-y-3">
      {events.map((e, i) => (
        <motion.div
          key={e.trigger}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.3 }}
          className="rounded-2xl bg-[#111B2D] border border-white/10 p-4 hover:border-[#046BD2]/30 transition"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="px-2.5 py-1 rounded-lg bg-[#046BD2]/15 border border-[#046BD2]/25">
              <span className="text-[10px] font-mono text-[#0086F9]">TRIGGER</span>
            </div>
            <span className="text-sm font-medium text-white">{e.trigger}</span>
          </div>
          <div className="ml-4 space-y-1.5">
            {e.outcomes.map((o) => (
              <div key={o} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-[#2D98F1] flex-shrink-0" />
                <span className="text-xs text-white/55">{o}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function ZohoPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/integrations/" className="hover:text-[#0086F9]">integrations</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">zoho</span>
          </div>
        </div>

        {/* Hero — two-panel: left text, right product stack + automations */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-10 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-5">
              <RefreshCw className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Integrations · Zoho</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Rozper connects directly to{' '}
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">Zoho CRM.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-4 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              Click-to-call, auto-logging, AI summaries, and contact pop — across all four Zoho products. Your Zoho data is only as good as what gets logged. Rozper ensures it's everything.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-7 flex flex-row flex-nowrap gap-3">
              <Link href="/contact/" className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold whitespace-nowrap transition">
                Connect Zoho <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing/" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full border border-white/15 text-sm sm:text-base text-white font-medium whitespace-nowrap hover:bg-white/5 transition">
                See pricing
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="mt-6 flex flex-wrap gap-2">
              {['No-code setup', 'CRM · Desk · Recruit · Bigin', 'Real-time sync'].map(b => (
                <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white/60">
                  <Check className="w-3 h-3 text-[#0086F9]" />{b}
                </span>
              ))}
            </motion.div>
          </div>

          <ZohoCRMAnimation />
        </section>

        {/* Call event automation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Every call event triggers something.</h2>
              <p className="text-white/55 leading-relaxed text-lg mb-8">No more "update the CRM after the call." Rozper fires every workflow trigger the moment the event happens — while your rep is still talking.</p>
              <div className="space-y-3">
                {['All calls logged automatically', 'AI summary in Zoho activity log < 5s', 'Zero manual data entry', 'Full workflow automation'].map(b => (
                  <div key={b} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/40 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#0086F9]" />
                    </div>
                    <span className="text-sm text-white/70">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <EventAutomation />
          </div>
        </section>

        {/* Features grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold">What the Zoho integration does.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className={`flex items-start gap-4 p-5 rounded-2xl bg-[#111B2D] border border-white/[0.07] hover:border-[#046BD2]/30 transition-colors group ${i === 4 ? 'md:col-span-2' : ''}`}
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-[#046BD2]/15 border border-[#046BD2]/25 flex items-center justify-center">
                  <f.icon className="w-4.5 h-4.5 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-sm mb-1 group-hover:text-[#0086F9] transition-colors">{f.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detail section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#046BD2]/12 via-[#111B2D] to-[#0B1220] border border-[#046BD2]/20 p-10 md:p-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">Works with Zoho's full suite.</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {detail.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.04] border border-white/10"
                >
                  <d.icon className="w-5 h-5 text-[#0086F9] mb-3" />
                  <h3 className="font-display font-semibold mb-2">{d.title}</h3>
                  <p className="text-sm text-white/55">{d.desc}</p>
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

        {/* Testimonials — Zoho module activity cards, all equal */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-12">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#0086F9]/60 mb-3">// zoho.activity.feedback[]</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">From Zoho teams.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                module: 'CRM', moduleCls: 'bg-[#046BD2]/12 border-[#046BD2]/25 text-[#0086F9]',
                event: 'call.completed → activity.logged',
                initials: 'SP', name: 'Sunita Patel', title: 'CRM Admin · Brightside Sales',
                avatarBg: 'bg-[#046BD2]/20 border-[#046BD2]/30 text-[#2D98F1]',
                result: 'Zero manual notes', resultCls: 'text-emerald-400',
                quote: '"Our sales reps stopped writing call notes in Zoho. Rozper does it automatically — and the AI summaries are better than what anyone was writing manually."',
              },
              {
                module: 'Desk', moduleCls: 'bg-violet-400/10 border-violet-400/20 text-violet-400',
                event: 'call.ended → ticket.updated',
                initials: 'OS', name: 'Omar Siddiqui', title: 'Head of Support · Meridian Group',
                avatarBg: 'bg-violet-500/20 border-violet-500/30 text-violet-300',
                result: 'SLA hit every call', resultCls: 'text-[#2D98F1]',
                quote: '"Zoho Desk tickets update the moment a call ends. Our SLA reporting is finally accurate — no more agents forgetting to log resolutions."',
              },
              {
                module: 'Recruit', moduleCls: 'bg-amber-400/10 border-amber-400/20 text-amber-400',
                event: 'call.outcome → candidate.stage',
                initials: 'PM', name: 'Priya Mehta', title: 'Talent Ops Lead · NovaTalent',
                avatarBg: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
                result: '3× faster pipeline moves', resultCls: 'text-emerald-400',
                quote: '"Candidate records in Zoho Recruit update automatically after screening calls. My recruiters focus on conversations — the CRM handles itself."',
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-[#111B2D] border border-white/[0.08] hover:border-[#046BD2]/35 transition overflow-hidden flex flex-col"
              >
                {/* Module header */}
                <div className="px-4 py-2.5 bg-[#0B1220]/70 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded border text-[9px] font-mono font-bold ${t.moduleCls}`}>Zoho {t.module}</span>
                  </div>
                  <span className="font-mono text-[9px] text-white/25 truncate ml-2 max-w-[180px]">{t.event}</span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <blockquote className="text-sm text-white/75 leading-relaxed flex-1 mb-5">{t.quote}</blockquote>

                  {/* Result row */}
                  <div className="flex items-center gap-1.5 mb-4 py-2.5 border-y border-white/[0.06]">
                    <span className="font-mono text-[9px] text-white/30 uppercase">result:</span>
                    <span className={`font-mono text-[10px] font-semibold ${t.resultCls}`}>{t.result}</span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-display font-bold text-[11px] shrink-0 ${t.avatarBg}`}>{t.initials}</div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{t.name}</div>
                      <div className="text-[11px] text-white/40 truncate">{t.title}</div>
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
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-white">Log every call. Automatically.</h2>
              <p className="mt-6 text-white/60 max-w-md mx-auto">No-code setup. Works across all Zoho products.</p>
              <div className="mt-10 flex flex-row flex-nowrap items-center justify-center gap-3">
                <Link href="/contact/" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm sm:text-base font-semibold whitespace-nowrap shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition">
                  Connect Zoho <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing/" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-sm sm:text-base text-white font-semibold whitespace-nowrap transition">See pricing</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
