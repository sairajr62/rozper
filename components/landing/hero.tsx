"use client"

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion"
import {
  ArrowRight,
  Play,
  Sparkles,
  Globe2,
  ShieldCheck,
  Waves,
  Bot,
  User,
  BarChart2,
  Zap,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

const trustLogos = [
  { name: "Tigo", src: "/images/logos/Tigo-partner.png" },
  { name: "T-Mobile", src: "/images/logos/TM.png" },
  { name: "China Mobile International", src: "/images/logos/china-mobile-partner.png" },
  { name: "PLDT", src: "/images/logos/PLDT.png" },
  { name: "Telekom Slovenije", src: "/images/logos/Telekom-Slovenije-partner.png" },
  { name: "Telin", src: "/images/logos/p6.webp" },
  { name: "MTT", src: "/images/logos/MTT-1.webp" },
  { name: "Reliance Communications", src: "/images/logos/Relience.png" },
]

const liveCalls = [
  { from: "London", to: "New York", agent: "Maya", sentiment: 0.92 },
  { from: "Tokyo", to: "Berlin", agent: "Elias", sentiment: 0.78 },
  { from: "Dubai", to: "São Paulo", agent: "Priya", sentiment: 0.85 },
  { from: "Sydney", to: "Toronto", agent: "Jonas", sentiment: 0.71 },
]

const transcriptLines = [
  { role: "user", text: "Hi, I need to upgrade my plan to enterprise.", delay: 0 },
  { role: "ai", text: "Absolutely! I can help with that. Let me pull up your account…", delay: 0.5 },
  { role: "user", text: "Also, do you support calls in Southeast Asia?", delay: 1.0 },
  { role: "ai", text: "Yes — we cover 42 regions including SG, TH, PH & ID with <30ms latency.", delay: 1.5 },
]

const sentimentSteps = [72, 78, 83, 88, 91, 95]

// ──────────────────────────────────────────────────────────────────────
// Background — animated conic mesh + grid + parallax orb
// ──────────────────────────────────────────────────────────────────────
function MeshBackground({
  parallaxX,
  parallaxY,
}: {
  parallaxX: any
  parallaxY: any
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-[#070B14]" />

      {/* fine grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(120, 160, 220, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120, 160, 220, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)",
        }}
      />

      {/* slow-rotating conic gradient */}
      <motion.div
        className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] rounded-full opacity-60"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, rgba(4,107,210,0) 0deg, rgba(4,107,210,0.35) 60deg, rgba(0,134,249,0.15) 140deg, rgba(34,211,238,0.25) 220deg, rgba(4,107,210,0) 360deg)",
          filter: "blur(80px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* parallax orb (mouse-follow) */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(4,107,210,0.45) 0%, rgba(4,107,210,0) 65%)",
          filter: "blur(60px)",
          x: parallaxX,
          y: parallaxY,
        }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[8%] w-[420px] h-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(34,211,238,0) 65%)",
          filter: "blur(70px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* top fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#070B14] to-transparent" />
      {/* bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0B1220] to-transparent" />

      {/* SVG noise — film grain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hero-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Live status pill
// ──────────────────────────────────────────────────────────────────────
function LivePill() {
  const [count, setCount] = useState(2_412_034)
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 14) + 3), 1200)
    return () => clearInterval(id)
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-3.5 py-1.5 text-xs sm:text-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="text-white/90 font-medium tracking-wide">
        Live · {count.toLocaleString()} calls routed today
      </span>
      <span className="hidden sm:inline-flex items-center gap-1 text-white/50 border-l border-white/10 pl-2.5">
        <Sparkles className="w-3 h-3 text-[#0086F9]" />
        
      </span>
    </motion.div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Kinetic headline word
// ──────────────────────────────────────────────────────────────────────
function KineticWord({
  children,
  delay = 0,
  gradient = false,
}: {
  children: string
  delay?: number
  gradient?: boolean
}) {
  return (
    <motion.span
      className={
        gradient
          ? "inline-block bg-gradient-to-r from-[#2D98F1] via-[#0086F9] to-[#22D3EE] bg-clip-text text-transparent"
          : "inline-block text-white"
      }
      style={
        gradient
          ? { textShadow: "0 0 60px rgba(4,107,210,0.45)" }
          : undefined
      }
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  )
}

// ──────────────────────────────────────────────────────────────────────
// AI Voice Agent panel — the right-side visual
// ──────────────────────────────────────────────────────────────────────
function LiveOpsPanel({
  parallaxX,
  parallaxY,
}: {
  parallaxX: any
  parallaxY: any
}) {
  const [visibleLines, setVisibleLines] = useState(1)
  const [sentiment, setSentiment] = useState(sentimentSteps[0])
  const [callDuration, setCallDuration] = useState(0)
  const [latency, setLatency] = useState(24)

  useEffect(() => {
    const t1 = setInterval(() => {
      setVisibleLines((v) => (v < transcriptLines.length ? v + 1 : 1))
    }, 2800)
    const t2 = setInterval(() => {
      setSentiment((s) => {
        const idx = sentimentSteps.indexOf(s)
        return sentimentSteps[(idx + 1) % sentimentSteps.length]
      })
    }, 2800)
    const t3 = setInterval(() => setCallDuration((d) => d + 1), 1000)
    const t4 = setInterval(() => setLatency(18 + Math.floor(Math.random() * 14)), 1200)
    return () => {
      clearInterval(t1)
      clearInterval(t2)
      clearInterval(t3)
      clearInterval(t4)
    }
  }, [])

  const mins = String(Math.floor(callDuration / 60)).padStart(2, "0")
  const secs = String(callDuration % 60).padStart(2, "0")

  return (
    <motion.div
      className="relative w-full max-w-[560px] mx-auto"
      style={{ x: parallaxX, y: parallaxY }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ambient glow rings */}
      <div className="absolute -inset-6 sm:-inset-12 -z-10 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full border border-[#0086F9]/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] rounded-full border border-[#22D3EE]/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(4,107,210,0.35) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* card */}
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/40 to-transparent shadow-[0_0_80px_-20px_rgba(4,107,210,0.6)]">
        <div className="rounded-3xl bg-[#0A1020]/85 backdrop-blur-2xl overflow-hidden">

          {/* header */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              </div>
              <span className="ml-2 sm:ml-3 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/40 font-mono truncate">
                rozper · ai voice agent
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono text-white/40">{mins}:{secs}</span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-4">

            {/* agent identity row */}
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0A1020]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">Aria <span className="text-white/40 font-normal">· AI Support Agent</span></div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="w-[2px] rounded-full bg-[#0086F9]"
                      animate={{
                        height: [`${4 + Math.random() * 3}px`, `${7 + Math.random() * 16}px`, `${4 + Math.random() * 3}px`],
                        opacity: [0.35, 1, 0.35],
                      }}
                      transition={{ duration: 0.85 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.035 }}
                    />
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] text-white/40 font-mono uppercase tracking-wider mb-0.5">Sentiment</div>
                <div className="text-sm font-bold text-emerald-400 tabular-nums">+{sentiment}%</div>
              </div>
            </div>

            {/* live transcript */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-2.5 min-h-[130px]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">Live transcript</span>
                <span className="flex items-center gap-1 text-[10px] text-[#22D3EE] font-mono">
                  <span className="w-1 h-1 rounded-full bg-[#22D3EE] animate-pulse" />
                  streaming
                </span>
              </div>
              <AnimatePresence initial={false}>
                {transcriptLines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: line.role === "ai" ? -8 : 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`flex gap-2 items-start ${line.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${line.role === "ai" ? "bg-[#046BD2]/30" : "bg-white/10"}`}>
                      {line.role === "ai"
                        ? <Bot className="w-3 h-3 text-[#22D3EE]" />
                        : <User className="w-3 h-3 text-white/60" />}
                    </span>
                    <span className={`text-[11px] leading-relaxed px-2.5 py-1.5 rounded-lg max-w-[82%] ${line.role === "ai" ? "bg-[#046BD2]/15 text-white/80" : "bg-white/[0.06] text-white/70"}`}>
                      {line.text}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* stat grid */}
            <div className="grid grid-cols-3 gap-2">
              <StatTile
                icon={<Zap className="w-3.5 h-3.5" />}
                label="Latency"
                value={`${latency}ms`}
                accent
              />
              <StatTile
                icon={<Globe2 className="w-3.5 h-3.5" />}
                label="Regions"
                value="42"
              />
              <StatTile
                icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                label="Resolved"
                value="94%"
              />
            </div>

            {/* resolution confidence bar */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">Resolution confidence</span>
                <span className="text-[10px] font-mono text-[#22D3EE]">{sentiment}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#046BD2] to-[#22D3EE]"
                  animate={{ width: `${sentiment}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                {sentimentSteps.map((step) => (
                  <span key={step} className={`text-[9px] font-mono ${step <= sentiment ? "text-[#22D3EE]" : "text-white/20"}`}>
                    {step}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating chips */}
      <FloatingChip
        className="-top-3 left-2 sm:-top-6 sm:-left-10"
        icon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
        label="99.999%"
        sub="uptime SLA"
        delay={1.0}
      />
      <FloatingChip
        className="-bottom-3 right-2 sm:-bottom-4 sm:-right-8"
        icon={<BarChart2 className="w-3.5 h-3.5 text-[#22D3EE]" />}
        label="94%"
        sub="first call res."
        delay={1.2}
      />
      <FloatingChip
        className="top-1/2 -right-6 sm:-right-12 -translate-y-1/2 hidden md:flex"
        icon={<Waves className="w-3.5 h-3.5 text-[#0086F9]" />}
        label="<40ms"
        sub="median"
        delay={1.4}
      />
    </motion.div>
  )
}

function StatTile({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-xl border px-2.5 sm:px-3 py-2 sm:py-2.5 ${
        accent
          ? "border-[#046BD2]/30 bg-[#046BD2]/10"
          : "border-white/5 bg-white/[0.02]"
      }`}
    >
      <div className="flex items-center gap-1.5 text-white/50 text-[10px] uppercase tracking-wider font-mono">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-white tabular-nums">
        {value}
      </div>
    </div>
  )
}

function FloatingChip({
  className,
  icon,
  label,
  sub,
  delay,
}: {
  className?: string
  icon: React.ReactNode
  label: string
  sub: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute z-10 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0A1020]/90 backdrop-blur-xl px-3 py-2 shadow-[0_10px_40px_-10px_rgba(4,107,210,0.6)] ${className}`}
    >
      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5">
        {icon}
      </span>
      <div className="leading-tight">
        <div className="text-sm font-semibold text-white tabular-nums">
          {label}
        </div>
        <div className="text-[10px] text-white/50 uppercase tracking-wider">
          {sub}
        </div>
      </div>
    </motion.div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────────────────────────────
export function Hero() {
  const ref = useRef<HTMLElement | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const bgX = useTransform(springX, [-1, 1], [-40, 40])
  const bgY = useTransform(springY, [-1, 1], [-30, 30])
  const panelX = useTransform(springX, [-1, 1], [12, -12])
  const panelY = useTransform(springY, [-1, 1], [8, -8])

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x * 2)
      mouseY.set(y * 2)
    }
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [mouseX, mouseY])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden lg:min-h-screen lg:flex lg:items-center"
    >
      <MeshBackground parallaxX={bgX} parallaxY={bgY} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-14 sm:pb-20 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 sm:gap-10 lg:gap-8 lg:items-center">
          {/* ───── Left: copy ───── */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <LivePill />
            </div>

            <h1 className="font-display mt-6 sm:mt-7 text-[2rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] leading-[1.05] sm:leading-[0.95] tracking-[-0.03em] font-semibold break-words">
              <span className="block">
                <KineticWord delay={0.15}>One platform.</KineticWord>
              </span>
              <span className="block mt-1">
                <KineticWord delay={0.3} gradient>
                  Every call.
                </KineticWord>
              </span>
              <span className="block mt-1">
                <KineticWord delay={0.45} gradient>
                  Every country.
                </KineticWord>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-5 sm:mt-7 text-base sm:text-xl text-[#B8C4D4] max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              UCaaS, contact center, AI agents, and virtual numbers — on a{" "}
              <span className="text-white">carrier-grade network</span> covering{" "}
              <span className="text-[#22D3EE]">150+ countries</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="relative w-full sm:w-auto h-12 sm:h-14 px-5 sm:px-7 text-sm sm:text-base bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold rounded-xl overflow-hidden group shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)]"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    animate={{ x: ["-150%", "150%"] }}
                    transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.5 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    <span className="sm:hidden">Start a conversation</span>
                    <span className="hidden sm:inline">Start a no-pressure conversation</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 sm:h-14 px-5 sm:px-7 text-sm sm:text-base rounded-xl border-white/10 bg-white/[0.03] hover:bg-white/10 text-white hover:text-white backdrop-blur-md group justify-center"
                >
                  <span className="mr-2 flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#046BD2]/30 transition-colors">
                    <Play className="w-3 h-3 ml-0.5 fill-white" />
                  </span>
                  Watch 90-sec demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust marquee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-12 lg:mt-14"
            >
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/40 font-mono mb-4 text-center lg:text-left">
                Trusted by teams shipping the future
              </div>
              <div
                className="relative overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
                }}
              >
                <motion.div
                  className="flex items-center gap-12 whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  {[...trustLogos, ...trustLogos].map((logo, i) => (
                    <img
                      key={i}
                      src={logo.src}
                      alt={logo.name}
                      className="h-7 sm:h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ───── Right: live ops panel ───── */}
          <div className="lg:col-span-5 relative">
            <LiveOpsPanel parallaxX={panelX} parallaxY={panelY} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[10px] uppercase tracking-[0.22em] font-mono">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
