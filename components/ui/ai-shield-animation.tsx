"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { Zap } from "lucide-react"

/* ── Canvas layout constants ─────────────────────────── */
const CW = 560
const CH = 360
const SX = 252   // shield center x
const SY = 180   // shield center y
const SR = 66    // shield radius

const AG_COLS = 6
const AG_SIZE = 18
const AG_GAP  = 9
const AG_X    = 418
const AG_Y    = 94

function agPos(i: number) {
  const col = i % AG_COLS
  const row = Math.floor(i / AG_COLS)
  return {
    x: AG_X + col * (AG_SIZE + AG_GAP) + AG_SIZE / 2,
    y: AG_Y + row * (AG_SIZE + AG_GAP) + AG_SIZE / 2,
  }
}

const AG_COLORS = [
  '#059669','#2563EB','#7C3AED','#B45309','#0EA5E9','#DC2626',
  '#16A34A','#EA580C','#8B5CF6','#0284C7','#65A30D','#BE185D',
  '#0D9488','#7C3AED','#CA8A04','#1D4ED8','#059669','#C026D3',
  '#0891B2','#B91C1C','#15803D','#9333EA','#0369A1','#92400E',
]

const ROUTINE_COLORS = ['#3B82F6','#0086F9','#22D3EE','#60A5FA']
const COMPLEX_COLORS = ['#F97316','#EF4444','#F59E0B']

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return `${r},${g},${b}`
}

/* ── Particle (managed in ref, never React state) ─────── */
type Phase = 'traveling' | 'absorbing' | 'escalating' | 'done'
type Particle = {
  id: number
  sx: number; sy: number   // source
  tx: number; ty: number   // target
  color: string
  type: 'routine' | 'complex'
  phase: Phase
  t0: number               // phase start timestamp
  agentIdx: number
}

const ROUTINE_CHANCE = 0.80
const TRAVEL_MS      = 1700
const ABSORB_MS      = 500
const ESCALATE_MS    = 680
const SPAWN_MS       = 310

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

/* ── Component ───────────────────────────────────────── */
export function AIShieldAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const particles    = useRef<Particle[]>([])
  const rafRef       = useRef<number>(0)
  const idRef        = useRef(0)
  const glowTimers   = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())

  const [scale,   setScale]   = useState(1)
  const [glowing, setGlowing] = useState<Set<number>>(new Set())
  const [pulseKey, setPulse]  = useState(0)

  // Responsive scale
  useEffect(() => {
    if (!containerRef.current) return
    const obs = new ResizeObserver(e => {
      setScale(Math.min(1, e[0].contentRect.width / CW))
    })
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  // Agent glow helper (stable ref so spawn closure can call it)
  const glowAgent = useCallback((idx: number) => {
    setGlowing(prev => new Set([...prev, idx]))
    const existing = glowTimers.current.get(idx)
    if (existing) clearTimeout(existing)
    const t = setTimeout(() => {
      setGlowing(prev => { const s = new Set(prev); s.delete(idx); return s })
    }, 900)
    glowTimers.current.set(idx, t)
  }, [])

  // Canvas draw loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    function draw(now: number) {
      ctx.clearRect(0, 0, CW, CH)

      const alive: Particle[] = []

      for (const p of particles.current) {
        const elapsed = now - p.t0

        if (p.phase === 'traveling') {
          const prog = Math.min(elapsed / TRAVEL_MS, 1)
          const ep   = easeInOut(prog)
          const cx   = lerp(p.sx, p.tx, ep)
          const cy   = lerp(p.sy, p.ty, ep)

          // Draw glow + dot
          const r = p.type === 'complex' ? 4 : 3
          const rgb = hexToRgb(p.color)
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 3)
          grad.addColorStop(0, `rgba(${rgb},0.9)`)
          grad.addColorStop(1, `rgba(${rgb},0)`)
          ctx.beginPath()
          ctx.arc(cx, cy, r * 3, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
          ctx.beginPath()
          ctx.arc(cx, cy, r, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()

          if (prog >= 1) {
            // Transition phase
            if (p.type === 'routine') {
              alive.push({ ...p, phase: 'absorbing', t0: now })
              setPulse(k => k + 1)
            } else {
              const ag = agPos(p.agentIdx)
              alive.push({ ...p, phase: 'escalating', sx: SX, sy: SY, tx: ag.x, ty: ag.y, t0: now })
            }
          } else {
            alive.push(p)
          }

        } else if (p.phase === 'absorbing') {
          const prog = Math.min(elapsed / ABSORB_MS, 1)
          const scale = 1 + prog * 2.5   // expand
          const alpha = 1 - prog           // fade out
          const r = (p.type === 'complex' ? 4 : 3) * scale
          const rgb = hexToRgb(p.color)
          ctx.beginPath()
          ctx.arc(p.tx, p.ty, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb},${alpha * 0.8})`
          ctx.fill()

          if (prog < 1) alive.push(p)
          // else: done, drop it

        } else if (p.phase === 'escalating') {
          const prog = Math.min(elapsed / ESCALATE_MS, 1)
          const ep   = easeInOut(prog)
          const cx   = lerp(p.sx, p.tx, ep)
          const cy   = lerp(p.sy, p.ty, ep)
          const r    = 4
          const rgb  = hexToRgb(p.color)
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.5)
          grad.addColorStop(0, `rgba(${rgb},0.9)`)
          grad.addColorStop(1, `rgba(${rgb},0)`)
          ctx.beginPath()
          ctx.arc(cx, cy, r * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
          ctx.beginPath()
          ctx.arc(cx, cy, r, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()

          if (prog >= 1) {
            glowAgent(p.agentIdx)
            // done, drop it
          } else {
            alive.push(p)
          }
        }
      }

      particles.current = alive
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [glowAgent])

  // Spawn loop
  useEffect(() => {
    const spawn = () => {
      const id    = ++idRef.current
      const isR   = Math.random() < ROUTINE_CHANCE
      const sy    = 55 + Math.random() * 250
      const agent = Math.floor(Math.random() * 24)
      const pool  = isR ? ROUTINE_COLORS : COMPLEX_COLORS
      const color = pool[id % pool.length]

      particles.current = [
        ...particles.current.slice(-30),
        {
          id, sx: 18, sy, tx: SX, ty: SY,
          color, type: isR ? 'routine' : 'complex',
          phase: 'traveling', t0: performance.now(),
          agentIdx: agent,
        }
      ]
    }

    const iv = setInterval(spawn, SPAWN_MS)
    return () => clearInterval(iv)
  }, [])

  return (
    <div ref={containerRef} className="w-full select-none">
      <div style={{ height: CH * scale, position: 'relative' }}>
        <div style={{
          width: CW, height: CH,
          transform: `scale(${scale})`, transformOrigin: 'top left',
          position: 'absolute',
        }}>

          {/* Dotted grid background */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,134,249,0.18) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            width={CW}
            height={CH}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          />

          {/* Zone dividers */}
          <div style={{ position: 'absolute', left: 108, top: 28, height: CH - 48, width: 1, background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', left: AG_X - 20, top: 28, height: CH - 48, width: 1, background: 'rgba(255,255,255,0.05)' }} />

          {/* Labels */}
          <div style={{ position: 'absolute', left: 16, top: 20, fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.18em' }}>VOLUME</div>
          <div style={{ position: 'absolute', left: 18, top: 33, fontFamily: 'monospace', fontSize: 24, color: 'rgba(0,134,249,0.22)', fontWeight: 700, lineHeight: 1 }}>∞</div>
          <div style={{ position: 'absolute', left: 14, bottom: 18, fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>6 channels</div>

          <div style={{ position: 'absolute', right: 14, top: 20, fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.18em', textAlign: 'right' }}>TEAM</div>
          <div style={{ position: 'absolute', right: 14, bottom: 18, fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.2)', textAlign: 'right' }}>24 agents</div>

          <div style={{ position: 'absolute', left: SX - 44, top: 18, width: 88, textAlign: 'center', fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>3 shifts · 24/7</div>

          {/* Shield outer rotating rings */}
          <motion.div style={{
            position: 'absolute',
            left: SX - SR - 14, top: SY - SR - 14,
            width: (SR + 14) * 2, height: (SR + 14) * 2,
            borderRadius: '50%', border: '1px dashed rgba(0,134,249,0.28)',
          }}
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div style={{
            position: 'absolute',
            left: SX - SR - 6, top: SY - SR - 6,
            width: (SR + 6) * 2, height: (SR + 6) * 2,
            borderRadius: '50%', border: '1px dashed rgba(0,134,249,0.13)',
          }}
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />

          {/* Shield body — pulses on absorption */}
          <motion.div
            key={pulseKey}
            style={{
              position: 'absolute',
              left: SX - SR, top: SY - SR,
              width: SR * 2, height: SR * 2,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,134,249,0.20) 0%, rgba(4,107,210,0.07) 55%, transparent 80%)',
              border: '1.5px solid rgba(0,134,249,0.45)',
            }}
            animate={{
              boxShadow: ['0 0 16px rgba(0,134,249,0.32)','0 0 44px rgba(0,134,249,0.68)','0 0 16px rgba(0,134,249,0.32)'],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
          />

          {/* Shield center */}
          <div style={{ position: 'absolute', left: SX, top: SY, transform: 'translate(-50%,-50%)', textAlign: 'center', pointerEvents: 'none' }}>
            <Zap className="w-7 h-7 text-[#0086F9] mx-auto" strokeWidth={1.5} />
            <div style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginTop: 2 }}>AI</div>
          </div>

          {/* Shield stats */}
          <div style={{ position: 'absolute', left: SX - 36, top: SY + SR + 14, width: 72, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontFamily: 'monospace', color: '#0086F9', fontWeight: 700 }}>82%</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em' }}>auto-handled</div>
          </div>

          {/* Agent dots */}
          {Array.from({ length: 24 }).map((_, i) => {
            const pos   = agPos(i)
            const glow  = glowing.has(i)
            const color = AG_COLORS[i]
            return (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: pos.x - AG_SIZE / 2,
                  top:  pos.y - AG_SIZE / 2,
                  width: AG_SIZE, height: AG_SIZE,
                  borderRadius: '50%', background: color,
                }}
                animate={{
                  opacity:   glow ? 1 : 0.32,
                  scale:     glow ? 1.3 : 1,
                  boxShadow: glow ? `0 0 14px ${color}cc` : '0 0 0 transparent',
                }}
                transition={{ duration: 0.18 }}
              />
            )
          })}

        </div>
      </div>
    </div>
  )
}
