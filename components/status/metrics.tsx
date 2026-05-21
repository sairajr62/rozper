"use client"

import { motion } from "framer-motion"

// Deterministic sparkline data
function spark(seed: number, points = 32, baseline = 50, jitter = 22) {
  const out: number[] = []
  for (let i = 0; i < points; i++) {
    const n = Math.sin((i + seed) * 0.6) * jitter * 0.6 + Math.cos((i * seed) * 0.3) * jitter * 0.4
    out.push(Math.max(8, Math.min(100, baseline + n)))
  }
  return out
}

function path(values: number[], w: number, h: number) {
  const stepX = w / (values.length - 1)
  return values
    .map((v, i) => {
      const x = i * stepX
      const y = h - (v / 100) * h
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(" ")
}

const metrics = [
  {
    title: "API latency · p50",
    value: "84 ms",
    delta: "−3 ms",
    deltaTone: "good",
    data: spark(2, 32, 48, 14),
  },
  {
    title: "API latency · p99",
    value: "412 ms",
    delta: "+9 ms",
    deltaTone: "neutral",
    data: spark(5, 32, 62, 22),
  },
  {
    title: "Call answer rate",
    value: "98.7%",
    delta: "+0.2%",
    deltaTone: "good",
    data: spark(7, 32, 72, 8),
  },
  {
    title: "SMS delivery · global",
    value: "99.4%",
    delta: "stable",
    deltaTone: "neutral",
    data: spark(11, 32, 78, 6),
  },
  {
    title: "Webhook delivery · first try",
    value: "99.91%",
    delta: "+0.04%",
    deltaTone: "good",
    data: spark(13, 32, 82, 7),
  },
  {
    title: "Agent first-token latency",
    value: "182 ms",
    delta: "−11 ms",
    deltaTone: "good",
    data: spark(17, 32, 38, 18),
  },
]

export function StatusMetrics() {
  return (
    <section className="relative py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-2">
              Performance · last 24h
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
              Live performance metrics
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Streaming · 1 datapoint / 45 min
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-[#0F1A2E]/50 backdrop-blur-md p-5 overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40">
                  {m.title}
                </div>
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                    m.deltaTone === "good"
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-white/50 bg-white/[0.04] border border-white/10"
                  }`}
                >
                  {m.delta}
                </span>
              </div>

              <div className="mt-2 font-display text-3xl font-bold text-white tabular-nums">
                {m.value}
              </div>

              {/* Sparkline */}
              <svg
                viewBox="0 0 200 60"
                className="mt-4 w-full h-16"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id={`grad-${i}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#046BD2" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`${path(m.data, 200, 60)} L 200 60 L 0 60 Z`}
                  fill={`url(#grad-${i})`}
                />
                <path
                  d={path(m.data, 200, 60)}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {/* Trailing dot */}
                <circle
                  cx={200}
                  cy={60 - (m.data[m.data.length - 1] / 100) * 60}
                  r="3"
                  fill="#22D3EE"
                />
              </svg>

              <div className="mt-1 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-white/30">
                <span>−24h</span>
                <span>now</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
