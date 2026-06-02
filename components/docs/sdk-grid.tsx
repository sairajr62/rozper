"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Github, Star } from "lucide-react"

const sdks = [
  { lang: "Node.js", install: "npm i @rozper/sdk", stars: "2.1k", color: "#3C873A", glyph: "N" },
  { lang: "Python", install: "pip install rozper", stars: "1.8k", color: "#3776AB", glyph: "Py" },
  { lang: "Go", install: "go get github.com/rozper/go-sdk", stars: "640", color: "#00ADD8", glyph: "Go" },
  { lang: "Ruby", install: "gem install rozper", stars: "412", color: "#CC342D", glyph: "Rb" },
  { lang: "PHP", install: "composer require rozper/sdk", stars: "298", color: "#777BB4", glyph: "Ph" },
  { lang: "Java", install: 'implementation "io.rozper:sdk:2.0"', stars: "554", color: "#F89820", glyph: "Jv" },
  { lang: ".NET", install: "dotnet add package Rozper", stars: "330", color: "#512BD4", glyph: ".N" },
  { lang: "Rust", install: "cargo add rozper", stars: "188", color: "#DEA584", glyph: "Rs" },
]

export function DocsSDKGrid() {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
            Official SDKs · Open source
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Drop in. Type-safe. Production-ready.
          </h2>
          <p className="mt-3 text-[#9AA8BC] max-w-xl mx-auto">
            All SDKs share the same surface area — switching languages doesn&apos;t mean
            relearning the platform.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sdks.map((sdk, i) => (
            <motion.a
              key={sdk.lang}
              href="#"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative rounded-xl border border-white/10 bg-[#0F1A2E]/60 backdrop-blur-md p-5 hover:border-white/25 hover:-translate-y-1 transition-all overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-white text-sm"
                  style={{
                    backgroundColor: `${sdk.color}25`,
                    border: `1px solid ${sdk.color}55`,
                  }}
                >
                  {sdk.glyph}
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#22D3EE] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="mt-4 font-semibold text-white">{sdk.lang}</div>
              <div className="mt-2 flex items-center gap-2 text-[11px] font-mono text-white/40">
                <Github className="w-3 h-3" />
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" /> {sdk.stars}
                </span>
              </div>
              <div className="mt-3 px-2.5 py-1.5 rounded-md bg-[#070B14] border border-white/5 font-mono text-[10px] text-[#22D3EE] truncate">
                {sdk.install}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
