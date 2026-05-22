'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import {
  Phone, PhoneOff, Mic, Bot, CheckCircle,
  Database, Globe2, ArrowRight,
} from 'lucide-react'

gsap.registerPlugin(TextPlugin)

const TRANSCRIPT = '"Hi, I\'m calling about a product demo for next week — we have about 15 people on our team..."'

const CRM_FIELDS = [
  { label: 'Name',    value: 'Sarah Chen' },
  { label: 'Company', value: 'Acme Corp' },
  { label: 'Intent',  value: 'Product Demo' },
  { label: 'Team',    value: '15 people' },
]

/* ─── Component ──────────────────────────────────────────────── */
export function ReceptionistHero() {
  const wrapRef          = useRef<HTMLDivElement>(null)

  /* Phone refs */
  const ringViewRef      = useRef<HTMLDivElement>(null)
  const callViewRef      = useRef<HTMLDivElement>(null)
  const doneViewRef      = useRef<HTMLDivElement>(null)
  const pulse1Ref        = useRef<HTMLDivElement>(null)
  const pulse2Ref        = useRef<HTMLDivElement>(null)
  const phoneTxRef       = useRef<HTMLSpanElement>(null)
  const phoneTimerRef    = useRef<HTMLSpanElement>(null)
  const phoneWaveRef     = useRef<HTMLDivElement>(null)

  /* Desktop refs */
  const deskCardRef      = useRef<HTMLDivElement>(null)
  const deskWaveRef      = useRef<HTMLDivElement>(null)
  const deskTxRef        = useRef<HTMLSpanElement>(null)
  const deskRouteRef     = useRef<HTMLDivElement>(null)
  const deskCrmRef       = useRef<HTMLDivElement>(null)
  const deskToastRef     = useRef<HTMLDivElement>(null)
  const crmFieldRefs     = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Wave helper ── */
      function animateWave(el: HTMLDivElement | null) {
        if (!el) return
        el.querySelectorAll<HTMLElement>('.w-bar').forEach((bar, i) => {
          gsap.to(bar, {
            scaleY: () => 0.15 + Math.random() * 0.85,
            duration: 0.28 + (i % 3) * 0.12,
            repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.04,
          })
        })
      }

      /* ── Timer ── */
      let timerInt: ReturnType<typeof setInterval> | null = null
      function startTimer() {
        let secs = 0
        timerInt = setInterval(() => {
          secs++
          const m = String(Math.floor(secs / 60)).padStart(2, '0')
          const s = String(secs % 60).padStart(2, '0')
          if (phoneTimerRef.current) phoneTimerRef.current.textContent = `${m}:${s}`
        }, 1000)
      }
      function stopTimer() {
        if (timerInt) { clearInterval(timerInt); timerInt = null }
      }

      /* ── Main sequence (loops) ── */
      function runSequence() {
        stopTimer()

        /* Reset all */
        const allViews = [ringViewRef.current, callViewRef.current, doneViewRef.current,
          deskCardRef.current, deskWaveRef.current, deskRouteRef.current,
          deskCrmRef.current, deskToastRef.current]
        gsap.set(allViews, { opacity: 0, y: 8 })
        gsap.set(crmFieldRefs.current.filter(Boolean), { opacity: 0, x: -8 })
        gsap.killTweensOf([phoneTxRef.current, deskTxRef.current])
        if (phoneTxRef.current) phoneTxRef.current.textContent = ''
        if (deskTxRef.current)  deskTxRef.current.textContent = ''
        if (phoneTimerRef.current) phoneTimerRef.current.textContent = '00:00'

        const show = (el: Element | null, delay = 0, extras = {}) =>
          gsap.to(el, { opacity: 1, y: 0, duration: 0.4, delay, ease: 'power2.out', ...extras })

        /* ── Phase 1 (0s): Phone rings ── */
        show(ringViewRef.current, 0)
        gsap.delayedCall(0.2, () => {
          gsap.fromTo(pulse1Ref.current,
            { scale: 1, opacity: 0.7 },
            { scale: 2.4, opacity: 0, duration: 1.3, repeat: 4, ease: 'power1.out' })
          gsap.fromTo(pulse2Ref.current,
            { scale: 1, opacity: 0.45 },
            { scale: 3, opacity: 0, duration: 1.3, repeat: 4, delay: 0.35, ease: 'power1.out' })
        })

        /* ── Phase 2 (1.6s): Desktop shows incoming ── */
        gsap.delayedCall(1.6, () => show(deskCardRef.current))

        /* ── Phase 3 (2.8s): AI answers ── */
        gsap.delayedCall(2.8, () => {
          gsap.to(ringViewRef.current, { opacity: 0, y: -8, duration: 0.3 })
          gsap.delayedCall(0.35, () => {
            show(callViewRef.current)
            show(deskWaveRef.current)
            animateWave(phoneWaveRef.current)
            animateWave(deskWaveRef.current)
            startTimer()
          })
        })

        /* ── Phase 4 (3.8s): Transcript types (phone + desktop in sync) ── */
        gsap.delayedCall(3.8, () => {
          const dur = TRANSCRIPT.length / 28
          gsap.to(phoneTxRef.current, { text: { value: TRANSCRIPT, delimiter: '' }, duration: dur, ease: 'none' })
          gsap.to(deskTxRef.current,  { text: { value: TRANSCRIPT, delimiter: '' }, duration: dur, ease: 'none' })
        })

        /* ── Phase 5 (7s): Routing decision ── */
        gsap.delayedCall(7, () => show(deskRouteRef.current))

        /* ── Phase 6 (8.2s): CRM panel + fields stagger ── */
        gsap.delayedCall(8.2, () => {
          show(deskCrmRef.current)
          crmFieldRefs.current.forEach((el, i) => {
            if (!el) return
            gsap.to(el, { opacity: 1, x: 0, duration: 0.35, delay: i * 0.22, ease: 'back.out(1.2)' })
          })
        })

        /* ── Phase 7 (10s): CRM synced toast ── */
        gsap.delayedCall(10, () => {
          gsap.fromTo(deskToastRef.current,
            { opacity: 0, y: 14, scale: 0.88 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' })
        })

        /* ── Phase 8 (11.5s): Call ends → done view ── */
        gsap.delayedCall(11.5, () => {
          stopTimer()
          gsap.to(callViewRef.current, { opacity: 0, y: -8, duration: 0.3 })
          gsap.delayedCall(0.35, () => show(doneViewRef.current))
        })

        /* ── Phase 9 (14.5s): Loop ── */
        gsap.delayedCall(14.5, runSequence)
      }

      /* ── Entrance: both devices slide in, then sequence starts ── */
      gsap.from(wrapRef.current?.querySelectorAll('.device-card') ?? [], {
        opacity: 0, y: 28, stagger: 0.18, duration: 0.65, ease: 'power3.out',
        onComplete: () => gsap.delayedCall(0.2, runSequence),
      })

    }, wrapRef)

    return () => ctx.revert()
  }, [])

  /* ─────────────────────────── JSX ─────────────────────────── */
  return (
    <div
      ref={wrapRef}
      className="flex items-center justify-center gap-5 select-none relative scale-[0.48] sm:scale-[0.62] md:scale-[0.75] lg:scale-[0.75] xl:scale-[0.88] 2xl:scale-100 origin-top"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 40%, rgba(4,107,210,0.13) 0%, transparent 70%)' }} />

      {/* ════════════ PHONE ════════════ */}
      <div className="device-card flex flex-col items-center shrink-0">
        <div
          style={{
            width: 218, borderRadius: 40,
            background: 'linear-gradient(160deg, #0e1521 0%, #080e18 100%)',
            padding: '12px 7px 10px',
            boxShadow: [
              '0 0 0 1px rgba(255,255,255,0.08)',
              '0 0 0 2px rgba(255,255,255,0.03)',
              '0 24px 60px -10px rgba(0,0,0,0.85)',
              '0 0 32px rgba(4,107,210,0.13)',
              'inset 0 1px 0 rgba(255,255,255,0.06)',
            ].join(', '),
          }}
        >
          {/* Dynamic Island */}
          <div className="flex justify-center mb-[5px]">
            <div style={{ width: 82, height: 22, borderRadius: 20,
              background: '#000', border: '1px solid rgba(255,255,255,0.07)' }} />
          </div>

          {/* Screen */}
          <div style={{
            borderRadius: 30, height: 364, overflow: 'hidden', position: 'relative',
            background: '#070D1A',
            border: '1.5px solid rgba(0,200,255,0.15)',
            boxShadow: '0 0 0 1px rgba(4,107,210,0.08), inset 0 0 28px rgba(0,8,20,0.55)',
          }}>
            {/* Status bar */}
            <div className="flex items-center justify-between px-4 pt-2 pb-1">
              <span className="text-[9px] font-mono text-white/40">9:41</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5 items-end">
                  {[3,4,5,6].map(h => <div key={h} style={{ width: 2, height: h, borderRadius: 1, background: 'rgba(255,255,255,0.35)' }} />)}
                </div>
                <div className="w-3.5 h-2 rounded-sm border border-white/30 ml-1 relative">
                  <div className="absolute inset-[1px] left-[1px] right-[2px] rounded-sm bg-white/30" />
                  <div className="absolute right-[-3px] top-[2px] w-[2px] h-1.5 rounded-r bg-white/25" />
                </div>
              </div>
            </div>

            {/* ── RING VIEW ── */}
            <div ref={ringViewRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-0" style={{ paddingTop: 28 }}>
              <div className="relative flex items-center justify-center mb-5">
                <div ref={pulse1Ref} className="absolute w-16 h-16 rounded-full border-2 border-[#046BD2]/50 opacity-0" />
                <div ref={pulse2Ref} className="absolute w-16 h-16 rounded-full border border-[#046BD2]/25 opacity-0" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#046BD2]/30 to-[#0086F9]/10 border-2 border-[#046BD2]/60 flex items-center justify-center text-base font-bold text-[#2D98F1] relative z-10 shadow-lg">
                  SC
                </div>
              </div>
              <p className="text-white font-semibold text-[15px]">Sarah Chen</p>
              <p className="text-[10px] font-mono text-white/35 mt-0.5">+1 (312) 555-0188</p>
              <p className="text-[10px] font-mono text-[#0086F9] mt-2">Incoming call…</p>

              {/* Action buttons */}
              <div className="flex items-center gap-10 mt-9">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full bg-red-500/80 flex items-center justify-center shadow-lg">
                    <PhoneOff className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[8px] font-mono text-white/30">Decline</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/80 flex items-center justify-center shadow-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[8px] font-mono text-white/30">Accept</span>
                </div>
              </div>

              {/* AI badge */}
              <div className="mt-7 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/25">
                <Bot className="w-3 h-3 text-[#0086F9]" />
                <span className="text-[9px] font-mono text-[#0086F9]">AI Receptionist on standby</span>
              </div>
            </div>

            {/* ── IN-CALL VIEW ── */}
            <div ref={callViewRef} className="absolute inset-0 flex flex-col px-3 pt-3 opacity-0">
              {/* Caller row */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/40 flex items-center justify-center text-[10px] font-bold text-[#2D98F1]">SC</div>
                  <div>
                    <div className="text-[10px] font-semibold text-white leading-none">Sarah Chen</div>
                    <div className="text-[8px] font-mono text-white/30 mt-0.5">+1 (312) 555-0188</div>
                  </div>
                </div>
                <span ref={phoneTimerRef} className="text-[9px] font-mono text-[#0086F9]">00:00</span>
              </div>

              {/* AI status */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#046BD2]/12 border border-[#046BD2]/22 mb-2.5">
                <Bot className="w-3 h-3 text-[#0086F9]" />
                <span className="text-[9px] font-mono text-[#0086F9]">AI Receptionist · Handling</span>
                <div className="ml-auto flex gap-0.5">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1 h-1 rounded-full bg-[#0086F9] animate-pulse"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>

              {/* Waveform */}
              <div ref={phoneWaveRef} className="flex items-end gap-[2px] h-10 mb-2.5">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="w-bar flex-1 rounded-full bg-[#046BD2]"
                    style={{ height: '35%', transformOrigin: 'bottom' }} />
                ))}
              </div>

              {/* Transcript */}
              <div className="flex-1 rounded-2xl bg-[#0B1523] border border-white/[0.07] p-3 overflow-hidden">
                <div className="text-[7px] font-mono text-[#0086F9]/55 uppercase tracking-widest mb-1.5">Live Transcript</div>
                <p className="text-[9.5px] text-white/65 leading-relaxed italic">
                  <span ref={phoneTxRef} />
                </p>
              </div>

              {/* Mute */}
              <div className="flex justify-center mt-3 pb-1">
                <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white/40" />
                </div>
              </div>
            </div>

            {/* ── DONE VIEW ── */}
            <div ref={doneViewRef} className="absolute inset-0 flex flex-col items-center justify-center px-4 opacity-0">
              <div className="w-14 h-14 rounded-full bg-emerald-400/12 border border-emerald-400/30 flex items-center justify-center mb-4 shadow-lg">
                <CheckCircle className="w-7 h-7 text-emerald-400" />
              </div>
              <p className="text-white font-semibold text-sm mb-0.5">Call Handled</p>
              <p className="text-[10px] font-mono text-white/35 mb-5">Sarah Chen · 0:38</p>
              <div className="w-full space-y-2">
                {['Routed → Sales Team', 'Demo booked: Thu 2 pm', 'CRM updated ✓'].map(t => (
                  <div key={t} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-400/5 border border-emerald-400/15">
                    <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="text-[9px] font-mono text-emerald-300">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side buttons */}
          <div className="absolute right-[-4px] top-[90px] flex flex-col gap-[6px]">
            <div style={{ width: 3, height: 28, borderRadius: 3, background: '#0c1526' }} />
          </div>
          <div className="absolute left-[-4px] top-[80px] flex flex-col gap-[5px]">
            {[20,18,18].map((h,i) => (
              <div key={i} style={{ width: 3, height: h, borderRadius: 3, background: '#0c1526' }} />
            ))}
          </div>

          {/* Home bar */}
          <div className="flex justify-center mt-[6px]">
            <div style={{ width: 62, height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.18)' }} />
          </div>
        </div>
        <div className="w-3/4 h-2 mt-1 rounded-full bg-black/40 blur-lg" />
      </div>

      {/* ════════════ DESKTOP MONITOR ════════════ */}
      <div className="device-card flex flex-col items-center shrink-0">
        {/* Monitor body */}
        <div style={{
          width: 316, borderRadius: 12,
          background: 'linear-gradient(160deg, #0e1521 0%, #080e18 100%)',
          padding: '5px',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.08)',
            '0 0 32px rgba(4,107,210,0.10)',
            'inset 0 1px 0 rgba(255,255,255,0.05)',
          ].join(', '),
        }}>
          {/* Screen */}
          <div style={{
            borderRadius: 8, height: 214, overflow: 'hidden', position: 'relative',
            background: '#070D1A',
            border: '1.5px solid rgba(0,200,255,0.15)',
            boxShadow: 'inset 0 0 20px rgba(0,8,20,0.5)',
          }}>
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-2.5 py-[5px] bg-[#0D1627] border-b border-white/[0.07]">
              <div className="flex gap-[3px]">
                <div className="w-[6px] h-[6px] rounded-full bg-red-500/70" />
                <div className="w-[6px] h-[6px] rounded-full bg-yellow-500/70" />
                <div className="w-[6px] h-[6px] rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex-1 mx-1.5 px-2 py-[2px] rounded bg-white/[0.04] border border-white/[0.05] flex items-center gap-1">
                <Globe2 className="w-[7px] h-[7px] text-white/25 shrink-0" />
                <span className="text-[7px] font-mono text-white/30">app.rozper.com/receptionist</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[7px] font-mono text-emerald-400">live</span>
              </div>
            </div>

            {/* Dashboard */}
            <div className="p-2 flex flex-col gap-[6px] relative overflow-hidden" style={{ height: 190 }}>
              {/* Top bar */}
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <Bot className="w-[10px] h-[10px] text-[#0086F9]" />
                  <span className="text-[7px] font-mono text-white/45 uppercase tracking-widest">AI Receptionist</span>
                </div>
                <div className="flex items-center gap-[3px] px-1.5 py-[2px] rounded-full bg-emerald-400/8 border border-emerald-400/18">
                  <div className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[6px] font-mono text-emerald-400">Online · 0 missed</span>
                </div>
              </div>

              {/* Active call card */}
              <div ref={deskCardRef} className="rounded-[7px] bg-[#0B1523] border border-[#046BD2]/22 p-1.5 shrink-0 opacity-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-[18px] h-[18px] rounded-full bg-[#046BD2]/20 border border-[#046BD2]/40 flex items-center justify-center text-[7px] font-bold text-[#2D98F1]">SC</div>
                    <div>
                      <div className="text-[7.5px] font-semibold text-white leading-none">Sarah Chen</div>
                      <div className="text-[6px] font-mono text-white/30">+1 (312) 555-0188</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-[3px] px-1.5 py-[2px] rounded-full bg-[#046BD2]/12 border border-[#046BD2]/22">
                    <Bot className="w-[7px] h-[7px] text-[#0086F9]" />
                    <span className="text-[6px] font-mono text-[#0086F9]">AI Handling</span>
                  </div>
                </div>

                {/* Waveform */}
                <div ref={deskWaveRef} className="flex items-end gap-[1.5px] h-5 mb-1.5 opacity-0">
                  {Array.from({ length: 26 }).map((_, i) => (
                    <div key={i} className="w-bar flex-1 rounded-sm bg-[#046BD2]"
                      style={{ height: '30%', transformOrigin: 'bottom' }} />
                  ))}
                </div>

                {/* Transcript */}
                <div className="rounded-md bg-[#060d1a] border border-white/[0.05] px-2 py-1.5">
                  <div className="text-[6px] font-mono text-[#0086F9]/50 uppercase tracking-widest mb-0.5">Live Transcript</div>
                  <p className="text-[7px] text-white/55 leading-relaxed italic" style={{ WebkitLineClamp: 2, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                    <span ref={deskTxRef} />
                  </p>
                </div>
              </div>

              {/* Route decision */}
              <div ref={deskRouteRef} className="rounded-[7px] bg-[#0B1523] border border-white/[0.07] px-2 py-1.5 shrink-0 opacity-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[6px] font-mono text-white/30 uppercase tracking-widest">Route Decision</span>
                  <ArrowRight className="w-[9px] h-[9px] text-[#0086F9]" />
                  <span className="text-[7px] font-semibold text-[#0086F9]">Sales Team · Enterprise</span>
                  <span className="ml-auto text-[6px] font-mono text-white/20">Demo intent</span>
                </div>
              </div>

              {/* CRM panel */}
              <div ref={deskCrmRef} className="rounded-[7px] bg-[#0B1523] border border-white/[0.07] px-2 py-1.5 shrink-0 opacity-0">
                <div className="flex items-center gap-1 mb-1.5">
                  <Database className="w-[9px] h-[9px] text-[#0086F9]" />
                  <span className="text-[6px] font-mono text-white/30 uppercase tracking-widest">CRM Pre-fill</span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  {CRM_FIELDS.map((f, i) => (
                    <div key={f.label} ref={el => { crmFieldRefs.current[i] = el }}
                      className="flex items-center gap-1.5 opacity-0">
                      <span className="text-[6px] font-mono text-white/22 w-9 shrink-0">{f.label}</span>
                      <span className="text-[7px] text-white/75 font-medium truncate">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CRM synced toast */}
              <div ref={deskToastRef} className="absolute bottom-2 right-2 opacity-0">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-400/10 border border-emerald-400/25"
                  style={{ boxShadow: '0 4px 16px rgba(52,211,153,0.15)' }}>
                  <CheckCircle className="w-[10px] h-[10px] text-emerald-400" />
                  <span className="text-[7.5px] font-mono text-emerald-400">CRM Synced ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Neck */}
        <div style={{
          width: 32, height: 16,
          background: 'linear-gradient(180deg, #0a1220 0%, #080e18 100%)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.04)',
        }} />
        {/* Base */}
        <div style={{
          width: 130, height: 8, borderRadius: '0 0 8px 8px',
          background: 'linear-gradient(180deg, #0c1522 0%, #080e18 100%)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 8px 24px -4px rgba(0,0,0,0.7)',
        }} />
        <div className="w-2/3 h-2 mt-0.5 rounded-full bg-black/35 blur-lg" />
      </div>
    </div>
  )
}
