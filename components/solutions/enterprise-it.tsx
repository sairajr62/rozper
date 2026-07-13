'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Lock, Users, Shield, Network, FileText, Code2, ArrowRight,
  CheckCircle, Headphones, ChevronRight, Server, Boxes, Cpu, KeyRound,
} from 'lucide-react'

const features = [
  { icon: Lock, code: 'AUTH.SAML', title: 'SAML SSO', desc: 'Okta · Azure AD · Google Workspace · Custom SAML' },
  { icon: Users, code: 'IDP.SCIM', title: 'SCIM Provisioning', desc: 'Automate seat creation and deactivation from your directory.' },
  { icon: Shield, code: 'POL.RBAC', title: 'Role-Based Access', desc: 'Granular permissions per team and function.' },
  { icon: Network, code: 'NET.MULTI', title: 'Multi-Site Routing', desc: 'Unlimited locations from a single admin console.' },
  { icon: FileText, code: 'GRC.SUITE', title: 'Compliance Suite', desc: 'GDPR · HIPAA · SOC 2 — with data residency controls.' },
  { icon: Code2, code: 'API.REST', title: 'Developer Tools', desc: 'REST API · webhooks · SDK for custom integrations.' },
]

const detail = [
  { icon: CheckCircle, title: 'Dedicated Implementation', desc: 'Implementation manager handles migration, UAT, and go-live.' },
  { icon: Headphones, title: 'Named Support Contact', desc: 'Not a shared ticket queue — your dedicated technical contact.' },
  { icon: FileText, title: 'Custom SLA Agreements', desc: 'Defined response times and escalation paths tailored to you.' },
]

const stack = ['Okta', 'Azure AD', 'Google Workspace', 'Salesforce', 'ServiceNow', 'Workday']

const stats = [
  { v: '99.99%', k: 'Uptime SLA' },
  { v: 'SOC 2', k: 'Type II Certified' },
  { v: 'HIPAA', k: 'Compliant' },
  { v: '24/7', k: 'Enterprise Support' },
]

const faqs = [
  { q: 'What compliance certifications does Rozper support?', a: 'GDPR, HIPAA, SOC 2 Type II (an independent audit of our security controls), and ISO 27001-aligned. Full audit documentation provided on request.' },
  { q: 'Can Rozper replace our existing PBX?', a: 'Yes. Enterprise team manages full PBX migration including number porting, dial-plan recreation, and routing config.' },
  { q: 'Is there a dedicated enterprise support contact?', a: 'Yes. Named account manager and named technical contact with SLA-backed response times.' },
]

function BlueprintFigure() {
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl border border-[#0086F9]/20 bg-[#0B1220] overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,134,249,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,134,249,0.08) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />
      {/* Corner labels */}
      <div className="absolute top-3 left-3 font-mono text-[10px] text-[#0086F9]/60">A1</div>
      <div className="absolute top-3 right-3 font-mono text-[10px] text-[#0086F9]/60">A8</div>
      <div className="absolute bottom-3 left-3 font-mono text-[10px] text-[#0086F9]/60">H1</div>
      <div className="absolute bottom-3 right-3 font-mono text-[10px] text-[#0086F9]/60">H8</div>

      {/* Schematic */}
      <svg viewBox="0 0 400 400" className="absolute inset-0">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0086F9" />
          </marker>
        </defs>

        {/* IDP node */}
        <g transform="translate(60,80)">
          <rect width="120" height="60" rx="6" fill="none" stroke="#0086F9" strokeWidth="1.5" />
          <text x="60" y="25" textAnchor="middle" fill="#0086F9" fontSize="11" fontFamily="monospace">IdP</text>
          <text x="60" y="42" textAnchor="middle" fill="#0086F9" fontSize="9" fontFamily="monospace" opacity="0.6">SAML / SCIM</text>
        </g>

        {/* Rozper core */}
        <g transform="translate(140,180)">
          <rect width="120" height="60" rx="6" fill="rgba(0,134,249,0.06)" stroke="#0086F9" strokeWidth="1.5" />
          <text x="60" y="25" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace" fontWeight="bold">Rozper Core</text>
          <text x="60" y="42" textAnchor="middle" fill="#0086F9" fontSize="9" fontFamily="monospace" opacity="0.7">99.99% SLA</text>
        </g>

        {/* Sites */}
        <g transform="translate(40,290)">
          <rect width="80" height="50" rx="6" fill="none" stroke="#0086F9" strokeWidth="1.5" />
          <text x="40" y="20" textAnchor="middle" fill="#0086F9" fontSize="10" fontFamily="monospace">SITE 01</text>
          <text x="40" y="35" textAnchor="middle" fill="#0086F9" fontSize="8" fontFamily="monospace" opacity="0.6">NYC · 200</text>
        </g>
        <g transform="translate(160,290)">
          <rect width="80" height="50" rx="6" fill="none" stroke="#0086F9" strokeWidth="1.5" />
          <text x="40" y="20" textAnchor="middle" fill="#0086F9" fontSize="10" fontFamily="monospace">SITE 02</text>
          <text x="40" y="35" textAnchor="middle" fill="#0086F9" fontSize="8" fontFamily="monospace" opacity="0.6">LON · 150</text>
        </g>
        <g transform="translate(280,290)">
          <rect width="80" height="50" rx="6" fill="none" stroke="#0086F9" strokeWidth="1.5" />
          <text x="40" y="20" textAnchor="middle" fill="#0086F9" fontSize="10" fontFamily="monospace">SITE 03</text>
          <text x="40" y="35" textAnchor="middle" fill="#0086F9" fontSize="8" fontFamily="monospace" opacity="0.6">TYO · 80</text>
        </g>

        {/* connectors */}
        <line x1="120" y1="140" x2="200" y2="180" stroke="#0086F9" strokeWidth="1" markerEnd="url(#arr)" strokeDasharray="3,3" />
        <line x1="200" y1="240" x2="80" y2="290" stroke="#0086F9" strokeWidth="1" markerEnd="url(#arr)" />
        <line x1="200" y1="240" x2="200" y2="290" stroke="#0086F9" strokeWidth="1" markerEnd="url(#arr)" />
        <line x1="200" y1="240" x2="320" y2="290" stroke="#0086F9" strokeWidth="1" markerEnd="url(#arr)" />
      </svg>

      <div className="absolute bottom-3 right-3 font-mono text-[10px] text-[#0086F9]/60">REV.04 / 2026</div>
    </div>
  )
}

export function EnterpriseITPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0086F9]/40">
            <Link href="/" className="hover:text-[#2D98F1]">~</Link>
            <ChevronRight className="w-3 h-3" />
            <span>solutions</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">enterprise-it</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#0086F9]/60 mb-6">
              [ Solutions / Enterprise / Architecture v4 ]
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-4xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              <span className="font-mono text-[#0086F9] text-2xl md:text-3xl block mb-3">/* enterprise.it */</span>
              SSO, SCIM, and SLA<br />for enterprise IT.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Enterprise-grade deployment with SSO, SCIM, multi-site routing, and a dedicated success team. Every enterprise standard met — out of the box.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-row flex-wrap gap-3">
              <Link href="/contact/" className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 bg-[#046BD2] text-[#0B1220] text-xs sm:text-sm whitespace-nowrap font-semibold rounded-md hover:bg-[#0086F9] transition">
                Schedule architecture review <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing/" className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 border border-[#046BD2]/30 text-[#2D98F1] text-xs sm:text-sm whitespace-nowrap rounded-md hover:bg-[#046BD2]/10 transition font-medium">
                Enterprise pricing
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="mt-10 flex flex-wrap gap-2">
              <span className="text-xs font-mono text-[#0086F9]/60">$ stack:</span>
              {stack.map(s => (
                <span key={s} className="px-2.5 py-1 rounded border border-[#046BD2]/20 bg-[#046BD2]/5 text-[10px] font-mono text-[#2D98F1]">{s}</span>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}>
            <BlueprintFigure />
          </motion.div>
        </section>

        {/* Stat strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#046BD2]/20 rounded overflow-hidden border border-[#046BD2]/20">
            {stats.map(s => (
              <div key={s.k} className="bg-[#0B1220] p-6 text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-[#0086F9]">{s.v}</div>
                <div className="text-xs text-white/50 mt-2 font-mono uppercase tracking-widest">{s.k}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features as schematic cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-16">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#0086F9]/60 mb-3">// requirements.met</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Enterprise IT requirements met.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="relative p-7 rounded-md border border-[#046BD2]/20 bg-[#111B2D] hover:bg-[#1A2638] hover:border-[#0086F9]/40 transition group"
              >
                <div className="absolute top-3 left-3 font-mono text-[9px] text-[#0086F9]/40 uppercase tracking-widest">{f.code}</div>
                <div className="absolute top-3 right-3 font-mono text-[9px] text-[#0086F9]/40">{String(i + 1).padStart(3, '0')}</div>
                <f.icon className="w-7 h-7 text-[#0086F9] mt-6 mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
                <div className="absolute bottom-3 left-3 right-3 h-px bg-gradient-to-r from-[#046BD2]/0 via-[#046BD2]/30 to-[#046BD2]/0 group-hover:via-[#0086F9] transition" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Support detail */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-md border border-[#046BD2]/20 bg-[#111B2D] p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#046BD2]/5 blur-3xl" />
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#0086F9]/60 mb-3">// support.tier=enterprise</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 max-w-xl">Supported by a team that acts like yours.</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {detail.map((d, i) => (
                <div key={d.title} className="border-l-2 border-[#046BD2] pl-6">
                  <div className="font-mono text-xs text-[#0086F9]/60 mb-2">SUP.{String(i + 1).padStart(2, '0')}</div>
                  <d.icon className="w-6 h-6 text-[#0086F9] mb-3" />
                  <h3 className="font-display text-lg font-semibold mb-2">{d.title}</h3>
                  <p className="text-sm text-white/55">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials — vendor clearance cards, all equal */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-16">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#0086F9]/60 mb-3">// customer.reviews[]</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Cleared by enterprise IT.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                reviewId: 'ENT-2024-004', status: 'APPROVED',
                initials: 'SK', name: 'Stefan Koch', title: 'Director of IT · Meridian Holdings',
                tags: ['SOC2', 'GDPR', 'HIPAA'],
                quote: '"Rozper passed our security review faster than any vendor we\'ve worked with. The deployment team handled everything from SSO to number migration. Zero surprises."',
              },
              {
                reviewId: 'ENT-2024-007', status: 'APPROVED',
                initials: 'AL', name: 'Annika Lindqvist', title: 'CISO · NordGroup AB',
                tags: ['SAML', 'SCIM', 'RBAC'],
                quote: '"SCIM provisioning cut our onboarding overhead by 90%. Accounts are created and deactivated automatically from Azure AD. No manual tickets, ever."',
              },
              {
                reviewId: 'ENT-2024-011', status: 'APPROVED',
                initials: 'MB', name: 'Marcus Barnes', title: 'VP IT · Centurion Financial',
                tags: ['HIPAA', 'Encryption', 'Audit'],
                quote: '"The compliance documentation was audit-ready on day one. Our legal team had the HIPAA BAA signed before we even finished the POC."',
              },
              {
                reviewId: 'ENT-2024-015', status: 'APPROVED',
                initials: 'YP', name: 'Yuki Patel', title: 'IT Director · Solaris Group',
                tags: ['Multi-site', 'SLA', 'Migration'],
                quote: '"We migrated 600 seats across 4 countries in 3 weeks. The implementation team was better than any vendor I\'ve worked with in 15 years of IT."',
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="relative flex flex-col rounded-md border border-[#046BD2]/20 bg-[#111B2D] hover:border-[#0086F9]/40 hover:bg-[#1A2638] transition overflow-hidden"
              >
                {/* Blueprint grid overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                  backgroundImage: 'linear-gradient(rgba(0,134,249,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,134,249,1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }} />
                {/* Review header */}
                <div className="relative flex items-center justify-between px-5 py-2.5 border-b border-[#046BD2]/15 bg-[#046BD2]/[0.03]">
                  <span className="font-mono text-[10px] text-[#0086F9]/50">{t.reviewId}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    <span className="font-mono text-[9px] text-emerald-400">{t.status}</span>
                  </span>
                </div>
                <div className="relative p-6 flex flex-col flex-1">
                  <blockquote className="text-[14px] text-white/82 leading-relaxed flex-1 mb-5">{t.quote}</blockquote>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {t.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded text-[9px] font-mono border border-[#046BD2]/25 text-[#2D98F1]">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#046BD2]/15">
                    <div className="w-9 h-9 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[#2D98F1] font-display font-bold text-xs shrink-0">{t.initials}</div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm leading-tight">{t.name}</div>
                      <div className="text-[10px] font-mono text-white/40 truncate">{t.title}</div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#046BD2]/0 via-[#046BD2]/30 to-[#046BD2]/0" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8">Frequently asked</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-md border border-[#046BD2]/20 bg-[#111B2D] p-6 hover:bg-[#1A2638] transition">
                <summary className="flex items-center justify-between cursor-pointer list-none font-display font-semibold">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#0086F9]/60">Q{i + 1}</span>
                    {f.q}
                  </span>
                  <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform text-[#0086F9]" />
                </summary>
                <p className="mt-4 text-white/60 pl-9">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="relative rounded-3xl overflow-hidden bg-[#0B1220] border border-white/10 p-6 sm:p-6 sm:p-12 md:p-20 text-center">
            {/* Left arc glow */}
            <div className="hidden sm:block absolute -left-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none" aria-hidden>
              <motion.svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "blur(28px)" }} animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
                <circle cx="100" cy="100" r="78" stroke="#5EEAD4" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
                <circle cx="100" cy="100" r="54" stroke="#0D9488" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(40 100 100)" />
              </motion.svg>
            </div>
            {/* Right arc glow */}
            <div className="hidden sm:block absolute -right-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none" aria-hidden>
              <motion.svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "blur(28px)" }} animate={{ rotate: -360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
                <circle cx="100" cy="100" r="78" stroke="#2DD4BF" strokeOpacity="0.55" strokeWidth="24" fill="none" strokeLinecap="round" strokeDasharray="180 320" />
                <circle cx="100" cy="100" r="54" stroke="#5EEAD4" strokeOpacity="0.5" strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray="130 240" transform="rotate(-40 100 100)" />
              </motion.svg>
            </div>
            {/* Faint background grid */}
            <div className="absolute inset-0 opacity-[0.18] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)" }} />
            <div className="relative grid md:grid-cols-2 gap-8 items-center text-left">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#0086F9]/60 mb-4">// next.steps</div>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  Architect a deployment<br />for your organization.
                </h2>
                <p className="mt-6 text-white/60 max-w-md">Our enterprise team will scope, design, and migrate. Most enterprise deployments live within 30 days.</p>
              </div>
              <div className="flex flex-row flex-wrap gap-3 md:justify-end">
                <Link href="/contact/" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm whitespace-nowrap font-semibold rounded-md shadow-[0_0_40px_-10px_rgba(13,148,136,0.7)] transition">
                  Schedule architecture review <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing/" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 bg-white/[0.04] border border-white/15 hover:bg-white/10 text-white text-xs sm:text-sm whitespace-nowrap rounded-md transition font-medium">
                  Enterprise pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
