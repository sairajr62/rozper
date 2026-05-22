'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { LaptopHero } from '@/components/products/ucaas/laptop-hero'
import {
  Globe2, Phone, Video, MessageSquare, Bot, Headphones, Zap, Shield,
  ArrowRight, ChevronRight, Wifi, Plug, Layers, MapPin,
} from 'lucide-react'

const products = [
  { icon: Phone, name: 'Business Phone', desc: 'Cloud calling in 150+ countries', href: '/products/ucaas/business-phone' },
  { icon: Video, name: 'HD Video Meetings', desc: 'AI transcripts built in', href: '/products/ucaas/video-meetings' },
  { icon: MessageSquare, name: 'Team Chat', desc: 'Channels, DMs, file share', href: '/products/ucaas/team-chat' },
  { icon: Bot, name: 'AI Assistant', desc: 'Live coaching on every call', href: '/products/ucaas/ai-assistant' },
  { icon: Phone, name: 'SMS & MMS', desc: 'Two-way business SMS', href: '/products/ucaas/sms-mms' },
  { icon: Plug, name: 'Customer Engagement', desc: 'Omnichannel customer hub', href: '/products/ucaas/customer-engagement' },
  { icon: Layers, name: 'Online Fax', desc: 'Send & receive without hardware', href: '/products/ucaas/online-fax' },
  { icon: MessageSquare, name: 'Website Chatbot', desc: 'Convert visitors instantly', href: '/products/ucaas/website-chatbot' },
]

const benefits = [
  'Voice, video, SMS, and chat on every seat',
  'AI Receptionist answers and qualifies 24/7',
  'CRM sync with Salesforce, HubSpot, and Zoho',
  'Extensions, hunt groups, and multi-level IVR',
  '300+ integrations available out of the box',
  'No long-term contracts — cancel anytime',
]

const sections = [
  { title: 'Every Channel in One Inbox', desc: 'Voice, SMS, WhatsApp, Instagram, Facebook, and web chat — unified for every agent. Stop switching between apps and start focusing on customers.', icon: Headphones, bullets: ['Omnichannel routing', 'Unified conversation history', 'Real-time analytics'], image: '/images/ucaas-unified-inbox.png' },
  { title: 'AI That Works While You Sleep', desc: 'AI Receptionist answers calls 24/7, qualifies leads, books appointments, and routes to the right team. No more missed opportunities.', icon: Zap, bullets: ['24/7 AI answering', 'Lead qualification', 'Appointment booking'], image: '/images/ucass-unified-ai.png' },
  { title: 'Built for Global Teams', desc: 'Local numbers in 150+ countries, carrier-grade routing, and 99.99% uptime. Your team works globally — your phone system should too.', icon: Globe2, bullets: ['Local presence worldwide', 'Carrier-grade network', 'Follow-the-sun support'], image: '/images/ucass-unified-global.png' },
]

const steps = [
  { n: '1', title: 'Sign Up', desc: 'Create your account in minutes. No credit card required for the 14-day trial.' },
  { n: '2', title: 'Configure', desc: 'Set up your numbers, extensions, and call flows with our intuitive admin portal.' },
  { n: '3', title: 'Go Live', desc: 'Start making calls, hosting meetings, and messaging — all from one platform.' },
]

const faqs = [
  { q: "What plans does Rozper offer?", a: 'Starter ($12.99/user/mo), Professional ($19.99/user/mo), and Enterprise ($29.99/user/mo). Annual billing saves up to 38% — Starter as low as $7.99/user/mo. All plans include calling, extensions, voicemail, recording, IVR, SMS, video, AI Receptionist, omnichannel chat, and CRM sync.' },
  { q: 'Does Rozper work outside the USA?', a: '150+ countries with local virtual numbers, global outbound, and carrier-grade routing. Built for international teams.' },
  { q: 'Can I use my existing SIP phones?', a: 'Yes. Rozper supports all major SIP phones and PBX systems with no custom configuration.' },
  { q: 'Is there a long-term contract?', a: 'No. Month-to-month plan with a 14-day free trial — no credit card required.' },
  { q: 'How quickly can we get started?', a: 'Most teams are up and running within a day. Port existing numbers or get new ones instantly.' },
]

export function UcaasPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-white/70">home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/platform" className="hover:text-white/70">platform</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">ucaas</span>
          </div>
        </div>

        {/* Hero — 2-column */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">

            {/* ── Left: copy ── */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#046BD2]/30 bg-[#046BD2]/5 mb-8">
                <Globe2 className="w-4 h-4 text-[#0086F9]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · Unified Communications</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
              >
                One platform.<br />
                <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent italic">Every country</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                className="mt-6 text-lg text-white/60 max-w-lg leading-relaxed"
              >
                Voice, video, messaging, and AI in one platform. One seat. One bill. One support team.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                  Start a free trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">
                  See Pricing
                </Link>
              </motion.div>

            </div>

            {/* ── Right: GSAP laptop ── */}
            <div className="hidden sm:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25, ease: 'easeOut' } }}
                className="relative"
              >
                <LaptopHero />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product orbit */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Everything on every seat.</h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">No tiers. No upcharges. Eight tools, one platform, one bill.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              >
                <Link href={p.href} className="group block p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#046BD2]/30 hover:bg-white/[0.05] transition h-full">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#046BD2]/20 to-[#2575FC]/20 border border-[#046BD2]/30 flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-[#0086F9]" />
                  </div>
                  <h3 className="font-display font-semibold mb-1 group-hover:text-[#0086F9] transition">{p.name}</h3>
                  <p className="text-sm text-white/50">{p.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* One platform feature dark */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-3xl bg-gradient-to-br from-[#111B2D] via-[#111B2D] to-[#046BD2]/15 border border-white/10 p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#046BD2]/10 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9] mb-4">// platform</div>
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
                  One platform.<br />
                  <span className="text-[#0086F9]">Zero compromises.</span>
                </h2>
                <p className="text-white/60 mb-8 max-w-md">Replace your patchwork of vendors with a single carrier-grade solution.</p>
                <Link href="/features" className="inline-flex items-center gap-2 text-[#0086F9] font-semibold group">
                  See all features <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="w-5 h-5 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9]" />
                    </div>
                    <span className="text-sm text-white/80">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Get started in <span className="text-[#0086F9]">minutes</span>.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <div className="font-display text-7xl font-bold bg-gradient-to-br from-[#046BD2]/30 to-[#2575FC]/10 bg-clip-text text-transparent mb-2">{s.n}</div>
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-white/60">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Alternating */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 space-y-24">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              <div>
                <s.icon className="w-12 h-12 text-[#0086F9] mb-6" strokeWidth={1.5} />
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">{s.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{s.desc}</p>
                <ul className="space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-white/80">
                      <MapPin className="w-4 h-4 text-[#0086F9] flex-shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              {s.image ? (
                <div className="relative w-full rounded-3xl overflow-hidden border border-white/10">
                  <Image
                    src={s.image}
                    alt={s.title}
                    width={2752}
                    height={1536}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-square max-w-md mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-[#046BD2]/15 to-[#0B1220] flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-8 rounded-full border border-white/5"
                  />
                  <motion.div
                    animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-16 rounded-full border border-white/10"
                  />
                  <s.icon className="w-32 h-32 text-[#0086F9]/80 relative" strokeWidth={1} />
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-12">FAQ</h2>
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

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.2),transparent_50%)]" />
            <Shield className="w-12 h-12 mx-auto mb-6 text-white relative" />
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight relative">Ready to unify<br />your communications?</h2>
            <p className="mt-6 text-lg text-white/85 max-w-xl mx-auto relative">Start with a 14-day free trial. No credit card required. Join teams across 150+ countries.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 relative">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
                Start a No-Pressure Conversation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white font-medium hover:bg-white/20 transition">
                See pricing
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
