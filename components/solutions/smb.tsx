'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Globe, Bot, Phone, Mail, FileText, Users, RefreshCw, Building,
  ArrowRight, ChevronRight, Sparkles, Star,
} from 'lucide-react'

const features = [
  { icon: Globe, title: 'Local Business Number', desc: 'Local business number in 150+ countries — look professional from day one.' },
  { icon: Bot, title: 'AI Receptionist', desc: 'Answers 24/7 — never miss a lead, even after hours.' },
  { icon: Phone, title: 'Auto-Attendant & Hunt Groups', desc: 'Route calls professionally without hiring a receptionist.' },
  { icon: Mail, title: 'Voicemail to Email', desc: 'AI transcription — read messages anywhere, anytime.' },
  { icon: FileText, title: 'Call Recording', desc: 'Record every client conversation — accessible from any device.' },
]

const detail = [
  { icon: Users, title: 'Add Seats in Minutes', desc: 'Scale as you hire — no hardware, no IT department needed.' },
  { icon: RefreshCw, title: 'CRM Sync', desc: 'HubSpot, Zoho, Salesforce — every contact record stays current.' },
  { icon: Building, title: 'Upgrade When Ready', desc: 'Move to contact center plan when ready — same platform, same data.' },
]

const stats = [
  { v: '$9.99', k: 'Per User/Month' },
  { v: '150+', k: 'Countries' },
  { v: '<1 hr', k: 'Setup Time' },
  { v: '24/7', k: 'AI Receptionist' },
]

const faqs = [
  { q: 'Is there a long-term contract?', a: 'No. 14-day free trial then month-to-month — no annual lock-in required.' },
  { q: 'Do I need an IT team?', a: 'No. Most businesses set up in under an hour. Onboarding team walks you through every step.' },
  { q: 'Can I add a second location later?', a: 'Yes. Multi-site routing on any plan — add location and routing rules in minutes.' },
]

export function SMBPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/solutions" className="hover:text-[#0086F9]">solutions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">smb</span>
          </div>
        </div>

        {/* Centered minimal hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#0086F9]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Solutions · Small Business</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Enterprise phone on a{' '}
            <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">small business</span> budget.
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            AI receptionist, call recording, and CRM sync — starting at <span className="text-white font-semibold">$9.99 per user</span>.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
              Start free trial — 14 days <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition">
              See pricing
            </Link>
          </motion.div>

          {/* Pricing card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }} className="mt-16 max-w-md mx-auto">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#046BD2]/15 via-[#111B2D] to-[#0B1220] border border-[#046BD2]/30 p-8 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#046BD2]/20 blur-3xl" />
              <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-white/10 text-[10px] font-mono uppercase tracking-widest text-white/70">all-in</div>
              <div className="text-left relative">
                <div className="text-xs font-mono uppercase tracking-widest text-[#0086F9]">SMB Starter</div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-display text-6xl font-bold">$9.99</span>
                  <span className="text-sm text-white/40">/user/mo</span>
                </div>
                <ul className="mt-5 space-y-2.5 text-sm text-white/70">
                  {['1 local business number', 'AI Receptionist included', 'Call recording + transcription', 'CRM sync · 150+ countries'].map(b => (
                    <li key={b} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/40 flex items-center justify-center flex-shrink-0">
                        <div className="w-1 h-1 rounded-full bg-[#0086F9]" />
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features simple cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Everything a small business needs.</h2>
            <p className="mt-4 text-white/60">Set it up in under an hour — no IT team required.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-7 rounded-3xl bg-[#111B2D] border border-white/10 hover:border-[#046BD2]/30 transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#046BD2]/15 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Grows with you */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Grows with your business.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {detail.map((d, i) => (
              <div key={d.title} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-[#046BD2]/15 border border-[#046BD2]/30 flex items-center justify-center mb-4">
                  <d.icon className="w-7 h-7 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{d.title}</h3>
                <p className="text-sm text-white/55 max-w-xs mx-auto">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#111B2D] border border-white/10 text-center">
                <div className="font-display text-3xl font-bold text-[#0086F9]">{s.v}</div>
                <div className="text-xs text-white/50 mt-2 font-mono uppercase tracking-wider">{s.k}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials — star rating review cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-[#0086F9] fill-[#0086F9]" />)}
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Small teams. Big results.</h2>
            <p className="mt-3 text-sm text-white/40 font-mono">Verified reviews from Rozper SMB customers</p>
          </div>

          {/* Featured review + side card */}
          <div className="grid md:grid-cols-12 gap-5 mb-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-8 p-8 rounded-3xl bg-gradient-to-br from-[#046BD2]/15 via-[#111B2D] to-[#0B1220] border border-[#046BD2]/30 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#0086F9] fill-[#0086F9]" />)}
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-[10px] font-mono text-emerald-400">✓ Verified</span>
                <span className="ml-auto text-[10px] font-mono text-white/30">Consulting · 3 employees</span>
              </div>
              <blockquote className="font-display text-xl md:text-2xl font-medium leading-relaxed text-white/90 flex-1 mb-8">
                "Rozper made our 3-person team sound like a 30-person company. The AI Receptionist handles calls I can't take. Setup took under an hour."
              </blockquote>
              <div className="flex items-center gap-3 pt-5 border-t border-[#046BD2]/20">
                <div className="w-10 h-10 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[#2D98F1] font-display font-bold">KA</div>
                <div>
                  <div className="font-semibold">Kwame Asante</div>
                  <div className="text-xs text-white/50">Founder · Asante Advisory</div>
                </div>
                <div className="ml-auto hidden md:flex items-center gap-2 text-[10px] text-white/30 font-mono">
                  <span>Before: missed calls</span>
                  <span className="text-white/20">→</span>
                  <span className="text-emerald-400">After: 100% answered</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="md:col-span-4 p-6 rounded-3xl bg-[#111B2D] border border-white/10 hover:border-[#046BD2]/30 transition flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#0086F9] fill-[#0086F9]" />)}
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-[10px] font-mono text-emerald-400">✓ Verified</span>
              </div>
              <div className="text-[10px] font-mono text-white/30 mb-4">Retail · 8 employees</div>
              <blockquote className="font-display text-base font-medium leading-relaxed text-white/80 flex-1 mb-5">
                "I run a boutique with two locations. Rozper routes calls to whichever shop is free. It's like having a full receptionist team for the price of a coffee."
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 font-display font-bold text-xs">LM</div>
                <div>
                  <div className="font-semibold text-sm">Lucia Moreno</div>
                  <div className="text-xs text-white/40">Owner · Moda Latina Boutique</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Three more review cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                initials: 'JB', name: 'Jake Bowen', title: 'Founder · Bowen Legal Consulting',
                avatarClass: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
                biz: 'Legal · 5 employees',
                quote: '"Voicemail transcription saved my week. I read messages between client sessions — no more playing 20 voicemails at the end of the day."',
              },
              {
                initials: 'RF', name: 'Ranya Farhat', title: 'Co-Founder · Spark Media Studio',
                avatarClass: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
                biz: 'Media · 12 employees',
                quote: '"The $9.99 price looked too good to be true. But it genuinely does everything — call recording, CRM sync, AI Receptionist. No hidden fees."',
              },
              {
                initials: 'PL', name: 'Pavel Lund', title: 'CEO · Lund Logistics',
                avatarClass: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300',
                biz: 'Logistics · 20 employees',
                quote: '"We scaled from 4 to 20 employees in six months. Adding a new seat takes 2 minutes. No IT tickets, no hardware, no waiting."',
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-7 rounded-3xl bg-[#111B2D] border border-white/10 hover:border-[#046BD2]/30 transition flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-[#0086F9] fill-[#0086F9]" />)}
                  </div>
                  <span className="ml-auto text-[10px] font-mono text-white/30">{t.biz}</span>
                </div>
                <blockquote className="font-display text-sm font-medium leading-relaxed text-white/80 flex-1 mb-5">{t.quote}</blockquote>
                <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.06]">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-display font-bold text-xs ${t.avatarClass}`}>{t.initials}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-white/40">{t.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8 text-center">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-2xl bg-[#111B2D] border border-white/10 p-6 hover:bg-[#1A2638] transition">
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
          <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-white">Sound bigger. Pay less.</h2>
            <p className="mt-6 text-white/80 max-w-md mx-auto">14-day free trial. No credit card required. Cancel anytime.</p>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
              Start free trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
