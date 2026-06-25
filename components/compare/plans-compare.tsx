"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Check, Sparkles } from "lucide-react"

/**
 * Plan-tier comparison — asymmetric layout where Rozper takes a larger
 * "pedestal" card and the four competitors orbit around it as smaller
 * lozenges. NO grid of equal rectangles. Each card uses an asymmetric
 * squircle border-radius so the section never reads as boxy.
 */

type Vendor = {
  id: string
  name: string
  tagline: string
  monthly: number
  annual: number
  unit: string
  highlights: string[]
  accent: string // rgb triplet for accent (e.g. "4,107,210")
  shape: string // border-radius squircle
}

const rozper: Vendor = {
  id: "rozper",
  name: "Rozper",
  tagline: "Professional · pro-rated, no annual lock-in",
  monthly: 19.99,
  annual: 15.99,
  unit: "user / mo",
  highlights: [
    "AI Receptionist + Sentiment included",
    "WhatsApp · FB · IG · Teams native",
    "Unlimited US/CA · 1,000 chatbot convos",
    "SOC 2 Type II · 99.95% SLA",
    "Cancel anytime · no setup fee",
  ],
  accent: "4,107,210",
  shape: "44px 18px 44px 18px",
}

const competitors: Vendor[] = [
  {
    id: "ringcentral",
    name: "RingCentral",
    tagline: "Core (most-comparable tier)",
    monthly: 30,
    annual: 20,
    unit: "user / mo",
    highlights: [
      "AI sentiment is top-tier only",
      "WhatsApp on Ultra ($45) tier",
      "12-month contract typical",
      "Add-on fees for SMS volume",
    ],
    accent: "249,115,22",
    shape: "26px 12px 26px 12px",
  },
  {
    id: "8x8",
    name: "8x8",
    tagline: "X2 (most-comparable tier)",
    monthly: 28,
    annual: 24,
    unit: "user / mo",
    highlights: [
      "Conversation IQ on X6+ only",
      "Single-platform but UI dated",
      "Annual commit common",
      "Add-on for queue analytics",
    ],
    accent: "168,85,247",
    shape: "26px 12px 26px 12px",
  },
  {
    id: "vonage",
    name: "Vonage",
    tagline: "Premium tier",
    monthly: 29.99,
    annual: 29.99,
    unit: "user / mo",
    highlights: [
      "No AI receptionist included",
      "CRM integrations limited",
      "Per-user pricing tiers by size",
      "Charges extra for messaging",
    ],
    accent: "34,197,94",
    shape: "26px 12px 26px 12px",
  },
  {
    id: "twilio",
    name: "Twilio Flex",
    tagline: "Named user model",
    monthly: 150,
    annual: 150,
    unit: "named user / mo",
    highlights: [
      "Build-your-own, not turn-key",
      "Usage fees on top of seat fee",
      "Engineering team required",
      "No native AI receptionist",
    ],
    accent: "239,68,68",
    shape: "26px 12px 26px 12px",
  },
]

export function PlansCompare() {
  const [annual, setAnnual] = useState(true)

  const rozperPrice = annual ? rozper.annual : rozper.monthly

  return (
    <section
      id="plans-compare"
      className="relative py-24 lg:py-32 bg-[#0B1220] overflow-hidden"
    >
      {/* curved SVG section divider (top) — non-boxy transition */}
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute top-0 inset-x-0 w-full h-20 -translate-y-px"
      >
        <path
          d="M 0 0 C 240 80 480 80 720 40 C 960 0 1200 0 1440 60 L 1440 0 L 0 0 Z"
          fill="#070B14"
        />
      </svg>

      {/* Ambient floating blobs */}
      <motion.div
        aria-hidden
        className="absolute -z-10 top-1/3 -left-40 w-[600px] h-[600px] opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(4,107,210,0.5), rgba(4,107,210,0) 65%)",
          filter: "blur(80px)",
          borderRadius: "62% 38% 49% 51% / 53% 41% 59% 47%",
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
            <Sparkles className="w-3 h-3" />
            Pricing · apples-to-apples
          </div>
          <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.025em] leading-[1.05]">
            One plan from Rozper.{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
              Four invoices from anyone else.
            </span>
          </h2>
          <p className="mt-4 text-[#B8C4D4] text-sm sm:text-base font-light">
            Comparing Rozper Professional against the closest published tier on
            each platform. Prices in USD; annual figures are the per-month rate
            if you commit to 12 months.
          </p>

          {/* Billing toggle — flowing pill, not a boxy switch */}
          <div className="mt-9 inline-flex p-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
            <ToggleButton active={!annual} onClick={() => setAnnual(false)}>
              Monthly
            </ToggleButton>
            <ToggleButton active={annual} onClick={() => setAnnual(true)}>
              Annual
              <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-mono uppercase tracking-wider">
                -20%
              </span>
            </ToggleButton>
          </div>
        </div>

        {/* 5 equal columns. Rozper sits first and pops via its gradient
            backdrop, ribbon, larger price digits, and a brighter accent
            border — not via taking more grid space. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
          <VendorCard vendor={rozper} annual={annual} hero />
          {competitors.map((c) => (
            <VendorCard
              key={c.id}
              vendor={c}
              annual={annual}
              delta={rozperPrice}
            />
          ))}
        </div>
      </div>

      {/* Bottom curved divider */}
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute bottom-0 inset-x-0 w-full h-20 translate-y-px"
      >
        <path
          d="M 0 40 C 280 0 520 0 720 30 C 920 60 1200 80 1440 20 L 1440 80 L 0 80 Z"
          fill="#070B14"
        />
      </svg>
    </section>
  )
}

/* ────────────────────────── pieces ────────────────────────── */

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
        active ? "text-[#0B1220]" : "text-white/70 hover:text-white"
      }`}
    >
      {active && (
        <motion.span
          layoutId="plan-toggle-pill"
          className="absolute inset-0 rounded-full bg-white shadow-[0_8px_30px_-10px_rgba(255,255,255,0.4)]"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative">{children}</span>
    </button>
  )
}

function VendorCard({
  vendor,
  annual,
  hero = false,
  delta,
}: {
  vendor: Vendor
  annual: boolean
  hero?: boolean
  delta?: number
}) {
  const price = annual ? vendor.annual : vendor.monthly

  const savings =
    delta !== undefined && delta < price
      ? Math.round((price - delta) * 12)
      : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative h-full"
    >
      {/* Asymmetric glow shadow that follows the card's organic shape */}
      <div
        aria-hidden
        className="absolute -inset-2 -z-10 opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-2xl"
        style={{
          background: `linear-gradient(135deg, rgba(${vendor.accent},0.5), rgba(${vendor.accent},0))`,
          borderRadius: vendor.shape,
        }}
      />
      <div
        className="relative h-full flex flex-col p-5 lg:p-6 backdrop-blur-xl overflow-hidden"
        style={{
          borderRadius: vendor.shape,
          background: hero
            ? `linear-gradient(160deg, rgba(${vendor.accent},0.18) 0%, rgba(10,16,32,0.85) 60%)`
            : "rgba(255,255,255,0.025)",
          border: `1px solid rgba(${vendor.accent},${hero ? 0.45 : 0.18})`,
          boxShadow: hero
            ? `0 30px 80px -30px rgba(${vendor.accent},0.55), inset 0 1px 0 rgba(255,255,255,0.08)`
            : "0 12px 40px -20px rgba(0,0,0,0.5)",
        }}
      >
        <div>
          <div className="flex items-center justify-between gap-2">
            <div
              className="text-[11px] font-mono uppercase tracking-[0.18em]"
              style={{ color: `rgba(${vendor.accent},1)` }}
            >
              {vendor.name}
            </div>
            {hero && (
              <div className="inline-flex items-center gap-1 rounded-full border border-[#22D3EE]/40 bg-[#22D3EE]/10 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-[0.14em] text-[#22D3EE]">
                <span className="w-1 h-1 rounded-full bg-[#22D3EE] shadow-[0_0_6px_#22D3EE]" />
                You are here
              </div>
            )}
          </div>
          <div className={`mt-1 text-xs ${hero ? "text-white/65" : "text-white/45"}`}>
            {vendor.tagline}
          </div>
        </div>

        <div className="mt-5 flex items-baseline gap-2">
          <span
            className={`font-display tabular-nums font-semibold text-white ${
              hero ? "text-4xl sm:text-[2.75rem]" : "text-3xl sm:text-4xl"
            }`}
          >
            ${price.toFixed(2)}
          </span>
          <span className="text-[11px] text-white/45">/ {vendor.unit}</span>
        </div>
        {annual && hero && (
          <div className="mt-1 text-[11px] font-mono uppercase tracking-[0.14em] text-white/40">
            Billed monthly · cancel anytime
          </div>
        )}
        {!hero && savings !== null && (
          <div className="mt-1 text-[11px] font-mono uppercase tracking-[0.14em] text-amber-300/85">
            ${savings.toLocaleString()} more / seat / yr
          </div>
        )}

        <ul
          className={`mt-6 space-y-2.5 flex-1 ${
            hero ? "" : "text-[12.5px]"
          }`}
        >
          {vendor.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5">
              <span
                className="mt-1 inline-flex items-center justify-center shrink-0 w-4 h-4"
                style={{
                  borderRadius: "55% 45% 60% 40% / 50% 55% 45% 50%",
                  background: `rgba(${vendor.accent},${hero ? 0.25 : 0.15})`,
                  border: `1px solid rgba(${vendor.accent},${
                    hero ? 0.6 : 0.4
                  })`,
                }}
              >
                <Check
                  className="w-2.5 h-2.5"
                  style={{ color: `rgba(${vendor.accent},1)` }}
                  strokeWidth={3}
                />
              </span>
              <span
                className={`leading-snug ${
                  hero ? "text-[#CCD6DF] text-sm" : "text-white/65"
                }`}
              >
                {h}
              </span>
            </li>
          ))}
        </ul>

        {hero && (
          <a
            href="/pricing/"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0B1220] text-xs sm:text-sm font-semibold px-4 py-2.5 transition-colors hover:bg-[#dce8f5]"
          >
            See all Rozper plans →
          </a>
        )}
      </div>
    </motion.div>
  )
}
