'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Phone, Globe, Zap, Shield, RefreshCw, Headphones,
  ArrowRight, ChevronRight, PhoneCall, MicOff, Video,
} from 'lucide-react'

const features = [
  { icon: Globe, title: 'Local Numbers in 150+ Countries', desc: 'Look local everywhere — provision numbers in 150+ countries instantly.' },
  { icon: Zap, title: 'HD Voice & Video Calling', desc: 'Crystal-clear calls on any device — desk phone, browser, or mobile app.' },
  { icon: RefreshCw, title: 'Smart Call Routing', desc: 'Time-based, skills-based, and AI-powered routing out of the box.' },
  { icon: Shield, title: 'Enterprise-Grade Uptime', desc: '99.99% SLA backed by redundant global infrastructure.' },
  { icon: Headphones, title: 'Softphone & Mobile App', desc: 'One app across Mac, Windows, iOS, and Android — no hardware needed.' },
  { icon: Phone, title: 'Toll-Free & Local Numbers', desc: 'Every plan includes toll-free numbers in 40+ countries at no extra charge.' },
]

const faqs = [
  { q: 'Do I need physical hardware?', a: 'No. Rozper is entirely software-based. Use our desktop app, browser, or mobile app on any device.' },
  { q: 'Can I keep my existing numbers?', a: 'Yes — porting takes 1–2 weeks. We handle the process with your current carrier.' },
  { q: 'Does it work internationally?', a: 'Yes. Local numbers, inbound routing, and HD calls in 150+ countries on every plan.' },
]

const callLines = [
  { name: 'Priya Nair', ext: '101', status: 'On Call', duration: '4:21', avatar: 'PN', dir: 'Inbound' },
  { name: 'Marcus Lee', ext: '102', status: 'Available', duration: null, avatar: 'ML', dir: null },
  { name: 'Layla Hassan', ext: '103', status: 'On Hold', duration: '1:08', avatar: 'LH', dir: 'Outbound' },
  { name: 'Jordan Kim', ext: '104', status: 'On Call', duration: '7:55', avatar: 'JK', dir: 'Inbound' },
  { name: 'Diego Flores', ext: '105', status: 'DND', duration: null, avatar: 'DF', dir: null },
]

const statusColor: Record<string, string> = {
  'On Call': 'text-[#0086F9] bg-[#046BD2]/15 border-[#046BD2]/25',
  'Available': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'On Hold': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'DND': 'text-white/30 bg-white/5 border-white/10',
}

function SoftphoneUI() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Rozper Phone · Live Lines</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <span className="text-emerald-400">2 active</span>
          <span className="text-amber-400">1 hold</span>
        </div>
      </div>

      {/* Active call highlight */}
      <div className="p-5 border-b border-white/5 bg-[#046BD2]/5">
        <div className="text-[10px] font-mono text-[#0086F9]/60 uppercase tracking-widest mb-3">Active Call</div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-sm font-bold text-[#2D98F1]">
            PN
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold">Priya Nair</div>
            <div className="text-[10px] font-mono text-[#0086F9] mt-0.5">Inbound · Ext 101 · 4:21</div>
            <div className="mt-2 flex items-end gap-0.5 h-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div key={i} className="flex-1 rounded-sm bg-[#0086F9]"
                  animate={{ height: `${15 + Math.abs(Math.sin(i * 0.7)) * 85}%` }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.04 }} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
              <MicOff className="w-3.5 h-3.5 text-white/50" />
            </button>
            <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
              <Video className="w-3.5 h-3.5 text-white/50" />
            </button>
            <button className="w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center hover:bg-red-500 transition">
              <PhoneCall className="w-3.5 h-3.5 text-white rotate-[135deg]" />
            </button>
          </div>
        </div>
      </div>

      {/* All lines */}
      <div className="divide-y divide-white/5">
        {callLines.slice(1).map((line, i) => (
          <motion.div key={line.ext} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 + 0.2 }}
            className="px-5 py-3 flex items-center gap-3 hover:bg-white/[0.02] transition">
            <div className="w-8 h-8 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center text-[10px] font-bold text-[#2D98F1]">
              {line.avatar}
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-white">{line.name}</div>
              <div className="text-[10px] font-mono text-white/30">Ext {line.ext}{line.dir ? ` · ${line.dir}` : ''}</div>
            </div>
            {line.duration && <span className="text-[10px] font-mono text-white/40">{line.duration}</span>}
            <span className={`px-2 py-0.5 rounded border text-[9px] font-mono ${statusColor[line.status]}`}>{line.status}</span>
          </motion.div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-white/10 text-[10px] font-mono text-white/30">
        5 extensions · HD voice · 99.99% uptime SLA
      </div>
    </div>
  )
}

export function ProdUCaaSBusinessPhonePageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-hidden">
      <Navbar />

      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-[#046BD2]/8 blur-[160px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/ucaas" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">business-phone</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Phone className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · Business Phone</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Cloud calling for<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">global teams</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Local numbers in 150+ countries, HD voice on any device, smart routing — all managed from one dashboard. No hardware, no carrier contracts.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Start calling <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="mt-10 grid grid-cols-3 gap-3">
              {[{ v: '150+', k: 'Countries' }, { v: '99.99%', k: 'Uptime SLA' }, { v: '<1s', k: 'Call Setup' }].map(s => (
                <div key={s.k} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="font-display text-2xl font-bold text-[#0086F9]">{s.v}</div>
                  <div className="text-[10px] font-mono text-white/40 mt-1 uppercase tracking-wider">{s.k}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <SoftphoneUI />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Enterprise calling. Startup simplicity.</h2>
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
            <Phone className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Your team. Calling everywhere.</h2>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
              Start calling <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
