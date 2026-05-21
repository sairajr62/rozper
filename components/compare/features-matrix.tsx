"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Check, Minus, ChevronDown, Lock } from "lucide-react"

/**
 * Feature comparison matrix — grouped by category, collapsible, sticky
 * column headers. Avoids a boxy table look by using:
 *   • A single rounded squircle container with asymmetric border-radius.
 *   • Rounded pill row dividers (no hard cell borders).
 *   • A glowing gradient column for Rozper.
 */

type Cell = true | false | "partial" | string

type Row = {
  label: string
  hint?: string
  cells: { rozper: Cell; ringcentral: Cell; eightxeight: Cell; vonage: Cell; twilio: Cell }
}

type Group = {
  id: string
  name: string
  rows: Row[]
}

const groups: Group[] = [
  {
    id: "voice",
    name: "Voice & calling",
    rows: [
      {
        label: "Unlimited US/CA calling",
        cells: { rozper: true, ringcentral: true, eightxeight: true, vonage: true, twilio: false },
      },
      {
        label: "International minute pool",
        hint: "Bundled cross-border calling vs. per-min add-on",
        cells: { rozper: "10K min", ringcentral: "Add-on", eightxeight: "Add-on", vonage: "Add-on", twilio: "Per-min" },
      },
      {
        label: "Local presence dialing",
        cells: { rozper: true, ringcentral: "partial", eightxeight: "partial", vonage: false, twilio: "Build" },
      },
      {
        label: "Predictive / progressive dialer",
        cells: { rozper: true, ringcentral: "partial", eightxeight: "X6+", vonage: "Add-on", twilio: "Build" },
      },
      {
        label: "Skills-based ACD routing",
        cells: { rozper: true, ringcentral: true, eightxeight: "X6+", vonage: "Add-on", twilio: true },
      },
    ],
  },
  {
    id: "ai",
    name: "AI & automation",
    rows: [
      {
        label: "AI receptionist (included)",
        hint: "Answers, qualifies, books — no Twilio Studio required",
        cells: { rozper: true, ringcentral: false, eightxeight: false, vonage: false, twilio: false },
      },
      {
        label: "AI conversation intelligence",
        cells: { rozper: true, ringcentral: "Top tier", eightxeight: "X6+", vonage: false, twilio: "Paid add-on" },
      },
      {
        label: "Sentiment & call summaries",
        cells: { rozper: true, ringcentral: "Top tier", eightxeight: "X6+", vonage: false, twilio: "Paid add-on" },
      },
      {
        label: "Voice cloning (custom voice)",
        cells: { rozper: "Enterprise", ringcentral: false, eightxeight: false, vonage: false, twilio: false },
      },
      {
        label: "Dedicated fine-tuning",
        cells: { rozper: "Custom plan", ringcentral: false, eightxeight: false, vonage: false, twilio: "Self-serve" },
      },
    ],
  },
  {
    id: "channels",
    name: "Channels & integrations",
    rows: [
      {
        label: "WhatsApp · FB · IG · Telegram",
        cells: { rozper: true, ringcentral: "Ultra tier", eightxeight: true, vonage: "Add-on", twilio: "Usage" },
      },
      {
        label: "MS Teams native integration",
        cells: { rozper: true, ringcentral: true, eightxeight: true, vonage: true, twilio: "Build" },
      },
      {
        label: "Salesforce · HubSpot · Zoho",
        cells: { rozper: true, ringcentral: true, eightxeight: true, vonage: "Limited", twilio: "Build" },
      },
      {
        label: "Public REST + Webhooks API",
        cells: { rozper: true, ringcentral: true, eightxeight: true, vonage: true, twilio: true },
      },
      {
        label: "Data warehouse export",
        hint: "BigQuery / Snowflake / Redshift",
        cells: { rozper: "Custom plan", ringcentral: false, eightxeight: "Add-on", vonage: false, twilio: "Build" },
      },
    ],
  },
  {
    id: "trust",
    name: "Compliance & reliability",
    rows: [
      {
        label: "SOC 2 Type II",
        cells: { rozper: true, ringcentral: true, eightxeight: true, vonage: true, twilio: true },
      },
      {
        label: "HIPAA BAA",
        cells: { rozper: "Custom plan", ringcentral: "Top tier", eightxeight: "Top tier", vonage: false, twilio: "Paid" },
      },
      {
        label: "99.99% uptime SLA",
        cells: { rozper: "Enterprise", ringcentral: "Top tier", eightxeight: "Top tier", vonage: "Best-effort", twilio: true },
      },
      {
        label: "Financial SLA credits",
        cells: { rozper: "Custom plan", ringcentral: false, eightxeight: false, vonage: false, twilio: false },
      },
    ],
  },
  {
    id: "commercial",
    name: "Commercial",
    rows: [
      {
        label: "Monthly billing (no annual lock-in)",
        cells: { rozper: true, ringcentral: "partial", eightxeight: false, vonage: true, twilio: true },
      },
      {
        label: "Free trial (no credit card)",
        cells: { rozper: "14 days", ringcentral: "14 days", eightxeight: "Demo only", vonage: "14 days", twilio: "Credits" },
      },
      {
        label: "Setup fee",
        cells: { rozper: "$0", ringcentral: "Varies", eightxeight: "Varies", vonage: "$0", twilio: "$0" },
      },
      {
        label: "Migration assist included",
        cells: { rozper: true, ringcentral: "Paid", eightxeight: "Paid", vonage: false, twilio: false },
      },
    ],
  },
]

const colHeaders = [
  { id: "rozper", label: "Rozper" },
  { id: "ringcentral", label: "RingCentral" },
  { id: "eightxeight", label: "8x8" },
  { id: "vonage", label: "Vonage" },
  { id: "twilio", label: "Twilio Flex" },
] as const

export function FeaturesMatrix() {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((g) => [g.id, true])),
  )

  const toggle = (id: string) =>
    setOpen((s) => ({ ...s, [id]: !s[id] }))

  return (
    <section
      id="features-matrix"
      className="relative py-24 lg:py-32 bg-[#070B14] overflow-hidden"
    >
      {/* Decorative blob */}
      <motion.div
        aria-hidden
        className="absolute -z-10 top-1/4 right-[-10%] w-[700px] h-[700px] opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.4), rgba(34,211,238,0) 65%)",
          filter: "blur(90px)",
          borderRadius: "62% 38% 49% 51% / 53% 41% 59% 47%",
        }}
        animate={{ x: [0, -30, 10, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
            Feature matrix
          </div>
          <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.025em] leading-[1.05]">
            What you actually{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
              get out of the box.
            </span>
          </h2>
          <p className="mt-4 text-[#B8C4D4] text-sm sm:text-base font-light">
            Click any category to collapse. &ldquo;Add-on&rdquo; means a separate
            SKU or per-call fee. &ldquo;Build&rdquo; means engineering effort.
          </p>
        </div>

        {/* The matrix shell — asymmetric squircle, NOT a rectangle */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "32px 12px 32px 12px",
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(10,16,32,0.6) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 30px 80px -30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Rozper column glow — positioned over the first vendor column.
              Grid: 1.5fr label + 5 × 1fr vendor → Rozper occupies the 1st
              of 5 vendor columns. label = 1.5 / (1.5 + 5) ≈ 23.08%, each
              vendor = 1 / (1.5 + 5) ≈ 15.38%. */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 hidden lg:block"
            style={{
              left: "calc(23.08% + 1.25rem)",
              width: "15.38%",
              background:
                "linear-gradient(180deg, rgba(4,107,210,0.18) 0%, rgba(34,211,238,0.10) 50%, rgba(4,107,210,0.18) 100%)",
              borderLeft: "1px solid rgba(34,211,238,0.20)",
              borderRight: "1px solid rgba(34,211,238,0.20)",
              boxShadow: "0 0 40px rgba(4,107,210,0.25)",
              pointerEvents: "none",
            }}
          />

          {/* Sticky header */}
          <div
            className="sticky top-0 z-10 hidden lg:grid gap-2 px-5 py-4 backdrop-blur-xl"
            style={{
              gridTemplateColumns: "1.5fr repeat(5, 1fr)",
              background:
                "linear-gradient(180deg, rgba(10,16,32,0.95) 0%, rgba(10,16,32,0.75) 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
              Feature
            </div>
            {colHeaders.map((c) => (
              <div
                key={c.id}
                className={`text-center text-xs font-semibold tracking-[-0.01em] ${
                  c.id === "rozper" ? "text-white" : "text-white/55"
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full ${
                    c.id === "rozper"
                      ? "bg-gradient-to-r from-[#046BD2] to-[#22D3EE] text-white"
                      : "border border-white/10 text-white/60"
                  }`}
                >
                  {c.label}
                </span>
              </div>
            ))}
          </div>

          {/* Groups */}
          <div className="relative">
            {groups.map((g, gi) => (
              <div key={g.id}>
                <button
                  type="button"
                  onClick={() => toggle(g.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                  style={{
                    borderTop:
                      gi === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="inline-block w-1.5 h-6 rounded-full"
                      style={{
                        background:
                          "linear-gradient(180deg, #046BD2 0%, #22D3EE 100%)",
                      }}
                    />
                    <span className="font-display text-base sm:text-lg font-semibold text-white tracking-[-0.01em]">
                      {g.name}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/35">
                      {g.rows.length} criteria
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: open[g.id] ? 0 : -90 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/40"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open[g.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-2">
                        {g.rows.map((r, ri) => (
                          <Row key={r.label} row={r} alt={ri % 2 === 0} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono uppercase tracking-[0.14em] text-white/40">
          <LegendDot variant="yes" /> <span>Included</span>
          <LegendDot variant="partial" /> <span>Partial · top tier only</span>
          <LegendDot variant="no" /> <span>Not available / requires build</span>
        </div>
      </div>
    </section>
  )
}

function Row({ row, alt }: { row: Row; alt: boolean }) {
  return (
    <>
      {/* Mobile: stacked layout (one row per vendor) */}
      <div
        className="lg:hidden px-5 py-4 transition-colors"
        style={{ background: alt ? "rgba(255,255,255,0.012)" : "transparent" }}
      >
        <div className="text-sm text-white/85 font-medium">{row.label}</div>
        {row.hint && (
          <div className="mt-0.5 text-[11px] text-white/40 leading-snug">
            {row.hint}
          </div>
        )}
        <div className="mt-3 flex flex-col gap-1 text-xs">
          {colHeaders.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between gap-3 py-1"
            >
              <span
                className={
                  c.id === "rozper"
                    ? "text-[#22D3EE] font-semibold"
                    : "text-white/45"
                }
              >
                {c.label}
              </span>
              <CellIndicator
                value={row.cells[c.id as keyof Row["cells"]]}
                highlight={c.id === "rozper"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: single 6-column row */}
      <div
        className="hidden lg:grid gap-2 px-5 py-3.5 items-center transition-colors"
        style={{
          gridTemplateColumns: "1.5fr repeat(5, 1fr)",
          background: alt ? "rgba(255,255,255,0.012)" : "transparent",
        }}
      >
        <div>
          <div className="text-sm text-white/85 font-medium">{row.label}</div>
          {row.hint && (
            <div className="mt-0.5 text-[11px] text-white/40 leading-snug">
              {row.hint}
            </div>
          )}
        </div>
        {colHeaders.map((c) => (
          <div key={c.id} className="text-center">
            <CellIndicator
              value={row.cells[c.id as keyof Row["cells"]]}
              highlight={c.id === "rozper"}
            />
          </div>
        ))}
      </div>
    </>
  )
}

function CellIndicator({
  value,
  highlight,
}: {
  value: Cell
  highlight?: boolean
}) {
  if (value === true) {
    return (
      <span
        className={`inline-flex items-center justify-center w-7 h-7 ${
          highlight
            ? "bg-gradient-to-br from-[#046BD2] to-[#22D3EE] shadow-[0_4px_20px_-6px_rgba(4,107,210,0.7)]"
            : "bg-emerald-400/15 border border-emerald-400/30"
        }`}
        style={{ borderRadius: "55% 45% 60% 40% / 50% 55% 45% 50%" }}
      >
        <Check
          className={`w-3.5 h-3.5 ${highlight ? "text-white" : "text-emerald-300"}`}
          strokeWidth={3}
        />
      </span>
    )
  }
  if (value === false) {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 bg-white/[0.03] border border-white/10"
        style={{ borderRadius: "55% 45% 60% 40% / 50% 55% 45% 50%" }}
      >
        <Minus className="w-3.5 h-3.5 text-white/30" strokeWidth={2.5} />
      </span>
    )
  }
  if (value === "partial") {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 bg-amber-400/15 border border-amber-400/30"
        style={{ borderRadius: "55% 45% 60% 40% / 50% 55% 45% 50%" }}
      >
        <Lock className="w-3 h-3 text-amber-300" />
      </span>
    )
  }
  // String value — annotate with appropriate tone
  const isPositive =
    highlight ||
    /included|10K|Custom plan|Enterprise|14 days/i.test(String(value))
  const isNegative = /Add-on|Build|Per-min|Paid|Best-effort|Limited|Varies|Demo only|Self-serve/i.test(
    String(value),
  )
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[3rem] h-7 px-2.5 text-[10.5px] font-mono uppercase tracking-[0.08em] whitespace-nowrap ${
        highlight
          ? "bg-gradient-to-br from-[#046BD2]/30 to-[#22D3EE]/30 text-white border border-[#22D3EE]/50"
          : isPositive
            ? "bg-emerald-400/10 text-emerald-200 border border-emerald-400/25"
            : isNegative
              ? "bg-amber-400/8 text-amber-200/85 border border-amber-400/20"
              : "bg-white/[0.04] text-white/55 border border-white/10"
      }`}
      style={{ borderRadius: "10px 20px 10px 20px" }}
    >
      {value}
    </span>
  )
}

function LegendDot({ variant }: { variant: "yes" | "partial" | "no" }) {
  const styles = {
    yes: "bg-gradient-to-br from-[#046BD2] to-[#22D3EE]",
    partial: "bg-amber-400/40 border border-amber-400/40",
    no: "bg-white/10 border border-white/15",
  } as const
  return (
    <span
      className={`inline-block w-3 h-3 ${styles[variant]}`}
      style={{ borderRadius: "55% 45% 60% 40% / 50% 55% 45% 50%" }}
      aria-hidden
    />
  )
}
