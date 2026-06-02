"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import {
  SiSalesforce,
  SiHubspot,
  SiZoho,
  SiZendesk,
  SiIntercom,
  SiSlack,
  SiGoogle,
  SiGmail,
  SiWhatsapp,
  SiMessenger,
  SiInstagram,
  SiTelegram,
  SiViber,
  SiZapier,
  SiMailchimp,
  SiZoom,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Logo = {
  name: string;
  Icon: IconType;
  color: string;
};

// Top row — CRM, helpdesk, workspace
const row1: Logo[] = [
  { name: "Salesforce", Icon: SiSalesforce, color: "#00A1E0" },
  { name: "HubSpot", Icon: SiHubspot, color: "#FF7A59" },
  { name: "Zoho", Icon: SiZoho, color: "#C8202F" },
  { name: "Zendesk", Icon: SiZendesk, color: "#03363D" },
  { name: "Intercom", Icon: SiIntercom, color: "#1F8DED" },
  { name: "Slack", Icon: SiSlack, color: "#4A154B" },
  { name: "Google", Icon: SiGoogle, color: "#4285F4" },
  { name: "Gmail", Icon: SiGmail, color: "#EA4335" },
];

// Bottom row — messaging channels, automation, comms
const row2: Logo[] = [
  { name: "WhatsApp", Icon: SiWhatsapp, color: "#25D366" },
  { name: "Messenger", Icon: SiMessenger, color: "#0084FF" },
  { name: "Instagram", Icon: SiInstagram, color: "#E4405F" },
  { name: "Telegram", Icon: SiTelegram, color: "#26A5E4" },
  { name: "Viber", Icon: SiViber, color: "#7360F2" },
  { name: "Zapier", Icon: SiZapier, color: "#FF4A00" },
  { name: "Mailchimp", Icon: SiMailchimp, color: "#C19E08" },
  { name: "Zoom", Icon: SiZoom, color: "#2D8CFF" },
];

function LogoTile({ logo }: { logo: Logo }) {
  const Icon = logo.Icon;
  return (
    <div className="relative shrink-0 group">
      {/* Soft outer glow on hover */}
      <div
        className="absolute -inset-2 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity"
        style={{ background: logo.color }}
      />
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-white to-[#D5DCE5] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Icon
          className="w-7 h-7 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-110"
          style={{ color: logo.color }}
        />
      </div>
      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-[10px] font-mono uppercase tracking-widest text-white/55 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {logo.name}
      </div>
    </div>
  );
}

function MarqueeRow({
  logos,
  direction,
  duration,
}: {
  logos: Logo[];
  direction: "left" | "right";
  duration: number;
}) {
  // Duplicate the list — the second copy enters as the first leaves, creating a seamless loop
  const looped = [...logos, ...logos];
  // Scroll by exactly one copy's width (-50% of total)
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        className="flex gap-6 sm:gap-8 w-max"
        animate={{ x: [from, to] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {looped.map((logo, i) => (
          <LogoTile key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </motion.div>
    </div>
  );
}

export function IntegrationsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-[#070B14]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(4,107,210,0.18) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Centered header — kept inside the max-width container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <div className="text-[12px] font-mono uppercase tracking-[0.28em] text-[#22D3EE] mb-4">
            Integrations
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-[-0.025em] leading-[1.05]">
            Integrates with{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
              your workflow
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#9AA8BC] leading-relaxed">
            Whether you&apos;re a small business or a large enterprise, Rozper
            integrations are designed to enhance your productivity and make your
            workflow easier.
          </p>
        </motion.div>
      </div>

      {/* Marquee — spans full viewport width (escapes container) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#070B14] via-[#070B14]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#070B14] via-[#070B14]/80 to-transparent z-10 pointer-events-none" />

        {/* Row 1 — left */}
        <MarqueeRow logos={row1} direction="left" duration={45} />

        {/* Row 2 — right, slightly slower for organic feel */}
        <div className="mt-2">
          <MarqueeRow logos={row2} direction="right" duration={55} />
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16 flex justify-center"
      >
        <a
          href=""
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[#22D3EE]/40 transition-colors"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/80 group-hover:text-white transition-colors">
            Explore Integrations
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#22D3EE] transition-transform group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </section>
  );
}
