"use client"

import { motion } from "framer-motion"
import { Mail, CheckCircle2, Sparkles } from "lucide-react"
import { useState } from "react"

export function BlogNewsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section
      id="newsletter"
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-50"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(4,107,210,0) 0deg, rgba(4,107,210,0.4) 90deg, rgba(34,211,238,0.25) 180deg, rgba(4,107,210,0) 360deg)",
            filter: "blur(100px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(4,107,210,0.14) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
            maskImage:
              "radial-gradient(ellipse 60% 80% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 80% at 50% 50%, black 30%, transparent 100%)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/20 via-[#046BD2]/50 to-[#22D3EE]/20 shadow-[0_0_120px_-30px_rgba(4,107,210,0.7)]"
        >
          <div className="relative rounded-3xl bg-[#0A1020]/90 backdrop-blur-2xl overflow-hidden p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
                  <Sparkles className="w-3.5 h-3.5" />
                  The dispatch
                </div>
                <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.05] tracking-[-0.025em] font-semibold text-white">
                  One issue. Every other Tuesday.{" "}
                  <span className="bg-gradient-to-r from-[#2D98F1] via-[#0086F9] to-[#22D3EE] bg-clip-text text-transparent">
                    Zero filler.
                  </span>
                </h2>
                <p className="mt-5 text-base sm:text-lg text-[#B8C4D4] leading-relaxed font-light max-w-xl">
                  Three picks from our editors, one chart from the network, and
                  a single concrete idea you can take into your next standup.
                </p>

                <ul className="mt-6 space-y-2.5">
                  {[
                    "Hand-picked posts — never an aggregator dump",
                    "Carrier-grade signal, not vendor hype",
                    "Unsubscribe in one click, no dark patterns",
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2.5 text-sm text-[#B8C4D4]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#22D3EE] mt-0.5 shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-6 text-center"
                  >
                    <div className="mx-auto w-12 h-12 rounded-full bg-emerald-400/15 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="font-display mt-4 text-xl font-semibold text-white">
                      You're on the list.
                    </h3>
                    <p className="mt-2 text-sm text-[#B8C4D4]">
                      Confirmation sent to{" "}
                      <span className="text-white">{email}</span>. Next dispatch
                      ships Tuesday.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={onSubmit}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-md"
                  >
                    <label
                      htmlFor="newsletter-email"
                      className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/50 flex items-center gap-1.5"
                    >
                      <Mail className="w-3 h-3" />
                      Subscribe — free
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-[#070B14] border border-white/10 focus:border-[#046BD2]/60 focus:ring-2 focus:ring-[#046BD2]/30 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="relative mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm font-semibold py-3.5 transition-colors overflow-hidden group shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)]"
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                        animate={{ x: ["-150%", "150%"] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                      <span className="relative">Send me the dispatch</span>
                    </button>
                    <p className="mt-3 text-[11px] text-white/40 text-center">
                      Joined by 12,400+ operators · We don't share your address.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
