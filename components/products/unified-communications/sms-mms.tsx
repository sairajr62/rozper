'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { SMSHero } from '@/components/products/unified-communications/sms-hero'
import {
  MessageSquare, Users, MessageCircle, Shield, BarChart3, Globe,
  ArrowRight, ChevronRight,
} from 'lucide-react'

const features = [
  { icon: MessageSquare, title: 'Two-Way SMS', desc: 'Send and receive SMS from your business number — agents reply from one inbox.' },
  { icon: Users, title: 'Bulk Campaigns', desc: 'Send personalized SMS blasts to thousands of contacts with merge fields.' },
  { icon: MessageCircle, title: 'WhatsApp Business', desc: 'Native WhatsApp Business integration — same inbox, zero switching.' },
  { icon: Shield, title: 'TCPA Compliance Tools', desc: 'Opt-out handling, consent tracking, and DNC list management built in.' },
  { icon: BarChart3, title: 'Delivery Analytics', desc: 'Real-time delivery reports, open rates, and response tracking per campaign.' },
  { icon: Globe, title: 'MMS & Rich Media', desc: 'Send images, PDFs, and rich media — supported in 30+ countries.' },
]

const faqs = [
  { q: 'Can customers reply to bulk SMS?', a: 'Yes. Replies route to the shared inbox where any agent can respond, or trigger automated flows.' },
  { q: 'Is WhatsApp included?', a: 'Yes. WhatsApp Business API is fully integrated — no separate account or meta setup needed.' },
  { q: 'How does TCPA compliance work?', a: 'Opt-out keywords (STOP, UNSUBSCRIBE) are auto-processed. Consent timestamps are stored and exportable.' },
]

const messagingConnects = [
  'Every SMS thread syncs to Salesforce, HubSpot, Zoho, and Zendesk automatically.',
  'Opt-out and compliance handling built in — no manual list management.',
  'Shared team inbox for SMS so no message goes unanswered.',
]

export function ProdUCaaSSMSMMSPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-x-clip">
      <Navbar />

      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#046BD2]/8 blur-[140px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/unified-communications/" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">sms-mms</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 overflow-x-clip grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <MessageSquare className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · SMS & MMS</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-3xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Messaging built<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">for business scale</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Two-way SMS, MMS, bulk campaigns, and WhatsApp — all from your business number, all in one inbox. TCPA compliance included.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-row flex-nowrap gap-2 sm:gap-3">
              <Link href="/contact/" className="group inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold transition whitespace-nowrap">
                Start messaging <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing/" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full border border-white/15 text-sm sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap">See pricing</Link>
            </motion.div>
          </div>

          <div className="flex items-start justify-center overflow-hidden h-[184px] sm:h-[238px] md:h-[300px] lg:h-[384px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3, ease: 'easeOut' } }}
              className="relative"
            >
              <SMSHero />
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Every messaging channel, one platform.</h2>
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
                  <p className="text-sm text-white/65 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">Messaging that connects to everything.</h2>
          </div>
          <div className="rounded-2xl bg-[#111B2D] border border-white/[0.07] p-6 sm:p-8">
            <ul className="space-y-4">
              {messagingConnects.map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 rounded border border-[#046BD2]/40 bg-[#046BD2]/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9]" />
                  </div>
                  <span className="text-sm text-white/80 leading-relaxed">{it}</span>
                </li>
              ))}
            </ul>
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
          <div className="relative rounded-3xl overflow-hidden bg-[#070B14] border border-white/10 p-6 sm:p-12 md:p-20 text-center">
            {/* Left arc glow */}
            <div className="hidden sm:block absolute -left-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none" aria-hidden>
              <motion.svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "blur(28px)" }} animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
                <circle cx="100" cy="100" r="78" stroke="#22D3EE" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
                <circle cx="100" cy="100" r="54" stroke="#046BD2" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(40 100 100)" />
              </motion.svg>
            </div>
            {/* Right arc glow */}
            <div className="hidden sm:block absolute -right-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none" aria-hidden>
              <motion.svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "blur(28px)" }} animate={{ rotate: -360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
                <circle cx="100" cy="100" r="78" stroke="#0086F9" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
                <circle cx="100" cy="100" r="54" stroke="#22D3EE" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(-40 100 100)" />
              </motion.svg>
            </div>
            {/* Faint background grid */}
            <div className="absolute inset-0 opacity-[0.18] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)" }} />
            <div className="relative">
              <MessageSquare className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">Text your customers. Win their loyalty.</h2>
              <div className="mt-10 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3">
                <Link href="/contact/" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm sm:text-base font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition whitespace-nowrap">
                  Start messaging <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing/" className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-sm sm:text-base text-white font-semibold transition whitespace-nowrap">See pricing</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
