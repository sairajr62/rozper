"use client"

import { motion } from "framer-motion"
import { Lock, KeyRound, ShieldCheck } from "lucide-react"

export function ApiAuthSection() {
  return (
    <section className="relative py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
              <Lock className="w-3.5 h-3.5" />
              §01 · Authentication
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Bearer tokens. <br />
              Scoped. Rotatable.
            </h2>
            <p className="mt-4 text-[#9AA8BC] leading-relaxed">
              Every request carries a project key as a Bearer token. Keys are
              scoped (read, write, billing), rotatable without downtime, and can
              be IP-pinned from the dashboard.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                { Icon: KeyRound, t: "Per-environment keys (test / live)" },
                { Icon: ShieldCheck, t: "OAuth 2.0 client credentials supported" },
                { Icon: Lock, t: "Mutual TLS available on Enterprise" },
              ].map(({ Icon, t }) => (
                <li
                  key={t}
                  className="flex items-center gap-3 text-sm text-white/85"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#046BD2]/15 border border-[#046BD2]/30 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-[#22D3EE]" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Code block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0F1A2E]/60 backdrop-blur-md overflow-hidden"
          >
            <div className="flex items-center gap-4 px-5 py-3 border-b border-white/5 bg-[#070B14]/60">
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                Authorization header
              </div>
              <div className="ml-auto flex items-center gap-1">
                {["cURL", "Node", "Python", "Go"].map((l, i) => (
                  <span
                    key={l}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono ${
                      i === 0
                        ? "bg-[#046BD2]/20 text-white border border-[#046BD2]/40"
                        : "text-white/40 hover:text-white/70 cursor-pointer"
                    }`}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <pre className="px-5 py-5 text-xs font-mono text-[#CCD6DF] overflow-x-auto leading-relaxed">
{`# .env  →  never commit me
ROZPER_API_KEY=sk_live_8FzqQ...XW7p

# request
curl https://api.rozper.com/v2/account \\
  -H "Authorization: Bearer $ROZPER_API_KEY"

# 200 OK
{
  "id": "acct_01HXY7ZQ9V3J3X8K5N",
  "scopes": ["calls.write", "messages.write", "numbers.read"],
  "rate_limit": { "limit": 1000, "remaining": 998, "reset": 1715520000 }
}`}
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
