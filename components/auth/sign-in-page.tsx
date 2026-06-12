"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Phone, Video, MessageSquare, Zap } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

const features = [
  { icon: Phone,         label: "HD Voice Calls",       desc: "Crystal-clear calls in 150+ countries" },
  { icon: Video,         label: "1080p Video Meetings",  desc: "Screen share & recording built in" },
  { icon: MessageSquare, label: "Team Chat & SMS",       desc: "Channels, DMs and bulk messaging" },
  { icon: Zap,           label: "AI-Powered",            desc: "Transcription, summaries & more" },
]

export function SignInPageView() {
  const [showPassword, setShowPassword] = useState(false)
  const [keepSignedIn, setKeepSignedIn] = useState(true)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: email.split("@")[0],
          lastName: "",
          email,
          company: email.split("@")[1] ?? "",
          companySize: "—",
          interests: ["Sign-in"],
          message: `Sign-in attempt from ${email}`,
        }),
      })
    } catch {
      // non-blocking — proceed to redirect regardless
    }
    window.location.href = "https://app.rozper.com"
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1220] text-white">
      <Navbar />

      {/* Aurora blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-40 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-[#22D3EE]/10 blur-[120px] sm:blur-[150px] rounded-full" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#046BD2]/12 blur-[100px] sm:blur-[130px] rounded-full" />
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
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* ── Left: Form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full"
          >
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight mb-1">
              Welcome back
            </h1>
            <p className="text-white/45 mb-5 text-sm">
              Sign in to your Rozper workspace
            </p>

            <div className="relative rounded-2xl border border-white/10 bg-[#0F1A2E]/80 backdrop-blur-xl p-5 sm:p-7">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-[#046BD2]/20 to-white/5 -z-10" />

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
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

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-white/40">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-xs text-[#22D3EE]/70 hover:text-[#22D3EE] transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full h-11 px-4 pr-11 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/[0.05] transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Keep signed in */}
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <button
                    type="button"
                    onClick={() => setKeepSignedIn(!keepSignedIn)}
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0 ${
                      keepSignedIn ? "bg-[#046BD2] border-[#046BD2]" : "border-white/20 bg-white/[0.03]"
                    }`}
                  >
                    {keepSignedIn && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <span className="text-sm text-white/55">Keep me signed in</span>
                </label>

                {/* Submit */}
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
                      Signing in…
                    </>
                  ) : (
                    <>Log in to Rozper <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-white/40">
                Not a customer?{" "}
                <Link href="/free-trial" className="font-semibold text-[#22D3EE] hover:text-white transition-colors">
                  Start your free trial ↗
                </Link>
              </p>
            </div>
          </motion.div>

          {/* ── Right: Features (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="hidden lg:flex flex-col gap-3"
          >
            <p className="text-white/40 text-sm leading-relaxed mb-2">
              One platform for calls, video, chat, SMS and AI — trusted by teams in 150+ countries.
            </p>

            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.18 + i * 0.06 }}
                className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 hover:bg-white/[0.06] hover:border-white/15 transition-colors"
              >
                <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center shrink-0 shadow-[0_4px_14px_-4px_rgba(4,107,210,0.5)]">
                  <f.icon className="w-4 h-4 text-white" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{f.label}</p>
                  <p className="text-xs text-white/45 mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.02] mt-1">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <p className="text-xs text-white/50">
                <span className="text-white font-medium">99.99% uptime SLA</span> · SOC 2 Type II · ISO 27001
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
