'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { SMSHero } from '@/components/products/unified-communications/sms-hero'
import {
  MessageSquare, Users, MessageCircle, Shield, BarChart3, Globe,
  ArrowRight, ChevronRight, ShieldCheck, Send,
} from 'lucide-react'

const features = [
  { icon: MessageSquare, title: 'Two-Way SMS', desc: 'Send and receive SMS from your business number — agents reply from one inbox.' },
  { icon: Users, title: 'Bulk Campaigns', desc: 'Send personalized SMS blasts to thousands of contacts with merge fields.' },
  { icon: MessageCircle, title: 'WhatsApp Business', desc: 'Native WhatsApp Business integration — same inbox, zero switching.' },
  { icon: Shield, title: 'TCPA Compliance Tools', desc: 'Opt-out handling, consent tracking, and DNC list management built in.' },
  { icon: BarChart3, title: 'Delivery Analytics', desc: 'Real-time delivery reports, open rates, and response tracking per campaign.' },
  { icon: Globe, title: 'MMS & Rich Media', desc: 'Send images, PDFs, and rich media — supported in 30+ countries.' },
]

const deliverability = [
  { icon: ShieldCheck, title: 'Built to actually land in the inbox', desc: "10DLC registration and carrier compliance are handled for you, so your messages don't get flagged as spam before they arrive. Send at scale without babysitting deliverability rules — Rozper keeps your sender reputation clean as volume grows." },
  { icon: BarChart3, title: 'See what actually gets replies', desc: 'Campaign-level reporting shows open rates, reply rates, and opt-outs for every SMS blast you send. See which templates get responses, and adjust your next campaign on real numbers, not a hunch.' },
  { icon: Globe, title: 'Local numbers in 150+ countries', desc: "Send to customers in 150+ countries from numbers that match their region, so messages read as local, not foreign. Delivery rates stay high because the routing is built for it — your reach isn't capped at your home market." },
]

const smsFlow = [
  { icon: ShieldCheck, title: 'Register once', desc: '10DLC registration and carrier compliance are handled for you — set up in minutes, not weeks.' },
  { icon: Users, title: 'Build your list', desc: 'Import contacts or collect opt-ins; consent and DNC status are tracked automatically.' },
  { icon: Send, title: 'Send at scale', desc: 'Personalized bulk campaigns go out from your business number with merge fields.' },
  { icon: BarChart3, title: 'Track & optimize', desc: 'Delivery, open, reply, and opt-out reporting per campaign tells you what to send next.' },
]

const CARD_ACCENTS = [
  'from-[#046BD2] to-[#0086F9]',
  'from-[#0086F9] to-[#2D98F1]',
  'from-[#2D98F1] to-[#046BD2]',
  'from-[#046BD2] to-[#0060C7]',
]

const faqs = [
  { q: 'Can customers reply to bulk SMS?', a: 'Yes. Replies route to the shared inbox where any agent can respond, or trigger automated flows.' },
  { q: 'Is WhatsApp included?', a: 'Yes. WhatsApp Business API is fully integrated — no separate account or meta setup needed.' },
  { q: 'How does TCPA compliance work?', a: 'Opt-out keywords (STOP, UNSUBSCRIBE) are auto-processed. Consent timestamps are stored and exportable.' },
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
                  <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">SMS &amp; MMS</span>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
              Messaging that lands,{' '}
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">everywhere</span>.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {deliverability.map((f, i) => {
              const accent = CARD_ACCENTS[i % CARD_ACCENTS.length]
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/25 p-6 transition-all hover:-translate-y-1 overflow-hidden"
                >
                  <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-2xl pointer-events-none transition-opacity group-hover:opacity-30`} />
                  <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${accent} bg-opacity-20 border border-white/15 flex items-center justify-center`}>
                    <f.icon className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="relative mt-5 font-display font-semibold text-white">{f.title}</h3>
                  <p className="relative mt-2 text-sm text-white/50 leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">How it works</span>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
              From signup to first send, fast.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {smsFlow.map((s, i) => {
              const accent = CARD_ACCENTS[i % CARD_ACCENTS.length]
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/25 p-6 transition-all hover:-translate-y-1 overflow-hidden"
                >
                  <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-2xl pointer-events-none transition-opacity group-hover:opacity-30`} />
                  <div className="relative flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} bg-opacity-20 border border-white/15 flex items-center justify-center`}>
                      <s.icon className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
                    </div>
                    <span className={`font-mono text-3xl font-bold bg-gradient-to-br ${accent} bg-clip-text text-transparent opacity-40`}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="relative mt-5 font-display font-semibold text-white">{s.title}</h3>
                  <p className="relative mt-2 text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </motion.div>
              )
            })}
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
          <div className="relative rounded-3xl overflow-hidden bg-[#0B1220] border border-white/10 p-6 sm:p-12 md:p-20 text-center">
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
