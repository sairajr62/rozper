'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CTAStripProps {
  title: string
  titleHighlight?: string
  subtitle: string
  primaryCTA?: {
    label: string
    href: string
  }
}

export function CTAStrip({
  title,
  titleHighlight,
  subtitle,
  primaryCTA = { label: 'Start a No-Pressure Conversation', href: '/contact' }
}: CTAStripProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0B1220] overflow-hidden relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden bg-[#070B14] border border-white/10 text-center px-5 py-12 sm:px-8 sm:py-20"
        >
          {/* Left arc glow */}
          <div
            className="hidden sm:block absolute -left-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none"
            aria-hidden
          >
            <motion.svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              style={{ filter: "blur(28px)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="100" cy="100" r="78" stroke="#22D3EE" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
              <circle cx="100" cy="100" r="54" stroke="#046BD2" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(40 100 100)" />
            </motion.svg>
          </div>

          {/* Right arc glow */}
          <div
            className="hidden sm:block absolute -right-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none"
            aria-hidden
          >
            <motion.svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              style={{ filter: "blur(28px)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="100" cy="100" r="78" stroke="#0086F9" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
              <circle cx="100" cy="100" r="54" stroke="#22D3EE" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(-40 100 100)" />
            </motion.svg>
          </div>

          {/* Faint background grid */}
          <div
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-6">
              {titleHighlight ? (
                <>
                  {title.split(titleHighlight)[0]}
                  <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">{titleHighlight}</span>
                  {title.split(titleHighlight)[1]}
                </>
              ) : (
                title
              )}
            </h2>
            <p className="text-xl text-[#CCD6DF] mb-10 max-w-2xl mx-auto">
              {subtitle}
            </p>
            <div className="flex justify-center">
              <Link
                href={primaryCTA.href}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#046BD2] hover:bg-[#0078E0] text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)]"
              >
                {primaryCTA.label}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
