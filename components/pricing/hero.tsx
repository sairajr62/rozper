'use client'

import { motion } from 'framer-motion'
import { Shield, Globe, Clock, Zap } from 'lucide-react'

export function PricingHero() {
  const trustIndicators = [
    { icon: Shield, label: '99.99% Uptime' },
    { icon: Globe, label: '150+ Countries' },
    { icon: Clock, label: '24/7 Expert Support' },
    { icon: Zap, label: 'Risk-Free Trial' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#0B1220]">
      {/* Dot grid */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(4,107,210,0.14) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-1/4 w-[650px] h-[650px] bg-[#046BD2]/18 rounded-full blur-[130px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.32, 0.18], x: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/5 w-[500px] h-[500px] bg-[#0086F9]/12 rounded-full blur-[110px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.28, 0.15], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#046BD2]/10 border border-[#046BD2]/30 rounded-full text-sm font-medium text-[#0086F9] mb-8"
        >
          <span className="w-2 h-2 bg-[#0086F9] rounded-full animate-pulse" />
          Transparent Pricing — No Surprises
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight"
        >
          Simple pricing.{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #046BD2 0%, #0086F9 60%, #2575FC 100%)' }}
          >
            Serious
          </span>{' '}
          features.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#CCD6DF] mb-4 max-w-2xl mx-auto leading-relaxed"
        >
          One plan to start. Scale when you&apos;re ready. No long-term contracts.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-base text-[#757575] mb-10 max-w-xl mx-auto"
        >
          Most UCaaS platforms hide their pricing. Rozper starts at $9.99 per user — calling, AI, video, SMS, and CRM sync from day one.
        </motion.p>

        {/* Price callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="inline-flex items-baseline gap-2 mb-10 px-4 py-4 sm:px-8 sm:py-5 rounded-2xl bg-[#046BD2]/8 border border-[#046BD2]/20"
          style={{ boxShadow: '0 0 50px rgba(4,107,210,0.12), inset 0 1px 0 rgba(255,255,255,0.05)' }}
        >
          <span className="text-5xl sm:text-7xl font-bold text-white tracking-tight">$9.99</span>
          <div className="flex flex-col items-start">
            <span className="text-[#CCD6DF] text-sm sm:text-base font-medium whitespace-nowrap">per user</span>
            <span className="text-[#757575] text-xs sm:text-sm whitespace-nowrap">per month</span>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {trustIndicators.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.52 + i * 0.07 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-full backdrop-blur-sm hover:border-[#046BD2]/40 hover:bg-white/[0.06] transition-all duration-300"
            >
              <Icon className="w-4 h-4 text-[#046BD2]" />
              <span className="text-sm text-[#CCD6DF]">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58 }}
          className="flex flex-row flex-wrap items-center justify-center gap-4"
        >
          <a href="/free-trial" className="relative overflow-hidden whitespace-nowrap px-8 py-4 bg-[#046BD2] text-white font-bold text-base rounded-xl transition-all duration-300 hover:bg-[#0078E0] group"
            style={{ boxShadow: '0 0 0 0 rgba(4,107,210,0.4)' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(4,107,210,0.45)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 0 rgba(4,107,210,0.4)')}
          >
            <span className="relative z-10">Start Free Trial — No Card Required</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </a>
          <a
            href="#pricing-plans"
            className="px-6 py-4 text-[#CCD6DF] font-medium hover:text-white transition-all duration-300 border border-white/[0.1] rounded-xl hover:border-white/[0.22] hover:bg-white/[0.03]"
          >
            See Full Plan ↓
          </a>
        </motion.div>
      </div>
    </section>
  )
}
