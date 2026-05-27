"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Phone, MessageSquare, Globe, Layers, Zap } from "lucide-react"

/* ── Brand SVG icons ─────────────────────────────────── */
const WaIcon = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const IgIcon = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="ig-cc" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/><stop offset="50%" stopColor="#dc2743"/><stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <path fill="url(#ig-cc)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const FbIcon = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

/* ── Canvas dims ─────────────────────────────────────── */
const CW = 580   // canvas width
const CH = 370   // canvas height
const WW = 114   // mini-window width
const WH = 82    // mini-window height
const UW = 408   // unified window width
const UH = 258   // unified window height
// reference anchor (top-left of a centered mini-window)
const RX = CW / 2 - WW / 2   // 233
const RY = CH / 2 - WH / 2   // 144

/* ── Channel definitions ─────────────────────────────── */
type Ch = {
  id: string; name: string; color: string; dark: string
  icon: React.ReactNode; tabIcon: React.ReactNode
  pos: { x: number; y: number }
  lines: [string, string, string]
}

const CHANNELS: Ch[] = [
  {
    id: 'voice', name: 'Voice', color: '#3B82F6', dark: '#1A2E52',
    icon:    <Phone className="w-[8px] h-[8px] text-blue-400" />,
    tabIcon: <Phone className="w-[10px] h-[10px] text-blue-400" />,
    pos: { x: -190, y: -100 },
    lines: ['Inbound · 4:21', 'Billing queue', '3 in queue'],
  },
  {
    id: 'sms', name: 'SMS', color: '#10B981', dark: '#0A2E1F',
    icon:    <MessageSquare className="w-[8px] h-[8px] text-emerald-400" />,
    tabIcon: <MessageSquare className="w-[10px] h-[10px] text-emerald-400" />,
    pos: { x: 185, y: -112 },
    lines: ['New message', '"Order status?"', 'Queue: 7'],
  },
  {
    id: 'whatsapp', name: 'WhatsApp', color: '#25D366', dark: '#0A2413',
    icon:    <WaIcon size={8} />, tabIcon: <WaIcon size={10} />,
    pos: { x: -218, y: 5 },
    lines: ['Rosa M. · unread', '"When ships?"', 'AI handling'],
  },
  {
    id: 'instagram', name: 'Instagram', color: '#E1306C', dark: '#3A0D21',
    icon:    <IgIcon size={8} />, tabIcon: <IgIcon size={10} />,
    pos: { x: 218, y: 5 },
    lines: ['New DM', 'Promo inquiry', '2 unread'],
  },
  {
    id: 'facebook', name: 'Facebook', color: '#1877F2', dark: '#0D2040',
    icon:    <FbIcon size={8} />, tabIcon: <FbIcon size={10} />,
    pos: { x: -172, y: 112 },
    lines: ['Messenger DM', '"Login issue"', 'Urgent · SLA'],
  },
  {
    id: 'webchat', name: 'Web Chat', color: '#8B5CF6', dark: '#2D1B55',
    icon:    <Globe className="w-[8px] h-[8px] text-purple-400" />,
    tabIcon: <Globe className="w-[10px] h-[10px] text-purple-400" />,
    pos: { x: 172, y: 112 },
    lines: ['Widget chat', '"Pricing plans?"', 'Sales queue'],
  },
]

const CONVOS = [
  { initials: 'RM', bg: '#059669', chId: 'voice',     msg: 'Billing issue · inbound 4:21',    agent: 'Priya N.',  urgent: true  },
  { initials: 'JW', bg: '#2563EB', chId: 'whatsapp',  msg: '"When will my order ship?"',       agent: 'AI Bot',    urgent: false },
  { initials: 'AK', bg: '#7C3AED', chId: 'sms',       msg: 'Upgrade plan · needs callback',   agent: 'Marcus L.', urgent: false },
  { initials: 'TB', bg: '#B45309', chId: 'facebook',  msg: '"Help with my login — urgent"',   agent: 'Layla H.',  urgent: true  },
]

/* ── Mini-window ─────────────────────────────────────── */
function MiniWin({ ch }: { ch: Ch }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/15 shadow-2xl"
      style={{ width: WW, height: WH, background: '#0D1525' }}>
      <div className="flex items-center gap-1.5 px-2 py-1.5" style={{ background: ch.dark }}>
        <div className="flex gap-1 flex-shrink-0">
          <div className="w-[6px] h-[6px] rounded-full bg-[#FF5F57]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#FFBD2E]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#28C840]" />
        </div>
        <div className="w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0"
          style={{ background: ch.color + '28' }}>
          {ch.icon}
        </div>
        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.82)', fontWeight: 700 }}>{ch.name}</span>
      </div>
      <div className="px-2.5 pt-2 space-y-[5px]">
        {ch.lines.map((_, i) => (
          <div key={i} className="rounded-sm" style={{
            height: 6,
            background: i === 0 ? ch.color + '50' : i === 1 ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
            width: i === 0 ? '88%' : i === 1 ? '68%' : '50%',
          }} />
        ))}
      </div>
    </div>
  )
}

/* ── Unified window ──────────────────────────────────── */
function UnifiedWin({ visibleTabs }: { visibleTabs: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#0086F9]/25 shadow-[0_24px_70px_-10px_rgba(4,107,210,0.55)]"
      style={{ width: UW, height: UH, background: '#0D1525' }}>

      {/* title bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.08]"
        style={{ background: '#0B1829' }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-[7px] h-[7px] rounded-full bg-[#FF5F57]" />
            <div className="w-[7px] h-[7px] rounded-full bg-[#FFBD2E]" />
            <div className="w-[7px] h-[7px] rounded-full bg-[#28C840]" />
          </div>
          <div className="flex items-center gap-1.5">
            <Layers className="w-[9px] h-[9px] text-[#0086F9]" />
            <span className="font-mono text-white/40" style={{ fontSize: 8.5 }}>rozper.unified-inbox</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-[7px] w-[7px]">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            <span className="relative rounded-full bg-emerald-400 w-[7px] h-[7px]" />
          </span>
          <span className="font-mono text-emerald-400" style={{ fontSize: 8 }}>247 live</span>
        </div>
      </div>

      {/* channel tabs — appear one by one */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-white/[0.06]"
        style={{ background: '#0B1220' }}>
        {CHANNELS.map((ch, i) => (
          <motion.div key={ch.id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: i < visibleTabs ? 1 : 0, scale: i < visibleTabs ? 1 : 0.4 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex items-center gap-1 px-1.5 py-1 rounded-lg"
            style={{
              background: i === 0 ? ch.color + '22' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${i === 0 ? ch.color + '45' : 'rgba(255,255,255,0.07)'}`,
            }}
          >
            {ch.tabIcon}
            <span style={{ fontSize: 7.5, color: i === 0 ? ch.color : 'rgba(255,255,255,0.45)' }}>{ch.name}</span>
          </motion.div>
        ))}
      </div>

      {/* conversation rows */}
      <div style={{ background: '#0D1525' }}>
        {CONVOS.map((conv, i) => {
          const ch = CHANNELS.find(c => c.id === conv.chId)!
          return (
            <motion.div key={conv.initials}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: visibleTabs >= CHANNELS.length ? 1 : 0,
                x: visibleTabs >= CHANNELS.length ? 0 : -10,
              }}
              transition={{ delay: i * 0.08, duration: 0.22 }}
              className="flex items-center gap-2 px-3 py-[7px] border-b border-white/[0.04]"
              style={{ background: conv.urgent ? 'rgba(248,113,113,0.035)' : 'transparent' }}
            >
              <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                style={{ background: conv.bg, fontSize: 7 }}>
                {conv.initials}
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {ch.tabIcon}
              </div>
              {conv.urgent && <div className="w-[5px] h-[5px] rounded-full bg-red-400 flex-shrink-0" />}
              <span className="flex-1 truncate text-white/75" style={{ fontSize: 9 }}>{conv.msg}</span>
              <span className="font-mono text-white/25 flex-shrink-0" style={{ fontSize: 7.5 }}>{conv.agent}</span>
            </motion.div>
          )
        })}
      </div>

      {/* footer */}
      <div className="flex items-center justify-between px-3 py-2" style={{ background: '#090F1C' }}>
        <span className="font-mono text-white/20" style={{ fontSize: 7.5 }}>
          Voice · SMS · WhatsApp · Instagram · Facebook · Chat
        </span>
        <div className="flex items-center gap-1">
          <Zap className="w-[9px] h-[9px] text-[#0086F9]" />
          <span style={{ fontSize: 7.5, color: '#2D98F1' }}>AI active</span>
        </div>
      </div>
    </div>
  )
}

/* ── Phase machine ───────────────────────────────────── */
type Phase = 'entering' | 'scattered' | 'converging' | 'unified' | 'splitting'

// absolute timestamps (ms from loop start)
const T = {
  ENTERING_END:   750,
  SCATTERED_END:  3250,   // 2500ms floating
  CONVERGING_END: 4150,   //  900ms converge
  TABS_START:     4450,   //  300ms after unified appears
  TAB_INTERVAL:    190,
  UNIFIED_END:    7800,   // 3650ms showing unified
  LOOP_END:       8600,   //  800ms splitting
}

/* ── Main export ─────────────────────────────────────── */
export function ChannelCollapseAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale]         = useState(1)
  const [phase, setPhase]         = useState<Phase>('entering')
  const [visibleTabs, setVisible] = useState(0)
  const [loopKey, setLoopKey]     = useState(0)

  // Responsive scale
  useEffect(() => {
    if (!containerRef.current) return
    const obs = new ResizeObserver(entries => {
      setScale(Math.min(1, entries[0].contentRect.width / CW))
    })
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  // Animation loop
  useEffect(() => {
    let dead = false
    const ts: ReturnType<typeof setTimeout>[] = []
    const at = (fn: () => void, ms: number) => { ts.push(setTimeout(() => { if (!dead) fn() }, ms)) }

    setPhase('entering'); setVisible(0)
    at(() => setPhase('scattered'),    T.ENTERING_END)
    at(() => setPhase('converging'),   T.SCATTERED_END)
    at(() => { setPhase('unified'); setVisible(0) }, T.CONVERGING_END)
    CHANNELS.forEach((_, i) => at(() => setVisible(i + 1), T.TABS_START + i * T.TAB_INTERVAL))
    at(() => setPhase('splitting'),    T.UNIFIED_END)
    at(() => { setPhase('entering'); setVisible(0); setLoopKey(k => k + 1) }, T.LOOP_END)

    return () => { dead = true; ts.forEach(clearTimeout) }
  }, [loopKey])

  /* animate each mini-window per phase */
  const getAnimate = (ch: Ch, idx: number) => {
    if (phase === 'scattered') return {
      x: ch.pos.x,
      y: [ch.pos.y - 5, ch.pos.y + 5, ch.pos.y - 5],
      scale: 1, opacity: 1,
    }
    if (phase === 'entering' || phase === 'splitting') return {
      x: ch.pos.x, y: ch.pos.y, scale: 1, opacity: 1,
    }
    // converging / unified — collapse to center
    return { x: 0, y: 0, scale: 0.08, opacity: 0 }
  }

  const getTrans = (idx: number) => {
    if (phase === 'entering') return {
      duration: 0.5, delay: idx * 0.07,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    }
    if (phase === 'scattered') return {
      y: { duration: 2.5 + idx * 0.35, repeat: Infinity, ease: 'easeInOut' as const },
    }
    if (phase === 'converging') return {
      duration: 0.65, delay: idx * 0.04, ease: 'easeInOut' as const,
    }
    if (phase === 'splitting') return {
      duration: 0.55, delay: idx * 0.06,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    }
    return { duration: 0 }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-[620px] mx-auto select-none">

      {/* ambient glow */}
      <div className="absolute -inset-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] bg-[#046BD2]/15 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        {/* scaled canvas wrapper */}
        <div style={{ height: CH * scale, position: 'relative' }}>
          <div style={{
            width: CW, height: CH,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute', top: 0, left: 0,
          }}>

            {/* converging flash glow at center */}
            <motion.div
              style={{
                position: 'absolute',
                left: CW / 2 - 60, top: CH / 2 - 60,
                width: 120, height: 120,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,134,249,0.6) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
              animate={{ opacity: phase === 'converging' ? [0, 0.8, 0] : 0, scale: phase === 'converging' ? [0.5, 1.4, 0.5] : 0.5 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />

            {/* reference anchor for mini-windows */}
            <div style={{ position: 'absolute', left: RX, top: RY }}>

              {/* ── Mini windows ── */}
              {CHANNELS.map((ch, i) => (
                <motion.div
                  key={`${ch.id}-${loopKey}`}
                  style={{ position: 'absolute', top: 0, left: 0, willChange: 'transform' }}
                  initial={{ x: ch.pos.x, y: ch.pos.y, scale: 0, opacity: 0 }}
                  animate={getAnimate(ch, i)}
                  transition={getTrans(i)}
                >
                  <MiniWin ch={ch} />
                </motion.div>
              ))}

              {/* ── Unified window ── */}
              <motion.div
                key={`unified-${loopKey}`}
                style={{
                  position: 'absolute',
                  top: -(UH - WH) / 2,
                  left: -(UW - WW) / 2,
                }}
                initial={{ scale: 0.15, opacity: 0 }}
                animate={{
                  scale: phase === 'unified' ? 1 : 0.15,
                  opacity: phase === 'unified' ? 1 : 0,
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <UnifiedWin visibleTabs={visibleTabs} />
              </motion.div>

            </div>

            {/* phase label — bottom center */}
            <motion.div
              style={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}
              className="flex justify-center"
            >
              <motion.span
                key={phase}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-white/25"
                style={{ fontSize: 9 }}
              >
                {phase === 'scattered'  && '6 separate apps'}
                {phase === 'converging' && 'unifying…'}
                {phase === 'unified'    && '1 unified inbox'}
                {phase === 'splitting'  && 'or keep switching…'}
                {phase === 'entering'   && ''}
              </motion.span>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  )
}
