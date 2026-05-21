"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const stats = [
  { v: "47s", l: "First response time" },
  { v: "98%", l: "Same-day quote rate" },
  { v: "24h", l: "POC environment SLA" },
  { v: "4.9 / 5", l: "Sales experience CSAT" },
]

export function ContactTestimonial() {
  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F1A2E] via-[#0B1220] to-[#0F1A2E] overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#046BD2]/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12">
            <div className="md:col-span-7">
              <Quote className="w-9 h-9 text-[#22D3EE]/40" />
              <p className="mt-5 font-display text-2xl md:text-3xl font-bold text-white leading-snug">
                &ldquo;Our SE quoted us, sent the BAA, and had a POC environment
                live in our test workspace — all before our incumbent vendor
                replied to email.&rdquo;
              </p>
              <div className="mt-7 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#046BD2] flex items-center justify-center font-display font-bold text-white">
                  MT
                </div>
                <div>
                  <div className="font-medium text-white">Maya Tan</div>
                  <div className="text-xs text-white/50">
                    VP of Engineering · Aperture Health
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 grid grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5 self-center">
              {stats.map((s) => (
                <div key={s.l} className="bg-[#0A1020] px-5 py-5">
                  <div className="font-display text-2xl font-bold bg-gradient-to-br from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent tabular-nums">
                    {s.v}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest font-mono text-white/40 mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
