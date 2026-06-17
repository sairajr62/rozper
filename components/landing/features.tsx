"use client"

import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"
import {
  Wifi,
  Phone,
  LayoutGrid,
  Headphones,
  Bot,
  ArrowRight,
  Check,
} from "lucide-react"

const layers = [
  {
    index: 5,
    id: "ai",
    icon: Bot,
    label: "AI Layer",
    sublabel: "Intelligence",
    description:
      "Receptionist, agent assist, transcription, conversation intelligence.",
    pills: ["AI Receptionist", "Agent Assist", "Transcription", "Conv. IQ"],
    accent: "from-[#22D3EE] to-[#046BD2]",
    border: "border-[#22D3EE]/30",
    glow: "rgba(34,211,238,0.25)",
  },
  {
    index: 4,
    id: "cc",
    icon: Headphones,
    label: "Contact Center Layer",
    sublabel: "Engagement",
    description:
      "Omnichannel inbox, dialers, routing, supervisor tools.",
    pills: ["Omnichannel", "Dialers", "Routing", "Supervisor"],
    accent: "from-[#0086F9] to-[#2575FC]",
    border: "border-[#0086F9]/30",
    glow: "rgba(0,134,249,0.25)",
  },
  {
    index: 3,
    id: "ucaas",
    icon: LayoutGrid,
    label: "UCaaS Layer",
    sublabel: "Productivity",
    description:
      "Calling, video, team chat, SMS, voicemail, IVR — unified for every seat.",
    pills: ["Calling", "Video", "SMS", "Team Chat", "IVR"],
    accent: "from-[#046BD2] to-[#0078E0]",
    border: "border-[#046BD2]/30",
    glow: "rgba(4,107,210,0.25)",
  },
  {
    index: 2,
    id: "voice",
    icon: Phone,
    label: "Voice & Number Layer",
    sublabel: "Connectivity",
    description:
      "SIP trunking, toll-free, DIDs, and number porting.",
    pills: ["SIP Trunking", "Toll-Free", "DIDs", "Porting"],
    accent: "from-[#2575FC] to-[#046BD2]",
    border: "border-[#2575FC]/30",
    glow: "rgba(37,117,252,0.22)",
  },
  {
    index: 1,
    id: "carrier",
    icon: Wifi,
    label: "Carrier Network Layer",
    sublabel: "Foundation",
    description:
      "99.99% uptime, A-Z termination, redundant routing across 150+ countries.",
    pills: ["99.99% Uptime", "A-Z Termination", "150+ Countries", "Redundant Routing"],
    accent: "from-[#046BD2] to-[#0086F9]",
    border: "border-[#046BD2]/40",
    glow: "rgba(4,107,210,0.30)",
  },
]

function LayerRow({
  layer,
  isActive,
  onClick,
  index,
  isInView,
}: {
  layer: (typeof layers)[number]
  isActive: boolean
  onClick: () => void
  index: number
  isInView: boolean
}) {
  const Icon = layer.icon
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full text-left group transition-all duration-300 ${
        isActive ? "z-10" : "hover:z-10"
      }`}
    >
      {/* Active glow behind */}
      {isActive && (
        <motion.div
          layoutId="layer-glow"
          className="absolute -inset-px rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${layer.glow} 0%, transparent 60%)`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <div
        className={`relative flex items-center gap-4 px-4 sm:px-5 py-3.5 rounded-2xl border transition-all duration-300 ${
          isActive
            ? `${layer.border} bg-[#0A1020]/90`
            : "border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
        }`}
      >
        {/* Layer number */}
        <span
          className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold transition-colors ${
            isActive
              ? `bg-gradient-to-br ${layer.accent} text-white`
              : "bg-white/[0.04] text-white/30"
          }`}
        >
          {layer.index}
        </span>

        {/* Icon */}
        <span
          className={`shrink-0 transition-colors ${
            isActive ? "text-white" : "text-white/40"
          }`}
        >
          <Icon className="w-4 h-4" />
        </span>

        {/* Label */}
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm font-semibold transition-colors ${
              isActive ? "text-white" : "text-white/70"
            }`}
          >
            {layer.label}
          </div>
          <div className="text-[11px] text-white/40 font-mono">{layer.sublabel}</div>
        </div>

        {/* Arrow */}
        <ArrowRight
          className={`w-4 h-4 shrink-0 transition-all ${
            isActive ? "text-[#22D3EE] opacity-100" : "text-white/20 opacity-0 group-hover:opacity-100"
          }`}
        />
      </div>
    </motion.button>
  )
}

const DURATION_S = 4 // auto-cycle duration per layer

export function Features() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  // Forward-only cycle starting at Layer 5 / AI / Intelligence (top of the
  // left list, index 0) and advancing top → bottom: 5 → 4 → 3 → 2 → 1, then
  // looping back to 5. At any given moment, only the active layer's
  // sub-label segment in the progress bar glows.
  const [activeIdx, setActiveIdx] = useState(0)
  const paused = useRef(false)
  const progress = useMotionValue(0)
  const widthPct = useTransform(
    progress,
    (p) => `${Math.max(0, Math.min(100, p * 100))}%`,
  )

  // auto-cycle: progress advances each frame; reaching 1 → next layer.
  // We reset `progress` IMMEDIATELY inside this same callback (rather than
  // relying on the [activeIdx] useEffect below) — otherwise multiple
  // animation frames can fire with `progress >= 1` before React has
  // processed the state update, each queuing another setActiveIdx and
  // making the cycle skip layers (e.g. 5 → 3 → 1 → 4 instead of 5 → 4).
  useAnimationFrame((_, delta) => {
    if (paused.current || !isInView) return
    const cur = progress.get()
    if (cur >= 1) {
      progress.set(0)
      setActiveIdx((i) => (i + 1) % layers.length)
      return
    }
    progress.set(cur + delta / (DURATION_S * 1000))
  })

  // reset progress whenever activeIdx changes (auto-advance or click)
  useEffect(() => {
    progress.set(0)
  }, [activeIdx, progress])

  const select = (i: number) => {
    paused.current = true
    setActiveIdx(i)
    // Resume auto-cycle after a short delay when selected via touch/click
    setTimeout(() => {
      paused.current = false
    }, DURATION_S * 1000)
  }

  const active = layers[activeIdx]
  const ActiveIcon = active.icon

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-[#070B14]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] sm:w-[1100px] sm:h-[700px] rounded-full opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(4,107,210,0.35) 0%, rgba(34,211,238,0.08) 45%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-mono text-white/50">
            <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#0086F9]" />
            The Platform
            <span className="w-6 h-px bg-gradient-to-l from-transparent to-[#0086F9]" />
          </div>
          <h2 className="font-display mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]">
            One platform.{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
              One bill.
            </span>{" "}
            One team behind it.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#9AA8BC] leading-relaxed max-w-2xl mx-auto">
            Rozper unifies five communication layers most businesses pay for
            separately — on a single carrier-grade network. No more vendor sprawl.
            No more finger-pointing when something breaks.
          </p>
        </motion.div>

        {/* Two-column: layer list left, detail right */}
        {/* Fix #1: Added grid-cols-1 for mobile, explicit ordering so detail panel
            appears first on mobile (order-first), layer list second (order-last).
            On lg+ the natural document order is restored via lg:order-none.
            Fix #8: replaced mouse-only pause handlers with touch-friendly
            onPointerEnter / onPointerLeave so touch devices can also pause. */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
          onPointerEnter={() => {
            paused.current = true
          }}
          onPointerLeave={() => {
            paused.current = false
          }}
        >
          {/* Left: layer stack — shown below detail panel on mobile, left on lg+ */}
          <div className="order-last lg:order-none lg:col-span-5 flex flex-col gap-2">
            {layers.map((layer, i) => (
              <LayerRow
                key={layer.id}
                layer={layer}
                isActive={activeIdx === i}
                onClick={() => select(i)}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Right: detail panel — shown first on mobile, right on lg+ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-first lg:order-none lg:col-span-7 relative overflow-hidden"
          >
            {/* Fix #7: glow div clipped to parent via overflow-hidden on the
                relative container above; reduced inset to -inset-4 on mobile
                to avoid triggering horizontal scroll on narrow viewports. */}
            <div
              className="absolute -inset-4 sm:-inset-8 rounded-3xl pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 30%, ${active.glow} 0%, transparent 60%)`,
                filter: "blur(50px)",
                transition: "background 0.5s ease",
              }}
            />

            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/30 to-transparent shadow-[0_0_80px_-20px_rgba(4,107,210,0.5)]">
              <div className="rounded-3xl bg-[#0A1020]/90 backdrop-blur-2xl overflow-hidden">
                {/* header bar */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <span className="ml-3 text-[11px] uppercase tracking-[0.18em] text-white/35 font-mono truncate">
                    rozper · platform architecture
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="p-5 sm:p-8"
                  >
                    {/* Layer identity */}
                    {/* Fix #2: Added flex-wrap so the row can wrap on very
                        narrow screens (< 360px). */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      {/* Fix #3: Reduced icon from w-14 h-14 to w-10 h-10 on
                          mobile; restored to w-14 h-14 on sm+. */}
                      <div
                        className={`w-10 h-10 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br ${active.accent} flex items-center justify-center shadow-[0_0_30px_-5px_rgba(4,107,210,0.6)]`}
                      >
                        <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
                          Layer {active.index} of 5
                        </div>
                        {/* Fix #4: Added text-xl base size for very small screens,
                            then text-2xl at sm, text-3xl at md+. */}
                        <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight mt-0.5">
                          {active.label}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-5 text-base text-[#9AA8BC] leading-relaxed">
                      {active.description}
                    </p>

                    {/* Pills */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {active.pills.map((pill) => (
                        <motion.span
                          key={pill}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25 }}
                          className="inline-flex items-center gap-1.5 text-xs text-white/80 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04]"
                        >
                          <Check className="w-3 h-3 text-[#22D3EE] shrink-0" />
                          {pill}
                        </motion.span>
                      ))}
                    </div>

                    {/* Modern auto-cycle progress bar — flows in sync
                        with the left list, top-to-bottom */}
                    <div className="mt-8 pt-6 border-t border-white/5">
                      {/* Fix #5: Added min-w-0 and flex-wrap to prevent overflow
                          on very narrow screens (< 320px). */}
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-y-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-[0.18em] font-mono text-white/35">
                          Platform stack
                        </span>
                        <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-mono text-white/45">
                          <span className="relative flex h-1.5 w-1.5 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
                          </span>
                          <span className="tabular-nums">
                            auto · {active.index} / {layers.length}
                          </span>
                        </span>
                      </div>
                      {/* Fix #10: Increased tap target height for progress bar
                          segment buttons — added py-2 padding around the 3px
                          visible bar so touch users can hit them more easily. */}
                      <div className="flex gap-1.5">
                        {layers.map((l, i) => {
                          const isActive = i === activeIdx
                          return (
                            <button
                              key={l.id}
                              onClick={() => select(i)}
                              title={l.label}
                              className="group flex-1 py-2"
                              aria-label={l.label}
                            >
                              <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.06] transition-colors group-hover:bg-white/[0.12]">
                                {/* Only the active segment glows — every
                                    other segment stays as the dim track. */}
                                {isActive && (
                                  <motion.div
                                    className={`h-full rounded-full bg-gradient-to-r ${l.accent} shadow-[0_0_10px_-2px_rgba(34,211,238,0.7)]`}
                                    style={{ width: widthPct }}
                                  />
                                )}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                      {/* Fix #6: Show sub-labels on all screen sizes (removed
                          hidden/sm:flex so mobile users can also see them);
                          kept truncate and text-[8px] to prevent overflow. */}
                      <div className="mt-2 flex gap-1.5">
                        {layers.map((l, i) => {
                          const isActive = i === activeIdx
                          return (
                            <span
                              key={l.id}
                              className={`flex-1 truncate text-center font-mono text-[8px] uppercase tracking-wider transition-colors ${
                                isActive ? "text-[#22D3EE]" : "text-white/20"
                              }`}
                            >
                              <span className="tabular-nums">{l.index}</span>
                              <span className="hidden sm:inline"> · {l.sublabel}</span>
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Footer line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-5 text-sm text-white/45 text-center"
            >
              Pick one layer. Pick all five. Rozper scales with you either way.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
