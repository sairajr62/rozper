"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Home, Phone, MessageSquare, Video,
  Inbox, Users, BarChart2, Megaphone,
  Search, Plus, SlidersHorizontal,
  Smile, Paperclip, CheckCheck,
} from "lucide-react"

/* ── Inline brand SVG icons ───────────────────────────────── */
const WaIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const TgIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#2AABEE">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

const IgIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="oci-ig" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path fill="url(#oci-ig)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const FbIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

/* ── Avatar helper ─────────────────────────────────────────── */
function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
      style={{ background: color, fontSize: 9 }}
    >
      {initials}
    </div>
  )
}

/* ── Sidebar nav icon ──────────────────────────────────────── */
function NavIcon({
  icon: Icon,
  active = false,
  badge,
  onMouseEnter,
  onMouseLeave,
}: {
  icon: React.ElementType
  active?: boolean
  badge?: number
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  return (
    <div
      className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer"
      style={{ background: active ? 'rgba(4,107,210,0.2)' : 'transparent' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Icon className="w-3.5 h-3.5" style={{ color: active ? '#0086F9' : 'rgba(255,255,255,0.4)' }} />
      {badge != null && (
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#046BD2] text-white flex items-center justify-center"
          style={{ fontSize: 7 }}>
          {badge}
        </span>
      )}
    </div>
  )
}

/* ── Conversation row ──────────────────────────────────────── */
function ConvRow({
  initials, color, name, preview, time, channelIcon, unread, active = false,
}: {
  initials: string; color: string; name: string; preview: string
  time: string; channelIcon: React.ReactNode; unread?: boolean; active?: boolean
}) {
  return (
    <div
      className="flex items-center gap-2 px-2 sm:px-3 py-1.5 cursor-pointer transition-colors"
      style={{ background: active ? 'rgba(4,107,210,0.08)' : 'transparent' }}
    >
      <div className="relative flex-shrink-0">
        <Avatar initials={initials} color={color} />
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#111B2D] flex items-center justify-center">
          {channelIcon}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white truncate" style={{ fontSize: 10 }}>{name}</span>
          <span className="flex-shrink-0 ml-1" style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)' }}>{time}</span>
        </div>
        <p className="truncate mt-0.5" style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)' }}>{preview}</p>
      </div>
      {unread && <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9] flex-shrink-0" />}
    </div>
  )
}

/* ── Channel dropdown item ─────────────────────────────────── */
function DropItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 cursor-pointer rounded-md">
      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">{icon}</div>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)' }}>{label}</span>
    </div>
  )
}

/* ── Chat messages definition ──────────────────────────────── */
const CHAT_STEPS = [
  {
    id: 'msg1', side: 'left', initials: 'RM',
    color: 'linear-gradient(135deg,#059669,#10b981)',
    text: 'Hi, I have a question about my invoice #882 — there\'s an extra charge I don\'t recognize.',
    time: '10:42',
  },
  {
    id: 'msg2', side: 'right', initials: 'PN',
    color: 'linear-gradient(135deg,#046BD2,#0086F9)',
    text: 'Hi Rosa! I can see your invoice #882 right here. Let me pull up the details for you.',
    time: '10:43',
  },
  {
    id: 'msg3', side: 'left', initials: 'RM',
    color: 'linear-gradient(135deg,#059669,#10b981)',
    text: 'Thank you! It was a one-time setup fee. I\'ll send a revised breakdown now.',
    time: '10:44',
  },
  { id: 'typing', side: 'typing' },
] as const

/* Delays (ms) between each step appearing */
const STEP_DELAYS = [600, 1300, 1300, 1000]
const LOOP_PAUSE = 2200

/* ── Main export ───────────────────────────────────────────── */
export function OmnichannelIllustration() {
  const [chatHovered, setChatHovered] = useState(false)
  /* visibleCount: how many chat steps are currently shown (0–4) */
  const [visibleCount, setVisibleCount] = useState(0)
  /* loopKey: increment to remount AnimatePresence children on reset */
  const [loopKey, setLoopKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    function runLoop() {
      let cumulative = 0
      STEP_DELAYS.forEach((delay, idx) => {
        cumulative += delay
        const t = setTimeout(() => {
          if (!cancelled) setVisibleCount(idx + 1)
        }, cumulative)
        timers.push(t)
      })
      const resetTimer = setTimeout(() => {
        if (!cancelled) {
          setVisibleCount(0)
          const restartTimer = setTimeout(() => {
            if (!cancelled) {
              setLoopKey(k => k + 1)
            }
          }, 400)
          timers.push(restartTimer)
        }
      }, cumulative + LOOP_PAUSE)
      timers.push(resetTimer)
    }

    runLoop()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [loopKey])

  return (
    <div className="relative w-full max-w-[720px] mx-auto select-none">

      {/* Background glow */}
      <div className="absolute -inset-6 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#046BD2]/20 blur-[80px] rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] bg-[#25D366]/10 blur-[60px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] bg-[#bc1888]/10 blur-[60px] rounded-full" />
      </div>

      {/* Browser window */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_80px_-20px_rgba(4,107,210,0.4)]"
      >
        {/* Browser chrome */}
        <div className="h-7 sm:h-8 bg-[#1A2540] border-b border-white/5 flex items-center px-2 sm:px-3 gap-1.5">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28C840]" />
          <div className="ml-2 sm:ml-3 flex-1 max-w-[180px] sm:max-w-[220px] h-4 sm:h-4.5 rounded bg-white/5 flex items-center px-2 gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]/60" />
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)' }} className="font-mono truncate">
              app.rozper.com/inbox
            </span>
          </div>
        </div>

        {/* App body */}
        <div className="flex bg-[#0D1525]" style={{ height: 'clamp(300px, 45vw, 420px)' }}>

          {/* ── Left sidebar ── */}
          <div className="w-10 sm:w-12 flex-shrink-0 bg-[#111B2D] border-r border-white/5 flex flex-col items-center py-3 gap-1.5">
            <NavIcon icon={Home} />
            <NavIcon icon={Phone} />
            <NavIcon
              icon={MessageSquare}
              active
              badge={12}
              onMouseEnter={() => setChatHovered(true)}
              onMouseLeave={() => setChatHovered(false)}
            />
            <NavIcon icon={Video} />
            <div className="my-1 w-5 border-t border-white/5" />
            <NavIcon icon={Inbox} />
            <NavIcon icon={Users} />
            <NavIcon icon={Megaphone} />
            <div className="flex-1" />
            <NavIcon icon={BarChart2} />
          </div>

          {/* ── Middle pane: conversation list ── */}
          <div className="flex flex-col border-r border-white/5"
            style={{ width: 'clamp(140px, 28%, 200px)', flexShrink: 0 }}>

            {/* Header */}
            <div className="flex items-center justify-between px-2 sm:px-3 py-2 border-b border-white/5">
              <span className="font-bold text-white" style={{ fontSize: 11 }}>Chat</span>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/5">
                  <Plus className="w-3 h-3 text-white/50" />
                </div>
                <div className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/5">
                  <SlidersHorizontal className="w-3 h-3 text-white/50" />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5 px-1">
              {['All', 'Team', 'Direct'].map((t, i) => (
                <div key={t}
                  className="px-2 py-1.5 cursor-pointer"
                  style={{
                    fontSize: 9,
                    color: i === 0 ? '#0086F9' : 'rgba(255,255,255,0.4)',
                    borderBottom: i === 0 ? '1.5px solid #0086F9' : '1.5px solid transparent',
                    marginBottom: -1,
                  }}>
                  {t}
                </div>
              ))}
            </div>

            {/* Search bar */}
            <div className="px-2 sm:px-3 py-1.5 border-b border-white/5">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
                <Search className="w-2.5 h-2.5 text-white/30 flex-shrink-0" />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>Search...</span>
              </div>
            </div>

            {/* Conversation list + hover dropdown overlay */}
            <div className="relative flex-1 overflow-hidden">

              {/* Channel dropdown — only on chat icon hover */}
              <AnimatePresence>
                {chatHovered && (
                  <motion.div
                    key="dropdown"
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-1 left-2 right-2 z-20 rounded-lg border border-white/10 py-1 shadow-2xl"
                    style={{ background: '#1A2847' }}
                  >
                    <DropItem icon={<MessageSquare className="w-3 h-3 text-white/60" />} label="Chat" />
                    <DropItem icon={<TgIcon size={12} />} label="Telegram" />
                    <DropItem icon={<IgIcon size={12} />} label="Instagram" />
                    <DropItem icon={<FbIcon size={12} />} label="Facebook" />
                    <DropItem icon={<WaIcon size={12} />} label="Whatsapp" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Conversations (blurred when dropdown open) */}
              <div
                className="pt-1 transition-all duration-200"
                style={{
                  opacity: chatHovered ? 0.3 : 1,
                  filter: chatHovered ? 'blur(1px)' : 'none',
                  pointerEvents: 'none',
                }}
              >
                <div className="px-2 sm:px-3 pt-2 pb-1">
                  <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>TEAM</span>
                </div>
                <ConvRow
                  initials="WR" color="linear-gradient(135deg,#6366f1,#8b5cf6)"
                  name="Support Team" preview="IVR routing config update" time="16:18"
                  channelIcon={<MessageSquare style={{ width: 8, height: 8, color: 'rgba(255,255,255,0.6)' }} />}
                />
                <div className="px-2 sm:px-3 pt-2 pb-1">
                  <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>CHATS</span>
                </div>
                <ConvRow initials="JW" color="linear-gradient(135deg,#0ea5e9,#2563eb)" name="James Wilson" preview="Need help with IVR setup…" time="Yesterday" channelIcon={<TgIcon size={8} />} unread />
                <ConvRow initials="RM" color="linear-gradient(135deg,#059669,#10b981)" name="Rosa Martinez" preview="Billing inquiry · Invoice #882" time="2m ago" channelIcon={<WaIcon size={8} />} active />
              </div>
            </div>
          </div>

          {/* ── Right pane: active chat ── */}
          <div className="hidden sm:flex flex-1 flex-col bg-[#0B1422]">

            {/* Chat header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-white/5 bg-[#0D1525]">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar initials="RM" color="linear-gradient(135deg,#059669,#10b981)" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#0D1525] flex items-center justify-center">
                    <WaIcon size={8} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white" style={{ fontSize: 11 }}>Rosa Martinez</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Online · WhatsApp</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[Phone, Video, BarChart2].map((Icon, i) => (
                  <div key={i} className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10">
                    <Icon className="w-3 h-3 text-white/50" />
                  </div>
                ))}
              </div>
            </div>

            {/* Messages area — looping animation */}
            <div className="flex-1 overflow-hidden px-3 sm:px-4 py-3 flex flex-col justify-end gap-2">
              <AnimatePresence mode="sync">
                {CHAT_STEPS.map((step, idx) => {
                  if (idx >= visibleCount) return null

                  if (step.side === 'typing') {
                    return (
                      <motion.div
                        key={`${loopKey}-typing`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-2"
                      >
                        <Avatar initials="PN" color="linear-gradient(135deg,#046BD2,#0086F9)" />
                        <div className="flex items-center gap-1 px-3 py-2 rounded-2xl" style={{ background: 'rgba(4,107,210,0.2)' }}>
                          {[0, 0.15, 0.3].map((d, i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-[#0086F9]"
                              animate={{ y: [0, -3, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )
                  }

                  const isRight = step.side === 'right'
                  return (
                    <motion.div
                      key={`${loopKey}-${step.id}`}
                      initial={{ opacity: 0, x: isRight ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRight ? 6 : -6 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className={`flex items-end gap-2 max-w-[75%] ${isRight ? 'self-end flex-row-reverse' : ''}`}
                    >
                      <Avatar initials={step.initials} color={step.color} />
                      <div
                        className={`rounded-2xl px-3 py-2 ${isRight ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                        style={{
                          background: isRight ? 'rgba(4,107,210,0.35)' : '#1A2540',
                          fontSize: 10,
                          color: 'rgba(255,255,255,0.9)',
                          lineHeight: 1.5,
                        }}
                      >
                        {step.text}
                        <div className={`flex items-center gap-1 mt-0.5 ${isRight ? 'justify-end' : ''}`}>
                          <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)' }}>{step.time}</span>
                          {isRight && <CheckCheck className="w-2.5 h-2.5" style={{ color: '#0086F9' }} />}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div className="px-3 sm:px-4 py-2 border-t border-white/5">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8">
                <Paperclip className="w-3 h-3 text-white/35 flex-shrink-0" />
                <span className="flex-1" style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
                  Reply to Rosa Martinez — Priya N.
                </span>
                <Smile className="w-3 h-3 text-white/35 flex-shrink-0" />
                <div className="w-5 h-5 rounded-full bg-[#046BD2] flex items-center justify-center flex-shrink-0">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Bottom connector line (decorative) */}
      <svg
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-6 pointer-events-none opacity-20"
        viewBox="0 0 400 24" preserveAspectRatio="none"
      >
        <path d="M0 0 Q200 24 400 0" stroke="#046BD2" strokeWidth="1" fill="none" strokeDasharray="4 4" />
      </svg>
    </div>
  )
}
