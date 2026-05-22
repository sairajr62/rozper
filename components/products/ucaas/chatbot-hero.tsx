'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { Globe2, Bot, MessageCircle, X, Send, Sparkles } from 'lucide-react'

gsap.registerPlugin(TextPlugin)

/* ─── Conversation script ─────────────────────────────────────── */
const script = [
  { from: 'bot',  text: 'Hi there! 👋 I\'m Roz, your AI assistant. How can I help you today?' },
  { from: 'user', text: 'What plans do you offer for small teams?' },
  { from: 'bot',  text: 'Great question! Our Starter plan covers up to 10 users with voice, chat & SMS — all for $15/seat/mo.' },
  { from: 'user', text: 'Is there a free trial?' },
  { from: 'bot',  text: 'Yes! 14 days free, no credit card needed. Want me to set that up for you now? 🚀' },
  { from: 'user', text: 'That sounds perfect, yes please!' },
  { from: 'bot',  text: 'Awesome! I\'ll connect you with our team right away. You\'re all set! ✅' },
]

/* ─── Component ──────────────────────────────────────────────── */
export function ChatbotHero() {
  const wrapRef       = useRef<HTMLDivElement>(null)
  const headerRef     = useRef<HTMLDivElement>(null)
  const heroRef       = useRef<HTMLDivElement>(null)
  const btnRef        = useRef<HTMLDivElement>(null)
  const windowRef     = useRef<HTMLDivElement>(null)
  const msgsRef       = useRef<HTMLDivElement>(null)
  const typingRef     = useRef<HTMLDivElement>(null)
  const inputRef      = useRef<HTMLDivElement>(null)
  const notifDotRef   = useRef<HTMLSpanElement>(null)
  const liveDotRef    = useRef<HTMLSpanElement>(null)
  const unreadRef     = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── helpers ── */
      const msgs   = () => msgsRef.current
      const typing = () => typingRef.current

      function showTyping() {
        if (!typing()) return
        gsap.set(typing()!, { display: 'flex', opacity: 0 })
        gsap.to(typing()!, { opacity: 1, duration: 0.2 })
      }
      function hideTyping() {
        if (!typing()) return
        gsap.to(typing()!, { opacity: 0, duration: 0.15, onComplete: () => gsap.set(typing()!, { display: 'none' }) })
      }

      function appendMsg(from: 'bot' | 'user', text: string, atTime: number, typingDuration = 0) {
        const isBot = from === 'bot'
        const bubble = document.createElement('div')
        bubble.className = `chat-bubble flex ${isBot ? 'justify-start' : 'justify-end'} opacity-0`
        bubble.innerHTML = isBot
          ? `<div class="flex items-end gap-1.5 max-w-[80%]">
               <div class="w-5 h-5 rounded-full bg-[#046BD2]/30 border border-[#046BD2]/40 flex items-center justify-center shrink-0 mb-0.5">
                 <svg class="w-2.5 h-2.5 text-[#0086F9]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM3 17v-1h18v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"/></svg>
               </div>
               <div class="px-2.5 py-1.5 rounded-2xl rounded-bl-sm bg-[#0D1C35] border border-white/[0.08] text-[8px] text-white/80 leading-relaxed msg-text"></div>
             </div>`
          : `<div class="max-w-[75%] px-2.5 py-1.5 rounded-2xl rounded-br-sm bg-[#046BD2] text-[8px] text-white leading-relaxed msg-text"></div>`

        gsap.delayedCall(atTime, () => {
          msgs()?.appendChild(bubble)
          gsap.to(bubble, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out',
            onStart: () => gsap.set(bubble, { y: 8 }) })

          const textEl = bubble.querySelector<HTMLElement>('.msg-text')
          if (textEl) {
            // Instantly set text (no typewriter for cleaner feel inside small widget)
            textEl.textContent = text
          }

          // scroll chat to bottom
          gsap.delayedCall(0.05, () => {
            if (msgs()) msgs()!.scrollTop = msgs()!.scrollHeight
          })
        })

        return atTime + (isBot ? typingDuration + 0.3 : 0.4)
      }

      /* ── Master timeline ── */
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      // 0s – browser chrome slides in
      tl.from(headerRef.current, { y: -50, opacity: 0, duration: 0.5 }, 0)

      // 0.3s – page hero content fades in
      tl.from(heroRef.current ? heroRef.current.querySelectorAll('.hero-item') : [],
        { y: 20, opacity: 0, stagger: 0.12, duration: 0.55, ease: 'power3.out' }, 0.3)

      // 0.9s – chat button bounces in with notification dot
      tl.fromTo(btnRef.current,
        { scale: 0, opacity: 0, rotate: -20 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.8)' }, 0.9)

      // 1.3s – notification badge appears
      if (unreadRef.current) {
        tl.fromTo(unreadRef.current,
          { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' }, 1.3)
      }

      // 1.7s – chat window opens (scale from bottom-right)
      tl.fromTo(windowRef.current,
        { scale: 0.6, opacity: 0, transformOrigin: 'bottom right', y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.3)' }, 1.7)

      // 1.9s – input bar slides up
      tl.from(inputRef.current, { y: 20, opacity: 0, duration: 0.4 }, 1.9)

      // 2.0s – start conversation
      // Calculate times manually for the conversation
      // Each exchange: show typing → append message
      let t = 2.0

      script.forEach((msg, i) => {
        if (msg.from === 'bot') {
          // show typing indicator before bot message
          gsap.delayedCall(t, showTyping)
          t += 0.7 // typing duration
          gsap.delayedCall(t, hideTyping)
          appendMsg('bot', msg.text, t, 0)
          t += 0.6
        } else {
          // simulate user typing in input (optional: pulse input)
          appendMsg('user', msg.text, t, 0)
          t += 0.8
        }
      })

      // After full conversation, restart after a pause
      const restartAt = t + 1.5
      gsap.delayedCall(restartAt, () => {
        // fade out all chat bubbles and restart
        const bubbles = msgs()?.querySelectorAll('.chat-bubble')
        if (bubbles) {
          gsap.to(Array.from(bubbles), {
            opacity: 0, y: -8, stagger: 0.04, duration: 0.3,
            onComplete: () => {
              if (msgs()) msgs()!.innerHTML = ''
              // Re-run conversation after clearing
              let t2 = 0
              script.forEach((msg) => {
                if (msg.from === 'bot') {
                  gsap.delayedCall(t2, showTyping)
                  t2 += 0.7
                  gsap.delayedCall(t2, hideTyping)
                  appendMsg('bot', msg.text, t2, 0)
                  t2 += 0.6
                } else {
                  appendMsg('user', msg.text, t2, 0)
                  t2 += 0.8
                }
              })
            }
          })
        }
      })

      /* ── Infinite micro-animations ── */

      // Live dot
      if (liveDotRef.current) {
        gsap.to(liveDotRef.current, {
          scale: 1.7, opacity: 0.35, duration: 0.85,
          repeat: -1, yoyo: true, ease: 'sine.inOut'
        })
      }

      // Notification dot pulse
      if (notifDotRef.current) {
        gsap.to(notifDotRef.current, {
          scale: 1.4, opacity: 0.7, duration: 0.7,
          repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.4
        })
      }

      // Typing dots animate
      const dotsLoop = () => {
        const dots = typingRef.current?.querySelectorAll<HTMLElement>('.typing-dot')
        if (!dots) return
        gsap.to(Array.from(dots), {
          y: -3, duration: 0.35, stagger: 0.12,
          repeat: -1, yoyo: true, ease: 'sine.inOut'
        })
      }
      gsap.delayedCall(1.8, dotsLoop)

    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapRef}
      className="flex flex-col items-center select-none relative scale-[0.48] sm:scale-[0.62] md:scale-[0.78] lg:scale-100 origin-top"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 w-[460px] h-36 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,180,255,0.12) 0%, transparent 70%)' }}
      />

      {/* ══ LID ══ */}
      <div
        className="w-full max-w-[540px] rounded-[14px] rounded-b-[3px] relative"
        style={{
          padding: '5px',
          background: 'linear-gradient(160deg, #0e1521 0%, #080e18 100%)',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.07)',
            '0 2px 0 1px rgba(255,255,255,0.04)',
            '0 -2px 32px 0 rgba(0,180,255,0.10)',
            'inset 0 1px 0 rgba(255,255,255,0.06)',
          ].join(', '),
        }}
      >
        {/* Camera */}
        <div className="flex justify-center mb-[4px]">
          <div className="w-[4px] h-[4px] rounded-full bg-[#1a2535] ring-1 ring-white/10" />
        </div>

        {/* Screen */}
        <div
          className="overflow-hidden relative"
          style={{
            borderRadius: 10,
            height: 340,
            border: '1.5px solid rgba(0,200,255,0.18)',
            boxShadow: [
              '0 0 0 1px rgba(0,134,249,0.10)',
              '0 0 28px 2px rgba(0,180,255,0.12)',
              'inset 0 0 32px 0 rgba(0,10,24,0.6)',
            ].join(', '),
            background: '#070D1A',
          }}
        >

          {/* ── Browser chrome ── */}
          <div
            ref={headerRef}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#0D1627] border-b border-white/[0.07]"
          >
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/70" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
            </div>
            <div className="flex-1 mx-2 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.05] flex items-center gap-1.5">
              <Globe2 className="w-2 h-2 text-white/25 shrink-0" />
              <span className="text-[8px] font-mono text-white/30">yoursite.com/pricing</span>
            </div>
            <div className="flex items-center gap-1">
              <span ref={liveDotRef} className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[8px] font-mono text-emerald-400">live</span>
            </div>
          </div>

          {/* ── Website content ── */}
          <div ref={heroRef} className="px-6 pt-5 overflow-hidden">

            {/* Site nav */}
            <div className="hero-item flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-md bg-[#046BD2]/30 border border-[#046BD2]/40 flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-[#0086F9]" />
                </div>
                <span className="text-[9px] font-bold text-white">Rozper</span>
              </div>
              <div className="flex items-center gap-3">
                {['Pricing', 'Features', 'Docs', 'Sign in'].map((nav) => (
                  <span key={nav} className="text-[7px] text-white/35 hover:text-white/60 cursor-pointer transition-colors">{nav}</span>
                ))}
              </div>
            </div>

            {/* Hero headline */}
            <div className="hero-item mb-2">
              <div className="h-[10px] w-64 rounded-full bg-white/10 mb-1.5" />
              <div className="h-[10px] w-48 rounded-full bg-white/10 mb-3" />
              <div className="h-[7px] w-72 rounded-full bg-white/[0.05] mb-1" />
              <div className="h-[7px] w-56 rounded-full bg-white/[0.05] mb-3" />
            </div>

            {/* CTA button */}
            <div className="hero-item flex items-center gap-2 mb-4">
              <div className="px-3 py-1.5 rounded-full bg-[#046BD2] text-[8px] font-semibold text-white">
                Start free trial
              </div>
              <div className="px-3 py-1.5 rounded-full border border-white/15 text-[8px] text-white/50">
                See demo
              </div>
            </div>

            {/* Pricing cards placeholder */}
            <div className="hero-item grid grid-cols-3 gap-2">
              {['Starter', 'Growth', 'Enterprise'].map((plan, i) => (
                <div
                  key={plan}
                  className={`p-2 rounded-xl border text-center ${
                    i === 1
                      ? 'bg-[#046BD2]/15 border-[#046BD2]/40'
                      : 'bg-white/[0.02] border-white/[0.07]'
                  }`}
                >
                  <div className="text-[7px] font-semibold text-white/70 mb-1">{plan}</div>
                  <div className={`text-[9px] font-bold ${i === 1 ? 'text-[#0086F9]' : 'text-white/50'}`}>
                    {i === 0 ? '$15' : i === 1 ? '$29' : 'Custom'}
                  </div>
                  <div className="text-[6px] text-white/25 mt-0.5">/seat/mo</div>
                  <div className={`mt-1.5 w-full py-0.5 rounded-full text-[6px] font-medium ${
                    i === 1 ? 'bg-[#046BD2] text-white' : 'bg-white/[0.05] text-white/30'
                  }`}>
                    {i === 1 ? 'Most popular' : 'Choose'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Chat widget ── */}
          <div className="absolute bottom-3 right-3 flex flex-col items-end gap-1.5">

            {/* Chat window */}
            <div
              ref={windowRef}
              className="w-[155px] rounded-2xl overflow-hidden opacity-0"
              style={{
                background: 'rgba(10,17,32,0.97)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(4,107,210,0.15)',
              }}
            >
              {/* Chat header */}
              <div className="flex items-center justify-between px-2.5 py-2 bg-gradient-to-r from-[#046BD2] to-[#0086F9]">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-2 h-2 text-white" />
                  </div>
                  <div>
                    <div className="text-[8px] font-semibold text-white leading-none">Roz AI</div>
                    <div className="text-[6px] text-white/70 flex items-center gap-0.5 mt-0.5">
                      <span ref={notifDotRef} className="inline-block w-1 h-1 rounded-full bg-emerald-400" />
                      Online
                    </div>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">
                  <X className="w-2 h-2 text-white/70" />
                </div>
              </div>

              {/* Messages */}
              <div
                ref={msgsRef}
                className="flex flex-col gap-1.5 px-2 py-2 overflow-hidden"
                style={{ height: 120, overflowY: 'hidden' }}
              />

              {/* Typing indicator */}
              <div
                ref={typingRef}
                className="items-center gap-1.5 px-2 pb-1"
                style={{ display: 'none' }}
              >
                <div className="w-4 h-4 rounded-full bg-[#046BD2]/30 border border-[#046BD2]/40 flex items-center justify-center shrink-0">
                  <Bot className="w-2 h-2 text-[#0086F9]" />
                </div>
                <div className="flex items-center gap-[3px] px-2 py-1 rounded-2xl bg-[#0D1C35] border border-white/[0.08]">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="typing-dot w-1 h-1 rounded-full bg-white/40"
                    />
                  ))}
                </div>
              </div>

              {/* Input bar */}
              <div
                ref={inputRef}
                className="flex items-center gap-1.5 px-2 py-1.5 border-t border-white/[0.06]"
              >
                <div className="flex-1 flex items-center px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.07]">
                  <span className="text-[7px] text-white/20 flex-1">Type a message…</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-[#046BD2] flex items-center justify-center shrink-0 cursor-pointer">
                  <Send className="w-2 h-2 text-white" style={{ transform: 'translate(0.5px, -0.5px)' }} />
                </div>
              </div>
            </div>

            {/* Floating chat button */}
            <div
              ref={btnRef}
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer relative opacity-0"
              style={{
                background: 'linear-gradient(135deg, #046BD2 0%, #0086F9 100%)',
                boxShadow: '0 4px 16px rgba(4,107,210,0.5), 0 0 0 2px rgba(255,255,255,0.08)',
              }}
            >
              <MessageCircle className="w-4 h-4 text-white" />
              {/* Unread badge */}
              <span
                ref={unreadRef}
                className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-[6px] font-bold text-white flex items-center justify-center scale-0 leading-none"
              >
                1
              </span>
            </div>
          </div>

        </div>{/* /screen */}
      </div>{/* /lid */}

      {/* ══ HINGE ══ */}
      <div
        className="w-full max-w-[544px]"
        style={{
          height: 3,
          background: 'linear-gradient(180deg, #0a1220 0%, #060c14 100%)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.03)',
        }}
      />

      {/* ══ BASE ══ */}
      <div
        className="w-full max-w-[556px] flex flex-col items-center justify-center"
        style={{
          height: 24,
          borderRadius: '0 0 10px 10px',
          background: 'linear-gradient(180deg, #0c1522 0%, #080e18 100%)',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.06)',
            '0 14px 36px -6px rgba(0,0,0,0.9)',
            'inset 0 1px 0 rgba(255,255,255,0.04)',
          ].join(', '),
        }}
      >
        <div
          className="w-16 h-[8px] rounded-[4px]"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
          }}
        />
      </div>

      {/* Desk shadow */}
      <div className="w-3/4 h-2 mt-1 rounded-full bg-black/40 blur-lg" />
    </div>
  )
}
