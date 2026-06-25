'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { TabletVideoHero } from '@/components/products/unified-communications/tablet-video-hero'
import {
  Video, Users, FileText, MonitorSmartphone, Shield, Zap,
  ArrowRight, ChevronRight,
} from 'lucide-react'

const features = [
  { icon: Users, title: 'Up to 200 Participants', desc: 'Host large team meetings, all-hands, and webinars — up to 200 attendees per room.' },
  { icon: FileText, title: 'AI Meeting Summaries', desc: 'Every meeting automatically transcribed and summarized — no one misses a decision.' },
  { icon: MonitorSmartphone, title: 'Screen Share & Annotation', desc: 'Share your screen and annotate live — draw, highlight, and collaborate in real time.' },
  { icon: Shield, title: 'Waiting Room & Lock', desc: 'Control who joins with waiting rooms, passcodes, and host lock.' },
  { icon: Zap, title: 'One-Click Join', desc: 'Browser-based — attendees join with one click, no download, no account needed.' },
  { icon: Video, title: 'HD Video & Virtual Backgrounds', desc: 'Crystal-clear 1080p video with background blur and custom virtual backgrounds.' },
]

const faqs = [
  { q: 'Do attendees need to install anything?', a: 'No. Attendees join via browser — one click, no download, no Rozper account required.' },
  { q: 'Are meeting recordings available?', a: 'Yes. Recordings with AI transcripts and highlights are saved to your dashboard automatically.' },
  { q: 'How many participants can join?', a: 'Up to 200. Contact us for larger webinar plans with up to 1,000 attendees.' },
]


export function ProdUCaaSVideoMeetingsPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#046BD2]/8 blur-[150px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/unified-communications/" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">video-meetings</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 overflow-x-clip grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center">
          <div className="w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-6 sm:mb-8">
              <Video className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · Video Meetings</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              HD video with<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">AI transcripts</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-5 sm:mt-6 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
              Up to 200 participants, instant AI summaries, and screen sharing — all inside Rozper. No Zoom, no Meet, no extra app.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-8 sm:mt-10 flex flex-row flex-wrap gap-3">
              <Link href="/contact/" className="group inline-flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold transition whitespace-nowrap">
                Start meeting <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing/" className="inline-flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-full border border-white/15 text-sm sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap">See pricing</Link>
            </motion.div>

          </div>

          <div className="w-full flex items-start justify-center overflow-hidden h-[200px] sm:h-[260px] md:h-[320px] lg:h-[384px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3, ease: 'easeOut' } }}
              className="relative w-full flex justify-center"
            >
              <TabletVideoHero />
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Every meeting, intelligently captured.</h2>
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

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8 text-center">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:bg-white/[0.05] transition">
                <summary className="flex items-start justify-between cursor-pointer list-none font-display font-semibold gap-3">
                  <span className="min-w-0">{f.q}</span>
                  <ChevronRight className="w-5 h-5 shrink-0 mt-0.5 group-open:rotate-90 transition-transform text-[#0086F9]" />
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
              <Video className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">Meet smarter. Summarize everything.</h2>
              <div className="mt-10 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3">
                <Link href="/free-trial/" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-xs sm:text-base font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition whitespace-nowrap">
                  Start a free trial <ArrowRight className="w-4 h-4" />
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
