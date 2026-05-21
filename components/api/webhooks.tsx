"use client"

import { motion } from "framer-motion"
import { Webhook, RotateCw, ShieldCheck } from "lucide-react"

const events = [
  { name: "call.initiated", desc: "Outbound call accepted by the carrier." },
  { name: "call.ringing", desc: "Far-end is ringing." },
  { name: "call.answered", desc: "Far-end answered (or AMD detected human)." },
  { name: "call.completed", desc: "Call ended. Includes duration, billing, leg metadata." },
  { name: "recording.ready", desc: "Recording asset uploaded and signed URL available." },
  { name: "message.delivered", desc: "Carrier delivery receipt (where supported)." },
  { name: "agent.handoff", desc: "AI agent escalated to a human queue." },
  { name: "number.purchased", desc: "Number acquisition completed." },
]

export function ApiWebhooks() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
              <Webhook className="w-3.5 h-3.5" />
              §04 · Webhooks
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Signed, retried, replay-protected.
            </h2>
            <p className="mt-4 text-[#9AA8BC] leading-relaxed">
              Every event is delivered with an HMAC signature, a unique event id,
              and a UTC timestamp. We retry with exponential backoff for up to 24
              hours.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {[
                { Icon: ShieldCheck, t: "HMAC-SHA256 signature in Rozper-Signature" },
                { Icon: RotateCw, t: "Up to 8 retries · 24h window" },
                { Icon: Webhook, t: "Send to multiple endpoints simultaneously" },
              ].map(({ Icon, t }) => (
                <div
                  key={t}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02]"
                >
                  <span className="w-8 h-8 rounded-md bg-[#046BD2]/15 border border-[#046BD2]/30 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-[#22D3EE]" />
                  </span>
                  <span className="text-sm text-white/85">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {/* Verify snippet */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-white/10 bg-[#070B14] overflow-hidden"
            >
              <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Verify a webhook · Node
                </span>
                <span className="font-mono text-[10px] text-emerald-400">
                  ✓ constant-time compare
                </span>
              </div>
              <pre className="px-5 py-4 text-xs font-mono text-[#CCD6DF] overflow-x-auto leading-relaxed">
{`import { verify } from "@rozper/sdk/webhooks"

app.post("/webhooks/rozper", (req, res) => {
  const ok = verify({
    payload:   req.rawBody,
    signature: req.header("Rozper-Signature"),
    secret:    process.env.ROZPER_WEBHOOK_SECRET,
  })
  if (!ok) return res.status(401).end()

  const event = JSON.parse(req.rawBody)
  switch (event.type) {
    case "call.completed": /* … */
    case "recording.ready": /* … */
  }
  res.json({ received: true })
})`}
              </pre>
            </motion.div>

            {/* Event catalog */}
            <div className="rounded-2xl border border-white/10 bg-[#0F1A2E]/50 backdrop-blur-md p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 mb-3">
                Event catalog · 32 total
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {events.map((e) => (
                  <div
                    key={e.name}
                    className="px-3 py-2.5 rounded-lg border border-white/5 bg-white/[0.015] hover:bg-white/[0.04] transition-colors"
                  >
                    <code className="font-mono text-[11px] text-[#22D3EE]">
                      {e.name}
                    </code>
                    <p className="mt-1 text-[11px] text-[#9AA8BC] leading-relaxed">
                      {e.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
