'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Shield, Bot, FileText, Globe, ArrowRight, ChevronRight,
  TrendingUp, TrendingDown, Lock, BarChart3, Briefcase,
} from 'lucide-react'

const tape = [
  { sym: 'PCI', val: '100%', up: true },
  { sym: 'GDPR', val: 'OK', up: true },
  { sym: 'MiFID II', val: 'OK', up: true },
  { sym: 'HIPAA', val: 'OK', up: true },
  { sym: 'SOC 2', val: 'TYPE II', up: true },
  { sym: 'AUDIT.PREP', val: 'MIN', up: true },
  { sym: 'LATENCY', val: '<100ms', up: true },
  { sym: 'COMPLIANCE.AI', val: 'LIVE', up: true },
]

const features = [
  { icon: Shield, title: 'PCI DSS-compliant recording', desc: 'Pause and resume during card capture for full compliance.' },
  { icon: Bot, title: 'AI compliance monitoring', desc: 'Flags prohibited phrases and disclosures in real time.' },
  { icon: FileText, title: 'Full call audit trail', desc: 'Tamper-evident storage and access logs for every call.' },
  { icon: Globe, title: 'GDPR & data residency', desc: 'Local data residency options for regulated markets.' },
  { icon: Lock, title: 'MiFID II call recording', desc: 'Recording and retention for investment and advisory firms.' },
]

const dark = [
  'Power and predictive dialer for collections, renewals, and outbound campaigns',
  'Real-time supervisor monitoring with compliance alert escalation',
  'CRM sync with Salesforce Financial Services Cloud and major banking CRMs',
]

const stats = [
  { v: 'Minutes', k: 'Audit prep time', delta: '-94%' },
  { v: '100%', k: 'PCI DSS compliance', delta: 'STABLE' },
  { v: 'Real-time', k: 'Compliance monitoring', delta: 'LIVE' },
]

const faqs = [
  { q: 'Does Rozper support MiFID II?', a: 'Yes. Recording with required metadata, retention periods, and access controls.' },
  { q: 'How does PCI-safe recording work?', a: 'Pause on button or DTMF trigger during card entry — recording resumes automatically.' },
  { q: 'Can Rozper flag compliance issues automatically?', a: 'Yes. AI monitors for regulatory triggers and prohibited language — alerting supervisors in real time.' },
]

function MiniChart() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <linearGradient id="amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0086F9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0086F9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 60 L20 50 L40 55 L60 30 L80 35 L100 20 L120 25 L140 15 L160 20 L180 8 L200 12 L200 80 L0 80 Z" fill="url(#amber)" />
      <path d="M0 60 L20 50 L40 55 L60 30 L80 35 L100 20 L120 25 L140 15 L160 20 L180 8 L200 12" stroke="#0086F9" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-[#046BD2]/20 bg-[#046BD2]/[0.02]">
      <div className="flex animate-[scroll_40s_linear_infinite] py-3">
        {[...tape, ...tape, ...tape].map((t, i) => (
          <div key={i} className="flex items-center gap-2 px-6 whitespace-nowrap shrink-0">
            <span className="font-mono text-[11px] text-[#0086F9]/60">{t.sym}</span>
            <span className="font-mono text-[11px] font-bold text-[#2D98F1]">{t.val}</span>
            {t.up ? <TrendingUp className="w-3 h-3 text-emerald-400" /> : <TrendingDown className="w-3 h-3 text-red-400" />}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

export function FinancePageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-white/70">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/solutions" className="hover:text-white/70">solutions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">finance</span>
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-12 grid lg:grid-cols-[1fr_400px] gap-12 items-end">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Briefcase className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#2D98F1]">Solutions / Financial Services</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Compliant contact center<br />for{' '}
              <span className="bg-gradient-to-br from-[#2D98F1] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">finance</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Call recording, PCI-safe payment capture, and AI-flagged compliance triggers — built for financial services where every call is recorded, regulated, and audited.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#046BD2] text-white font-semibold rounded hover:bg-[#0086F9] transition">
                Talk to compliance team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#046BD2]/30 text-[#2D98F1] rounded hover:bg-[#046BD2]/10 transition font-medium">
                View pricing
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }} className="rounded border border-[#046BD2]/20 bg-[#111B2D] p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#0086F9]/60">Audit Readiness Index</div>
                <div className="font-display text-3xl font-bold text-[#2D98F1]">99.8%</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-emerald-400">▲ 24.6%</div>
                <div className="text-[9px] font-mono text-white/40">vs. legacy</div>
              </div>
            </div>
            <div className="h-20"><MiniChart /></div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[{ k: 'PCI', v: 'OK' }, { k: 'MIFID', v: 'OK' }, { k: 'GDPR', v: 'OK' }].map(b => (
                <div key={b.k} className="py-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-[9px] font-mono text-emerald-400">{b.k}</div>
                  <div className="text-[10px] font-mono text-emerald-300 font-bold">{b.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      <Ticker />

      <div className="relative z-10">
        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-12">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9]/60 mb-3">// compliance.layer</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Compliance built in, not bolted on.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className={`rounded-2xl bg-[#111B2D] border border-white/[0.08] hover:border-[#046BD2]/30 p-6 transition-colors group ${i === 4 ? 'md:col-span-2 flex items-start gap-6' : ''}`}
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-all">
                  <f.icon className="w-5 h-5 text-[#0086F9]" strokeWidth={1.5} />
                </div>
                <div className={i === 4 ? 'flex-1' : 'mt-4'}>
                  <h3 className="font-display font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-px bg-[#046BD2]/20 rounded overflow-hidden border border-[#046BD2]/30">
            {stats.map(s => (
              <div key={s.k} className="bg-[#0B1220] p-8 relative">
                <div className="absolute top-3 right-3 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-mono text-emerald-400">{s.delta}</div>
                <div className="font-display text-4xl font-bold text-[#2D98F1]">{s.v}</div>
                <div className="text-xs text-white/50 mt-2 font-mono uppercase tracking-widest">{s.k}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Performance section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-2xl border border-[#046BD2]/20 bg-gradient-to-br from-[#111B2D] to-[#0B1220] p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 19px, rgba(251,191,36,1) 19px, rgba(251,191,36,1) 20px)',
            }} />
            <div className="relative">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9]/60 mb-3">// throughput</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 max-w-2xl">Performance for high-volume financial operations.</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {dark.map((d, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded bg-[#046BD2]/5 border border-[#046BD2]/10">
                    <div className="font-display text-3xl font-bold text-[#0086F9]/60 leading-none">{i + 1}</div>
                    <p className="text-sm text-white/70 leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials — compliance report cards, all equal */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-12">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9]/60 mb-3">// client.feedback</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Trusted by financial teams.</h2>
            <p className="mt-3 text-white/50 font-mono text-sm">Banks, brokerages, and insurers running on Rozper.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                regulation: 'MIFID II', regulationCls: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
                finding: 'AUDIT READY', findingCls: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
                initials: 'CE', name: 'Charlotte Evans', role: 'Head of Compliance · Bridgepoint Capital',
                avatarCls: 'bg-[#046BD2]/20 border-[#046BD2]/40 text-[#2D98F1]',
                quote: '"Regulatory audits used to take us a week to prepare for. With Rozper\'s call archive and search, we pull everything in minutes."',
              },
              {
                regulation: 'AI MONITOR', regulationCls: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                finding: 'COMPLIANCE', findingCls: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                initials: 'DO', name: 'David Okafor', role: 'VP Operations · Meridian Asset Mgmt',
                avatarCls: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
                quote: '"The AI compliance monitor flagged a prohibited phrase on a client call before our regulator did. That single catch alone justified the switch."',
              },
              {
                regulation: 'PCI DSS', regulationCls: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
                finding: 'PCI SAFE', findingCls: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
                initials: 'PN', name: 'Priya Nair', role: 'Chief Risk Officer · Horizon Insurance',
                avatarCls: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                quote: '"PCI-safe recording meant we could finally remove card data risk from every payment call. Our InfoSec team signed off in a day."',
              },
              {
                regulation: 'MIFID II', regulationCls: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
                finding: 'VERIFIED', findingCls: 'text-[#2D98F1] bg-[#046BD2]/10 border-[#046BD2]/20',
                initials: 'JW', name: 'James Whitfield', role: 'Head of Client Services · Sterling Brokerage',
                avatarCls: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
                quote: '"We went from dreading MiFID II audits to being audit-ready overnight. Metadata, timestamps, access logs — our external auditors actually complimented it."',
              },
            ].map((t, i) => (
              <motion.div
                key={t.initials}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col rounded border border-[#046BD2]/20 bg-[#111B2D] hover:bg-[#1A2638] hover:border-[#046BD2]/40 transition overflow-hidden"
              >
                {/* Compliance header */}
                <div className="flex items-center gap-2 px-5 py-2.5 border-b border-[#046BD2]/15 bg-[#046BD2]/[0.03]">
                  <span className="font-mono text-[9px] text-white/30">// audit.finding</span>
                  <span className={`ml-auto px-2 py-0.5 rounded text-[9px] font-mono border ${t.regulationCls}`}>{t.regulation}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${t.findingCls}`}>{t.finding}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-3.5 h-3.5 fill-[#0086F9]" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <blockquote className="text-sm text-white/82 leading-relaxed flex-1 mb-5">{t.quote}</blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06] mt-auto">
                    <div className={`w-9 h-9 rounded border flex items-center justify-center font-display font-bold text-xs shrink-0 ${t.avatarCls}`}>{t.initials}</div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-[11px] text-white/50 font-mono mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8">Compliance Q&A</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded border border-[#046BD2]/20 bg-[#111B2D] p-6 hover:bg-[#1A2638] transition">
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
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-white">
              Reduce audit prep<br />from weeks to minutes.
            </h2>
            <p className="mt-6 text-white/80 max-w-md mx-auto">Built for banks, insurance, broker-dealers, and fintech. SOC 2 Type II certified.</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/15 border border-white/30 text-white font-semibold hover:bg-white/25 transition">
                See pricing
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
                Talk to compliance team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
