"use client"

import { motion } from "framer-motion"
import { CheckCircle2, AlertTriangle, Wrench, Info } from "lucide-react"
import type { ComponentType } from "react"

type Severity = "resolved" | "monitoring" | "minor" | "maintenance"

type Update = { at: string; status: string; body: string }

type Incident = {
  date: string
  severity: Severity
  title: string
  duration: string
  affected: string[]
  updates: Update[]
}

const sevMeta: Record<
  Severity,
  { Icon: ComponentType<{ className?: string }>; tint: string; label: string; ring: string }
> = {
  resolved: {
    Icon: CheckCircle2,
    tint: "text-emerald-400",
    ring: "border-emerald-500/30 bg-emerald-500/[0.05]",
    label: "Resolved",
  },
  monitoring: {
    Icon: Info,
    tint: "text-sky-300",
    ring: "border-sky-500/30 bg-sky-500/[0.05]",
    label: "Monitoring",
  },
  minor: {
    Icon: AlertTriangle,
    tint: "text-amber-300",
    ring: "border-amber-500/30 bg-amber-500/[0.05]",
    label: "Minor",
  },
  maintenance: {
    Icon: Wrench,
    tint: "text-sky-300",
    ring: "border-sky-500/30 bg-sky-500/[0.05]",
    label: "Maintenance",
  },
}

const incidents: Incident[] = [
  {
    date: "May 9, 2026",
    severity: "resolved",
    title: "Elevated webhook delivery latency in eu-west-1",
    duration: "42 min",
    affected: ["Webhooks", "eu-west-1"],
    updates: [
      {
        at: "14:31 UTC",
        status: "Resolved",
        body: "All webhook queues drained. Median delivery is back to 320ms. No data loss; affected events were retried.",
      },
      {
        at: "14:08 UTC",
        status: "Identified",
        body: "Tracked to a misbehaving downstream egress node. Rolling restart in progress.",
      },
      {
        at: "13:49 UTC",
        status: "Investigating",
        body: "Customers in EU regions seeing elevated webhook delivery times. APIs are unaffected.",
      },
    ],
  },
  {
    date: "May 5, 2026",
    severity: "maintenance",
    title: "Scheduled SBC firmware update · ap-southeast-1",
    duration: "20 min · no impact",
    affected: ["Voice", "ap-southeast-1"],
    updates: [
      {
        at: "03:20 UTC",
        status: "Completed",
        body: "Firmware roll-out complete. No customer impact observed; the upgrade was hitless.",
      },
      {
        at: "03:00 UTC",
        status: "Maintenance start",
        body: "Beginning the scheduled SBC firmware update. Calls failover transparently across the cluster.",
      },
    ],
  },
  {
    date: "Apr 28, 2026",
    severity: "resolved",
    title: "SMS deliverability degraded · US T-Mobile",
    duration: "1h 14m",
    affected: ["Messaging · SMS", "Carrier: T-Mobile"],
    updates: [
      {
        at: "18:42 UTC",
        status: "Resolved",
        body: "Carrier confirmed remediation. Queued messages delivered within 8 minutes after recovery.",
      },
      {
        at: "17:56 UTC",
        status: "Identified",
        body: "Upstream issue confirmed by T-Mobile. We are queueing and retrying affected messages with backoff.",
      },
    ],
  },
]

export function StatusIncidents() {
  return (
    <section className="relative py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-2">
              Incidents · last 90 days
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
              Past incidents
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-white/50 hover:text-white"
          >
            View full history →
          </a>
        </div>

        <div className="relative">
          {/* Timeline rail */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

          <ol className="space-y-6">
            {incidents.map((inc, i) => {
              const meta = sevMeta[inc.severity]
              const Icon = meta.Icon
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative pl-12"
                >
                  {/* Dot */}
                  <span
                    className={`absolute left-0 top-2 w-10 h-10 rounded-full border ${meta.ring} flex items-center justify-center backdrop-blur-md z-10`}
                  >
                    <Icon className={`w-4 h-4 ${meta.tint}`} />
                  </span>

                  <div className="rounded-2xl border border-white/10 bg-[#0F1A2E]/50 backdrop-blur-md overflow-hidden">
                    <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/5">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${meta.ring} ${meta.tint}`}
                        >
                          {meta.label}
                        </span>
                        <span className="font-medium text-white">{inc.title}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-white/40">
                        <span>{inc.date}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>{inc.duration}</span>
                      </div>
                    </div>

                    <div className="px-5 py-3 flex flex-wrap items-center gap-1.5 border-b border-white/5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mr-1">
                        Affected:
                      </span>
                      {inc.affected.map((a) => (
                        <span
                          key={a}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-white/70"
                        >
                          {a}
                        </span>
                      ))}
                    </div>

                    <ol className="px-5 py-4 space-y-3">
                      {inc.updates.map((u, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 text-sm"
                        >
                          <span className="w-[64px] flex-shrink-0 font-mono text-[10px] text-white/40 uppercase tracking-wider pt-0.5">
                            {u.at}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-white/90 font-medium text-xs">
                              {u.status}
                            </div>
                            <p className="mt-0.5 text-xs text-[#9AA8BC] leading-relaxed">
                              {u.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
