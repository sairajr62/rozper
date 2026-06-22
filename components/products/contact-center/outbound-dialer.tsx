'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  PhoneOutgoing, Shield, Search, BarChart3, Users, RefreshCw,
  ArrowRight, ChevronRight, TrendingUp,
} from 'lucide-react'
import { OutboundDialerMobile } from '@/components/ui/outbound-dialer-mobile'

const features = [
  { icon: PhoneOutgoing, title: 'Power & Predictive Dialing', desc: 'Power dialer for compliance, predictive for volume — switch modes per campaign.' },
  { icon: Shield, title: 'TCPA Compliance', desc: 'DNC list scrubbing, call time restrictions, and consent-based dialing built in.' },
  { icon: Search, title: 'AI Pre-Call Research', desc: 'AI pulls CRM data and LinkedIn info before the agent picks up — no cold calls.' },
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
    <main className="min-h-screen bg-[#0B1220] overflow-x-clip">
      <Navbar />

      <div className="absolute top-1/3 right-0 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] rounded-full bg-[#046BD2]/7 blur-[140px] pointer-events-none" />

      <div className="relative z-10">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-28 pb-8 lg:pb-6 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 items-center">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-6">
              <Link href="/" className="hover:text-[#0086F9]">/</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/products/contact-center" className="hover:text-[#0086F9]">contact-center</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#0086F9]">outbound-dialer</span>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <PhoneOutgoing className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Contact Center · Outbound Dialer</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight">
              Outbound dialing.<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">Compliant at scale</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-4 sm:mt-6 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
              Power and predictive dialing with TCPA compliance, AI coaching, and CRM sync — built for sales and collections teams that need to move fast.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-7 sm:mt-10 flex flex-row items-center gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition text-sm sm:text-base">
                Start dialing smarter <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition text-sm sm:text-base">See pricing</Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
            className="flex justify-center items-center mt-4 lg:mt-0"
          >
            {/* Phone scaled to 75% on mobile, 85% on desktop — origin center so it stays centered */}
            <div className="hidden sm:block" style={{ width: 228, height: 456, position: 'relative', overflow: 'visible' }}>
              <div style={{
                position: 'absolute', top: 0, left: '50%',
                transform: 'translateX(-50%) scale(0.85) translateZ(0)',
                transformOrigin: 'top center',
                backfaceVisibility: 'hidden',
              }}>
                <OutboundDialerMobile />
              </div>
            </div>
            {/* Smaller scale for xs mobile screens */}
            <div className="block sm:hidden" style={{ width: 201, height: 402, position: 'relative', overflow: 'visible' }}>
              <div style={{
                position: 'absolute', top: 0, left: '50%',
                transform: 'translateX(-50%) scale(0.75) translateZ(0)',
                transformOrigin: 'top center',
                backfaceVisibility: 'hidden',
              }}>
                <OutboundDialerMobile />
              </div>
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">More connects. Better conversations. Fewer risks.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-2xl bg-[#111B2D] border border-white/[0.07] p-6 hover:border-[#046BD2]/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-all">
                    <f.icon className="w-4.5 h-4.5 text-[#0086F9]" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[10px] text-white/20 font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">FAQ</h2>
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
          <div className="relative rounded-3xl overflow-hidden bg-[#070B14] border border-white/10 px-5 py-10 sm:px-12 sm:py-16 md:px-20 md:py-20 text-center">
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
              <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-5 sm:mb-6 text-white" />
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white">Dial more. Convert more. Risk less.</h2>
              <div className="mt-7 flex flex-row items-center justify-center gap-3">
                <Link href="/free-trial" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] font-semibold transition text-sm sm:text-base whitespace-nowrap">
                  Start a free trial <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-white font-semibold transition text-sm sm:text-base whitespace-nowrap">See pricing</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
