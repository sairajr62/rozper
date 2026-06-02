'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Zap } from 'lucide-react'

const CW = 580
const CH = 370

type Status = 'available' | 'on-call' | 'wrapping' | 'barge'
type AlertSeverity = 'critical' | 'warning' | 'info' | 'success'

const AGENTS_INIT: Array<{
  name: string; initials: string; color: string; status: Status; sec: number
}> = [
  { name: 'Maya S.',   initials: 'MS', color: '#2563EB', status: 'on-call',   sec: 223 },
  { name: 'Carlos R.', initials: 'CR', color: '#059669', status: 'on-call',   sec: 77  },
  { name: 'Priya N.',  initials: 'PN', color: '#7C3AED', status: 'wrapping',  sec: 28  },
  { name: 'James L.',  initials: 'JL', color: '#B45309', status: 'available', sec: 0   },
  { name: 'Layla H.',  initials: 'LH', color: '#DC2626', status: 'on-call',   sec: 483 },
  { name: 'Tom B.',    initials: 'TB', color: '#0891B2', status: 'barge',     sec: 351 },
]

const STATUS_LABEL: Record<Status, string> = {
  'available': 'AVAILABLE',
  'on-call':   'ON CALL',
  'wrapping':  'WRAP',
  'barge':     'BARGE',
}

const STATUS_COLOR: Record<Status, string> = {
  'available': '#0086F9',
  'on-call':   '#34D399',
  'wrapping':  '#FBBF24',
  'barge':     '#EF4444',
}

const ALERT_POOL: Array<{ severity: AlertSeverity; text: string }> = [
  { severity: 'critical', text: 'Escalation risk — Layla H.' },
  { severity: 'warning',  text: 'Long silence — Call #4421' },
  { severity: 'warning',  text: 'Sentiment drop — Carlos R.' },
  { severity: 'info',     text: 'Inbound spike · +4 queued' },
  { severity: 'success',  text: 'Resolved: Maya S. ✓' },
  { severity: 'critical', text: 'SLA risk — AHT climbing' },
  { severity: 'success',  text: 'CSAT 5★ — James L.' },
  { severity: 'info',     text: 'Queue cleared · 0 waiting' },
]

const SEV_COLOR: Record<AlertSeverity, string> = {
  critical: '#EF4444',
  warning:  '#F59E0B',
  info:     '#3B82F6',
  success:  '#10B981',
}

function fmtSec(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${(s % 60).toString().padStart(2, '0')}`
}

export function SupervisorDashboardAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale]   = useState(1)
  const [agents, setAgents] = useState(AGENTS_INIT)
  const [alerts, setAlerts] = useState<Array<{ id: number; severity: AlertSeverity; text: string }>>([
    { id: 1, severity: 'critical', text: 'Escalation risk — Layla H.' },
    { id: 2, severity: 'warning',  text: 'Long silence — Call #4421' },
    { id: 3, severity: 'info',     text: 'Inbound spike · +4 queued' },
  ])
  const [queue, setQueue]   = useState(7)
  const [aht,   setAht]     = useState(272)
  const alertIdRef   = useRef(10)
  const alertPoolIdx = useRef(4)

  // Responsive scale
  useEffect(() => {
    if (!containerRef.current) return
    const obs = new ResizeObserver(entries => {
      setScale(Math.min(1, entries[0].contentRect.width / CW))
    })
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  // Tick timers + AHT every second
  useEffect(() => {
    const iv = setInterval(() => {
      setAgents(prev => prev.map(a => ({
        ...a,
        sec: (a.status === 'on-call' || a.status === 'barge' || a.status === 'wrapping') ? a.sec + 1 : a.sec,
      })))
      setAht(prev => Math.max(200, Math.min(360, prev + (Math.random() > 0.55 ? 1 : -1))))
    }, 1000)
    return () => clearInterval(iv)
  }, [])

  // Spawn new alert every 3s + fluctuate queue
  useEffect(() => {
    const iv = setInterval(() => {
      const pool = ALERT_POOL[alertPoolIdx.current % ALERT_POOL.length]
      alertPoolIdx.current++
      const id = ++alertIdRef.current
      setAlerts(prev => [{ id, ...pool }, ...prev].slice(0, 4))
      setQueue(q => Math.max(1, Math.min(12, q + (Math.random() > 0.5 ? 1 : -1))))
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div ref={containerRef} className="w-full select-none">
      <div style={{ height: CH * scale, position: 'relative' }}>
        <div style={{
          width: CW, height: CH,
          transform: `scale(${scale})`, transformOrigin: 'top left',
          position: 'absolute',
          overflow: 'hidden',
        }}>

          {/* Dotted grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,134,249,0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Top bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 30,
            background: 'rgba(8,15,28,0.92)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center',
            paddingLeft: 14, paddingRight: 14, gap: 7,
          }}>
            <motion.div
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', flexShrink: 0 }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em' }}>
              SUPERVISOR VIEW · rozper.ccsup
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.18)', marginLeft: 'auto' }}>
              LIVE
            </span>
          </div>

          {/* Three-panel body */}
          <div style={{ position: 'absolute', top: 30, left: 0, right: 0, bottom: 0, display: 'flex', overflow: 'hidden' }}>

            {/* ── Panel 1: Live Agent Floor ── */}
            <div style={{
              width: 196, flexShrink: 0,
              borderRight: '1px solid rgba(255,255,255,0.055)',
              padding: '12px 10px',
              overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 9 }}>
                <motion.div
                  style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', flexShrink: 0 }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span style={{ fontFamily: 'monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.16em' }}>LIVE FLOOR</span>
                <span style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.18)', marginLeft: 'auto' }}>6 agents</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                {agents.map(a => {
                  const c = STATUS_COLOR[a.status]
                  return (
                    <div key={a.name} style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: a.status === 'barge'
                        ? '1px solid rgba(239,68,68,0.35)'
                        : '1px solid rgba(255,255,255,0.055)',
                      borderRadius: 7,
                      padding: '7px 7px 6px',
                    }}>
                      {/* Avatar with optional barge ring */}
                      <div style={{ position: 'relative', width: 24, height: 24, marginBottom: 5 }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: '50%',
                          background: a.color + '20',
                          border: `1.5px solid ${a.color}50`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 7.5, fontWeight: 700, color: a.color, fontFamily: 'monospace',
                        }}>
                          {a.initials}
                        </div>
                        {a.status === 'barge' && (
                          <motion.div
                            style={{
                              position: 'absolute', inset: -3,
                              borderRadius: '50%', border: '1.5px solid #EF4444',
                            }}
                            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.12, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </div>

                      <div style={{
                        fontSize: 7.5, color: 'rgba(255,255,255,0.65)', marginBottom: 3,
                        fontFamily: 'monospace', whiteSpace: 'nowrap',
                        overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {a.name}
                      </div>

                      <div style={{
                        display: 'inline-flex', alignItems: 'center',
                        fontSize: 6, fontFamily: 'monospace', fontWeight: 700,
                        padding: '1.5px 4px', borderRadius: 3,
                        color: c,
                        background: c + '18',
                        border: `1px solid ${c}30`,
                        letterSpacing: '0.04em',
                      }}>
                        {STATUS_LABEL[a.status]}
                      </div>

                      {a.status !== 'available' && (
                        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.25)', marginTop: 3, fontFamily: 'monospace' }}>
                          {fmtSec(a.sec)}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── Panel 2: KPI Metrics ── */}
            <div style={{
              width: 150, flexShrink: 0,
              borderRight: '1px solid rgba(255,255,255,0.055)',
              padding: '12px 14px',
            }}>
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.16em' }}>METRICS</span>
              </div>

              {/* Queue depth */}
              <div style={{ marginBottom: 15 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>QUEUE</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: queue > 8 ? '#EF4444' : '#10B981' }}>
                    {queue}
                  </span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <motion.div
                    style={{ height: '100%', borderRadius: 2, background: queue > 8 ? '#EF4444' : '#10B981' }}
                    animate={{ width: `${(queue / 12) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                  />
                </div>
              </div>

              {/* AHT */}
              <div style={{ marginBottom: 15 }}>
                <div style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>AVG HANDLE</div>
                <div style={{ fontFamily: 'monospace', fontSize: 26, fontWeight: 700, color: '#0086F9', lineHeight: 1 }}>
                  {fmtSec(aht)}
                </div>
              </div>

              {/* SLA */}
              <div style={{ marginBottom: 15 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>SLA</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 7, color: '#10B981' }}>✓</span>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: 26, fontWeight: 700, color: '#10B981', lineHeight: 1 }}>94.2%</div>
              </div>

              {/* Active calls */}
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>ACTIVE CALLS</div>
                <div style={{ fontFamily: 'monospace', fontSize: 26, fontWeight: 700, color: 'rgba(255,255,255,0.55)', lineHeight: 1 }}>5</div>
              </div>
            </div>

            {/* ── Panel 3: AI Alert Feed ── */}
            <div style={{ flex: 1, minWidth: 0, padding: '12px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                <Zap style={{ width: 9, height: 9, color: '#0086F9', flexShrink: 0 }} />
                <span style={{ fontFamily: 'monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.16em' }}>AI ALERTS</span>
                <motion.div
                  style={{ width: 5, height: 5, borderRadius: '50%', background: '#EF4444', marginLeft: 'auto', flexShrink: 0 }}
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </div>

              {/* Alert cards */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden', position: 'relative', minWidth: 0 }}>
                <AnimatePresence mode="sync">
                  {alerts.map((alert, i) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1 - i * 0.2, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.22 }}
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: `1px solid ${SEV_COLOR[alert.severity]}22`,
                        borderLeft: `2.5px solid ${SEV_COLOR[alert.severity]}`,
                        borderRadius: 6,
                        padding: '7px 8px',
                        flexShrink: 0,
                        width: '100%',
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{
                        fontFamily: 'monospace', fontSize: 6.5, fontWeight: 700,
                        color: SEV_COLOR[alert.severity], letterSpacing: '0.08em', marginBottom: 2,
                      }}>
                        {alert.severity.toUpperCase()}
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.72)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {alert.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Barge active panel */}
              <div style={{
                marginTop: 8, flexShrink: 0,
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.22)',
                borderRadius: 7,
                padding: '8px 10px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <motion.div
                    style={{ width: 5, height: 5, borderRadius: '50%', background: '#EF4444', flexShrink: 0 }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <span style={{ fontFamily: 'monospace', fontSize: 7.5, color: '#EF4444', fontWeight: 700, letterSpacing: '0.1em' }}>
                    BARGE ACTIVE
                  </span>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.38)' }}>
                  Listening: Tom B. · Call #3821
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.22)', marginTop: 2 }}>
                  Whisper mode available
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
