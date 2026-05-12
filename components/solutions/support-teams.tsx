'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Inbox, Brain, Monitor, FileText, Clock,
  BarChart3, Users, Headphones,
  ArrowRight, ChevronRight, ShieldCheck, Zap, MessageSquare,
} from 'lucide-react'

const features = [
  { icon: Inbox, title: 'Unified Inbox', desc: 'Voice, SMS, WhatsApp, chat, Instagram, and Facebook — all in one queue, zero tab switching.' },
  { icon: Brain, title: 'AI Agent Assist', desc: 'Surfaces the answer before the agent types the question. Faster resolution, every time.' },
  { icon: Monitor, title: 'Screen-Pop History', desc: 'Full customer history on screen — all channels, all tickets, all prior contacts.' },
  { icon: FileText, title: 'Automated Ticket Creation', desc: 'CRM logging on every interaction — no manual data entry required.' },
  { icon: Clock, title: 'SLA Timers', desc: 'SLA timers and escalation triggers built into every queue.' },
]

const detail = [
  { icon: BarChart3, title: 'Sentiment Scoring', desc: 'QA every interaction without manually reviewing 2,000 calls.' },
  { icon: Users, title: 'Agent Scorecards', desc: 'Resolution rate, handle time, and CSAT updated daily.' },
  { icon: Headphones, title: 'Supervisor Coaching', desc: 'Whisper coaching and live monitoring on any active call.' },
]

const stats = [
  { v: '4.5 min', k: 'AHT Reduction' },
  { v: '100%', k: 'Interactions Scored' },
  { v: '10+', k: 'Channels Unified' },
  { v: '99.9%', k: 'SLA Compliance' },
]

const faqs = [
  { q: 'Can Rozper integrate with our existing helpdesk?', a: 'Yes. Zendesk, Freshdesk, ServiceNow, HubSpot Service Hub, and custom ticketing platforms.' },
  { q: 'How does AI help support agents?', a: 'Surfaces articles, suggests replies, detects sentiment, and writes post-call summaries automatically.' },
  { q: 'Does Rozper support SLA management?', a: 'Yes. SLA timers, escalation rules, and breach alerts built into every queue and channel.' },
]

const tickets = [
  { id: 'TKT-4821', channel: 'Voice', subject: 'Billing discrepancy Q2 invoice', agent: 'Layla H.', sla: '2m left', status: 'urgent', sentiment: 88 },
  { id: 'TKT-4820', channel: 'Chat', subject: 'API integration not returning 200', agent: 'Priya N.', sla: '14m left', status: 'open', sentiment: 62 },
  { id: 'TKT-4819', channel: 'SMS', subject: 'Account locked after password reset', agent: 'Jordan K.', sla: '31m left', status: 'open', sentiment: 75 },
  { id: 'TKT-4818', channel: 'WhatsApp', subject: 'Upgrade to enterprise tier', agent: 'Sam T.', sla: 'Resolved', status: 'done', sentiment: 96 },
]

const channelColors: Record<string, string> = {
  Voice: 'text-[#0086F9] bg-[#046BD2]/15',
  Chat: 'text-emerald-400 bg-emerald-400/10',
  SMS: 'text-violet-400 bg-violet-400/10',
  WhatsApp: 'text-emerald-300 bg-emerald-300/10',
}

const statusStyles: Record<string, string> = {
  urgent: 'text-red-400 bg-red-400/10 border border-red-400/20',
  open: 'text-[#2D98F1] bg-[#046BD2]/10 border border-[#046BD2]/20',
  done: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20',
}

function TicketQueue() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      {/* Terminal header */}
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-xs font-mono text-white/40 ml-2">support · live queue</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400">4 active</span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-3 px-5 py-2 border-b border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/30">
        <span>Ticket</span><span>Agent</span><span>Channel</span><span>SLA</span><span>Score</span>
      </div>

      {/* Ticket rows */}
      {tickets.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-3 px-5 py-3.5 border-b border-white/5 items-center hover:bg-white/[0.02] transition"
        >
          <div>
            <div className="text-[10px] font-mono text-white/30 mb-0.5">{t.id}</div>
            <div className="text-sm text-white/80 leading-tight truncate">{t.subject}</div>
          </div>
          <span className="text-sm text-white/60">{t.agent}</span>
          <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wide w-fit ${channelColors[t.channel]}`}>
            {t.channel}
          </span>
          <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-mono w-fit ${statusStyles[t.status]}`}>
            {t.sla}
          </span>
          {/* Sentiment bar */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#046BD2] to-[#0086F9]"
                initial={{ width: 0 }}
                animate={{ width: `${t.sentiment}%` }}
                transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
              />
            </div>
            <span className="text-[10px] font-mono text-[#0086F9]">{t.sentiment}</span>
          </div>
        </motion.div>
      ))}

      {/* AI Assist bar */}
      <div className="px-5 py-4 bg-[#046BD2]/10 border-t border-[#046BD2]/20 flex items-center gap-3">
        <Brain className="w-4 h-4 text-[#0086F9] flex-shrink-0" />
        <div className="text-xs text-[#2D98F1] font-mono">AI Agent Assist · Suggested reply ready for TKT-4820</div>
        <div className="ml-auto flex items-center gap-1 px-3 py-1 rounded-full bg-[#046BD2]/20 text-[10px] font-mono text-[#0086F9] cursor-pointer hover:bg-[#046BD2]/30 transition">
          Apply <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  )
}

function SLAPanel() {
  const slaItems = [
    { label: 'P1 · Critical', pct: 100, color: 'from-red-500 to-red-400', count: '0 breached' },
    { label: 'P2 · High', pct: 98, color: 'from-[#046BD2] to-[#0086F9]', count: '1 at risk' },
    { label: 'P3 · Medium', pct: 100, color: 'from-[#0086F9] to-[#2D98F1]', count: '0 breached' },
    { label: 'P4 · Low', pct: 99, color: 'from-[#2D98F1] to-white/50', count: '0 breached' },
  ]
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 p-5">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-4 h-4 text-[#0086F9]" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">SLA Compliance · Today</span>
      </div>
      <div className="space-y-3">
        {slaItems.map((s, i) => (
          <div key={s.label}>
            <div className="flex justify-between text-[11px] font-mono text-white/40 mb-1.5">
              <span>{s.label}</span>
              <span className="text-white/60">{s.count}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${s.pct}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">Overall</span>
        <span className="font-display text-2xl font-bold text-[#0086F9]">99.9%</span>
      </div>
    </div>
  )
}

export function SupportTeamsPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/solutions" className="hover:text-[#0086F9]">solutions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">support-teams</span>
          </div>
        </div>

        {/* Hero — split layout with live ticket queue */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <MessageSquare className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Solutions · Support Teams</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              One inbox.<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">Every channel.</span><br />
              Zero misses.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              Omnichannel inbox, AI agent assist, and SLA tools — built for support teams handling 10+ channels simultaneously. Rozper unifies everything so your team can focus on resolution, not navigation.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Book a demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">
                See pricing
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="mt-10 flex items-center gap-3 flex-wrap">
              <span className="text-xs font-mono text-white/40">Integrates with:</span>
              {['Zendesk', 'Freshdesk', 'ServiceNow', 'HubSpot'].map(t => (
                <span key={t} className="px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-white/70">{t}</span>
              ))}
            </motion.div>
          </div>

          {/* Live queue panels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="space-y-4"
          >
            <TicketQueue />
            <SLAPanel />
          </motion.div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Support tools that cut handle time.</h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">Every tool your agents need — surfaced at exactly the right moment.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="group relative p-7 rounded-3xl bg-[#111B2D] border border-white/10 hover:border-[#046BD2]/40 transition overflow-hidden"
              >
                {/* Subtle top glow on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#046BD2]/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="w-11 h-11 rounded-2xl bg-[#046BD2]/15 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quality visibility */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#046BD2]/12 via-[#111B2D] to-[#0B1220] border border-[#046BD2]/20 p-10 md:p-14">
            <div className="flex items-start gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-[#0086F9]" />
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold">Quality visibility across the team.</h2>
                <p className="text-white/50 mt-2">Automated QA so supervisors can coach, not count.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {detail.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#046BD2]/30 transition"
                >
                  <d.icon className="w-7 h-7 text-[#0086F9] mb-3" strokeWidth={1.5} />
                  <h3 className="font-display font-semibold mb-1.5">{d.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{d.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl bg-[#111B2D] border border-white/10 text-center"
              >
                <div className="font-display text-3xl font-bold bg-gradient-to-br from-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">{s.v}</div>
                <div className="text-xs text-white/50 mt-2 font-mono uppercase tracking-wider">{s.k}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials — terminal metric cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-[#2D98F1] mb-3">Support Leaders</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">What happens when teams switch.</h2>
          </div>

          <div className="grid md:grid-cols-12 gap-5">
            {/* Large featured card — terminal-chrome style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-8 rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden"
            >
              <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-xs font-mono text-white/30 ml-2">support-lead · review</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono text-emerald-400">CSAT 97%</span>
                </div>
              </div>
              <div className="p-8">
                <blockquote className="font-display text-xl md:text-2xl font-medium leading-relaxed text-white/90 mb-8">
                  "Our AHT dropped 4.5 minutes after moving to Rozper. AI Agent Assist gives every rep the right answer before they have to search for it."
                </blockquote>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { k: 'AHT Reduction', v: '4.5 min', color: 'text-[#0086F9]' },
                    { k: 'CSAT Lift', v: '+12 pts', color: 'text-emerald-400' },
                    { k: 'Tickets/day', v: '+34%', color: 'text-[#2D98F1]' },
                  ].map(m => (
                    <div key={m.k} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                      <div className={`font-display text-xl font-bold ${m.color}`}>{m.v}</div>
                      <div className="text-[10px] font-mono text-white/40 mt-1">{m.k}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[#2D98F1] font-display font-bold">LH</div>
                  <div>
                    <div className="font-semibold">Layla Hassan</div>
                    <div className="text-xs text-white/50">Support Operations Lead · TechBridge Solutions</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right column — 2 stacked cards */}
            <div className="md:col-span-4 flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#046BD2]/30 transition flex flex-col flex-1"
              >
                <span className="inline-flex self-start px-2 py-0.5 rounded bg-emerald-400/10 text-[10px] font-mono text-emerald-400 mb-4">Voice + Chat</span>
                <blockquote className="font-display text-base font-medium leading-relaxed text-white/80 flex-1 mb-5">
                  "Unified inbox was a game changer. Agents used to switch between 5 tabs. Now it's one screen, zero context switching."
                </blockquote>
                <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 font-display font-bold text-xs">PK</div>
                  <div>
                    <div className="font-semibold text-sm">Priya Kumar</div>
                    <div className="text-xs text-white/40">CS Manager · FlowDesk</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#046BD2]/30 transition flex flex-col flex-1"
              >
                <span className="inline-flex self-start px-2 py-0.5 rounded bg-[#046BD2]/15 text-[10px] font-mono text-[#2D98F1] mb-4">Omnichannel</span>
                <blockquote className="font-display text-base font-medium leading-relaxed text-white/80 flex-1 mb-5">
                  "SLA compliance went from 91% to 99.7% in 30 days. The built-in escalation rules did 80% of the work automatically."
                </blockquote>
                <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-display font-bold text-xs">OB</div>
                  <div>
                    <div className="font-semibold text-sm">Omar Bakr</div>
                    <div className="text-xs text-white/40">Support Director · Hive Enterprise</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="md:col-span-6 p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#046BD2]/30 transition flex flex-col"
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex px-2 py-0.5 rounded bg-violet-400/10 text-[10px] font-mono text-violet-300">WhatsApp + SMS</span>
                <span className="ml-auto text-[10px] font-mono text-white/30">CSAT 94/100</span>
              </div>
              <blockquote className="font-display text-base font-medium leading-relaxed text-white/80 flex-1 mb-5">
                "Adding WhatsApp as a support channel took two clicks. We were handling tickets from it within an hour of going live."
              </blockquote>
              <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.06]">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-display font-bold text-xs">MC</div>
                <div>
                  <div className="font-semibold text-sm">Maria Castillo</div>
                  <div className="text-xs text-white/40">Digital CX Lead · SolTech Latam</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.22 }}
              className="md:col-span-6 p-7 rounded-3xl bg-gradient-to-br from-[#046BD2]/10 to-transparent border border-[#046BD2]/20 hover:border-[#046BD2]/40 transition flex flex-col"
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex px-2 py-0.5 rounded bg-[#046BD2]/15 text-[10px] font-mono text-[#2D98F1]">AI QA</span>
                <span className="ml-auto text-[10px] font-mono text-white/30">100% scored</span>
              </div>
              <blockquote className="font-display text-base font-medium leading-relaxed text-white/80 flex-1 mb-5">
                "We used to manually QA 5% of calls. Now Rozper automatically scores every interaction. My team coaches instead of auditing."
              </blockquote>
              <div className="flex items-center gap-2.5 pt-4 border-t border-[#046BD2]/20">
                <div className="w-8 h-8 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[#2D98F1] font-display font-bold text-xs">TN</div>
                <div>
                  <div className="font-semibold text-sm">Tariq Nasser</div>
                  <div className="text-xs text-white/40">QA Lead · ClearPath Insurance</div>
                </div>
              </div>
            </motion.div>
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
          <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-white relative">Handle more. Stress less.</h2>
            <p className="mt-6 text-white/80 max-w-md mx-auto relative">14-day free trial. No credit card required. Cancel anytime.</p>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition relative">
              Book a demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
