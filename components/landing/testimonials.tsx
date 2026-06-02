"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Rozper gave us an instant local presence in new markets. International sales increased 40% in the first quarter.",
    author: "Sofia Rossi",
    role: "CEO",
    company: "Artisan Weavers Collective",
    avatar: "SR",
    rating: 5,
    metric: "+40%",
    metricLabel: "international sales",
    accent: "from-[#0086F9] to-[#22D3EE]",
    featured: true,
  },
  {
    quote:
      "Rozper's UCaaS platform was the key to our successful shift to hybrid work. One platform. Zero friction.",
    author: "Gunnar Björnsson",
    role: "Director of Network Operations",
    company: "Apex Communications",
    avatar: "GB",
    rating: 5,
    accent: "from-[#046BD2] to-[#0086F9]",
  },
  {
    quote:
      "We feel like Rozper is part of our own team — not just another vendor. That's a rare thing in telecoms.",
    author: "Mariam Khalil",
    role: "COO",
    company: "Bridgepoint Group",
    avatar: "MK",
    rating: 5,
    accent: "from-[#22D3EE] to-[#046BD2]",
  },
]

export function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(id)
  }, [active])

  const t = testimonials[active]

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-[#0B1220]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(4,107,210,0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 100%, rgba(34,211,238,0.10) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-mono text-white/50">
              <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#0086F9]" />
              What Customers Say
            </div>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-[-0.025em] leading-[1.05] max-w-2xl">
              Real customers.{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                Real results.
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <div className="font-display text-3xl font-bold text-white tabular-nums">4.9 / 5</div>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FFCA30] text-[#FFCA30]" />
                ))}
                <span className="ml-2 text-[11px] font-mono uppercase tracking-widest text-white/40">
                  G2 · 1,284 reviews
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rotating featured quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-4xl"
        >
          <Quote
            className="mx-auto h-10 w-10 text-[#22D3EE]/45"
            strokeWidth={1.5}
          />

          <div className="relative mt-6 min-h-[340px] sm:min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <blockquote className="font-display text-2xl sm:text-3xl lg:text-[2.4rem] leading-tight tracking-[-0.01em] text-white font-medium">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-7 flex items-center justify-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#FFCA30] text-[#FFCA30]"
                    />
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${t.accent} p-[1px]`}
                    >
                      <div className="w-full h-full rounded-full bg-[#0B1220] flex items-center justify-center text-sm font-semibold text-white">
                        {t.avatar}
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">{t.author}</div>
                      <div className="text-sm text-white/50">
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>

                  {t.metric && (
                    <div className="sm:ml-2 sm:pl-6 sm:border-l border-white/10">
                      <div className="font-display text-2xl font-bold bg-gradient-to-br from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent tabular-nums">
                        {t.metric}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest font-mono text-white/40">
                        {t.metricLabel}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Avatar selector */}
          <div className="mt-10 flex items-center justify-center gap-3">
            {testimonials.map((tt, i) => (
              <button
                key={tt.author}
                type="button"
                onClick={() => setActive(i)}
                aria-label={tt.author}
                className="outline-none"
              >
                <span
                  className={`block w-9 h-9 rounded-full p-[1px] transition-all duration-300 ${
                    i === active
                      ? `bg-gradient-to-br ${tt.accent} scale-110`
                      : "bg-white/15 hover:bg-white/30"
                  }`}
                >
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0B1220] text-[11px] font-semibold text-white/75">
                    {tt.avatar}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
