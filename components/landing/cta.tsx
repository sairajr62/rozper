"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, CheckCircle2, Sparkles, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  "99.999% uptime",
  "150+ countries",
  "24/7 expert support",
  "Risk-free trial",
]

export function CTA() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [count, setCount] = useState(2_412_034)
  useEffect(() => {
    const id = setInterval(
      () => setCount((c) => c + Math.floor(Math.random() * 14) + 3),
      1000,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 overflow-hidden bg-[#070B14]"
    >
      {/* Mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full opacity-40"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 50%, rgba(4,107,210,0) 0deg, rgba(4,107,210,0.4) 90deg, rgba(34,211,238,0.2) 180deg, rgba(4,107,210,0) 360deg)",
            filter: "blur(80px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/40 to-transparent shadow-[0_30px_120px_-30px_rgba(4,107,210,0.6)]"
        >
          <div className="relative rounded-3xl bg-[#0A1020]/85 backdrop-blur-2xl overflow-hidden">
            {/* glow orb */}
            <div
              className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(34,211,238,0.5) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-25 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(4,107,210,0.6) 0%, transparent 70%)",
              }}
            />

            <div className="relative p-8 sm:p-12 lg:p-16 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-3.5 py-1.5 text-xs sm:text-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-white/90 font-medium tracking-wide tabular-nums">
                  Live · {count.toLocaleString()} calls today
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-white/50 border-l border-white/10 pl-2.5">
                  <Sparkles className="w-3 h-3 text-[#22D3EE]" />
                  Ready in &lt;14 days
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display mt-7 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]"
              >
                Start a{" "}
                <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                  no-pressure
                </span>{" "}
                conversation.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 text-base sm:text-lg text-[#9AA8BC] max-w-xl mx-auto leading-relaxed"
              >
                See how Rozper fits into your stack in 30 minutes. 14-day free
                trial. No credit card. No deck.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="relative h-14 px-7 text-base bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold rounded-xl overflow-hidden group shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)]"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      animate={{ x: ["-150%", "150%"] }}
                      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.5 }}
                    />
                    <span className="relative flex items-center gap-2">
                      Book a 30-min call
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-7 text-base rounded-xl border-white/10 bg-white/[0.03] hover:bg-white/10 text-white hover:text-white backdrop-blur-md"
                  >
                    <Phone className="mr-2 w-4 h-4" />
                    Talk to sales
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center"
              >
                {benefits.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-white/50"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3EE]" />
                    {b}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
