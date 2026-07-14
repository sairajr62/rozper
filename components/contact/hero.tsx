"use client"

import { useState, useRef } from "react"
import dynamic from "next/dynamic"
import type ReCAPTCHAType from "react-google-recaptcha"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false })

const teamSizes = [
  "1–10 seats",
  "10–50 seats",
  "51–200 seats",
  "201–500 seats",
  "500+ seats",
]

const topics = [
  "UCaaS",
  "Wholesale Voice",
  "Wholesale VoIP",
  "Contact Center",
  "Technical support",
  "Billing & account",
  "Other",
]

export function ContactHero() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [topic, setTopic] = useState("UCaaS")
  const [teamSize, setTeamSize] = useState("10–50 seats")
  const [formActive, setFormActive] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHAType>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const recaptchaToken = recaptchaRef.current?.getValue()
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA check.")
      return
    }
    setSending(true)
    setError(null)
    const form = e.currentTarget
    const data = {
      firstName: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      lastName: "",
      email:    (form.elements.namedItem("email")   as HTMLInputElement)?.value,
      company:  (form.elements.namedItem("company") as HTMLInputElement)?.value,
      companySize: teamSize,
      interests: [topic],
      message:  (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
      recaptchaToken,
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) setSubmitted(true)
      else setError(json.error ?? "Something went wrong. Please try again.")
    } catch {
      setError("Network error. Please check your connection.")
    } finally {
      setSending(false)
      recaptchaRef.current?.reset()
    }
  }

  return (
    // Issue 9: add overflow-x-hidden explicitly to prevent horizontal scroll from absolutely-positioned blobs
    <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-20 overflow-hidden overflow-x-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Issue 1: reduce mobile blob sizes to avoid potential overflow on very narrow screens */}
        <div className="absolute top-10 -left-32 w-[200px] h-[200px] sm:w-[600px] sm:h-[600px] bg-[#22D3EE]/12 blur-[100px] sm:blur-[140px] rounded-full" />
        <div className="absolute top-40 right-0 w-[200px] h-[200px] sm:w-[500px] sm:h-[500px] bg-[#046BD2]/15 blur-[80px] sm:blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(120,160,220,0.18) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* ── Left: pitch ── */}
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
              className="font-display mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]"
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
              // Issue 10: remove max-w-lg on mobile so text is properly constrained by parent padding on small screens
              className="mt-4 sm:mt-5 text-base sm:text-lg text-[#CCD6DF] leading-relaxed sm:max-w-lg"
            >
              No SDR phone tree. The person on the call has read the docs, can
              architect your stack, and can quote your contract live.
            </motion.p>

            <ul className="mt-5 sm:mt-7 space-y-2 sm:space-y-3">
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

            {/* Issue 2 & 3: stack avatar row on very small screens; allow location text to wrap */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex -space-x-3 flex-shrink-0">
                {["MR", "AS", "JK", "PL"].map((i, idx) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[#0B1220] flex items-center justify-center font-mono text-[10px] font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, hsl(${200 + idx * 25} 70% 45%), hsl(${220 + idx * 20} 80% 55%))`,
                    }}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="min-w-0">
                <div className="text-sm text-white font-medium">4 SEs online now</div>
                {/* Issue 3: allow the location string to wrap naturally on narrow screens */}
                <div className="text-xs text-white/50 break-words">San Francisco · London · Singapore · Dubai</div>
              </div>
            </div>
          </div>

          {/* ── Right: simple form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-br from-[#22D3EE]/20 via-[#046BD2]/20 to-transparent blur-2xl rounded-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-[#0F1A2E]/80 backdrop-blur-xl shadow-2xl p-5 sm:p-8">

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h2 className="font-display mt-5 text-2xl font-bold text-white">Message sent!</h2>
                  <p className="mt-2 text-white/55 text-sm leading-relaxed max-w-xs mx-auto">
                    Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} onFocus={() => setFormActive(true)} className="space-y-5">

                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Jane Cooper"
                        className="w-full h-11 px-4 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/[0.05] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-2">
                        Work Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="jane@company.com"
                        className="w-full h-11 px-4 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/[0.05] transition"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company + Team Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Cooper & Co"
                        className="w-full h-11 px-4 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/[0.05] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-2">
                        Team Size
                      </label>
                      <select
                        name="teamSize"
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="w-full h-11 px-4 rounded-lg bg-[#0F1A2E] border border-white/10 text-sm text-white focus:outline-none focus:border-[#22D3EE]/50 transition appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
                      >
                        {teamSizes.map((s) => (
                          <option key={s} value={s} className="bg-[#0F1A2E]">{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: What is this about */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-2">
                      What is this about?
                    </label>
                    <select
                      name="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full h-11 px-4 rounded-lg bg-[#0F1A2E] border border-white/10 text-sm text-white focus:outline-none focus:border-[#22D3EE]/50 transition appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
                    >
                      {topics.map((t) => (
                        <option key={t} value={t} className="bg-[#0F1A2E]">{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell us what you're working on, current stack, and what good looks like."
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/[0.05] transition resize-none"
                    />
                  </div>

                  <div className="w-full flex justify-center">
                    <div className="captcha-responsive rounded-xl border border-[#046BD2]/30 bg-[#0F1A2E] p-3 w-fit">
                      {formActive ? (
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey="6Lf5zjMtAAAAAGAU-oWDPa9j_7PJ9RzWWU4HatED"
                          theme="dark"
                        />
                      ) : (
                        // Placeholder matches the reCAPTCHA v2 checkbox widget's rendered
                        // size (304x78) so there's no layout shift when it mounts on focus.
                        <div className="w-[300px] h-[74px] rounded-md bg-white/[0.03] animate-pulse" />
                      )}
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  {/* Footer row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
                    <p className="text-[11px] text-white/35 leading-relaxed">
                      By submitting, you agree to our{" "}
                      <Link href="/legal/privacy/" className="underline hover:text-white/60 transition-colors">
                        privacy policy
                      </Link>
                      .
                    </p>
                    {/* Issue 4: add w-full on mobile for a full-width tap target; shrink-0 only on sm+ */}
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full sm:w-auto sm:shrink-0 inline-flex items-center justify-center gap-2 px-6 h-11 rounded-full bg-[#0B1220] border border-white/20 hover:border-[#22D3EE]/50 text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:bg-white/[0.05]"
                    >
                      {sending ? "Sending…" : "Send message"}
                      {!sending && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
