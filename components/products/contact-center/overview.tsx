"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import {
  Inbox,
  Bot,
  Headphones,
  Phone,
  BarChart3,
  Building,
  MessageSquare,
  Zap,
  Users,
  ArrowRight,
  Activity,
  Radio,
  Eye,
  Mic,
  ChevronRight,
} from "lucide-react";
import { CCTabletIllustration } from "@/components/ui/cc-tablet-illustration";
import { ChannelCollapseAnimation } from "@/components/ui/channel-collapse-animation";
import { AIShieldAnimation } from "@/components/ui/ai-shield-animation";
import { SupervisorDashboardAnimation } from "@/components/ui/supervisor-dashboard-animation";
import { OutboundDialerMobile } from "@/components/ui/outbound-dialer-mobile";

const channels = [
  { name: "Voice", color: "bg-blue-500", volume: 247 },
  { name: "SMS", color: "bg-emerald-500", volume: 189 },
  { name: "WhatsApp", color: "bg-green-500", volume: 142 },
  { name: "Email", color: "bg-orange-500", volume: 98 },
  { name: "Web Chat", color: "bg-purple-500", volume: 76 },
  { name: "Instagram", color: "bg-pink-500", volume: 54 },
];

const features = [
  {
    icon: Inbox,
    title: "Omnichannel Inbox",
    desc: "Voice, chat, SMS, email, social — unified in one agent screen with full context.",
  },
  {
    icon: Bot,
    title: "AI Agent Assist",
    desc: "Real-time coaching, answer suggestions, and sentiment detection on every call.",
  },
  {
    icon: Headphones,
    title: "Supervisor Tools",
    desc: "Barge, whisper, and monitor live — with AI alerts when calls need attention.",
  },
  {
    icon: Phone,
    title: "Outbound Dialer",
    desc: "Power and predictive dialing with compliance tools and CRM sync.",
  },
  {
    icon: BarChart3,
    title: "Interaction Analytics",
    desc: "Transcripts, sentiment, intent, and quality scores on 100% of conversations.",
  },
  {
    icon: Building,
    title: "Enterprise Ready",
    desc: "SSO, SCIM, multi-site routing, custom SLAs, and dedicated success team.",
  },
];

const sections = [
  {
    title: "Every Channel, One Agent Screen",
    desc: "Agents jumping between browser tabs lose time and context on every switch. Rozper's omnichannel inbox puts every channel in one screen, with the customer's full history visible before the first reply.",
    icon: MessageSquare,
    items: [
      "Unified conversation history",
      "Real-time channel switching",
      "Full CRM context",
    ],
  },
  {
    title: "AI That Handles the Routine",
    desc: "Your contact center runs on six channels, three shifts, and two dozen agents. Rozper ties it together — AI handles the routine, your team handles what matters.",
    icon: Zap,
    items: ["24/7 AI answering", "Smart escalation rules", "Intent detection"],
  },
  {
    title: "Supervisors See Everything",
    desc: "A supervisor who can only review yesterday's calls fixes yesterday's problems. Rozper gives supervisors live call control, AI alerts, and real-time dashboards.",
    icon: Eye,
    items: [
      "Live barge and whisper",
      "Real-time dashboards",
      "AI-powered alerts",
    ],
  },
];

const faqs = [
  {
    q: "How many channels does the contact center support?",
    a: "Voice, SMS, email, web chat, WhatsApp, Facebook Messenger, Instagram, and more — all unified in a single agent inbox with full conversation history.",
  },
  {
    q: "Can AI handle customer inquiries automatically?",
    a: "Yes. AI agents handle routine inquiries 24/7, qualify leads, book appointments, and escalate to human agents when needed.",
  },
  {
    q: "What supervisor tools are available?",
    a: "Supervisors can barge, whisper, and monitor calls in real-time. AI alerts notify supervisors when calls need attention based on sentiment, keywords, or duration thresholds.",
  },
  {
    q: "Is the contact center compliant for regulated industries?",
    a: "Yes. SOC 2 certified, HIPAA compliant, and supports PCI DSS for payment processing. Enterprise plans include custom compliance configurations.",
  },
  {
    q: "How does pricing work for contact center agents?",
    a: "Contact center seats start at $29/agent/month and include all channels, AI features, and supervisor tools. Volume discounts available for teams over 50.",
  },
];

function LiveDashboard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="rounded-3xl bg-[#0B1220] border border-white/10 overflow-hidden">
      <div className="px-6 py-3 border-b border-white/10 flex items-center justify-between bg-[#111B2D]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="ml-3 text-xs font-mono text-white/50">
            rozper.command-center
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
            <span className="relative rounded-full bg-emerald-400 w-2 h-2" />
          </span>
          LIVE · 247 active
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
        <div className="p-5 bg-[#0B1220]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
            Active Channels
          </div>
          <div className="space-y-2.5">
            {channels.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${c.color}`} />
                <span className="text-xs text-white/70 flex-1">{c.name}</span>
                <span className="text-xs font-mono text-white/90">
                  {c.volume + (tick % 7)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 bg-[#0B1220]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
            AI Activity
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">Auto-resolved</span>
                <span className="text-emerald-400 font-mono">73%</span>
              </div>
              <div className="h-1 bg-white/5 rounded">
                <motion.div
                  className="h-1 bg-emerald-400 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "73%" }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">Sentiment +</span>
                <span className="text-[#0086F9] font-mono">88%</span>
              </div>
              <div className="h-1 bg-white/5 rounded">
                <motion.div
                  className="h-1 bg-[#0086F9] rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "88%" }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">SLA met</span>
                <span className="text-amber-400 font-mono">99.2%</span>
              </div>
              <div className="h-1 bg-white/5 rounded">
                <motion.div
                  className="h-1 bg-amber-400 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "99.2%" }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2 p-5 bg-[#0B1220]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
            Live Waveform · Voice Queue
          </div>
          <div className="flex items-end gap-0.5 h-12">
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-t from-[#046BD2] to-[#2D98F1] rounded-sm"
                animate={{ height: `${20 + (Math.sin(i + tick) + 1) * 30}%` }}
                transition={{ duration: 0.8 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactCenterPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-x-hidden">
      <Navbar />

      {/* Subtle scan-line backdrop */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,134,249,0.02) 0px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-white/70">
              ~
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-white/70">
              products
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">contact-center</span>
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded border border-[#046BD2]/30 bg-[#046BD2]/5 mb-8"
              >
                <Radio className="w-4 h-4 text-[#0086F9]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">
                  CCAAS · OPERATIONS DECK
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight"
              >
                Contact center
                <br />
                that <span className="text-[#0086F9]">handles itself</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                className="mt-6 text-lg text-white/60 max-w-lg leading-relaxed"
              >
                Six channels. Three shifts. Two dozen agents. Rozper ties it
                together — AI handles the routine, your team handles what
                matters.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                className="mt-10 flex flex-row flex-nowrap gap-2 sm:gap-3"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-3.5 rounded bg-[#046BD2] text-sm sm:text-base text-white font-semibold hover:bg-[#0086F9] transition whitespace-nowrap"
                >
                  Start a Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-3.5 rounded border border-white/15 text-sm sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap"
                >
                  See pricing
                </Link>
              </motion.div>
            </div>

            <div className="hidden md:block">
              <CCTabletIllustration />
            </div>
          </div>
        </section>

        {/* Feature Grid - panel style */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9]/80 mb-3">
                // modules
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold max-w-xl">
                Everything your contact center needs.
              </h2>
            </div>
            <div className="text-sm text-white/50 max-w-xs">
              AI-powered tools for agents, supervisors, and admins — all in one
              platform.
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group p-8 bg-[#0B1220] hover:bg-[#111B2D] transition relative"
              >
                <div className="absolute top-3 left-3 text-[10px] font-mono text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-11 h-11 rounded border border-[#046BD2]/30 bg-[#046BD2]/10 flex items-center justify-center mb-5">
                  <f.icon className="w-5 h-5 text-[#0086F9]" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Alternating sections */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 space-y-16 sm:space-y-24 lg:space-y-32">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9] mb-4">
                  // {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {s.title}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  {s.desc}
                </p>
                <ul className="space-y-3">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border border-[#046BD2]/40 bg-[#046BD2]/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9]" />
                      </div>
                      <span className="text-white/80">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {i === 0 ? (
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#046BD2]/10 to-[#2575FC]/5 overflow-hidden py-6 px-4 min-h-[200px]">
                  <ChannelCollapseAnimation />
                </div>
              ) : i === 1 ? (
                <div className="relative rounded-2xl border border-white/10 bg-[#080F1C] overflow-hidden min-h-[200px]">
                  <AIShieldAnimation />
                </div>
              ) : i === 2 ? (
                <div className="relative rounded-2xl border border-white/10 bg-[#080F1C] overflow-hidden min-h-[200px]">
                  <SupervisorDashboardAnimation />
                </div>
              ) : (
                <div className="relative aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-[#046BD2]/15 to-[#2575FC]/10 overflow-hidden p-8 flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(34,211,238,0.4) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <s.icon
                    className="w-32 h-32 text-[#0086F9]/80 relative z-10"
                    strokeWidth={1}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-12">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9]/80 mb-3">
              // support
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Contact Center FAQ
            </h2>
          </div>
          <div className="border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-[#0B1220] hover:bg-[#111B2D] transition"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-display font-semibold flex items-center gap-3">
                    <span className="text-xs font-mono text-[#0086F9]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.q}
                  </span>
                  <ChevronRight className="w-5 h-5 text-white/40 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-white/60 leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA - mission control */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="relative rounded-3xl border border-[#046BD2]/20 bg-gradient-to-br from-[#046BD2]/15 via-[#0B1220] to-[#2575FC]/10 p-12 md:p-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#046BD2]/10 blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0086F9] mb-4">
                  // deploy
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                  Ready to transform your contact center?
                </h2>
                <p className="mt-6 text-white/60 max-w-md">
                  Join thousands of teams using Rozper to deliver better
                  customer experiences. No hardware. No long contracts.
                </p>
              </div>
              <div className="flex flex-row flex-wrap gap-2 sm:gap-3 md:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded bg-[#046BD2] text-sm sm:text-base text-white font-semibold hover:bg-[#0086F9] transition whitespace-nowrap"
                >
                  Start a Free Trial{" "}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded border border-white/15 text-sm sm:text-base text-white font-medium hover:bg-white/5 transition whitespace-nowrap"
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
