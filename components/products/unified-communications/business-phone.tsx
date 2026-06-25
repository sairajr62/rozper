'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
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
  { name: 'Priya Nair',    ext: '101', status: 'On Call',   startSecs: 261, avatar: 'PN', dir: 'Inbound'  },
  { name: 'Marcus Lee',    ext: '102', status: 'Available', startSecs: null, avatar: 'ML', dir: null       },
  { name: 'Layla Hassan',  ext: '103', status: 'On Hold',   startSecs: 68,   avatar: 'LH', dir: 'Outbound'},
  { name: 'Jordan Kim',    ext: '104', status: 'On Call',   startSecs: 475,  avatar: 'JK', dir: 'Inbound' },
  { name: 'Diego Flores',  ext: '105', status: 'DND',       startSecs: null, avatar: 'DF', dir: null       },
]

const statusColor: Record<string, string> = {
  'On Call':   'text-[#0086F9] bg-[#046BD2]/15 border-[#046BD2]/30',
  'Available': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
  'On Hold':   'text-amber-400 bg-amber-400/10 border-amber-400/25',
  'DND':       'text-white/30 bg-white/5 border-white/10',
}

/** Live ticking duration, e.g. "4:22" */
function useLiveDuration(startSecs: number | null) {
  const [secs, setSecs] = useState(startSecs ?? 0)
  useEffect(() => {
    if (startSecs === null) return
    setSecs(startSecs)
    const id = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [startSecs])
  if (startSecs === null) return null
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/** Row component so each line can call useLiveDuration independently */
function CallRow({ line, i }: { line: typeof callLines[0]; i: number }) {
  const dur = useLiveDuration(line.startSecs)
  return (
    <motion.div
      key={line.ext}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35 + i * 0.08, ease: 'easeOut' }}
      className="px-3 py-2 flex items-center gap-2.5 hover:bg-white/[0.02] transition"
    >
      <div className="w-7 h-7 rounded-lg bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center text-[9px] font-bold text-[#2D98F1] shrink-0">
        {line.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-medium text-white truncate">{line.name}</div>
        <div className="text-[9px] font-mono text-white/30">Ext {line.ext}{line.dir ? ` · ${line.dir}` : ''}</div>
      </div>
      {dur && (
        <motion.span
          key={dur}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className="text-[9px] font-mono text-white/40 tabular-nums"
        >
          {dur}
        </motion.span>
      )}
      <motion.span
        className={`px-1.5 py-0.5 rounded border text-[8px] font-mono shrink-0 ${statusColor[line.status]}`}
        animate={line.status === 'On Call' ? { opacity: [1, 0.6, 1] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {line.status}
      </motion.span>
    </motion.div>
  )
}

function ActiveCallTimer() {
  const dur = useLiveDuration(261)
  return <span className="text-[9px] font-mono text-[#0086F9] mt-0.5">{dur}</span>
}

function SoftphoneUI() {
  return (
    <div className="bg-[#0B1220] overflow-hidden">
      {/* App header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-3 py-2 bg-[#0D1627] border-b border-white/[0.07] flex items-center justify-between"
      >
        <div className="flex items-center gap-1.5">
          <PhoneCall className="w-3 h-3 text-[#0086F9]" />
          <span className="text-[10px] font-mono text-white/60">Rozper Phone · Live Lines</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] font-mono">
          <motion.span
            className="text-emerald-400"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >● 2 active</motion.span>
          <span className="text-amber-400">1 hold</span>
        </div>
      </motion.div>

      {/* Active call */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, ease: 'easeOut' }}
        className="px-3 pt-3 pb-2 border-b border-white/[0.06] bg-[#046BD2]/5"
      >
        <div className="text-[8px] font-mono text-[#0086F9]/50 uppercase tracking-widest mb-2">Active Call</div>
        <div className="flex items-center gap-3">
          {/* Avatar with pulse ring */}
          <div className="relative shrink-0">
            <motion.div
              className="absolute inset-0 rounded-xl bg-[#046BD2]/30"
              animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            />
            <div className="relative w-9 h-9 rounded-xl bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[11px] font-bold text-[#2D98F1]">
              PN
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-semibold text-white">Priya Nair</div>
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-mono text-[#0086F9]/70">Inbound · Ext 101 ·</span>
              <ActiveCallTimer />
            </div>
            {/* Animated waveform */}
            <div className="mt-1.5 flex items-end gap-[2px] h-3">
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm bg-[#0086F9]"
                  animate={{ scaleY: [0.15, 0.4 + Math.abs(Math.sin(i * 0.9)) * 0.6, 0.15] }}
                  transition={{ duration: 0.6 + (i % 3) * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.035 }}
                  style={{ transformOrigin: 'bottom' }}
                />
              ))}
            </div>
          </div>

          {/* Call controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <motion.button
              whileTap={{ scale: 0.88 }}
              className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
            >
              <MicOff className="w-2.5 h-2.5 text-white/50" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
            >
              <Video className="w-2.5 h-2.5 text-white/50" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              animate={{ boxShadow: ['0 0 0 0 rgba(239,68,68,0)', '0 0 0 4px rgba(239,68,68,0.2)', '0 0 0 0 rgba(239,68,68,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-6 rounded-full bg-red-500/80 flex items-center justify-center"
            >
              <PhoneCall className="w-2.5 h-2.5 text-white rotate-[135deg]" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Other lines */}
      <div className="divide-y divide-white/[0.04]">
        {callLines.slice(1).map((line, i) => (
          <CallRow key={line.ext} line={line} i={i} />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="px-3 py-2 border-t border-white/[0.06] text-[8px] font-mono text-white/25"
      >
        5 extensions · HD voice · 99.99% uptime SLA
      </motion.div>
    </div>
  )
}

export function ProdUCaaSBusinessPhonePageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-x-clip">
      <Navbar />

      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-[#046BD2]/8 blur-[160px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">
              /
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/unified-communications/" className="hover:text-[#0086F9]">
              ucaas
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">business-phone</span>
          </div>
        </div>

        {/* Hero — left copy + right phone, aligned at top so phone never overflows */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:items-start">
          {/* Left copy */}
          <div className="pt-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8"
            >
              <Phone className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">
                UCaaS · Business Phone
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-3xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              Cloud calling for
              <br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">
                global teams
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              Local numbers in 150+ countries, HD voice on any device, smart
              routing — all managed from one dashboard. No hardware, no carrier
              contracts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                href="/free-trial/"
                className="group inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold transition"
              >
                Start a free trial{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing/"
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full border border-white/15 text-sm sm:text-base text-white font-medium hover:bg-white/5 transition"
              >
                See pricing
              </Link>
            </motion.div>
          </div>

          {/* Right — phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.25, ease: "easeOut" },
            }}
            className="hidden sm:flex justify-center lg:justify-end"
          >
            {/* Phone shell — fixed width so it never overflows */}
            <div className="relative w-[252px] shrink-0">
              {/* Glow halo */}
              <div className="absolute -inset-8 rounded-[60px] bg-[#046BD2]/12 blur-3xl pointer-events-none" />

              {/* Body */}
              <div className="relative rounded-[38px] bg-gradient-to-b from-[#1C2A3E] to-[#0F1A2C] border-[3px] border-white/[0.09] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.07)] p-[8px]">
                {/* Volume buttons */}
                <div className="absolute -left-[4px] top-[88px] w-[4px] h-6 rounded-l-full bg-white/10" />
                <div className="absolute -left-[4px] top-[120px] w-[4px] h-6 rounded-l-full bg-white/10" />
                {/* Power button */}
                <div className="absolute -right-[4px] top-[100px] w-[4px] h-10 rounded-r-full bg-white/10" />

                {/* Screen */}
                <div className="rounded-[32px] overflow-hidden bg-[#0B1220]">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-4 pt-2.5 pb-1.5 bg-[#0B1220]">
                    <span className="text-[9px] font-mono text-white/45">
                      9:41
                    </span>
                    {/* Dynamic island */}
                    <div className="w-16 h-4 rounded-full bg-black flex items-center justify-center gap-1">
                      <motion.div
                        className="w-1 h-1 rounded-full bg-[#046BD2]"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1A2638]" />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <div className="w-3.5 h-2 rounded-[2px] border border-white/30 flex items-center px-[2px]">
                        <div className="h-full w-2/3 rounded-[1px] bg-white/50" />
                      </div>
                    </div>
                  </div>

                  {/* App */}
                  <SoftphoneUI />

                  {/* Home indicator */}
                  <div className="flex justify-center pt-1.5 pb-2 bg-[#0B1220]">
                    <div className="w-16 h-[3px] rounded-full bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
              Enterprise calling. Startup simplicity.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#111B2D] border border-white/[0.07] hover:border-[#046BD2]/30 transition-colors group"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-all mt-0.5">
                  <f.icon
                    className="w-4 h-4 text-[#0086F9]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-[#0086F9] transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8 text-center">
            FAQ
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:bg-white/[0.05] transition"
              >
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
          <div className="relative rounded-3xl overflow-hidden bg-[#070B14] border border-white/10 p-6 sm:p-12 md:p-20 text-center">
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
              <Phone className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white">
                Your team. Calling everywhere.
              </h2>
              <div className="mt-10 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3">
                <Link
                  href="/free-trial/"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-xs sm:text-base font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition whitespace-nowrap"
                >
                  Start a free trial <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
                <Link
                  href="/pricing/"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-xs sm:text-base text-white font-semibold transition whitespace-nowrap"
                >
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
