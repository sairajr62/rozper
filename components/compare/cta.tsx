"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Wrench, Headset, ShieldCheck } from "lucide-react"

/**
 * Final CTA — "we'll cover your switch" message. Uses a flowing SVG curve
 * to enter the section and an asymmetric two-column layout: copy on the
 * left, three migration commitments on the right as blob lozenges.
 */
export function CompareCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Curved SVG divider entering from the prior section */}
      <svg
        aria-hidden
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-20 sm:h-28"
      >
        <defs>
          <linearGradient id="cta-divider" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0B1220" />
            <stop offset="100%" stopColor="#0B1220" />
          </linearGradient>
        </defs>
        <path
          d="M 0 0 C 240 120 480 120 720 60 C 960 0 1200 0 1440 100 L 1440 120 L 0 120 Z"
          fill="url(#cta-divider)"
        />
      </svg>

      <div className="relative bg-[#0B1220] py-20 lg:py-28">
        {/* ambient blobs */}
        <motion.div
          aria-hidden
          className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] opacity-40"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 50%, rgba(4,107,210,0) 0deg, rgba(4,107,210,0.5) 90deg, rgba(34,211,238,0.30) 180deg, rgba(4,107,210,0) 360deg)",
            filter: "blur(100px)",
            borderRadius: "62% 38% 49% 51% / 53% 41% 59% 47%",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Switch promise · 2026
              </div>
              <h2 className="font-display mt-6 text-3xl sm:text-4xl lg:text-[3.25rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]">
                Already locked into a contract?{" "}
                <span className="bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
                  We&rsquo;ll buy you out.
                </span>
              </h2>
              <p className="mt-5 text-[#B8C4D4] text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                Rozper credits the remaining months of your current
                contract — up to $25,000 — when you migrate 25+ seats. White-glove
                porting, dual-running, and a dedicated launch engineer come standard.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/demo"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm sm:text-base font-semibold px-7 py-3.5 transition-colors shadow-[0_10px_40px_-10px_rgba(4,107,210,0.7)]"
                >
                  Book a migration call
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 backdrop-blur-md text-white text-sm sm:text-base font-medium px-7 py-3.5 transition-colors"
                >
                  See Rozper plans
                </Link>
              </div>

              <p className="mt-5 text-[11px] font-mono uppercase tracking-[0.16em] text-white/35">
                Eligible plans: Professional + Enterprise · subject to credit cap & contract verification
              </p>
            </motion.div>

            {/* Three commitments — asymmetric blob lozenges, not boxes */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <Commitment
                icon={Wrench}
                title="White-glove porting"
                body="Number portability handled end-to-end. Average 7-day port-in, zero call drop."
                delay={0.1}
                tone="4,107,210"
                shape="48px 16px 48px 16px"
              />
              <Commitment
                icon={Headset}
                title="Dedicated launch engineer"
                body="A real human shipping integrations, dial plans, and CRM sync — not a ticket queue."
                delay={0.2}
                tone="34,211,238"
                shape="16px 48px 16px 48px"
              />
              <Commitment
                icon={ShieldCheck}
                title="Dual-running grace period"
                body="Run Rozper alongside your existing platform for 30 days — at no extra charge — until you're cutover-ready."
                delay={0.3}
                tone="168,85,247"
                shape="48px 16px 48px 16px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Commitment({
  icon: Icon,
  title,
  body,
  delay,
  tone,
  shape,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
  delay: number
  tone: string
  shape: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="relative"
    >
      <div
        className="relative p-5 sm:p-6 flex items-start gap-4 backdrop-blur-md"
        style={{
          borderRadius: shape,
          background: `linear-gradient(135deg, rgba(${tone},0.10) 0%, rgba(255,255,255,0.02) 100%)`,
          border: `1px solid rgba(${tone},0.22)`,
          boxShadow: `0 20px 60px -25px rgba(${tone},0.45)`,
        }}
      >
        <div
          className="shrink-0 w-11 h-11 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, rgba(${tone},0.32) 0%, rgba(${tone},0.10) 100%)`,
            border: `1px solid rgba(${tone},0.40)`,
            borderRadius: "55% 45% 60% 40% / 50% 55% 45% 50%",
          }}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-base font-semibold text-white tracking-[-0.01em]">
            {title}
          </div>
          <p className="mt-1 text-sm text-[#B8C4D4] font-light leading-relaxed">
            {body}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
