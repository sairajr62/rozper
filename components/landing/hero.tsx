"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Phone,
  Video,
  MessageSquare,
  Bot,
  Headphones as HeadsetIcon,
  Smile,
  Paperclip,
  Send,
  Mic,
  Users,
  PhoneOff,
  ScreenShare,
  Volume2,
  Grid3x3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ──────────────────────────────────────────────────────────────────────
// App nav — Chat is the active context (the screen always shows the chat),
// the rest are the UCaaS features shown alongside it
// ──────────────────────────────────────────────────────────────────────
const NAV: { icon: LucideIcon; name: string }[] = [
  { icon: Phone, name: "Voice" },
  { icon: Video, name: "Video" },
  { icon: MessageSquare, name: "Chat" },
  { icon: Bot, name: "AI Agents" },
  { icon: HeadsetIcon, name: "Contact Center" },
];

// AI conversation that streams on the tablet chat screen
const CHAT: { from: "user" | "ai"; text: string }[] = [
  { from: "user", text: "Route all UK calls to the support queue." },
  { from: "ai", text: "Done — UK calls now ring support. Add an after-hours rule?" },
  { from: "user", text: "Yes, and an SMS fallback after 30 seconds." },
  { from: "ai", text: "All set. After 30s, callers get an SMS option." },
];

// participants on the laptop video-meeting screen
const PARTICIPANTS = [
  { initials: "SR", name: "Sofia Rossi", accent: "from-[#F9A8C4] to-[#C084FC]" },
  { initials: "MR", name: "Maya Rivera", accent: "from-[#046BD2] to-[#22D3EE]" },
  { initials: "TB", name: "Tom Becker", accent: "from-[#0086F9] to-[#2575FC]" },
  { initials: "DC", name: "Daniela Cruz", accent: "from-[#22D3EE] to-[#046BD2]" },
]

// live AI transcription on the mobile call screen
const TRANSCRIPT: { from: "Caller" | "You"; text: string }[] = [
  {
    from: "Caller",
    text: "Hi, I'd like to update the billing address on my account.",
  },
  {
    from: "You",
    text: "Sure — I've pulled up your account and verified you.",
  },
  {
    from: "Caller",
    text: "Great. The new address is 14 Harbour Lane, Bristol.",
  },
  { from: "You", text: "Updated, and I've sent a confirmation by SMS." },
]

// laptop → tablet → mobile frame geometry
const FRAMES = [
  { id: "laptop", w: 432, h: 268, pad: 8, radius: 14 },
  { id: "tablet", w: 304, h: 394, pad: 7, radius: 20 },
  { id: "mobile", w: 214, h: 438, pad: 7, radius: 34 },
];

// Rozper logo mark — recreated as an SVG in the brand's own colors
function RozperLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 38"
      className={className}
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* signature ascending bars */}
      <rect x="2.5" y="26" width="6" height="9" rx="0.5" fill="#12A150" />
      <rect x="10.5" y="21" width="6" height="14" rx="0.5" fill="#EF4136" />
      <rect x="18.5" y="13" width="6" height="22" rx="0.5" fill="#FBBC05" />
      {/* blue R */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 3H38C43 3 46 6.5 46 12C46 17.5 43 21 37 21L46 35H38L30 22V35H24ZM30 9V16H37C39 16 40 14 40 12C40 10 39 9 36 9H30Z"
        fill="#0086F9"
      />
    </svg>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1 w-1 rounded-full bg-[#22D3EE]"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -1.5, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.16,
          }}
        />
      ))}
    </span>
  );
}

// small circular control button (video + call screens)
function CtrlBtn({ icon: Icon, danger }: { icon: LucideIcon; danger?: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 items-center justify-center rounded-full ${
        danger ? "bg-[#EF4136]" : "bg-white/[0.08]"
      }`}
    >
      <Icon className="h-3 w-3 text-white" strokeWidth={2} />
    </span>
  );
}

// tiny voice waveform
function MiniWave({ bars = 6 }: { bars?: number }) {
  return (
    <div className="flex h-2.5 items-center gap-[1.5px]">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-[#22D3EE]"
          animate={{ height: ["30%", `${45 + (i % 4) * 16}%`, "35%"] }}
          transition={{
            duration: 0.7 + (i % 3) * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.06,
          }}
        />
      ))}
    </div>
  );
}

// ── Laptop: video meeting screen ───────────────────────────────────────
function VideoScreen({ speaker, time }: { speaker: number; time: string }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#0B1220]">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-white/[0.06] px-2.5 py-1.5">
        <RozperLogo className="h-3 w-auto shrink-0" />
        <span className="font-display text-[8px] font-semibold text-white">
          Rozper Meet
        </span>
        <span className="font-mono text-[6px] uppercase tracking-[0.12em] text-white/35">
          Q1 Sync
        </span>
        <span className="ml-auto flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#EF4136]" />
          <span className="font-mono text-[7px] tabular-nums text-white/55">
            {time}
          </span>
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-1.5 p-2">
        {PARTICIPANTS.map((p, i) => {
          const speaking = i === speaker;
          return (
            <div
              key={p.name}
              className={`relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-white/[0.07] to-white/[0.02] transition-shadow duration-300 ${
                speaking
                  ? "ring-1 ring-[#22D3EE] shadow-[0_0_18px_-4px_rgba(34,211,238,0.7)]"
                  : "ring-1 ring-white/[0.06]"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${p.accent} text-[10px] font-bold text-white`}
              >
                {p.initials}
              </span>
              <span className="absolute bottom-1 left-1 flex items-center gap-1 rounded bg-black/45 px-1 py-[1px]">
                <Mic className="h-2 w-2 text-white/70" strokeWidth={2.5} />
                <span className="text-[6px] font-medium text-white/85">
                  {p.name}
                </span>
              </span>
              {speaking && (
                <span className="absolute bottom-1 right-1">
                  <MiniWave bars={5} />
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center justify-center gap-1.5 border-t border-white/[0.06] py-2">
        <CtrlBtn icon={Mic} />
        <CtrlBtn icon={Video} />
        <CtrlBtn icon={ScreenShare} />
        <CtrlBtn icon={Users} />
        <CtrlBtn icon={PhoneOff} danger />
      </div>
    </div>
  );
}

// ── Tablet: AI chat screen ─────────────────────────────────────────────
function ChatScreen({
  visible,
  showTyping,
}: {
  visible: typeof CHAT;
  showTyping: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-black/[0.07] bg-white px-2 py-1.5">
        <RozperLogo className="h-3.5 w-auto shrink-0" />
        <span className="truncate font-display text-[9px] font-semibold text-[#0B1220]">
          Hi, Sofia Rossi
        </span>
        <span className="font-mono text-[6px] uppercase tracking-[0.12em] text-black/35">
          Agent
        </span>
        <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#F9A8C4] to-[#C084FC] text-[6px] font-bold text-white">
          SR
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* icon rail */}
        <div className="flex w-[34px] shrink-0 flex-col items-center gap-1.5 border-r border-black/[0.07] bg-[#F6F8FC] py-2">
          {NAV.map((f, i) => {
            const Ic = f.icon;
            const on = i === 2;
            return (
              <div key={f.name} className="relative flex w-full justify-center">
                {on && (
                  <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r bg-[#046BD2]" />
                )}
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-lg ${
                    on
                      ? "bg-gradient-to-br from-[#046BD2] to-[#22D3EE] shadow-[0_4px_12px_-3px_rgba(4,107,210,0.8)]"
                      : ""
                  }`}
                >
                  <Ic
                    className={`h-3 w-3 ${on ? "text-white" : "text-black/35"}`}
                    strokeWidth={2}
                  />
                </span>
              </div>
            );
          })}
        </div>

        {/* conversation */}
        <div className="flex min-w-0 flex-1 flex-col bg-white">
          <div className="flex shrink-0 items-center gap-1.5 border-b border-black/[0.07] px-2 py-1.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#046BD2] to-[#22D3EE]">
              <Bot className="h-3 w-3 text-white" strokeWidth={2.2} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[8px] font-semibold text-[#0B1220]">
                Rozper AI
              </p>
              <p className="flex items-center gap-1 text-[6px] text-emerald-500">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                Online
              </p>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 bg-[#F6F8FC] p-2">
            <div className="mb-0.5 flex justify-center">
              <span className="rounded-full bg-black/[0.06] px-1.5 py-[2px] text-[6px] font-medium text-black/45">
                Today
              </span>
            </div>
            <AnimatePresence mode="popLayout">
              {visible.map((m, i) => (
                <motion.div
                  key={`${i}-${m.text}`}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-end gap-1 ${
                    m.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.from === "ai" && (
                    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#046BD2] to-[#22D3EE]">
                      <Bot className="h-2 w-2 text-white" strokeWidth={2.4} />
                    </span>
                  )}
                  <span
                    className={`max-w-[80%] rounded-lg px-2 py-1 text-[8px] leading-snug ${
                      m.from === "user"
                        ? "rounded-br-sm bg-[#046BD2] text-white"
                        : "rounded-bl-sm border border-black/[0.06] bg-white text-[#0B1220]"
                    }`}
                  >
                    {m.text}
                  </span>
                </motion.div>
              ))}
              {showTyping && (
                <motion.div
                  key="typing"
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-end gap-1"
                >
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#046BD2] to-[#22D3EE]">
                    <Bot className="h-2 w-2 text-white" strokeWidth={2.4} />
                  </span>
                  <span className="rounded-lg rounded-bl-sm border border-black/[0.06] bg-white px-2 py-1.5">
                    <TypingDots />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 border-t border-black/[0.07] bg-white px-2 py-1.5">
            <Smile className="h-3 w-3 shrink-0 text-black/30" strokeWidth={2} />
            <Paperclip
              className="h-3 w-3 shrink-0 text-black/30"
              strokeWidth={2}
            />
            <span className="min-w-0 flex-1 truncate rounded-full border border-black/[0.1] px-2 py-1 text-[7px] text-black/30">
              Write a message…
            </span>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0B1220]">
              <Send className="h-2.5 w-2.5 text-white" strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mobile: call screen with live AI transcription ────────────────────
function CallScreen({
  lines,
  time,
}: {
  lines: typeof TRANSCRIPT;
  time: string;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-[#0B1220] to-[#070B14]">
      <div className="flex shrink-0 items-center gap-1.5 px-2.5 pb-1.5 pt-2.5">
        <RozperLogo className="h-3 w-auto shrink-0" />
        <span className="font-display text-[8px] font-semibold text-white">
          Rozper Phone
        </span>
        <span className="ml-auto flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[6px] uppercase tracking-wider text-white/45">
            On call
          </span>
        </span>
      </div>

      <div className="flex shrink-0 flex-col items-center pb-2 pt-1.5">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#22D3EE] to-[#046BD2] text-base font-bold text-white shadow-[0_8px_24px_-6px_rgba(34,211,238,0.7)]">
          DC
        </span>
        <p className="mt-2 font-display text-[12px] font-semibold text-white">
          Daniela Cruz
        </p>
        <p className="font-mono text-[7px] text-white/40">+44 20 7946 0921</p>
        <p className="mt-1 font-mono text-[11px] tabular-nums text-[#22D3EE]">
          {time}
        </p>
      </div>

      {/* live AI transcription */}
      <div className="mx-2 flex min-h-0 flex-1 flex-col rounded-xl border border-white/10 bg-white/[0.04] p-2">
        <div className="mb-1.5 flex shrink-0 items-center gap-1">
          <Sparkles className="h-2.5 w-2.5 text-[#22D3EE]" />
          <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/55">
            AI Transcription
          </span>
          <span className="ml-auto h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {lines.map((l, i) => (
              <motion.div
                key={`${i}-${l.text}`}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className={`font-mono text-[6px] uppercase tracking-wider ${
                    l.from === "You" ? "text-[#22D3EE]" : "text-white/40"
                  }`}
                >
                  {l.from}
                </span>
                <p className="text-[8px] leading-snug text-white/85">
                  {l.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-2 py-3">
        <CtrlBtn icon={Mic} />
        <CtrlBtn icon={Grid3x3} />
        <CtrlBtn icon={Volume2} />
        <CtrlBtn icon={PhoneOff} danger />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Device showcase — frame morphs laptop ↔ tablet ↔ mobile, each device
// showing its own screen (video meeting / AI chat / call transcription)
// ──────────────────────────────────────────────────────────────────────
function DeviceShowcase() {
  const [device, setDevice] = useState(0);
  const [step, setStep] = useState(1);
  const [tStep, setTStep] = useState(1);
  const [speaker, setSpeaker] = useState(0);
  const [seconds, setSeconds] = useState(134);

  useEffect(() => {
    const id = setInterval(
      () => setDevice((d) => (d + 1) % FRAMES.length),
      4800,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setStep((s) => (s >= CHAT.length ? 0 : s + 1)),
      1700,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setTStep((s) => (s >= TRANSCRIPT.length ? 0 : s + 1)),
      1900,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setSpeaker((s) => (s + 1) % PARTICIPANTS.length),
      2100,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const frame = FRAMES[device];
  const isLaptop = frame.id === "laptop";
  const isTablet = frame.id === "tablet";
  const isMobile = frame.id === "mobile";

  const visible = CHAT.slice(0, step);
  const showTyping = step < CHAT.length && CHAT[step].from === "ai";
  const lines = TRANSCRIPT.slice(0, tStep);
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60,
  ).padStart(2, "0")}`;

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      {/* glow */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[90%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(4,107,210,0.45) 0%, rgba(34,211,238,0.14) 45%, rgba(4,107,210,0) 75%)",
          filter: "blur(55px)",
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* fixed stage so surrounding layout stays put while the device morphs.
          The device frames use fixed px sizes (laptop base ≈ 470px), so on
          phones we scale the whole stage down to fit. The scale lives on a
          plain wrapper div — NOT the motion.div — so it doesn't get clobbered
          by framer-motion's inline transform. */}
      <div className="relative h-[340px] sm:h-[470px] lg:h-[500px]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.6] sm:scale-90 md:scale-100">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex flex-col items-center"
        >
          {/* device frame */}
          <motion.div
            animate={{
              width: frame.w,
              height: frame.h,
              borderRadius: frame.radius,
              padding: frame.pad,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative border border-white/12 bg-[#0B1220] shadow-[0_40px_90px_-25px_rgba(4,107,210,0.85)]"
          >
            {/* camera dot (laptop / tablet) */}
            <motion.span
              aria-hidden
              className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rounded-full bg-white/25"
              animate={{ opacity: isMobile ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* inner screen */}
            <motion.div
              animate={{ borderRadius: Math.max(6, frame.radius - 6) }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full w-full flex-col overflow-hidden bg-white"
            >
              {/* notch (mobile) */}
              <motion.span
                aria-hidden
                className="absolute left-1/2 top-1 z-30 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/70"
                animate={{ opacity: isMobile ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* === Screen content — each device shows its own screen === */}
              <AnimatePresence>
                <motion.div
                  key={frame.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  {isLaptop && <VideoScreen speaker={speaker} time={time} />}
                  {isTablet && (
                    <ChatScreen visible={visible} showTyping={showTyping} />
                  )}
                  {isMobile && <CallScreen lines={lines} time={time} />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* laptop hinge + base */}
          <AnimatePresence>
            {isLaptop && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0.1 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top" }}
                className="flex flex-col items-center"
              >
                <div className="h-1 w-[410px] rounded-b-[3px] bg-gradient-to-b from-[#1A2638] to-[#0B1220]" />
                <div
                  className="relative h-3 w-[470px]"
                  style={{
                    clipPath: "polygon(2.5% 0%, 97.5% 0%, 100% 100%, 0% 100%)",
                    background: "linear-gradient(to bottom, #232F44, #0B1220)",
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-white/15" />
                  <div className="absolute left-1/2 top-0 h-[3px] w-12 -translate-x-1/2 rounded-b-md bg-[#070B14]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Floating background particles
// ──────────────────────────────────────────────────────────────────────
function Particles() {
  const dots = [
    { x: 8, y: 18, d: 6 },
    { x: 14, y: 72, d: 5 },
    { x: 26, y: 32, d: 7 },
    { x: 38, y: 86, d: 5 },
    { x: 58, y: 14, d: 6 },
    { x: 72, y: 64, d: 7 },
    { x: 84, y: 26, d: 5 },
    { x: 92, y: 78, d: 6 },
    { x: 46, y: 8, d: 6 },
    { x: 22, y: 92, d: 7 },
  ];
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {dots.map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#22D3EE]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, filter: "blur(0.5px)" }}
          animate={{ opacity: [0.15, 0.7, 0.15], y: [0, -8, 0] }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// HERO — 2-side layout
// ──────────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden lg:h-[100svh] lg:min-h-0"
      style={{ contain: "paint" }}
    >
      {/* ─────────── Scoped background ─────────── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#070B14]" />

        <div
          className="absolute inset-0 opacity-[0.30]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(140,180,230,0.16) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 80% 65% at 50% 50%, black 40%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 65% at 50% 50%, black 40%, transparent 85%)",
          }}
        />

        <motion.div
          aria-hidden
          className="absolute -left-[10%] top-[10%] h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(4,107,210,0.45) 0%, rgba(4,107,210,0) 65%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.95, 0.6] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-[8%] bottom-[8%] h-[560px] w-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.32) 0%, rgba(34,211,238,0) 65%)",
            filter: "blur(90px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[1500px] w-[1500px] rounded-full opacity-40"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 50%, rgba(4,107,210,0) 0deg, rgba(4,107,210,0.3) 60deg, rgba(0,134,249,0.12) 140deg, rgba(34,211,238,0.22) 220deg, rgba(4,107,210,0) 360deg)",
            filter: "blur(100px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        />

        <Particles />

        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070B14] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B1220] to-transparent" />
      </div>

      {/* ─────────── Content (2 columns) ─────────── */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 pb-10 sm:px-6 sm:pt-24 sm:pb-12 lg:px-8 lg:pt-20 lg:pb-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* ───── Left: copy column ───── */}
          <div className="text-center lg:col-span-6 lg:text-left xl:col-span-6">
            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/25 bg-white/[0.04] px-3.5 py-1.5 text-[11px] backdrop-blur-md sm:text-xs"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
              </span>
              <span className="font-medium tracking-wide text-white/85">
                AI Voice Agents · Now in 42 regions
              </span>
              <Sparkles className="h-3 w-3 text-[#22D3EE]" />
            </motion.div>

            {/* Headline */}
            <h1 className="font-display mx-auto mt-4 max-w-[620px] text-[1.85rem] font-medium leading-[1.07] tracking-[-0.035em] text-white sm:mt-5 sm:text-[2.2rem] md:text-[2.4rem] lg:mx-0 lg:text-[2.5rem] xl:text-[2.6rem]">
              <motion.span
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                Simplify calls, AI and contact
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                centers from a{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#2D98F1] via-[#0086F9] to-[#22D3EE] bg-clip-text text-transparent">
                    single platform
                  </span>
                  <motion.span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 1.1,
                      delay: 1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </span>
                .
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block text-white/90"
              >
                No need to switch.
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mx-auto mt-3 max-w-xl text-sm font-light leading-relaxed text-[#B8C4D4] sm:mt-4 sm:text-[0.95rem] lg:mx-0"
            >
              Meet the new standard for a modern communications stack — UCaaS,
              contact center, AI voice agents and global numbers, designed for
              enterprises and growing teams.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-5 flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-auto"
              >
                <Button
                  size="lg"
                  className="group relative h-11 w-auto overflow-hidden rounded-full bg-[#046BD2] px-4 text-xs font-semibold text-white shadow-[0_0_50px_-10px_rgba(4,107,210,0.85)] hover:bg-[#0078E0] sm:px-7 sm:text-[0.95rem]"
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-150%", "150%"] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      repeatDelay: 2.2,
                    }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    Start a free trial
                    <Link href="/contact"></Link>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-auto"
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group h-11 w-auto rounded-full border-white/15 bg-white/[0.04] px-4 text-xs text-white backdrop-blur-md hover:bg-white/10 hover:text-white sm:px-7 sm:text-[0.95rem]"
                >
                  <Link href="/pricing">
                    See Pricing
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Microfooter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-white/45 lg:justify-start"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                No credit card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <HeadsetIcon className="h-3 w-3" />
                24/7 support
              </span>
            </motion.div>
          </div>

          {/* ───── Right: device showcase (laptop → tablet → mobile) ───── */}
          <div className="relative lg:col-span-6 xl:col-span-6">
            <DeviceShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
