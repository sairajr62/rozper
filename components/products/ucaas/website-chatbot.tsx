'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { ChatbotHero } from '@/components/products/ucaas/chatbot-hero'
import {
  Zap, Users, BarChart3, Globe, Code,
  ArrowRight, ChevronRight, Bot,
} from 'lucide-react'

const features = [
  { icon: Bot, title: 'AI-Powered Conversations', desc: 'Answers FAQs, qualifies leads, and books meetings — 24/7 without an agent.' },
  { icon: Zap, title: 'One-Line Embed', desc: 'Add to any website with a single script tag — live in minutes, no developer needed.' },
  { icon: Users, title: 'Live Agent Handoff', desc: 'Escalate to a live agent with full conversation context — no re-introduction.' },
  { icon: BarChart3, title: 'Engagement Analytics', desc: 'See conversations, conversions, and CSAT per page or campaign in real time.' },
  { icon: Globe, title: 'Multi-Language Support', desc: 'Auto-detect visitor language and respond in 40+ languages.' },
  { icon: Code, title: 'Custom Flows & Triggers', desc: 'Trigger the chat on exit intent, scroll depth, or time on page — no code.' },
]

const faqs = [
  { q: 'Does it work on any website?', a: 'Yes. Paste a single script tag into any HTML page — works with React, WordPress, Shopify, Webflow, and more.' },
  { q: 'Can it book calendar appointments?', a: 'Yes. Connect your calendar and the chatbot books meetings directly — confirmed via SMS and email.' },
  { q: 'How does live agent handoff work?', a: 'When the AI can\'t help or the visitor requests it, chat routes to a live agent with full conversation history.' },
]


export function ProdUCaaSWebsiteChatbotPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-hidden">
      <Navbar />

      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#046BD2]/7 blur-[140px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/ucaas" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">website-chatbot</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 overflow-x-clip grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Bot className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · Website Chatbot</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Engage visitors<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">24/7</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              AI chatbot that captures leads, books meetings, and hands off to live agents — one-line embed. Never miss a visitor again.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-row flex-nowrap gap-2 sm:gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold transition whitespace-nowrap">
                Add to your site <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full border border-white/15 text-sm sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap">See pricing</Link>
            </motion.div>
          </div>

          <div className="flex items-start justify-center overflow-hidden h-[191px] sm:h-[246px] md:h-[310px] lg:h-[397px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3, ease: 'easeOut' } }}
              className="relative"
            >
              <ChatbotHero />
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Convert visitors. Capture every lead.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#111B2D] border border-white/[0.07] hover:border-[#046BD2]/30 transition-colors group"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-all mt-0.5">
                  <f.icon className="w-4 h-4 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-[#0086F9] transition-colors">{f.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8 text-center">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:bg-white/[0.05] transition">
                <summary className="flex items-center justify-between cursor-pointer list-none font-display font-semibold">
                  <span>{f.q}</span>
                  <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform text-[#0086F9]" />
                </summary>
                <p className="mt-4 text-white/60">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="relative rounded-[2.5rem] overflow-hidden p-6 sm:p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <Bot className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">Your site. Always on. Always converting.</h2>
            <div className="mt-10 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3">
              <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-white/15 border border-white/30 text-sm sm:text-base text-white font-semibold hover:bg-white/25 transition whitespace-nowrap">See pricing</Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-white text-[#046BD2] text-sm sm:text-base font-semibold hover:scale-105 transition whitespace-nowrap">
                Add to your site <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
