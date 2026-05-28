"use client"

import { motion } from "framer-motion"

export type CoverTone = "blue" | "cyan" | "violet" | "emerald" | "amber"

const toneMap: Record<
  CoverTone,
  { from: string; via: string; to: string; accent: string }
> = {
  blue: {
    from: "rgba(4,107,210,0.55)",
    via: "rgba(0,134,249,0.35)",
    to: "rgba(11,18,32,0.95)",
    accent: "#0086F9",
  },
  cyan: {
    from: "rgba(34,211,238,0.45)",
    via: "rgba(4,107,210,0.35)",
    to: "rgba(11,18,32,0.95)",
    accent: "#22D3EE",
  },
  violet: {
    from: "rgba(99,102,241,0.45)",
    via: "rgba(4,107,210,0.35)",
    to: "rgba(11,18,32,0.95)",
    accent: "#7C8DFF",
  },
  emerald: {
    from: "rgba(16,185,129,0.4)",
    via: "rgba(4,107,210,0.3)",
    to: "rgba(11,18,32,0.95)",
    accent: "#22D3EE",
  },
  amber: {
    from: "rgba(251,191,36,0.4)",
    via: "rgba(4,107,210,0.3)",
    to: "rgba(11,18,32,0.95)",
    accent: "#FBBF24",
  },
}

export function CoverArt({
  tone,
  label,
  size = "default",
}: {
  tone: CoverTone
  label: string
  size?: "default" | "lg"
}) {
  const t = toneMap[tone] ?? toneMap["blue"]
  const isLg = size === "lg"

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0A1020]">
      {/* base gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 30% 20%, ${t.from} 0%, ${t.via} 35%, ${t.to} 75%)`,
        }}
      />

      {/* rotating conic accent */}
      <motion.div
        className="absolute -top-1/2 -right-1/3 w-[160%] h-[160%] rounded-full opacity-50"
        style={{
          background: `conic-gradient(from 120deg at 50% 50%, transparent 0deg, ${t.accent}55 90deg, transparent 200deg, ${t.accent}33 320deg, transparent 360deg)`,
          filter: "blur(40px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      {/* fine grid */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: isLg ? "48px 48px" : "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* signal waveform — decorative */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full opacity-50"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
        style={{ height: isLg ? 80 : 56 }}
        aria-hidden
      >
        <defs>
          <linearGradient id={`wf-${tone}`} x1="0" x2="1">
            <stop offset="0%" stopColor={t.accent} stopOpacity="0" />
            <stop offset="50%" stopColor={t.accent} stopOpacity="0.8" />
            <stop offset="100%" stopColor={t.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 40 Q 50 10, 100 40 T 200 40 T 300 40 T 400 40"
          fill="none"
          stroke={`url(#wf-${tone})`}
          strokeWidth={isLg ? "1.5" : "1"}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <motion.path
          d="M0 50 Q 60 20, 120 50 T 240 50 T 360 50 T 480 50"
          fill="none"
          stroke={t.accent}
          strokeOpacity="0.25"
          strokeWidth={isLg ? "1" : "0.8"}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.1 }}
        />
      </svg>

      {/* label chip */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-white/90"
          style={{ color: "#fff" }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: t.accent, boxShadow: `0 0 8px ${t.accent}` }}
          />
          {label}
        </span>
      </div>

      {/* subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  )
}
