'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface RelatedLink {
  title: string
  description: string
  href: string
}

interface RelatedLinksProps {
  title?: string
  subtitle?: string
  links: RelatedLink[]
}

export function RelatedLinks({ title = 'Related Products', subtitle, links }: RelatedLinksProps) {
  return (
    <section className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-[1160px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-bold text-white tracking-[-0.015em] leading-[1.2]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base text-[#CCD6DF] max-w-2xl mx-auto leading-[1.75]">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                href={link.href}
                className="group block p-6 bg-white/[0.03] border border-[#0C0D0E] rounded-lg hover:border-[#046BD2]/30 hover:bg-white/[0.05] transition-all duration-300 h-full focus:outline-none focus:ring-2 focus:ring-[#046BD2]/50 focus:ring-offset-2 focus:ring-offset-black"
              >
                <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-[#046BD2] transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-[#CCD6DF] mb-4 leading-relaxed">{link.description}</p>
                <span className="inline-flex items-center gap-1.5 text-[#046BD2] text-sm font-medium group-hover:text-[#0078E0] transition-colors">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
