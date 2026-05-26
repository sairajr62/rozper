'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Sparkles, ArrowRight, ChevronRight, Phone, Bot, BarChart3, Brain,
  FileText, Mic, Activity, Cpu, Waves, Stars
} from 'lucide-react'

const aiTools = [
  {
    name: 'AI Receptionist',
    tag: 'voice.ai',
    icon: Phone,
    bullet: '24/7 inbound · books meetings · qualifies leads',
    metric: '24/7',
  },
  {
    name: 'AI Virtual Assistant',
    tag: 'live.ai',
    icon: Bot,
    bullet: 'Real-time coaching · auto-summaries · CRM logging',
    metric: '<1s',
  },
  {
    name: 'Conversation Analytics',
    tag: 'signal.ai',
    icon: BarChart3,
    bullet: '100% transcription · sentiment · intent · trends',
    metric: '100%',
  },
]

const capabilities = [
  { icon: Mic, title: 'Real-Time Coaching', desc: 'Live guidance — objection handling, compliance, suggested replies on every call.' },
  { icon: FileText, title: 'Auto CRM Logging', desc: 'AI writes call notes, updates records, and creates follow-up tasks automatically.' },
  { icon: Activity, title: 'Sentiment & Intent', desc: 'Every interaction scored, every signal surfaced — never miss the next deal.' },
  { icon: Brain, title: 'Custom Knowledge Base', desc: 'Train on your FAQs, scripts, and procedures in minutes. AI learns your voice.' },
  { icon: Cpu, title: 'Edge-Latency Inference', desc: 'Sub-second response on regional carriers — calls feel human, not robotic.' },
  { icon: Stars, title: 'Included on Every Seat', desc: 'No upcharge. All three AI tools live on every Rozper seat from day one.' },
]

const flow = [
  { step: '01', title: 'Connect Your Lines', desc: 'Port existing numbers or provision new ones. AI activates instantly.' },
  { step: '02', title: 'Train Your AI', desc: 'Upload FAQs, scripts, knowledge base. AI learns your business in minutes.' },
  { step: '03', title: 'Let AI Work', desc: 'AI answers, assists, analyzes — around the clock, on every channel.' },
]

const faqs = [
  { q: 'Is AI included in the base price?', a: 'Yes. All three AI tools — Receptionist, Virtual Assistant, and Conversation Analytics — are included on every Rozper seat. Most platforms charge $50-100+ per user for AI.' },
  { q: 'How does the AI Receptionist work?', a: 'Natural-language AI answers inbound calls 24/7, qualifies leads, books appointments on your calendar, and routes to the right team — no human required.' },
  { q: 'What does the AI Virtual Assistant do?', a: 'Runs during live calls and messages: real-time coaching, suggested responses, auto-generated summaries, automatic CRM logging.' },
  { q: 'How accurate is Conversation Analytics?', a: 'Transcription accuracy exceeds 95% for clear audio. Analytics runs on 100% of conversations — not just a sample.' },
  { q: 'Can I customize AI for my business?', a: 'Yes. Train on FAQs, scripts, products, and procedures. Setup typically takes under an hour.' },
]

function DeviceMockup() {
  const chatMessages = [
    { role: 'user' as const, text: "What's my account status?", delay: 0.4 },
    { role: 'ai' as const, text: "Account active. Invoice #2847 paid May 1.", delay: 0.9 },
    { role: 'user' as const, text: "Can I upgrade my plan?", delay: 1.6 },
    { role: 'ai' as const, text: "Happy to help! Connecting you to billing.", delay: 2.1 },
  ]
  const barHeights = [55, 70, 45, 85, 60, 90, 72]
  const waveHeights = [2, 4, 6, 3, 8, 5, 7, 3, 6, 4]

  return (
    <motion.div
      className="relative w-full max-w-[440px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-[#0086F9]/12 blur-3xl rounded-full pointer-events-none" />

      {/* ── LAPTOP ────────────────────────────────────────────────────── */}
      <div className="relative shadow-2xl">
        {/* Screen bezel */}
        <div className="rounded-t-2xl bg-[#0a1422] border border-white/[0.12] overflow-hidden">
          {/* Camera strip */}
          <div className="flex justify-center items-center h-5 bg-[#060d18]">
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          </div>

          {/* Screen content */}
          <div className="p-2 sm:p-3 bg-[#0d1626] h-[200px] sm:h-[240px]">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#ff5f57]/50" />
                <div className="w-2 h-2 rounded-full bg-[#febc2e]/50" />
                <div className="w-2 h-2 rounded-full bg-[#28c840]/50" />
              </div>
              <div className="flex-1 h-3 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center px-1.5">
                <span className="text-[5.5px] text-white/20 font-mono">app.rozper.com/ai-dashboard</span>
              </div>
              <div className="flex items-center gap-1">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[5.5px] text-white/30 font-mono">3 live</span>
              </div>
            </div>

            {/* Two-column dashboard */}
            <div className="grid grid-cols-[1.3fr_1fr] gap-1.5 h-[calc(100%-24px)]">

              {/* Left: Chat panel */}
              <div className="bg-[#070e1c] rounded-xl p-1.5 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-1.5 shrink-0">
                  <span className="text-[6px] text-white/40 font-mono uppercase tracking-widest">AI Chat</span>
                  <div className="flex items-center gap-0.5">
                    <motion.div
                      className="w-1 h-1 rounded-full bg-green-400"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-[5px] text-green-400/60">live</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-end gap-1 overflow-hidden min-h-0">
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: msg.delay, duration: 0.3 }}
                    >
                      <div className={`max-w-[92%] rounded px-1.5 py-0.5 text-[6px] leading-snug ${
                        msg.role === 'ai'
                          ? 'bg-[#0086F9]/20 text-white/70 border border-[#0086F9]/10'
                          : 'bg-white/[0.05] text-white/45'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {/* Typing dots */}
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8 }}
                  >
                    <div className="bg-[#0086F9]/10 rounded px-2 py-1 flex gap-0.5 items-center">
                      {[0, 0.15, 0.3].map((d, i) => (
                        <motion.div
                          key={i}
                          className="w-[3px] h-[3px] rounded-full bg-[#0086F9]/60"
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: d }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right: Analytics */}
              <div className="flex flex-col gap-1.5 min-h-0">
                {/* Sentiment chart */}
                <div className="bg-[#070e1c] rounded-xl p-1.5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-1 shrink-0">
                    <span className="text-[6px] text-white/40 font-mono uppercase tracking-widest">Sentiment</span>
                    <span className="text-[6px] text-green-400 font-mono">+82%</span>
                  </div>
                  <div className="relative flex-1 min-h-0">
                    <div className="absolute inset-0 flex items-end gap-0.5">
                      {barHeights.map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-sm"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          style={{
                            height: `${h}%`,
                            transformOrigin: 'bottom',
                            background: `rgba(0,134,249,${0.2 + (h / 100) * 0.65})`,
                          }}
                          transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: 'backOut' }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-1 shrink-0">
                    <span className="text-[5px] text-white/25 font-mono">7 calls</span>
                    <span className="text-[5px] text-green-400/60 font-mono">today</span>
                  </div>
                </div>

                {/* Live transcript */}
                <div className="bg-[#070e1c] rounded-xl p-1.5 shrink-0">
                  <div className="flex items-center gap-1 mb-1">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-red-400"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <span className="text-[6px] text-white/40 font-mono uppercase tracking-widest">Transcript</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    <p className="text-[5.5px] text-white/40 leading-relaxed">
                      <span className="text-[#2D98F1]/70">AI:</span> &ldquo;Thank you for calling...&rdquo;
                    </p>
                    <p className="text-[5.5px] text-white/40 leading-relaxed">
                      <span className="text-white/25">User:</span> &ldquo;I need help with...&rdquo;
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bezel */}
          <div className="h-2 bg-[#060d18]" />
        </div>

        {/* Hinge + base */}
        <div className="h-2 bg-[#131d30] border-x border-b border-white/[0.07] mx-[-1px]" />
        <div className="h-1.5 bg-[#0d1625] border-x border-b border-white/[0.05] mx-[-6px] rounded-b-xl shadow-xl" />
      </div>

      {/* ── PHONE (overlaid bottom-right) ─────────────────────────────── */}
      <motion.div
        className="absolute -bottom-6 right-2 sm:right-4 w-[68px] sm:w-[80px] bg-[#060d18] rounded-[16px] border border-white/[0.15] shadow-2xl overflow-hidden z-10"
        initial={{ opacity: 0, scale: 0.7, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: 'backOut' }}
      >
        {/* Notch */}
        <div className="flex justify-center items-center h-3 bg-[#030810]">
          <div className="w-4 h-[2px] rounded-full bg-white/15" />
        </div>

        {/* Screen */}
        <div className="px-1.5 pb-1 pt-0.5 bg-[#0b1525]">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[5px] text-white/30 font-mono">9:41</span>
            <div className="flex gap-[1.5px] items-end">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="w-[2px] bg-white/25 rounded-sm" style={{ height: `${(i + 1) * 3}px` }} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#046BD2] to-[#2D98F1] flex items-center justify-center mb-0.5">
              <span className="text-[7px] font-bold text-white">JD</span>
            </div>
            <span className="text-[6px] font-semibold text-white/75 tracking-tight">John Davis</span>
            <span className="text-[5px] text-white/30 mb-1.5">Incoming call</span>

            {/* AI answering badge */}
            <motion.div
              className="inline-flex items-center gap-[3px] px-1.5 py-[2.5px] rounded-full bg-[#0086F9]/15 border border-[#0086F9]/25 mb-1.5"
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-[3.5px] h-[3.5px] rounded-full bg-[#0086F9]"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[5px] text-[#2D98F1] font-medium">AI Answering</span>
            </motion.div>

            {/* Waveform */}
            <div className="flex items-center justify-center gap-[1.5px] h-[14px]">
              {waveHeights.map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[2px] bg-[#0086F9]/50 rounded-full"
                  animate={{ height: [`${h}px`, `${Math.min(h * 1.9, 13)}px`, `${h}px`] }}
                  transition={{
                    duration: 0.55 + (i % 3) * 0.12,
                    repeat: Infinity,
                    delay: i * 0.07,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Home bar */}
        <div className="flex justify-center py-1 bg-[#030810]">
          <div className="w-5 h-[2px] rounded-full bg-white/15" />
        </div>
      </motion.div>

      {/* ── FLOATING METRIC (top-left) ─────────────────────────────────── */}
      <motion.div
        className="absolute -left-2 sm:-left-4 top-8 bg-[#0d1a2d]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-2.5 py-2 shadow-xl z-10"
        initial={{ opacity: 0, x: -16, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        <div className="text-[5.5px] text-white/35 uppercase tracking-widest font-mono mb-0.5">AI Calls Today</div>
        <div className="text-sm font-bold text-white font-mono leading-none">2,847</div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[5.5px] text-green-400 font-mono">↑ 24%</span>
          <span className="text-[5.5px] text-white/25 font-mono">vs yesterday</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function AIPageView() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0B1220] relative overflow-hidden">
      <Navbar />

      <motion.div style={{ y: auroraY }} className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#046BD2]/20 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#0086F9]/15 blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[700px] h-[700px] rounded-full bg-[#2575FC]/15 blur-[120px]" />
      </motion.div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-white/70">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-white/70">products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">ai</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-24 grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-[#0086F9] animate-ping" />
                <span className="relative rounded-full bg-[#0086F9] w-2 h-2" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-white/70">AI Suite · Live</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              AI that{' '}
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">answers</span>,{' '}
              <span className="bg-gradient-to-r from-[#0086F9] via-[#2D98F1] to-[#0086F9] bg-clip-text text-transparent">assists</span>,
              and{' '}
              <span className="bg-gradient-to-r from-[#2D98F1] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">analyzes</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              Three production-grade AI tools — Receptionist, Virtual Assistant, and Conversation Analytics —
              <span className="text-white/90"> included on every Rozper seat</span>. No upcharge. No add-on tiers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-row flex-nowrap gap-2 sm:gap-4"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-3.5 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold transition whitespace-nowrap"
              >
                <span>Start a No-Pressure Conversation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-3.5 rounded-full bg-white/5 border border-white/10 text-sm sm:text-base text-white font-medium hover:bg-white/10 transition whitespace-nowrap"
              >
                See pricing
              </Link>
            </motion.div>

          </div>

          <div className="flex items-center justify-center py-8 px-6">
            <DeviceMockup />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#0086F9]/80 mb-4">// 03 modules</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold max-w-2xl">Three AI tools. One platform. Zero upcharge.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {aiTools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#046BD2] via-[#0086F9] to-[#2D98F1] opacity-30 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                <div className="relative h-full p-8 rounded-3xl bg-[#111B2D]/90 border border-white/10 backdrop-blur-xl">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#046BD2] to-[#0086F9] flex items-center justify-center">
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="font-mono text-xs text-white/40">{tool.tag}</div>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">{tool.name}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-8">{tool.bullet}</p>
                  <div className="flex items-end justify-between pt-6 border-t border-white/5">
                    <div>
                      <div className="font-display text-4xl font-bold bg-gradient-to-br from-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">{tool.metric}</div>
                      <div className="text-xs text-white/40 mt-1 font-mono uppercase tracking-wider">always-on</div>
                    </div>
                    <Sparkles className="w-5 h-5 text-white/20 group-hover:text-white/60 transition" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-16 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#0086F9]/80 mb-4">// capabilities</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Everything your team needs to work smarter.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-3xl overflow-hidden bg-white/5">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group p-8 bg-[#0B1220] hover:bg-[#111B2D] transition-colors relative overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#0086F9]/0 group-hover:bg-[#0086F9]/10 blur-2xl transition-all duration-500" />
                <cap.icon className="w-8 h-8 text-[#0086F9] mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-semibold mb-2">{cap.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-20">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#0086F9]/80 mb-4">// onboarding</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Live in minutes, not months.</h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-[#046BD2]/0 via-[#0086F9]/40 to-[#046BD2]/0 hidden md:block" />
            {flow.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative flex md:items-center gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse md:text-right'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="font-mono text-xs text-[#0086F9] mb-2 uppercase tracking-widest">{s.step}</div>
                  <h3 className="font-display text-2xl font-bold mb-2">{s.title}</h3>
                  <p className="text-white/60">{s.desc}</p>
                </div>
                <div className="relative shrink-0 z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#046BD2] via-[#0086F9] to-[#2D98F1] flex items-center justify-center font-display font-bold text-white">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-12">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#0086F9]/80 mb-4">// frequently asked</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Common questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur p-6 hover:bg-white/[0.05] transition">
                <summary className="flex items-center justify-between cursor-pointer font-display font-semibold text-lg list-none">
                  <span>{f.q}</span>
                  <ChevronRight className="w-5 h-5 text-white/40 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-white/60 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="relative rounded-[2.5rem] overflow-hidden p-6 sm:p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
            <div className="relative">
              <Waves className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold leading-tight">
                Ready to add AI<br />to every seat?
              </h2>
              <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto">
                Three AI tools. Zero extra charge. Available on every Rozper seat starting at $9.99.
              </p>
              <div className="mt-10 flex flex-row flex-nowrap justify-center gap-2 sm:gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-white text-[#046BD2] text-sm sm:text-base font-semibold hover:scale-105 transition whitespace-nowrap">
                  Start a No-Pressure Conversation <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm sm:text-base text-white font-medium hover:bg-white/20 transition whitespace-nowrap">
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
