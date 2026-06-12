'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Companies worldwide' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '14-day', label: 'Free trial' },
  { value: '24/7', label: 'Expert support' },
]

export function PricingCTA() {
  const links = [
    { label: 'UCaaS', href: '/products/ucaas' },
    { label: 'Contact Center', href: '/products/contact-center' },
    { label: 'AI Receptionist', href: '/features/ai-receptionist' },
    { label: 'Virtual Numbers', href: '/products/virtual-numbers' },
  ]

  return (
    <section className="relative py-28 bg-[#0B1220] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-[#046BD2]/12 rounded-full blur-[140px]"
          animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 16, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#0086F9]/8 rounded-full blur-[100px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Top separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-[#046BD2]/50 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div
                className="text-3xl sm:text-4xl font-bold mb-1"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #CCD6DF 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div className="text-[#757575] text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden text-center p-12 sm:p-16 border border-[#046BD2]/25 mb-16"
          style={{
            background: 'linear-gradient(135deg, rgba(4,107,210,0.12) 0%, rgba(255,255,255,0.03) 50%, rgba(0,134,249,0.08) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[2px] bg-gradient-to-r from-transparent via-[#046BD2]/70 to-transparent" />

          {/* Corner glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#046BD2]/8 rounded-full blur-[80px] -z-0" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#0086F9]/6 rounded-full blur-[60px] -z-0" />

          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[#046BD2] text-sm font-semibold uppercase tracking-widest mb-5"
            >
              Ready to get started?
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Start a{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #046BD2 0%, #0086F9 100%)' }}
              >
                no-pressure
              </span>{' '}
              conversation.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              viewport={{ once: true }}
              className="text-[#CCD6DF] text-base mb-10 max-w-lg mx-auto"
            >
              Try Rozper free for 14 days, or talk to our team to build a custom plan for your organization.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              viewport={{ once: true }}
              className="flex flex-row flex-wrap items-center justify-center gap-4"
            >
              <a
                href="/free-trial"
                className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-[#046BD2] text-white font-bold text-base rounded-xl transition-all duration-300 hover:bg-[#0078E0] group"
                style={{ boxShadow: '0 4px 24px rgba(4,107,210,0.35)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </a>
              <a
                href="https://rozper.com"
                className="inline-flex items-center gap-2 px-8 py-4 text-[#CCD6DF] font-semibold text-base rounded-xl border border-white/[0.1] hover:border-[#046BD2]/50 hover:text-white hover:bg-[#046BD2]/8 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Talk to Sales
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Related links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[#757575] text-sm mb-5">Explore the platform:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                viewport={{ once: true }}
                className="px-5 py-2 text-[#CCD6DF] hover:text-white text-sm font-medium border border-white/[0.08] hover:border-[#046BD2]/50 rounded-full transition-all duration-300 hover:bg-[#046BD2]/8"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
