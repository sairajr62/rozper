'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  MessageSquare, Users, Zap, Shield, BarChart3, Globe,
  ArrowRight, ChevronRight, Send,
} from 'lucide-react'

const features = [
  { icon: MessageSquare, title: 'Two-Way SMS', desc: 'Send and receive SMS from your business number — agents reply from one inbox.' },
  { icon: Users, title: 'Bulk Campaigns', desc: 'Send personalized SMS blasts to thousands of contacts with merge fields.' },
  { icon: Zap, title: 'WhatsApp Business', desc: 'Native WhatsApp Business integration — same inbox, zero switching.' },
  { icon: Shield, title: 'TCPA Compliance Tools', desc: 'Opt-out handling, consent tracking, and DNC list management built in.' },
  { icon: BarChart3, title: 'Delivery Analytics', desc: 'Real-time delivery reports, open rates, and response tracking per campaign.' },
  { icon: Globe, title: 'MMS & Rich Media', desc: 'Send images, PDFs, and rich media — supported in 30+ countries.' },
]

const faqs = [
  { q: 'Can customers reply to bulk SMS?', a: 'Yes. Replies route to the shared inbox where any agent can respond, or trigger automated flows.' },
  { q: 'Is WhatsApp included?', a: 'Yes. WhatsApp Business API is fully integrated — no separate account or meta setup needed.' },
  { q: 'How does TCPA compliance work?', a: 'Opt-out keywords (STOP, UNSUBSCRIBE) are auto-processed. Consent timestamps are stored and exportable.' },
]

/* ─── Conversation script ─────────────────────────────────────── */
const SCRIPT = [
  { from: 'customer', text: "Hi, I'd like to upgrade my plan. Can someone help?", time: '10:42 AM' },
  { from: 'agent',    text: 'Hi Sarah! Happy to help. Which plan are you currently on?', time: '10:43 AM' },
  { from: 'customer', text: "I'm on the Starter — thinking about moving to Business.", time: '10:43 AM' },
  { from: 'agent',    text: 'Great choice. I can upgrade you right now and prorate the difference. Ready?', time: '10:44 AM' },
  { from: 'customer', text: 'Yes please!', time: '10:44 AM' },
] as const

/* typing duration before each message appears (ms) */
const TYPING_MS  = [1100, 1400, 1200, 1700, 900]
const GAP_MS     = 420   // pause after a message before next typing starts
const RESTART_MS = 2800  // pause at end before looping

/* ─── Animated SMS conversation ─────────────────────────────── */
function SMSConversation() {
  const [shown,     setShown]     = useState<number[]>([])
  const [typing,    setTyping]    = useState<'customer' | 'agent' | null>(null)
  const [inputText, setInputText] = useState('')
  const scrollRef  = useRef<HTMLDivElement>(null)
  const aliveRef   = useRef(true)
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  /* typewriter for agent input bar */
  const typeRef    = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimers = () => {
    if (timerRef.current)  clearTimeout(timerRef.current)
    if (typeRef.current)   clearInterval(typeRef.current)
  }

  const step = useCallback((idx: number) => {
    if (!aliveRef.current) return

    /* ── finished – restart ── */
    if (idx >= SCRIPT.length) {
      timerRef.current = setTimeout(() => {
        if (!aliveRef.current) return
        setShown([]);  setTyping(null);  setInputText('')
        timerRef.current = setTimeout(() => step(0), 300)
      }, RESTART_MS)
      return
    }

    const msg     = SCRIPT[idx]
    const waitMs  = TYPING_MS[idx]

    /* show typing bubble */
    setTyping(msg.from)

    /* agent messages: animate text into the input bar */
    if (msg.from === 'agent') {
      const full = msg.text
      let  pos  = 0
      const chunkMs = Math.max(16, waitMs / (full.length / 2))
      typeRef.current = setInterval(() => {
        if (!aliveRef.current) { clearInterval(typeRef.current!); return }
        pos = Math.min(pos + 2, full.length)
        setInputText(full.slice(0, pos))
        if (pos >= full.length) clearInterval(typeRef.current!)
      }, chunkMs)
    }

    /* after typing delay, reveal message */
    timerRef.current = setTimeout(() => {
      if (!aliveRef.current) return
      setShown(prev => [...prev, idx])
      setTyping(null)
      setInputText('')
      /* slight scroll-to-bottom */
      setTimeout(() => {
        if (scrollRef.current)
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }, 40)
      timerRef.current = setTimeout(() => step(idx + 1), GAP_MS)
    }, waitMs)
  }, [])

  useEffect(() => {
    aliveRef.current = true
    timerRef.current = setTimeout(() => step(0), 700)
    return () => { aliveRef.current = false; clearTimers() }
  }, [step])

  /* scroll whenever a new message or typing indicator appears */
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [shown, typing])

  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden w-full">

      {/* ── Header ── */}
      <div className="px-4 sm:px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-xs font-bold text-[#2D98F1] shrink-0">
          SC
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white leading-tight">Sarah Chen</div>
          <div className="text-[11px] font-mono text-[#0086F9] truncate">+1 (415) 555-0182 · SMS</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-400/10 border border-emerald-400/20 shrink-0">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[10px] font-mono text-emerald-400">Live</span>
        </div>
      </div>

      {/* ── Messages ── */}
      <div
        ref={scrollRef}
        className="px-4 sm:px-5 py-4 space-y-3 overflow-y-auto"
        style={{ minHeight: 260, maxHeight: 320 }}
      >
        <AnimatePresence initial={false}>
          {shown.map(idx => {
            const m = SCRIPT[idx]
            const isAgent = m.from === 'agent'
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
                  isAgent
                    ? 'bg-[#046BD2] text-white rounded-br-sm'
                    : 'bg-white/[0.07] border border-white/[0.08] text-white/85 rounded-bl-sm'
                }`}>
                  {m.text}
                  <div className={`text-[10px] mt-1 ${isAgent ? 'text-white/50' : 'text-white/30'}`}>
                    {m.time}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4, transition: { duration: 0.15 } }}
              className={`flex ${typing === 'agent' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`px-4 py-3 rounded-2xl ${
                typing === 'agent'
                  ? 'bg-[#046BD2]/35 rounded-br-sm'
                  : 'bg-white/[0.07] border border-white/[0.08] rounded-bl-sm'
              }`}>
                <div className="flex items-center gap-[5px]">
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      className={`block w-[7px] h-[7px] rounded-full ${typing === 'agent' ? 'bg-white/70' : 'bg-white/45'}`}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Input bar ── */}
      <div className="px-4 sm:px-5 py-3 border-t border-white/10 flex items-center gap-3">
        <div className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white/50 font-mono truncate">
          {inputText || <span className="text-white/25">Type a reply…</span>}
        </div>
        <motion.button
          className="w-9 h-9 rounded-xl bg-[#046BD2] flex items-center justify-center shrink-0 hover:bg-[#0078E0] transition-colors"
          animate={inputText.length > 0 ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={{ duration: 0.25 }}
          aria-label="Send"
        >
          <Send className="w-4 h-4 text-white" style={{ transform: 'translate(1px,-1px)' }} />
        </motion.button>
      </div>

      {/* ── Footer ── */}
      <div className="px-4 sm:px-5 py-2.5 bg-[#0B1220] border-t border-white/10 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[10px] font-mono text-white/30">
        <span className="truncate">Campaign: Plan Upgrade · 2,841 sent</span>
        <span className="text-emerald-400 shrink-0">97.2% delivered</span>
      </div>
    </div>
  )
}

export function ProdUCaaSSMSMMSPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-hidden">
      <Navbar />

      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#046BD2]/8 blur-[140px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/ucaas" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">sms-mms</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <MessageSquare className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · SMS & MMS</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Messaging built<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">for business scale</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Two-way SMS, MMS, bulk campaigns, and WhatsApp — all from your business number, all in one inbox. TCPA compliance included.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Start messaging <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">See pricing</Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <SMSConversation />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Every messaging channel, one platform.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#111B2D] border border-white/[0.07] hover:border-[#046BD2]/30 transition-colors group"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-all mt-0.5">
                  <f.icon className="w-4 h-4 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-[#0086F9] transition-colors">{f.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                </div>
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
            <MessageSquare className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Text your customers. Win their loyalty.</h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/15 border border-white/30 text-white font-semibold hover:bg-white/25 transition">See pricing</Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
                Start messaging <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
