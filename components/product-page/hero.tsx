'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface ProductHeroProps {
  badge?: string
  title: string
  titleHighlight?: string
  subtitle: string
  hook: string
  primaryCTA?: {
    label: string
    href: string
  }
  stats?: { label: string; value: string }[]
}

export function ProductHero({
  badge,
  title,
  titleHighlight,
  subtitle,
  hook,
  primaryCTA = { label: 'Start a No-Pressure Conversation', href: '/contact' },
  stats
}: ProductHeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20 bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#046BD2]/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#0086F9]/15 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {badge && (
            <div className="mb-6 inline-block">
              <motion.div
                className="px-4 py-2 rounded-full border border-[#046BD2]/30 bg-[#046BD2]/5 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-sm font-medium text-[#046BD2]">{badge}</span>
              </motion.div>
            </div>
          )}

          <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] text-balance">
            {titleHighlight ? (
              <>
                {title.split(titleHighlight)[0]}
                <span className="text-[#046BD2]">{titleHighlight}</span>
                {title.split(titleHighlight)[1]}
              </>
            ) : (
              title
            )}
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-[#CCD6DF] mb-6 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <p className="text-lg text-[#757575] mb-10 max-w-3xl mx-auto leading-relaxed">
            {hook}
          </p>

          {stats && (
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#0C0D0E] backdrop-blur-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <span className="text-[#046BD2]">&#10003;</span>
                  <span className="text-[#CCD6DF] text-sm">{stat.value} {stat.label}</span>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <Link
              href={primaryCTA.href}
              className="px-8 py-4 bg-[#046BD2] hover:bg-[#046BD2]/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#046BD2]/50"
            >
              {primaryCTA.label}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
