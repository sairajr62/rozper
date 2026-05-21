"use client"

import { motion } from "framer-motion"
import {
  Compass,
  PhoneCall,
  Bot,
  Globe2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

const paths = [
  {
    track: "Track 01",
    Icon: PhoneCall,
    title: "Voice fundamentals",
    summary:
      "Become productive with calls, recordings, and webhooks in under an afternoon.",
    progress: 0,
    chapters: [
      "Setup & authentication",
      "Place & receive calls",
      "Recordings & transcripts",
      "Webhooks & TwiML-style verbs",
      "Going to production",
    ],
    accent: "from-[#22D3EE] to-[#046BD2]",
  },
  {
    track: "Track 02",
    Icon: Bot,
    title: "Ship an AI voice agent",
    summary:
      "Sub-300ms latency, tool calling, escalation, and analytics. End-to-end.",
    progress: 0,
    chapters: [
      "Pick a voice & persona",
      "Connect your knowledge base",
      "Define tools the agent can call",
      "Live transfer to a human",
      "Measure resolution",
    ],
    accent: "from-[#A78BFA] to-[#2575FC]",
  },
  {
    track: "Track 03",
    Icon: Globe2,
    title: "Global scale-out",
    summary:
      "Number provisioning, regional pinning, and routing across 150+ countries.",
    progress: 0,
    chapters: [
      "Buying numbers programmatically",
      "Compliance & local presence",
      "Regional pinning",
      "Failover & least-cost routing",
      "Reporting at scale",
    ],
    accent: "from-[#34D399] to-[#0086F9]",
  },
]

export function DocsLearningPaths() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-transparent via-[#070B14] to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
              <Compass className="w-3.5 h-3.5" />
              Learning paths
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white max-w-2xl">
              Pick a path. Finish it in a sitting.
            </h2>
            <p className="mt-3 text-[#9AA8BC] max-w-xl">
              Opinionated, end-to-end tutorials. No dead ends, no half-explained
              steps — just the path of least resistance to a shipped feature.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {paths.map((p, i) => {
            const Icon = p.Icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-white/10 bg-[#0F1A2E]/60 backdrop-blur-md p-6 hover:border-white/20 hover:-translate-y-1 transition-all overflow-hidden"
              >
                {/* Accent corner */}
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl pointer-events-none`}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.accent} bg-opacity-20 border border-white/10 flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    {p.track}
                  </span>
                </div>

                <h3 className="relative mt-5 font-display text-xl font-bold text-white">
                  {p.title}
                </h3>
                <p className="relative mt-2 text-sm text-[#9AA8BC] leading-relaxed">
                  {p.summary}
                </p>

                <ul className="relative mt-5 space-y-2">
                  {p.chapters.map((c, idx) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <span className="mt-[3px] inline-flex items-center justify-center w-4 h-4 rounded-full border border-white/15 text-[9px] font-mono text-white/40">
                        {idx + 1}
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                <button className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#22D3EE] hover:text-white transition-colors">
                  Start track
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="relative mt-5 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/30">
                  <CheckCircle2 className="w-3 h-3" />
                  {p.chapters.length} chapters · self-paced
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
