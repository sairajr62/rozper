"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState } from "react"
import { TrendingDown, Users } from "lucide-react"

/**
 * Savings calculator — interactive seat slider. Re-computes annual cost on
 * each platform live. Uses flowing organic blobs and an asymmetric layout
 * so the section never reads as a boxed widget.
 */

type Comp = {
  id: string
  name: string
  annualPerSeat: number // already in $/seat/month, annual-commit rate
  accent: string
}

const ROZPER_PER_SEAT_MONTH = 15.99
const competitors: Comp[] = [
  { id: "ringcentral", name: "RingCentral Core", annualPerSeat: 20, accent: "249,115,22" },
  { id: "8x8", name: "8x8 X2", annualPerSeat: 24, accent: "168,85,247" },
  { id: "vonage", name: "Vonage Premium", annualPerSeat: 29.99, accent: "34,197,94" },
  { id: "twilio", name: "Twilio Flex (named)", annualPerSeat: 150, accent: "239,68,68" },
]

export function SavingsCalculator() {
  const [seats, setSeats] = useState(25)

  const rozperAnnual = seats * ROZPER_PER_SEAT_MONTH * 12

  // Compute total savings vs. an "average" of the four competitors
  const avgCompetitor =
    competitors.reduce((s, c) => s + c.annualPerSeat, 0) / competitors.length
  const avgAnnual = seats * avgCompetitor * 12
  const savings = avgAnnual - rozperAnnual

  return (
    <section
      id="savings"
      className="relative py-24 lg:py-32 bg-[#0B1220] overflow-hidden"
    >
      {/* Decorative blobs */}
      <motion.div
        aria-hidden
        className="absolute -z-10 -top-20 left-1/3 w-[700px] h-[700px] opacity-25"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 50%, rgba(34,211,238,0) 0deg, rgba(34,211,238,0.4) 90deg, rgba(4,107,210,0.3) 200deg, rgba(34,211,238,0) 360deg)",
          filter: "blur(90px)",
          borderRadius: "62% 38% 49% 51% / 53% 41% 59% 47%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: copy + slider */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
              <TrendingDown className="w-3 h-3" />
              Total cost · per year
            </div>
            <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.025em] leading-[1.05]">
              The bigger the team,{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
                the wider the gap.
              </span>
            </h2>
            <p className="mt-4 text-[#B8C4D4] text-sm sm:text-base font-light">
              Drag the slider to see how the annual bill scales on each
              platform. Pricing uses each vendor&rsquo;s published annual-commit
              rate (most-comparable tier).
            </p>

            {/* Seat slider */}
            <div className="mt-9">
              <div className="flex items-end justify-between mb-3">
                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
                  Team size
                </div>
                <div className="flex items-baseline gap-1 text-white">
                  <Users className="w-4 h-4 text-white/60" />
                  <span className="font-display text-3xl font-semibold tabular-nums">
                    {seats}
                  </span>
                  <span className="text-xs text-white/45 ml-1">seats</span>
                </div>
              </div>

              <FlowingSlider value={seats} onChange={setSeats} min={5} max={500} />

              <div className="mt-2 flex justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-white/35">
                <span>5</span>
                <span>50</span>
                <span>250</span>
                <span>500</span>
              </div>
            </div>

            {/* Headline savings */}
            <motion.div
              key={Math.round(savings / 100)} // re-trigger on big change
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 inline-block"
            >
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-300/90">
                Switching to Rozper saves
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <AnimatedDollars value={savings} />
                <span className="text-sm text-white/45">/ year</span>
              </div>
              <div className="mt-1 text-xs text-white/50 font-light">
                vs. the {competitors.length}-vendor average at {seats} seats
              </div>
            </motion.div>
          </div>

          {/* Right: visual stack of vendor bars (NOT a rectangular chart) */}
          <div className="lg:col-span-7">
            <div
              className="relative p-6 sm:p-8 lg:p-10 backdrop-blur-xl"
              style={{
                borderRadius: "44px 18px 44px 18px",
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(10,16,32,0.6) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-baseline justify-between mb-7">
                <div className="font-display text-lg font-semibold text-white tracking-[-0.01em]">
                  Annual bill at {seats} seats
                </div>
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-white/35">
                  USD · ex-tax
                </div>
              </div>

              <VendorBar
                name="Rozper Professional"
                accent="4,107,210"
                value={rozperAnnual}
                max={
                  Math.max(
                    ...competitors.map((c) => c.annualPerSeat * seats * 12),
                    rozperAnnual,
                  )
                }
                highlight
              />
              {competitors.map((c) => (
                <VendorBar
                  key={c.id}
                  name={c.name}
                  accent={c.accent}
                  value={c.annualPerSeat * seats * 12}
                  max={
                    Math.max(
                      ...competitors.map((x) => x.annualPerSeat * seats * 12),
                      rozperAnnual,
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── slider ─────────────────────────── */

function FlowingSlider({
  value,
  onChange,
  min,
  max,
}: {
  value: number
  onChange: (v: number) => void
  min: number
  max: number
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="relative h-9 flex items-center">
      {/* track */}
      <div
        className="absolute inset-x-0 h-2 rounded-full overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <motion.div
          className="h-full"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg, #046BD2 0%, #22D3EE 100%)",
            boxShadow: "0 0 20px rgba(34,211,238,0.5)",
          }}
          transition={{ type: "spring", stiffness: 240, damping: 30 }}
          animate={{ width: `${pct}%` }}
        />
      </div>
      {/* native input, transparent on top */}
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
        aria-label="Team size"
      />
      {/* thumb — squircle, not a circle */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ left: `calc(${pct}% - 12px)` }}
        transition={{ type: "spring", stiffness: 240, damping: 30 }}
      >
        <div
          className="w-6 h-6"
          style={{
            background:
              "linear-gradient(135deg, #ffffff 0%, #B8D6F5 100%)",
            borderRadius: "55% 45% 60% 40% / 50% 55% 45% 50%",
            boxShadow:
              "0 6px 24px -6px rgba(34,211,238,0.8), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        />
      </motion.div>
    </div>
  )
}

/* ─────────────────────────── bar ─────────────────────────── */

function VendorBar({
  name,
  accent,
  value,
  max,
  highlight = false,
}: {
  name: string
  accent: string
  value: number
  max: number
  highlight?: boolean
}) {
  const widthPct = Math.max(2, (value / max) * 100)

  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-baseline justify-between mb-2">
        <span
          className={`text-sm ${
            highlight ? "text-white font-semibold" : "text-white/65"
          }`}
        >
          {name}
        </span>
        <AnimatedDollars value={value} compact size="sm" />
      </div>
      <div
        className="relative h-6 overflow-hidden"
        style={{
          borderRadius: "20px 6px 20px 6px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <motion.div
          className="absolute inset-y-0 left-0"
          animate={{ width: `${widthPct}%` }}
          transition={{ type: "spring", stiffness: 240, damping: 30 }}
          style={{
            background: highlight
              ? "linear-gradient(90deg, #046BD2 0%, #22D3EE 100%)"
              : `linear-gradient(90deg, rgba(${accent},0.7) 0%, rgba(${accent},0.4) 100%)`,
            borderRadius: "20px 6px 20px 6px",
            boxShadow: highlight
              ? "0 0 30px rgba(34,211,238,0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
              : `inset 0 1px 0 rgba(255,255,255,0.1)`,
          }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────── animated $ counter ─────────────────────────── */

function AnimatedDollars({
  value,
  compact = false,
  size = "lg",
}: {
  value: number
  compact?: boolean
  size?: "sm" | "lg"
}) {
  const motionValue = useMotionValue(value)
  const display = useTransform(motionValue, (v) => {
    const safe = Math.max(0, v)
    if (compact && safe >= 10000) {
      return `$${(safe / 1000).toFixed(safe >= 100000 ? 0 : 1)}K`
    }
    return `$${Math.round(safe).toLocaleString()}`
  })
  const [text, setText] = useState<string>(`$${Math.round(value).toLocaleString()}`)

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    })
    const unsub = display.on("change", (v) => setText(String(v)))
    return () => {
      controls.stop()
      unsub()
    }
  }, [value, motionValue, display])

  return (
    <span
      className={`font-display tabular-nums font-semibold text-white ${
        size === "lg" ? "text-4xl sm:text-5xl" : "text-sm"
      }`}
    >
      {text}
    </span>
  )
}
