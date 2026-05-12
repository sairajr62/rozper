'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Phone, FileText, Zap, Users, Settings,
  ArrowRight, ChevronRight, GitMerge, Check, Layers,
} from 'lucide-react'

const features = [
  { icon: Phone, title: 'Click-to-Call', desc: 'Click-to-call any Zoho contact, lead, or account — directly from CRM without switching apps.' },
  { icon: Users, title: 'Screen-Pop', desc: "Incoming call screen-pop: caller's Zoho record opens automatically when the call rings." },
  { icon: FileText, title: 'Auto-Logging', desc: 'Every call logged: duration, recording, transcript, and outcome — zero manual entry.' },
  { icon: Zap, title: 'AI Summaries', desc: 'AI call summary written to Zoho activity log within seconds of hang-up.' },
  { icon: Settings, title: 'Auto-Create Records', desc: 'Create leads, contacts, and tasks from call events automatically.' },
]

const detail = [
  { title: 'Full Zoho Suite', desc: 'Connects to Zoho CRM, Desk, Recruit, and Bigin — all from one integration.' },
  { title: 'Custom Field Mapping', desc: 'Map Rozper fields to custom Zoho fields — no developer required.' },
  { title: 'Workflow Triggers', desc: 'Trigger Zoho workflows from call events: deal stage, follow-up task, SLA breach.' },
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

function ZohoProductStack() {
  return (
    <div className="relative">
      {zohoProducts.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
          style={{ marginTop: i === 0 ? 0 : '-0.75rem', zIndex: 10 - i }}
          className="relative rounded-2xl bg-[#111B2D] border border-white/10 p-5 hover:border-[#046BD2]/40 transition hover:z-20 hover:-translate-y-1 duration-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#046BD2]/15 border border-[#046BD2]/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-mono font-bold text-[#0086F9]">{p.badge}</span>
            </div>
            <div className="flex-1">
              <div className="font-display font-semibold text-white">{p.name}</div>
              <div className="text-xs text-white/40">{p.desc}</div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400">Connected</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
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
            <Link href="/integrations" className="hover:text-[#0086F9]">integrations</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">zoho</span>
          </div>
        </div>

        {/* Hero — two-panel: left text, right product stack + automations */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1fr_1fr] gap-14 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <GitMerge className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Integrations · Zoho</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              Rozper connects directly to{' '}
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">Zoho CRM.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              Click-to-call, auto-logging, AI summaries, and contact pop — across all four Zoho products. Your Zoho data is only as good as what gets logged. Rozper ensures it's everything.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Connect Zoho <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">
                See pricing
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="mt-10 flex flex-wrap gap-2">
              {['No-code setup', 'CRM · Desk · Recruit · Bigin', 'Real-time sync'].map(b => (
                <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white/60">
                  <Check className="w-3 h-3 text-[#0086F9]" />{b}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-[#0086F9]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Connected Products</span>
              </div>
              <ZohoProductStack />
            </div>
          </motion.div>
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
                  <GitMerge className="w-5 h-5 text-[#0086F9] mb-3" />
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

        {/* Testimonial */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center mb-8">
            <GitMerge className="w-6 h-6 text-[#0086F9]" />
          </div>
          <blockquote className="font-display text-2xl md:text-3xl font-medium leading-relaxed">
            "Our sales reps stopped writing call notes in Zoho. Rozper does it automatically — and the AI summaries are better than what anyone was writing manually."
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[#2D98F1] font-display font-bold">SP</div>
            <div className="text-left">
              <div className="font-semibold">Sunita Patel</div>
              <div className="text-xs text-white/50">CRM Admin · Brightside Sales</div>
            </div>
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
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '60px 60px' }} />
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-white relative">Log every call. Automatically.</h2>
            <p className="mt-6 text-white/80 max-w-md mx-auto relative">No-code setup. Works across all Zoho products.</p>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition relative">
              Connect Zoho <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
