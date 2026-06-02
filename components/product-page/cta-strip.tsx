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
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#070707] overflow-hidden relative">
      {/* Background gradient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-[#046BD2]/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-[#0086F9]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-6">
            {titleHighlight ? (
              <>
                {title.split(titleHighlight)[0]}
                <span className="text-[#046BD2]">{titleHighlight}</span>
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
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#046BD2] hover:bg-[#046BD2]/90 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-[#046BD2]/30 hover:shadow-[#046BD2]/50"
            >
              {primaryCTA.label}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
