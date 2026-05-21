"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 overflow-hidden bg-[#0B1220]"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden bg-[#070B14] border border-white/10"
        >
          {/* Left arc glow */}
          <div
            className="absolute -left-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none"
            aria-hidden
          >
            <motion.svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              style={{ filter: "blur(28px)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="100"
                cy="100"
                r="78"
                stroke="#22D3EE"
                strokeOpacity="0.55"
                strokeWidth="24"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="180 320"
              />
              <circle
                cx="100"
                cy="100"
                r="54"
                stroke="#046BD2"
                strokeOpacity="0.5"
                strokeWidth="16"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="130 240"
                transform="rotate(40 100 100)"
              />
            </motion.svg>
          </div>

          {/* Right arc glow (mirrored) */}
          <div
            className="absolute -right-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none"
            aria-hidden
          >
            <motion.svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              style={{ filter: "blur(28px)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="100"
                cy="100"
                r="78"
                stroke="#0086F9"
                strokeOpacity="0.55"
                strokeWidth="24"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="180 320"
              />
              <circle
                cx="100"
                cy="100"
                r="54"
                stroke="#22D3EE"
                strokeOpacity="0.5"
                strokeWidth="16"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="130 240"
                transform="rotate(-40 100 100)"
              />
            </motion.svg>
          </div>

          {/* Faint background grid */}
          <div
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)",
            }}
          />

          {/* Content */}
          <div className="relative px-6 py-16 sm:py-20 lg:py-24 text-center">
            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.025em] leading-[1.05]"
            >
              Start a{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                no-pressure
              </span>{" "}
              conversation.
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-[#9AA8BC] max-w-xl mx-auto leading-relaxed"
            >
              See how Rozper fits into your stack in 30 minutes. 14-day free
              trial. No credit card. No deck.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="relative w-full sm:w-auto h-14 px-8 text-base bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold rounded-xl overflow-hidden group shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)]"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                    animate={{ x: ["-150%", "150%"] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      repeatDelay: 2.5,
                    }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    Start a free trial
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 text-base rounded-xl border-white/15 bg-white/[0.04] hover:bg-white/10 text-white hover:text-white backdrop-blur-md group justify-center"
                >
                  <Link href="/pricing">
                    See pricing
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
