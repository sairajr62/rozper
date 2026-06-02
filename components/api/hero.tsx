"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Copy, Check, Zap } from "lucide-react"

const sample = `curl -X POST https://api.rozper.com/v2/calls \\
  -H "Authorization: Bearer $ROZPER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to":   "+14155551234",
    "from": "+12025550100",
    "url":  "https://your.app/voice/answer"
  }'`

const response = `{
  "id": "call_01HXY7ZQ9V3J3X8K5N",
  "status": "queued",
  "to":     "+14155551234",
  "from":   "+12025550100",
  "created_at": "2026-05-12T14:23:01Z"
}`

export function ApiHero() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(sample)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* dotted background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(120,160,220,0.12) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
        }}
      />
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-[#22D3EE]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/[0.08] backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]"
            >
              <Zap className="w-3 h-3" />
              REST · WebSocket · gRPC
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
            >
              API
              <br />
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                reference.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 text-lg text-[#CCD6DF] leading-relaxed max-w-lg"
            >
              312 endpoints, complete OpenAPI spec, idempotency on every mutation,
              and a public uptime contract. No black boxes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-7 grid grid-cols-3 gap-3 max-w-md"
            >
              {[
                { k: "Base URL", v: "api.rozper.com" },
                { k: "Version", v: "v2026.05" },
                { k: "Rate limit", v: "1000 rps" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5"
                >
                  <div className="text-[9px] uppercase tracking-widest font-mono text-white/40">
                    {s.k}
                  </div>
                  <div className="mt-0.5 font-mono text-xs text-white">{s.v}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Code preview card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-[#22D3EE]/15 via-[#046BD2]/15 to-transparent blur-2xl rounded-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-[#070B14]/95 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/5 font-mono text-[10px] text-white/50">
                  <span className="text-emerald-400 font-bold">POST</span>
                  /v2/calls
                </div>
                <button
                  onClick={copy}
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label="Copy"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <pre className="px-5 py-4 text-xs font-mono text-[#CCD6DF] overflow-x-auto leading-relaxed">
                <code dangerouslySetInnerHTML={{ __html: highlightCurl(sample) }} />
              </pre>
              <div className="border-t border-white/5 px-5 py-3 bg-[#0B1220]/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 font-mono text-[10px] text-emerald-400">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" /> 201
                  </span>
                  <span className="font-mono text-[10px] text-white/40">
                    Response · 84 ms
                  </span>
                </div>
                <pre className="text-xs font-mono text-[#9AA8BC] leading-relaxed overflow-x-auto">
                  <code>{response}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function highlightCurl(code: string) {
  return code
    .replace(/(curl|-X|-H|-d)/g, '<span style="color:#22D3EE">$1</span>')
    .replace(/(POST|GET|PUT|DELETE|PATCH)/g, '<span style="color:#34D399;font-weight:600">$1</span>')
    .replace(/("[^"]*")/g, '<span style="color:#FBBF24">$1</span>')
    .replace(/(\$[A-Z_]+)/g, '<span style="color:#A78BFA">$1</span>')
}
