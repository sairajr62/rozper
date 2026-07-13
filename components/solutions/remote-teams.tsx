"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { WorldMapSVG } from "@/components/landing/world-map-svg";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import {
  Globe,
  Smartphone,
  WifiOff,
  Shield,
  ClipboardCheck,
  ArrowRight,
  ChevronRight,
  MessageSquare,
  Video,
  BarChart3,
  Sun,
  Moon,
  Coffee,
  Sunrise,
} from "lucide-react";

const zones = [
  { city: "San Francisco", tz: "PST", offset: -8, icon: Coffee },
  { city: "New York", tz: "EST", offset: -5, icon: Sunrise },
  { city: "London", tz: "GMT", offset: 0, icon: Sun },
  { city: "Berlin", tz: "CET", offset: 1, icon: Sun },
  { city: "Bangalore", tz: "IST", offset: 5.5, icon: Sun },
  { city: "Tokyo", tz: "JST", offset: 9, icon: Moon },
  { city: "Sydney", tz: "AEST", offset: 10, icon: Moon },
  { city: "Auckland", tz: "NZST", offset: 12, icon: Moon },
];

const features = [
  {
    icon: Globe,
    title: "Local Numbers Worldwide",
    desc: "Local numbers in 150+ countries — your remote team looks local everywhere.",
  },
  {
    icon: Smartphone,
    title: "Any Device, Anywhere",
    desc: "Calls, video, chat, and SMS on desktop, browser, iOS, and Android.",
  },
  {
    icon: WifiOff,
    title: "Automatic Failover",
    desc: "If one connection drops, calls route to backup instantly.",
  },
  {
    icon: Shield,
    title: "SSO Access",
    desc: "Secure remote access with SSO — no VPN required.",
  },
  {
    icon: ClipboardCheck,
    title: "Remote Recording & AI",
    desc: "Call recording and AI summaries work the same remotely as in-office.",
  },
];

const detail = [
  {
    icon: MessageSquare,
    title: "Team Chat & Files",
    desc: "Team chat, file sharing, and video meetings built into one app.",
  },
  {
    icon: Video,
    title: "One-Click Calls",
    desc: "One-click call or video from chat — no separate meeting link needed.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboard",
    desc: "Agent status, call activity, and availability regardless of location.",
  },
];

const stats = [
  { v: "150+", k: "Countries Supported" },
  { v: "99.99%", k: "Uptime SLA" },
  { v: "12", k: "Time Zones Covered" },
  { v: "0", k: "VPNs Required" },
];

const faqs = [
  {
    q: "Does call quality suffer on home internet?",
    a: "Adaptive audio codecs and automatic quality management maintain quality on varied connections.",
  },
  {
    q: "Can remote agents use their mobile number?",
    a: "Agents use their Rozper number on mobile — personal numbers stay private.",
  },
  {
    q: "How do managers see remote agent availability?",
    a: "Real-time dashboard shows every agent's status regardless of location.",
  },
];

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(i);
  }, []);
  return now;
}

function fmtTime(utc: number, offset: number) {
  const totalMinutes = (utc + offset * 60 + 24 * 60) % (24 * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = Math.floor(totalMinutes % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function isWorking(utc: number, offset: number) {
  const totalMinutes = (utc + offset * 60 + 24 * 60) % (24 * 60);
  const h = totalMinutes / 60;
  return h >= 9 && h <= 17;
}

function WorldClock() {
  const now = useNow();
  const utc = now.getUTCHours() * 60 + now.getUTCMinutes();

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#046BD2]/15 to-[#0B1220] border border-[#046BD2]/20 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#0086F9]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">
            Distributed · Live
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
            <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-emerald-400">8 zones online</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {zones.map((z) => {
          const working = isWorking(utc, z.offset);
          const Icon = z.icon;
          return (
            <div
              key={z.city}
              className={`p-4 rounded-xl border ${working ? "bg-[#046BD2]/10 border-[#046BD2]/30" : "bg-white/[0.02] border-white/5"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/60">{z.city}</div>
                  <div className="font-display text-xl font-bold text-white tabular-nums">
                    {fmtTime(utc, z.offset)}
                  </div>
                  <div className="text-[10px] font-mono text-white/40 mt-1">
                    {z.tz}
                  </div>
                </div>
                <Icon
                  className={`w-5 h-5 ${working ? "text-amber-400" : "text-white/20"}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WorldMapSection() {
  const mapRef = useRef(null);
  const mapInView = useInView(mapRef, { once: true, margin: "-100px" });
  return (
    <section ref={mapRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={mapInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl bg-gradient-to-br from-[#046BD2]/10 to-[#0B1220] border border-[#046BD2]/20 overflow-hidden"
      >
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#2D98F1]/60 mb-2">
              // network.coverage
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Global reach, local presence.
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-emerald-400">150+ countries live</span>
          </div>
        </div>
        <div className="relative h-[320px] sm:h-[420px] w-full px-4 pb-4">
          <WorldMapSVG isInView={mapInView} />
        </div>
      </motion.div>
    </section>
  );
}

export function RemoteTeamsPageView() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Link href="/" className="hover:text-[#2D98F1]">
              /
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span>solutions</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0086F9]">remote-teams</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pb-16 flex flex-col lg:grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center min-h-[calc(100dvh-200px)] lg:min-h-0">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-8"
            >
              <Globe className="w-3.5 h-3.5 text-[#0086F9]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D98F1]">
                Solutions · Remote Teams
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="font-display text-4xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              Your team is{" "}
              <span className="bg-gradient-to-r from-[#2D98F1] via-[#0086F9] to-[#2575FC] bg-clip-text text-transparent">
                everywhere
              </span>
              .<br />
              Rozper too.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              Cloud calling, video, and chat for fully remote and hybrid teams —
              in 150+ countries. Same call quality, same numbers, anywhere on
              Earth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              className="mt-10 flex flex-row flex-nowrap gap-3"
            >
              <Link
                href="/contact/"
                className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#046BD2] text-white text-xs sm:text-base whitespace-nowrap font-semibold hover:bg-[#0086F9] transition"
              >
                Connect your team{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing/"
                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-7 sm:py-4 rounded-full border border-white/15 text-white text-xs sm:text-base whitespace-nowrap font-medium hover:bg-white/5 transition"
              >
                See pricing
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
              className="mt-12 flex flex-wrap items-center gap-3"
            >
              <span className="text-xs font-mono text-white/40">
                Works with:
              </span>
              {["Slack", "Microsoft Teams", "Google Workspace", "Zoom"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-white/70"
                  >
                    {tag}
                  </span>
                ),
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
            className="flex-1 lg:flex-none"
          >
            <WorldClock />
          </motion.div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#2D98F1]/60 mb-4">
                // platform.features
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                Full phone features from any location.
              </h2>
              <p className="mt-5 text-white/50 text-base leading-relaxed">
                Everything your office phone does — available on any device,
                anywhere on Earth.
              </p>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group flex items-start gap-5 py-7 first:pt-0 last:pb-0"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:border-[#046BD2]/50 group-hover:bg-[#046BD2]/20 transition mt-0.5">
                    <f.icon
                      className="w-4.5 h-4.5 text-[#0086F9]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1 min-w-0 sm:grid sm:grid-cols-[200px_1fr] sm:gap-8">
                    <h3 className="font-display font-semibold text-white group-hover:text-[#2D98F1] transition">
                      {f.title}
                    </h3>
                    <p className="mt-1 sm:mt-0 text-sm text-white/50 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-white/15 shrink-0 pt-1 hidden sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detail */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#046BD2]/10 via-[#2575FC]/5 to-[#046BD2]/10 border border-[#046BD2]/20 p-12 md:p-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 max-w-2xl">
              Collaboration that doesn't need an office.
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {detail.map((d, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/[0.05] backdrop-blur border border-white/10"
                >
                  <d.icon
                    className="w-7 h-7 text-[#0086F9] mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {d.title}
                  </h3>
                  <p className="text-sm text-white/60">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-br from-[#2D98F1] to-[#2575FC] bg-clip-text text-transparent">
                  {s.v}
                </div>
                <div className="text-xs text-white/50 mt-2 font-mono uppercase tracking-wider">
                  {s.k}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* World Map */}
        <WorldMapSection />

        {/* Testimonials — connection pulse cards, all equal */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="mb-16">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#2D98F1]/60 mb-3">
              // customer.connections[]
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Teams across the globe, one platform.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                region: "Global · 8 Countries",
                tz: "Multi-TZ",
                flags: "🇩🇪 🇯🇵 🇺🇸 🇬🇧 🇧🇷 🇦🇺 🇸🇬 🇨🇦",
                ping: "14ms",
                pulseColor: "bg-emerald-400",
                pulseTxt: "text-emerald-400",
                initials: "CM",
                name: "Chloe Martin",
                role: "COO · Forma Global Consulting",
                avatarBg: "bg-[#046BD2]/20 border-[#046BD2]/30 text-[#2D98F1]",
                quote:
                  '"We went fully remote across 8 countries. Rozper made it invisible — same call quality, same numbers, same platform as when we were in one office."',
              },
              {
                region: "London · Singapore",
                tz: "GMT / SGT",
                flags: "🇬🇧 🇸🇬",
                ping: "22ms",
                pulseColor: "bg-violet-400",
                pulseTxt: "text-violet-400",
                initials: "JR",
                name: "James Reeves",
                role: "IT Director · Alderton Partners",
                avatarBg:
                  "bg-violet-500/20 border-violet-500/30 text-violet-300",
                quote:
                  '"Our London and Singapore offices feel like one team. SSO and shared dashboards give managers full visibility — no VPN required."',
              },
              {
                region: "Australia · SE Asia",
                tz: "AEST / ICT",
                flags: "🇦🇺 🇮🇩 🇻🇳",
                ping: "31ms",
                pulseColor: "bg-amber-400",
                pulseTxt: "text-amber-400",
                initials: "AT",
                name: "Amara Tan",
                role: "Head of Ops · PacRim Digital",
                avatarBg: "bg-amber-500/20 border-amber-500/30 text-amber-300",
                quote:
                  '"We onboarded 40 remote agents across Australia and Southeast Asia in a weekend. No IT on-site, anywhere."',
              },
              {
                region: "Europe · Multi-DC",
                tz: "CET / GMT",
                flags: "🇸🇮 🇩🇪 🇫🇷",
                ping: "9ms",
                pulseColor: "bg-cyan-400",
                pulseTxt: "text-cyan-400",
                initials: "NK",
                name: "Nina Kovač",
                role: "VP Engineering · CloudBridge EU",
                avatarBg: "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
                quote:
                  '"Failover routing saved us during a regional outage. Customers never noticed — that\'s the reliability we need for global operations."',
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#046BD2]/35 transition overflow-hidden flex flex-col"
              >
                {/* Connection header */}
                <div className="px-4 py-2.5 bg-[#0B1220]/60 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`relative flex w-2 h-2 shrink-0`}>
                      <span
                        className={`absolute inset-0 rounded-full ${t.pulseColor} animate-ping opacity-60`}
                      />
                      <span
                        className={`relative w-2 h-2 rounded-full ${t.pulseColor}`}
                      />
                    </span>
                    <span className="font-mono text-[10px] text-white/50">
                      {t.region}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-white/30">
                      {t.tz}
                    </span>
                    <span className={`font-mono text-[9px] ${t.pulseTxt}`}>
                      ↓{t.ping}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Flags row */}
                  <div className="text-sm mb-4 tracking-wide text-white/50">
                    {t.flags}
                  </div>

                  <blockquote className="text-sm text-white/75 leading-relaxed flex-1 mb-5">
                    {t.quote}
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.06]">
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center font-display font-bold text-[11px] shrink-0 ${t.avatarBg}`}
                    >
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">
                        {t.name}
                      </div>
                      <div className="text-xs text-white/65 truncate">
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

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="relative rounded-3xl overflow-hidden bg-[#0B1220] border border-white/10 p-6 sm:p-6 sm:p-12 md:p-20 text-center">
            {/* Faint background grid */}
            <div className="absolute inset-0 opacity-[0.18] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)" }} />
            <div className="relative">
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold leading-tight">
                One platform.
                <br />
                Twelve time zones.
              </h2>
              <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
                <Link
                  href="/free-trial/"
                  className="inline-flex items-center gap-2 px-3 py-2.5 sm:px-7 sm:py-4 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-base whitespace-nowrap font-semibold shadow-[0_0_40px_-10px_rgba(13,148,136,0.7)] transition"
                >
                  Start a free trial <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing/"
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
