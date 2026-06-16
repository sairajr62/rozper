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
} from "lucide-react"

const VOLUME_OPTIONS = [
  "Under 1M minutes / month",
  "1M – 10M minutes / month",
  "10M – 50M minutes / month",
  "50M – 100M minutes / month",
  "100M+ minutes / month",
]

const ROUTE_TYPES = [
  "CLI Routes",
  "Non-CLI Routes",
  "Both CLI & Non-CLI",
  "Not sure yet",
]

const BENEFITS = [
  {
    icon: Globe2,
    title: "200+ Countries",
    desc: "A-Z VoIP termination with direct carrier interconnects across every major destination.",
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
  const [volume, setVolume] = useState(VOLUME_OPTIONS[1])
  const [routeType, setRouteType] = useState(ROUTE_TYPES[0])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    const form = e.currentTarget
    const routeNote = `Route type: ${routeType}`
    const msgField = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value
    const data = {
      firstName: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      lastName: "",
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      company: (form.elements.namedItem("company") as HTMLInputElement)?.value,
      companySize: volume,
      interests: ["Wholesale Voice"],
      message: [routeNote, msgField].filter(Boolean).join("\n\n"),
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

      {/* ambient glows */}
      <div className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] bg-[#046BD2]/10 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#22D3EE]/8 blur-[140px] rounded-full" />

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

        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 pt-8 pb-6 sm:px-6">
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
                Wholesale Voice Rate Deck
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="mt-4 text-base sm:text-lg text-white/55 leading-relaxed"
            >
              Tell us your destinations and monthly volume. We'll respond within one business day with a tailored A-Z rate deck — no commitment required.
            </motion.p>
          </div>
        </section>

        {/* Main content */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left: benefits */}
            <div className="lg:col-span-5 space-y-5">
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
                    <div className="text-sm text-white/55 leading-relaxed">{b.desc}</div>
                  </div>
                </motion.div>
              ))}

              {/* Social proof chip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">Live network</span>
                </div>
                <div className="space-y-2">
                  {[
                    ["10M+", "calls routed daily"],
                    ["< 50ms", "avg post-dial delay"],
                    ["99.2%", "average ASR across A-Z"],
                  ].map(([val, label]) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-white/60">{label}</span>
                      <span className="font-mono text-sm font-bold text-white">{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7 relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-[#22D3EE]/15 via-[#046BD2]/15 to-transparent blur-2xl rounded-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-[#0F1A2E]/80 backdrop-blur-xl shadow-2xl p-6 sm:p-8">

                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h2 className="font-display mt-6 text-2xl sm:text-3xl font-bold text-white">Request received!</h2>
                    <p className="mt-3 text-white/55 text-sm leading-relaxed max-w-sm mx-auto">
                      Our wholesale voice team will be in touch within one business day with a rate deck tailored to your traffic.
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
                    <div className="mb-2">
                      <h2 className="font-display text-lg font-bold text-white">Contact our wholesale team</h2>
                      <p className="text-sm text-white/45 mt-1">All fields marked with * are required.</p>
                    </div>

                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-2">
                          Your Name *
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
                          Work Email *
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

                    {/* Row 3: Route Type */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-2">
                        Route Type Required
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {ROUTE_TYPES.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRouteType(r)}
                            className={`h-10 px-3 rounded-lg border text-xs font-medium transition ${
                              routeType === r
                                ? "border-[#22D3EE]/60 bg-[#22D3EE]/10 text-[#22D3EE]"
                                : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/70"
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Row 4: Top Destinations */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/45 mb-2">
                        Top Destinations & Requirements
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="E.g. Heavy traffic to US, UK, Germany, India — need CLI routes with ASR above 95%. Currently using X carrier at $0.004/min."
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/[0.05] transition resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                        {error}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
                      <p className="text-[11px] text-white/35 leading-relaxed">
                        By submitting, you agree to our{" "}
                        <Link href="/legal/privacy" className="underline hover:text-white/60 transition-colors">
                          privacy policy
                        </Link>
                        .
                      </p>
                      <button
                        type="submit"
                        disabled={sending}
                        className="shrink-0 inline-flex items-center justify-center gap-2 px-7 h-11 rounded-full bg-[#046BD2] hover:bg-[#0086F9] text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {sending ? "Sending…" : "Get Rate Deck"}
                        {!sending && <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
