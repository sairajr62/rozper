'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  GitBranch, Clock, Globe, Settings, Phone, Volume2,
  ArrowRight, ChevronRight, Layers,
} from 'lucide-react'

const features = [
  { icon: GitBranch, title: 'Multi-Level IVR', desc: 'Unlimited menu levels — route by department, language, product, or custom criteria.' },
  { icon: Clock, title: 'Business Hours Rules', desc: 'Route differently after hours, weekends, and holidays — fully automated.' },
  { icon: Globe, title: 'Multi-Language Menus', desc: 'Serve callers in their language — menus available in 40+ languages.' },
  { icon: Settings, title: 'Visual Flow Builder', desc: 'Drag-and-drop call flow designer — no code, no telephony expertise required.' },
  { icon: Phone, title: 'Hunt Group Routing', desc: 'Ring teams simultaneously or in sequence — call the right person, every time.' },
  { icon: Volume2, title: 'Custom Hold Music', desc: 'Upload your own hold audio and on-hold messages per queue or department.' },
]

const faqs = [
  { q: 'Can I set different menus for different hours?', a: 'Yes. Business hours, after-hours, holiday, and weekend rules are all configurable per number.' },
  { q: 'How many IVR levels can I have?', a: 'Unlimited levels. Build simple 2-level menus or complex enterprise routing — no limit.' },
  { q: 'Can callers skip the menu?', a: 'Yes. Configure skip-ahead options for VIP callers or caller ID-based routing.' },
]

function CallFlowDiagram() {
  return (
    <div className="relative rounded-3xl bg-[#111B2D] border border-white/10 p-6 overflow-hidden">
      <div className="text-[10px] font-mono uppercase tracking-widest text-[#0086F9]/60 mb-4">// call-flow.config</div>

      <svg viewBox="0 0 340 420" className="w-full max-h-[420px]">
        {/* Inbound */}
        <g transform="translate(120, 10)">
          <rect width="100" height="36" rx="8" fill="rgba(4,107,210,0.2)" stroke="#0086F9" strokeWidth="1.5" />
          <text x="50" y="23" textAnchor="middle" fill="#2D98F1" fontSize="11" fontFamily="monospace" fontWeight="bold">Inbound Call</text>
        </g>
        <line x1="170" y1="46" x2="170" y2="70" stroke="#0086F9" strokeWidth="1.5" strokeDasharray="3,3" />

        {/* Greeting */}
        <g transform="translate(100, 70)">
          <rect width="140" height="36" rx="8" fill="rgba(0,134,249,0.1)" stroke="#0086F9" strokeWidth="1" />
          <text x="70" y="23" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="monospace">AI Greeting</text>
        </g>
        <line x1="170" y1="106" x2="170" y2="130" stroke="#0086F9" strokeWidth="1.5" />

        {/* IVR menu */}
        <g transform="translate(85, 130)">
          <rect width="170" height="36" rx="8" fill="rgba(37,117,252,0.15)" stroke="#2575FC" strokeWidth="1.5" />
          <text x="85" y="23" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="monospace" fontWeight="600">IVR Menu</text>
        </g>

        {/* Branch lines */}
        <line x1="110" y1="166" x2="60" y2="200" stroke="#0086F9" strokeWidth="1" />
        <line x1="170" y1="166" x2="170" y2="200" stroke="#0086F9" strokeWidth="1" />
        <line x1="230" y1="166" x2="280" y2="200" stroke="#0086F9" strokeWidth="1" />

        {/* 1 - Sales */}
        <g transform="translate(20, 200)">
          <rect width="80" height="30" rx="6" fill="rgba(4,107,210,0.15)" stroke="#046BD2" strokeWidth="1" />
          <text x="40" y="14" textAnchor="middle" fill="#2D98F1" fontSize="9" fontFamily="monospace">Press 1</text>
          <text x="40" y="25" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="monospace">Sales</text>
        </g>

        {/* 2 - Support */}
        <g transform="translate(130, 200)">
          <rect width="80" height="30" rx="6" fill="rgba(4,107,210,0.15)" stroke="#046BD2" strokeWidth="1" />
          <text x="40" y="14" textAnchor="middle" fill="#2D98F1" fontSize="9" fontFamily="monospace">Press 2</text>
          <text x="40" y="25" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="monospace">Support</text>
        </g>

        {/* 3 - Billing */}
        <g transform="translate(240, 200)">
          <rect width="80" height="30" rx="6" fill="rgba(4,107,210,0.15)" stroke="#046BD2" strokeWidth="1" />
          <text x="40" y="14" textAnchor="middle" fill="#2D98F1" fontSize="9" fontFamily="monospace">Press 3</text>
          <text x="40" y="25" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="monospace">Billing</text>
        </g>

        {/* Second level */}
        <line x1="60" y1="230" x2="60" y2="270" stroke="#0086F9" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="170" y1="230" x2="170" y2="270" stroke="#0086F9" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="280" y1="230" x2="280" y2="270" stroke="#0086F9" strokeWidth="1" strokeDasharray="2,2" />

        {/* Hunt groups */}
        <g transform="translate(20, 270)">
          <rect width="80" height="28" rx="6" fill="rgba(45,152,241,0.1)" stroke="#2D98F1" strokeWidth="1" />
          <text x="40" y="18" textAnchor="middle" fill="#2D98F1" fontSize="9" fontFamily="monospace">Hunt Group</text>
        </g>
        <g transform="translate(130, 270)">
          <rect width="80" height="28" rx="6" fill="rgba(45,152,241,0.1)" stroke="#2D98F1" strokeWidth="1" />
          <text x="40" y="18" textAnchor="middle" fill="#2D98F1" fontSize="9" fontFamily="monospace">Queue</text>
        </g>
        <g transform="translate(240, 270)">
          <rect width="80" height="28" rx="6" fill="rgba(45,152,241,0.1)" stroke="#2D98F1" strokeWidth="1" />
          <text x="40" y="18" textAnchor="middle" fill="#2D98F1" fontSize="9" fontFamily="monospace">Voicemail</text>
        </g>

        {/* After-hours path */}
        <g transform="translate(100, 330)">
          <rect width="140" height="28" rx="6" fill="rgba(4,107,210,0.08)" stroke="#046BD2" strokeWidth="1" strokeDasharray="3,2" />
          <text x="70" y="18" textAnchor="middle" fill="#0086F9" fontSize="9" fontFamily="monospace">After Hours → AI</text>
        </g>

        <text x="170" y="395" textAnchor="middle" fill="#0086F9" opacity="0.4" fontSize="9" fontFamily="monospace">Holiday / Weekend rules applied</text>
      </svg>
    </div>
  )
}

export function FeatAutoAttendantPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-x-clip">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(rgba(0,134,249,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,134,249,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/features" className="hover:text-[#0086F9]">features</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">auto-attendant</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Layers className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Features · Auto-Attendant</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Route every call<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">exactly right</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Professional multi-level IVR with business hours rules, hunt groups, and AI escalation — built in a visual drag-and-drop editor. No telephony expertise required.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Build your call flow <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}>
            <CallFlowDiagram />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">IVR that matches how your business actually works.</h2>
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
            <GitBranch className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Build your call flow in minutes.</h2>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
              Start building <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
