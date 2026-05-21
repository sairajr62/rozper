"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { PhoneCall, User, Calendar, ArrowRight, Send, Clock, CheckCircle2 } from "lucide-react"

type ChatMsg = {
  id: number
  role: "caller" | "ai"
  text: string
  /** When true, the bubble text types itself out character-by-character. */
  typewrite?: boolean
  /** Index into initialScript when this is an auto-play line (drives sequencing). */
  scriptIndex?: number
}

/**
 * Renders `text` character-by-character with a blinking cursor while it's
 * still typing. Speed is variable — punctuation gets a longer pause so
 * sentences feel like they're being written by someone.
 */
function Typewriter({
  text,
  speed = 24,
  onDone,
}: {
  text: string
  speed?: number
  /** Fires exactly once when the full text has finished typing. */
  onDone?: () => void
}) {
  const [shown, setShown] = useState("")
  const [done, setDone] = useState(false)
  // Keep the latest onDone without re-running the typing effect.
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    setShown("")
    setDone(false)
    let i = 0
    let cancelled = false
    let tid: ReturnType<typeof setTimeout> | undefined

    const tick = () => {
      if (cancelled) return
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) {
        setDone(true)
        onDoneRef.current?.()
        return
      }
      // Pause longer after punctuation so it reads like someone writing.
      const prev = text[i - 1]
      const isPunct = prev !== undefined && /[.,!?;:]/.test(prev)
      const variance = (Math.random() - 0.5) * 10
      const ms = (isPunct ? speed * 6 : speed) + variance
      tid = setTimeout(tick, ms)
    }
    tid = setTimeout(tick, 80)
    return () => {
      cancelled = true
      if (tid) clearTimeout(tid)
    }
  }, [text, speed])

  return (
    <>
      {shown}
      {!done && (
        <motion.span
          aria-hidden
          className="inline-block w-[2px] h-[10px] ml-[2px] align-middle"
          style={{ background: "currentColor" }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.85,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </>
  )
}

const initialScript: { role: "caller" | "ai"; text: string; delay: number }[] = [
  { role: "caller", text: "Hi, looking for pricing for a team of 40.", delay: 0 },
  { role: "ai", text: "Rozper's AI receptionist here. Our Business plan fits that. Book a 30-min demo?", delay: 1.2 },
  { role: "caller", text: "Tuesday 2pm works.", delay: 2.4 },
  { role: "ai", text: "Booked. Calendar invite on the way.", delay: 3.6 },
]

// Lightweight keyword → reply mapper so typing actually feels responsive.
function generateAiReply(userText: string): string {
  const t = userText.toLowerCase()
  if (/\b(pric|cost|quote|rate|how much)\b/.test(t))
    return "Pricing depends on volume and region. I can have a solutions engineer email you a quote within the hour — what's the best email?"
  if (/\b(demo|show me|see it|trial)\b/.test(t))
    return "Happy to set that up. We have slots open this week — what day works best?"
  if (/\b(yes|sure|ok|okay|sounds good|yep)\b/.test(t))
    return "Great. Calendar invite on the way. Anything else I can help with?"
  if (/\b(hi|hello|hey)\b/.test(t))
    return "Hi! Rozper's AI Receptionist here. How can I help today?"
  if (/\b(integrat|sip|crm|salesforce|hubspot|zoho)\b/.test(t))
    return "We integrate with Salesforce, HubSpot, Zoho, and most major CRMs. Which one are you on?"
  if (/\b(uptime|reliab|sla|downtime)\b/.test(t))
    return "99.99% contracted uptime, with service credits if we miss it. Backed by a 24/7 NOC."
  if (/\b(no thanks|nothing|bye|goodbye)\b/.test(t))
    return "Thanks for chatting — have a great day!"
  return "Got it — I've routed that to our team. Someone will reach out within 24 hours."
}

const benefits = [
  {
    icon: Clock,
    title: "Always on.",
    body: "Answers every call, even at 2 a.m. on a Sunday.",
  },
  {
    icon: CheckCircle2,
    title: "Always qualified.",
    body: "Captures intent, budget, and timeline before handing off.",
  },
  {
    icon: Calendar,
    title: "Always booked.",
    body: "Drops the meeting straight into your calendar.",
  },
]

function AIDemo({ isInView }: { isInView: boolean }) {
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [aiTyping, setAiTyping] = useState(false)
  const [input, setInput] = useState("")
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)
  // Idempotency guards so React StrictMode's double-invoked effects (dev) or
  // re-renders can't append/advance the same script line twice.
  const appendedRef = useRef<Set<number>>(new Set())
  const advancedRef = useRef<Set<number>>(new Set())
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Append a single auto-play line (guarded against duplicates).
  const appendScriptLine = (i: number) => {
    if (appendedRef.current.has(i)) return
    appendedRef.current.add(i)
    const line = initialScript[i]
    setMessages((m) => [
      ...m,
      {
        id: nextId.current++,
        role: line.role,
        text: line.text,
        typewrite: true,
        scriptIndex: i,
      },
    ])
  }

  // Auto-play the demo script. Crucially this is EVENT-DRIVEN: the next line
  // is only appended once the current line's <Typewriter/> actually finishes
  // (via onDone), not on a guessed timer. This keeps the conversation in the
  // right order regardless of how slow the device is (mobile timer throttling
  // used to make the AI reply cut in before the user message finished typing).
  const handleScriptDone = (i: number) => {
    if (hasInteracted) return
    if (advancedRef.current.has(i)) return
    advancedRef.current.add(i)
    if (i < initialScript.length - 1) {
      pauseTimer.current = setTimeout(() => {
        if (!hasInteracted) appendScriptLine(i + 1)
      }, 500)
    } else {
      // last scripted line finished → reveal the "Meeting booked" banner
      pauseTimer.current = setTimeout(() => {
        if (!hasInteracted) setIsBooking(true)
      }, 300)
    }
  }

  // Kick the script off once the section scrolls into view.
  useEffect(() => {
    if (!isInView || hasInteracted) return
    const t = setTimeout(() => {
      if (!hasInteracted) appendScriptLine(0)
    }, 600)
    return () => {
      clearTimeout(t)
      if (pauseTimer.current) clearTimeout(pauseTimer.current)
    }
  }, [isInView, hasInteracted])

  // Auto-scroll the transcript whenever a new message or typing-indicator lands.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, aiTyping])

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault()
    const text = input.trim()
    if (!text) return
    setHasInteracted(true)
    setIsBooking(false)
    // User's own message appears instantly — they just finished typing it.
    setMessages((m) => [
      ...m,
      {
        id: nextId.current++,
        role: "caller",
        text,
        typewrite: false,
      },
    ])
    setInput("")
    setAiTyping(true)
    setTimeout(
      () => {
        setMessages((m) => [
          ...m,
          {
            id: nextId.current++,
            role: "ai",
            text: generateAiReply(text),
            // AI replies type themselves out character-by-character.
            typewrite: true,
          },
        ])
        setAiTyping(false)
      },
      900 + Math.random() * 500,
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Ambient glow */}
      <div
        className="absolute -inset-8 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(4,107,210,0.4) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/40 to-transparent shadow-[0_0_80px_-20px_rgba(4,107,210,0.6)]">
        <div className="rounded-3xl bg-[#0A1020]/90 backdrop-blur-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <span className="ml-2 text-[11px] uppercase tracking-[0.18em] text-white/40 font-mono">
                rozper · ai receptionist
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Live</span>
            </div>
          </div>

          {/* Agent header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0A1020]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">AI Receptionist</div>
              {/* Modern "signal active" indicator — pulsing core + sweeping
                  scan bar. Replaces the fake voice waveform. */}
              <div className="flex items-center gap-2 mt-2">
                {/* Breathing core dot */}
                <motion.span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ boxShadow: "0 0 8px rgba(34,211,238,0.85)" }}
                />
                {/* Scan bar — highlight slides left → right continuously */}
                <div className="relative w-16 h-[3px] rounded-full bg-[#0086F9]/20 overflow-hidden">
                  <motion.div
                    aria-hidden
                    className="absolute top-0 bottom-0 w-10 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #22D3EE, transparent)",
                    }}
                    animate={{ x: ["-100%", "180%"] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Languages</div>
              <div className="text-sm font-semibold text-white">40+</div>
            </div>
          </div>

          {/* Transcript label */}
          <div className="flex items-center justify-between px-5 pt-4 pb-1">
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/35 font-mono">
              Transcript
            </span>
            <span className="flex items-center gap-1 text-[10px] text-[#22D3EE] font-mono">
              <span className="w-1 h-1 rounded-full bg-[#22D3EE] animate-pulse" />
              {aiTyping ? "typing" : "streaming"}
            </span>
          </div>

          {/* Scrollable chat — fixed height so the card doesn't resize as
              messages arrive */}
          <div
            ref={scrollRef}
            className="px-5 pb-3 space-y-3 h-[300px] overflow-y-auto scroll-smooth"
          >
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2 items-start ${m.role === "caller" ? "flex-row-reverse" : ""}`}
                >
                  <span
                    className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      m.role === "ai" ? "bg-[#046BD2]/30" : "bg-white/10"
                    }`}
                  >
                    {m.role === "ai" ? (
                      <PhoneCall className="w-3 h-3 text-[#22D3EE]" />
                    ) : (
                      <User className="w-3 h-3 text-white/60" />
                    )}
                  </span>
                  <span
                    className={`text-xs leading-relaxed px-3 py-2 rounded-xl max-w-[80%] ${
                      m.role === "ai"
                        ? "bg-[#046BD2]/15 text-white/85"
                        : "bg-white/[0.05] text-white/70"
                    }`}
                  >
                    {m.typewrite ? (
                      <Typewriter
                        text={m.text}
                        onDone={
                          m.scriptIndex !== undefined
                            ? () => handleScriptDone(m.scriptIndex!)
                            : undefined
                        }
                      />
                    ) : (
                      m.text
                    )}
                  </span>
                </motion.div>
              ))}

              {aiTyping && (
                <motion.div
                  key="typing-indicator"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-2 items-start"
                >
                  <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-[#046BD2]/30">
                    <PhoneCall className="w-3 h-3 text-[#22D3EE]" />
                  </span>
                  <span className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-[#046BD2]/15">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]/80"
                        animate={{ y: [0, -3, 0], opacity: [0.45, 1, 0.45] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: d * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking confirmed banner — only shown after the scripted demo */}
          <AnimatePresence>
            {isBooking && !hasInteracted && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mx-4 mb-3 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-400/10 border border-emerald-400/20"
              >
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-emerald-400">
                    Meeting booked
                  </div>
                  <div className="text-[10px] text-white/50">
                    Tuesday · 2:00 PM · Calendar invite sent
                  </div>
                </div>
                <span className="ml-auto text-[10px] font-mono text-white/30">
                  +1 qualified lead
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Composer — real input at the bottom of the chat */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-white/5 bg-white/[0.02] p-3"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  hasInteracted
                    ? "Reply to the AI Receptionist…"
                    : "Type a message to try it yourself…"
                }
                aria-label="Type a message"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-3.5 pr-3 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#22D3EE]/40 transition-colors"
                maxLength={240}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || aiTyping}
              aria-label="Send message"
              className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#046BD2] to-[#22D3EE] text-white shadow-[0_8px_22px_-8px_rgba(4,107,210,0.7)] hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export function AISpotlight() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-[#070B14]"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-30"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 50%, rgba(4,107,210,0) 0deg, rgba(4,107,210,0.35) 80deg, rgba(34,211,238,0.15) 160deg, rgba(4,107,210,0) 360deg)",
            filter: "blur(80px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22D3EE]/20 bg-[#22D3EE]/5 backdrop-blur-md"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]/80">
                Spotlight
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]"
            >
              Meet the AI Receptionist that{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                never misses a lead.
              </span>
            </motion.h2>

            {/* Three-column benefits */}
            <div className="mt-8 space-y-3">
              {benefits.map((b, i) => {
                const Icon = b.icon
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#046BD2]/30 transition-colors"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white">{b.title}</div>
                      <div className="text-xs text-[#9AA8BC] mt-0.5 leading-relaxed">{b.body}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Stat */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-7 flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#046BD2]/10 to-transparent border border-[#046BD2]/20"
            >
              <div className="font-display text-3xl font-bold bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent tabular-nums">
                +40%
              </div>
              <div className="text-sm text-[#9AA8BC] leading-tight">
                lift in qualified pipeline — verified customer result after
                switching on the AI Receptionist.
              </div>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ x: 2 }}
              className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold text-sm shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition-colors group"
            >
              See the AI Receptionist in action
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </div>

          {/* Right: live AI demo */}
          <div className="lg:col-span-7">
            <AIDemo isInView={isInView} />
          </div>
        </div>
      </div>
    </section>
  )
}
