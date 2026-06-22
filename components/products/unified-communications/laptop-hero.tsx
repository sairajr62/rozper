'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import {
  Phone, Video, MessageSquare, Bot, Layers, Plug,
  Globe2, Wifi, BarChart2, Clock, Mic, Star, Users,
  ChevronRight, Search, Bell, Settings,
} from 'lucide-react'

gsap.registerPlugin(TextPlugin)

/* ─── static data ───────────────────────────────────────────── */
const navIcons = [Globe2, Phone, Video, MessageSquare, Bot, Plug, Layers, BarChart2, Users, Settings]

const conversations = [
  { name: 'Priya Nair',   preview: 'Call connected — HD voice',    time: '9:41',  badge: 'On Call',  badgeColor: 'text-[#0086F9]' },
  { name: 'Marcus Lee',   preview: 'AI summary ready for review',   time: '9:38',  badge: 'Video',    badgeColor: 'text-emerald-400' },
  { name: 'Layla Hassan', preview: 'SMS campaign delivered ✓',      time: '9:35',  badge: 'SMS',      badgeColor: 'text-amber-400' },
  { name: 'Jordan Kim',   preview: 'AI receptionist handled query', time: '9:30',  badge: 'AI',       badgeColor: 'text-purple-400' },
  { name: 'Diego Flores', preview: 'Meeting transcript exported',   time: '9:22',  badge: 'Video',    badgeColor: 'text-emerald-400' },
  { name: 'Ana Souza',    preview: 'Fax received — 3 pages',        time: '9:15',  badge: 'Fax',      badgeColor: 'text-white/40' },
]

const featureCards = [
  { icon: Bot,   label: 'AI Receptionist', sub: 'Answers 24 / 7',       color: 'from-[#046BD2]/30 to-[#0086F9]/10' },
  { icon: Clock, label: '24 / 7 Calls',    sub: '150 + countries',      color: 'from-[#0086F9]/30 to-[#2D98F1]/10' },
  { icon: Wifi,  label: 'Smart Routing',   sub: '99.99% uptime',        color: 'from-[#2D98F1]/30 to-[#046BD2]/10' },
  { icon: Star,  label: 'AI Sentiment',    sub: 'Live on every call',   color: 'from-[#046BD2]/30 to-[#2575FC]/10' },
]

const aiInsights = [
  '● Avg handle time down 18 % this week',
  '● AI resolved 73 % of chats without agent',
  '● 3 unanswered calls flagged for review',
]

/* Pre-computed wave bar heights — deterministic, fixed precision to avoid SSR/client hydration mismatch */
const WAVE_BAR_HEIGHTS = Array.from({ length: 14 }, (_, i) =>
  `${(20 + Math.abs(Math.sin(i * 0.9)) * 80).toFixed(1)}%`
)

/* ─── component ─────────────────────────────────────────────── */
export function LaptopHero() {
  /* refs for every animated piece */
  const wrapRef   = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const navRef    = useRef<HTMLDivElement>(null)
  const rowsRef   = useRef<HTMLDivElement>(null)
  const panelRef  = useRef<HTMLDivElement>(null)
  const aiTextRef = useRef<HTMLDivElement>(null)
  const barRef    = useRef<HTMLDivElement>(null)
  const shimRef   = useRef<HTMLDivElement>(null)
  const cardsRef  = useRef<HTMLDivElement>(null)
  const liveDotRef= useRef<HTMLSpanElement>(null)
  const badgeRef  = useRef<HTMLDivElement>(null)
  const waveRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      /* ── 0.0s Header slides in ── */
      tl.from(headerRef.current, { y: -60, opacity: 0, duration: 0.6 }, 0)

      /* ── 0.2s Sidebar nav stagger in ── */
      tl.from(
        navRef.current ? navRef.current.querySelectorAll('.nav-icon') : [],
        { x: -40, opacity: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out' },
        0.2,
      )

      /* ── 0.5s Conversation rows stagger up ── */
      tl.from(
        rowsRef.current ? rowsRef.current.querySelectorAll('.conv-row') : [],
        { y: 20, opacity: 0, stagger: 0.08, duration: 0.55, ease: 'back.out(1.2)' },
        0.5,
      )

      /* ── 0.9s Right panel slides in ── */
      tl.from(panelRef.current, { x: 30, opacity: 0, duration: 0.55, ease: 'power2.out' }, 0.9)

      /* ── 1.2s AI text types in ── */
      if (aiTextRef.current) {
        const lines = aiTextRef.current.querySelectorAll<HTMLElement>('.ai-line')
        lines.forEach((el, i) => {
          const full = el.dataset.text ?? ''
          el.textContent = ''
          tl.to(el, { duration: full.length / 30, text: { value: full, delimiter: '' }, ease: 'none' }, 1.2 + i * 0.7)
        })
      }

      /* ── 1.5s Sentiment bar fills ── */
      tl.to(barRef.current, { width: '87%', duration: 1.2, ease: 'power2.out' }, 1.5)
      tl.to(shimRef.current, { opacity: 1, duration: 0.3 }, 2.2)

      /* ── 1.8s Feature cards sequence ── */
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll<HTMLElement>('.feat-card')
        cards.forEach((card, i) => {
          tl.fromTo(card,
            { scale: 0.85, opacity: 0, y: 10 },
            { scale: 1,    opacity: 1, y: 0,  duration: 0.45, ease: 'back.out(1.4)' },
            1.8 + i * 0.18,
          )
        })
      }

      /* ── ∞ Continuous micro-animations ── */

      // Live dot pulse
      if (liveDotRef.current) {
        gsap.to(liveDotRef.current, { scale: 1.6, opacity: 0.4, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      }

      // Badge bounce every 4 s
      if (badgeRef.current) {
        gsap.to(badgeRef.current, { y: -3, duration: 0.25, repeat: -1, repeatDelay: 3.75, yoyo: true, ease: 'power2.out' })
      }

      // Shimmer scan line
      if (shimRef.current) {
        gsap.to(shimRef.current, { x: '100%', duration: 1.4, repeat: -1, repeatDelay: 1.5, ease: 'power1.inOut', delay: 2.5 })
      }

      // Waveform bars
      if (waveRef.current) {
        const bars = waveRef.current.querySelectorAll<HTMLElement>('.wave-bar')
        bars.forEach((bar, i) => {
          gsap.to(bar, {
            scaleY: () => 0.2 + Math.random() * 0.8,
            duration: 0.35 + (i % 3) * 0.15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.04,
          })
        })
      }

    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="flex flex-col items-center select-none relative scale-[0.55] sm:scale-[0.75] lg:scale-100 origin-top">
      {/* Ambient glow behind the screen */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[460px] h-36 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,180,255,0.12) 0%, transparent 70%)' }} />

      {/* ══ LID ══ */}
      {/* Outer body — deep charcoal, thin uniform bezel, cyan glow */}
      <div
        className="w-full max-w-[540px] rounded-[14px] rounded-b-[3px] relative"
        style={{
          padding: '5px 5px 5px 5px',
          background: 'linear-gradient(160deg, #0e1521 0%, #080e18 100%)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 2px 0 1px rgba(255,255,255,0.04), 0 -2px 32px 0 rgba(0,180,255,0.10), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Camera dot */}
        <div className="flex justify-center mb-[4px]">
          <div className="w-[4px] h-[4px] rounded-full bg-[#1a2535] ring-1 ring-white/10" />
        </div>

        {/* Screen — matches image: dark bg, cyan border glow, tight radius */}
        <div
          className="overflow-hidden"
          style={{
            borderRadius: 10,
            height: 340,
            border: '1.5px solid rgba(0,200,255,0.18)',
            boxShadow: '0 0 0 1px rgba(0,134,249,0.10), 0 0 28px 2px rgba(0,180,255,0.12), inset 0 0 32px 0 rgba(0,10,24,0.6)',
            background: '#070D1A',
          }}
        >

          {/* ── Browser chrome ── */}
          <div ref={headerRef} className="flex items-center gap-2 px-3 py-1.5 bg-[#0D1627] border-b border-white/[0.07]">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/70" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
            </div>
            <div className="flex-1 mx-2 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.05] flex items-center gap-1.5">
              <Globe2 className="w-2 h-2 text-white/25 shrink-0" />
              <span className="text-[8px] font-mono text-white/30">app.rozper.com/ucaas</span>
            </div>
            <div className="flex items-center gap-1">
              <span ref={liveDotRef} className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[8px] font-mono text-emerald-400">live</span>
            </div>
          </div>

          {/* ── App shell ── */}
          <div className="flex h-full">

            {/* Sidebar */}
            <div ref={navRef} className="w-10 bg-[#0B1220] border-r border-white/[0.06] flex flex-col items-center gap-2 py-3 shrink-0">
              {navIcons.map((Icon, i) => (
                <div
                  key={i}
                  className={`nav-icon w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${i === 0 ? 'bg-[#046BD2]/30 border border-[#046BD2]/40' : 'hover:bg-white/5'}`}
                >
                  <Icon className={`w-3 h-3 ${i === 0 ? 'text-[#0086F9]' : 'text-white/30'}`} strokeWidth={1.5} />
                </div>
              ))}
            </div>

            {/* Conversations list */}
            <div ref={rowsRef} className="w-[140px] border-r border-white/[0.06] flex flex-col shrink-0 overflow-hidden">
              {/* Search */}
              <div className="px-2 py-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
                  <Search className="w-2.5 h-2.5 text-white/25" />
                  <span className="text-[7px] font-mono text-white/25">Search…</span>
                </div>
              </div>
              {conversations.map((c, i) => (
                <div
                  key={i}
                  className={`conv-row px-2 py-1.5 border-b border-white/[0.04] flex flex-col gap-0.5 cursor-pointer hover:bg-white/[0.02] ${i === 0 ? 'bg-[#046BD2]/8' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-semibold text-white/80 truncate flex-1">{c.name}</span>
                    <span className="text-[6px] font-mono text-white/25 shrink-0 ml-1">{c.time}</span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[7px] text-white/35 truncate flex-1">{c.preview}</span>
                    <span className={`text-[6px] font-mono shrink-0 ${c.badgeColor}`}>{c.badge}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">

              {/* Active call header */}
              <div className="px-3 py-2 bg-[#046BD2]/8 border-b border-white/[0.06] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div ref={badgeRef} className="w-5 h-5 rounded-lg bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[7px] font-bold text-[#2D98F1]">PN</div>
                  <div>
                    <div className="text-[9px] font-semibold text-white">Priya Nair</div>
                    <div className="text-[7px] font-mono text-[#0086F9]">Inbound · Ext 101 · 4:21</div>
                  </div>
                </div>
                {/* Waveform */}
                <div ref={waveRef} className="flex items-end gap-[2px] h-5 mr-2">
                  {WAVE_BAR_HEIGHTS.map((h, i) => (
                    <div
                      key={i}
                      className="wave-bar w-[2px] rounded-sm bg-[#0086F9]"
                      style={{ height: h, transformOrigin: 'center bottom' }}
                    />
                  ))}
                </div>
              </div>

              {/* AI Summary panel */}
              <div className="px-3 py-2 border-b border-white/[0.05] shrink-0">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Bot className="w-3 h-3 text-[#0086F9]" />
                  <span className="text-[8px] font-mono text-[#0086F9] uppercase tracking-widest">AI Summary</span>
                  <span className="ml-auto text-[7px] font-mono text-white/25 animate-pulse">typing…</span>
                </div>
                <div ref={aiTextRef} className="space-y-1">
                  {aiInsights.map((line, i) => (
                    <div
                      key={i}
                      className="ai-line text-[8px] text-white/60 font-mono leading-relaxed"
                      data-text={line}
                    />
                  ))}
                </div>
              </div>

              {/* Sentiment bar */}
              <div className="px-3 py-2 border-b border-white/[0.05] shrink-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[7px] font-mono text-white/35 uppercase tracking-widest">Sentiment</span>
                  <span className="text-[7px] font-mono text-emerald-400">Positive 87%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] relative overflow-hidden">
                  <div ref={barRef} className="h-full rounded-full bg-gradient-to-r from-[#046BD2] to-emerald-400 relative" style={{ width: '0%' }}>
                    <div ref={shimRef} className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full opacity-0" />
                  </div>
                </div>
              </div>

              {/* Feature cards */}
              <div ref={cardsRef} className="flex-1 p-2 grid grid-cols-2 gap-1.5 content-start overflow-hidden">
                {featureCards.map((f, i) => (
                  <div
                    key={i}
                    className={`feat-card p-2 rounded-xl bg-gradient-to-br ${f.color} border border-white/[0.07] flex items-center gap-2 opacity-0`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#046BD2]/20 border border-[#046BD2]/25 flex items-center justify-center shrink-0">
                      <f.icon className="w-3 h-3 text-[#0086F9]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[8px] font-semibold text-white">{f.label}</div>
                      <div className="text-[7px] text-white/40">{f.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right context panel */}
            <div ref={panelRef} className="w-[90px] border-l border-white/[0.06] flex flex-col gap-2 py-2 px-2 bg-[#0B1220] shrink-0 overflow-hidden opacity-0">
              <div className="text-[7px] font-mono text-white/30 uppercase tracking-widest">Contact</div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-8 h-8 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[9px] font-bold text-[#2D98F1]">PN</div>
                <div className="text-[7px] font-semibold text-white text-center">Priya Nair</div>
                <div className="text-[6px] text-white/35 text-center">Enterprise · Tier 1</div>
              </div>
              <div className="space-y-1">
                {[['Calls', '47'], ['Resolved', '91%'], ['CSAT', '4.8']].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between">
                    <span className="text-[6px] font-mono text-white/30">{k}</span>
                    <span className="text-[7px] font-mono text-[#0086F9]">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto text-[7px] font-mono text-white/20 uppercase tracking-widest">24/7 AI</div>
              <div className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-[#046BD2]/10 border border-[#046BD2]/20">
                <Bot className="w-2.5 h-2.5 text-[#0086F9] shrink-0" />
                <span className="text-[6px] text-[#2D98F1]">Active</span>
              </div>
            </div>

          </div>{/* /app shell */}
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

      {/* ══ BASE / keyboard deck ══ */}
      <div
        className="w-full max-w-[556px] flex flex-col items-center justify-center"
        style={{
          height: 24,
          borderRadius: '0 0 10px 10px',
          background: 'linear-gradient(180deg, #0c1522 0%, #080e18 100%)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 14px 36px -6px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Trackpad */}
        <div
          className="w-16 h-[8px] rounded-[4px]"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
          }}
        />
      </div>

      {/* Desk reflection */}
      <div className="w-3/4 h-2 mt-1 rounded-full bg-black/40 blur-lg" />
    </div>
  )
}
