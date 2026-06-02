"use client"

import { motion } from "framer-motion"
import {
  Lock,
  Server,
  KeyRound,
  ShieldCheck,
  FileCheck2,
  Bug,
  ArrowUpRight,
  Cpu,
  Globe2,
  Eye,
} from "lucide-react"

const stats = [
  { v: "99.99%", l: "Contracted uptime" },
  { v: "SOC 2", l: "Type II · annual" },
  { v: "ISO 27001", l: "Information security" },
  { v: "AES-256", l: "Data at rest" },
]

const pillars = [
  {
    Icon: Lock,
    title: "Encryption everywhere",
    body: "All voice, video, messaging, and signalling are protected with TLS 1.3 in transit and AES-256 at rest. Media is encrypted leg-by-leg with SRTP; keys rotate automatically.",
    points: [
      "TLS 1.3 for every API and signalling path",
      "SRTP for RTP media, with key rotation",
      "AES-256 envelope encryption for stored data",
      "Customer-managed keys (BYOK) on Enterprise",
    ],
    accent: "from-[#22D3EE] to-[#0086F9]",
  },
  {
    Icon: Server,
    title: "Carrier-grade infrastructure",
    body: "We run our own redundant points-of-presence across three regions, with active-active failover, isolated tenant data, and continuous health checks at the carrier layer.",
    points: [
      "Multi-region active-active",
      "Per-tenant logical isolation",
      "24/7 NOC with live engineer on-call",
      "DDoS protection at the edge",
    ],
    accent: "from-[#0086F9] to-[#046BD2]",
  },
  {
    Icon: KeyRound,
    title: "Access controls",
    body: "Least-privilege by default. Every customer admin can enforce SSO, SCIM, granular roles, and session policies — and every internal Rozper action is audited.",
    points: [
      "SAML 2.0 SSO + SCIM provisioning",
      "Granular roles & scoped API keys",
      "Mandatory MFA for all staff",
      "Full audit trail, 13-month retention",
    ],
    accent: "from-[#046BD2] to-[#2575FC]",
  },
  {
    Icon: ShieldCheck,
    title: "Continuous assurance",
    body: "Third-party assessors test our controls every quarter. Penetration tests, vulnerability scans, and red-team exercises feed back into the platform on a fixed cadence.",
    points: [
      "Quarterly external pen tests",
      "Weekly dependency & container scans",
      "Bug bounty program (in-scope reports)",
      "Internal red-team exercises",
    ],
    accent: "from-[#2575FC] to-[#22D3EE]",
  },
]

const compliance = [
  { name: "SOC 2 Type II", desc: "Annual report, available under NDA." },
  { name: "ISO 27001", desc: "Information security management." },
  { name: "ISO 27017", desc: "Cloud-specific security controls." },
  { name: "ISO 27018", desc: "PII protection in cloud services." },
  { name: "HIPAA · BAA", desc: "Available for Enterprise customers." },
  { name: "GDPR · UK GDPR", desc: "DPA + SCCs on request." },
  { name: "PCI DSS · SAQ-A", desc: "For card-handling integrations." },
  { name: "CCPA / CPRA", desc: "California consumer rights." },
]

const subprocessors = [
  { name: "AWS", purpose: "Compute & storage", region: "US · EU · APAC" },
  { name: "Cloudflare", purpose: "Edge & WAF", region: "Global" },
  { name: "Twilio Networking", purpose: "Number inventory", region: "Global" },
  { name: "Stripe", purpose: "Billing & payments", region: "US · EU" },
]

export function SecurityContent() {
  return (
    <>
      {/* Stat strip */}
      <section className="relative -mt-2">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {stats.map((s) => (
              <div key={s.l} className="bg-[#0A1020] px-5 py-5">
                <div className="font-display text-2xl sm:text-3xl font-bold bg-gradient-to-br from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent tabular-nums">
                  {s.v}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-mono text-white/40 mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative py-20 sm:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
              How we protect you
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Four pillars. No corner cut.
            </h2>
            <p className="mt-4 text-[#9AA8BC] leading-relaxed">
              We treat security the way we treat the carrier network underneath
              Rozper — as critical infrastructure, monitored every second,
              audited by people who don&apos;t work for us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-6 sm:p-7"
              >
                <div
                  className={`absolute -top-px left-6 right-6 h-px bg-gradient-to-r ${p.accent} opacity-60`}
                />
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center shadow-[0_0_25px_-5px_rgba(34,211,238,0.4)]`}
                >
                  <p.Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold text-white tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-[#9AA8BC] leading-relaxed">
                  {p.body}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2.5 text-sm text-white/80"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#22D3EE] shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance grid */}
      <section className="relative py-16 sm:py-20 border-t border-white/5">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
                Compliance & audits
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Certified, in writing.
              </h2>
              <p className="mt-3 text-[#9AA8BC] max-w-xl">
                Request our latest reports through your account team. Audit
                packs include the controls matrix, executive summary, and the
                pen-test letter.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 text-sm text-white transition-colors"
            >
              <FileCheck2 className="w-4 h-4 text-[#22D3EE]" />
              Request audit pack
              <ArrowUpRight className="w-3.5 h-3.5 text-white/50" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {compliance.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/20 transition-colors"
              >
                <div className="font-display text-sm font-semibold text-white">
                  {c.name}
                </div>
                <div className="mt-1.5 text-xs text-white/55 leading-relaxed">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-processors + data residency */}
      <section className="relative py-16 sm:py-20 border-t border-white/5">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          {/* Sub-processors */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
              Sub-processors
            </div>
            <h2 className="font-display text-3xl font-semibold text-white tracking-tight">
              Who touches your data.
            </h2>
            <p className="mt-3 text-[#9AA8BC]">
              The short list. The full register, with regions and contract
              tiers, is in the customer console.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="grid grid-cols-12 px-5 py-3 text-[10px] uppercase tracking-[0.22em] font-mono text-white/35 border-b border-white/5">
                <div className="col-span-4">Provider</div>
                <div className="col-span-5">Purpose</div>
                <div className="col-span-3">Region</div>
              </div>
              {subprocessors.map((s, i) => (
                <div
                  key={s.name}
                  className={`grid grid-cols-12 px-5 py-4 text-sm ${
                    i !== subprocessors.length - 1
                      ? "border-b border-white/5"
                      : ""
                  }`}
                >
                  <div className="col-span-4 font-medium text-white">
                    {s.name}
                  </div>
                  <div className="col-span-5 text-white/70">{s.purpose}</div>
                  <div className="col-span-3 text-white/55 font-mono text-[12px]">
                    {s.region}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data residency */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
              Data residency
            </div>
            <h2 className="font-display text-3xl font-semibold text-white tracking-tight">
              Pick a region. Stay there.
            </h2>
            <p className="mt-3 text-[#9AA8BC]">
              Choose where your tenant lives at signup. Recordings,
              transcripts, and CDRs are pinned to that region — including
              backups.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                {
                  Icon: Globe2,
                  t: "US, EU, and APAC regions",
                  d: "Active-active across three AZs each. Pinning is enforced at the storage layer, not just the routing layer.",
                },
                {
                  Icon: Cpu,
                  t: "On-prem session border control",
                  d: "Optional. Customer-deployed SBC for regulated traffic patterns.",
                },
                {
                  Icon: Eye,
                  t: "Tenant-level encryption keys",
                  d: "BYOK with AWS KMS, GCP KMS, or HashiCorp Vault on Enterprise.",
                },
              ].map((b) => (
                <li
                  key={b.t}
                  className="flex gap-3.5 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <span className="shrink-0 w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#22D3EE]">
                    <b.Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-white">{b.t}</div>
                    <div className="mt-1 text-xs text-white/55 leading-relaxed">
                      {b.d}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Responsible disclosure */}
      <section className="relative py-16 sm:py-20 border-t border-white/5">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/30 to-transparent shadow-[0_0_60px_-15px_rgba(4,107,210,0.5)]">
            <div className="rounded-3xl bg-[#0A1020]/90 backdrop-blur-2xl p-7 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#046BD2] flex items-center justify-center">
                  <Bug className="w-5 h-5 text-white" />
                </span>
                <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/45">
                  Responsible disclosure
                </div>
              </div>
              <h2 className="font-display mt-5 text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Found something? Tell us first.
              </h2>
              <p className="mt-4 text-[#9AA8BC] leading-relaxed">
                We&apos;d rather hear from you than read about it. Send
                vulnerabilities to{" "}
                <a
                  href="mailto:security@rozper.com"
                  className="text-[#22D3EE] hover:text-white transition-colors"
                >
                  security@rozper.com
                </a>{" "}
                with a clear reproduction, your contact details, and any
                requested redactions. We respond within one business day, fix
                first, then coordinate public disclosure.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:security@rozper.com"
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0078E0] hover:to-[#22D3EE] text-white font-medium transition-all"
                >
                  Email security@rozper.com
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="/legal/privacy"
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 text-sm text-white/85 transition-colors"
                >
                  Read privacy policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
