'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Lock, Users, Shield, Building, FileText, Settings, ArrowRight,
  CheckCircle, Headphones, ChevronRight, Server, Boxes, Cpu, KeyRound,
} from 'lucide-react'

const features = [
  { icon: Lock, code: 'AUTH.SAML', title: 'SAML SSO', desc: 'Okta · Azure AD · Google Workspace · Custom SAML' },
  { icon: Users, code: 'IDP.SCIM', title: 'SCIM Provisioning', desc: 'Automate seat creation and deactivation from your directory.' },
  { icon: Shield, code: 'POL.RBAC', title: 'Role-Based Access', desc: 'Granular permissions per team and function.' },
  { icon: Building, code: 'NET.MULTI', title: 'Multi-Site Routing', desc: 'Unlimited locations from a single admin console.' },
  { icon: FileText, code: 'GRC.SUITE', title: 'Compliance Suite', desc: 'GDPR · HIPAA · SOC 2 — with data residency controls.' },
  { icon: Settings, code: 'API.REST', title: 'Developer Tools', desc: 'REST API · webhooks · SDK for custom integrations.' },
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
  { q: 'What compliance certifications does Rozper support?', a: 'GDPR, HIPAA, SOC 2 Type II, and ISO 27001-aligned. Full audit documentation provided on request.' },
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
            <Link href="/solutions" className="hover:text-[#2D98F1]">solutions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">enterprise-it</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#0086F9]/60 mb-6">
              [ Solutions / Enterprise / Architecture v4 ]
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              <span className="font-mono text-[#0086F9] text-2xl md:text-3xl block mb-3">/* enterprise.it */</span>
              SSO, SCIM, and SLA<br />for enterprise IT.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Enterprise-grade deployment with SSO, SCIM, multi-site routing, and a dedicated success team. Every enterprise standard met — out of the box.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#046BD2] text-[#0B1220] font-semibold rounded-md hover:bg-[#0086F9] transition">
                Schedule architecture review <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#046BD2]/30 text-[#2D98F1] rounded-md hover:bg-[#046BD2]/10 transition font-medium">
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

        {/* Testimonials — vendor audit log style */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-16">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#0086F9]/60 mb-3">// customer.reviews[]</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Cleared by enterprise IT.</h2>
          </div>

          {/* Vertical audit-log timeline — single column, left rail connecting all entries */}
          {(() => {
            const entries = [
              {
                featured: true,
                idx: '000', id: 'ENT-2024-004',
                initials: 'SK', name: 'Stefan Koch', title: 'Director of IT · Meridian Holdings',
                tags: ['SOC2', 'GDPR', 'HIPAA'],
                quote: "Rozper passed our security review faster than any vendor we've worked with. The deployment team handled everything from SSO to number migration. Zero surprises.",
              },
              {
                idx: '001', id: 'ENT-2024-007',
                initials: 'AL', name: 'Annika Lindqvist', title: 'CISO · NordGroup AB',
                tags: ['SAML', 'SCIM', 'RBAC'],
                quote: 'SCIM provisioning cut our onboarding overhead by 90%. Accounts are created and deactivated automatically from Azure AD. No manual tickets, ever.',
              },
              {
                idx: '002', id: 'ENT-2024-011',
                initials: 'MB', name: 'Marcus Barnes', title: 'VP IT · Centurion Financial',
                tags: ['HIPAA', 'Encryption', 'Audit'],
                quote: 'The compliance documentation was audit-ready on day one. Our legal team had the HIPAA BAA signed before we even finished the POC.',
              },
              {
                idx: '003', id: 'ENT-2024-015',
                initials: 'YP', name: 'Yuki Patel', title: 'IT Director · Solaris Group',
                tags: ['Multi-site', 'SLA', 'Migration'],
                quote: "We migrated 600 seats across 4 countries in 3 weeks. The implementation team was better than any vendor I've worked with in 15 years of IT.",
              },
            ]
            return (
              <div className="relative">
                {/* Log header */}
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#046BD2]/15">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">// vendor.review.log</span>
                    <span className="font-mono text-[10px] text-[#0086F9]/30">4 entries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="font-mono text-[10px] text-emerald-400">all approved · live</span>
                  </div>
                </div>

                {/* Timeline rail + entries */}
                <div className="relative pl-10">
                  {/* Vertical rail */}
                  <div className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-[#0086F9]/60 via-[#046BD2]/30 to-[#046BD2]/10" />

                  <div className="space-y-4">
                    {entries.map((t, i) => (
                      <motion.div
                        key={t.name}
                        initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                        className="relative"
                      >
                        {/* Timeline dot */}
                        <div className={`absolute -left-[31px] top-5 z-10 ${t.featured ? 'w-4 h-4 -mt-0.5 -ml-0.5' : 'w-3 h-3'}`}>
                          {t.featured ? (
                            <>
                              <motion.div
                                animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 rounded-full bg-[#0086F9]"
                              />
                              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#046BD2] to-[#0086F9] border-2 border-[#0B1220]" />
                            </>
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-[#0B1220] border-2 border-[#0086F9]/60" />
                          )}
                        </div>

                        {/* Entry card */}
                        <div className={`relative border bg-[#111B2D] rounded-md overflow-hidden group hover:border-[#0086F9]/40 transition ${
                          t.featured
                            ? 'border-[#046BD2]/30 p-7 shadow-[0_0_30px_-10px_rgba(0,134,249,0.3)]'
                            : 'border-[#046BD2]/15 p-4'
                        }`}>
                          {/* Subtle grid for featured only */}
                          {t.featured && (
                            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
                              backgroundImage: 'linear-gradient(rgba(0,134,249,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,134,249,0.05) 1px, transparent 1px)',
                              backgroundSize: '20px 20px',
                            }} />
                          )}

                          {/* Header row — avatar + name + meta */}
                          <div className="relative flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[#2D98F1] font-display font-bold flex-shrink-0 ${
                                t.featured ? 'w-10 h-10 text-sm' : 'w-8 h-8 text-[11px]'
                              }`}>{t.initials}</div>
                              <div className="min-w-0">
                                <div className={`font-semibold leading-tight ${t.featured ? 'text-base' : 'text-sm'}`}>{t.name}</div>
                                <div className="text-[10px] text-white/40 font-mono truncate leading-tight">{t.title}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="font-mono text-[9px] text-[#0086F9]/40 hidden sm:inline">{t.id}</span>
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
                                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                                <span className="font-mono text-[8px] text-emerald-400">{t.featured ? 'APPROVED' : 'OK'}</span>
                              </span>
                            </div>
                          </div>

                          {/* Quote */}
                          <blockquote className={`relative text-white/85 leading-relaxed mb-3 ${
                            t.featured ? 'font-display text-lg md:text-xl font-medium' : 'text-[13px] text-white/75'
                          }`}>
                            "{t.quote}"
                          </blockquote>

                          {/* Tags */}
                          <div className="relative flex items-center gap-1.5 flex-wrap">
                            {t.tags.map(tag => (
                              <span key={tag} className="px-1.5 py-0.5 rounded text-[9px] font-mono border border-[#046BD2]/20 text-[#2D98F1]">{tag}</span>
                            ))}
                            <span className="ml-auto font-mono text-[9px] text-[#0086F9]/30 sm:hidden">{t.id}</span>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#046BD2]/0 via-[#046BD2]/30 to-[#046BD2]/0 group-hover:via-[#0086F9] transition" />
                        </div>
                      </motion.div>
                    ))}

                    {/* End-of-log marker */}
                    <div className="relative">
                      <div className="absolute -left-[28px] top-1.5 w-2 h-2 rounded-full bg-[#046BD2]/30" />
                      <div className="font-mono text-[10px] text-[#0086F9]/40 pt-0.5">$ end of log · 4 / 4 records</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
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
          <div className="relative rounded-md border border-[#046BD2]/30 bg-gradient-to-br from-[#046BD2]/15 via-[#0B1220] to-[#0B1220] p-12 md:p-20 overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'linear-gradient(rgba(0,134,249,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,134,249,0.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#0086F9]/60 mb-4">// next.steps</div>
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                  Architect a deployment<br />for your organization.
                </h2>
                <p className="mt-6 text-white/60 max-w-md">Our enterprise team will scope, design, and migrate. Most enterprise deployments live within 30 days.</p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#046BD2] text-[#0B1220] font-semibold rounded-md hover:bg-[#0086F9] transition">
                  Schedule architecture review <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-[#046BD2]/30 text-[#2D98F1] rounded-md hover:bg-[#046BD2]/10 transition font-medium">
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
