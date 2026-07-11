"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import {
  Eye,
  Mic,
  Radio,
  AlertTriangle,
  BarChart3,
  Shield,
  ArrowRight,
  ChevronRight,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Silent Monitor",
    desc: "Listen to any active call without the agent or customer knowing.",
  },
  {
    icon: Mic,
    title: "Whisper Coaching",
    desc: "Coach agents mid-call — they hear you, the customer doesn't.",
  },
  {
    icon: Radio,
    title: "Barge-In",
    desc: "Join any call as a participant the moment a situation escalates.",
  },
  {
    icon: AlertTriangle,
    title: "AI Escalation Alerts",
    desc: "Instant alert when sentiment, keywords, or duration cross your threshold.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboards",
    desc: "Live queue metrics, agent status, and CSAT predictions on one screen.",
  },
  {
    icon: Shield,
    title: "Compliance Flags",
    desc: "Automatic alerts for prohibited language, missing disclosures, or policy violations.",
  },
];

const faqs = [
  {
    q: "Do agents know when they're being monitored?",
    a: "In silent mode, no. In whisper mode, the agent hears you but the customer doesn't. Barge-in is fully audible.",
  },
  {
    q: "Can I set team-specific alert thresholds?",
    a: "Yes. Configure sentiment, keyword, duration, and hold time alerts per queue or individual agent.",
  },
  {
    q: "How many agents can a supervisor monitor?",
    a: "All active agents are visible on the live dashboard simultaneously. Listen to one call at a time.",
  },
];

const aiSurfacesProblems = [
  "Sentiment alerts trigger when a call goes negative — supervisor is notified instantly.",
  "Compliance flags raised when keywords or prohibited phrases are detected.",
  "Live SLA board shows queue wait times and agents at risk of missing targets.",
];

const agents = [
  {
    name: "Priya N.",
    queue: "Sales",
    status: "On Call",
    duration: "5:14",
    sentiment: 91,
  },
  {
    name: "Marcus L.",
    queue: "Support",
    status: "On Call",
    duration: "14:22",
    sentiment: 38,
    alert: true,
  },
  {
    name: "Layla H.",
    queue: "Sales",
    status: "Available",
    duration: "—",
    sentiment: null,
  },
  {
    name: "Jordan K.",
    queue: "Billing",
    status: "On Call",
    duration: "3:07",
    sentiment: 76,
  },
  {
    name: "Sam T.",
    queue: "Support",
    status: "Wrap-Up",
    duration: "1:02",
    sentiment: null,
  },
  {
    name: "Diego F.",
    queue: "Enterprise",
    status: "On Call",
    duration: "6:48",
    sentiment: 88,
  },
];

const statusStyle: Record<string, string> = {
  "On Call": "text-[#0086F9] bg-[#046BD2]/15 border-[#046BD2]/25",
  Available: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Wrap-Up": "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

function CCLiveMonitor() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">
            Live Monitor · 6 agents
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <span className="text-[#0086F9]">4 on call</span>
          <span className="text-emerald-400">1 avail</span>
          <span className="text-amber-400">1 wrap</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
        {agents.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.07 }}
            className={`p-4 bg-[#0B1220] hover:bg-[#111B2D] transition relative ${a.alert ? "ring-1 ring-inset ring-red-400/30" : ""}`}
          >
            {a.alert && (
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-red-400" />
                <span className="text-[9px] font-mono text-red-400">Alert</span>
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center text-[10px] font-bold text-[#2D98F1]">
                {a.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="text-xs font-medium text-white">{a.name}</div>
                <div className="text-[10px] font-mono text-white/30">
                  {a.queue}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`px-1.5 py-0.5 rounded border text-[9px] font-mono ${statusStyle[a.status]}`}
              >
                {a.status}
              </span>
              {a.duration !== "—" && (
                <span className="text-[10px] font-mono text-white/40">
                  {a.duration}
                </span>
              )}
            </div>
            {a.sentiment !== null && (
              <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${a.sentiment > 70 ? "bg-emerald-400" : a.sentiment > 50 ? "bg-[#0086F9]" : "bg-red-400"}`}
                  animate={{ width: `${a.sentiment + (tick % 3)}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="px-5 py-3 bg-red-400/5 border-t border-red-400/10 flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
        <span className="text-[10px] font-mono text-red-400">
          Marcus L. — sentiment dropping · 14min call · click to listen
        </span>
      </div>
    </div>
  );
}

export function ProdCCSupervisorToolsPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-x-clip">
      <Navbar />

      <div
        className="fixed inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,134,249,1) 0px, transparent 1px, transparent 4px)",
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
              href="/products/contact-center/"
              className="hover:text-[#0086F9]"
            >
              contact-center
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">supervisor-tools</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8"
            >
              <Eye className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">
                Contact Center · Supervisor Tools
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-3xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              See every call.
              <br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">
                Fix it live
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              Barge, whisper, and monitor live — with AI alerts the moment a
              call needs attention. Supervisors stay in control without
              interrupting every interaction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              className="mt-10 flex flex-row flex-nowrap gap-2 sm:gap-3"
            >
              <Link
                href="/free-trial/"
                className="group inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-sm sm:text-base text-white font-semibold transition whitespace-nowrap"
              >
                Start a free trial{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing/"
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
            <CCLiveMonitor />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Total visibility. Real-time control.
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
                <p className="text-sm text-white/65 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              AI surfaces problems before they escalate.
            </h2>
          </div>
          <div className="rounded-2xl bg-[#111B2D] border border-white/[0.07] p-6 sm:p-8">
            <ul className="space-y-4">
              {aiSurfacesProblems.map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 rounded border border-[#046BD2]/40 bg-[#046BD2]/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9]" />
                  </div>
                  <span className="text-sm text-white/80 leading-relaxed">{it}</span>
                </li>
              ))}
            </ul>
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
          <div className="relative rounded-3xl overflow-hidden bg-[#070B14] border border-white/10 p-6 sm:p-6 sm:p-12 md:p-20 text-center">
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
              <Eye className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">
                Monitor. Coach. Win.
              </h2>
              <div className="mt-10 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3">
                <Link
                  href="/free-trial/"
                  className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] text-sm sm:text-base font-semibold transition whitespace-nowrap"
                >
                  Start a free trial <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing/"
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
