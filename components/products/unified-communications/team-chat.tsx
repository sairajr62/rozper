'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Hash, Phone, Video, Search, Bell, Lock,
  ArrowRight, ChevronRight, MessageSquare,
} from 'lucide-react'

const features = [
  { icon: Hash, title: 'Channels & Threads', desc: 'Organize conversations by team, project, or topic — threaded replies keep context.' },
  { icon: Phone, title: 'Start a Call from Chat', desc: 'One click from any conversation starts an HD voice or video call.' },
  { icon: Video, title: 'Screen Share & Co-Browse', desc: 'Share your screen or browse together during a call — no third-party tool needed.' },
  { icon: Search, title: 'Instant Message Search', desc: 'Find any message, file, or link across your entire chat history instantly.' },
  { icon: Bell, title: 'Smart Notifications', desc: 'Batch, focus mode, and per-channel muting — notifications on your terms.' },
  { icon: Lock, title: 'End-to-End Encrypted DMs', desc: 'Direct messages encrypted at rest and in transit — your conversation, private.' },
]

const faqs = [
  { q: 'Does team chat integrate with the phone system?', a: 'Yes. Click a contact in chat to start a call, or join a call with one tap. All built in — no separate app.' },
  { q: 'Can guests join channels?', a: 'Yes. Invite external partners, clients, or vendors to specific channels with guest access.' },
  { q: 'Is there a file size limit?', a: 'Files up to 1GB can be shared in chat. Larger assets can be linked from cloud storage integrations.' },
]

const channels = [
  { name: 'general', unread: 0, active: false },
  { name: 'sales-team', unread: 3, active: false },
  { name: 'support-queue', unread: 0, active: true },
  { name: 'dev-ops', unread: 0, active: false },
  { name: 'announcements', unread: 1, active: false },
]

const chatMessages = [
  { user: 'ML', name: 'Marcus L.', text: 'Anyone free for a quick call about the enterprise deck?', time: '2:14 PM', color: 'text-[#0086F9]' },
  { user: 'LH', name: 'Layla H.', text: 'I\'m free! Give me 5 mins', time: '2:15 PM', color: 'text-emerald-400' },
  { user: 'ML', name: 'Marcus L.', text: 'Starting a call now 👇', time: '2:16 PM', color: 'text-[#0086F9]' },
  { user: 'SYS', name: 'Rozper', text: 'Marcus started a call · 2 joined', time: '2:16 PM', color: 'text-amber-400' },
]

const connectedToRozper = [
  'Call recordings and AI summaries land in the relevant chat channel automatically.',
  'CRM activity, ticket updates, and call alerts surfaced in threads.',
  'Works on desktop, browser, iOS, and Android — same experience everywhere.',
]

function TeamChatUI() {
  const [activeChannel, setActiveChannel] = useState('support-queue')

  return (
    <div className="w-full rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="flex h-[340px] sm:h-[400px]">
        {/* Sidebar */}
        <div className="w-28 sm:w-44 bg-[#0B1220] border-r border-white/10 flex flex-col shrink-0">
          <div className="px-2 sm:px-3 py-3 border-b border-white/10">
            <div className="text-[9px] sm:text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">Workspace</div>
            <div className="text-xs font-semibold text-white truncate">Rozper Team</div>
          </div>
          <div className="p-1.5 sm:p-2 flex-1 overflow-y-auto">
            <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest px-2 py-1.5">Channels</div>
            {channels.map(ch => (
              <button key={ch.name} onClick={() => setActiveChannel(ch.name)}
                className={`w-full flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 rounded-lg text-left transition ${activeChannel === ch.name ? 'bg-[#046BD2]/20' : 'hover:bg-white/[0.04]'}`}>
                <Hash className="w-3 h-3 text-white/30 shrink-0" />
                <span className={`text-[11px] sm:text-xs truncate ${activeChannel === ch.name ? 'text-white' : 'text-white/50'}`}>{ch.name}</span>
                {ch.unread > 0 && (
                  <span className="ml-auto text-[9px] font-mono bg-[#046BD2] text-white rounded-full w-4 h-4 flex items-center justify-center shrink-0">
                    {ch.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-3 sm:px-4 py-3 border-b border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <Hash className="w-3.5 h-3.5 text-white/40 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-white truncate">{activeChannel}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className="p-1.5 rounded-lg hover:bg-white/5 transition">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0086F9]" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-white/5 transition">
                <Video className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0086F9]" />
              </button>
              <button className="hidden sm:block p-1.5 rounded-lg hover:bg-white/5 transition">
                <Search className="w-3.5 h-3.5 text-white/40" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto">
            {chatMessages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 sm:gap-3">
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[8px] sm:text-[9px] font-bold shrink-0 ${msg.color}`}>
                  {msg.user}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className={`text-[11px] sm:text-xs font-semibold ${msg.color}`}>{msg.name}</span>
                    <span className="text-[9px] font-mono text-white/25">{msg.time}</span>
                  </div>
                  <p className={`text-[11px] sm:text-xs leading-relaxed ${msg.user === 'SYS' ? 'text-amber-400/70 italic' : 'text-white/70'}`}>{msg.text}</p>
                  {msg.user === 'SYS' && (
                    <button className="mt-1 px-2.5 py-1 rounded-lg bg-[#046BD2]/20 border border-[#046BD2]/30 text-[10px] font-mono text-[#0086F9] hover:bg-[#046BD2]/30 transition">
                      Join call
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="px-3 sm:px-4 py-3 border-t border-white/10">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/8 min-w-0">
              <MessageSquare className="w-3.5 h-3.5 text-white/20 shrink-0" />
              <span className="text-[11px] sm:text-xs text-white/25 font-mono truncate">Message #{activeChannel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProdUCaaSTeamChatPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#046BD2]/7 blur-[150px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/unified-communications/" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">team-chat</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center">
          <div className="w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-6 sm:mb-8">
              <Hash className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · Team Chat</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Built into your<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">phone system</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-5 sm:mt-6 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
              Chat, share files, and start calls from one app. No Slack, no Teams — just your Rozper workspace with calling built in from day one.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-8 sm:mt-10 flex flex-row flex-wrap gap-3">
              <Link href="/contact/" className="group inline-flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold transition whitespace-nowrap">
                Try team chat <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing/" className="inline-flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-full border border-white/15 text-sm sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap">See pricing</Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} className="w-full overflow-hidden">
            <TeamChatUI />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Chat that calls. Calling that chats.</h2>
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
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">Connected to every other Rozper tool.</h2>
          </div>
          <div className="rounded-2xl bg-[#111B2D] border border-white/[0.07] p-6 sm:p-8">
            <ul className="space-y-4">
              {connectedToRozper.map((it) => (
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
          <div className="relative rounded-3xl overflow-hidden bg-[#0B1220] border border-white/10 p-6 sm:p-12 md:p-20 text-center">
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
              <Hash className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">One app. Chat, calls, and more.</h2>
              <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
                <Link href="/contact/" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-xs sm:text-base font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition whitespace-nowrap">
                  Try team chat <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing/" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-xs sm:text-base text-white font-semibold transition whitespace-nowrap">See pricing</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      </div>
    </main>
  )
}
