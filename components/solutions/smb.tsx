'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Globe, Bot, Phone, Mail, Mic, Users, Database, ArrowUpCircle,
  ArrowRight, ChevronRight, Sparkles, Star,
} from 'lucide-react'

const features = [
  { icon: Globe, title: 'Local Business Number', desc: 'Local business number in 150+ countries — look professional from day one.' },
  { icon: Bot, title: 'AI Receptionist', desc: 'Answers 24/7 — never miss a lead, even after hours.' },
  { icon: Phone, title: 'Auto-Attendant & Hunt Groups', desc: 'Route calls professionally without hiring a receptionist.' },
  { icon: Mail, title: 'Voicemail to Email', desc: 'AI transcription — read messages anywhere, anytime.' },
  { icon: Mic, title: 'Call Recording', desc: 'Record every client conversation — accessible from any device.' },
]

const detail = [
  { icon: Users, title: 'Add Seats in Minutes', desc: 'Scale as you hire — no hardware, no IT department needed.' },
  { icon: Database, title: 'CRM Sync', desc: 'HubSpot, Zoho, Salesforce — every contact record stays current.' },
  { icon: ArrowUpCircle, title: 'Upgrade When Ready', desc: 'Move to contact center plan when ready — same platform, same data.' },
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

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Enterprise phone on a{' '}
            <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">small business</span> budget.
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            AI receptionist, call recording, and CRM sync — starting at <span className="text-white font-semibold">$9.99 per user</span>.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-row flex-wrap justify-center gap-3">
            <Link href="/contact" className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-xs sm:text-base whitespace-nowrap font-semibold transition">
              Start free trial — 14 days <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full border border-white/15 text-white text-xs sm:text-base whitespace-nowrap font-medium hover:bg-white/5 transition">
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

          <div className="space-y-4">
            {/* Featured first card — full width */}
            {features.slice(0, 1).map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}
                className="flex items-start gap-6 rounded-2xl bg-[#111B2D] border border-[#046BD2]/20 p-7 group hover:border-[#046BD2]/40 transition-colors"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#046BD2]/15 border border-[#046BD2]/25 flex items-center justify-center group-hover:bg-[#046BD2]/25 transition-all">
                  <f.icon className="w-6 h-6 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-lg mb-1.5">{f.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed max-w-2xl">{f.desc}</p>
                </div>
              </motion.div>
            ))}
            {/* Remaining 4 in 2x2 grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {features.slice(1).map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i + 1) * 0.07 }}
                  className="flex items-start gap-4 rounded-2xl bg-[#111B2D] border border-white/[0.08] p-5 group hover:border-[#046BD2]/30 transition-colors"
                >
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-all mt-0.5">
                    <f.icon className="w-4 h-4 text-[#0086F9]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm mb-1">{f.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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

        {/* Testimonials — verified review platform cards, all equal */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-16">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#0086F9]/60 mb-3">// verified.reviews[]</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Small teams. Big results.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                platform: 'G2', platformColor: 'text-orange-400', platformBg: 'bg-orange-400/10 border-orange-400/20',
                helpful: '42 people found this helpful',
                segment: 'Consulting', employees: '3 seats',
                initials: 'KA', name: 'Kwame Asante', title: 'Founder · Asante Advisory',
                avatarBg: 'bg-[#046BD2]/20 border-[#046BD2]/30 text-[#2D98F1]',
                quote: '"Rozper made our 3-person team sound like a 30-person company. The AI Receptionist handles calls I can\'t take. Setup took under an hour."',
              },
              {
                platform: 'Capterra', platformColor: 'text-blue-400', platformBg: 'bg-blue-400/10 border-blue-400/20',
                helpful: '31 people found this helpful',
                segment: 'Retail', employees: '8 seats',
                initials: 'LM', name: 'Lucia Moreno', title: 'Owner · Moda Latina Boutique',
                avatarBg: 'bg-violet-500/20 border-violet-500/30 text-violet-300',
                quote: '"I run a boutique with two locations. Rozper routes calls to whichever shop is free. It\'s like having a full receptionist team for the price of a coffee."',
              },
              {
                platform: 'Google', platformColor: 'text-emerald-400', platformBg: 'bg-emerald-400/10 border-emerald-400/20',
                helpful: '28 people found this helpful',
                segment: 'Legal', employees: '5 seats',
                initials: 'JB', name: 'Jake Bowen', title: 'Founder · Bowen Legal Consulting',
                avatarBg: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
                quote: '"Voicemail transcription saved my week. I read messages between client sessions — no more playing 20 voicemails at the end of the day."',
              },
              {
                platform: 'G2', platformColor: 'text-orange-400', platformBg: 'bg-orange-400/10 border-orange-400/20',
                helpful: '19 people found this helpful',
                segment: 'Media', employees: '12 seats',
                initials: 'RF', name: 'Ranya Farhat', title: 'Co-Founder · Spark Media Studio',
                avatarBg: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
                quote: '"The $9.99 price looked too good to be true. But it genuinely does everything — call recording, CRM sync, AI Receptionist. No hidden fees."',
              },
              {
                platform: 'Capterra', platformColor: 'text-blue-400', platformBg: 'bg-blue-400/10 border-blue-400/20',
                helpful: '37 people found this helpful',
                segment: 'Logistics', employees: '20 seats',
                initials: 'PL', name: 'Pavel Lund', title: 'CEO · Lund Logistics',
                avatarBg: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300',
                quote: '"We scaled from 4 to 20 employees in six months. Adding a new seat takes 2 minutes. No IT tickets, no hardware, no waiting."',
              },
              {
                platform: 'Google', platformColor: 'text-emerald-400', platformBg: 'bg-emerald-400/10 border-emerald-400/20',
                helpful: '24 people found this helpful',
                segment: 'Food & Bev', employees: '9 seats',
                initials: 'NB', name: 'Nadia Brennan', title: 'Owner · The Corner Roast',
                avatarBg: 'bg-rose-500/20 border-rose-500/30 text-rose-300',
                quote: '"My café gets slammed at peak hours. Rozper\'s auto-attendant routes catering inquiries to my phone and walk-ins to the counter line. Zero missed orders."',
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="rounded-2xl bg-[#111B2D] border border-white/[0.08] hover:border-[#046BD2]/30 transition overflow-hidden flex flex-col"
              >
                {/* Platform header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B1220]/70 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded border text-[9px] font-mono font-bold ${t.platformBg} ${t.platformColor}`}>{t.platform}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-2.5 h-2.5 text-[#0086F9] fill-[#0086F9]" />)}
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Verified
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Segment + seats */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/[0.08] text-[10px] font-mono text-white/50">{t.segment}</span>
                    <span className="text-[10px] font-mono text-white/30">{t.employees}</span>
                    <span className="ml-auto text-[9px] font-mono text-white/20">{t.helpful}</span>
                  </div>

                  <blockquote className="text-sm text-white/75 leading-relaxed flex-1 mb-5">{t.quote}</blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.06]">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-display font-bold text-[11px] shrink-0 ${t.avatarBg}`}>{t.initials}</div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{t.name}</div>
                      <div className="text-[11px] text-white/40 truncate">{t.title}</div>
                    </div>
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
          <div className="relative rounded-[2.5rem] overflow-hidden p-6 sm:p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold leading-tight text-white">Sound bigger. Pay less.</h2>
            <p className="mt-6 text-white/80 max-w-md mx-auto">14-day free trial. No credit card required. Cancel anytime.</p>
            <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white text-[#046BD2] text-xs sm:text-base whitespace-nowrap font-semibold hover:scale-105 transition">
                Start free trial — 14 days <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white/15 border border-white/30 text-white text-xs sm:text-base whitespace-nowrap font-semibold hover:bg-white/25 transition">See pricing</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
