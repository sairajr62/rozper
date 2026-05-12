'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  PhoneOutgoing, Shield, Zap, BarChart3, Users, RefreshCw,
  ArrowRight, ChevronRight, TrendingUp,
} from 'lucide-react'

const features = [
  { icon: PhoneOutgoing, title: 'Power & Predictive Dialing', desc: 'Power dialer for compliance, predictive for volume — switch modes per campaign.' },
  { icon: Shield, title: 'TCPA Compliance', desc: 'DNC list scrubbing, call time restrictions, and consent-based dialing built in.' },
  { icon: Zap, title: 'AI Pre-Call Research', desc: 'AI pulls CRM data and LinkedIn info before the agent picks up — no cold calls.' },
  { icon: BarChart3, title: 'Campaign Analytics', desc: 'Contact rate, conversion rate, and revenue per call — per rep, per list, per day.' },
  { icon: Users, title: 'Agent Whisper & Coaching', desc: 'AI coaches agents on objections and next steps during outbound calls.' },
  { icon: RefreshCw, title: 'CRM Auto-Update', desc: 'Call disposition, notes, and next steps synced to CRM automatically after every call.' },
]

const faqs = [
  { q: 'What\'s the difference between power and predictive dialing?', a: 'Power: dials one number per agent, waits for pickup. Predictive: dials multiple numbers simultaneously, connects agents only to answered calls — higher volume, compliance limits apply.' },
  { q: 'How does TCPA compliance work?', a: 'DNC scrubbing, calling hours enforcement, and consent logging are automatic. Manual override requires supervisor approval.' },
  { q: 'Can I upload contact lists?', a: 'Yes. Upload CSV or sync directly from Salesforce, HubSpot, or any CRM — lists auto-deduplicate and scrub against DNC.' },
]

const campaignStats = [
  { label: 'Contacts today', value: '1,842', delta: '+14%' },
  { label: 'Connect rate', value: '34.2%', delta: '+2.1%' },
  { label: 'Avg talk time', value: '3:48', delta: '-0:12' },
  { label: 'Conversions', value: '127', delta: '+18%' },
]

const agents = [
  { name: 'Priya N.', calls: 42, connects: 16, status: 'On Call' },
  { name: 'Marcus L.', calls: 38, connects: 11, status: 'Dialing' },
  { name: 'Layla H.', calls: 51, connects: 19, status: 'On Call' },
  { name: 'Jordan K.', calls: 29, connects: 8, status: 'Available' },
]

function OutboundDialerUI() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PhoneOutgoing className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Outbound Dialer · Q2 Campaign</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400">Predictive · Active</span>
        </div>
      </div>

      {/* Campaign stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
        {campaignStats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
            className="p-4 bg-[#0B1220]">
            <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-bold text-white">{stat.value}</span>
              <span className="text-[10px] font-mono text-emerald-400">{stat.delta}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Agent board */}
      <div className="p-5">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">Agent Leaderboard · Today</div>
        <div className="space-y-2.5">
          {agents.map((agent, i) => (
            <motion.div key={agent.name} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 + 0.2 }}
              className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/25 flex items-center justify-center text-[9px] font-bold text-[#2D98F1]">
                {agent.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/70">{agent.name}</span>
                  <span className={`text-[9px] font-mono ${agent.status === 'On Call' ? 'text-[#0086F9]' : agent.status === 'Dialing' ? 'text-amber-400' : 'text-emerald-400'}`}>{agent.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-[#046BD2] to-emerald-400"
                      initial={{ width: 0 }} animate={{ width: `${(agent.connects / agent.calls) * 100}%` }}
                      transition={{ duration: 0.7, delay: i * 0.1 + 0.3 }} />
                  </div>
                  <span className="text-[10px] font-mono text-white/30">{agent.connects}/{agent.calls}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compliance bar */}
      <div className="px-5 py-3 bg-[#0B1220] border-t border-white/10 flex items-center gap-2">
        <Shield className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-[10px] font-mono text-emerald-400">TCPA compliant · DNC scrubbed · Call hours enforced</span>
      </div>
    </div>
  )
}

export function ProdCCOutboundDialerPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-hidden">
      <Navbar />

      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#046BD2]/7 blur-[140px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/contact-center" className="hover:text-[#0086F9]">contact-center</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">outbound-dialer</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <PhoneOutgoing className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Contact Center · Outbound Dialer</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Outbound dialing.<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">Compliant at scale</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Power and predictive dialing with TCPA compliance, AI coaching, and CRM sync — built for sales and collections teams that need to move fast.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Start dialing smarter <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <OutboundDialerUI />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">More connects. Better conversations. Fewer risks.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-7 rounded-3xl bg-[#111B2D] border border-white/10 hover:border-[#046BD2]/40 transition">
                <f.icon className="w-8 h-8 text-[#0086F9] mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
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
          <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <TrendingUp className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Dial more. Convert more. Risk less.</h2>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
              Start dialing smarter <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
