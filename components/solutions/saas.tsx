'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Globe, Phone, Bot, Brain, Video, ArrowRight, ChevronRight,
  Code2, Terminal, Boxes, Zap, GitBranch, Webhook,
} from 'lucide-react'

const features = [
  { icon: Globe, title: 'Provision numbers globally', desc: 'Numbers in any country — hire globally without a telecoms project.', sample: 'POST /v1/numbers' },
  { icon: Phone, title: 'Click-to-call from CRM', desc: 'Salesforce, HubSpot, Zoho, and your custom CRM.', sample: 'rozper.dial(contact)' },
  { icon: Bot, title: 'AI call summaries', desc: 'Synced to opportunity records — no note-taking needed.', sample: 'auto-sync: enabled' },
  { icon: Brain, title: 'Conversation intelligence', desc: 'Identifies deal risks and competitor mentions automatically.', sample: 'GET /v1/insights' },
  { icon: Video, title: 'Video meetings with AI', desc: 'AI transcripts built in — no Zoom subscription needed.', sample: 'meetings.create()' },
]

const dark = [
  'Add or remove seats monthly — no annual lock-in to start',
  'SSO with Okta, Google Workspace, or Azure AD',
  'REST API and webhooks for custom integrations with your product stack',
]

const stats = [
  { v: '48hrs', k: 'Full deployment time', icon: Zap },
  { v: '6', k: 'Countries provisioned', icon: Globe },
  { v: '$9.99', k: 'Per seat per month', icon: Boxes },
]

const faqs = [
  { q: 'Can Rozper replace our existing phone and video tools?', a: 'Yes. One platform for phone and video at $9.99 per seat.' },
  { q: 'Does it work with existing SSO?', a: 'Yes. SAML SSO with Okta, Google Workspace, Azure AD, and custom SAML.' },
  { q: 'Is there an API for developers?', a: 'Full REST API, webhooks, and SDK. Docs at rozper.com/developers.' },
]

function CodeBlock() {
  return (
    <div className="rounded-2xl bg-[#0a1426] border border-white/10 overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#111B2D]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <span className="ml-2 text-xs text-white/50">~/integrations/rozper.ts</span>
        </div>
        <Code2 className="w-3.5 h-3.5 text-white/40" />
      </div>
      <div className="p-5 space-y-1.5">
        <div><span className="text-[#0086F9]">import</span> <span className="text-white">{'{'} Rozper {'}'}</span> <span className="text-[#0086F9]">from</span> <span className="text-[#2D98F1]">'@rozper/sdk'</span></div>
        <div className="text-white/30">{'//'} initialize</div>
        <div><span className="text-[#0086F9]">const</span> rozper <span className="text-white/60">=</span> <span className="text-[#0086F9]">new</span> <span className="text-[#0086F9]">Rozper</span><span className="text-white">({'{'}</span></div>
        <div className="pl-4"><span className="text-white/80">apiKey:</span> <span className="text-[#2D98F1]">process.env.ROZPER_KEY</span><span className="text-white">,</span></div>
        <div className="pl-4"><span className="text-white/80">region:</span> <span className="text-[#2D98F1]">'us-east-1'</span></div>
        <div><span className="text-white">{'})'}</span></div>
        <div className="text-white/30 mt-3">{'//'} provision number → ai-receptionist</div>
        <div><span className="text-[#0086F9]">await</span> rozper.numbers.<span className="text-[#2D98F1]">create</span>(<span className="text-white">{'{'}</span></div>
        <div className="pl-4"><span className="text-white/80">country:</span> <span className="text-[#2D98F1]">'JP'</span><span className="text-white">,</span></div>
        <div className="pl-4"><span className="text-white/80">handler:</span> <span className="text-[#2D98F1]">'ai-receptionist'</span><span className="text-white">,</span></div>
        <div className="pl-4"><span className="text-white/80">crm:</span> <span className="text-[#2D98F1]">'salesforce'</span></div>
        <div><span className="text-white">{'})'}</span></div>
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">→ 200 OK</span>
          <span className="text-white/40">number provisioned · ai active</span>
        </div>
      </div>
    </div>
  )
}

export function SaaSPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      {/* terminal-like grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(rgba(0,134,249,0.5) 1px, transparent 1px)',
        backgroundSize: '100% 24px',
      }} />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Terminal className="w-3.5 h-3.5" />
            <Link href="/" className="hover:text-[#0086F9]">~</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/solutions" className="hover:text-[#0086F9]">solutions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">saas</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded font-mono bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8">
              <span className="text-[10px] text-[#0086F9]">$</span>
              <span className="text-[10px] uppercase tracking-widest text-[#2D98F1]">solutions ./saas</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Phone and AI<br />for{' '}
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">SaaS teams</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Global calls, CRM-connected, scales with headcount — no procurement overhead. Provision a number in any country in minutes.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded font-mono text-sm bg-[#046BD2] hover:bg-[#0078E0] text-white font-semibold transition">
                <span>$ rozper init</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3.5 rounded border border-white/15 text-white font-medium hover:bg-white/5 transition">
                See pricing
              </Link>
            </motion.div>
          </div>

          <div className="hidden sm:block">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}>
              <CodeBlock />
            </motion.div>
          </div>
        </section>

        {/* Features as API endpoints */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-12">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9] mb-3">// endpoints</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Built for how SaaS teams actually work.</h2>
          </div>

          <div className="border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="grid md:grid-cols-[auto_1fr_auto] gap-6 p-6 bg-[#111B2D] hover:bg-[#1A2638] transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#046BD2]/15 border border-[#046BD2]/30 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-[#0086F9]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
                </div>
                <div className="font-mono text-xs px-3 py-1.5 rounded bg-[#0a1426] border border-white/10 text-[#2D98F1] self-center hidden md:block whitespace-nowrap">{f.sample}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Scale */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-3xl bg-gradient-to-br from-[#046BD2]/15 to-[#0B1220] border border-[#046BD2]/20 p-12 md:p-16">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 items-center">
              <div>
                <Webhook className="w-10 h-10 text-[#0086F9] mb-4" />
                <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">Scales from <span className="text-[#0086F9]">5</span> to <span className="text-[#0086F9]">5,000</span> seats.</h2>
              </div>
              <div className="space-y-3">
                {dark.map((d, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <GitBranch className="w-4 h-4 text-[#0086F9] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/80">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#111B2D] border border-white/10">
                <s.icon className="w-7 h-7 text-[#0086F9] mb-3" strokeWidth={1.5} />
                <div className="font-display text-4xl font-bold text-white">{s.v}</div>
                <div className="text-sm text-white/50 mt-2">{s.k}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-12">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9] mb-3">// customer.stories</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Shipped by SaaS teams like yours.</h2>
            <p className="mt-3 text-white/50 font-mono text-sm">Real deployments. Real velocity.</p>
          </div>

          {/* API response cards — all equal */}
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                method: 'GET', endpoint: '/teams/skyline-saas', status: '200', latency: '48h deploy',
                initials: 'JO', name: "James O'Brien", role: 'RevOps Lead · Skyline SaaS',
                avatarBg: 'linear-gradient(135deg,#046BD2,#2575FC)',
                quote: '"Rozper gave us a real phone system in 48 hours. Numbers in 6 countries, Salesforce logging, and AI summaries before the week was out."',
              },
              {
                method: 'POST', endpoint: '/webhooks/data-warehouse', status: '200', latency: '1 sprint',
                initials: 'MC', name: 'Maya Chen', role: 'Head of Engineering · Luma Growth',
                avatarBg: 'linear-gradient(135deg,#046BD2,#0086F9)',
                quote: '"The API docs are genuinely good. We had webhooks pushing call data into our data warehouse within a single sprint — no Rozper engineer needed."',
              },
              {
                method: 'SYNC', endpoint: '/crm/hubspot/summaries', status: '200', latency: 'auto',
                initials: 'TB', name: 'Tom Bakker', role: 'VP Sales · Orbit CRM',
                avatarBg: 'linear-gradient(135deg,#0086F9,#2575FC)',
                quote: '"AI call summaries log straight into HubSpot. Our reps stopped dreading note-taking — they just close the call and the summary is already there."',
              },
              {
                method: 'PUT', endpoint: '/numbers/apac-emea', status: '200', latency: '4 countries',
                initials: 'AP', name: 'Asha Patel', role: 'Head of CS · Driftline',
                avatarBg: 'linear-gradient(135deg,#2575FC,#046BD2)',
                quote: '"We expanded into APAC and EMEA without a single IT ticket. Four countries provisioned in one sprint — local numbers, SSO, and AI routing all configured."',
              },
            ].map((t, i) => (
              <motion.div
                key={t.initials}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-2xl border border-[#0086F9]/15 bg-[#060D1A] overflow-hidden hover:border-[#0086F9]/40 hover:shadow-[0_0_30px_-10px_rgba(0,134,249,0.2)] transition-all duration-300 flex flex-col"
              >
                {/* Terminal-style header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#0a1426]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[10px] font-bold text-[#0086F9] shrink-0">{t.method}</span>
                    <span className="font-mono text-[10px] text-white/35 truncate">{t.endpoint}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className="font-mono text-[10px] text-emerald-400">{t.status} OK</span>
                    <span className="text-white/20">·</span>
                    <span className="font-mono text-[10px] text-[#2D98F1]">{t.latency}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-3.5 h-3.5 fill-[#0086F9]" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="font-mono text-[13px] text-white/75 leading-relaxed flex-1 mb-6">{t.quote}</blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0" style={{ background: t.avatarBg }}>{t.initials}</div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="font-mono text-[11px] text-white/40 mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-xl bg-[#111B2D] border border-white/10 p-6 hover:bg-[#1A2638] transition">
                <summary className="flex items-center justify-between cursor-pointer list-none font-display font-semibold">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#0086F9]">Q{i + 1}.</span>
                    {f.q}
                  </span>
                  <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform text-[#0086F9]" />
                </summary>
                <p className="mt-4 text-white/60 pl-9">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="relative rounded-2xl border border-[#046BD2]/30 bg-gradient-to-br from-[#046BD2] via-[#0078E0] to-[#0086F9] p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
            <div className="relative">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/70 mb-3">// ship.it</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-white">Build phone into your stack in an afternoon.</h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-white text-[#046BD2] font-semibold hover:scale-105 transition">
                  <span className="font-mono">$ rozper init</span> <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/15 border border-white/30 text-white font-semibold hover:bg-white/25 transition">See pricing</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
