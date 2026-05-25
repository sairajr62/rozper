'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { Send, Search } from 'lucide-react'

/* ─── Conversation script ─────────────────────────────────────── */
const SCRIPT = [
  { from: 'customer', text: "Hi, I'd like to upgrade my plan. Can someone help?", time: '10:42 AM' },
  { from: 'agent',    text: 'Hi Sarah! Happy to help. Which plan are you on?', time: '10:43 AM' },
  { from: 'customer', text: "I'm on Starter — thinking about Business.", time: '10:43 AM' },
  { from: 'agent',    text: 'Great choice. I can upgrade you now and prorate the difference. Ready?', time: '10:44 AM' },
  { from: 'customer', text: 'Yes please!', time: '10:44 AM' },
] as const

const TYPING_MS  = [1100, 1400, 1200, 1700, 900]
const GAP_MS     = 380
const RESTART_MS = 2600

/* ─── Conversation list sidebar data ────────────────────────────  */
const CONVS = [
  { initials: 'SC', name: 'Sarah Chen',   preview: "I'd like to upgrade…", time: '10:42', unread: 1, active: true,  color: 'bg-[#046BD2]/20 border-[#046BD2]/35 text-[#2D98F1]' },
  { initials: 'MR', name: 'Mike Rivera',  preview: 'Got the invoice, thx', time: '10:38', unread: 0, active: false, color: 'bg-purple-500/20 border-purple-500/30 text-purple-400' },
  { initials: 'JL', name: 'Jamie Liu',    preview: 'Can you call me back?', time: '10:21', unread: 2, active: false, color: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400' },
  { initials: 'TP', name: 'Tara Patel',   preview: 'Thanks so much!',       time: '09:55', unread: 0, active: false, color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' },
]

/* ─── Component ──────────────────────────────────────────────── */
export function SMSHero() {
  const wrapRef    = useRef<HTMLDivElement>(null)
  const msgsRef    = useRef<HTMLDivElement>(null)
  const typingRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)
  const sendBtnRef = useRef<HTMLDivElement>(null)
  const aliveRef   = useRef(true)
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── bubble factory ────────────────────────────────────────── */
  const addBubble = useCallback((idx: number) => {
    const msgs = msgsRef.current
    if (!msgs) return
    const m       = SCRIPT[idx]
    const isAgent = m.from === 'agent'

    const wrap = document.createElement('div')
    wrap.className = `flex ${isAgent ? 'justify-end' : 'justify-start'} opacity-0`

    const inner = document.createElement('div')
    inner.className = `max-w-[76%] px-2.5 py-1.5 rounded-2xl text-[8px] leading-relaxed break-words ${
      isAgent
        ? 'bg-[#046BD2] text-white rounded-br-sm'
        : 'bg-white/[0.07] border border-white/[0.09] text-white/85 rounded-bl-sm'
    }`
    inner.innerHTML = `${m.text}<div class="text-[6.5px] mt-0.5 ${isAgent ? 'text-white/45' : 'text-white/30'}">${m.time}</div>`

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
    el.className = `flex ${isAgent ? 'justify-end' : 'justify-start'} px-2.5 mt-1`
    el.style.display = 'flex'
    el.innerHTML = `<div class="px-2.5 py-1.5 rounded-2xl ${
      isAgent
        ? 'bg-[#046BD2]/40 rounded-br-sm'
        : 'bg-white/[0.07] border border-white/[0.09] rounded-bl-sm'
    }"><div class="flex items-center gap-[3px]">
      <span class="td w-[5px] h-[5px] rounded-full ${isAgent ? 'bg-white/70' : 'bg-white/45'} inline-block"></span>
      <span class="td w-[5px] h-[5px] rounded-full ${isAgent ? 'bg-white/70' : 'bg-white/45'} inline-block"></span>
      <span class="td w-[5px] h-[5px] rounded-full ${isAgent ? 'bg-white/70' : 'bg-white/45'} inline-block"></span>
    </div></div>`
    gsap.fromTo(el, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.18 })
    el.querySelectorAll<HTMLElement>('.td').forEach((dot, i) => {
      gsap.to(dot, { y: -3, duration: 0.38, repeat: -1, yoyo: true, delay: i * 0.12, ease: 'sine.inOut' })
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
    if (timerRef.current) clearTimeout(timerRef.current)
    gsap.killTweensOf(typingRef.current?.querySelectorAll('.td') ?? [])
  }, [])

  /* ── main sequencer ────────────────────────────────────────── */
  const step = useCallback((idx: number) => {
    if (!aliveRef.current) return

    if (idx >= SCRIPT.length) {
      timerRef.current = setTimeout(() => {
        if (!aliveRef.current) return
        if (msgsRef.current) {
          const bubbles = Array.from(msgsRef.current.querySelectorAll<HTMLElement>(':scope > div'))
          if (bubbles.length) {
            gsap.to(bubbles, {
              opacity: 0, y: -6, stagger: 0.04, duration: 0.22,
              onComplete: () => {
                if (msgsRef.current) msgsRef.current.innerHTML = ''
                hideTyping()
                if (inputRef.current) inputRef.current.value = ''
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

    const msg    = SCRIPT[idx]
    const waitMs = TYPING_MS[idx]

    showTyping(msg.from)

    timerRef.current = setTimeout(() => {
      if (!aliveRef.current) return
      hideTyping()
      addBubble(idx)
      if (inputRef.current) inputRef.current.value = ''
      /* pulse send button on agent send */
      if (msg.from === 'agent' && sendBtnRef.current) {
        gsap.fromTo(sendBtnRef.current, { scale: 1 }, { scale: 1.15, duration: 0.12, yoyo: true, repeat: 1 })
      }
      timerRef.current = setTimeout(() => step(idx + 1), GAP_MS)
    }, waitMs)
  }, [addBubble, showTyping, hideTyping])

  useEffect(() => {
    const ctx = gsap.context(() => {
      aliveRef.current = true
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
      className="flex flex-col items-center select-none relative scale-[0.48] sm:scale-[0.62] md:scale-[0.78] lg:scale-100 origin-top"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 w-[480px] h-28 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(4,107,210,0.14) 0%, transparent 70%)' }}
      />

      {/* ══ TABLET BODY ══ */}
      <div
        className="relative flex"
        style={{
          width: 560,
          height: 368,
          borderRadius: 18,
          background: 'linear-gradient(160deg, #0e1521 0%, #080e18 100%)',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.08)',
            '0 4px 0 1px rgba(255,255,255,0.03)',
            '0 0 40px 0 rgba(0,180,255,0.08)',
            'inset 0 1px 0 rgba(255,255,255,0.07)',
            '0 20px 60px -10px rgba(0,0,0,0.8)',
          ].join(', '),
          padding: '8px 8px 10px 8px',
        }}
      >
        {/* Volume buttons — left side */}
        <div className="absolute left-[-5px] top-[60px] flex flex-col gap-[6px]">
          {[22, 18, 18].map((h, i) => (
            <div key={i} style={{
              width: 4, height: h, borderRadius: 3,
              background: 'linear-gradient(180deg, #111d30 0%, #0c1526 100%)',
              boxShadow: '-1px 0 0 rgba(255,255,255,0.05)',
            }} />
          ))}
        </div>

        {/* Power button — right side */}
        <div className="absolute right-[-5px] top-[70px]" style={{
          width: 4, height: 28, borderRadius: 3,
          background: 'linear-gradient(180deg, #111d30 0%, #0c1526 100%)',
          boxShadow: '1px 0 0 rgba(255,255,255,0.05)',
        }} />

        {/* Front camera — top bezel center */}
        <div className="absolute top-[3px] left-1/2 -translate-x-1/2">
          <div className="w-[5px] h-[5px] rounded-full bg-[#1a2535] ring-1 ring-white/10" />
        </div>

        {/* ── SCREEN ── */}
        <div
          className="flex-1 overflow-hidden flex flex-col"
          style={{
            borderRadius: 11,
            border: '1.5px solid rgba(0,200,255,0.16)',
            boxShadow: [
              '0 0 0 1px rgba(0,134,249,0.08)',
              '0 0 24px 2px rgba(0,180,255,0.10)',
              'inset 0 0 28px 0 rgba(0,8,20,0.5)',
            ].join(', '),
            background: '#070D1A',
          }}
        >
          {/* ── App header bar ── */}
          <div
            className="flex items-center justify-between px-3 shrink-0"
            style={{ height: 28, background: '#0D1627', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-[10px] h-[10px] rounded-sm bg-[#0086F9]" />
              <span className="text-[8.5px] font-mono text-white/55">Rozper · SMS & MMS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[7.5px] font-mono text-white/25">app.rozper.com/messages</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
                <span className="relative flex w-[5px] h-[5px]">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  <span className="relative rounded-full w-[5px] h-[5px] bg-emerald-400" />
                </span>
                <span className="text-[7.5px] font-mono text-emerald-400">live</span>
              </div>
            </div>
          </div>

          {/* ── App body: sidebar + chat ── */}
          <div className="flex flex-1 overflow-hidden">

            {/* ── Conversation list sidebar ── */}
            <div
              className="flex flex-col shrink-0 border-r border-white/[0.06]"
              style={{ width: 162, background: '#0A1120' }}
            >
              {/* Sidebar header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] shrink-0">
                <span className="text-[7.5px] font-semibold text-white/50 uppercase tracking-widest">Messages</span>
                <Search className="w-[9px] h-[9px] text-white/30" />
              </div>

              {/* Conversation items */}
              <div className="flex-1 overflow-y-auto py-1">
                {CONVS.map((c, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 px-2.5 py-2 transition-colors ${
                      c.active
                        ? 'bg-[#046BD2]/10 border-r-2 border-[#0086F9]'
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[7.5px] font-bold shrink-0 ${c.color}`}>
                      {c.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[7.5px] font-semibold truncate ${c.active ? 'text-white' : 'text-white/55'}`}>{c.name}</span>
                        <span className="text-[6.5px] font-mono text-white/25 shrink-0">{c.time}</span>
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

            {/* ── Active chat pane ── */}
            <div className="flex-1 flex flex-col overflow-hidden">

              {/* Chat header */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06] shrink-0 bg-[#0B1220]">
                <div className="w-7 h-7 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/35 flex items-center justify-center text-[8px] font-bold text-[#2D98F1] shrink-0">
                  SC
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-semibold text-white leading-none mb-0.5">Sarah Chen</div>
                  <div className="text-[7px] font-mono text-[#0086F9]/80">+1 (415) 555-0182 · SMS</div>
                </div>
                <div className="flex items-center gap-1 px-2 py-[3px] rounded-full bg-emerald-400/10 border border-emerald-400/20 shrink-0">
                  <span className="relative flex w-[4px] h-[4px]">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                    <span className="relative rounded-full w-[4px] h-[4px] bg-emerald-400" />
                  </span>
                  <span className="text-[7px] font-mono text-emerald-400">Live</span>
                </div>
              </div>

              {/* Messages area */}
              <div
                ref={msgsRef}
                className="flex-1 flex flex-col gap-1.5 px-2.5 py-2.5 overflow-y-auto"
                style={{ overflowY: 'hidden' }}
              />

              {/* Typing indicator */}
              <div ref={typingRef} className="pb-1" style={{ display: 'none' }} />

              {/* Input bar */}
              <div className="flex items-center gap-2 px-2.5 py-2 border-t border-white/[0.06] shrink-0 bg-[#0B1220]">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a reply…"
                  className="flex-1 min-w-0 px-2.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-[8px] font-mono text-white/80 placeholder:text-white/20 outline-none focus:border-[#046BD2]/50 focus:bg-white/[0.06] transition-colors"
                />
                <div
                  ref={sendBtnRef}
                  className="w-7 h-7 rounded-xl bg-[#046BD2] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#0078E0] transition-colors"
                >
                  <Send className="w-[10px] h-[10px] text-white" style={{ transform: 'translate(0.5px,-0.5px)' }} />
                </div>
              </div>

              {/* Campaign footer */}
              <div
                className="flex items-center justify-between px-3 py-1 shrink-0 border-t border-white/[0.04]"
                style={{ background: '#060C18' }}
              >
                <span className="text-[6.5px] font-mono text-white/25 truncate">Plan Upgrade campaign · 2,841 sent</span>
                <span className="text-[6.5px] font-mono text-emerald-400 shrink-0 ml-2">97.2% delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desk shadow */}
      <div className="w-3/4 h-2 mt-2 rounded-full bg-black/45 blur-xl" />
    </div>
  )
}
