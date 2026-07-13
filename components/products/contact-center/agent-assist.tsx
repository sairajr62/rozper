"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import {
  Brain,
  BookOpen,
  Zap,
  TrendingUp,
  Shield,
  FileText,
  ArrowRight,
  ChevronRight,
  Lightbulb,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Live Whisper Coaching",
    desc: "AI suggests the right answer mid-call — only the agent hears it.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base Surfacing",
    desc: "Relevant articles, scripts, and product info surfaced in real time as topics emerge.",
  },
  {
    icon: Zap,
    title: "Instant Answer Cards",
    desc: "Structured answer cards for common questions — agents click to read or paste.",
  },
  {
    icon: TrendingUp,
    title: "CSAT Prediction",
    desc: "AI predicts satisfaction scores live and alerts when a call needs supervisor attention.",
  },
  {
    icon: Shield,
    title: "Compliance Guardrails",
    desc: "Flags when required disclosures are missed or prohibited language is used.",
  },
  {
    icon: FileText,
    title: "Auto After-Call Work",
    desc: "Call disposition, CRM update, and follow-up draft generated automatically.",
  },
];

const faqs = [
  {
    q: "Can I upload our existing knowledge base?",
    a: "Yes. Import from Confluence, Zendesk, Google Drive, or upload directly — AI indexes it instantly.",
  },
  {
    q: "Do agents control when suggestions appear?",
    a: "Yes. Agents can dismiss, pin, or search suggestions manually — the panel doesn't take over their screen.",
  },
  {
    q: "Does it work for chat and SMS too?",
    a: "Yes. Agent Assist works across voice, live chat, SMS, and email — same panel, all channels.",
  },
];

const betterAgentsFaster = [
  "New agents reach proficiency 3x faster with live AI guidance.",
  "Reduces average handle time by eliminating hold-and-search moments.",
  "Training insights identify where coaching is needed — by agent, team, or topic.",
];

const knowledgeCards = [
  {
    trigger: "Pricing question detected",
    title: "Pricing Objection Playbook",
    content:
      'Lead with ROI: "Most customers save 40% versus running 3 separate tools." Offer 30-day trial to lower commitment.',
    type: "playbook",
  },
  {
    trigger: "Competitor mentioned: Twilio",
    title: "Competitor: Twilio",
    content:
      "Key differentiator: Rozper is fully managed, Twilio requires dev resources. We include AI coaching at no extra charge.",
    type: "competitor",
  },
];

function AgentAssistPanel() {
  const [active, setActive] = useState(0);

  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono text-white/60">
            Agent Assist · Marcus L.
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#046BD2]/15 border border-[#046BD2]/25">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9] animate-pulse" />
          <span className="text-[9px] font-mono text-[#0086F9]">Listening</span>
        </div>
      </div>

      {/* Detection alerts */}
      <div className="p-5 border-b border-white/5">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">
          Detected in call
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "Pricing question",
            "Competitor: Twilio",
            "High-value prospect",
          ].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="px-2.5 py-1 rounded-lg bg-[#046BD2]/15 border border-[#046BD2]/25 text-[10px] font-mono text-[#0086F9]"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Knowledge cards */}
      <div className="p-5">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">
          Suggested Resources
        </div>
        <div className="space-y-3">
          {knowledgeCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 + 0.2 }}
              onClick={() => setActive(i)}
              className={`rounded-2xl border p-4 cursor-pointer transition ${active === i ? "bg-[#046BD2]/8 border-[#046BD2]/40" : "bg-white/[0.02] border-white/8 hover:border-white/15"}`}
            >
              <div className="text-[9px] font-mono text-[#0086F9]/60 mb-1">
                {card.trigger}
              </div>
              <div className="text-xs font-semibold text-white mb-1">
                {card.title}
              </div>
              {active === i && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-white/60 leading-relaxed"
                >
                  {card.content}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CSAT prediction */}
      <div className="px-5 pb-5">
        <div className="p-3 rounded-xl bg-emerald-400/5 border border-emerald-400/15 flex items-center justify-between">
          <div>
            <div className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">
              Predicted CSAT
            </div>
            <div className="text-xs font-mono text-white/60 mt-0.5">
              Based on tone + resolution signal
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-emerald-400">
            86
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProdCCAgentAssistPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220] overflow-x-clip">
      <Navbar />

      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#046BD2]/8 blur-[140px] pointer-events-none" />

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
            <span className="text-[#0086F9]">agent-assist</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">
                Contact Center · Agent Assist
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-3xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              The right answer.
              <br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">
                Every time
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              AI that coaches on every call — whispering objection handlers,
              surfacing knowledge, and predicting CSAT before the call ends.
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
                Start a Free Trial{" "}
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
            <AgentAssistPanel />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Every agent. Coached. Every call.
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
              Better agents. Faster.
            </h2>
          </div>
          <div className="rounded-2xl bg-[#111B2D] border border-white/[0.07] p-6 sm:p-8">
            <ul className="space-y-4">
              {betterAgentsFaster.map((it) => (
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
          <div className="relative rounded-3xl overflow-hidden bg-[#0B1220] border border-white/10 p-6 sm:p-6 sm:p-12 md:p-20 text-center">
            {/* Faint background grid */}
            <div className="absolute inset-0 opacity-[0.18] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)" }} />
            <div className="relative">
              <Lightbulb className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white">
                Coach in the moment. Win every call.
              </h2>
              <div className="mt-10 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3">
                <Link
                  href="/free-trial/"
                  className="inline-flex items-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-[0_0_40px_-10px_rgba(245,158,11,0.7)] text-sm sm:text-base font-semibold transition whitespace-nowrap"
                >
                  Start a Free Trial <ArrowRight className="w-4 h-4" />
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
