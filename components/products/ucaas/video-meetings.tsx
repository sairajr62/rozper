'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Video, Users, FileText, Monitor, Shield, Zap,
  ArrowRight, ChevronRight, Mic, MicOff, VideoOff,
} from 'lucide-react'

const features = [
  { icon: Users, title: 'Up to 200 Participants', desc: 'Host large team meetings, all-hands, and webinars — up to 200 attendees per room.' },
  { icon: FileText, title: 'AI Meeting Summaries', desc: 'Every meeting automatically transcribed and summarized — no one misses a decision.' },
  { icon: Monitor, title: 'Screen Share & Annotation', desc: 'Share your screen and annotate live — draw, highlight, and collaborate in real time.' },
  { icon: Shield, title: 'Waiting Room & Lock', desc: 'Control who joins with waiting rooms, passcodes, and host lock.' },
  { icon: Zap, title: 'One-Click Join', desc: 'Browser-based — attendees join with one click, no download, no account needed.' },
  { icon: Video, title: 'HD Video & Virtual Backgrounds', desc: 'Crystal-clear 1080p video with background blur and custom virtual backgrounds.' },
]

const faqs = [
  { q: 'Do attendees need to install anything?', a: 'No. Attendees join via browser — one click, no download, no Rozper account required.' },
  { q: 'Are meeting recordings available?', a: 'Yes. Recordings with AI transcripts and highlights are saved to your dashboard automatically.' },
  { q: 'How many participants can join?', a: 'Up to 200. Contact us for larger webinar plans with up to 1,000 attendees.' },
]

const participants = [
  { initials: 'ML', name: 'Marcus L.', speaking: true, muted: false },
  { initials: 'PN', name: 'Priya N.', speaking: false, muted: false },
  { initials: 'LH', name: 'Layla H.', speaking: false, muted: true },
  { initials: 'JK', name: 'Jordan K.', speaking: false, muted: true },
  { initials: 'DF', name: 'Diego F.', speaking: false, muted: false },
  { initials: 'ST', name: 'Sam T.', speaking: false, muted: false },
]

function VideoGrid() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">Q2 All-Hands · 6 participants</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-400/10 border border-red-400/20">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[10px] font-mono text-red-400">REC</span>
        </div>
      </div>

      <div className="p-4 grid grid-cols-3 gap-2">
        {participants.map((p, i) => (
          <motion.div key={p.initials} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
            className={`relative aspect-video rounded-xl flex items-center justify-center ${p.speaking ? 'ring-2 ring-[#046BD2]' : ''} bg-[#0B1220]`}>
            <div className="text-center">
              <div className={`w-10 h-10 mx-auto rounded-full border flex items-center justify-center text-xs font-bold ${p.speaking ? 'bg-[#046BD2]/30 border-[#046BD2] text-[#2D98F1]' : 'bg-[#046BD2]/10 border-[#046BD2]/20 text-[#2D98F1]/60'}`}>
                {p.initials}
              </div>
              <div className="text-[9px] font-mono text-white/40 mt-1">{p.name.split(' ')[0]}</div>
            </div>
            {p.muted && (
              <div className="absolute top-1.5 right-1.5">
                <MicOff className="w-3 h-3 text-red-400" />
              </div>
            )}
            {p.speaking && (
              <div className="absolute bottom-1.5 left-1.5 flex items-end gap-0.5 h-3">
                {[1, 2, 3].map(j => (
                  <motion.div key={j} className="w-0.5 bg-[#0086F9] rounded-full"
                    animate={{ height: `${20 + j * 30}%` }}
                    transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse', delay: j * 0.1 }} />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* AI transcript strip */}
      <div className="mx-4 mb-4 p-3 rounded-xl bg-[#0B1220] border border-white/8">
        <div className="text-[9px] font-mono text-[#0086F9]/60 uppercase tracking-widest mb-1.5">AI Transcript · Live</div>
        <p className="text-xs text-white/60 leading-relaxed">
          <span className="text-[#0086F9]">Marcus:</span> "…so the Q2 targets are looking strong, especially in the enterprise segment where we closed three new logos this week…"
        </p>
      </div>

      <div className="px-5 py-3 border-t border-white/10 bg-[#0B1220] flex items-center justify-center gap-4">
        <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
          <Mic className="w-4 h-4 text-white/60" />
        </button>
        <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
          <Video className="w-4 h-4 text-white/60" />
        </button>
        <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
          <Monitor className="w-4 h-4 text-white/60" />
        </button>
        <button className="w-9 h-9 rounded-full bg-red-500/80 flex items-center justify-center hover:bg-red-500 transition">
          <VideoOff className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  )
}

export function ProdUCaaSVideoMeetingsPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-hidden">
      <Navbar />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#046BD2]/8 blur-[150px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/ucaas" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">video-meetings</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <Video className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · Video Meetings</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              HD video with<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">AI transcripts</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Up to 200 participants, instant AI summaries, and screen sharing — all inside Rozper. No Zoom, no Meet, no extra app.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                Start meeting <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="mt-10 grid grid-cols-3 gap-3">
              {[{ v: '200', k: 'Participants' }, { v: 'AI', k: 'Summaries' }, { v: '1080p', k: 'HD Video' }].map(s => (
                <div key={s.k} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="font-display text-2xl font-bold text-[#0086F9]">{s.v}</div>
                  <div className="text-[10px] font-mono text-white/40 mt-1 uppercase tracking-wider">{s.k}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}>
            <VideoGrid />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Every meeting, intelligently captured.</h2>
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
            <Video className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Meet smarter. Summarize everything.</h2>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
              Start meeting <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
