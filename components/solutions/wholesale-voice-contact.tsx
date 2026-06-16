"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import {
  PhoneOutgoing,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Globe2,
  ShieldCheck,
  DollarSign,
  HeadphonesIcon,
  BarChart3,
  Send,
} from "lucide-react"

const TRAFFIC_TYPES = [
  "CLI Premium",
  "Standard A-Z",
  "CC Routes",
  "Non-CLI",
  "Mixed / Not sure",
]

const COUNTRY_CODES = [
  { flag: "🇺🇸", code: "+1",  label: "US" },
  { flag: "🇬🇧", code: "+44", label: "UK" },
  { flag: "🇮🇳", code: "+91", label: "IN" },
  { flag: "🇦🇪", code: "+971",label: "AE" },
  { flag: "🇩🇪", code: "+49", label: "DE" },
  { flag: "🇧🇷", code: "+55", label: "BR" },
  { flag: "🇦🇺", code: "+61", label: "AU" },
  { flag: "🇨🇦", code: "+1",  label: "CA" },
]

const BENEFITS = [
  {
    icon: Globe2,
    title: "200+ Countries",
    desc: "A-Z termination with direct carrier interconnects across every major destination.",
  },
  {
    icon: ShieldCheck,
    title: "99.99% Uptime SLA",
    desc: "Carrier-grade reliability with automated failover and 24/7 NOC monitoring.",
  },
  {
    icon: DollarSign,
    title: "Volume Pricing",
    desc: "Competitive per-minute rates with committed-use discounts — no aggregator markup.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    desc: "A real account manager and NOC engineer assigned to your account from day one.",
  },
]

export function WholesaleVoiceContactPageView() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [trafficType, setTrafficType] = useState("Standard A-Z")
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0])
  const [ccOpen, setCcOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    const form = e.currentTarget
    const phone = `${countryCode.code} ${(form.elements.namedItem("phone") as HTMLInputElement)?.value}`
    const minutes = (form.elements.namedItem("minutes") as HTMLInputElement)?.value
    const destinations = (form.elements.namedItem("destinations") as HTMLInputElement)?.value
    const provider = (form.elements.namedItem("provider") as HTMLInputElement)?.value
    const extra = (form.elements.namedItem("extra") as HTMLTextAreaElement)?.value

    const messageParts = [
      `Traffic type: ${trafficType}`,
      phone && phone.trim() !== countryCode.code ? `Phone: ${phone}` : "",
      minutes ? `Est. monthly minutes: ${minutes}` : "",
      destinations ? `Top destinations: ${destinations}` : "",
      provider ? `Current provider: ${provider}` : "",
      extra ? `Additional notes: ${extra}` : "",
    ].filter(Boolean)

    const data = {
      firstName: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      lastName: "",
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      company: (form.elements.namedItem("company") as HTMLInputElement)?.value,
      companySize: minutes ? `${minutes} min/month` : "—",
      interests: ["Wholesale Voice"],
      message: messageParts.join("\n"),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) setSubmitted(true)
      else setError("Something went wrong. Please try again.")
    } catch {
      setError("Network error. Please check your connection.")
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0B1220] text-white overflow-x-clip">
      <Navbar />

      {/* ambient glows — use viewport-relative sizes to avoid horizontal scroll on narrow screens */}
      <div className="pointer-events-none absolute top-0 left-0 w-[min(700px,100vw)] h-[min(700px,100vw)] bg-[#046BD2]/10 blur-[180px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[min(500px,100vw)] h-[min(500px,100vw)] bg-[#22D3EE]/8 blur-[150px] rounded-full" />

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 pt-20 sm:pt-28 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-xs text-white/40">
            <Link href="/" className="hover:text-[#2D98F1] transition-colors">/</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/wholesale-voice" className="hover:text-[#2D98F1] transition-colors">wholesale-voice</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#0086F9]">contact</span>
          </div>
        </div>

        {/* Page hero */}
        <section className="mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#046BD2]/30 bg-[#046BD2]/10 text-[11px] font-mono uppercase tracking-[0.18em] text-[#2D98F1] mb-5"
            >
              <PhoneOutgoing className="h-3.5 w-3.5" />
              Wholesale Voice
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]"
            >
              Get a Custom{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                Rate Card
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="mt-4 text-base sm:text-lg text-white/50 leading-relaxed"
            >
              Share your traffic details and destinations — we'll respond within one business day with a tailored A-Z rate deck.
            </motion.p>
          </div>
        </section>

        {/* Main grid */}
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left: benefits */}
            <div className="lg:col-span-4 space-y-4">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 hover:border-[#046BD2]/30 transition"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#046BD2]/25 bg-[#046BD2]/15">
                    <b.icon className="h-5 w-5 text-[#0086F9]" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold text-white mb-1">{b.title}</div>
                    <div className="text-sm text-white/50 leading-relaxed">{b.desc}</div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">Live network</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    ["10M+", "calls routed daily"],
                    ["< 50ms", "avg post-dial delay"],
                    ["99.2%", "average ASR across A-Z"],
                  ].map(([val, label]) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-white/55">{label}</span>
                      <span className="font-mono text-sm font-bold text-white">{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: form card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="lg:col-span-8 relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-[#046BD2]/20 via-[#22D3EE]/10 to-transparent blur-2xl rounded-3xl pointer-events-none" />
              <div className="relative rounded-2xl border border-white/10 bg-[#0D1627]/90 backdrop-blur-xl shadow-2xl overflow-hidden">

                {/* Card header — reduced px on very small screens */}
                <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-5 border-b border-white/[0.07]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#046BD2] to-[#22D3EE]">
                      <PhoneOutgoing className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#2D98F1] font-semibold">
                      Request a Rate Card
                    </span>
                  </div>
                </div>

                {/* Card body — reduced px on very small screens */}
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                  {submitted ? (
                    <div className="py-14 text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h2 className="font-display mt-6 text-2xl sm:text-3xl font-bold text-white">Request received!</h2>
                      <p className="mt-3 text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
                        Our wholesale voice team will be in touch within one business day with a rate card tailored to your traffic.
                      </p>
                      <Link
                        href="/wholesale-voice"
                        className="mt-8 inline-flex items-center gap-2 text-sm text-[#22D3EE] hover:text-white transition-colors"
                      >
                        <ChevronRight className="h-4 w-4 rotate-180" />
                        Back to Wholesale Voice
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">

                      {/* Row 1: Name + Work Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-2">
                            Name <span className="text-[#22D3EE]">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Jane Doe"
                            className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#046BD2]/60 focus:bg-white/[0.06] transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-2">
                            Work Email <span className="text-[#22D3EE]">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="jane@carrier.com"
                            className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#046BD2]/60 focus:bg-white/[0.06] transition"
                          />
                        </div>
                      </div>

                      {/* Row 2: Company + Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            name="company"
                            placeholder="Carrier Co."
                            className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#046BD2]/60 focus:bg-white/[0.06] transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-2">
                            Phone
                          </label>
                          <div className="flex h-11 rounded-xl border border-white/[0.08] bg-white/[0.04] overflow-hidden focus-within:border-[#046BD2]/60 transition">
                            {/* Country code selector — dropdown constrained to not overflow viewport */}
                            <div className="relative flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => setCcOpen(!ccOpen)}
                                className="h-full flex items-center gap-1.5 px-3 text-sm text-white/70 hover:text-white border-r border-white/[0.08] transition whitespace-nowrap"
                              >
                                <span>{countryCode.flag}</span>
                                <span className="font-mono text-xs">{countryCode.code}</span>
                                <ChevronRight className="h-3 w-3 rotate-90 text-white/30" />
                              </button>
                              {ccOpen && (
                                <div className="absolute left-0 top-full mt-1 z-50 w-36 max-w-[calc(100vw-2rem)] rounded-xl border border-white/10 bg-[#0D1627] shadow-xl overflow-hidden">
                                  {COUNTRY_CODES.map((c) => (
                                    <button
                                      key={c.label + c.code}
                                      type="button"
                                      onClick={() => { setCountryCode(c); setCcOpen(false) }}
                                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white transition text-left"
                                    >
                                      <span>{c.flag}</span>
                                      <span className="font-mono text-xs text-white/50">{c.code}</span>
                                      <span className="text-xs">{c.label}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Enter phone number"
                              className="flex-1 h-full px-3 bg-transparent text-sm text-white placeholder-white/20 focus:outline-none min-w-0"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Est. Monthly Minutes + Top Destinations */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-2">
                            Est. Monthly Minutes
                          </label>
                          <input
                            type="text"
                            name="minutes"
                            placeholder="e.g. 2,000,000"
                            className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#046BD2]/60 focus:bg-white/[0.06] transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-2">
                            Top Destinations / Corridors
                          </label>
                          <input
                            type="text"
                            name="destinations"
                            placeholder="e.g. US, UK, India mobile"
                            className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#046BD2]/60 focus:bg-white/[0.06] transition"
                          />
                        </div>
                      </div>

                      {/* Row 4: Traffic type pills — auto height on mobile to prevent text clipping */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-3">
                          What Traffic Are You Routing?
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {TRAFFIC_TYPES.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTrafficType(t)}
                              className={`px-3 sm:px-4 py-2 min-h-[2.25rem] rounded-full text-xs sm:text-sm font-medium border transition leading-tight ${
                                trafficType === t
                                  ? "bg-[#046BD2] border-[#046BD2] text-white shadow-[0_0_16px_-4px_rgba(4,107,210,0.7)]"
                                  : "border-white/[0.12] bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white/80"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Row 5: Current Provider */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-2">
                          Current Provider <span className="text-white/25 normal-case tracking-normal font-sans text-[11px]">(optional)</span>
                        </label>
                        <input
                          type="text"
                          name="provider"
                          placeholder="Who do you route with today?"
                          className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#046BD2]/60 focus:bg-white/[0.06] transition"
                        />
                      </div>

                      {/* Row 6: Anything Else */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-2">
                          Anything Else
                        </label>
                        <textarea
                          name="extra"
                          rows={4}
                          placeholder="Concurrency, CPS needs, switch type, target ASR, timeline…"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#046BD2]/60 focus:bg-white/[0.06] transition resize-none"
                        />
                      </div>

                      {error && (
                        <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">
                          {error}
                        </p>
                      )}

                      {/* Submit row — button stretches full-width on mobile for easier tap target */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-1">
                        <p className="text-[11px] text-white/30 leading-relaxed">
                          By submitting, you agree to our{" "}
                          <Link href="/legal/privacy" className="underline hover:text-white/55 transition-colors">
                            Privacy Policy
                          </Link>
                          .
                        </p>
                        <button
                          type="submit"
                          disabled={sending}
                          className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-7 h-11 rounded-full bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0086F9] hover:to-[#22D3EE] text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_20px_-4px_rgba(4,107,210,0.6)]"
                        >
                          {sending ? "Sending…" : "Get my quote"}
                          {!sending && <Send className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                    </form>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
