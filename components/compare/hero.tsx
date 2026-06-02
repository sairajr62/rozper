"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"

/**
 * Compare hero — diagonal-split layout with a flowing SVG curve dividing
 * "Rozper" from "the rest". No rectangular cards. Floating competitor
 * lozenges drift gently across the right half.
 */
export function CompareHero() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 -z-20 bg-[#070B14]" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(120,160,220,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,160,220,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)",
        }}
      />

      {/* Slow conic wash that lives on Rozper's half */}
      <motion.div
        aria-hidden
        className="absolute -z-10 -left-[20%] top-[10%] w-[1100px] h-[1100px] opacity-50"
        style={{
          background:
            "conic-gradient(from 230deg at 50% 50%, rgba(4,107,210,0) 0deg, rgba(4,107,210,0.45) 80deg, rgba(34,211,238,0.30) 160deg, rgba(4,107,210,0) 320deg)",
          filter: "blur(110px)",
          borderRadius: "62% 38% 49% 51% / 53% 41% 59% 47%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      {/* Cooler glow on the competitors' half */}
      <motion.div
        aria-hidden
        className="absolute -z-10 right-[-15%] bottom-[5%] w-[800px] h-[800px] opacity-35"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.30) 0%, rgba(168,85,247,0) 65%)",
          filter: "blur(70px)",
          borderRadius: "38% 62% 41% 59% / 51% 47% 53% 49%",
        }}
        animate={{ x: [0, 24, -8, 0], y: [0, -18, 12, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* The diagonal divider — an SVG path swooping top-right → bottom-left */}
      <svg
        aria-hidden
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="absolute inset-0 -z-10 w-full h-full"
      >
        <defs>
          <linearGradient id="divider-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.45)" />
            <stop offset="50%" stopColor="rgba(4,107,210,0.55)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.40)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 1440 0 C 1100 220 980 480 720 520 C 480 558 280 740 0 900"
          stroke="url(#divider-grad)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            inView ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ─────────────── Left: Rozper headline ─────────────── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
                Side-by-side · 2026 edition
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display mt-7 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.98] tracking-[-0.035em] font-semibold text-white"
            >
              Rozper{" "}
              <span className="text-white/35 font-light italic">vs.</span>{" "}
              <span
                className="bg-gradient-to-r from-[#2D98F1] via-[#0086F9] to-[#22D3EE] bg-clip-text text-transparent"
                style={{ textShadow: "0 0 80px rgba(4,107,210,0.5)" }}
              >
                the legacy stack.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.35 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-[#B8C4D4] max-w-2xl leading-relaxed font-light"
            >
              An honest, head-to-head look at plans, features, and total cost —
              against the four platforms Rozper customers most often migrate
              from.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.5 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                href="#plans-compare"
                className="group inline-flex items-center gap-2 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm font-semibold px-6 py-3 transition-colors shadow-[0_10px_40px_-10px_rgba(4,107,210,0.7)]"
              >
                See the numbers
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#features-matrix"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 backdrop-blur-md text-white text-sm font-medium px-6 py-3 transition-colors"
              >
                Jump to feature matrix
              </Link>
            </motion.div>

            {/* Headline stats — flowing pill row, not a card grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Stat value="$520" label="Saved per seat / year vs. RingCentral" />
              <span className="hidden sm:inline-block h-8 w-px bg-white/10" />
              <Stat value="3.4×" label="Faster setup vs. legacy UCaaS" />
              <span className="hidden sm:inline-block h-8 w-px bg-white/10" />
              <Stat value="0" label="Setup fees & forced annual contracts" />
            </motion.div>
          </div>

          {/* ─────────────── Right: floating competitor field ─────────────── */}
          <div className="lg:col-span-5 relative h-[420px] lg:h-[480px]">
            <FloatingCompetitors active={inView} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── helpers ─────────────────────────── */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col leading-tight">
      <span className="font-display text-2xl sm:text-3xl font-semibold text-white tabular-nums">
        {value}
      </span>
      <span className="mt-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-white/45 max-w-[180px]">
        {label}
      </span>
    </div>
  )
}

type Mark = {
  name: string
  top: string
  left: string
  size: number
  delay: number
  tone: string
}

const competitors: Mark[] = [
  { name: "Twilio", top: "8%", left: "55%", size: 110, delay: 0.2, tone: "239,68,68" },
  { name: "RingCentral", top: "30%", left: "8%", size: 130, delay: 0.35, tone: "249,115,22" },
  { name: "8x8", top: "52%", left: "60%", size: 104, delay: 0.5, tone: "168,85,247" },
  { name: "Vonage", top: "70%", left: "18%", size: 118, delay: 0.65, tone: "34,197,94" },
  { name: "Dialpad", top: "16%", left: "82%", size: 88, delay: 0.8, tone: "236,72,153" },
]

function FloatingCompetitors({ active }: { active: boolean }) {
  return (
    <div className="relative w-full h-full">
      {/* central Rozper sigil (asymmetric squircle, not a circle) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ rotate: [0, 6, 0, -6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-44 h-44 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #046BD2 0%, #0086F9 50%, #22D3EE 100%)",
            borderRadius: "62% 38% 49% 51% / 53% 41% 59% 47%",
            boxShadow:
              "0 0 80px -10px rgba(4,107,210,0.7), inset 0 0 60px rgba(255,255,255,0.18)",
          }}
        >
          <div
            className="absolute inset-1.5"
            style={{
              borderRadius: "62% 38% 49% 51% / 53% 41% 59% 47%",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), rgba(255,255,255,0) 60%)",
            }}
          />
          <div className="relative flex flex-col items-center text-center">
            {/* The source PNG carries a lot of empty padding to the right of
                the R-mark. We clip it: container is narrower than the
                intrinsic image, image is height-locked and left-anchored,
                so only the R-mark portion is visible. */}
            {/* Black logo variant (tight-cropped from the white PNG, recolored
                to solid black) so the full "Rozper" wordmark is clearly visible
                on the bright sphere. */}
            <Image
              src="/images/rozper-logo-black.png"
              alt="Rozper"
              width={1070}
              height={317}
              priority
              className="h-auto w-[110px]"
            />
            <div className="mt-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/85">
              The single layer
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* competitor lozenges */}
      {competitors.map((c) => (
        <FloatLozenge key={c.name} mark={c} active={active} />
      ))}
    </div>
  )
}

function FloatLozenge({ mark, active }: { mark: Mark; active: boolean }) {
  const controls = useAnimation()
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!active) return
    // Gentle drift loop, slightly different per lozenge.
    const seed = mark.name.length
    controls.start({
      x: [0, 8 + seed, -6, 0],
      y: [0, -10 - seed, 6, 0],
      transition: {
        duration: 14 + seed,
        repeat: Infinity,
        ease: "easeInOut",
      },
    })
  }, [active, controls, mark.name])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={active ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: mark.delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        top: mark.top,
        left: mark.left,
        width: mark.size,
        height: mark.size * 0.66,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={controls}
        className="relative w-full h-full flex items-center justify-center cursor-default"
        style={{
          background: `linear-gradient(135deg, rgba(${mark.tone},0.20) 0%, rgba(255,255,255,0.04) 100%)`,
          border: `1px solid rgba(${mark.tone},${hovered ? 0.6 : 0.3})`,
          borderRadius: "55% 45% 60% 40% / 50% 55% 45% 50%",
          backdropFilter: "blur(8px)",
          boxShadow: hovered
            ? `0 20px 60px -20px rgba(${mark.tone},0.6)`
            : `0 6px 30px -10px rgba(${mark.tone},0.25)`,
          transition: "box-shadow 0.4s, border-color 0.4s",
        }}
      >
        <span className="font-display text-sm sm:text-base font-semibold text-white/85 px-2 text-center leading-tight">
          {mark.name}
        </span>
      </motion.div>
    </motion.div>
  )
}
