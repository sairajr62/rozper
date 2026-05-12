'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Globe, Smartphone, RefreshCw, Shield, FileText, ArrowRight, ChevronRight,
  MessageSquare, Video, BarChart3, Sun, Moon, Coffee, Sunrise,
} from 'lucide-react'

const zones = [
  { city: 'San Francisco', tz: 'PST', offset: -8, icon: Coffee },
  { city: 'New York', tz: 'EST', offset: -5, icon: Sunrise },
  { city: 'London', tz: 'GMT', offset: 0, icon: Sun },
  { city: 'Berlin', tz: 'CET', offset: 1, icon: Sun },
  { city: 'Bangalore', tz: 'IST', offset: 5.5, icon: Sun },
  { city: 'Tokyo', tz: 'JST', offset: 9, icon: Moon },
  { city: 'Sydney', tz: 'AEST', offset: 10, icon: Moon },
  { city: 'Auckland', tz: 'NZST', offset: 12, icon: Moon },
]

const features = [
  { icon: Globe, title: 'Local Numbers Worldwide', desc: 'Local numbers in 150+ countries — your remote team looks local everywhere.' },
  { icon: Smartphone, title: 'Any Device, Anywhere', desc: 'Calls, video, chat, and SMS on desktop, browser, iOS, and Android.' },
  { icon: RefreshCw, title: 'Automatic Failover', desc: 'If one connection drops, calls route to backup instantly.' },
  { icon: Shield, title: 'SSO Access', desc: 'Secure remote access with SSO — no VPN required.' },
  { icon: FileText, title: 'Remote Recording & AI', desc: 'Call recording and AI summaries work the same remotely as in-office.' },
]

const detail = [
  { icon: MessageSquare, title: 'Team Chat & Files', desc: 'Team chat, file sharing, and video meetings built into one app.' },
  { icon: Video, title: 'One-Click Calls', desc: 'One-click call or video from chat — no separate meeting link needed.' },
  { icon: BarChart3, title: 'Real-Time Dashboard', desc: 'Agent status, call activity, and availability regardless of location.' },
]

const stats = [
  { v: '150+', k: 'Countries Supported' },
  { v: '99.999%', k: 'Uptime SLA' },
  { v: '12', k: 'Time Zones Covered' },
  { v: '0', k: 'VPNs Required' },
]

const faqs = [
  { q: 'Does call quality suffer on home internet?', a: 'Adaptive audio codecs and automatic quality management maintain quality on varied connections.' },
  { q: 'Can remote agents use their mobile number?', a: 'Agents use their Rozper number on mobile — personal numbers stay private.' },
  { q: 'How do managers see remote agent availability?', a: "Real-time dashboard shows every agent's status regardless of location." },
]

function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(i)
  }, [])
  return now
}

function fmtTime(utc: number, offset: number) {
  const totalMinutes = (utc + offset * 60 + 24 * 60) % (24 * 60)
  const h = Math.floor(totalMinutes / 60)
  const m = Math.floor(totalMinutes % 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function isWorking(utc: number, offset: number) {
  const totalMinutes = (utc + offset * 60 + 24 * 60) % (24 * 60)
  const h = totalMinutes / 60
  return h >= 9 && h <= 17
}

function WorldClock() {
  const now = useNow()
  const utc = now.getUTCHours() * 60 + now.getUTCMinutes()

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#046BD2]/15 to-[#0B1220] border border-[#046BD2]/20 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Distributed · Live</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
            <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-emerald-400">8 zones online</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {zones.map((z) => {
          const working = isWorking(utc, z.offset)
          const Icon = z.icon
          return (
            <div key={z.city} className={`p-4 rounded-xl border ${working ? 'bg-[#046BD2]/10 border-[#046BD2]/30' : 'bg-white/[0.02] border-white/5'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/60">{z.city}</div>
                  <div className="font-display text-xl font-bold text-white tabular-nums">{fmtTime(utc, z.offset)}</div>
                  <div className="text-[10px] font-mono text-white/40 mt-1">{z.tz}</div>
                </div>
                <Icon className={`w-5 h-5 ${working ? 'text-amber-400' : 'text-white/20'}`} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function RemoteTeamsPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#2D98F1]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/solutions" className="hover:text-[#2D98F1]">solutions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">remote-teams</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Globe className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">Solutions · Remote Teams</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Your team is{' '}
              <span className="bg-gradient-to-r from-[#2D98F1] via-[#0086F9] to-[#2575FC] bg-clip-text text-transparent">everywhere</span>.<br />
              Rozper too.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Cloud calling, video, and chat for fully remote and hybrid teams — in 150+ countries. Same call quality, same numbers, anywhere on Earth.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] text-white font-semibold hover:bg-[#0086F9] transition">
                Connect your team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="mt-12 flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-white/40">Works with:</span>
              {['Slack', 'Microsoft Teams', 'Google Workspace', 'Zoom'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-white/70">{tag}</span>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}>
            <WorldClock />
          </motion.div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Full phone features from any location.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="group relative p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#046BD2]/40 transition overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#046BD2]/0 group-hover:bg-[#046BD2]/10 blur-2xl transition" />
                <f.icon className="w-8 h-8 text-[#0086F9] mb-4 relative" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-semibold mb-2 relative">{f.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed relative">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detail */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#046BD2]/10 via-[#2575FC]/5 to-[#046BD2]/10 border border-[#046BD2]/20 p-12 md:p-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 max-w-2xl">Collaboration that doesn't need an office.</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {detail.map((d, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.05] backdrop-blur border border-white/10">
                  <d.icon className="w-7 h-7 text-[#0086F9] mb-4" strokeWidth={1.5} />
                  <h3 className="font-display text-lg font-semibold mb-2">{d.title}</h3>
                  <p className="text-sm text-white/60">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                <div className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-br from-[#2D98F1] to-[#2575FC] bg-clip-text text-transparent">{s.v}</div>
                <div className="text-xs text-white/50 mt-2 font-mono uppercase tracking-wider">{s.k}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials — world bento grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-[#2D98F1] mb-3">Customer Stories</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Teams across the globe, one platform.</h2>
          </div>

          <div className="grid md:grid-cols-12 gap-5">
            {/* Featured large card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-7 relative p-8 rounded-3xl bg-gradient-to-br from-[#046BD2]/15 via-[#0B1220] to-[#046BD2]/5 border border-[#046BD2]/30 overflow-hidden flex flex-col"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#046BD2]/10 blur-3xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-8">
                <Globe className="w-3.5 h-3.5 text-[#0086F9]" />
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Remote · 8 Countries</span>
                <span className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400">Fully distributed</span>
                </span>
              </div>
              <div className="text-3xl text-[#046BD2]/40 font-serif mb-3 leading-none">"</div>
              <blockquote className="font-display text-xl md:text-2xl font-medium leading-relaxed text-white/90 flex-1 mb-8">
                We went fully remote across 8 countries. Rozper made it invisible — same call quality, same numbers, same platform as when we were in one office.
              </blockquote>
              <div className="flex items-center gap-3 pt-6 border-t border-[#046BD2]/20">
                <div className="w-10 h-10 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[#2D98F1] font-display font-bold">CM</div>
                <div>
                  <div className="font-semibold">Chloe Martin</div>
                  <div className="text-xs text-white/50">COO · Forma Global Consulting</div>
                </div>
                <div className="ml-auto text-right hidden md:block">
                  <div className="text-sm text-white/20">🇩🇪 🇯🇵 🇺🇸 🇬🇧 🇧🇷 🇦🇺 🇸🇬 🇨🇦</div>
                </div>
              </div>
            </motion.div>

            {/* Right column — 2 stacked cards */}
            <div className="md:col-span-5 flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#046BD2]/30 transition flex flex-col flex-1"
              >
                <div className="text-2xl text-white/10 font-serif mb-2 leading-none">"</div>
                <blockquote className="font-display text-base font-medium leading-relaxed text-white/80 flex-1 mb-5">
                  Our London and Singapore offices feel like one team. SSO and shared dashboards give managers full visibility — no VPN required.
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 font-display font-bold text-xs">JR</div>
                  <div>
                    <div className="font-semibold text-sm">James Reeves</div>
                    <div className="text-xs text-white/40">IT Director · Alderton Partners</div>
                  </div>
                  <span className="ml-auto text-xs text-white/20">🇬🇧 🇸🇬</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#046BD2]/30 transition flex flex-col flex-1"
              >
                <div className="text-2xl text-white/10 font-serif mb-2 leading-none">"</div>
                <blockquote className="font-display text-base font-medium leading-relaxed text-white/80 flex-1 mb-5">
                  We onboarded 40 remote agents across Australia and Southeast Asia in a weekend. No IT on-site, anywhere.
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-display font-bold text-xs">AT</div>
                  <div>
                    <div className="font-semibold text-sm">Amara Tan</div>
                    <div className="text-xs text-white/40">Head of Ops · PacRim Digital</div>
                  </div>
                  <span className="ml-auto text-xs text-white/20">🇦🇺 🇮🇩 🇻🇳</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="md:col-span-5 p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#046BD2]/30 transition flex flex-col"
            >
              <div className="text-2xl text-white/10 font-serif mb-2 leading-none">"</div>
              <blockquote className="font-display text-base font-medium leading-relaxed text-white/80 flex-1 mb-5">
                Failover routing saved us during a regional outage. Customers never noticed — that's the reliability we need for global operations.
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-display font-bold text-xs">NK</div>
                <div>
                  <div className="font-semibold text-sm">Nina Kovač</div>
                  <div className="text-xs text-white/40">VP Engineering · CloudBridge EU</div>
                </div>
                <span className="ml-auto text-xs text-white/20">🇸🇮 🇩🇪 🇫🇷</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
              className="md:col-span-7 p-6 rounded-3xl bg-gradient-to-r from-[#046BD2]/10 to-transparent border border-[#046BD2]/20 hover:border-[#046BD2]/40 transition flex flex-col"
            >
              <div className="text-2xl text-[#046BD2]/30 font-serif mb-2 leading-none">"</div>
              <blockquote className="font-display text-lg font-medium leading-relaxed text-white/80 flex-1 mb-5">
                The automatic time-zone routing means our clients always reach someone in business hours. It's become a genuine competitive advantage for our firm.
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-[#046BD2]/20">
                <div className="w-8 h-8 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[#2D98F1] font-display font-bold text-xs">DP</div>
                <div>
                  <div className="font-semibold text-sm">David Petersen</div>
                  <div className="text-xs text-white/40">Managing Director · Apex Advisory Group</div>
                </div>
                <span className="ml-auto text-xs text-white/20">🇺🇸 🇬🇧 🇦🇪 🇸🇬</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="relative rounded-[2rem] overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight relative">One platform.<br />Twelve time zones.</h2>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition relative">
              Connect your team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
