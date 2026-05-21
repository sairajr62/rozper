'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Shield, Phone, FileText, Bot, Pause, ArrowRight, ChevronRight,
  Heart, Activity, Plus, Stethoscope, Clock,
} from 'lucide-react'

const features = [
  { icon: Shield, title: 'HIPAA-eligible config', desc: 'Encrypted calls, faxes, and messages with full compliance controls.', accent: 'rose' },
  { icon: Phone, title: 'Compliant call recording', desc: 'HIPAA-compliant storage and access controls for all recordings.', accent: 'sky' },
  { icon: FileText, title: 'Online fax for clinical docs', desc: 'No fax machine — full audit trail for every document.', accent: 'teal' },
  { icon: Bot, title: 'AI Receptionist 24/7', desc: 'Handles patient calls and appointment bookings around the clock.', accent: 'violet' },
  { icon: Pause, title: 'Pause-and-resume recording', desc: 'Automatically pause during PHI capture on calls.', accent: 'amber' },
]

const benefits = [
  'Appointment reminders via SMS and WhatsApp — automated, HIPAA-aware',
  'Multi-site routing: direct patients to right clinic, department, or on-call provider',
  'Integrates with major healthcare CRMs and practice management platforms',
]

const stats = [
  { v: '40%', k: 'After-hours calls handled by AI', icon: Clock },
  { v: '100%', k: 'HIPAA compliance', icon: Shield },
  { v: '0', k: 'Fax machines needed', icon: FileText },
]

const faqs = [
  { q: 'Is Rozper HIPAA-compliant?', a: 'Yes. Rozper offers HIPAA-eligible configuration with BAA, encrypted storage, and access controls.' },
  { q: 'Can Rozper send HIPAA-compliant SMS?', a: 'Yes. Messaging includes HIPAA-aware controls for PHI in SMS and WhatsApp.' },
  { q: 'Does it integrate with EHR platforms?', a: 'Yes via API with major EHR and practice management platforms. Contact us for compatibility check.' },
]

function HeartMonitor() {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-white p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#046BD2] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Live · Clinical Console</span>
        </div>
        <Plus className="w-5 h-5 text-[#046BD2]" strokeWidth={2.5} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl bg-blue-50 p-4">
          <Heart className="w-5 h-5 text-[#046BD2] mb-2" />
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#046BD2]">Patient calls</div>
          <div className="font-display text-2xl font-bold text-slate-900">412 <span className="text-xs font-normal text-emerald-600">▲ 12%</span></div>
        </div>
        <div className="rounded-2xl bg-sky-50 p-4">
          <Bot className="w-5 h-5 text-sky-500 mb-2" />
          <div className="text-[10px] font-mono uppercase tracking-widest text-sky-600">Auto-handled</div>
          <div className="font-display text-2xl font-bold text-slate-900">40% <span className="text-xs font-normal text-emerald-600">↑</span></div>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4 mb-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Pulse · 24h</div>
        <svg viewBox="0 0 200 50" className="w-full h-12">
          <path
            d="M0 25 L20 25 L25 25 L30 10 L35 40 L40 5 L45 45 L50 25 L80 25 L85 25 L90 15 L95 35 L100 25 L130 25 L135 12 L140 38 L145 25 L200 25"
            stroke="#0086F9" strokeWidth="1.5" fill="none"
          />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[{ k: 'BAA', v: '✓' }, { k: 'PHI-safe', v: '✓' }, { k: 'Audit log', v: 'ON' }].map(b => (
          <div key={b.k} className="text-center py-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="text-[10px] font-mono text-emerald-700 uppercase tracking-wider">{b.k}</div>
            <div className="font-display font-bold text-emerald-600 mt-0.5">{b.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function HealthcarePageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#2D98F1]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/solutions" className="hover:text-[#2D98F1]">solutions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#2D98F1]">healthcare</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Stethoscope className="w-3.5 h-3.5 text-[#2D98F1]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Solutions · Healthcare</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              <span className="bg-gradient-to-r from-[#2D98F1] via-[#0086F9] to-[#2575FC] bg-clip-text text-transparent">HIPAA-compliant</span><br />
              calling for healthcare teams.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Secure calling, faxing, and patient messaging — compliant and built for clinical workflows. BAA included.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-br from-[#046BD2] to-[#2575FC] text-white font-semibold hover:shadow-[0_0_40px_rgba(4,107,210,0.4)] transition-shadow">
                Request BAA <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[#046BD2]/30 text-[#2D98F1] hover:bg-[#046BD2]/10 transition font-medium">
                View pricing
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}>
            <HeartMonitor />
          </motion.div>
        </section>

        {/* Features as care cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Built for healthcare compliance.</h2>
            <p className="mt-4 text-white/60">Every feature designed with PHI in mind.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const colors: Record<string, string> = {
                rose: 'from-[#046BD2]/20 to-[#046BD2]/5 border-[#046BD2]/30 [&_.icon]:text-[#0086F9]',
                sky: 'from-[#0086F9]/20 to-[#0086F9]/5 border-[#0086F9]/30 [&_.icon]:text-[#0086F9]',
                teal: 'from-[#2D98F1]/20 to-[#2D98F1]/5 border-[#2D98F1]/30 [&_.icon]:text-[#2D98F1]',
                violet: 'from-[#2575FC]/20 to-[#2575FC]/5 border-[#2575FC]/30 [&_.icon]:text-[#2575FC]',
                amber: 'from-[#0078E0]/20 to-[#0078E0]/5 border-[#0078E0]/30 [&_.icon]:text-[#0086F9]',
              }
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className={`group p-7 rounded-3xl bg-gradient-to-br border ${colors[f.accent]} hover:scale-[1.02] transition-transform`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.08] flex items-center justify-center mb-4">
                    <f.icon className="icon w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Better patient comms */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#046BD2]/10 via-[#2575FC]/5 to-[#046BD2]/10 border border-[#046BD2]/20 p-12 md:p-16 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#046BD2]/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#2575FC]/10 blur-3xl" />
            <div className="relative">
              <Heart className="w-10 h-10 text-[#0086F9] mb-6" strokeWidth={1.5} />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 max-w-2xl">Better patient communications.</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((b, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
                    <div className="w-7 h-7 rounded-full bg-[#046BD2]/30 border border-[#046BD2]/40 flex items-center justify-center mb-3">
                      <Plus className="w-4 h-4 text-[#2D98F1]" strokeWidth={2.5} />
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 text-center"
              >
                <s.icon className="w-8 h-8 text-[#0086F9] mx-auto mb-4" strokeWidth={1.5} />
                <div className="font-display text-5xl font-bold bg-gradient-to-br from-[#2D98F1] to-[#2575FC] bg-clip-text text-transparent">{s.v}</div>
                <div className="text-sm text-white/60 mt-2">{s.k}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials — clinical note cards, all equal */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-5">
              <Activity className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#22D3EE]">From the Field</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Trusted by healthcare teams.</h2>
            <p className="mt-4 text-white/50 text-lg">Real clinics. Real outcomes.</p>
          </div>

          {/* Clinical record cards — all equal */}
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                recordId: 'CLN-2024-001', type: 'AI Receptionist', typeCls: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
                outcome: '40% after-hrs handled',
                initials: 'JT', name: 'Dr. James Thornton', role: 'Practice Owner · Thornton Family Medicine',
                avatarBg: 'linear-gradient(135deg,#046BD2,#2575FC)',
                quote: '"Rozper handled our HIPAA requirements out of the box. The AI Receptionist now handles 40% of our inbound after-hours calls without a single human intervention."',
              },
              {
                recordId: 'CLN-2024-002', type: 'SMS Reminders', typeCls: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
                outcome: '−30% no-show rate',
                initials: 'SK', name: 'Sarah Kim, RN', role: 'Nurse Manager · Valley Health Clinic',
                avatarBg: 'linear-gradient(135deg,#046BD2,#0086F9)',
                quote: '"Our no-show rate dropped 30% in the first month after switching to Rozper\'s automated SMS reminders. Patients actually show up now."',
              },
              {
                recordId: 'CLN-2024-003', type: 'Online Fax', typeCls: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
                outcome: '3 fax machines retired',
                initials: 'MR', name: 'Dr. Marcus Rivera', role: 'Medical Director · Eastside Urgent Care',
                avatarBg: 'linear-gradient(135deg,#0086F9,#2575FC)',
                quote: '"The online fax feature alone retired three fax machines. Every clinical document is fully traceable and audit-ready — our compliance officer finally has peace of mind."',
              },
              {
                recordId: 'CLN-2024-004', type: 'Multi-Site Routing', typeCls: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                outcome: 'Set up in 1 afternoon',
                initials: 'LP', name: 'Linda Park', role: 'Ops Manager · Greenway Medical Group',
                avatarBg: 'linear-gradient(135deg,#2575FC,#046BD2)',
                quote: '"Routing patients across our three locations was a manual nightmare. Rozper\'s multi-site call routing set up in an afternoon — our front desk couldn\'t believe how smooth it runs."',
              },
            ].map((t, i) => (
              <motion.div
                key={t.initials}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex flex-col rounded-2xl bg-[#111B2D] border border-white/10 hover:border-[#046BD2]/30 transition overflow-hidden"
              >
                {/* Clinical record header */}
                <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.07] bg-[#0B1220]/60">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-white/30">{t.recordId}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${t.typeCls}`}>{t.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span className="font-mono text-[9px] text-emerald-400">HIPAA</span>
                  </div>
                </div>
                {/* Outcome strip */}
                <div className="px-5 py-2 border-b border-white/[0.04] bg-[#046BD2]/[0.04]">
                  <span className="font-mono text-[10px] text-white/40">outcome: </span>
                  <span className="font-mono text-[10px] text-[#2D98F1]">{t.outcome}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <blockquote className="text-[14px] text-white/78 leading-relaxed flex-1 mb-5">{t.quote}</blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06] mt-auto">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0" style={{ background: t.avatarBg }}>{t.initials}</div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-[11px] text-white/40 mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8 text-center">Common questions</h2>
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
          <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0086F9] to-[#046BD2]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.2),transparent_60%)]" />
            <Heart className="w-12 h-12 mx-auto mb-6 text-white relative" strokeWidth={1.5} />
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight relative">Care for your patients.<br />We'll handle the calls.</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4 relative">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
                Request BAA <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
