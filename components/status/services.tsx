"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

type Status = "operational" | "degraded" | "outage" | "maintenance"

type Service = {
  name: string
  status: Status
  uptime: string
  sub?: { name: string; status: Status; uptime: string }[]
}

const services: Service[] = [
  {
    name: "Voice Platform",
    status: "operational",
    uptime: "99.98%",
    sub: [
      { name: "Outbound calls", status: "operational", uptime: "99.99%" },
      { name: "Inbound calls", status: "operational", uptime: "99.97%" },
      { name: "Call recordings", status: "operational", uptime: "100.00%" },
      { name: "Media streams (WebSocket)", status: "operational", uptime: "99.96%" },
    ],
  },
  {
    name: "Messaging",
    status: "operational",
    uptime: "99.99%",
    sub: [
      { name: "SMS · US/CA", status: "operational", uptime: "100.00%" },
      { name: "SMS · International", status: "operational", uptime: "99.97%" },
      { name: "MMS", status: "operational", uptime: "99.98%" },
      { name: "WhatsApp Business", status: "operational", uptime: "99.99%" },
    ],
  },
  {
    name: "AI Agents",
    status: "operational",
    uptime: "99.96%",
    sub: [
      { name: "Voice agent runtime", status: "operational", uptime: "99.97%" },
      { name: "Knowledge base ingest", status: "operational", uptime: "99.95%" },
    ],
  },
  {
    name: "Public API",
    status: "operational",
    uptime: "99.99%",
  },
  {
    name: "Dashboard & Console",
    status: "operational",
    uptime: "99.97%",
  },
  {
    name: "Webhooks",
    status: "operational",
    uptime: "99.98%",
  },
]

const statusMeta: Record<Status, { label: string; dot: string; text: string }> = {
  operational: {
    label: "Operational",
    dot: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]",
    text: "text-emerald-400",
  },
  degraded: {
    label: "Degraded performance",
    dot: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]",
    text: "text-amber-300",
  },
  outage: {
    label: "Major outage",
    dot: "bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.6)]",
    text: "text-rose-300",
  },
  maintenance: {
    label: "Maintenance",
    dot: "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]",
    text: "text-sky-300",
  },
}

// Build 90-day uptime bars deterministically — mostly green, with a couple of minor blips for realism
function bars(seed: number): Status[] {
  const out: Status[] = []
  for (let i = 0; i < 90; i++) {
    const n = ((i + 1) * (seed + 7)) % 101
    if (n === 13 + seed) out.push("degraded")
    else if (n === 67 + seed * 2) out.push("maintenance")
    else out.push("operational")
  }
  return out
}

export function StatusServices() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="relative pb-8 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-2">
              Services
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
              90-day uptime · per component
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-white/40">
            <Legend dot="bg-emerald-400" label="Operational" />
            <Legend dot="bg-amber-400" label="Degraded" />
            <Legend dot="bg-rose-400" label="Outage" />
            <Legend dot="bg-sky-400" label="Maintenance" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0F1A2E]/40 backdrop-blur-md divide-y divide-white/5">
          {services.map((svc, i) => {
            const meta = statusMeta[svc.status]
            const isOpen = open === i
            const seq = bars(i)
            return (
              <div key={svc.name}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left p-4 md:p-5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-2 h-2 rounded-full ${meta.dot} flex-shrink-0`}
                      />
                      <span className="font-medium text-white">{svc.name}</span>
                      {svc.sub && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-white/40 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="hidden sm:inline font-mono text-[11px] text-white/40 tabular-nums">
                        {svc.uptime} · 90d
                      </span>
                      <span
                        className={`text-xs font-mono uppercase tracking-wider ${meta.text}`}
                      >
                        {meta.label}
                      </span>
                    </div>
                  </div>

                  {/* Uptime bar chart */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-end gap-[3px] h-7"
                  >
                    {seq.map((s, idx) => (
                      <span
                        key={idx}
                        title={`Day ${idx - 89}`}
                        className={`flex-1 rounded-sm transition-all hover:scale-y-110 origin-bottom ${
                          s === "operational"
                            ? "bg-emerald-400/85 hover:bg-emerald-300"
                            : s === "degraded"
                            ? "bg-amber-400/90"
                            : s === "outage"
                            ? "bg-rose-400/90"
                            : "bg-sky-400/85"
                        }`}
                        style={{ height: "100%" }}
                      />
                    ))}
                  </motion.div>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/30">
                    <span>90 days ago</span>
                    <span>Today</span>
                  </div>
                </button>

                {isOpen && svc.sub && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="bg-[#070B14]/40 border-t border-white/5"
                  >
                    <div className="px-5 md:px-8 py-4 space-y-2.5">
                      {svc.sub.map((s) => {
                        const m = statusMeta[s.status]
                        return (
                          <div
                            key={s.name}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${m.dot}`}
                              />
                              <span className="text-white/80">{s.name}</span>
                            </div>
                            <span className="font-mono text-[11px] text-white/40 tabular-nums">
                              {s.uptime}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  )
}
