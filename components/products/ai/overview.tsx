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

function AIOrb() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#046BD2]/40 via-[#0086F9]/30 to-[#2D98F1]/30 blur-3xl animate-pulse" />
      <motion.div
        className="absolute inset-8 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#0086F9] shadow-[0_0_20px_rgba(0,134,249,0.8)]" />
      </motion.div>
      <motion.div
        className="absolute inset-16 rounded-full border border-white/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2D98F1] shadow-[0_0_15px_rgba(45,152,241,0.8)]" />
      </motion.div>
      <motion.div
        className="absolute inset-24 rounded-full bg-gradient-to-br from-[#046BD2]/60 to-[#0086F9]/40 backdrop-blur-md border border-white/20 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="w-12 h-12 text-white" />
      </motion.div>
    </div>
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
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition"
              >
                <span>Start a No-Pressure Conversation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition"
              >
                See pricing
              </Link>
            </motion.div>

          </div>

          <div className="flex items-center justify-center overflow-hidden">
            <AIOrb />
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
          <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
            <div className="relative">
              <Waves className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
                Ready to add AI<br />to every seat?
              </h2>
              <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto">
                Three AI tools. Zero extra charge. Available on every Rozper seat starting at $9.99.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
                  Start a No-Pressure Conversation <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white font-medium hover:bg-white/20 transition">
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
