"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Activity, Clock } from "lucide-react"
import { useEffect, useState } from "react"

export function StatusHero() {
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => p + 1), 1200)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative pt-32 pb-12 overflow-hidden">
      {/* Subtle status-green wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-emerald-500/8 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-white/60 mb-4">
            <Activity className="w-3.5 h-3.5" />
            Live · refreshing every 30s
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-8 relative rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.06] via-emerald-500/[0.02] to-transparent overflow-hidden p-8 md:p-10"
          >
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-400/20 blur-3xl rounded-full pointer-events-none" />

            <div className="relative flex items-start gap-5">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
                <span className="relative w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </span>
              </div>
              <div className="flex-1">
                <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-[1.05]">
                  All systems normal.
                </h1>
                <p className="mt-3 text-[#9AA8BC] max-w-md">
                  Voice, messaging, AI, dashboard and APIs are operating within
                  SLA across every region.
                </p>
              </div>
            </div>

            {/* Live ticker */}
            <div className="relative mt-7 grid grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
              {[
                { l: "API requests / sec", v: "12,847", trend: "+2.1%" },
                { l: "Avg API latency", v: "84 ms", trend: "−3 ms" },
                { l: "Call setup success", v: "99.98%", trend: "30d" },
              ].map((m) => (
                <div key={m.l} className="bg-[#0A1020]/80 px-5 py-4">
                  <div className="text-[10px] uppercase tracking-widest font-mono text-white/40">
                    {m.l}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-2xl font-bold text-white tabular-nums">
                      {m.v}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      {m.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar card: uptime contract */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#0F1A2E]/60 backdrop-blur-md p-6"
          >
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40">
              Uptime contract
            </div>
            <div className="mt-3 font-display text-5xl font-bold bg-gradient-to-br from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent tabular-nums">
              99.99%
            </div>
            <p className="mt-2 text-xs text-[#9AA8BC]">
              Financially backed across Voice, Messaging, and Dashboard.
            </p>

            <div className="mt-5 pt-5 border-t border-white/5 space-y-2.5">
              {[
                { l: "30-day", v: "99.98%" },
                { l: "90-day", v: "99.94%" },
                { l: "365-day", v: "99.91%" },
              ].map((r) => (
                <div
                  key={r.l}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="font-mono text-white/40 uppercase tracking-wider">
                    {r.l}
                  </span>
                  <span className="font-mono text-emerald-400 tabular-nums">
                    {r.v}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-mono text-white/40">
              <Clock className="w-3 h-3" />
              Last updated 4s ago
              <span className="ml-1 w-1 h-1 rounded-full bg-emerald-400 animate-pulse" key={pulse} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
