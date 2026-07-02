"use client"

import { motion } from "framer-motion"
import { MessageCircle, Github, BookMarked, LifeBuoy, ArrowRight } from "lucide-react"

const blocks = [
  {
    Icon: MessageCircle,
    title: "Developer Discord",
    body: "5,000+ devs. Engineers from the platform team answer in <1h business hours.",
    cta: "Join Discord",
    href: "#",
  },
  {
    Icon: Github,
    title: "Open source",
    body: "All SDKs, examples, and the docs site itself. PRs welcome.",
    cta: "Browse repos",
    href: "#",
  },
  {
    Icon: BookMarked,
    title: "Recipes & examples",
    body: "200+ copy-paste recipes for common patterns — webhooks, retries, streaming.",
    cta: "Open cookbook",
    href: "#",
  },
  {
    Icon: LifeBuoy,
    title: "Premium support",
    body: "Dedicated Slack channel and a 15-min response SLA for Scale & Enterprise.",
    cta: "Talk to sales",
    href: "/contact/",
  },
]

export function DocsCommunity() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
            Stuck? We&apos;re close by.
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Built and maintained in the open.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blocks.map((b, i) => {
            const Icon = b.Icon
            return (
              <motion.a
                key={b.title}
                href={b.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#046BD2]/40 p-6 transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg bg-[#046BD2]/15 border border-[#046BD2]/30 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-[#22D3EE]" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-[#9AA8BC] leading-relaxed">
                  {b.body}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#22D3EE] group-hover:text-white">
                  {b.cta}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
