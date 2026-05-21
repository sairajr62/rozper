"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShieldCheck,
  Globe2,
  Headphones,
  Bot,
  Handshake,
  Plug,
  ArrowUpRight,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "99.99% uptime SLA",
    body: "Engineered into the network, not just promised in the brochure. We back it with a contract.",
    accent: "from-[#046BD2] to-[#0078E0]",
    glow: "rgba(4,107,210,0.3)",
  },
  {
    icon: Globe2,
    title: "150+ countries",
    body: "The broadest global coverage in the market. Local presence wherever your next customer is.",
    accent: "from-[#0086F9] to-[#2575FC]",
    glow: "rgba(0,134,249,0.3)",
  },
  {
    icon: Headphones,
    title: "24/7 expert support",
    body: "Real engineers answer — not a chatbot, not a ticket queue. Avg response in under 47 seconds.",
    accent: "from-[#22D3EE] to-[#046BD2]",
    glow: "rgba(34,211,238,0.25)",
  },
  {
    icon: Bot,
    title: "AI built into every seat",
    body: "Receptionist, agent assist, and conversation analytics included in the base plan. No upsell required.",
    accent: "from-[#2575FC] to-[#0086F9]",
    glow: "rgba(37,117,252,0.25)",
  },
  {
    icon: Handshake,
    title: "One partner, not a vendor",
    body: "Your goals become our goals from the first call. Quarterly reviews, a dedicated CSM, a direct line to engineers.",
    accent: "from-[#046BD2] to-[#22D3EE]",
    glow: "rgba(4,107,210,0.25)",
  },
  {
    icon: Plug,
    title: "No forced rip-and-replace",
    body: "Keep your SIP phones, your CRM, your workflow. Rozper drops in alongside the tools your team already trusts.",
    accent: "from-[#0078E0] to-[#046BD2]",
    glow: "rgba(0,120,224,0.25)",
  },
];

export function WhyRozper() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-[#070B14]"
    >
      {/* Aurora + dot-grid background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(4,107,210,0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(34,211,238,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-mono text-[#0086F9]">
            <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#0086F9]" />
            Why teams switch
          </div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]">
            Six things that actually{" "}
            <span
              className="font-display not-italic text-white"
              style={{ fontFamily: "var(--font-archivo), 'Archivo Fallback', system-ui, sans-serif", fontWeight: 500, fontStyle: "normal" }}
            >
              matter.
            </span>
          </h2>
        </motion.div>

        {/* 2 × 3 numbered grid (Image-1 style, Rozper tokens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/[0.10] via-[#046BD2]/15 to-transparent transition-shadow duration-500 hover:shadow-[0_25px_60px_-25px_rgba(4,107,210,0.55)]"
              >
                {/* Hairline accent at top */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r ${r.accent} opacity-50 group-hover:opacity-100 transition-opacity`}
                />
                {/* Bloom glow on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                  style={{
                    background: `radial-gradient(ellipse at 30% 20%, ${r.glow} 0%, transparent 70%)`,
                  }}
                />

                <div className="relative h-full rounded-2xl bg-[#0A1020]/85 backdrop-blur-xl p-5 sm:p-6">
                  {/* Top row: number + title (left) | icon (right) */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="shrink-0 inline-flex items-center justify-center px-2 py-1 rounded-md font-mono text-[11px] font-bold text-[#22D3EE] bg-[#22D3EE]/[0.08] border border-[#22D3EE]/25 tabular-nums tracking-wider">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-semibold text-white tracking-tight leading-tight truncate">
                        {r.title}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${r.accent} transition-transform duration-500 group-hover:scale-110`}
                      style={{ boxShadow: `0 12px 30px -12px ${r.glow}` }}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                  </div>

                  {/* Body */}
                  <p className="mt-4 text-sm sm:text-[15px] text-[#9AA8BC] leading-relaxed">
                    {r.body}
                  </p>

                  {/* Bottom hover arrow — subtle "more" affordance */}
                  <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-white/30 group-hover:text-[#22D3EE] transition-colors">
                    <span
                      className={`h-px w-6 bg-gradient-to-r ${r.accent} opacity-50 group-hover:opacity-100 transition-opacity`}
                    />
                    <span>{String(i + 1).padStart(2, "0")} of 06</span>
                    <ArrowUpRight className="w-3 h-3 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
