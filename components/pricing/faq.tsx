'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'Is there an annual discount?',
    answer: 'Yes. Annual billing saves 20% compared to monthly — that\'s $7.99/user/month instead of $9.99. Contact us for a quote on your team size.',
  },
  {
    question: 'What happens after the 14-day trial?',
    answer: 'Your account moves to the plan you chose. No automatic charges — you confirm before billing starts. We\'ll remind you 3 days before the trial ends.',
  },
  {
    question: 'Can I mix plans across my team?',
    answer: 'Yes. Assign different seats to different plan tiers. Pay only for what each team member actually needs — no forcing everyone onto the same level.',
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No setup fee on the Basic plan. Enterprise implementations may include a one-time onboarding fee — always included upfront in your custom quote, never added later.',
  },
  {
    question: 'Do you offer volume discounts?',
    answer: 'Yes. Teams of 25+ receive volume pricing. The bigger your team, the better the rate. Contact us for a custom quote at rozper.com.',
  },
]

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative py-24 bg-[#0B1220] overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#046BD2] text-sm font-semibold uppercase tracking-widest mb-4">Got questions?</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently asked
          </h2>
          <p className="text-[#757575] text-base">Everything you need to know before you sign up.</p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl border transition-all duration-300 overflow-hidden"
                  style={{
                    borderColor: isOpen ? 'rgba(4,107,210,0.4)' : 'rgba(255,255,255,0.07)',
                    background: isOpen
                      ? 'linear-gradient(135deg, rgba(4,107,210,0.08) 0%, rgba(255,255,255,0.03) 100%)'
                      : 'rgba(255,255,255,0.025)',
                    boxShadow: isOpen ? '0 0 30px rgba(4,107,210,0.08)' : 'none',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className="text-xs font-bold tabular-nums flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isOpen ? '#046BD2' : 'rgba(4,107,210,0.12)',
                          color: isOpen ? 'white' : '#046BD2',
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-semibold text-white text-base leading-snug">{faq.question}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="flex-shrink-0"
                    >
                      {isOpen
                        ? <Minus className="w-5 h-5 text-[#046BD2]" />
                        : <Plus className="w-5 h-5 text-[#757575] group-hover:text-[#046BD2] transition-colors duration-200" />
                      }
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pl-16 text-[#CCD6DF] text-sm leading-relaxed border-t border-white/[0.05] pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-[#757575] text-sm">
            Still have questions?{' '}
            <a href="https://rozper.vercel.app/" className="text-[#046BD2] hover:text-[#0086F9] font-semibold transition-colors duration-200">
              Talk to our team →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
