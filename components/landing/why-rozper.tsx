"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import {
  Sparkles,
  Phone,
  PhoneCall,
  PhoneOff,
  TrendingUp,
  Brain,
  Mic,
  ArrowRight,
} from "lucide-react"

const pillars = [
  {
    icon: Brain,
    title: "Intent-aware ranking",
    body: "Studies every interaction your team has had — surfaces the next best call.",
  },
  {
    icon: Mic,
    title: "Live coaching whisper",
    body: "Real-time hints in the rep's ear. No managers required.",
  },
  {
    icon: TrendingUp,
    title: "Auto-skip dead air",
    body: "Voicemails, busy signals, dropped lines — all bypassed automatically.",
  },
]

const liveCalls = [
  { name: "Daniel Pierce", number: "+1 (415) 555-0142", status: "live", score: 92 },
  { name: "Amelia Chen", number: "+44 20 7946 0398", status: "live", score: 87 },
  { name: "Marco Rossi", number: "+39 06 9480 1122", status: "queued", score: 64 },
  { name: "Priya Shah", number: "+91 22 6140 9221", status: "queued", score: 58 },
]

export function WhyRozper() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [seconds, setSeconds] = useState(42)
  const [score, setScore] = useState(86)
  const [activePillar, setActivePillar] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    const s = setInterval(() => setScore(70 + Math.floor(Math.random() * 25)), 1400)
    const p = setInterval(() => setActivePillar((i) => (i + 1) % pillars.length), 3200)
    return () => {
      clearInterval(t)
      clearInterval(s)
      clearInterval(p)
    }
  }, [])

  const fmtTime = (n: number) =>
    `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 overflow-hidden bg-[#070B14]"
    >
      {/* background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(4,107,210,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(34,211,238,0.10) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ───── Copy ───── */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/70">
                AI Dialer · in production
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]"
            >
              Talk to the{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                right lead
              </span>{" "}
              first.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-[#9AA8BC] leading-relaxed max-w-md"
            >
              Reps spend their day on warm conversations instead of dial tones.
              Pipeline moves faster — without scaling headcount.
            </motion.p>

            {/* Animated pillar list */}
            <div className="mt-10 space-y-2">
              {pillars.map((p, i) => {
                const isActive = i === activePillar
                return (
                  <motion.button
                    key={p.title}
                    onClick={() => setActivePillar(i)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className={`relative w-full text-left flex gap-4 p-4 rounded-2xl border transition-colors ${
                      isActive
                        ? "border-[#046BD2]/30 bg-[#046BD2]/[0.06]"
                        : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="why-pillar-glow"
                        className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#046BD2]/30 via-[#22D3EE]/20 to-transparent -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span
                      className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-gradient-to-br from-[#046BD2] to-[#22D3EE] text-white"
                          : "bg-white/[0.04] text-white/60"
                      }`}
                    >
                      <p.icon className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div
                        className={`text-sm font-semibold ${
                          isActive ? "text-white" : "text-white/80"
                        }`}
                      >
                        {p.title}
                      </div>
                      <div className="mt-0.5 text-xs text-[#9AA8BC] leading-relaxed">
                        {p.body}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ x: 2 }}
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold text-sm shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition-colors"
            >
              <Phone className="w-4 h-4" />
              Book a live demo
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* ───── Visual: Dialer console ───── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div
              className="absolute -inset-10 rounded-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(4,107,210,0.4) 0%, transparent 60%)",
                filter: "blur(60px)",
              }}
            />

            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/40 to-transparent shadow-[0_0_80px_-20px_rgba(4,107,210,0.6)]">
              <div className="relative rounded-3xl bg-[#0A1020]/85 backdrop-blur-2xl overflow-hidden">
                {/* Header bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    </div>
                    <span className="ml-3 text-[11px] uppercase tracking-[0.18em] text-white/40 font-mono">
                      rozper · ai dialer
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="hidden sm:inline text-white/40">Q2 OUTBOUND · ENTERPRISE</span>
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      LIVE
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-px bg-white/5">
                  {/* Left: queue */}
                  <div className="sm:col-span-2 bg-[#0A1020] p-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono mb-3 flex items-center justify-between">
                      <span>Lead queue</span>
                      <span className="text-[#22D3EE]">ranked by intent</span>
                    </div>
                    <div className="space-y-1.5">
                      {liveCalls.map((c, i) => (
                        <motion.div
                          key={c.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-colors ${
                            c.status === "live"
                              ? "border-[#046BD2]/30 bg-[#046BD2]/[0.08]"
                              : "border-white/5 bg-white/[0.02]"
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              c.status === "live"
                                ? "bg-gradient-to-br from-[#046BD2] to-[#22D3EE]"
                                : "bg-white/[0.05]"
                            }`}
                          >
                            <Phone
                              className={`w-3 h-3 ${
                                c.status === "live" ? "text-white" : "text-white/50"
                              }`}
                            />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium text-white truncate">
                              {c.name}
                            </div>
                            <div className="text-[10px] text-white/40 truncate font-mono">
                              {c.number}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div
                              className={`text-[11px] font-semibold tabular-nums ${
                                c.score > 80
                                  ? "text-emerald-400"
                                  : c.score > 65
                                    ? "text-[#22D3EE]"
                                    : "text-white/50"
                              }`}
                            >
                              {c.score}
                            </div>
                            <div className="text-[8px] uppercase tracking-wider text-white/30 font-mono">
                              intent
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: active call + insights */}
                  <div className="sm:col-span-3 bg-[#0A1020] p-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono mb-3">
                      On call
                    </div>

                    <div className="rounded-2xl p-4 bg-gradient-to-br from-[#046BD2]/10 to-transparent border border-[#046BD2]/30">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center">
                            <PhoneCall className="w-4 h-4 text-white" />
                          </div>
                          <span className="absolute inset-0 rounded-full border-2 border-[#22D3EE] animate-ping opacity-60" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-white truncate">
                            Theodore Liam · Acme Corp
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-mono mt-0.5">
                            <span className="text-[#22D3EE]">connected</span>
                            <span className="text-white/30">·</span>
                            <span className="text-white/60 tabular-nums">
                              {fmtTime(seconds)}
                            </span>
                          </div>
                        </div>
                        <button className="w-9 h-9 rounded-full bg-red-500/90 hover:bg-red-500 flex items-center justify-center transition-colors shrink-0">
                          <PhoneOff className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      {/* Waveform */}
                      <div className="mt-4 flex items-center gap-1 h-10">
                        {Array.from({ length: 40 }).map((_, i) => (
                          <motion.span
                            key={i}
                            className="flex-1 rounded-full bg-gradient-to-t from-[#046BD2]/40 to-[#22D3EE]"
                            animate={{
                              height: [
                                `${10 + Math.random() * 8}%`,
                                `${20 + Math.random() * 70}%`,
                                `${10 + Math.random() * 8}%`,
                              ],
                            }}
                            transition={{
                              duration: 0.7 + Math.random() * 0.6,
                              repeat: Infinity,
                              delay: i * 0.025,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* AI assist whisper */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePillar}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                        className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                      >
                        <div className="w-6 h-6 rounded-md bg-[#22D3EE]/15 flex items-center justify-center shrink-0">
                          <Brain className="w-3 h-3 text-[#22D3EE]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] uppercase tracking-widest font-mono text-[#22D3EE]">
                            AI · live whisper
                          </div>
                          <div className="text-xs text-white/85 mt-0.5">
                            {pillars[activePillar].body}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* KPIs */}
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <KpiTile label="Score" value={`${score}`} accent />
                      <KpiTile label="Sentiment" value="+88%" />
                      <KpiTile label="Talk:listen" value="38:62" />
                    </div>
                  </div>
                </div>

                {/* footer ribbon */}
                <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/5 text-[11px] font-mono text-white/40">
                  <span>4 reps · 2 live · 12 queued</span>
                  <span className="text-emerald-400">+38% connect rate</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -bottom-6 -right-2 sm:-right-6 px-4 py-3 rounded-2xl bg-[#0A1020]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(4,107,210,0.6)]"
            >
              <div className="text-[10px] uppercase tracking-widest font-mono text-white/40">
                vs. manual dial
              </div>
              <div className="font-display text-2xl font-bold bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
                +38% connects
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function KpiTile({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-xl px-3 py-2 border ${
        accent
          ? "border-[#046BD2]/30 bg-[#046BD2]/10"
          : "border-white/5 bg-white/[0.02]"
      }`}
    >
      <div className="text-[10px] uppercase tracking-wider font-mono text-white/40">
        {label}
      </div>
      <div className="text-sm font-semibold text-white tabular-nums">{value}</div>
    </div>
  )
}
