"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export function AboutStory() {
  return (
    <section
      id="story"
      className="relative py-20 sm:py-28 border-t border-white/5"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: title */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
                Why we built Rozper
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-white tracking-tight leading-[1.1]">
                The comms stack was{" "}
                <span className="bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
                  broken.
                </span>{" "}
                Nobody had fixed it from the carrier up.
              </h2>
              <p className="mt-5 text-[#9AA8BC] leading-relaxed">
                In 2018 our founders were running a 4,000-seat call center
                operation. Five vendors, three TLDs of dashboards, four
                separate bills, and an SLA that read like a horoscope. So they
                started building.
              </p>
            </div>
          </div>

          {/* Right: longer prose */}
          <div className="lg:col-span-7 space-y-6 text-[15px] sm:text-base text-[#CCD6DF] leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              The market told us the answer was a &ldquo;CPaaS&rdquo; — an API
              for the carrier you couldn&apos;t see, a contact center you
              still had to bolt on, an AI layer rented from yet another
              vendor. Three boxes. Three contracts. Three places where
              something could break and nobody owned it.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              We took the other path. We built our own carrier interconnects
              first, then the UCaaS layer on top, then the contact center, then
              the AI. One platform. One bill. One pager who answers the phone
              at 3am.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Eight years on, that thesis hasn&apos;t aged. Rozper powers
              communications for thousands of teams in 150+ countries — from
              two-person startups answering their first call with an AI
              receptionist, to global contact centers placing a quarter of a
              billion minutes a month.
            </motion.p>

            {/* Founder pullquote */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative mt-10 rounded-2xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/30 to-transparent"
            >
              <div className="rounded-2xl bg-[#0A1020]/90 backdrop-blur-md p-6 sm:p-8">
                <Quote className="w-7 h-7 text-[#22D3EE]/70" />
                <p className="mt-4 font-display text-xl sm:text-2xl text-white leading-snug tracking-tight">
                  &ldquo;We don&apos;t want to be the most exciting telecom
                  company on earth. We want to be the one you forget is even
                  there — because every call just works.&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-[#0B1220] flex items-center justify-center font-mono text-[11px] font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(200 70% 45%), hsl(220 80% 55%))",
                    }}
                  >
                    MC
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      Marcus Chen
                    </div>
                    <div className="text-xs text-white/45 font-mono uppercase tracking-widest">
                      Co-founder & CEO
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
