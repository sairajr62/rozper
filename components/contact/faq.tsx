"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const items = [
  {
    q: "How fast will I hear back?",
    a: "47 seconds is our 30-day median. Worst case, we reply within 1 business hour during office hours, and the next morning otherwise.",
  },
  {
    q: "Can I get a custom quote before talking to anyone?",
    a: "Yes — pricing for committed-use deals, regional volume, and number portfolios is on our pricing page. For tailored terms, the form above puts you in touch with an SE in <1h.",
  },
  {
    q: "Do you support our procurement workflow?",
    a: "Yes. We&apos;ll fill out vendor security questionnaires, BAA/DPA paperwork, and respond to RFP/RFI documents on a 5-business-day SLA.",
  },
  {
    q: "I just need support, not sales.",
    a: "Existing customers: open a ticket from your dashboard, or email support@rozper.com. Premium plans get a dedicated Slack channel and a 15-minute SLA.",
  },
  {
    q: "Can I get a POC environment?",
    a: "Yes. Once we&apos;ve scoped your use case, a sandbox tenant with your numbers, credits, and webhooks pre-wired is live within 24 hours.",
  },
]

export function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
            FAQ
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Questions, asked often.
          </h2>
        </div>

        <div className="space-y-2">
          {items.map((it, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={it.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`rounded-xl border transition-colors ${
                  isOpen
                    ? "border-[#22D3EE]/40 bg-[#22D3EE]/[0.04]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between text-left p-5"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-medium text-white">{it.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/50 transition-transform ${
                      isOpen ? "rotate-180 text-[#22D3EE]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5 text-sm text-[#9AA8BC] leading-relaxed"
                  >
                    {it.a}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
