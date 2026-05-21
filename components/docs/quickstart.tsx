"use client"

import { motion } from "framer-motion"
import { Copy, Check, Terminal } from "lucide-react"
import { useState } from "react"

const steps = [
  {
    n: "01",
    title: "Install the SDK",
    body: "Pick a language. Every SDK ships typed clients, webhooks helpers, and a streaming runtime.",
    code: "npm install @rozper/sdk",
    lang: "bash",
  },
  {
    n: "02",
    title: "Authenticate",
    body: "Create a project key in your dashboard. Keep server keys server-side.",
    code: 'import { Rozper } from "@rozper/sdk"\n\nconst rozper = new Rozper({\n  apiKey: process.env.ROZPER_API_KEY,\n})',
    lang: "ts",
  },
  {
    n: "03",
    title: "Place your first call",
    body: "Two lines. The PSTN is now an API.",
    code: 'await rozper.calls.create({\n  to: "+14155551234",\n  from: "+12025550100",\n  url: "https://your.app/voice/answer",\n})',
    lang: "ts",
  },
]

export function DocsQuickstart() {
  const [copied, setCopied] = useState<number | null>(null)

  const copy = (i: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(i)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
              Quickstart · 5 minutes
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              From zero to first call.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/40">
            <Terminal className="w-3.5 h-3.5" />
            macos · linux · windows
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] overflow-hidden hover:border-[#046BD2]/40 transition-colors"
            >
              {/* Step number watermark */}
              <div className="absolute top-4 right-5 font-display text-7xl font-black text-white/[0.04] select-none">
                {s.n}
              </div>

              <div className="relative p-6">
                <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE]">
                  Step {s.n}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-[#9AA8BC] leading-relaxed min-h-[40px]">
                  {s.body}
                </p>
              </div>

              {/* Code block */}
              <div className="relative mx-6 mb-6 rounded-xl border border-white/5 bg-[#070B14] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                    {s.lang}
                  </span>
                  <button
                    onClick={() => copy(i, s.code)}
                    className="text-white/40 hover:text-white transition-colors"
                    aria-label="Copy"
                  >
                    {copied === i ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <pre className="px-4 py-3 text-xs font-mono text-[#CCD6DF] overflow-x-auto leading-relaxed">
                  <code>{s.code}</code>
                </pre>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
