'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Phone, Globe, Zap, Shield, RefreshCw, BarChart3,
  ArrowRight, ChevronRight, Hash,
} from 'lucide-react'

const features = [
  { icon: Phone, title: '800, 888, 877, 866, 855, 844', desc: 'All major toll-free prefixes available — provision instantly with no waiting.' },
  { icon: Globe, title: 'International Toll-Free', desc: 'ITFN numbers let international customers call for free from 40+ countries.' },
  { icon: Zap, title: 'Instant Provisioning', desc: 'Live within minutes — no carrier paperwork, no waiting, no fax required.' },
  { icon: Shield, title: 'Number Porting', desc: 'Keep your existing toll-free number — porting typically takes 1-2 weeks.' },
  { icon: RefreshCw, title: 'Call Forwarding', desc: 'Route toll-free calls to any number, team, or IVR menu automatically.' },
  { icon: BarChart3, title: 'Vanity Numbers', desc: 'Search for memorable vanity numbers — 1-800-ROZPER style.' },
]

const faqs = [
  { q: 'Can I keep my existing toll-free number?', a: 'Yes. We port toll-free numbers from any US carrier — the process takes 1-2 weeks.' },
  { q: 'Do toll-free numbers work internationally?', a: 'For inbound from the US/Canada, yes. International toll-free (ITFN) is available for 40+ countries.' },
  { q: 'How quickly can I get a toll-free number?', a: 'Instantly for new numbers. Porting existing numbers typically takes 1-2 weeks.' },
]

const prefixes = ['800', '888', '877', '866', '855', '844', '833']
const sampleNumbers = [
  { number: '1-800-555-0192', vanity: null, available: true },
  { number: '1-888-ROZPER-1', vanity: 'ROZPER', available: true },
  { number: '1-877-555-0143', vanity: null, available: true },
  { number: '1-866-555-0221', vanity: null, available: false },
]

function NumberBrowser() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Number Search</span>
        </div>
      </div>

      {/* Prefix selector */}
      <div className="p-5 border-b border-white/5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">Select prefix</div>
        <div className="flex flex-wrap gap-2">
          {prefixes.map((p, i) => (
            <motion.div key={p} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition ${i === 0 ? 'bg-[#046BD2] border-[#046BD2] text-white' : 'bg-white/[0.03] border-white/10 text-white/50 hover:border-[#046BD2]/40 hover:text-[#0086F9]'}`}>
              1-{p}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="p-5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">Available numbers</div>
        <div className="space-y-2">
          {sampleNumbers.map((n, i) => (
            <motion.div key={n.number} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 + 0.3 }}
              className={`flex items-center justify-between p-3 rounded-xl border transition ${n.available ? 'bg-white/[0.02] border-white/8 hover:border-[#046BD2]/40' : 'border-white/5 opacity-50'}`}>
              <div>
                <div className={`font-mono text-sm font-bold ${n.available ? 'text-white' : 'text-white/30'}`}>{n.number}</div>
                {n.vanity && <div className="text-[10px] font-mono text-[#0086F9] mt-0.5">Vanity available</div>}
              </div>
              {n.available
                ? <span className="px-2.5 py-1 rounded-lg bg-[#046BD2] text-[10px] font-mono text-white cursor-pointer hover:bg-[#0086F9] transition">Claim</span>
                : <span className="text-[10px] font-mono text-white/20">Taken</span>}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-white/10 text-[10px] font-mono text-white/30">
        10,000+ toll-free numbers available · instant provisioning
      </div>
    </div>
  )
}

export function FeatTollFreeNumbersPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-x-clip">
      <Navbar />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#046BD2]/8 blur-[160px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/features" className="hover:text-[#0086F9]">features</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">toll-free-numbers</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Phone className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Features · Toll-Free Numbers</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Toll-free in{' '}
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">minutes</span>,<br />not weeks.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Provision 800, 888, 877 and all major toll-free prefixes instantly — with smart routing, call recording, and AI built in from the first ring.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Get your number <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <NumberBrowser />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Everything included with every toll-free number.</h2>
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
          <div className="relative rounded-3xl overflow-hidden bg-[#070B14] border border-white/10 p-12 md:p-20 text-center">
            {/* Left arc glow */}
            <div className="hidden sm:block absolute -left-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none" aria-hidden>
              <motion.svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "blur(28px)" }} animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
                <circle cx="100" cy="100" r="78" stroke="#22D3EE" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
                <circle cx="100" cy="100" r="54" stroke="#046BD2" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(40 100 100)" />
              </motion.svg>
            </div>
            {/* Right arc glow */}
            <div className="hidden sm:block absolute -right-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none" aria-hidden>
              <motion.svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "blur(28px)" }} animate={{ rotate: -360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
                <circle cx="100" cy="100" r="78" stroke="#0086F9" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
                <circle cx="100" cy="100" r="54" stroke="#22D3EE" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(-40 100 100)" />
              </motion.svg>
            </div>
            {/* Faint background grid */}
            <div className="absolute inset-0 opacity-[0.18] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)" }} />
            <div className="relative">
              <Hash className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Claim your toll-free number today.</h2>
              <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition">
                Get your number <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
