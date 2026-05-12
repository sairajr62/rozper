"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import {
  TrendingUp,
  HeartPulse,
  Building2,
  Laptop,
  Shield,
  Users,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"

const industries = [
  {
    id: "sales",
    icon: TrendingUp,
    title: "Sales Teams",
    tagline: "Close more, dial less.",
    description:
      "AI-ranked queues, live coaching, and conversation intelligence on every call.",
    metrics: [
      { label: "Connect rate", value: "+38%" },
      { label: "Time per dial", value: "−47%" },
      { label: "Pipeline lift", value: "+2.1x" },
    ],
    capabilities: [
      "Power dialer",
      "AI coaching",
      "CRM sync",
      "Conversation IQ",
      "Local presence",
      "Whisper assist",
    ],
    accent: "from-[#046BD2] to-[#22D3EE]",
  },
  {
    id: "support",
    icon: Users,
    title: "Support Teams",
    tagline: "Every channel, one queue.",
    description:
      "Voice, chat, SMS, and social — routed by intent, deflected by AI when it should be.",
    metrics: [
      { label: "First-touch resolve", value: "+62%" },
      { label: "CSAT", value: "+18 pts" },
      { label: "Cost per case", value: "−34%" },
    ],
    capabilities: [
      "Omnichannel inbox",
      "AI agent assist",
      "SLA management",
      "Workforce analytics",
      "Knowledge surfacing",
      "Auto-deflection",
    ],
    accent: "from-[#0086F9] to-[#046BD2]",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    tagline: "HIPAA-grade, patient-friendly.",
    description:
      "Secure calling, fax, and messaging — purpose-built for clinics, hospitals, and tele-health.",
    metrics: [
      { label: "Show-up rate", value: "+24%" },
      { label: "No-shows", value: "−40%" },
      { label: "Audit readiness", value: "100%" },
    ],
    capabilities: [
      "HIPAA compliant",
      "Online fax",
      "Patient SMS",
      "Encrypted calls",
      "BAA included",
      "EHR sync",
    ],
    accent: "from-[#0078E0] to-[#22D3EE]",
  },
  {
    id: "finance",
    icon: Building2,
    title: "Finance",
    tagline: "PCI-safe, audit-ready.",
    description:
      "Compliance-first recording, redaction, and monitoring for regulated workflows.",
    metrics: [
      { label: "Compliance findings", value: "0" },
      { label: "Recording coverage", value: "100%" },
      { label: "Redaction accuracy", value: "99.6%" },
    ],
    capabilities: [
      "PCI-safe recording",
      "Live monitoring",
      "Immutable audit logs",
      "Field redaction",
      "Geo-fenced data",
      "MAR / SOX ready",
    ],
    accent: "from-[#046BD2] to-[#2575FC]",
  },
  {
    id: "remote",
    icon: Laptop,
    title: "Remote Teams",
    tagline: "One number. Anywhere.",
    description:
      "Local presence in 150+ countries with native mobile and desktop — without VPN gymnastics.",
    metrics: [
      { label: "Coverage", value: "150+" },
      { label: "Mobile uptime", value: "99.99%" },
      { label: "Activation", value: "<10 min" },
    ],
    capabilities: [
      "Local numbers",
      "Native mobile",
      "Desktop softphone",
      "Global routing",
      "BYO carrier",
      "eSIM support",
    ],
    accent: "from-[#22D3EE] to-[#046BD2]",
  },
  {
    id: "enterprise",
    icon: Shield,
    title: "Enterprise IT",
    tagline: "Boring on purpose.",
    description:
      "SSO, SCIM, RBAC, custom SLAs, dedicated tenancy — and a real human on call.",
    metrics: [
      { label: "Contracted uptime", value: "99.999%" },
      { label: "Mean time to resolve", value: "<14m" },
      { label: "Custom SLA", value: "Yes" },
    ],
    capabilities: [
      "SSO / SCIM",
      "RBAC",
      "Custom SLA",
      "Dedicated tenancy",
      "Private fabric",
      "Implementation team",
    ],
    accent: "from-[#2575FC] to-[#046BD2]",
  },
]

export function Industries() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeId, setActiveId] = useState(industries[0].id)

  const active = industries.find((i) => i.id === activeId)!

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 overflow-hidden bg-[#070B14]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(4,107,210,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 80%, rgba(34,211,238,0.10) 0%, transparent 60%)",
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
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-mono text-white/50">
            <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#0086F9]" />
            Industries
            <span className="w-6 h-px bg-gradient-to-l from-transparent to-[#0086F9]" />
          </div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]">
            Built for{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
              every team
            </span>
            , every industry
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#9AA8BC] leading-relaxed max-w-xl mx-auto">
            Specialized configurations tuned to your sector — without forking
            into a different product.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col gap-2"
          >
            {industries.map((industry) => {
              const isActive = industry.id === activeId
              return (
                <motion.button
                  key={industry.id}
                  onClick={() => setActiveId(industry.id)}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  className="relative group w-full text-left"
                >
                  {isActive && (
                    <motion.div
                      layoutId="industries-active"
                      className="absolute inset-0 rounded-2xl border border-[#22D3EE]/30 bg-gradient-to-r from-[#046BD2]/[0.12] to-transparent"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative flex items-center gap-3 p-4 rounded-2xl">
                    <div
                      className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? `bg-gradient-to-br ${industry.accent}`
                          : "bg-white/[0.04] border border-white/5"
                      }`}
                    >
                      <industry.icon
                        className={`w-4 h-4 ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`font-semibold text-sm transition-colors ${
                          isActive ? "text-white" : "text-white/70"
                        }`}
                      >
                        {industry.title}
                      </div>
                      <div className="text-xs text-white/40 truncate">
                        {industry.tagline}
                      </div>
                    </div>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-all ${
                        isActive
                          ? "text-[#22D3EE] opacity-100"
                          : "text-white/30 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8 relative"
          >
            <div
              className="absolute -inset-6 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(4,107,210,0.3) 0%, transparent 60%)",
                filter: "blur(50px)",
              }}
            />

            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/30 to-transparent">
              <div className="rounded-3xl bg-[#0A1020]/85 backdrop-blur-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="p-6 sm:p-8"
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${active.accent} flex items-center justify-center shadow-[0_0_30px_-5px_rgba(4,107,210,0.6)]`}
                        >
                          <active.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#22D3EE]" />
                            Tuned for {active.title.toLowerCase()}
                          </div>
                          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-1">
                            {active.tagline}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="mt-6 text-base text-[#9AA8BC] leading-relaxed max-w-2xl">
                      {active.description}
                    </p>

                    {/* Metrics */}
                    <div className="mt-7 grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                      {active.metrics.map((m) => (
                        <div key={m.label} className="bg-[#0A1020] px-4 py-4">
                          <div className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">
                            <span
                              className={`bg-gradient-to-br ${active.accent} bg-clip-text text-transparent`}
                            >
                              {m.value}
                            </span>
                          </div>
                          <div className="mt-1 text-[10px] uppercase tracking-widest font-mono text-white/40">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Capabilities */}
                    <div className="mt-7">
                      <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-white/40 mb-3">
                        Capabilities included
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {active.capabilities.map((c) => (
                          <span
                            key={c}
                            className="text-xs text-white/80 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
                      <p className="text-sm text-white/60">
                        Want a tailored walkthrough for {active.title.toLowerCase()}?
                      </p>
                      <a
                        href="#contact"
                        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#046BD2] hover:bg-[#0078E0] text-white font-medium text-sm transition-colors"
                      >
                        Book a {active.title.toLowerCase()} demo
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
