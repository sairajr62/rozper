'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Phone, FileText, Zap, Users, TrendingUp,
  ArrowRight, ChevronRight, RefreshCw, Check, CircleDot,
} from 'lucide-react'

const features = [
  { icon: Phone, title: 'Click-to-Call', desc: 'Click-to-call any HubSpot contact, company, or deal — directly from the record.' },
  { icon: Users, title: 'Caller ID Match', desc: 'HubSpot contact record opens automatically when an inbound call arrives.' },
  { icon: FileText, title: 'Auto-Logging', desc: 'Duration, recording, transcript, and disposition logged to HubSpot timeline automatically.' },
  { icon: Zap, title: 'AI Summaries', desc: 'AI call summary posted to HubSpot within seconds of hang-up — no manual notes.' },
  { icon: TrendingUp, title: 'Deal Automation', desc: 'Advance deal stages, create tasks, and trigger sequences from call outcomes.' },
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

function HubSpotRecord() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden shadow-2xl">
      {/* Record header */}
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[#2D98F1] text-xs font-bold">EB</div>
        <div>
          <div className="text-sm font-semibold text-white">Elliot Barnes</div>
          <div className="text-[10px] font-mono text-white/40">Sales Manager · Pivot Growth Agency</div>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#046BD2] text-white text-xs font-semibold cursor-pointer hover:bg-[#0078E0] transition">
          <Phone className="w-3.5 h-3.5" />
          Call
        </div>
      </div>

      {/* Deal stage */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">Deal Pipeline</div>
        <div className="flex items-center gap-1">
          {['Prospect', 'Demo', 'Proposal', 'Closed'].map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div className={`h-1.5 w-10 rounded-full ${i < 3 ? 'bg-[#046BD2]' : 'bg-white/10'}`} />
              {i < 3 && <div className="w-1 h-1 rounded-full bg-[#046BD2]" />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] font-mono text-white/30 mt-1">
          <span>Prospect</span><span>Demo</span><span>Proposal</span><span>Closed</span>
        </div>
      </div>

      {/* Activity timeline */}
      <div className="px-5 py-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">Activity · Auto-logged by Rozper</div>
        <div className="space-y-3">
          {[
            { icon: Zap, label: 'AI Summary posted', time: '2m ago', color: 'text-emerald-400' },
            { icon: Phone, label: 'Call · 14m 22s · Recorded', time: '2m ago', color: 'text-[#0086F9]' },
            { icon: TrendingUp, label: 'Deal moved → Proposal', time: '2m ago', color: 'text-[#2D98F1]' },
          ].map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 + 0.5 }}
              className="flex items-center gap-3"
            >
              <div className={`w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${a.color}`}>
                <a.icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-white/70">{a.label}</div>
              </div>
              <div className="text-[10px] font-mono text-white/30">{a.time}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI summary box */}
      <div className="mx-4 mb-4 p-4 rounded-2xl bg-[#046BD2]/10 border border-[#046BD2]/20">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-3.5 h-3.5 text-[#0086F9]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#2D98F1]">AI Summary</span>
        </div>
        <p className="text-xs text-white/60 leading-relaxed">Discussed Q3 proposal. Client requested pricing breakdown by seat. Follow-up scheduled for Thursday. Deal moved to Proposal stage.</p>
      </div>
    </div>
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
            <Link href="/integrations" className="hover:text-[#0086F9]">integrations</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">hubspot</span>
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1fr_1fr] gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <RefreshCw className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Integrations · HubSpot</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              Rozper syncs with{' '}
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">HubSpot,</span>{' '}
              automatically.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              Click-to-call, auto-logging, AI summaries, and deal-stage triggers — without ever leaving HubSpot. Every call logged. Every deal updated. Zero manual entry.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Connect HubSpot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">
                See pricing
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="mt-10 flex flex-wrap gap-2">
              {['Free → Enterprise', 'Embedded widget', 'Real-time sync'].map(b => (
                <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white/60">
                  <Check className="w-3 h-3 text-[#0086F9]" />{b}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <HubSpotRecord />
          </motion.div>
        </section>

        {/* Sync flow — numbered steps */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold">What happens on every call.</h2>
            <p className="mt-4 text-white/50">Five automatic steps — zero manual action.</p>
          </div>

          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-[1.85rem] top-6 bottom-6 w-px bg-gradient-to-b from-[#046BD2] via-[#0086F9] to-transparent" />

            <div className="space-y-6">
              {syncFlow.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-5"
                >
                  <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-[#046BD2]/15 border border-[#046BD2]/30 flex items-center justify-center relative z-10">
                    <span className="font-mono text-xs text-[#0086F9] font-bold">{s.step}</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-display font-semibold text-white">{s.label}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${sideColors[s.side]}`}>{sideLabel[s.side]}</span>
                    </div>
                    <p className="text-sm text-white/50">{s.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Everything the integration does.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="group p-7 rounded-3xl bg-[#111B2D] border border-white/10 hover:border-[#046BD2]/40 transition"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#046BD2]/15 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
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

        {/* Testimonials — clean 3-column grid, equal peers */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-[#2D98F1] mb-3">// what teams say</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">From HubSpot teams.</h2>
            <p className="mt-4 text-white/55 max-w-xl mx-auto">Real outcomes after teams connect Rozper to their HubSpot workspace.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                initials: 'EB', name: 'Elliot Barnes', title: 'Sales Manager · Pivot Growth Agency',
                badge: 'Pipeline hygiene',
                quote: 'Our HubSpot pipeline stays clean now. Every call logged, every deal stage moves automatically, and our reps have more time for actual selling.',
                stat: { v: '100%', k: 'auto-logged' },
              },
              {
                initials: 'NK', name: 'Naomi Khalil', title: 'RevOps Lead · Forge Labs',
                badge: 'AI summaries',
                quote: 'AI summaries land in the deal record before the rep is even back at their desk. Our handoff between SDR and AE got dramatically cleaner.',
                stat: { v: '<10s', k: 'summary in HubSpot' },
              },
              {
                initials: 'DR', name: 'Diego Reyes', title: 'Sales Director · Loop Studio',
                badge: 'Deal automation',
                quote: 'Deal stages move themselves based on call outcomes. My team went from chasing data entry to chasing pipeline.',
                stat: { v: '+27%', k: 'rep selling time' },
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group relative flex flex-col rounded-3xl bg-[#111B2D] border border-white/10 hover:border-[#046BD2]/40 transition p-6 overflow-hidden"
              >
                {/* Top accent bar (subtle) */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#046BD2]/50 to-transparent" />

                {/* Header row — category + index */}
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#046BD2]/12 border border-[#046BD2]/25 text-[10px] font-mono uppercase tracking-widest text-[#2D98F1]">
                    {t.badge}
                  </span>
                  <span className="font-mono text-[10px] text-white/30 tabular-nums">{String(i + 1).padStart(2, '0')} / 03</span>
                </div>

                {/* Quote */}
                <blockquote className="text-[14px] md:text-[15px] text-white/82 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Stat row */}
                <div className="my-5 flex items-baseline gap-2 py-3 border-y border-white/8">
                  <span className="font-display text-2xl font-bold bg-gradient-to-br from-[#2D98F1] to-[#046BD2] bg-clip-text text-transparent tabular-nums leading-none">{t.stat.v}</span>
                  <span className="text-[11px] font-mono text-white/45 uppercase tracking-wider">{t.stat.k}</span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[#2D98F1] font-display font-bold text-xs flex-shrink-0">{t.initials}</div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm leading-tight truncate">{t.name}</div>
                    <div className="text-[10px] text-white/45 font-mono truncate leading-tight">{t.title}</div>
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
          <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-white">Your CRM. Always accurate.</h2>
            <p className="mt-6 text-white/80 max-w-md mx-auto">Connect in under 10 minutes. No credit card required.</p>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
              Connect HubSpot <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
