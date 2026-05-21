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

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-5">
              <Activity className="w-3.5 h-3.5 text-[#2D98F1]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">From the Field</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Trusted by healthcare teams.</h2>
            <p className="mt-4 text-white/50 text-lg">Real clinics. Real outcomes.</p>
          </div>

          {/* Featured banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl border border-[#046BD2]/30 bg-gradient-to-br from-[#046BD2]/20 via-[#046BD2]/10 to-[#2575FC]/10 p-8 md:p-10 overflow-hidden mb-6"
          >
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#0086F9]/15 blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#2575FC]/10 blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#0086F9] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <blockquote className="font-display text-2xl md:text-3xl font-medium leading-snug text-white">
                  "Rozper handled our HIPAA requirements out of the box. The AI Receptionist now handles <span className="text-[#2D98F1]">40% of our inbound after-hours calls</span> without a single human intervention."
                </blockquote>
              </div>
              <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 md:border-l md:border-white/10 md:pl-8">
                <div className="w-14 h-14 rounded-full bg-[#046BD2]/30 border border-[#046BD2]/50 flex items-center justify-center text-[#2D98F1] font-display font-bold shrink-0">JT</div>
                <div>
                  <div className="font-semibold">Dr. James Thornton</div>
                  <div className="text-xs text-white/50 mt-0.5">Practice Owner</div>
                  <div className="text-xs text-white/50">Thornton Family Medicine</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Equal 3-column row */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stars: 'text-emerald-400', accent: 'text-emerald-400', initials: 'SK', name: 'Sarah Kim, RN', role: 'Nurse Manager · Valley Health Clinic', badge: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400', quote: <>"Our no-show rate dropped <span className="text-emerald-400 font-semibold">30% in the first month</span> after switching to Rozper's automated SMS reminders. Patients actually show up now."</> },
              { stars: 'text-sky-400', accent: 'text-sky-400', initials: 'MR', name: 'Dr. Marcus Rivera', role: 'Medical Director · Eastside Urgent Care', badge: 'bg-sky-500/20 border-sky-500/30 text-sky-400', quote: <>"The online fax feature alone retired three fax machines. Every clinical document is <span className="text-sky-400 font-semibold">fully traceable and audit-ready</span> — our compliance officer finally has peace of mind."</> },
              { stars: 'text-violet-400', accent: 'text-violet-400', initials: 'LP', name: 'Linda Park', role: 'Ops Manager · Greenway Medical Group', badge: 'bg-violet-500/20 border-violet-500/30 text-violet-400', quote: <>"Routing patients across our three locations was a manual nightmare. Rozper's <span className="text-violet-400 font-semibold">multi-site call routing set up in an afternoon</span> — our front desk team couldn't believe how smooth it runs."</> },
            ].map((t, i) => (
              <motion.div
                key={t.initials}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-colors p-7"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className={`w-4 h-4 fill-current ${t.stars}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <blockquote className="text-base text-white/80 leading-relaxed mb-6 flex-1">{t.quote}</blockquote>
                <div className="flex items-center gap-3 pt-5 border-t border-white/10 mt-auto">
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-display font-bold text-sm shrink-0 ${t.badge}`}>{t.initials}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-white/50 mt-0.5">{t.role}</div>
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
