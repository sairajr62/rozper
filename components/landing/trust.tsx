"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  ShieldCheck,
  MapPin,
  FileLock2,
  Globe2,
  ArrowUpRight,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Pillar = {
  id: string
  icon: LucideIcon
  label: string
  // Claim is split so the emphasis phrase can be rendered with the
  // page-standard gradient instead of italic — matches the H2 / hero pattern.
  claim: { prefix: string; emphasis: string; suffix?: string }
  body: string
  accent: string
  glow: string
}

const pillars: Pillar[] = [
  {
    id: "stir-shaken",
    icon: ShieldCheck,
    label: "STIR/SHAKEN",
    claim: { prefix: "Call authentication ", emphasis: "at the carrier", suffix: "." },
    body: "Every outbound is cryptographically signed at the carrier level. Caller IDs stay trusted across the global PSTN — no spoofing, no blocked numbers.",
    accent: "from-[#22D3EE] to-[#046BD2]",
    glow: "rgba(34,211,238,0.45)",
  },
  {
    id: "e911",
    icon: MapPin,
    label: "E911 Dynamic",
    claim: {
      prefix: "Dynamic emergency ",
      emphasis: "location on every call",
      suffix: ".",
    },
    body: "Kari's Law and RAY BAUM's Act compliant. Dispatchable address sent to PSAPs in real time — for desk phones, softphones, and mobile alike.",
    accent: "from-[#0086F9] to-[#2575FC]",
    glow: "rgba(0,134,249,0.45)",
  },
  {
    id: "soc2",
    icon: FileLock2,
    label: "SOC 2 Type II",
    claim: { prefix: "Audited ", emphasis: "every year", suffix: "." },
    body: "Full SOC 2 Type II reports available under NDA. Same security posture for every customer, every plan — never tier-gated.",
    accent: "from-[#22D3EE] to-[#0086F9]",
    glow: "rgba(34,211,238,0.45)",
  },
  {
    id: "compliance",
    icon: Globe2,
    label: "Global Compliance",
    claim: {
      prefix: "POPIA. GDPR. HIPAA. ",
      emphasis: "Done",
      suffix: ".",
    },
    body: "Data residency in 5 regions. DPAs signable in minutes. HIPAA BAA available on Enterprise. ISO 27001 evidence on request.",
    accent: "from-[#2575FC] to-[#046BD2]",
    glow: "rgba(37,117,252,0.45)",
  },
]

export function Trust() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-[#070B14]"
    >
      {/* Aurora + dot grid — same language as other sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 25%, rgba(4,107,210,0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 80%, rgba(34,211,238,0.10) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.20]"
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
        {/* Header — page-standard centered eyebrow + H2 + lede */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-mono text-white/50">
            <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#0086F9]" />
            Trust
            <span className="w-6 h-px bg-gradient-to-l from-transparent to-[#0086F9]" />
          </div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]">
            Carrier outside.{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
              Fortress inside.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#9AA8BC] leading-relaxed max-w-2xl mx-auto">
            Every customer runs the same SOC 2, STIR/SHAKEN, E911 stack.
            Security isn't tier-gated.
          </p>
        </motion.div>

        {/* PILLAR GRID — 4 trust pillars. No card boxes. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 sm:gap-x-10 lg:gap-x-8 gap-y-14 sm:gap-y-16">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: 0.12 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative text-center sm:text-left"
              >
                {/* Circular icon stamp — gradient ring + dashed inner detail.
                    Re-uses the visual signature established for this section.
                    Animations (always-on, slow & subtle; intensify on hover):
                      - Sweep arc rotates clockwise around the outer ring
                      - Dashed inner ring counter-rotates
                      - Top seal indicator pulses with halo
                      - Whole stamp breathes a touch on hover
                      - Hover halo fades in */}
                <motion.div
                  className="relative inline-flex"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  {/* Hover halo */}
                  <span
                    aria-hidden
                    className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{
                      background: `radial-gradient(circle, ${p.glow} 0%, transparent 65%)`,
                    }}
                  />

                  {/* Always-on ambient ring glow — subtle, breathing */}
                  <motion.span
                    aria-hidden
                    animate={{
                      opacity: [0.22, 0.45, 0.22],
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -inset-1 rounded-full blur-md"
                    style={{
                      background: `radial-gradient(circle, ${p.glow} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Sweep arc — slow rotating gradient highlight.
                      Speeds up on hover via group-hover className swap. */}
                  <motion.span
                    aria-hidden
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${p.accent}`}
                    style={{
                      maskImage:
                        "conic-gradient(from 0deg, black 0deg, black 60deg, transparent 180deg, transparent 360deg)",
                      WebkitMaskImage:
                        "conic-gradient(from 0deg, black 0deg, black 60deg, transparent 180deg, transparent 360deg)",
                    }}
                  />

                  {/* Stamp itself */}
                  <span
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full p-[1.5px] bg-gradient-to-br ${p.accent}`}
                  >
                    <span className="relative flex h-full w-full items-center justify-center rounded-full bg-[#070B14]">
                      {/* Dashed inner ring — counter-rotates */}
                      <motion.span
                        aria-hidden
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 24,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-1 rounded-full border border-dashed border-white/[0.12]"
                      />
                      {/* Icon — breathes gently */}
                      <motion.span
                        aria-hidden
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{
                          duration: 3.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="relative flex items-center justify-center"
                      >
                        <Icon
                          className="h-5 w-5 text-white"
                          strokeWidth={1.6}
                        />
                      </motion.span>
                    </span>
                  </span>

                  {/* Tiny seal indicator at top of stamp — pulsing core
                      with an outer ping ring (always-on heartbeat) */}
                  <span
                    aria-hidden
                    className="absolute -top-1 left-1/2 -translate-x-1/2"
                  >
                    {/* Outer ping ring */}
                    <motion.span
                      aria-hidden
                      animate={{
                        scale: [1, 2.2, 2.2],
                        opacity: [0.7, 0, 0],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 h-1.5 w-1.5 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(34,211,238,0.9) 0%, transparent 70%)",
                      }}
                    />
                    {/* Pulsing core */}
                    <motion.span
                      aria-hidden
                      animate={{
                        scale: [1, 1.25, 1],
                        boxShadow: [
                          "0 0 6px rgba(34,211,238,0.55)",
                          "0 0 14px rgba(34,211,238,0.95)",
                          "0 0 6px rgba(34,211,238,0.55)",
                        ],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative block h-1.5 w-1.5 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, #22D3EE, #046BD2)",
                      }}
                    />
                  </span>
                </motion.div>

                {/* Pillar label */}
                <div
                  className={`mt-5 text-[11px] uppercase tracking-[0.22em] font-mono bg-gradient-to-r ${p.accent} bg-clip-text text-transparent`}
                >
                  {p.label}
                </div>

                {/* Claim — gradient on the emphasis phrase (replaces italic) */}
                <h3 className="mt-3 font-display text-xl sm:text-[1.5rem] font-semibold text-white tracking-[-0.02em] leading-[1.18]">
                  {p.claim.prefix}
                  <span
                    className={`bg-gradient-to-r ${p.accent} bg-clip-text text-transparent`}
                  >
                    {p.claim.emphasis}
                  </span>
                  {p.claim.suffix}
                </h3>

                {/* Body */}
                <p className="mt-3 text-sm sm:text-[15px] text-[#9AA8BC] leading-relaxed">
                  {p.body}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 sm:mt-20 flex items-center justify-center"
        >
          <a
            href="/security"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.10] bg-white/[0.02] text-sm font-medium text-white/70 hover:text-white hover:border-[#22D3EE]/30 hover:bg-white/[0.04] transition-all"
          >
            <ShieldCheck className="h-4 w-4 text-[#22D3EE]" />
            <span>Read the full security &amp; compliance overview</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-white/45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#22D3EE]" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
