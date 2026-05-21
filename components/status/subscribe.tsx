"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Bell, Mail, MessageSquare, Rss, Webhook, ArrowRight } from "lucide-react"

const channels = [
  { Icon: Mail, label: "Email", desc: "Per-component updates straight to your inbox." },
  { Icon: MessageSquare, label: "SMS", desc: "Sev-1 only. Always-on, even outside hours." },
  { Icon: Webhook, label: "Webhook", desc: "Push to your incident pipeline / Slack / PagerDuty." },
  { Icon: Rss, label: "RSS / Atom", desc: "Plain feeds. Self-host away." },
]

export function StatusSubscribe() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  return (
    <section className="relative py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F1A2E] via-[#0B1220] to-[#0F1A2E] overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#22D3EE]/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12">
            <div className="md:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono uppercase tracking-[0.18em] text-white/70">
                <Bell className="w-3 h-3" />
                Subscribe
              </div>
              <h2 className="font-display mt-5 text-2xl md:text-3xl font-bold text-white leading-tight">
                Know before your customers do.
              </h2>
              <p className="mt-3 text-sm text-[#9AA8BC] leading-relaxed">
                Pick the components you care about and the channels you check —
                we&apos;ll do the routing. Average notification latency under 8s
                from incident open.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email) {
                    setDone(true)
                    setEmail("")
                  }
                }}
                className="mt-6 relative flex items-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md focus-within:border-[#22D3EE]/40 transition-colors"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 outline-none"
                />
                <button
                  type="submit"
                  className="m-1 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm font-medium transition-colors"
                >
                  {done ? "Subscribed" : (
                    <>
                      Subscribe
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
              <p className="mt-2 text-[11px] text-white/35">
                Unsubscribe anytime. We never share your details.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {channels.map((c) => {
                const Icon = c.Icon
                return (
                  <div
                    key={c.label}
                    className="rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 p-4 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-md bg-[#046BD2]/15 border border-[#046BD2]/30 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-[#22D3EE]" />
                      </span>
                      <span className="font-medium text-white text-sm">
                        {c.label}
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs text-[#9AA8BC] leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
