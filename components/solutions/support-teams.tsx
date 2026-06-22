"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import {
  Inbox,
  Lightbulb,
  LayoutDashboard,
  ClipboardCheck,
  Clock,
  BarChart3,
  Users,
  Headphones,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Zap,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Inbox,
    title: "Unified Inbox",
    desc: "Voice, SMS, WhatsApp, chat, Instagram, and Facebook — all in one queue, zero tab switching.",
  },
  {
    icon: Lightbulb,
    title: "AI Agent Assist",
    desc: "Surfaces the answer before the agent types the question. Faster resolution, every time.",
  },
  {
    icon: LayoutDashboard,
    title: "Screen-Pop History",
    desc: "Full customer history on screen — all channels, all tickets, all prior contacts.",
  },
  {
    icon: ClipboardCheck,
    title: "Automated Ticket Creation",
    desc: "CRM logging on every interaction — no manual data entry required.",
  },
  {
    icon: Clock,
    title: "SLA Timers",
    desc: "SLA timers and escalation triggers built into every queue.",
  },
];

const detail = [
  {
    icon: BarChart3,
    title: "Sentiment Scoring",
    desc: "QA every interaction without manually reviewing 2,000 calls.",
  },
  {
    icon: Users,
    title: "Agent Scorecards",
    desc: "Resolution rate, handle time, and CSAT updated daily.",
  },
  {
    icon: Headphones,
    title: "Supervisor Coaching",
    desc: "Whisper coaching and live monitoring on any active call.",
  },
];

const stats = [
  { v: "4.5 min", k: "AHT Reduction" },
  { v: "100%", k: "Interactions Scored" },
  { v: "10+", k: "Channels Unified" },
  { v: "99.9%", k: "SLA Compliance" },
];

const faqs = [
  {
    q: "Can Rozper integrate with our existing helpdesk?",
    a: "Yes. Zendesk, Freshdesk, ServiceNow, HubSpot Service Hub, and custom ticketing platforms.",
  },
  {
    q: "How does AI help support agents?",
    a: "Surfaces articles, suggests replies, detects sentiment, and writes post-call summaries automatically.",
  },
  {
    q: "Does Rozper support SLA management?",
    a: "Yes. SLA timers, escalation rules, and breach alerts built into every queue and channel.",
  },
];

const tickets = [
  {
    id: "TKT-4821",
    channel: "Voice",
    subject: "Billing discrepancy Q2 invoice",
    agent: "Layla H.",
    sla: "2m left",
    status: "urgent",
    sentiment: 88,
  },
  {
    id: "TKT-4820",
    channel: "Chat",
    subject: "API integration not returning 200",
    agent: "Priya N.",
    sla: "14m left",
    status: "open",
    sentiment: 62,
  },
  {
    id: "TKT-4819",
    channel: "SMS",
    subject: "Account locked after password reset",
    agent: "Jordan K.",
    sla: "31m left",
    status: "open",
    sentiment: 75,
  },
  {
    id: "TKT-4818",
    channel: "WhatsApp",
    subject: "Upgrade to enterprise tier",
    agent: "Sam T.",
    sla: "Resolved",
    status: "done",
    sentiment: 96,
  },
];

const channelColors: Record<string, string> = {
  Voice: "text-[#0086F9] bg-[#046BD2]/15",
  Chat: "text-emerald-400 bg-emerald-400/10",
  SMS: "text-violet-400 bg-violet-400/10",
  WhatsApp: "text-emerald-300 bg-emerald-300/10",
};

const statusStyles: Record<string, string> = {
  urgent: "text-red-400 bg-red-400/10 border border-red-400/20",
  open: "text-[#2D98F1] bg-[#046BD2]/10 border border-[#046BD2]/20",
  done: "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20",
};

function TicketQueue() {
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 overflow-hidden">
      {/* Terminal header */}
      <div className="px-5 py-3 bg-[#0B1220] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-xs font-mono text-white/40 ml-2">
            support · live queue
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400">
            4 active
          </span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-3 px-5 py-2 border-b border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/30">
        <span>Ticket</span>
        <span>Agent</span>
        <span>Channel</span>
        <span>SLA</span>
        <span>Score</span>
      </div>

      {/* Ticket rows */}
      {tickets.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-3 px-5 py-3.5 border-b border-white/5 items-center hover:bg-white/[0.02] transition"
        >
          <div>
            <div className="text-[10px] font-mono text-white/30 mb-0.5">
              {t.id}
            </div>
            <div className="text-sm text-white/80 leading-tight truncate">
              {t.subject}
            </div>
          </div>
          <span className="text-sm text-white/60">{t.agent}</span>
          <span
            className={`inline-flex px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wide w-fit ${channelColors[t.channel]}`}
          >
            {t.channel}
          </span>
          <span
            className={`inline-flex px-2 py-1 rounded-md text-[10px] font-mono w-fit ${statusStyles[t.status]}`}
          >
            {t.sla}
          </span>
          {/* Sentiment bar */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#046BD2] to-[#0086F9]"
                initial={{ width: 0 }}
                animate={{ width: `${t.sentiment}%` }}
                transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
              />
            </div>
            <span className="text-[10px] font-mono text-[#0086F9]">
              {t.sentiment}
            </span>
          </div>
        </motion.div>
      ))}

      {/* AI Assist bar */}
      <div className="px-5 py-4 bg-[#046BD2]/10 border-t border-[#046BD2]/20 flex items-center gap-3">
        <Lightbulb className="w-4 h-4 text-[#0086F9] flex-shrink-0" />
        <div className="text-xs text-[#2D98F1] font-mono">
          AI Agent Assist · Suggested reply ready for TKT-4820
        </div>
        <div className="ml-auto flex items-center gap-1 px-3 py-1 rounded-full bg-[#046BD2]/20 text-[10px] font-mono text-[#0086F9] cursor-pointer hover:bg-[#046BD2]/30 transition">
          Apply <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}

function SLAPanel() {
  const slaItems = [
    {
      label: "P1 · Critical",
      pct: 100,
      color: "from-red-500 to-red-400",
      count: "0 breached",
    },
    {
      label: "P2 · High",
      pct: 98,
      color: "from-[#046BD2] to-[#0086F9]",
      count: "1 at risk",
    },
    {
      label: "P3 · Medium",
      pct: 100,
      color: "from-[#0086F9] to-[#2D98F1]",
      count: "0 breached",
    },
    {
      label: "P4 · Low",
      pct: 99,
      color: "from-[#2D98F1] to-white/50",
      count: "0 breached",
    },
  ];
  return (
    <div className="rounded-3xl bg-[#111B2D] border border-white/10 p-5">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-4 h-4 text-[#0086F9]" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">
          SLA Compliance · Today
        </span>
      </div>
      <div className="space-y-3">
        {slaItems.map((s, i) => (
          <div key={s.label}>
            <div className="flex justify-between text-[11px] font-mono text-white/40 mb-1.5">
              <span>{s.label}</span>
              <span className="text-white/60">{s.count}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${s.pct}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">Overall</span>
        <span className="font-display text-2xl font-bold text-[#0086F9]">
          99.9%
        </span>
      </div>
    </div>
  );
}

export function SupportTeamsPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#0086F9]">
              /
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/solutions" className="hover:text-[#0086F9]">
              solutions
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">support-teams</span>
          </div>
        </div>

        {/* Hero — split layout with live ticket queue */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">
                Solutions · Support Teams
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              One inbox.
              <br />
              <span className="bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#2D98F1] bg-clip-text text-transparent">
                Every channel.
              </span>
              <br />
              Zero misses.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              Omnichannel inbox, AI agent assist, and SLA tools — built for
              support teams handling 10+ channels simultaneously. Rozper unifies
              everything so your team can focus on resolution, not navigation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              className="mt-10 flex flex-row flex-wrap gap-3"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-xs sm:text-base whitespace-nowrap font-semibold transition"
              >
                Book a demo{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full border border-white/15 text-white text-xs sm:text-base whitespace-nowrap font-medium hover:bg-white/5 transition"
              >
                See pricing
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
              className="mt-10 flex items-center gap-3 flex-wrap"
            >
              <span className="text-xs font-mono text-white/40">
                Integrates with:
              </span>
              {["Zendesk", "Freshdesk", "ServiceNow", "HubSpot"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-white/70"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Live queue panels */}
          <div className="hidden sm:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="space-y-4"
            >
              <TicketQueue />
              <SLAPanel />
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Support tools that cut handle time.
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">
              Every tool your agents need — surfaced at exactly the right
              moment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-start gap-4 group ${i === 4 ? "md:col-span-2 max-w-md" : ""}`}
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 group-hover:border-[#046BD2]/40 transition-all mt-0.5">
                  <f.icon
                    className="w-4.5 h-4.5 text-[#0086F9]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white mb-1">
                    {f.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quality visibility */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#046BD2]/12 via-[#111B2D] to-[#0B1220] border border-[#046BD2]/20 p-10 md:p-14">
            <div className="flex items-start gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-[#0086F9]" />
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Quality visibility across the team.
                </h2>
                <p className="text-white/50 mt-2">
                  Automated QA so supervisors can coach, not count.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {detail.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#046BD2]/30 transition"
                >
                  <d.icon
                    className="w-7 h-7 text-[#0086F9] mb-3"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-display font-semibold mb-1.5">
                    {d.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {d.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl bg-[#111B2D] border border-white/10 text-center"
              >
                <div className="font-display text-3xl font-bold bg-gradient-to-br from-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                  {s.v}
                </div>
                <div className="text-xs text-white/50 mt-2 font-mono uppercase tracking-wider">
                  {s.k}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials — live ticket cards, all equal */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-[#2D98F1] mb-3">
              Support Leaders
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              What happens when teams switch.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                ticketId: "TKT-0041",
                priority: "P1",
                priorityCls: "text-red-400 bg-red-400/10 border-red-400/20",
                sla: "4.5 min AHT",
                channel: "Voice",
                channelCls: "text-[#0086F9] bg-[#046BD2]/15",
                initials: "LH",
                name: "Layla Hassan",
                role: "Support Ops Lead · TechBridge",
                avatarCls: "bg-[#046BD2]/20 border-[#046BD2]/30 text-[#2D98F1]",
                quote:
                  "AI Agent Assist gives every rep the right answer before they have to search for it. AHT dropped 4.5 minutes across the team.",
              },
              {
                ticketId: "TKT-0092",
                priority: "P2",
                priorityCls:
                  "text-violet-400 bg-violet-400/10 border-violet-400/20",
                sla: "5→1 tabs",
                channel: "Chat",
                channelCls: "text-violet-400 bg-violet-400/10",
                initials: "OB",
                name: "Omar Bakr",
                role: "Support Director · Hive",
                avatarCls: "bg-amber-500/20 border-amber-500/30 text-amber-300",
                quote:
                  "SLA compliance went from 91% to 99.7% in 30 days. Built-in escalation rules did 80% of the work automatically.",
              },
              {
                ticketId: "TKT-0153",
                priority: "P3",
                priorityCls:
                  "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
                sla: "100% QA",
                channel: "Omni",
                channelCls: "text-emerald-400 bg-emerald-400/10",
                initials: "TN",
                name: "Tariq Nasser",
                role: "QA Lead · ClearPath",
                avatarCls: "bg-[#046BD2]/20 border-[#046BD2]/30 text-[#5BB8FF]",
                quote:
                  "We used to QA 5% of interactions manually. Now every single interaction is auto-scored by AI. We coach instead of audit.",
              },
              {
                ticketId: "TKT-0204",
                priority: "P2",
                priorityCls:
                  "text-amber-400 bg-amber-400/10 border-amber-400/20",
                sla: "2 clicks live",
                channel: "WhatsApp",
                channelCls: "text-emerald-300 bg-emerald-300/10",
                initials: "MC",
                name: "Maria Castillo",
                role: "Digital CX · SolTech Latam",
                avatarCls:
                  "bg-emerald-500/20 border-emerald-500/30 text-emerald-300",
                quote:
                  "Adding WhatsApp as a support channel took two clicks. We were handling tickets within an hour of connecting it.",
              },
              {
                ticketId: "TKT-0271",
                priority: "P3",
                priorityCls:
                  "text-[#0086F9] bg-[#046BD2]/10 border-[#046BD2]/20",
                sla: "5→1 tabs",
                channel: "Chat",
                channelCls: "text-[#2D98F1] bg-[#046BD2]/15",
                initials: "PK",
                name: "Priya Kumar",
                role: "CS Manager · FlowDesk",
                avatarCls:
                  "bg-violet-500/20 border-violet-500/30 text-violet-300",
                quote:
                  "Unified inbox was the game changer. Five browser tabs collapsed into one screen — zero context switching, full customer history on every call.",
              },
            ].map((t, i) => (
              <motion.div
                key={t.initials}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col rounded-2xl bg-[#111B2D] border border-white/10 hover:border-[#046BD2]/40 transition overflow-hidden"
              >
                {/* Ticket header */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07] bg-[#0B1220]/70">
                  <span className="font-mono text-[10px] text-white/30">
                    {t.ticketId}
                  </span>
                  <span
                    className={`ml-auto inline-flex items-center px-2 py-0.5 rounded text-[9px] font-mono border ${t.priorityCls}`}
                  >
                    {t.priority}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-mono ${t.channelCls}`}
                  >
                    {t.channel}
                  </span>
                  <span className="font-mono text-[9px] text-white/30 border border-white/10 px-1.5 py-0.5 rounded">
                    {t.sla}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <blockquote className="text-[13px] text-white/78 leading-relaxed flex-1 mb-5">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.06] mt-auto">
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center font-display font-bold text-[10px] shrink-0 ${t.avatarCls}`}
                    >
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[12px] text-white truncate">
                        {t.name}
                      </div>
                      <div className="text-[10px] font-mono text-white/40 truncate">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="font-display text-4xl font-bold mb-8 text-center">
            FAQ
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-[#111B2D] border border-white/10 p-6 hover:bg-[#1A2638] transition"
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

        {/* CTA */}
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
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold leading-tight text-white">
                Handle more. Stress less.
              </h2>
              <p className="mt-6 text-white/80 max-w-md mx-auto">
                14-day free trial. No credit card required. Cancel anytime.
              </p>
              <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] hover:bg-[#0078E0] text-white text-xs sm:text-base whitespace-nowrap font-semibold shadow-[0_0_40px_-10px_rgba(4,107,210,0.7)] transition"
                >
                  Book a demo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-white text-xs sm:text-base whitespace-nowrap font-semibold transition"
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
