"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const logos = [
  { name: "Tigo", src: "/images/logos/Tigo-partner.png" },
  { name: "T-Mobile", src: "/images/logos/TM.png" },
  { name: "China Mobile International", src: "/images/logos/china-mobile-partner.png" },
  { name: "PLDT", src: "/images/logos/PLDT.png" },
  { name: "Telekom Slovenije", src: "/images/logos/Telekom-Slovenije-partner.png" },
  { name: "Telin", src: "/images/logos/p6.webp" },
  { name: "MTT", src: "/images/logos/MTT-1.webp" },
  { name: "Reliance Communications", src: "/images/logos/reliance.png" },
]

const compliance = [
  "GDPR",
  "HIPAA-ready",
  "PCI-safe recording",
  "SOC-aligned controls",
  "ISO-aligned data handling",
]

export function TrustBar() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <section
      ref={ref}
      className="relative py-10 sm:py-12 overflow-hidden bg-[#070B14] border-y border-white/[0.04]"
    >
      {/* subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(4,107,210,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow + lead line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7"
        >
          <span className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 shrink-0">
            Trusted by global teams
          </span>
          <span className="text-xs text-[#9AA8BC]/70 text-right hidden sm:block">
            Operators, carriers, and growing businesses in 150+ countries
          </span>
        </motion.div>

        {/* Logo marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <motion.div
            className="flex items-center gap-14 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={`logo-${i}`}
                src={logo.src}
                alt={logo.name}
                className="h-6 sm:h-7 w-auto object-contain opacity-60 hover:opacity-90 transition-all duration-300 grayscale-[60%] hover:grayscale-0 shrink-0"
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="mt-8 border-t border-white/[0.05]" />

        {/* Compliance badges */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 flex flex-wrap gap-1.5 sm:gap-2 justify-center"
        >
          {compliance.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-white/45 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] hover:border-[#046BD2]/30 hover:text-white/70 transition-colors"
            >
              <span className="w-1 h-1 rounded-full bg-[#046BD2]/70 shrink-0" />
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
