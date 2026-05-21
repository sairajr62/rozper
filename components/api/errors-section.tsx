"use client"

import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

const codes = [
  { code: "400", title: "bad_request", body: "Malformed request body or missing required field.", tint: "amber" },
  { code: "401", title: "unauthorized", body: "Missing, expired, or revoked API key.", tint: "rose" },
  { code: "403", title: "forbidden", body: "Key lacks the scope required for this resource.", tint: "rose" },
  { code: "404", title: "not_found", body: "The resource id does not exist for this account.", tint: "amber" },
  { code: "409", title: "conflict", body: "Idempotency key collides with a different payload.", tint: "amber" },
  { code: "422", title: "invalid_param", body: "A parameter failed validation. Inspect param_errors[].", tint: "amber" },
  { code: "429", title: "rate_limited", body: "Backoff using the Retry-After header.", tint: "rose" },
  { code: "500", title: "server_error", body: "We were notified. Retry idempotent calls.", tint: "rose" },
]

const tintClasses: Record<string, string> = {
  amber: "bg-amber-500/10 border-amber-500/30 text-amber-300",
  rose: "bg-rose-500/10 border-rose-500/30 text-rose-300",
}

export function ApiErrorsSection() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
              <AlertTriangle className="w-3.5 h-3.5" />
              §03 · Errors
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Predictable, machine-readable errors.
            </h2>
            <p className="mt-4 text-[#9AA8BC] leading-relaxed">
              Every 4xx and 5xx returns the same shape: a stable{" "}
              <code className="font-mono text-xs text-[#22D3EE] bg-white/[0.04] px-1.5 py-0.5 rounded">code</code>,
              a human-readable message, and a request id you can paste to support.
            </p>

            <div className="mt-6 rounded-xl border border-white/10 bg-[#070B14] overflow-hidden">
              <div className="px-4 py-2 border-b border-white/5 font-mono text-[10px] text-white/40">
                Error envelope
              </div>
              <pre className="px-4 py-3 text-[11px] font-mono text-[#CCD6DF] overflow-x-auto leading-relaxed">
{`{
  "error": {
    "code": "invalid_param",
    "message": "to: must be E.164",
    "request_id": "req_01HXY7…",
    "param_errors": [
      { "param": "to", "reason": "format" }
    ]
  }
}`}
              </pre>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {codes.map((c, i) => (
                <motion.div
                  key={c.code}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 p-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-2 py-1 rounded-md border font-mono text-xs font-bold ${tintClasses[c.tint]}`}
                    >
                      {c.code}
                    </div>
                    <code className="font-mono text-sm text-white">
                      {c.title}
                    </code>
                  </div>
                  <p className="mt-2 text-xs text-[#9AA8BC] leading-relaxed">
                    {c.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
