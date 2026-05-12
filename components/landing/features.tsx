"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Phone, Bot, Send, ArrowUpRight } from "lucide-react"

// ──────────────────────────────────────────────────────────────────────
// Section eyebrow
// ──────────────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-mono text-white/50">
      <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#0086F9]" />
      {children}
      <span className="w-6 h-px bg-gradient-to-l from-transparent to-[#0086F9]" />
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Bento card shell
// ──────────────────────────────────────────────────────────────────────
function BentoCard({
  className = "",
  children,
  delay = 0,
  isInView,
}: {
  className?: string
  children: React.ReactNode
  delay?: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group ${className}`}
    >
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/10 via-[#046BD2]/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full rounded-3xl bg-[#0A1020]/80 backdrop-blur-xl border border-white/[0.04] overflow-hidden">
        {children}
      </div>
    </motion.div>
  )
}

// Card body — title/desc/CTA bottom-aligned
function CardBody({
  title,
  description,
  tag,
  icon: Icon,
}: {
  title: string
  description: string
  tag?: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="relative z-10 p-6 sm:p-7 flex flex-col h-full">
      <div className="flex items-center justify-between mb-auto">
        {tag && (
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-mono text-white/40">
            <span className="w-1 h-1 rounded-full bg-[#0086F9]" />
            {tag}
          </span>
        )}
        <Icon className="w-4 h-4 text-white/30 group-hover:text-[#0086F9] transition-colors" />
      </div>
      <div className="mt-32">
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[#9AA8BC] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Visual layers for each card
// ──────────────────────────────────────────────────────────────────────
function PhoneVisual() {
  // Pulsing dialing rings
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="absolute top-1/3 -translate-y-1/2 w-full flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border border-[#0086F9]/30"
            style={{ width: 80 + i * 60, height: 80 + i * 60 }}
            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.6, 0, 0.6] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center shadow-[0_0_40px_-5px_rgba(4,107,210,0.8)]">
          <Phone className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}

function ChatVisual() {
  const channels = ["voice", "sms", "whatsapp", "chat", "ig", "fb"]
  return (
    <div className="absolute top-6 right-6 flex flex-wrap gap-1.5 max-w-[180px] justify-end pointer-events-none">
      {channels.map((c, i) => (
        <motion.span
          key={c}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/60"
        >
          {c}
        </motion.span>
      ))}
      <div className="w-full mt-3 flex items-center justify-end gap-2">
        <div className="px-3 py-2 rounded-2xl rounded-br-sm bg-[#046BD2] text-white text-xs">
          On it.
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#046BD2] flex items-center justify-center text-[10px] font-semibold text-white">
          M
        </div>
      </div>
      <div className="w-full mt-1.5 flex items-center justify-end gap-2">
        <div className="px-3 py-2 rounded-2xl rounded-br-sm bg-white/[0.04] border border-white/10 text-white/80 text-xs">
          ETA 2 min
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-7 h-7 rounded-full bg-emerald-500/80 flex items-center justify-center text-[10px] font-semibold text-white"
        >
          AI
        </motion.div>
      </div>
    </div>
  )
}

function AIWaveformVisual() {
  return (
    <div className="absolute inset-x-6 top-6 pointer-events-none">
      <div className="flex items-center gap-3">
        <motion.div
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#046BD2] flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(34,211,238,0.6)",
              "0 0 0 10px rgba(34,211,238,0)",
            ],
          }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <Bot className="w-4 h-4 text-white" />
        </motion.div>
        <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest">
          listening
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 h-12">
        {Array.from({ length: 36 }).map((_, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-full bg-gradient-to-t from-[#046BD2]/40 to-[#22D3EE]"
            animate={{
              height: [
                `${10 + Math.random() * 8}%`,
                `${30 + Math.random() * 60}%`,
                `${10 + Math.random() * 8}%`,
              ],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.6,
              repeat: Infinity,
              delay: i * 0.03,
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
        <span>0:00</span>
        <span className="text-emerald-400">qualified · 92%</span>
      </div>
    </div>
  )
}

function VideoVisual() {
  const tiles = [0, 1, 2, 3]
  return (
    <div className="absolute inset-x-6 top-6 pointer-events-none">
      <div className="grid grid-cols-2 gap-2">
        {tiles.map((i) => (
          <motion.div
            key={i}
            className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-[#0E1830] to-[#0A1020] border border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${30 + i * 15}% ${
                  40 + i * 10
                }%, rgba(${i % 2 ? "34,211,238" : "4,107,210"},0.4) 0%, transparent 70%)`,
              }}
            />
            <div className="absolute bottom-1 left-1 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="text-[8px] font-mono text-white/70 uppercase">
                live
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] font-mono text-white/50 flex items-center justify-between">
        <span className="text-emerald-400">● transcript on</span>
        <span>4 / 4 connected</span>
      </div>
    </div>
  )
}

function MessagingVisual() {
  return (
    <div className="absolute inset-x-6 top-6 pointer-events-none space-y-2">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-2 text-[10px] font-mono text-white/50"
      >
        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
        BROADCAST · 24,812 RECIPIENTS
      </motion.div>
      <div className="flex flex-col gap-1.5">
        {[0.78, 0.92, 0.34].map((w, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5"
          >
            <Send className="w-3 h-3 text-[#0086F9]" />
            <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#046BD2] to-[#22D3EE]"
                initial={{ width: 0 }}
                animate={{ width: `${w * 100}%` }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }}
              />
            </div>
            <span className="text-[10px] font-mono text-white/40 tabular-nums w-8 text-right">
              {Math.round(w * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function WholesaleVisual() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 200" fill="none">
        <defs>
          <linearGradient id="route1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#046BD2" stopOpacity="0" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="1" />
            <stop offset="100%" stopColor="#046BD2" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.2, 0.45, 0.7].map((y, i) => (
          <g key={i}>
            <path
              d={`M 20 ${y * 200} Q 160 ${(y - 0.15) * 200} 300 ${y * 200}`}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              fill="none"
            />
            <motion.circle
              r="3"
              fill="#22D3EE"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: i * 1.1,
                ease: "linear",
              }}
              style={{
                offsetPath: `path("M 20 ${y * 200} Q 160 ${(y - 0.15) * 200} 300 ${y * 200}")`,
                filter: "drop-shadow(0 0 6px rgba(34,211,238,0.8))",
              }}
            />
          </g>
        ))}
      </svg>
      <div className="absolute top-6 right-6 text-right">
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
          A-Z routes
        </div>
        <div className="font-display text-2xl font-bold text-white tabular-nums">
          1,420
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Hero highlight card (large, spans 2 cols)
// ──────────────────────────────────────────────────────────────────────
function PlatformShowcase({ isInView }: { isInView: boolean }) {
  const [callsCount, setCallsCount] = useState(2_412_034)
  useEffect(() => {
    const id = setInterval(
      () => setCallsCount((c) => c + Math.floor(Math.random() * 14) + 3),
      900,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <BentoCard className="md:col-span-2 md:row-span-2 min-h-[440px]" isInView={isInView}>
      {/* dotted globe */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <motion.div
          className="w-[340px] h-[340px] rounded-full border border-[#0086F9]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[240px] h-[240px] rounded-full border border-[#0086F9]/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute w-[180px] h-[180px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(4,107,210,0.45) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col p-7 sm:p-10">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 text-[11px] font-mono uppercase tracking-widest text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
            Global Network
          </span>
        </div>

        <div className="mt-auto">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50 mb-3">
            Calls routed today
          </div>
          <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white tabular-nums tracking-tight leading-none">
            {callsCount.toLocaleString()}
          </div>
          <div className="mt-6 max-w-md">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
              One platform. Every channel. Every country.
            </h3>
            <p className="mt-2 text-sm text-[#9AA8BC] leading-relaxed">
              Stop stitching together five tools that were never meant to work
              together. Rozper unifies voice, video, messaging, and AI on a
              single carrier-grade fabric.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-white/60 px-2.5 py-1 rounded border border-white/10">
              150+ countries
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-white/60 px-2.5 py-1 rounded border border-white/10">
              99.999% uptime
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-white/60 px-2.5 py-1 rounded border border-white/10">
              &lt;40ms median
            </span>
          </div>
        </div>
      </div>

      {/* hover arrow */}
      <ArrowUpRight className="absolute top-7 right-7 w-5 h-5 text-white/20 group-hover:text-[#22D3EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </BentoCard>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Section
// ──────────────────────────────────────────────────────────────────────
export function Features() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 overflow-hidden bg-[#070B14]"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(4,107,210,0.18) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
        >
          <Eyebrow>The platform</Eyebrow>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]">
            Everything your team needs to{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
              actually communicate
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#9AA8BC] leading-relaxed max-w-2xl mx-auto">
            Most businesses stitch together five tools that were never meant to
            work together. Rozper replaces them with one fabric.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(220px,auto)]">
          <PlatformShowcase isInView={isInView} />

          <BentoCard isInView={isInView} delay={0.1}>
            <PhoneVisual />
            <CardBody
              tag="Numbers"
              icon={ArrowUpRight}
              title="Business Phone"
              description="Local numbers in 150+ countries — provisioned in minutes."
            />
          </BentoCard>

          <BentoCard isInView={isInView} delay={0.15}>
            <ChatVisual />
            <CardBody
              tag="Inbox"
              icon={ArrowUpRight}
              title="Contact Center"
              description="Voice, SMS, WhatsApp, chat, IG, and FB in one omnichannel queue."
            />
          </BentoCard>

          <BentoCard isInView={isInView} delay={0.2} className="md:col-span-2">
            <AIWaveformVisual />
            <CardBody
              tag="AI"
              icon={ArrowUpRight}
              title="AI Receptionist"
              description="Answers, qualifies, and books 24/7 — no missed leads, ever."
            />
          </BentoCard>

          <BentoCard isInView={isInView} delay={0.25}>
            <VideoVisual />
            <CardBody
              tag="Video"
              icon={ArrowUpRight}
              title="HD Meetings"
              description="AI transcripts included — no extra app, no extra cost."
            />
          </BentoCard>

          <BentoCard isInView={isInView} delay={0.3}>
            <MessagingVisual />
            <CardBody
              tag="Messaging"
              icon={ArrowUpRight}
              title="Bulk Messaging"
              description="SMS, MMS, and WhatsApp Business from your business number."
            />
          </BentoCard>

          <BentoCard isInView={isInView} delay={0.35} className="md:col-span-2">
            <WholesaleVisual />
            <CardBody
              tag="Wholesale"
              icon={ArrowUpRight}
              title="Wholesale Voice"
              description="SIP trunking for carriers, resellers, and high-volume operations — A-Z routing on a Tier-1 backbone."
            />
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
