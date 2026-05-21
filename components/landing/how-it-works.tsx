"use client"

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion"
import { useRef } from "react"
import {
  MessageCircle,
  Settings,
  TrendingUp,
  ArrowRight,
  Check,
} from "lucide-react"

const steps = [
  {
    number: "01",
    duration: "30 minutes",
    icon: MessageCircle,
    title: "A no-pressure conversation.",
    description:
      "We listen. We learn your setup, your challenges, and your goals. No scripted sales pitch.",
    bullets: ["Discovery call", "Stack audit", "Outcome mapping"],
  },
  {
    number: "02",
    duration: "5–10 business days",
    icon: Settings,
    title: "Structured onboarding.",
    description:
      "A dedicated team handles migration, number porting, integrations, and training. Most teams are live in days, not weeks.",
    bullets: ["Number porting", "CRM sync", "Routing & IVR build"],
  },
  {
    number: "03",
    duration: "Ongoing",
    icon: TrendingUp,
    title: "Ongoing partnership.",
    description:
      "Expert support and strategic guidance as your team grows. Quarterly reviews. Direct line to engineers. Real partnership.",
    bullets: ["QBR cadence", "Dedicated CSM", "24/7 NOC"],
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 60%", "end 60%"],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  })
  const lineHeight = useTransform(progress, [0, 1], ["0%", "100%"])

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-[#0A1020]"
    >
      {/* background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(4,107,210,0.10) 0%, transparent 60%)",
          }}
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-mono text-white/50">
            <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#0086F9]" />
            How It Works
            <span className="w-6 h-px bg-gradient-to-l from-transparent to-[#0086F9]" />
          </div>

          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]">
            How Rozper works{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
              for your team.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#9AA8BC] leading-relaxed max-w-xl mx-auto">
            Three phases. No surprises. A real timeline you can hold us to.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={lineRef} className="relative">
          {/* Track */}
          <div className="absolute left-7 sm:left-1/2 top-0 bottom-0 w-px -translate-x-px bg-white/[0.06]" />
          {/* Filled progress */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-7 sm:left-1/2 top-0 w-px -translate-x-px bg-gradient-to-b from-[#22D3EE] via-[#0086F9] to-[#046BD2]"
          />

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, i) => {
              const isRight = i % 2 === 1
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid sm:grid-cols-2 gap-6 sm:gap-12 items-center"
                >
                  {/* Node */}
                  <div className="absolute left-7 sm:left-1/2 top-8 -translate-x-1/2 z-10">
                    <div className="relative w-4 h-4 rounded-full bg-[#0A1020] border-2 border-[#22D3EE] shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                      <span className="absolute inset-0.5 rounded-full bg-[#22D3EE] animate-pulse" />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`pl-16 sm:pl-0 ${
                      isRight ? "sm:col-start-2 sm:pl-12" : "sm:pr-12"
                    }`}
                  >
                    <div className="relative group">
                      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/10 via-[#046BD2]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div className="relative rounded-3xl bg-[#0A1020]/80 backdrop-blur-xl border border-white/[0.04] p-7">
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <div className="font-mono text-[42px] sm:text-[56px] font-bold leading-none bg-gradient-to-br from-white/15 to-white/5 bg-clip-text text-transparent">
                              {step.number}
                            </div>
                            <div>
                              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
                                Phase
                              </div>
                              <div className="text-[11px] font-mono text-[#22D3EE]">
                                {step.duration}
                              </div>
                            </div>
                          </div>
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#046BD2]/20 to-[#22D3EE]/10 border border-white/10 flex items-center justify-center">
                            <step.icon className="w-5 h-5 text-[#22D3EE]" />
                          </div>
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#9AA8BC] leading-relaxed">
                          {step.description}
                        </p>

                        <ul className="mt-5 space-y-2">
                          {step.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-center gap-2 text-sm text-white/80"
                            >
                              <span className="w-4 h-4 rounded-full bg-[#22D3EE]/15 flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 text-[#22D3EE]" />
                              </span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Ghost number on opposite side */}
                  <div
                    className={`hidden sm:block ${
                      isRight ? "sm:col-start-1 sm:row-start-1" : ""
                    }`}
                  >
                    <div
                      className={`text-${isRight ? "left" : "right"} ${
                        isRight ? "sm:pl-12" : "sm:pr-12"
                      }`}
                    >
                      <div className="font-display text-[120px] lg:text-[160px] font-bold leading-none text-transparent bg-gradient-to-br from-white/[0.04] to-white/[0.01] bg-clip-text select-none">
                        {step.number}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold text-sm shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition-colors"
          >
            Book Your No-Pressure Call
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
