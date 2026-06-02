"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Bot,
  Network,
  Headphones,
  LineChart,
  Globe2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"

const topics = [
  {
    icon: Bot,
    title: "AI & Automation",
    blurb:
      "Voice agents, sentiment, copilots. The systems quietly replacing the boring half of the queue.",
    count: 38,
    href: "/blog/topic/ai",
  },
  {
    icon: Network,
    title: "Voice Infrastructure",
    blurb:
      "Routing, codecs, latency budgets. The engineering behind a 99.99% SLA.",
    count: 27,
    href: "/blog/topic/infrastructure",
  },
  {
    icon: Headphones,
    title: "Customer Experience",
    blurb:
      "FCR playbooks, coaching scripts, and the metrics that actually move the needle.",
    count: 31,
    href: "/blog/topic/cx",
  },
  {
    icon: LineChart,
    title: "Wholesale Voice",
    blurb:
      "Margins, routes, and how carriers really earn (and lose) money on minutes.",
    count: 18,
    href: "/blog/topic/wholesale",
  },
  {
    icon: Globe2,
    title: "Going Global",
    blurb:
      "DID porting, regional regulations, and launching a number in countries you've never visited.",
    count: 22,
    href: "/blog/topic/global",
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    blurb:
      "HIPAA, SOC 2, PCI — practical patterns for regulated industries that move a lot of voice.",
    count: 14,
    href: "/blog/topic/compliance",
  },
]

export function BlogTopics() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* subtle accent backdrop */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(4,107,210,0.18) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
              Topic library
            </div>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-[-0.02em]">
              Six tracks, one signal-to-noise ratio
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#B8C4D4] font-light leading-relaxed">
              Hand-curated reading paths for the roles that work at the edge of
              voice — engineers, CX leads, RevOps, and the people keeping
              carriers honest.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {topics.map((topic, i) => {
            const Icon = topic.icon
            return (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={topic.href}
                  className="group relative block h-full p-5 sm:p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#046BD2]/40 transition-all duration-300 overflow-hidden"
                >
                  {/* hover glow */}
                  <div
                    className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(4,107,210,0.35) 0%, transparent 70%)",
                      filter: "blur(40px)",
                    }}
                  />

                  <div className="relative flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#046BD2]/30 to-[#22D3EE]/20 border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#22D3EE]" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-white/40">
                      {topic.count} posts
                    </span>
                  </div>

                  <h3 className="relative font-display mt-5 text-lg sm:text-xl font-semibold text-white tracking-[-0.015em]">
                    {topic.title}
                  </h3>
                  <p className="relative mt-2 text-sm text-[#B8C4D4] leading-relaxed font-light">
                    {topic.blurb}
                  </p>

                  <div className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#0086F9] group-hover:text-[#22D3EE] transition-colors">
                    Explore track
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
