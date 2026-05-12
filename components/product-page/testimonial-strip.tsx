'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

interface TestimonialStripProps {
  quote: string
  author: string
  title: string
  company: string
}

export function TestimonialStrip({ quote, author, title, company }: TestimonialStripProps) {
  return (
    <section className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#046BD2]/10 mb-8">
            <Quote className="w-6 h-6 text-[#046BD2]" />
          </div>
          
          <blockquote className="font-display text-xl sm:text-2xl font-medium text-white leading-relaxed mb-8">
            &ldquo;{quote}&rdquo;
          </blockquote>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#046BD2]/20 flex items-center justify-center">
              <span className="text-[#046BD2] font-semibold text-lg">
                {author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">{author}</p>
              <p className="text-sm text-[#CCD6DF]">{title}, {company}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
