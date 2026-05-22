'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { Mic, Video, Monitor, MicOff, PhoneOff } from 'lucide-react'

gsap.registerPlugin(TextPlugin)

/* ─── Participants & per-speaker transcripts ─────────────────── */
const SPEAKERS = [
  {
    id: 'ML', name: 'Marcus', muted: false,
    bg: 'rgba(4,107,210,0.25)', ring: '#046BD2', text: '#2D98F1',
    tx: '...so the Q2 targets are looking strong, especially in the enterprise segment where we closed three new logos this week...',
  },
  {
    id: 'PN', name: 'Priya', muted: true,
    bg: 'rgba(124,58,237,0.25)', ring: '#7C3AED', text: '#A78BFA',
    tx: 'The APAC pipeline is heating up — we have 4 deals in final stage negotiation right now...',
  },
  {
    id: 'LH', name: 'Layla', muted: false,
    bg: 'rgba(8,145,178,0.25)', ring: '#0891B2', text: '#22D3EE',
    tx: 'From a product side, new AI features are driving a 40% increase in daily active usage...',
  },
  {
    id: 'JK', name: 'Jordan', muted: true,
    bg: 'rgba(5,150,105,0.25)', ring: '#059669', text: '#34D399',
    tx: 'Sales is fully aligned. We\'re pushing enterprise tier hard — conversion rate is up 28% QoQ...',
  },
  {
    id: 'DF', name: 'Diego', muted: false,
    bg: 'rgba(217,119,6,0.25)', ring: '#D97706', text: '#FCD34D',
    tx: 'Marketing campaigns are generating 3× more qualified leads since the rebrand launched...',
  },
  {
    id: 'ST', name: 'Sam', muted: false,
    bg: 'rgba(15,118,110,0.25)', ring: '#0F766E', text: '#2DD4BF',
    tx: 'Support CSAT is at 96% this quarter. Response times are down 60% thanks to the AI tools...',
  },
]

/* ─── Component ──────────────────────────────────────────────── */
export function TabletVideoHero() {
  const wrapRef      = useRef<HTMLDivElement>(null)
  const headerRef    = useRef<HTMLDivElement>(null)
  const controlsRef  = useRef<HTMLDivElement>(null)
  const txRef        = useRef<HTMLDivElement>(null)
  const speakerRef   = useRef<HTMLSpanElement>(null)
  const txTextRef    = useRef<HTMLSpanElement>(null)
  const recDotRef    = useRef<HTMLDivElement>(null)
  const tileRefs     = useRef<(HTMLDivElement | null)[]>([])
  const waveRefs     = useRef<(HTMLDivElement | null)[]>([])
  const glowRefs     = useRef<(HTMLDivElement | null)[]>([])
  const muteRefs     = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Entrance timeline ── */
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.from(headerRef.current,  { y: -40, opacity: 0, duration: 0.55 }, 0)
      tl.from(controlsRef.current, { y: 30, opacity: 0, duration: 0.5 }, 0.2)
      tl.from(txRef.current, { opacity: 0, y: 12, duration: 0.5 }, 0.35)

      tl.from(
        tileRefs.current.filter(Boolean),
        { scale: 0.82, opacity: 0, stagger: 0.08, duration: 0.55, ease: 'back.out(1.3)' },
        0.15,
      )

      /* ── REC dot blink ── */
      if (recDotRef.current) {
        gsap.to(recDotRef.current, {
          opacity: 0.2, duration: 0.65, repeat: -1, yoyo: true, ease: 'sine.inOut'
        })
      }

      /* ── Speaker cycling ── */
      let current = 0

      function activateSpeaker(idx: number) {
        const spk = SPEAKERS[idx]

        // Muted speakers (indices 1=Priya, 3=Jordan): hide mic icon when they speak, show otherwise
        const mutedIndices = [1, 3]
        mutedIndices.forEach(mi => {
          const el = muteRefs.current[mi]
          if (!el) return
          if (mi === idx) {
            // It's their turn — hide the mute icon
            gsap.to(el, { opacity: 0, scale: 0.5, duration: 0.25, ease: 'back.in(1.5)' })
          } else {
            // Not their turn — restore the mute icon
            gsap.to(el, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' })
          }
        })

        // Deactivate all tiles
        glowRefs.current.forEach((g, i) => {
          if (g) gsap.to(g, { opacity: 0, duration: 0.3 })
          if (waveRefs.current[i]) gsap.to(waveRefs.current[i], { opacity: 0, duration: 0.25 })
        })

        // Activate current tile
        if (glowRefs.current[idx]) {
          gsap.to(glowRefs.current[idx], { opacity: 1, duration: 0.45 })
        }
        if (waveRefs.current[idx]) {
          gsap.to(waveRefs.current[idx], { opacity: 1, duration: 0.3 })
          // Animate individual wave bars
          waveRefs.current[idx]?.querySelectorAll<HTMLElement>('.w-bar').forEach((bar, i) => {
            gsap.to(bar, {
              scaleY: () => 0.15 + Math.random() * 0.85,
              duration: 0.28 + (i % 3) * 0.12,
              repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.05,
            })
          })
        }

        // Update transcript
        if (speakerRef.current) {
          gsap.to(speakerRef.current, {
            opacity: 0, duration: 0.18,
            onComplete: () => {
              if (speakerRef.current) {
                speakerRef.current.textContent = spk.name + ':'
                speakerRef.current.style.color = spk.text
              }
              gsap.to(speakerRef.current, { opacity: 1, duration: 0.18 })
            }
          })
        }
        if (txTextRef.current) {
          gsap.to(txTextRef.current, {
            opacity: 0, duration: 0.15,
            onComplete: () => {
              if (txTextRef.current) {
                txTextRef.current.textContent = ''
                gsap.to(txTextRef.current, { opacity: 1, duration: 0.2 })
                gsap.to(txTextRef.current, {
                  text: { value: `"${spk.tx}"`, delimiter: '' },
                  duration: spk.tx.length / 35,
                  ease: 'none',
                })
              }
            }
          })
        }

        // Schedule next
        gsap.delayedCall(3.5, () => {
          current = (current + 1) % SPEAKERS.length
          activateSpeaker(current)
        })
      }

      // Start after entrance
      gsap.delayedCall(0.9, () => activateSpeaker(0))

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

          {/* ── Meeting header ── */}
          <div
            ref={headerRef}
            className="flex items-center justify-between px-3 shrink-0"
            style={{ height: 28, background: '#0D1627', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-2">
              <Video className="w-3 h-3 text-[#0086F9]" />
              <span className="text-[8.5px] font-mono text-white/55">Q2 All-Hands · 6 participants</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-mono text-white/25">28:41</span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-400/10 border border-red-400/20">
                <div ref={recDotRef} className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-[8px] font-mono text-red-400">REC</span>
              </div>
            </div>
          </div>

          {/* ── Tile grid (3×2) ── */}
          <div
            className="grid shrink-0"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 4,
              padding: '5px 6px 4px 6px',
              height: 198,
            }}
          >
            {SPEAKERS.map((spk, i) => (
              <div
                key={spk.id}
                ref={el => { tileRefs.current[i] = el }}
                className="relative rounded-[9px] flex flex-col items-center justify-center overflow-hidden"
                style={{ background: '#0B1523' }}
              >
                {/* Active glow border overlay */}
                <div
                  ref={el => { glowRefs.current[i] = el }}
                  className="absolute inset-0 rounded-[9px] opacity-0 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1.5px ${spk.ring}, 0 0 12px 0 ${spk.ring}55`,
                  }}
                />

                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 relative z-10"
                  style={{ background: spk.bg, border: `1.5px solid ${spk.ring}55`, color: spk.text }}
                >
                  {spk.id}
                </div>
                <div className="text-[7.5px] font-mono text-white/40 relative z-10">{spk.name}</div>

                {/* Muted badge */}
                {spk.muted && (
                  <div
                    ref={el => { muteRefs.current[i] = el }}
                    className="absolute top-1.5 right-1.5 z-10"
                  >
                    <MicOff className="w-2.5 h-2.5 text-red-400" />
                  </div>
                )}

                {/* Audio waveform (active speaker) */}
                <div
                  ref={el => { waveRefs.current[i] = el }}
                  className="absolute bottom-1.5 left-2 flex items-end gap-[2px] opacity-0"
                  style={{ height: 10 }}
                >
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div
                      key={j}
                      className="w-bar rounded-full"
                      style={{
                        width: 2,
                        height: '60%',
                        background: spk.ring,
                        transformOrigin: 'bottom',
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── AI Transcript ── */}
          <div
            ref={txRef}
            className="shrink-0 mx-[6px] rounded-[8px] overflow-hidden"
            style={{
              height: 54,
              background: 'rgba(11,18,35,0.95)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '6px 8px 5px',
            }}
          >
            <div className="text-[7px] font-mono text-[#0086F9]/55 uppercase tracking-[0.18em] mb-1">
              AI Transcript · Live
            </div>
            <p className="text-[8.5px] text-white/65 leading-snug">
              <span ref={speakerRef} className="font-semibold mr-1" style={{ color: '#2D98F1' }}>Marcus:</span>
              <span ref={txTextRef} className="text-white/60" />
            </p>
          </div>

          {/* ── Controls bar ── */}
          <div
            ref={controlsRef}
            className="flex items-center justify-center gap-3 shrink-0"
            style={{
              flex: 1,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              background: '#0D1627',
            }}
          >
            {/* Mic */}
            <div className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <Mic className="w-3 h-3 text-white/60" />
            </div>
            {/* Video */}
            <div className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <Video className="w-3 h-3 text-white/60" />
            </div>
            {/* Screen share */}
            <div className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <Monitor className="w-3 h-3 text-white/60" />
            </div>
            {/* End call */}
            <div className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: 'rgba(239,68,68,0.85)', boxShadow: '0 0 10px rgba(239,68,68,0.3)' }}>
              <PhoneOff className="w-3 h-3 text-white" />
            </div>
          </div>

        </div>{/* /screen */}

        {/* Home bar — bottom bezel */}
        <div
          className="absolute bottom-[3px] left-1/2 -translate-x-1/2"
          style={{
            width: 60, height: 3, borderRadius: 3,
            background: 'rgba(255,255,255,0.12)',
          }}
        />
      </div>{/* /tablet body */}

      {/* Desk shadow */}
      <div className="w-4/5 h-3 mt-1 rounded-full bg-black/50 blur-xl" />
    </div>
  )
}
