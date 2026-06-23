'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  FileText, Globe, Shield, Download, Mail, Lock,
  ArrowRight, ChevronRight, Printer, CheckCircle,
} from 'lucide-react'

const features = [
  { icon: Globe, title: 'Send & Receive Globally', desc: 'Fax to 150+ countries from your browser, mobile, or email — no machine needed.' },
  { icon: Shield, title: 'HIPAA-Eligible Storage', desc: 'Encrypted fax storage with BAA support — compliant for healthcare and legal.' },
  { icon: Mail, title: 'Email-to-Fax & Fax-to-Email', desc: 'Send faxes by email attachment, receive faxes as PDF in your inbox.' },
  { icon: Download, title: 'Instant PDF Download', desc: 'Every fax delivered as a searchable PDF — downloadable and archivable.' },
  { icon: Lock, title: 'Digital Signatures', desc: 'Sign and return faxed documents digitally — no printing, no scanning.' },
  { icon: FileText, title: 'Fax Broadcast', desc: 'Send the same fax to hundreds of recipients at once — with delivery confirmation.' },
]

const faqs = [
  { q: 'Do I need a fax machine or phone line?', a: 'No. Everything is cloud-based — send and receive faxes from any browser, mobile app, or email client.' },
  { q: 'Can I keep my existing fax number?', a: 'Yes. Port your existing fax number — same process as porting a phone number, typically 1–2 weeks.' },
  { q: 'Are faxes HIPAA compliant?', a: 'Yes. Encryption at rest and in transit, audit logs, and BAA support make Rozper fax HIPAA-eligible.' },
]

const faxInbox = [
  { id: 'FAX-2291', from: '+1 (312) 555-0177', subject: 'Insurance Authorization', pages: 3, time: '10:14 AM', status: 'Received', new: true },
  { id: 'FAX-2290', from: 'Lab Results Inc.', subject: 'Patient Report #44821', pages: 7, time: 'Yesterday', status: 'Received', new: false },
  { id: 'FAX-2289', from: 'Your number', subject: 'Signed Contract · Sent', pages: 2, time: 'Yesterday', status: 'Sent', new: false },
  { id: 'FAX-2288', from: '+1 (617) 555-0142', subject: 'Referral Form', pages: 1, time: '2 days ago', status: 'Received', new: false },
]

function FaxInboxUI() {
  return (
    <div className="w-full rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-3 sm:px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Printer className="w-4 h-4 text-[#0086F9] shrink-0" />
          <span className="text-xs font-mono text-white/60 truncate">Online Fax · Inbox</span>
        </div>
        <span className="ml-2 px-2.5 py-1 rounded-lg bg-[#046BD2]/15 border border-[#046BD2]/25 text-[10px] font-mono text-[#0086F9] shrink-0">1 new</span>
      </div>

      {/* Compose bar */}
      <div className="px-3 sm:px-5 py-3.5 border-b border-white/5 flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-[#046BD2] text-xs font-semibold text-white hover:bg-[#0086F9] transition shrink-0">
          <FileText className="w-3.5 h-3.5" />
          Send Fax
        </button>
        <div className="text-[10px] font-mono text-white/30 truncate hidden sm:block">Drag a PDF or click to attach</div>
      </div>

      <div className="divide-y divide-white/5">
        {faxInbox.map((fax, i) => (
          <motion.div key={fax.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
            className={`px-3 sm:px-5 py-3 sm:py-4 flex items-start gap-3 hover:bg-white/[0.02] transition cursor-pointer ${fax.new ? 'bg-[#046BD2]/5' : ''}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#0086F9]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                {fax.new && <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9] shrink-0" />}
                <span className={`text-xs font-medium truncate ${fax.new ? 'text-white' : 'text-white/70'}`}>{fax.subject}</span>
              </div>
              <div className="text-[10px] font-mono text-white/35 truncate">{fax.from} · {fax.pages} page{fax.pages > 1 ? 's' : ''}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] font-mono text-white/25">{fax.time}</div>
              <div className={`text-[9px] font-mono mt-1 flex items-center gap-1 justify-end ${fax.status === 'Sent' ? 'text-emerald-400' : 'text-[#0086F9]'}`}>
                <CheckCircle className="w-3 h-3" />
                {fax.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-3 sm:px-5 py-3 border-t border-white/10 text-[10px] font-mono text-white/30 truncate">
        Encrypted · HIPAA-eligible · PDF delivery · 150+ countries
      </div>
    </div>
  )
}

export function ProdUCaaSOnlineFaxPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#046BD2]/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">/</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/unified-communications" className="hover:text-[#0086F9]">ucaas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">online-fax</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
          <div className="w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-6 sm:mb-8">
              <Printer className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">UCaaS · Online Fax</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Digital fax.<br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">No machine</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-5 sm:mt-6 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
              Send and receive faxes from your browser, mobile, or email in 150+ countries. HIPAA-eligible, encrypted, delivered as PDF.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-8 sm:mt-10 flex flex-row flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold transition whitespace-nowrap">
                Start faxing digitally <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-full border border-white/15 text-sm sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap">See pricing</Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} className="w-full overflow-hidden">
            <FaxInboxUI />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Fax without the machine.</h2>
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
          <div className="relative rounded-[2.5rem] overflow-hidden p-4 sm:p-6 sm:p-12 md:p-20 text-center bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9]">
            <FileText className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">Kill the fax machine. Keep the number.</h2>
            <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white text-[#046BD2] text-xs sm:text-base font-semibold hover:scale-105 transition whitespace-nowrap">
                Start faxing digitally <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white/15 border border-white/30 text-xs sm:text-base text-white font-semibold hover:bg-white/25 transition whitespace-nowrap">See pricing</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      </div>
    </main>
  )
}
