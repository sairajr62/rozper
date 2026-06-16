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
  ChevronDown,
} from "lucide-react"

const COUNTRY_CODES = [
  { flag: "🇺🇸", code: "+1",   label: "US" },
  { flag: "🇬🇧", code: "+44",  label: "UK" },
  { flag: "🇮🇳", code: "+91",  label: "IN" },
  { flag: "🇦🇪", code: "+971", label: "AE" },
  { flag: "🇩🇪", code: "+49",  label: "DE" },
  { flag: "🇧🇷", code: "+55",  label: "BR" },
  { flag: "🇦🇺", code: "+61",  label: "AU" },
  { flag: "🇨🇦", code: "+1",   label: "CA" },
]

const BENEFITS = [
  { icon: Globe2,          title: "200+ Countries",     desc: "A-Z termination with direct carrier interconnects across every major destination." },
  { icon: ShieldCheck,     title: "99.99% Uptime SLA",  desc: "Carrier-grade reliability with automated failover and 24/7 NOC monitoring." },
  { icon: DollarSign,      title: "Volume Pricing",     desc: "Competitive per-minute rates with committed-use discounts — no aggregator markup." },
  { icon: HeadphonesIcon,  title: "Dedicated Support",  desc: "A real account manager and NOC engineer assigned to your account from day one." },
]

/* ── small helpers ── */
function Label({ text, required, optional }: { text: string; required?: boolean; optional?: boolean }) {
  return (
    <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 mb-2">
      {text}
      {required && <span className="ml-1 text-[#22D3EE]">*</span>}
      {optional && <span className="ml-1.5 normal-case tracking-normal text-[10px] font-normal text-white/30">(optional)</span>}
    </label>
  )
}

const inputCls =
  "w-full h-11 px-4 rounded-lg bg-white/[0.04] border border-white/[0.09] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#046BD2]/70 focus:bg-white/[0.07] transition"

export function WholesaleVoiceContactPageView() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cc, setCc] = useState(COUNTRY_CODES[0])
  const [ccOpen, setCcOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    const form = e.currentTarget
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement)?.value ?? ""

    const phoneRaw = get("phone")
    const minutes   = get("minutes")
    const destinations = get("destinations")
    const help      = get("help")

    const parts = [
      phoneRaw ? `Phone: ${cc.code} ${phoneRaw}` : "",
      minutes  ? `Est. monthly minutes: ${minutes}` : "",
      destinations ? `Top destinations: ${destinations}` : "",
      help     ? `How can we help: ${help}` : "",
    ].filter(Boolean)

    const data = {
      firstName: get("name"),
      lastName:  "",
      email:     get("email"),
      company:   "",
      companySize: minutes ? `${minutes} min/month` : "—",
      interests: ["Wholesale Voice"],
      message:   parts.join("\n"),
    }

    try {
      const res  = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
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
    <main className="min-h-screen bg-[#0B1220] text-white overflow-x-hidden">
      <Navbar />

      {/* ambient glows */}
      <div className="pointer-events-none absolute top-0 left-0 w-[min(600px,100vw)] h-[min(600px,100vw)] bg-[#046BD2]/10 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[min(400px,100vw)] h-[min(400px,100vw)] bg-[#22D3EE]/8 blur-[130px] rounded-full" />

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
        <section className="mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#046BD2]/30 bg-[#046BD2]/10 text-[11px] font-mono uppercase tracking-[0.18em] text-[#2D98F1] mb-5"
            >
              <PhoneOutgoing className="h-3.5 w-3.5 shrink-0" />
              Wholesale Voice
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
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
              Share your traffic details — we'll respond within one business day with a tailored A-Z rate deck.
            </motion.p>
          </div>
        </section>

        {/* Main grid */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* ── Left: benefits ── */}
            <div className="lg:col-span-4 space-y-4">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5 hover:border-[#046BD2]/30 transition"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#046BD2]/25 bg-[#046BD2]/15">
                    <b.icon className="h-5 w-5 text-[#0086F9]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white mb-0.5">{b.title}</div>
                    <div className="text-xs text-white/50 leading-relaxed">{b.desc}</div>
                  </div>
                </motion.div>
              ))}

              {/* live stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4 sm:p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">Live network</span>
                </div>
                <div className="space-y-2">
                  {[["10M+","calls routed daily"],["< 50ms","avg post-dial delay"],["99.2%","average ASR across A-Z"]].map(([v,l]) => (
                    <div key={l} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-white/50">{l}</span>
                      <span className="font-mono text-xs font-bold text-white whitespace-nowrap">{v}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Right: form card ── */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="lg:col-span-8 relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-[#046BD2]/15 via-[#22D3EE]/8 to-transparent blur-2xl rounded-3xl pointer-events-none" />
              <div className="relative rounded-2xl border border-white/[0.09] bg-[#0D1627]/95 backdrop-blur-xl shadow-2xl overflow-hidden">

                {/* card header */}
                <div className="flex items-center gap-3 px-5 sm:px-7 py-5 border-b border-white/[0.06]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#046BD2] to-[#22D3EE]">
                    <PhoneOutgoing className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#2D98F1] font-semibold">
                    Request a Rate Card
                  </span>
                </div>

                <div className="px-5 sm:px-7 py-6 sm:py-7">
                  {submitted ? (
                    <div className="py-14 text-center">
                      <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                      </div>
                      <h2 className="font-display mt-5 text-2xl sm:text-3xl font-bold text-white">Request received!</h2>
                      <p className="mt-2 text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                        Our wholesale team will send your custom rate card within one business day.
                      </p>
                      <Link href="/wholesale-voice" className="mt-7 inline-flex items-center gap-2 text-sm text-[#22D3EE] hover:text-white transition-colors">
                        <ChevronRight className="h-4 w-4 rotate-180" />
                        Back to Wholesale Voice
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">

                      {/* NAME */}
                      <div>
                        <Label text="Name" required />
                        <input type="text" name="name" required placeholder="Your full name" className={inputCls} />
                      </div>

                      {/* WORK EMAIL */}
                      <div>
                        <Label text="Work Email" required />
                        <input type="email" name="email" required placeholder="you@company.com" className={inputCls} />
                      </div>

                      {/* PHONE */}
                      <div>
                        <Label text="Phone" />
                        <div className="flex h-11 rounded-lg border border-white/[0.09] bg-white/[0.04] focus-within:border-[#046BD2]/70 transition overflow-visible">
                          {/* country picker */}
                          <div className="relative shrink-0">
                            <button
                              type="button"
                              onClick={() => setCcOpen(!ccOpen)}
                              className="h-full flex items-center gap-1.5 px-3 border-r border-white/[0.09] text-sm text-white/70 hover:text-white transition whitespace-nowrap"
                            >
                              <span className="text-base leading-none">{cc.flag}</span>
                              <span className="font-mono text-xs">{cc.code}</span>
                              <ChevronDown className="h-3 w-3 text-white/30" />
                            </button>
                            {ccOpen && (
                              <div className="absolute left-0 top-full mt-1 z-50 w-36 rounded-xl border border-white/[0.09] bg-[#0D1627] shadow-xl overflow-hidden">
                                {COUNTRY_CODES.map((c) => (
                                  <button
                                    key={c.label + c.code}
                                    type="button"
                                    onClick={() => { setCc(c); setCcOpen(false) }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-white/60 hover:bg-white/[0.05] hover:text-white transition text-left"
                                  >
                                    <span>{c.flag}</span>
                                    <span className="font-mono text-xs text-white/40">{c.code}</span>
                                    <span className="text-xs">{c.label}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="555 000 0000"
                            className="flex-1 min-w-0 h-full px-3 bg-transparent text-sm text-white placeholder-white/20 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* ESTIMATED MONTHLY MINUTES */}
                      <div>
                        <Label text="Estimated Monthly Minutes" optional />
                        <input type="text" name="minutes" placeholder="e.g. 500,000" className={inputCls} />
                      </div>

                      {/* TOP DESTINATIONS */}
                      <div>
                        <Label text="Top Destinations" optional />
                        <input type="text" name="destinations" placeholder="e.g. US, UK, India, UAE" className={inputCls} />
                      </div>

                      {/* HOW CAN WE HELP */}
                      <div>
                        <Label text="How Can We Help?" optional />
                        <textarea
                          name="help"
                          rows={4}
                          placeholder="Tell us what you need and we'll tailor your quote."
                          className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.09] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#046BD2]/70 focus:bg-white/[0.07] transition resize-none"
                        />
                      </div>

                      {error && (
                        <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
                          {error}
                        </p>
                      )}

                      {/* submit row */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                        <p className="text-[11px] text-white/30 leading-relaxed">
                          By submitting, you agree to our{" "}
                          <Link href="/legal/privacy" className="underline hover:text-white/55 transition-colors">Privacy Policy</Link>.
                        </p>
                        <button
                          type="submit"
                          disabled={sending}
                          className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-7 h-11 rounded-full bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0086F9] hover:to-[#22D3EE] text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_20px_-4px_rgba(4,107,210,0.55)]"
                        >
                          {sending ? "Sending…" : "Get my quote"}
                          {!sending && <ArrowRight className="w-4 h-4" />}
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
