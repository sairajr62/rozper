"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import type ReCAPTCHAType from "react-google-recaptcha"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, PhoneOutgoing, Network } from "lucide-react"
import Link from "next/link"

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false })

const VOLUME_OPTIONS = [
  "Under 1M minutes / month",
  "1M – 10M minutes / month",
  "10M – 50M minutes / month",
  "50M – 100M minutes / month",
  "100M+ minutes / month",
]

const BENEFITS: Record<string, string[]> = {
  "Wholesale Voice": [
    "A-Z VoIP termination to 200+ countries",
    "CLI & non-CLI routes with 99.99% uptime",
    "Competitive per-minute pricing with volume discounts",
    "24/7 NOC support & real-time analytics",
  ],
  "Wholesale VoIP": [
    "Direct carrier interconnections — no aggregators",
    "Performance-optimized routing with low PDD",
    "Secure SIP trunking with TLS + SRTP",
    "Elastic capacity — no channel caps",
  ],
}

interface WholesaleContactFormProps {
  interest: "Wholesale Voice" | "Wholesale VoIP"
}

export function WholesaleContactForm({ interest }: WholesaleContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [volume, setVolume] = useState(VOLUME_OPTIONS[1])
  const recaptchaRef = useRef<ReCAPTCHAType>(null)

  const Icon = interest === "Wholesale Voice" ? PhoneOutgoing : Network

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
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      company: (form.elements.namedItem("company") as HTMLInputElement)?.value,
      companySize: volume,
      interests: [interest],
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
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
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-20 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left: pitch */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#046BD2]/30 bg-[#046BD2]/10 text-[11px] font-mono uppercase tracking-[0.18em] text-[#2D98F1] max-w-full overflow-hidden"
          >
            <Icon className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{interest} Inquiry</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display mt-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.05]"
          >
            Talk to a{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
              wholesale expert.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base text-[#CCD6DF] leading-relaxed max-w-lg"
          >
            Share your traffic volume and destinations — we&apos;ll respond with a tailored rate deck and routing plan within one business day.
          </motion.p>

          <ul className="mt-6 space-y-3">
            {BENEFITS[interest].map((b) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-3 text-sm text-white/80"
              >
                <CheckCircle2 className="w-4 h-4 text-[#22D3EE] flex-shrink-0 mt-0.5" />
                {b}
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 w-fit max-w-full">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm text-white/60">
              Avg. first response · <span className="text-white font-medium">under 4 hours</span>
            </span>
          </div>
        </div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-br from-[#22D3EE]/20 via-[#046BD2]/20 to-transparent blur-2xl rounded-3xl" />
          <div className="relative rounded-2xl border border-white/10 bg-[#0F1A2E]/80 backdrop-blur-xl shadow-2xl p-4 sm:p-6 md:p-8">

            {submitted ? (
              <div className="py-14 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="font-display mt-5 text-2xl font-bold text-white">Request received!</h3>
                <p className="mt-2 text-white/55 text-sm leading-relaxed max-w-xs mx-auto">
                  Our wholesale team will be in touch within one business day with a rate deck tailored to your traffic.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

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
                      placeholder="jane@carrier.com"
                      className="w-full h-11 px-4 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/[0.05] transition"
                    />
                  </div>
                </div>

                {/* Row 2: Company + Monthly Volume */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Carrier Co."
                      className="w-full h-11 px-4 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/[0.05] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-2">
                      Monthly Traffic Volume
                    </label>
                    <select
                      name="volume"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full h-11 px-4 rounded-lg bg-[#0F1A2E] border border-white/10 text-sm text-white focus:outline-none focus:border-[#22D3EE]/50 transition appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                      }}
                    >
                      {VOLUME_OPTIONS.map((v) => (
                        <option key={v} value={v} className="bg-[#0F1A2E]">{v}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-2">
                    Top Destinations & Requirements
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="E.g. Heavy traffic to US, UK, India — need CLI routes with ASR above 95%. Currently using X carrier."
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/[0.05] transition resize-none"
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

                {/* Footer row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
                  <p className="text-[11px] text-white/35 leading-relaxed">
                    By submitting, you agree to our{" "}
                    <Link href="/legal/privacy/" className="underline hover:text-white/60 transition-colors">
                      privacy policy
                    </Link>
                    .
                  </p>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 h-11 rounded-full bg-[#046BD2] hover:bg-[#0086F9] text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? "Sending…" : "Get a Rate Deck"}
                    {!sending && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>

              </form>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
