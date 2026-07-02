"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import {
  TrendingUp,
  Headphones,
  Globe2,
  Shield,
  BarChart2,
  Building,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"

const roles = [
  {
    icon: TrendingUp,
    title: "Sales teams",
    description: "Power dialer, AI coaching, CRM sync, and conversation intelligence.",
    tags: ["Power dialer", "AI coaching", "CRM sync", "Conv. IQ"],
    accent: "from-[#046BD2] to-[#0078E0]",
    href: "/solutions/sales-teams/",
  },
  {
    icon: Headphones,
    title: "Support teams",
    description: "Omnichannel inbox, AI agent assist, and SLA management.",
    tags: ["Omnichannel", "AI assist", "SLA mgmt"],
    accent: "from-[#0086F9] to-[#2575FC]",
    href: "/solutions/support-teams/",
  },
  {
    icon: Globe2,
    title: "Remote & hybrid teams",
    description: "Local numbers anywhere, full mobile app, 99.99% uptime.",
    tags: ["Local numbers", "Mobile app", "99.99% SLA"],
    accent: "from-[#22D3EE] to-[#046BD2]",
    href: "/solutions/remote-teams/",
  },
  {
    icon: Shield,
    title: "Enterprise IT",
    description: "SSO, SCIM, RBAC, custom SLA, and a dedicated implementation team.",
    tags: ["SSO / SCIM", "RBAC", "Custom SLA"],
    accent: "from-[#2575FC] to-[#046BD2]",
    href: "/solutions/enterprise-ucaas/",
  },
  {
    icon: BarChart2,
    title: "Operations & RevOps",
    description: "Call analytics, queue dashboards, exportable audit logs.",
    tags: ["Analytics", "Dashboards", "Audit logs"],
    accent: "from-[#046BD2] to-[#22D3EE]",
    href: "/features/supervisor-tools/",
  },
  {
    icon: Building,
    title: "Founders & SMB owners",
    description: "One bill, one platform, one number to call when you need help.",
    tags: ["One bill", "One platform", "Real support"],
    accent: "from-[#0078E0] to-[#0086F9]",
    href: "/solutions/small-business/",
  },
]

function usePerView() {
  const [perView, setPerView] = useState(3)
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3)
    }
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [])
  return perView
}

export function Roles() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const perView = usePerView()
  const maxIndex = Math.max(0, roles.length - perView)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // keep index in range when the viewport (perView) changes
  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, roles.length - perView)))
  }, [perView])

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1))
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1))

  // auto-advance, paused on hover
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1))
    }, 4500)
    return () => clearInterval(id)
  }, [paused, maxIndex, index])

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-[#0A1020]"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(4,107,210,0.15) 0%, transparent 60%)",
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
            Built for Your Team
            <span className="w-6 h-px bg-gradient-to-l from-transparent to-[#0086F9]" />
          </div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]">
            Tools that fit how your team{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
              actually works.
            </span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="flex items-center gap-2 sm:gap-4"
        >
          {/* Prev */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="group hidden shrink-0 sm:flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/70 backdrop-blur-md transition-all hover:border-[#22D3EE]/50 hover:text-white hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.6)]"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Viewport */}
          <div className="flex-1 overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${index * (100 / perView)}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 34 }}
            >
              {roles.map((role) => {
                const Icon = role.icon
                return (
                  <div
                    key={role.title}
                    className="shrink-0 px-2 py-2 sm:px-3 sm:py-3"
                    style={{ width: `${100 / perView}%` }}
                  >
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-[#101A2E] to-[#0A1020] p-7 text-center transition-transform duration-300 hover:-translate-y-1.5">
                      {/* accent orb */}
                      <div
                        className={`absolute -top-16 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-gradient-to-br ${role.accent} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40`}
                      />

                      {/* icon badge */}
                      <div
                        className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${role.accent} shadow-[0_0_40px_-8px_rgba(4,107,210,0.6)]`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>

                      {/* title + underline accent */}
                      <h3 className="relative mt-6 font-display text-xl sm:text-2xl font-semibold tracking-tight text-white">
                        {role.title}
                      </h3>
                      <div
                        className={`mx-auto mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r ${role.accent}`}
                      />

                      {/* description */}
                      <p className="relative mt-4 text-sm leading-relaxed text-[#9AA8BC]">
                        {role.description}
                      </p>

                      {/* tags */}
                      <div className="relative mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
                        {role.tags.map((tag, ti) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.14em] text-white/45"
                          >
                            {ti > 0 && (
                              <span className="h-1 w-1 rounded-full bg-[#22D3EE]/50" />
                            )}
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* learn more */}
                      <a
                        href={role.href}
                        className="relative mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:border-[#22D3EE]/50 hover:text-white"
                      >
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="group hidden shrink-0 sm:flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/70 backdrop-blur-md transition-all hover:border-[#22D3EE]/50 hover:text-white hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.6)]"
          >
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>

        {/* Page dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-7 bg-gradient-to-r from-[#22D3EE] to-[#046BD2]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
