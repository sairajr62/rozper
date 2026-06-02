"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Users,
  PhoneCall,
  Sparkles,
  Calendar,
} from "lucide-react"

const interests = [
  { id: "ucaas", label: "Unified Comms", Icon: Users },
  { id: "ccaas", label: "Contact Center", Icon: PhoneCall },
  { id: "ai", label: "AI Agents", Icon: Sparkles },
  { id: "wholesale", label: "Wholesale Voice", Icon: Globe2 },
]

const sizes = ["1–50 seats", "51–250 seats", "251–1,000 seats", "1,000+ seats"]

export function ContactHero() {
  const [step, setStep] = useState<1 | 2>(1)
  const [picked, setPicked] = useState<Set<string>>(new Set(["ucaas"]))
  const [size, setSize] = useState<string>(sizes[1])
  const [submitted, setSubmitted] = useState(false)

  const toggle = (id: string) => {
    const next = new Set(picked)
    next.has(id) ? next.delete(id) : next.add(id)
    setPicked(next)
  }

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 -left-32 w-[600px] h-[600px] bg-[#22D3EE]/12 blur-[140px] rounded-full" />
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-[#046BD2]/15 blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(120,160,220,0.18) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: pitch */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.18em] text-white/70"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Avg first response · 47 seconds
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]"
            >
              Talk to a real{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                solutions engineer.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 text-lg text-[#CCD6DF] leading-relaxed max-w-lg"
            >
              No SDR phone tree. The person on the call has read the docs, can
              architect your stack, and can quote your contract live.
            </motion.p>

            <ul className="mt-7 space-y-3">
              {[
                "Custom volume pricing & committed-use discounts",
                "Dedicated routing for high-call-volume regions",
                "BAA, DPA, SOC 2 type II, ISO 27001 packs on request",
                "POC environment ready in under 24 hours",
              ].map((b) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-3 text-sm text-white/85"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#22D3EE] flex-shrink-0 mt-0.5" />
                  {b}
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {["MR", "AS", "JK", "PL"].map((i, idx) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[#0B1220] flex items-center justify-center font-mono text-[10px] font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, hsl(${
                        200 + idx * 25
                      } 70% 45%), hsl(${220 + idx * 20} 80% 55%))`,
                    }}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm text-white font-medium">
                  4 SEs online now
                </div>
                <div className="text-xs text-white/50">
                  San Francisco · London · Singapore · Dubai
                </div>
              </div>
            </div>
          </div>

          {/* Right: smart form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-br from-[#22D3EE]/20 via-[#046BD2]/20 to-transparent blur-2xl rounded-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-[#0F1A2E]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Progress strip */}
              <div className="h-1 bg-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#22D3EE] to-[#046BD2]"
                  initial={{ width: "50%" }}
                  animate={{ width: submitted ? "100%" : step === 1 ? "50%" : "85%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/40 flex items-center justify-center font-mono text-[11px] text-white">
                      {submitted ? "✓" : step}
                    </span>
                    <span className="font-display text-lg font-bold text-white">
                      {submitted
                        ? "We&apos;ll be in touch within an hour"
                        : step === 1
                        ? "What are you exploring?"
                        : "Tell us a bit about you"}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    {submitted ? "Done" : `${step} / 2`}
                  </span>
                </div>

                {submitted ? (
                  <div className="py-10 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                    </div>
                    <p className="mt-5 text-white/85 leading-relaxed max-w-md mx-auto">
                      A solutions engineer matched to your stack will reach out
                      shortly. Want it faster? Grab a slot on their calendar.
                    </p>
                    <button className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm font-medium transition-colors">
                      <Calendar className="w-4 h-4" />
                      Book a 30-min slot
                    </button>
                  </div>
                ) : step === 1 ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      {interests.map((i) => {
                        const Icon = i.Icon
                        const active = picked.has(i.id)
                        return (
                          <button
                            key={i.id}
                            type="button"
                            onClick={() => toggle(i.id)}
                            className={`group relative text-left rounded-xl border p-4 transition-all ${
                              active
                                ? "border-[#22D3EE]/60 bg-[#22D3EE]/[0.08]"
                                : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/25"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <Icon
                                className={`w-5 h-5 ${
                                  active ? "text-[#22D3EE]" : "text-white/50"
                                }`}
                              />
                              <span
                                className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                                  active
                                    ? "bg-[#22D3EE] border-[#22D3EE]"
                                    : "border-white/20"
                                }`}
                              >
                                {active && (
                                  <CheckCircle2 className="w-3 h-3 text-[#0B1220]" />
                                )}
                              </span>
                            </div>
                            <div className="mt-3 font-medium text-white text-sm">
                              {i.label}
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    <div className="mt-6">
                      <label className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40">
                        Company size
                      </label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {sizes.map((s) => {
                          const active = size === s
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSize(s)}
                              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                                active
                                  ? "bg-[#046BD2] border-[#046BD2] text-white"
                                  : "border-white/15 text-white/70 hover:border-white/30 hover:text-white"
                              }`}
                            >
                              {s}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="mt-7 w-full inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0078E0] hover:to-[#22D3EE] text-white font-medium transition-all"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubmitted(true)
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="First name" placeholder="Jane" />
                      <Field label="Last name" placeholder="Cooper" />
                    </div>
                    <Field
                      label="Work email"
                      type="email"
                      placeholder="jane@company.com"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Company" placeholder="Acme, Inc." />
                      <Field label="Country" placeholder="United States" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40">
                        Anything we should know? (optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Migrating from a legacy PBX, scaling SMS for a healthcare app, etc."
                        className="mt-2 w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#22D3EE]/50 resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-3 rounded-lg border border-white/10 text-sm text-white/70 hover:bg-white/[0.04] hover:text-white transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0078E0] hover:to-[#22D3EE] text-white font-medium transition-all"
                      >
                        Send to sales
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-white/35 pt-1">
                      By submitting, you agree to our terms. We&apos;ll never sell
                      or share your information.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string
  placeholder: string
  type?: string
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="mt-2 w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#22D3EE]/50"
      />
    </div>
  )
}
