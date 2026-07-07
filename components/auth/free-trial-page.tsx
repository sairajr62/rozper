"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import type ReCAPTCHAType from "react-google-recaptcha"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Phone, Users, Bot, Globe2 } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false })

const included = [
  "No credit card required",
  "14-day full-feature access",
  "Onboarding call included",
  "Cancel anytime",
]

const stats = [
  { value: "150+",   label: "Countries" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "< 47s",  label: "Avg response" },
]

const products = [
  { icon: Phone,  label: "Voice & Video" },
  { icon: Users,  label: "Team Chat & SMS" },
  { icon: Bot,    label: "AI Agents" },
  { icon: Globe2, label: "150+ Countries" },
]

export function FreeTrialPageView() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHAType>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const recaptchaToken = recaptchaRef.current?.getValue()
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA check.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const [firstName, ...rest] = name.trim().split(" ")
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(" ") || "",
          email,
          company,
          interests: ["Free Trial"],
          companySize: "—",
          message: "Started a free trial via the /free-trial page.",
          recaptchaToken,
        }),
      })
      const json = await res.json()
      if (json.success) setSubmitted(true)
      else setError(json.error ?? "Something went wrong. Please try again.")
    } catch {
      setError("Network error. Please check your connection.")
    } finally {
      setLoading(false)
      recaptchaRef.current?.reset()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1220] text-white">
      <Navbar />

      {/* Aurora blobs — container is fixed + overflow-hidden to clip children */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Issue 1: blob sizes reduced on mobile to reduce sub-pixel artifact risk */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[600px] sm:h-[600px] bg-[#22D3EE]/10 blur-[80px] sm:blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
        {/* Issue 6: -left-20 can escape viewport on narrow screens; use left-0 on mobile, negative offset only on sm+ */}
        <div className="absolute top-32 left-0 sm:-left-20 w-[180px] h-[180px] sm:w-[500px] sm:h-[500px] bg-[#046BD2]/12 blur-[60px] sm:blur-[130px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(120,160,220,0.25) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex items-start lg:items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Issue 3: add md:max-w-xl as intermediate step between sm (max-w-md) and lg (max-w-5xl) */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* ── Left: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full"
          >
            {/* Badge — Issue 8: reduce tracking on mobile to prevent overflow/awkward wrapping */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono uppercase tracking-[0.10em] sm:tracking-[0.18em] text-white/55 mb-4 max-w-full overflow-hidden">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
              </span>
              <span className="truncate">Get Started Free · 14-Day Trial</span>
            </div>

            {!submitted ? (
              <>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight mb-2">
                  Calls, video, and chat —{" "}
                  <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                    free for 14 days.
                  </span>
                </h1>
                <p className="text-white/45 text-sm leading-relaxed mb-5 max-w-sm">
                  Calling, video, team chat, SMS, and AI transcription on one platform built for growing teams.
                </p>

                {/* Issue 4: reduce base padding to p-4 so inputs stay wide enough on sub-375px screens */}
                <div className="relative rounded-2xl border border-white/10 bg-[#0F1A2E]/80 backdrop-blur-xl p-4 sm:p-7">
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-[#046BD2]/20 to-white/5 -z-10" />

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name + Email: stacked on mobile, side-by-side on sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 mb-1.5">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Cooper"
                          className="w-full h-11 px-4 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/[0.05] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 mb-1.5">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@company.com"
                          className="w-full h-11 px-4 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/[0.05] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 mb-1.5">
                        Company{" "}
                        <span className="normal-case font-normal tracking-normal text-white/25">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Inc."
                        className="w-full h-11 px-4 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/[0.05] transition"
                      />
                    </div>

                    <div className="w-full flex justify-center">
                      <div className="captcha-responsive rounded-xl border border-[#046BD2]/30 bg-[#0F1A2E] p-3 w-fit">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey="6Lf5zjMtAAAAAGAU-oWDPa9j_7PJ9RzWWU4HatED"
                          theme="dark"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0078E0] hover:to-[#22D3EE] text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_-6px_rgba(4,107,210,0.6)]"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Starting your trial…
                        </>
                      ) : (
                        <>Start free trial <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </form>

                  <p className="mt-4 text-[11px] text-white/30 leading-relaxed">
                    By signing up you agree to our{" "}
                    <Link href="/legal/privacy/" className="underline hover:text-white/60 transition-colors">privacy policy</Link>
                    {" "}and{" "}
                    <Link href="/legal/terms/" className="underline hover:text-white/60 transition-colors">terms of service</Link>.
                  </p>

                  <p className="mt-3 text-center text-sm text-white/40">
                    Already have an account?{" "}
                    <Link href="/sign-in/" className="font-semibold text-[#22D3EE] hover:text-white transition-colors">Sign in</Link>
                  </p>
                </div>

                {/* Issue 2: Mobile/tablet trust signals — visible below lg, hidden at lg+ (shown by right panel instead) */}
                <div className="mt-6 flex flex-col gap-4 lg:hidden">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {stats.map((s) => (
                      <div
                        key={s.label}
                        className="text-center rounded-xl border border-white/[0.07] bg-white/[0.03] px-2 py-3"
                      >
                        <p className="text-base sm:text-lg font-bold text-white">{s.value}</p>
                        <p className="text-[9px] sm:text-[10px] text-white/40 mt-0.5 uppercase tracking-widest font-mono">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Included checklist */}
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-white/35 mb-3">
                      What&apos;s included
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      {included.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-white/65">
                          <CheckCircle2 className="w-4 h-4 text-[#22D3EE] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Product chips */}
                  <div className="grid grid-cols-2 gap-2">
                    {products.map((p) => (
                      <div
                        key={p.label}
                        className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
                      >
                        <span className="w-7 h-7 rounded-md bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center shrink-0">
                          <p.icon className="w-3.5 h-3.5 text-white" />
                        </span>
                        <span className="text-xs font-medium text-white/70">{p.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Issue 7: success card — reduce base padding to p-5 to give more content room on sub-375px */
              <div className="relative rounded-2xl border border-white/10 bg-[#0F1A2E]/80 backdrop-blur-xl p-5 sm:p-10 text-center">
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-[#046BD2]/20 to-white/5 -z-10" />
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">Thank you!</h2>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto mb-5">
                  Our team will get back to you shortly.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#046BD2] to-[#0086F9] text-white text-sm font-semibold hover:from-[#0078E0] hover:to-[#22D3EE] transition-all"
                >
                  Back to site
                </Link>
              </div>
            )}
          </motion.div>

          {/* ── Right: Stats + Checklist (desktop only, lg+) ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.06 }}
                  className="text-center rounded-xl border border-white/[0.07] bg-white/[0.03] px-2 py-3"
                >
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-widest font-mono">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Included */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/35 mb-3">
                What&apos;s included
              </p>
              <ul className="space-y-2.5">
                {included.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/65">
                    <CheckCircle2 className="w-4 h-4 text-[#22D3EE] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product chips */}
            <div className="grid grid-cols-2 gap-2">
              {products.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                  className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 hover:bg-white/[0.06] transition-colors"
                >
                  <span className="w-7 h-7 rounded-md bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center shrink-0">
                    <p.icon className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="text-xs font-medium text-white/70">{p.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
