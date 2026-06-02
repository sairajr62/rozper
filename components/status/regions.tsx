"use client"

import { motion } from "framer-motion"

type Status = "operational" | "degraded" | "outage"

const regions: { name: string; code: string; status: Status; latency: number; load: number }[] = [
  { name: "US East", code: "us-east-1", status: "operational", latency: 18, load: 62 },
  { name: "US West", code: "us-west-2", status: "operational", latency: 22, load: 48 },
  { name: "Canada", code: "ca-central-1", status: "operational", latency: 24, load: 31 },
  { name: "Brazil", code: "sa-east-1", status: "operational", latency: 41, load: 27 },
  { name: "UK", code: "eu-west-2", status: "operational", latency: 12, load: 71 },
  { name: "Ireland", code: "eu-west-1", status: "operational", latency: 14, load: 55 },
  { name: "Germany", code: "eu-central-1", status: "operational", latency: 16, load: 49 },
  { name: "France", code: "eu-west-3", status: "operational", latency: 17, load: 38 },
  { name: "UAE", code: "me-central-1", status: "operational", latency: 32, load: 22 },
  { name: "India", code: "ap-south-1", status: "operational", latency: 28, load: 58 },
  { name: "Singapore", code: "ap-southeast-1", status: "operational", latency: 19, load: 64 },
  { name: "Tokyo", code: "ap-northeast-1", status: "operational", latency: 21, load: 44 },
  { name: "Sydney", code: "ap-southeast-2", status: "operational", latency: 26, load: 33 },
  { name: "South Africa", code: "af-south-1", status: "operational", latency: 38, load: 19 },
]

const statusMeta: Record<Status, { dot: string; ring: string }> = {
  operational: {
    dot: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]",
    ring: "border-emerald-400/40",
  },
  degraded: {
    dot: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]",
    ring: "border-amber-400/40",
  },
  outage: {
    dot: "bg-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.6)]",
    ring: "border-rose-400/40",
  },
}

export function StatusRegions() {
  return (
    <section className="relative py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-2">
              Regions · 14 of 14 healthy
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
              Every edge, in real time
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {regions.map((r, i) => {
            const meta = statusMeta[r.status]
            return (
              <motion.div
                key={r.code}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className={`rounded-xl border ${meta.ring} bg-[#0F1A2E]/60 backdrop-blur-md p-4 hover:bg-[#0F1A2E]/80 transition-colors group`}
              >
                <div className="flex items-center justify-between">
                  <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                    {r.code}
                  </span>
                </div>
                <div className="mt-3 font-medium text-white text-sm">
                  {r.name}
                </div>
                <div className="mt-2.5 flex items-baseline gap-1">
                  <span className="font-mono text-lg text-white tabular-nums">
                    {r.latency}
                  </span>
                  <span className="font-mono text-[10px] text-white/40">ms p50</span>
                </div>

                {/* Load bar */}
                <div className="mt-2.5">
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.load}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.02 }}
                      className={`h-full rounded-full ${
                        r.load > 70
                          ? "bg-amber-400"
                          : "bg-gradient-to-r from-[#22D3EE] to-[#046BD2]"
                      }`}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[9px] font-mono text-white/30 uppercase tracking-widest">
                    <span>Load</span>
                    <span>{r.load}%</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
