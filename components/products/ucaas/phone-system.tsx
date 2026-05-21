'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  GitBranch, Users, Clock, Globe, Settings, Shield,
  ArrowRight, ChevronRight, Building2, Phone,
} from 'lucide-react'

const features = [
  { icon: Users, title: 'Extensions & Hunt Groups', desc: 'Assign extensions, create ring groups, and route calls to teams or individuals.' },
  { icon: GitBranch, title: 'Multi-Level IVR', desc: 'Unlimited IVR menus built visually — route by department, language, or time of day.' },
  { icon: Clock, title: 'Business Hours Rules', desc: 'Separate routing for business hours, after-hours, weekends, and holidays.' },
  { icon: Globe, title: 'Multi-Site Support', desc: 'Manage multiple office locations from one dashboard — unified dial plan across sites.' },
  { icon: Settings, title: 'Visual Dial Plan Builder', desc: 'Drag-and-drop dial plan editor — no PBX expertise or IT ticket required.' },
  { icon: Shield, title: 'E911 & Regulatory Compliance', desc: 'E911, CNAM, STIR/SHAKEN, and GDPR compliance built into every deployment.' },
]

const faqs = [
  { q: 'Does it replace my existing PBX?', a: 'Yes. Rozper is a full cloud PBX — extensions, hunt groups, IVR, dial plans, and more without any hardware.' },
  { q: 'How many extensions can I have?', a: 'Unlimited extensions on all plans. Each user gets their own DID, voicemail, and call settings.' },
  { q: 'Can I connect multiple office locations?', a: 'Yes. Multi-site dial plans with shared extensions, intercom, and central management across all locations.' },
]

const departments = [
  { name: 'Sales', ext: '100', agents: 8, active: 3 },
  { name: 'Support', ext: '200', agents: 12, active: 7 },
  { name: 'Billing', ext: '300', agents: 4, active: 2 },
  { name: 'Enterprise', ext: '400', agents: 6, active: 1 },
]

function PhoneSystemDiagram() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Phone System · Dial Plan</span>
        </div>
        <span className="text-[10px] font-mono text-white/30">30 extensions · 4 sites</span>
      </div>

      <div className="p-5">
        {/* Trunk */}
        <div className="flex items-center justify-center mb-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-3 rounded-2xl bg-[#046BD2]/20 border border-[#046BD2]/40 text-center">
            <Phone className="w-5 h-5 text-[#0086F9] mx-auto mb-1" />
            <div className="text-xs font-mono font-bold text-white">+1 (800) 555-ROZP</div>
            <div className="text-[10px] font-mono text-[#0086F9]/60 mt-0.5">Main Number · IVR</div>
          </motion.div>
        </div>

        {/* Connector */}
        <div className="flex justify-center mb-4">
          <div className="w-px h-6 bg-[#046BD2]/40" />
        </div>

        {/* Departments */}
        <div className="grid grid-cols-2 gap-3">
          {departments.map((dept, i) => (
            <motion.div key={dept.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
              className="p-4 rounded-2xl bg-[#0B1220] border border-white/8 hover:border-[#046BD2]/30 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">{dept.name}</span>
                <span className="text-[10px] font-mono text-[#0086F9]">Ext {dept.ext}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  {Array.from({ length: Math.min(dept.active, 4) }).map((_, j) => (
                    <div key={j} className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/30 border-dashed" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-white/35">{dept.active}/{dept.agents} active</span>
              </div>
              <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#046BD2] to-emerald-400" style={{ width: `${(dept.active / dept.agents) * 100}%` }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* After hours note */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-4 px-4 py-3 rounded-xl bg-amber-400/5 border border-amber-400/15 flex items-center gap-3">
          <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <div>
            <div className="text-xs font-mono text-amber-400">After-Hours Rule</div>
            <div className="text-[10px] font-mono text-white/30 mt-0.5">Weekdays 6pm–8am → AI Receptionist</div>
          </div>
        </motion.div>
      </div>

      <div className="px-5 py-3 border-t border-white/10 text-[10px] font-mono text-white/30">
        Unlimited extensions · Visual dial plan · No hardware · 99.99% uptime
      </div>
    </div>
  )
}

export function ProdUCaaSPhoneSystemPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-hidden">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(0,134,249,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,134,249,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/ucaas" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">phone-system</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Building2 className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · Phone System</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Enterprise PBX.<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">Zero hardware</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Extensions, hunt groups, IVR, and dial plans hosted on a carrier-grade network. Enterprise phone features without the enterprise complexity.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Build your system <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <PhoneSystemDiagram />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Every PBX feature. Cloud-delivered.</h2>
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
            <Building2 className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Your whole company. One phone system.</h2>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
              Build your system <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
