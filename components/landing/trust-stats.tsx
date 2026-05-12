"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, Activity } from "lucide-react"

const rowOne = [
  {
    tag: "SaaS",
    metric: "385%",
    metricLabel: "Faster lead response",
    company: "Northwind Cloud",
    accent: "from-[#046BD2] to-[#0086F9]",
  },
  {
    tag: "Healthcare",
    metric: "62%",
    metricLabel: "Higher patient reach",
    company: "Meridian Health Group",
    accent: "from-[#0078E0] to-[#2D98F1]",
  },
  {
    tag: "Contact Center",
    metric: "2.4x",
    metricLabel: "Voice throughput",
    company: "Helio Support",
    accent: "from-[#2575FC] to-[#046BD2]",
  },
  {
    tag: "Real Estate",
    metric: "41%",
    metricLabel: "Pipeline growth",
    company: "Harbor & Vine Realty",
    accent: "from-[#046BD2] to-[#2D98F1]",
  },
]

const rowTwo = [
  {
    tag: "Financial",
    metric: "99.999%",
    metricLabel: "Audited uptime",
    company: "Crestline Capital",
    accent: "from-[#0086F9] to-[#2575FC]",
  },
  {
    tag: "Logistics",
    metric: "+28pts",
    metricLabel: "CSAT improvement",
    company: "Tideway Freight",
    accent: "from-[#2D98F1] to-[#046BD2]",
  },
  {
    tag: "Education",
    metric: "73%",
    metricLabel: "Faster student response",
    company: "Linden Academy",
    accent: "from-[#046BD2] to-[#0078E0]",
  },
  {
    tag: "Hospitality",
    metric: "3.1x",
    metricLabel: "Booking conversion",
    company: "Argent Hotels",
    accent: "from-[#2D98F1] to-[#2575FC]",
  },
]

const headlineStats = [
  { value: "150+", label: "Countries served" },
  { value: "300+", label: "Native integrations" },
  { value: "24/7", label: "Live engineer NOC" },
  { value: "99.999%", label: "Contracted uptime" },
]

type Card = (typeof rowOne)[number]

function OutcomeCard({ data }: { data: Card }) {
  return (
    <article className="relative group w-[260px] sm:w-[300px] shrink-0 rounded-2xl border border-[#1A2638] bg-[#0E1626]/80 backdrop-blur-xl p-5 overflow-hidden transition-colors hover:border-[#046BD2]/40">
      <span
        className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${data.accent} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity duration-500`}
      />

      <div className="relative flex items-center justify-between">
        <span className="inline-flex text-[10px] tracking-[0.18em] font-semibold uppercase text-[#CCD6DF] bg-white/[0.05] border border-white/10 rounded px-2 py-1">
          {data.tag}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#046BD2]" style={{ boxShadow: "0 0 8px rgba(4,107,210,0.8)" }} />
      </div>

      <p
        className={`mt-5 font-display font-bold text-4xl tracking-tight bg-gradient-to-br ${data.accent} bg-clip-text text-transparent leading-none`}
        style={{ textShadow: "0 0 24px rgba(4, 107, 210, 0.18)" }}
      >
        {data.metric}
      </p>
      <p className="mt-2 text-sm text-[#CCD6DF] font-medium">{data.metricLabel}</p>

      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-[#CCD6DF]/70 truncate">{data.company}</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#CCD6DF]/40 group-hover:text-[#0086F9] transition-colors" />
      </div>
    </article>
  )
}

export function TrustStats() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative py-20 overflow-hidden bg-[#0B1220]" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(4, 107, 210, 0.10) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 15% 90%, rgba(37, 117, 252, 0.07) 0%, transparent 55%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — compact, two-column at lg */}
        <div className="grid lg:grid-cols-12 gap-8 lg:items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#046BD2]/30 bg-[#046BD2]/5 mb-5">
              <Activity className="w-3 h-3 text-[#046BD2]" />
              <span className="text-xs font-medium text-[#046BD2] tracking-wide">Customer Outcomes</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight leading-[1.08]">
              Outcomes our customers{" "}
              <span
                className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent"
                style={{ textShadow: "0 0 30px rgba(4, 107, 210, 0.3)" }}
              >
                put on the board
              </span>
            </h2>

            <p className="mt-4 text-base text-[#CCD6DF]/85 max-w-xl">
              Real metrics from real Rozper deployments — no rounded-up averages, no anonymous logos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-2 gap-px bg-white/[0.06] rounded-xl overflow-hidden border border-white/[0.06]"
          >
            {headlineStats.map((s) => (
              <div key={s.label} className="bg-[#0B1220]/70 px-4 py-3">
                <p className="font-display text-xl font-bold bg-gradient-to-br from-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-[11px] text-[#CCD6DF]/60 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Auto-scrolling marquee — two rows, opposing directions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5"
        >
          <div className="rozper-marquee relative">
            <div className="rozper-marquee-track flex gap-5 py-1" data-direction="left">
              {[...rowOne, ...rowOne].map((data, i) => (
                <OutcomeCard key={`r1-${data.company}-${i}`} data={data} />
              ))}
            </div>
          </div>

          <div className="rozper-marquee relative">
            <div className="rozper-marquee-track flex gap-5 py-1" data-direction="right">
              {[...rowTwo, ...rowTwo].map((data, i) => (
                <OutcomeCard key={`r2-${data.company}-${i}`} data={data} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .rozper-marquee {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
        }
        .rozper-marquee-track {
          width: max-content;
          animation: rozper-scroll-left 38s linear infinite;
        }
        .rozper-marquee-track[data-direction="right"] {
          animation: rozper-scroll-right 44s linear infinite;
        }
        .rozper-marquee:hover .rozper-marquee-track {
          animation-play-state: paused;
        }
        @keyframes rozper-scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes rozper-scroll-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .rozper-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
