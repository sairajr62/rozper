"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Star, Quote, ArrowUpRight } from "lucide-react"

const testimonials = [
  {
    quote:
      "Rozper's UCaaS platform was the key to our successful shift to hybrid work. One platform. Zero friction. Our IT team got their week back.",
    author: "Gunnar Björnsson",
    role: "Director of Network Operations",
    company: "Apex Communications",
    avatar: "GB",
    rating: 5,
    metric: "92%",
    metricLabel: "agent satisfaction",
    accent: "from-[#0086F9] to-[#22D3EE]",
    featured: true,
  },
  {
    quote:
      "Rozper gave us an instant local presence in new markets. International sales increased 40% in the first quarter.",
    author: "Sofia Rossi",
    role: "CEO",
    company: "Artisan Weavers Collective",
    avatar: "SR",
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

  const featured = testimonials[0]
  const others = testimonials.slice(1)

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 overflow-hidden bg-[#070B14]"
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
              Customer voices
            </div>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-[-0.025em] leading-[1.05] max-w-2xl">
              Built with{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                operators
              </span>{" "}
              who actually run the floor.
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

        {/* Asymmetric grid */}
        <div className="grid lg:grid-cols-12 gap-4">
          {/* Featured */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative group"
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/15 via-[#046BD2]/30 to-transparent" />
            <div className="relative h-full rounded-3xl bg-[#0A1020]/85 backdrop-blur-xl overflow-hidden">
              <div
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(34,211,238,0.6) 0%, transparent 70%)",
                }}
              />

              <div className="relative p-8 sm:p-12">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center shadow-[0_0_30px_-5px_rgba(4,107,210,0.6)]">
                    <Quote className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: featured.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#FFCA30] text-[#FFCA30]"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="mt-8 font-display text-2xl sm:text-3xl lg:text-[2rem] leading-tight text-white tracking-[-0.01em] font-medium">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>

                <div className="mt-10 flex items-end justify-between gap-6 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div
                      className={`shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${featured.accent} p-[1px]`}
                    >
                      <div className="w-full h-full rounded-full bg-[#0A1020] flex items-center justify-center text-sm font-semibold text-white">
                        {featured.avatar}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{featured.author}</div>
                      <div className="text-sm text-white/50">
                        {featured.role} · {featured.company}
                      </div>
                    </div>
                  </div>

                  {featured.metric && (
                    <div className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="font-display text-2xl font-bold bg-gradient-to-br from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent tabular-nums">
                        {featured.metric}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest font-mono text-white/40">
                        {featured.metricLabel}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.article>

          {/* Smaller cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {others.map((t, i) => (
              <motion.article
                key={t.author}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group"
              >
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/10 via-[#046BD2]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative h-full rounded-3xl bg-[#0A1020]/85 backdrop-blur-xl border border-white/[0.04] p-7 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="w-3.5 h-3.5 fill-[#FFCA30] text-[#FFCA30]"
                        />
                      ))}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#22D3EE] transition-colors" />
                  </div>

                  <blockquote className="mt-5 text-base text-white/85 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-3">
                    <div
                      className={`shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${t.accent} p-[1px]`}
                    >
                      <div className="w-full h-full rounded-full bg-[#0A1020] flex items-center justify-center text-xs font-semibold text-white">
                        {t.avatar}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-white text-sm truncate">
                        {t.author}
                      </div>
                      <div className="text-xs text-white/50 truncate">
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
