"use client"

import { motion } from "framer-motion"

const milestones = [
  {
    year: "2018",
    label: "Founded",
    body: "Marcus Chen and Priya Subramanian start Rozper in a four-person room in SoMa, San Francisco. First carrier interconnect signed inside 90 days.",
  },
  {
    year: "2019",
    label: "Series A · $14M",
    body: "Led by Hexa Ventures. First 100 customers. SIP trunking and DID inventory across the US, UK, and Singapore.",
  },
  {
    year: "2020",
    label: "Contact Center launch",
    body: "Native CCaaS goes GA. Through the pandemic, we onboard 8,000 remote agents in 60 days for two enterprise customers.",
  },
  {
    year: "2021",
    label: "Series B · $48M",
    body: "Led by Greylight Partners. EU region opens in Frankfurt. Wholesale Voice product line launches. 1B annual minutes.",
  },
  {
    year: "2023",
    label: "Series C · $120M",
    body: "Led by Aperture Capital. APAC region online in Singapore. SOC 2 Type II, ISO 27001, HIPAA-ready packs published.",
  },
  {
    year: "2024",
    label: "AI Receptionist · Conv. IQ",
    body: "First production-grade AI features land on the platform — no second login, no second vendor, no second invoice.",
  },
  {
    year: "2026",
    label: "Where we are now",
    body: "240+ Rozpernauts. 150+ countries. $140M ARR run-rate. Profitable for nine consecutive quarters.",
  },
]

export function AboutTimeline() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[480px] h-[480px] bg-[#046BD2]/[0.10] blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
            Our story
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-white tracking-tight leading-[1.1]">
            Eight years.{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
              One platform.
            </span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical rail */}
          <div className="absolute left-[19px] sm:left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

          <ul className="space-y-10">
            {milestones.map((m, i) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="relative pl-14 sm:pl-20"
              >
                {/* Node */}
                <span className="absolute left-0 top-0 flex items-center justify-center">
                  <span className="relative w-10 h-10 sm:w-[54px] sm:h-[54px] rounded-full bg-gradient-to-br from-[#22D3EE] to-[#046BD2] shadow-[0_0_25px_-4px_rgba(34,211,238,0.55)] flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold text-white tracking-wider">
                    {m.year}
                  </span>
                </span>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-5 sm:p-6">
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <div className="font-display text-lg sm:text-xl font-semibold text-white tracking-tight">
                      {m.label}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/35">
                      {m.year}
                    </div>
                  </div>
                  <p className="mt-2.5 text-sm sm:text-[15px] text-[#9AA8BC] leading-relaxed">
                    {m.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
