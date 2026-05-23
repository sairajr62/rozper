'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import {
  MessageSquare, Phone, Users, Settings, Search,
  Hash, Bell, Globe2, Send, ChevronDown, Star,
} from 'lucide-react'

/* ─── Conversation ─────────────────────────────────────────────── */
const SCRIPT = [
  { from: 'customer', text: "Hi, I'd like to upgrade my plan. Can someone help?", time: '10:42 AM' },
  { from: 'agent',    text: 'Hi Sarah! Happy to help. Which plan are you currently on?', time: '10:43 AM' },
  { from: 'customer', text: "I'm on the Starter — thinking about moving to Business.", time: '10:43 AM' },
  { from: 'agent',    text: 'Great choice. I can upgrade you right now and prorate the difference. Ready?', time: '10:44 AM' },
  { from: 'customer', text: 'Yes please!', time: '10:44 AM' },
] as const

const TYPING_MS  = [1100, 1400, 1200, 1700, 900]
const GAP_MS     = 380
const RESTART_MS = 2600

/* sidebar nav items */
const NAV = [
  { icon: MessageSquare, active: true,  label: 'SMS',     badge: 3 },
  { icon: Phone,         active: false, label: 'Calls',   badge: 0 },
  { icon: Users,         active: false, label: 'Contacts',badge: 0 },
  { icon: Hash,          active: false, label: 'Channels',badge: 1 },
  { icon: Bell,          active: false, label: 'Alerts',  badge: 0 },
  { icon: Settings,      active: false, label: 'Settings',badge: 0 },
]

/* recent conversation list */
const CONVS = [
  { initials: 'SC', name: 'Sarah Chen',    preview: "I'd like to upgrade…",   time: 'Now',   active: true,  color: 'text-[#2D98F1] bg-[#046BD2]/20 border-[#046BD2]/30', unread: 1 },
  { initials: 'MT', name: 'Marcus T.',     preview: 'Got your message, thanks', time: '10:31', active: false, color: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/25', unread: 0 },
  { initials: 'LP', name: 'Layla P.',      preview: 'Call scheduled for 2pm',  time: '09:58', active: false, color: 'text-violet-300 bg-violet-500/15 border-violet-500/25',  unread: 2 },
  { initials: 'JR', name: 'James R.',      preview: 'Invoice received, ty!',   time: 'Yest',  active: false, color: 'text-amber-300 bg-amber-500/15 border-amber-500/25',    unread: 0 },
]

/* ─── Component ──────────────────────────────────────────────── */
export function SMSHero() {
  const wrapRef     = useRef<HTMLDivElement>(null)
  const msgsRef     = useRef<HTMLDivElement>(null)
  const typingRef   = useRef<HTMLDivElement>(null)
  const inputRef    = useRef<HTMLSpanElement>(null)
  const sendBtnRef  = useRef<HTMLDivElement>(null)
  const aliveRef    = useRef(true)
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const typeIRef    = useRef<ReturnType<typeof setInterval> | null>(null)

  /* ── bubble factory ────────────────────────────────────────── */
  const addBubble = useCallback((idx: number) => {
    const msgs = msgsRef.current
    if (!msgs) return
    const m       = SCRIPT[idx]
    const isAgent = m.from === 'agent'

    const wrap = document.createElement('div')
    wrap.className = `flex ${isAgent ? 'justify-end' : 'justify-start'} opacity-0`

    const inner = document.createElement('div')
    inner.className = `max-w-[78%] px-3 py-2 rounded-2xl text-[8.5px] leading-relaxed break-words ${
      isAgent
        ? 'bg-[#046BD2] text-white rounded-br-sm'
        : 'bg-white/[0.07] border border-white/[0.09] text-white/85 rounded-bl-sm'
    }`
    inner.innerHTML = `${m.text}<div class="text-[7px] mt-0.5 ${isAgent ? 'text-white/45' : 'text-white/30'}">${m.time}</div>`

    wrap.appendChild(inner)
    msgs.appendChild(wrap)

    gsap.fromTo(wrap,
      { opacity: 0, y: 6, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: 'power2.out' },
    )
    gsap.delayedCall(0.05, () => { msgs.scrollTop = msgs.scrollHeight })
  }, [])

  /* ── typing indicator ──────────────────────────────────────── */
  const showTyping = useCallback((from: 'customer' | 'agent') => {
    const el = typingRef.current
    if (!el) return
    const isAgent = from === 'agent'
    el.className = `flex ${isAgent ? 'justify-end' : 'justify-start'} mt-1`
    el.style.display = 'flex'
    el.innerHTML = `<div class="px-3 py-2 rounded-2xl ${
      isAgent
        ? 'bg-[#046BD2]/40 rounded-br-sm'
        : 'bg-white/[0.07] border border-white/[0.09] rounded-bl-sm'
    }"><div class="flex items-center gap-[4px] typing-dots">
      <span class="td w-[6px] h-[6px] rounded-full ${isAgent ? 'bg-white/70' : 'bg-white/45'} inline-block"></span>
      <span class="td w-[6px] h-[6px] rounded-full ${isAgent ? 'bg-white/70' : 'bg-white/45'} inline-block"></span>
      <span class="td w-[6px] h-[6px] rounded-full ${isAgent ? 'bg-white/70' : 'bg-white/45'} inline-block"></span>
    </div></div>`
    gsap.fromTo(el, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.18 })
    /* animate dots */
    el.querySelectorAll<HTMLElement>('.td').forEach((dot, i) => {
      gsap.to(dot, { y: -4, duration: 0.4, repeat: -1, yoyo: true, delay: i * 0.13, ease: 'sine.inOut' })
    })
    gsap.delayedCall(0.05, () => {
      if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
    })
  }, [])

  const hideTyping = useCallback(() => {
    const el = typingRef.current
    if (!el) return
    gsap.killTweensOf(el.querySelectorAll('.td'))
    gsap.to(el, { opacity: 0, duration: 0.12, onComplete: () => { el.style.display = 'none' } })
  }, [])

  /* ── clear all timers ──────────────────────────────────────── */
  const clearAll = useCallback(() => {
    if (timerRef.current)  clearTimeout(timerRef.current)
    if (typeIRef.current)  clearInterval(typeIRef.current)
    gsap.killTweensOf(typingRef.current?.querySelectorAll('.td') ?? [])
  }, [])

  /* ── main sequencer ──────────────────────────────────────────  */
  const step = useCallback((idx: number) => {
    if (!aliveRef.current) return

    if (idx >= SCRIPT.length) {
      timerRef.current = setTimeout(() => {
        if (!aliveRef.current) return
        /* clear chat */
        if (msgsRef.current) {
          const bubbles = Array.from(msgsRef.current.querySelectorAll<HTMLElement>(':scope > div'))
          if (bubbles.length) {
            gsap.to(bubbles, {
              opacity: 0, y: -6, stagger: 0.04, duration: 0.22,
              onComplete: () => {
                if (msgsRef.current) msgsRef.current.innerHTML = ''
                hideTyping()
                if (inputRef.current) {
                  inputRef.current.textContent = ''
                  const ph = inputRef.current.parentElement?.querySelector<HTMLElement>('.input-placeholder')
                  if (ph) ph.style.display = ''
                }
                timerRef.current = setTimeout(() => step(0), 250)
              },
            })
          } else {
            step(0)
          }
        }
      }, RESTART_MS)
      return
    }

    const msg     = SCRIPT[idx]
    const waitMs  = TYPING_MS[idx]

    showTyping(msg.from)

    /* typewriter in input bar for agent turns */
    if (msg.from === 'agent' && inputRef.current) {
      const full = msg.text
      let pos = 0
      /* hide placeholder */
      const ph = inputRef.current.parentElement?.querySelector<HTMLElement>('.input-placeholder')
      if (ph) ph.style.display = 'none'
      const chunkMs = Math.max(14, waitMs / (full.length / 2))
      typeIRef.current = setInterval(() => {
        if (!aliveRef.current) { clearInterval(typeIRef.current!); return }
        pos = Math.min(pos + 2, full.length)
        if (inputRef.current) inputRef.current.textContent = full.slice(0, pos)
        /* pulse send button while typing */
        if (sendBtnRef.current && pos % 6 === 0) {
          gsap.fromTo(sendBtnRef.current, { scale: 1 }, { scale: 1.12, duration: 0.12, yoyo: true, repeat: 1 })
        }
        if (pos >= full.length) clearInterval(typeIRef.current!)
      }, chunkMs)
    }

    timerRef.current = setTimeout(() => {
      if (!aliveRef.current) return
      hideTyping()
      addBubble(idx)
      if (inputRef.current) {
        inputRef.current.textContent = ''
        const ph = inputRef.current.parentElement?.querySelector<HTMLElement>('.input-placeholder')
        if (ph) ph.style.display = ''
      }
      timerRef.current = setTimeout(() => step(idx + 1), GAP_MS)
    }, waitMs)
  }, [addBubble, showTyping, hideTyping])

  useEffect(() => {
    const ctx = gsap.context(() => {
      aliveRef.current = true

      /* entrance */
      gsap.from(wrapRef.current, { opacity: 0, y: 20, duration: 0.55, ease: 'power2.out' })

      timerRef.current = setTimeout(() => step(0), 900)
    }, wrapRef)

    return () => {
      aliveRef.current = false
      clearAll()
      ctx.revert()
    }
  }, [step, clearAll])

  /* ─────────────────────── JSX ──────────────────────────────── */
  return (
    <div
      ref={wrapRef}
      className="flex flex-col items-center select-none relative scale-[0.48] sm:scale-[0.6] md:scale-[0.75] lg:scale-[0.82] xl:scale-[0.92] 2xl:scale-100 origin-top"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 w-[520px] h-32 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(4,107,210,0.13) 0%, transparent 70%)' }}
      />

      {/* ══ LAPTOP LID ══ */}
      <div
        className="w-full"
        style={{
          width: 580,
          borderRadius: '14px 14px 4px 4px',
          background: 'linear-gradient(160deg, #0e1521 0%, #080e18 100%)',
          padding: '6px 6px 4px 6px',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.07)',
            '0 -2px 0 1px rgba(255,255,255,0.03)',
            '0 0 36px rgba(4,107,210,0.11)',
            'inset 0 1px 0 rgba(255,255,255,0.06)',
          ].join(', '),
        }}
      >
        {/* Camera notch */}
        <div className="flex justify-center mb-[5px]">
          <div className="w-[5px] h-[5px] rounded-full bg-[#1a2535] ring-1 ring-white/10" />
        </div>

        {/* ── SCREEN ── */}
        <div
          style={{
            borderRadius: 10,
            height: 376,
            overflow: 'hidden',
            background: '#070D1A',
            border: '1.5px solid rgba(0,200,255,0.17)',
            boxShadow: [
              '0 0 0 1px rgba(0,134,249,0.09)',
              '0 0 26px 2px rgba(0,180,255,0.11)',
              'inset 0 0 30px rgba(0,10,24,0.55)',
            ].join(', '),
          }}
          className="flex flex-col"
        >
          {/* ── Browser chrome ── */}
          <div className="flex items-center gap-2 px-3 py-[5px] bg-[#0D1627] border-b border-white/[0.07] shrink-0">
            <div className="flex gap-[4px]">
              <div className="w-[7px] h-[7px] rounded-full bg-red-500/70" />
              <div className="w-[7px] h-[7px] rounded-full bg-yellow-500/70" />
              <div className="w-[7px] h-[7px] rounded-full bg-emerald-500/70" />
            </div>
            {/* Tabs */}
            <div className="flex gap-1 ml-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-t-md bg-[#111B2D] border border-white/[0.08] border-b-[#111B2D]">
                <MessageSquare className="w-[8px] h-[8px] text-[#0086F9]" />
                <span className="text-[7.5px] font-mono text-white/70">SMS · Rozper</span>
                <div className="w-[3px] h-[3px] rounded-full bg-[#0086F9]" />
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-t-md border border-white/[0.04]">
                <span className="text-[7px] font-mono text-white/25">Analytics</span>
              </div>
            </div>
            {/* Address bar */}
            <div className="flex-1 flex items-center gap-1 px-2 py-[3px] rounded bg-white/[0.04] border border-white/[0.05] mx-1">
              <Globe2 className="w-[7px] h-[7px] text-white/25 shrink-0" />
              <span className="text-[7px] font-mono text-white/35 truncate">app.rozper.com/messages</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="relative flex w-[7px] h-[7px]">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
                <span className="relative rounded-full w-[7px] h-[7px] bg-emerald-400" />
              </span>
              <span className="text-[7px] font-mono text-emerald-400">live</span>
            </div>
          </div>

          {/* ── APP SHELL ── */}
          <div className="flex flex-1 overflow-hidden bg-[#070D1A]">

            {/* ── Far-left nav rail ── */}
            <div className="flex flex-col items-center gap-1 py-3 shrink-0 border-r border-white/[0.06]"
              style={{ width: 42, background: '#060C18' }}>
              {/* Logo */}
              <div className="w-6 h-6 rounded-md bg-[#046BD2]/20 border border-[#046BD2]/35 flex items-center justify-center mb-2">
                <div className="w-[10px] h-[10px] rounded-sm bg-[#0086F9]" />
              </div>
              {NAV.map((n, i) => (
                <div
                  key={i}
                  className={`relative w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                    n.active
                      ? 'bg-[#046BD2]/25 border border-[#046BD2]/40'
                      : 'hover:bg-white/[0.04]'
                  }`}
                  title={n.label}
                >
                  <n.icon className={`w-[13px] h-[13px] ${n.active ? 'text-[#0086F9]' : 'text-white/30'}`} strokeWidth={1.8} />
                  {n.badge > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-[12px] h-[12px] rounded-full bg-[#046BD2] text-[6px] font-bold text-white flex items-center justify-center leading-none">
                      {n.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* ── Conversation list ── */}
            <div className="flex flex-col shrink-0 border-r border-white/[0.06] overflow-hidden"
              style={{ width: 148, background: '#0A1120' }}>
              {/* List header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] shrink-0">
                <span className="text-[8px] font-semibold text-white/60 uppercase tracking-widest">Messages</span>
                <Search className="w-[9px] h-[9px] text-white/30" />
              </div>
              {/* Conversations */}
              <div className="flex-1 overflow-y-auto py-1">
                {CONVS.map((c, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 px-2.5 py-2 cursor-pointer transition-colors ${
                      c.active ? 'bg-[#046BD2]/12 border-r-2 border-[#0086F9]' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[8px] font-bold shrink-0 ${c.color}`}>
                      {c.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-[7.5px] font-semibold truncate ${c.active ? 'text-white' : 'text-white/60'}`}>{c.name}</span>
                        <span className="text-[6.5px] font-mono text-white/25 shrink-0 ml-1">{c.time}</span>
                      </div>
                      <p className="text-[7px] text-white/30 truncate mt-0.5">{c.preview}</p>
                    </div>
                    {c.unread > 0 && (
                      <span className="w-[12px] h-[12px] rounded-full bg-[#046BD2] text-[6px] font-bold text-white flex items-center justify-center shrink-0 mt-0.5">
                        {c.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Active conversation ── */}
            <div className="flex-1 flex flex-col overflow-hidden">

              {/* Conversation header */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06] shrink-0 bg-[#0B1220]">
                <div className="w-7 h-7 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[8px] font-bold text-[#2D98F1] shrink-0">
                  SC
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8.5px] font-semibold text-white truncate">Sarah Chen</span>
                    <ChevronDown className="w-[8px] h-[8px] text-white/25 shrink-0" />
                  </div>
                  <div className="text-[7px] font-mono text-[#0086F9]">+1 (415) 555-0182 · SMS</div>
                </div>
                <div className="flex items-center gap-1 px-2 py-[3px] rounded-md bg-emerald-400/10 border border-emerald-400/20 shrink-0">
                  <span className="relative flex w-[5px] h-[5px]">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                    <span className="relative rounded-full w-[5px] h-[5px] bg-emerald-400" />
                  </span>
                  <span className="text-[7px] font-mono text-emerald-400">Live</span>
                </div>
                <Star className="w-[9px] h-[9px] text-white/20 shrink-0" />
              </div>

              {/* Messages area */}
              <div
                ref={msgsRef}
                className="flex-1 flex flex-col gap-1.5 px-3 py-2.5 overflow-y-auto"
                style={{ overflowY: 'hidden' }}
              />

              {/* Typing indicator (appended as last row) */}
              <div ref={typingRef} className="px-3 pb-1" style={{ display: 'none' }} />

              {/* Input bar */}
              <div className="flex items-center gap-2 px-3 py-2 border-t border-white/[0.06] shrink-0 bg-[#0B1220]">
                <div className="flex-1 flex items-center px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] min-w-0">
                  <span
                    ref={inputRef}
                    className="text-[8px] font-mono text-white/70 flex-1 truncate"
                  />
                  {/* placeholder if empty */}
                  <span className="text-[8px] font-mono text-white/20 input-placeholder">Type a reply…</span>
                </div>
                <div
                  ref={sendBtnRef}
                  className="w-7 h-7 rounded-lg bg-[#046BD2] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#0078E0] transition-colors"
                >
                  <Send className="w-[10px] h-[10px] text-white" style={{ transform: 'translate(0.5px,-0.5px)' }} />
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-3 py-1.5 border-t border-white/[0.05] shrink-0"
                style={{ background: '#060C18' }}>
                <span className="text-[6.5px] font-mono text-white/25 truncate">Campaign: Plan Upgrade · 2,841 sent</span>
                <span className="text-[6.5px] font-mono text-emerald-400 shrink-0 ml-2">97.2% delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ HINGE ══ */}
      <div
        style={{
          width: '100%',
          maxWidth: 584,
          height: 4,
          background: 'linear-gradient(180deg, #0a1220 0%, #060c14 100%)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.03)',
        }}
      />

      {/* ══ BASE ══ */}
      <div
        style={{
          width: '100%',
          maxWidth: 596,
          height: 22,
          borderRadius: '0 0 10px 10px',
          background: 'linear-gradient(180deg, #0c1522 0%, #080e18 100%)',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.06)',
            '0 14px 36px -6px rgba(0,0,0,0.9)',
            'inset 0 1px 0 rgba(255,255,255,0.04)',
          ].join(', '),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          width: 64, height: 7, borderRadius: 4,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
        }} />
      </div>

      {/* Desk shadow */}
      <div className="w-3/4 h-2 mt-1 rounded-full bg-black/45 blur-xl" />
    </div>
  )
}
