"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Phone, MessageSquare, Mail, Globe,
  CheckCheck, Mic, Paperclip, Smile,
  Star, Clock, Tag, ChevronDown, Zap,
} from "lucide-react"

/* ── Brand SVG icons ─────────────────────────────────── */
const WaIcon = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

/* ── Data ─────────────────────────────────────────────── */
const QUEUE = [
  { id: 1, initials: "RM", color: "#059669", name: "Rosa Martinez",   channel: "WhatsApp", preview: "Invoice #882 charge query",   time: "2m",  unread: true,  active: true  },
  { id: 2, initials: "JW", color: "#2563EB", name: "James Wilson",    channel: "Chat",     preview: "Upgrade plan help needed",    time: "8m",  unread: true,  active: false },
  { id: 3, initials: "AK", color: "#7C3AED", name: "Anya Kim",        channel: "Email",    preview: "Re: Onboarding docs request", time: "14m", unread: false, active: false },
  { id: 4, initials: "TB", color: "#B45309", name: "Tom Baker",       channel: "Voice",    preview: "Missed call · Callback set",  time: "22m", unread: false, active: false },
]

const CHANNEL_STYLE: Record<string, { color: string; bg: string }> = {
  WhatsApp: { color: "#25D366", bg: "rgba(37,211,102,0.12)" },
  Chat:     { color: "#0086F9", bg: "rgba(0,134,249,0.12)"  },
  Email:    { color: "#F97316", bg: "rgba(249,115,22,0.12)" },
  Voice:    { color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
}

type ChatMsg = { side: "left" | "right" | "ai"; text: string; time: string }

const MESSAGES: ChatMsg[] = [
  { side: "left",  text: "Hi, there's an extra charge on invoice #882 I don't recognise.",  time: "10:41" },
  { side: "right", text: "Hi Rosa! I can see your account — let me pull that invoice up now.", time: "10:42" },
  { side: "left",  text: "Sure, thanks! It just appeared this month.",                        time: "10:43" },
  { side: "right", text: "Found it! That's a one-time setup fee. I'll send a revised breakdown.",time: "10:44" },
]

const AI_SUGGESTION = "\"Happy to email you the full breakdown — should I send it to rosa@email.com?\""

const CRM = {
  initials: "RM",
  name:     "Rosa Martinez",
  plan:     "Pro · Annual",
  since:    "Mar 2022",
  sentiment: 82,
  tags:     ["VIP", "Billing"],
  history: [
    { icon: Phone,        text: "Inbound call",       sub: "May 18 · 4m 12s" },
    { icon: MessageSquare,text: "Chat resolved",      sub: "May 10 · CSAT 5★" },
    { icon: Mail,         text: "Email: refund req.", sub: "Apr 29" },
  ],
}

/* ── Sub-components ───────────────────────────────────── */
function ChannelBadge({ channel }: { channel: string }) {
  const s = CHANNEL_STYLE[channel]
  const Icon = channel === "WhatsApp" ? WaIcon
    : channel === "Chat"  ? MessageSquare
    : channel === "Email" ? Mail : Phone
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded" style={{ background: s.bg, fontSize: 8 }}>
      {channel === "WhatsApp"
        ? <WaIcon size={8} />
        : <Icon className="w-2 h-2" style={{ color: s.color }} />}
      <span style={{ color: s.color }}>{channel}</span>
    </span>
  )
}

function Avt({ initials, color, size = 28 }: { initials: string; color: string; size?: number }) {
  return (
    <div className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
      style={{ width: size, height: size, background: color, fontSize: size * 0.32 }}>
      {initials}
    </div>
  )
}

/* ── Queue Panel ─────────────────────────────────────── */
function QueuePanel({ activeId }: { activeId: number }) {
  return (
    <div className="flex flex-col border-r border-white/[0.07]" style={{ width: "clamp(120px,28%,165px)", flexShrink: 0 }}>
      {/* header */}
      <div className="px-3 py-2 border-b border-white/[0.07] flex items-center justify-between" style={{ background: "#0B1829" }}>
        <span className="font-semibold text-white" style={{ fontSize: 10 }}>Inbox</span>
        <span className="px-1.5 py-0.5 rounded bg-[#046BD2]/20 text-[#2D98F1] font-mono" style={{ fontSize: 8 }}>14</span>
      </div>
      {/* filter tabs */}
      <div className="flex gap-0 border-b border-white/[0.07] px-2 pt-1" style={{ background: "#0B1829" }}>
        {["All", "Chat", "Email"].map((t, i) => (
          <div key={t} className="px-1.5 py-1 cursor-pointer" style={{
            fontSize: 8,
            color: i === 0 ? "#0086F9" : "rgba(255,255,255,0.35)",
            borderBottom: i === 0 ? "1.5px solid #0086F9" : "1.5px solid transparent",
            marginBottom: -1,
          }}>{t}</div>
        ))}
      </div>
      {/* rows */}
      <div className="flex-1 overflow-hidden divide-y divide-white/[0.04]">
        {QUEUE.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="flex items-start gap-2 px-2.5 py-2 cursor-pointer transition-colors"
            style={{ background: q.id === activeId ? "rgba(4,107,210,0.1)" : "transparent" }}
          >
            <div className="relative flex-shrink-0 mt-0.5">
              <Avt initials={q.initials} color={q.color} size={24} />
              {q.unread && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#0086F9] border border-[#0B1220]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="font-semibold text-white truncate" style={{ fontSize: 9 }}>{q.name}</span>
                <span className="flex-shrink-0" style={{ fontSize: 7, color: "rgba(255,255,255,0.3)" }}>{q.time}</span>
              </div>
              <ChannelBadge channel={q.channel} />
              <p className="truncate mt-0.5" style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>{q.preview}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Chat Panel ───────────────────────────────────────── */
function ChatPanel({ visibleCount, loopKey }: { visibleCount: number; loopKey: number }) {
  return (
    <div className="flex-1 flex flex-col min-w-0" style={{ background: "#090F1C" }}>
      {/* chat header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.07]" style={{ background: "#0B1829" }}>
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative flex-shrink-0">
            <Avt initials="RM" color="#059669" size={24} />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#0B1220] flex items-center justify-center">
              <WaIcon size={6} />
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-white truncate" style={{ fontSize: 10 }}>Rosa Martinez</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            </div>
            <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.35)" }}>WhatsApp · Online</span>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {[Phone, Mic].map((Icon, i) => (
            <div key={i} className="w-5 h-5 rounded flex items-center justify-center bg-white/[0.04] hover:bg-white/10">
              <Icon className="w-2.5 h-2.5 text-white/40" />
            </div>
          ))}
        </div>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-hidden px-3 py-2 flex flex-col justify-end gap-1.5">
        <AnimatePresence mode="sync">
          {MESSAGES.map((m, idx) => {
            if (idx >= visibleCount) return null
            const right = m.side === "right"
            return (
              <motion.div
                key={`${loopKey}-${idx}`}
                initial={{ opacity: 0, x: right ? 8 : -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex items-end gap-1.5 ${right ? "flex-row-reverse self-end" : ""} max-w-[82%]`}
              >
                {!right && <Avt initials="RM" color="#059669" size={18} />}
                {right && <Avt initials="PN" color="#046BD2" size={18} />}
                <div
                  className={`rounded-2xl px-2.5 py-1.5 ${right ? "rounded-br-sm" : "rounded-bl-sm"}`}
                  style={{
                    background: right ? "rgba(4,107,210,0.3)" : "#152035",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.88)",
                    lineHeight: 1.55,
                  }}
                >
                  {m.text}
                  <div className={`flex items-center gap-1 mt-0.5 ${right ? "justify-end" : ""}`}>
                    <span style={{ fontSize: 7, color: "rgba(255,255,255,0.3)" }}>{m.time}</span>
                    {right && <CheckCheck className="w-2 h-2 text-[#0086F9]" />}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* AI suggestion chip */}
        {visibleCount >= MESSAGES.length && (
          <motion.div
            key={`${loopKey}-ai`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-1.5 mt-1"
          >
            <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "rgba(4,107,210,0.25)" }}>
              <Zap className="w-2 h-2 text-[#0086F9]" />
            </div>
            <div className="rounded-xl px-2.5 py-1.5 border border-[#046BD2]/30"
              style={{ background: "rgba(4,107,210,0.08)", fontSize: 8.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
              <span style={{ color: "#0086F9", fontWeight: 600 }}>AI suggest · </span>
              {AI_SUGGESTION}
            </div>
          </motion.div>
        )}
      </div>

      {/* reply bar */}
      <div className="px-3 py-2 border-t border-white/[0.07]">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.07]">
          <Paperclip className="w-2.5 h-2.5 text-white/30 flex-shrink-0" />
          <span className="flex-1" style={{ fontSize: 8.5, color: "rgba(255,255,255,0.22)" }}>Reply as Priya N. — WhatsApp</span>
          <Smile className="w-2.5 h-2.5 text-white/30 flex-shrink-0" />
          <div className="w-4 h-4 rounded-full bg-[#046BD2] flex items-center justify-center flex-shrink-0">
            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── CRM Panel ────────────────────────────────────────── */
function CRMPanel() {
  return (
    <div className="hidden lg:flex flex-col border-l border-white/[0.07]"
      style={{ width: "clamp(120px,26%,155px)", flexShrink: 0, background: "#0B1220" }}>
      {/* header */}
      <div className="px-3 py-2 border-b border-white/[0.07]" style={{ background: "#0B1829" }}>
        <span className="font-semibold text-white/70" style={{ fontSize: 9 }}>Customer</span>
      </div>

      <div className="flex-1 overflow-hidden px-3 py-3 flex flex-col gap-3">
        {/* avatar + name */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Avt initials={CRM.initials} color="#059669" size={36} />
          <div>
            <div className="font-semibold text-white" style={{ fontSize: 10 }}>{CRM.name}</div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>{CRM.plan}</div>
          </div>
        </div>

        {/* sentiment */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>Sentiment</span>
            <span style={{ fontSize: 8, color: "#34D399", fontWeight: 600 }}>{CRM.sentiment}%</span>
          </div>
          <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(255,255,255,0.07)" }}>
            <motion.div className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg,#059669,#34D399)" }}
              initial={{ width: 0 }}
              animate={{ width: `${CRM.sentiment}%` }}
              transition={{ duration: 1, delay: 0.5 }} />
          </div>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-1">
          {CRM.tags.map(t => (
            <span key={t} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded"
              style={{ background: "rgba(4,107,210,0.15)", fontSize: 7.5, color: "#2D98F1" }}>
              <Tag className="w-2 h-2" />{t}
            </span>
          ))}
          <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.3)" }} className="flex items-center gap-0.5">
            <Clock className="w-2 h-2" /> Since {CRM.since}
          </span>
        </div>

        {/* history */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>HISTORY</span>
          </div>
          <div className="space-y-2">
            {CRM.history.map((h, i) => (
              <motion.div key={i} className="flex items-start gap-1.5"
                initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}>
                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(255,255,255,0.05)" }}>
                  <h.icon className="w-2.5 h-2.5 text-white/40" />
                </div>
                <div>
                  <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.7)" }}>{h.text}</div>
                  <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.3)" }}>{h.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CSAT stars */}
        <div className="mt-auto pt-2 border-t border-white/[0.06] flex items-center justify-between">
          <span style={{ fontSize: 8, color: "rgba(255,255,255,0.35)" }}>Last CSAT</span>
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-2.5 h-2.5" style={{ color: i <= 5 ? "#F59E0B" : "rgba(255,255,255,0.15)", fill: i <= 5 ? "#F59E0B" : "none" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Animation loop ──────────────────────────────────── */
const STEP_DELAYS = [500, 1100, 1100, 900]
const LOOP_PAUSE  = 2500

/* ── Main export ─────────────────────────────────────── */
export function CCTabletIllustration() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [loopKey, setLoopKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    let cum = 0
    STEP_DELAYS.forEach((d, i) => {
      cum += d
      timers.push(setTimeout(() => { if (!cancelled) setVisibleCount(i + 1) }, cum))
    })
    timers.push(setTimeout(() => {
      if (!cancelled) {
        setVisibleCount(0)
        timers.push(setTimeout(() => { if (!cancelled) setLoopKey(k => k + 1) }, 400))
      }
    }, cum + LOOP_PAUSE))
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [loopKey])

  return (
    <div className="relative w-full max-w-[600px] mx-auto select-none">
      {/* Ambient glow */}
      <div className="absolute -inset-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[340px] bg-[#046BD2]/18 blur-[110px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Tablet shell ── */}
        <div
          className="relative mx-auto rounded-[28px] border border-white/[0.13] shadow-[0_40px_100px_-20px_rgba(4,107,210,0.65)]"
          style={{
            background: "linear-gradient(160deg,#1a2638 0%,#0d1624 60%,#0b1220 100%)",
            padding: "14px 10px",
          }}
        >
          {/* side buttons */}
          <div className="absolute -right-[3px] top-20 w-[3px] h-10 rounded-r-full bg-white/10" />
          <div className="absolute -left-[3px] top-16 w-[3px] h-7 rounded-l-full bg-white/10" />
          <div className="absolute -left-[3px] top-[100px] w-[3px] h-7 rounded-l-full bg-white/10" />

          {/* camera */}
          <div className="flex justify-center mb-2">
            <div className="w-2 h-2 rounded-full bg-white/15 border border-white/10" />
          </div>

          {/* Screen */}
          <div className="rounded-[16px] overflow-hidden border border-white/[0.08]" style={{ background: "#0D1525" }}>

            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.07]"
              style={{ background: "#0B1829" }}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <span className="font-mono text-white/40" style={{ fontSize: 9 }}>rozper.agent-desktop</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    <span className="relative rounded-full bg-emerald-400 w-2 h-2" />
                  </span>
                  <span className="font-mono text-emerald-400" style={{ fontSize: 9 }}>Available</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08]">
                  <span className="font-mono text-white/40" style={{ fontSize: 8.5 }}>Priya N.</span>
                  <ChevronDown className="w-2.5 h-2.5 text-white/30" />
                </div>
              </div>
            </div>

            {/* App body */}
            <div className="flex" style={{ height: "clamp(240px, 34vw, 340px)" }}>
              <QueuePanel activeId={1} />
              <ChatPanel visibleCount={visibleCount} loopKey={loopKey} />
              <CRMPanel />
            </div>

          </div>

          {/* Home indicator */}
          <div className="flex justify-center mt-2.5">
            <div className="w-10 h-1 rounded-full bg-white/15" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
