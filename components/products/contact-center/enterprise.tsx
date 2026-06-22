"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import {
  Shield,
  Lock,
  Globe,
  Users,
  Settings,
  BarChart3,
  ArrowRight,
  ChevronRight,
  Building2,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "SSO & SCIM",
    desc: "SAML 2.0 SSO and SCIM provisioning — connect your IdP, automate user lifecycle.",
  },
  {
    icon: Globe,
    title: "Multi-Site Routing",
    desc: "Route across global contact center sites with priority and overflow rules.",
  },
  {
    icon: Shield,
    title: "Custom SLAs",
    desc: "Negotiate SLA tiers per team, queue, or customer segment — backed by our team.",
  },
  {
    icon: Users,
    title: "Dedicated Success Team",
    desc: "Named CSM and 24/7 priority support with 1-hour response SLA.",
  },
  {
    icon: Settings,
    title: "Custom Integrations",
    desc: "Custom API integrations, webhook pipelines, and enterprise data export.",
  },
  {
    icon: BarChart3,
    title: "Advanced Compliance",
    desc: "SOC 2, HIPAA, GDPR, PCI DSS — with audit logs and data residency options.",
  },
];

const faqs = [
  {
    q: "What does the enterprise onboarding look like?",
    a: "Dedicated implementation manager, custom training, SSO setup, and a 30-day hypercare period with white-glove support.",
  },
  {
    q: "Can we bring our own PSTN carrier?",
    a: "Yes. Bring Your Own Carrier (BYOC) lets you connect existing SIP trunks or carrier contracts to Rozper.",
  },
  {
    q: "What compliance certifications are included?",
    a: "SOC 2 Type II, HIPAA BAA, GDPR DPA, PCI DSS SAQ-D. Audit logs and data residency available on request.",
  },
];

const enterpriseFeatures = [
  { label: "SSO / SAML 2.0", included: true },
  { label: "SCIM Provisioning", included: true },
  { label: "Custom SLA Tiers", included: true },
  { label: "Data Residency", included: true },
  { label: "Dedicated CSM", included: true },
  { label: "BYOC (SIP Trunks)", included: true },
  { label: "Custom Audit Logs", included: true },
  { label: "Multi-Region Failover", included: true },
];

function EnterpriseConfigUI() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center gap-2">
        <Building2 className="w-4 h-4 text-[#0086F9]" />
        <span className="text-xs font-mono text-white/60">
          Enterprise Plan · Acme Corp
        </span>
        <div className="ml-auto px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20 text-[9px] font-mono text-emerald-400">
          Active
        </div>
      </div>

      {/* SSO config */}
      <div className="p-5 border-b border-white/5">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">
          Identity Provider
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0B1220] border border-[#046BD2]/20">
          <div className="w-8 h-8 rounded-lg bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center">
            <Lock className="w-4 h-4 text-[#0086F9]" />
          </div>
          <div>
            <div className="text-xs font-medium text-white">
              Okta SSO — Connected
            </div>
            <div className="text-[10px] font-mono text-[#0086F9]/60">
              SAML 2.0 · 847 users synced
            </div>
          </div>
          <CheckCircle className="w-4 h-4 text-emerald-400 ml-auto" />
        </div>
      </div>

      {/* Multi-site */}
      <div className="p-5 border-b border-white/5">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">
          Active Sites
        </div>
        <div className="space-y-2">
          {[
            { name: "New York HQ", agents: 120, status: "Primary" },
            { name: "London EU", agents: 64, status: "Overflow" },
            { name: "Singapore APAC", agents: 41, status: "Overflow" },
          ].map((site, i) => (
            <motion.div
              key={site.name}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1220] border border-white/5"
            >
              <Globe className="w-4 h-4 text-[#0086F9]" />
              <div className="flex-1">
                <div className="text-xs text-white">{site.name}</div>
                <div className="text-[10px] font-mono text-white/30">
                  {site.agents} agents
                </div>
              </div>
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded border ${site.status === "Primary" ? "text-[#0086F9] border-[#046BD2]/25 bg-[#046BD2]/10" : "text-white/30 border-white/10 bg-white/5"}`}
              >
                {site.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="p-5">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">
          Enterprise Features
        </div>
        <div className="grid grid-cols-2 gap-2">
          {enterpriseFeatures.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 + 0.3 }}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="text-[10px] font-mono text-white/55">
                {f.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProdCCEnterprisePageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-x-clip">
      <Navbar />

      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,134,249,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,134,249,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">
              /
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/products/contact-center"
              className="hover:text-[#0086F9]"
            >
              contact-center
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">enterprise</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8"
            >
              <Building2 className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">
                Contact Center · Enterprise
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              Enterprise rules.
              <br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">
                Your terms
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              SSO, SCIM, multi-site routing, custom SLAs, and a dedicated
              success team. Contact center built for enterprises that need
              control.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              className="mt-10 flex flex-row flex-nowrap gap-2 sm:gap-3"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold transition whitespace-nowrap"
              >
                Talk to enterprise sales{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full border border-white/15 text-sm sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap"
              >
                See pricing
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          >
            <EnterpriseConfigUI />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Enterprise-grade. Without the enterprise pain.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl bg-[#111B2D] border border-white/[0.07] p-6 hover:border-[#046BD2]/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-all">
                    <f.icon
                      className="w-4.5 h-4.5 text-[#0086F9]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-white/20 font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8 text-center">
            FAQ
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:bg-white/[0.05] transition"
              >
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
              <Building2 className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">
                Built for your scale. Ready on day one.
              </h2>
              <div className="mt-10 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3">
                <Link
                  href="/free-trial"
                  className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] text-sm sm:text-base font-semibold transition whitespace-nowrap"
                >
                  Start a free trial <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-sm sm:text-base text-white font-semibold transition whitespace-nowrap"
                >
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
