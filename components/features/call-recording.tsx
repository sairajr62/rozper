'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Mic, Shield, Search, Download, Lock, FileText,
  ArrowRight, ChevronRight, Play, Pause,
} from 'lucide-react'
import { useState } from 'react'

const features = [
  { icon: Mic, title: 'HD Call Recording', desc: 'Crystal-clear recording on all inbound, outbound, and conference calls.' },
  { icon: Shield, title: 'Compliant Storage', desc: 'HIPAA-eligible, PCI DSS-safe, and SOC 2 certified storage with encryption at rest.' },
  { icon: Search, title: 'AI-Powered Search', desc: 'Search across thousands of recordings by keyword, topic, or customer name.' },
  { icon: Download, title: 'Instant Download', desc: 'Download recordings in MP3/WAV format or stream directly in the browser.' },
  { icon: Lock, title: 'Access Controls', desc: 'Role-based access — agents see their own, supervisors see their team\'s.' },
  { icon: FileText, title: 'Auto Transcription', desc: 'Every recording transcribed with speaker diarization and timestamp search.' },
]

const recordings = [
  { id: 'REC-1841', agent: 'Priya N.', duration: '8:42', date: 'Today 09:12', topic: 'Enterprise demo', score: 94 },
  { id: 'REC-1840', agent: 'Marcus L.', duration: '5:18', date: 'Today 09:04', topic: 'Billing question', score: 72 },
  { id: 'REC-1839', agent: 'Layla H.', duration: '12:03', date: 'Today 08:51', topic: 'Churn risk · escalated', score: 48 },
  { id: 'REC-1838', agent: 'Jordan K.', duration: '3:29', date: 'Today 08:40', topic: 'Onboarding call', score: 88 },
]

const faqs = [
  { q: 'Can I pause recording during sensitive data capture?', a: 'Yes. Pause-and-resume on a button press or DTMF trigger — ideal for PCI compliance during card entry.' },
  { q: 'How long are recordings retained?', a: 'Configurable retention from 30 days to 7 years. Enterprise plans support custom retention policies.' },
  { q: 'Can I search across all recordings?', a: 'Yes. AI search finds keywords, topics, and phrases across your entire recording archive.' },
]

function RecordingPlayer() {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Recordings · Today</span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#046BD2]/15 border border-[#046BD2]/25">
          <Search className="w-3 h-3 text-[#0086F9]" />
          <span className="text-[10px] font-mono text-[#2D98F1]">AI Search · Active</span>
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {recordings.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
            className="p-4 hover:bg-white/[0.02] transition">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPlaying(playing === r.id ? null : r.id)}
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition ${playing === r.id ? 'bg-[#0086F9]' : 'bg-[#046BD2]/20 border border-[#046BD2]/30 hover:bg-[#046BD2]/40'}`}
              >
                {playing === r.id
                  ? <Pause className="w-4 h-4 text-white" />
                  : <Play className="w-4 h-4 text-[#0086F9]" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-white/30">{r.id}</span>
                  <span className="text-sm font-medium text-white">{r.agent}</span>
                  <span className="text-xs text-white/40">· {r.duration}</span>
                </div>
                <div className="text-xs text-white/50 truncate">{r.topic}</div>
                {playing === r.id && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 flex items-end gap-0.5 h-5">
                    {Array.from({ length: 30 }).map((_, j) => (
                      <motion.div key={j} className="flex-1 rounded-sm bg-gradient-to-t from-[#046BD2] to-[#0086F9]"
                        animate={{ height: `${20 + Math.abs(Math.sin(j * 0.5)) * 80}%` }}
                        transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse', delay: j * 0.05 }} />
                    ))}
                  </motion.div>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`font-display text-lg font-bold ${r.score > 80 ? 'text-emerald-400' : r.score > 60 ? 'text-[#0086F9]' : 'text-amber-400'}`}>{r.score}</div>
                <div className="text-[9px] font-mono text-white/30">AI Score</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-white/10 bg-white/[0.01] flex items-center justify-between text-[10px] font-mono">
        <span className="text-white/30">4 of 2,841 recordings today</span>
        <span className="text-[#0086F9]">100% transcribed</span>
      </div>
    </div>
  )
}

export function FeatCallRecordingPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-x-clip">
      <Navbar />

      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-[#046BD2]/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/features" className="hover:text-[#0086F9]">features</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">call-recording</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Mic className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Features · Call Recording</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Record, search,<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">and replay</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              HD recording on every call — automatically transcribed, AI-scored, and searchable across your entire archive. Compliant storage built in.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Start a No-Pressure Conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <RecordingPlayer />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Recording built for compliance and coaching.</h2>
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
              <Mic className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white">Every call. Recorded. Searchable.</h2>
              <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition">
                Start a No-Pressure Conversation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
