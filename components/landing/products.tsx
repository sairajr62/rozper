"use client"

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion"
import { useRef } from "react"
import {
  ArrowUpRight,
  Phone,
  Headphones,
  Bot,
  Globe2,
  Radio,
  Server,
} from "lucide-react"

const products = [
  {
    icon: Phone,
    title: "UCaaS Platform",
    tag: "Anchor",
    description:
      "Calling, video, SMS, and AI on one seat — replace four vendors with one bill.",
    href: "/products/ucaas",
    bullets: ["Cloud PBX", "Video meetings", "SMS / MMS", "Team chat"],
    accent: "from-[#046BD2] to-[#22D3EE]",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    icon: Headphones,
    title: "Contact Center",
    tag: "CCaaS",
    description: "Omnichannel inbox, dialers, and analytics — built for scale.",
    href: "/products/contact-center",
    accent: "from-[#0078E0] to-[#2575FC]",
  },
  {
    icon: Bot,
    title: "AI Suite",
    tag: "Intelligence",
    description: "Receptionist, agent assist, conversation analytics.",
    href: "/products/ai",
    accent: "from-[#22D3EE] to-[#046BD2]",
  },
  {
    icon: Globe2,
    title: "Virtual Numbers",
    tag: "Coverage",
    description: "Local numbers in 150+ countries — provisioned in minutes.",
    href: "/features/toll-free-numbers",
    accent: "from-[#0086F9] to-[#22D3EE]",
  },
  {
    icon: Radio,
    title: "Wholesale Voice",
    tag: "Carrier",
    description: "Tier-1 A-Z termination on a private fabric.",
    href: "/products/wholesale",
    accent: "from-[#2575FC] to-[#0086F9]",
  },
  {
    icon: Server,
    title: "SIP Trunking",
    tag: "Infra",
    description: "Flexible SIP for any PBX — bring your own session border controller.",
    href: "/products/sip-trunking",
    accent: "from-[#0078E0] to-[#046BD2]",
  },
]

// ──────────────────────────────────────────────────────────────────────
// Card with mouse-tracked spotlight
// ──────────────────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
  isInView,
  large = false,
}: {
  product: (typeof products)[number]
  index: number
  isInView: boolean
  large?: boolean
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const sx = useSpring(mx, { stiffness: 200, damping: 25 })
  const sy = useSpring(my, { stiffness: 200, damping: 25 })

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 100)
    my.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${sx}% ${sy}%, rgba(34,211,238,0.18), transparent 55%)`

  return (
    <motion.a
      ref={cardRef}
      href={product.href}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative block ${product.span ?? ""}`}
    >
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/10 via-[#046BD2]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

      <div className="relative h-full rounded-3xl bg-[#0A1020]/85 backdrop-blur-xl border border-white/[0.04] overflow-hidden">
        {/* Mouse spotlight — tracks pointer */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: spotlight }}
        />

        {/* Decorative orb that drifts */}
        <div
          className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-br ${product.accent}`}
        />

        {/* Content */}
        <div className={`relative h-full p-7 sm:p-8 flex flex-col ${large ? "min-h-[440px]" : "min-h-[260px]"}`}>
          <div className="flex items-start justify-between">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${product.accent} flex items-center justify-center shadow-[0_0_30px_-8px_rgba(4,107,210,0.6)]`}
            >
              <product.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">
              {product.tag}
            </span>
          </div>

          <div className="mt-auto pt-8">
            <h3 className={`font-display ${large ? "text-3xl sm:text-4xl" : "text-xl"} font-semibold text-white tracking-[-0.02em]`}>
              {product.title}
            </h3>
            <p className={`mt-2 text-[#9AA8BC] leading-relaxed ${large ? "text-base max-w-md" : "text-sm"}`}>
              {product.description}
            </p>

            {large && product.bullets && (
              <div className="mt-6 grid grid-cols-2 gap-2 max-w-sm">
                {product.bullets.map((b) => (
                  <div
                    key={b}
                    className="flex items-center gap-2 text-xs text-white/70 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                    {b}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 group-hover:text-[#22D3EE] transition-colors">
              Explore
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Section
// ──────────────────────────────────────────────────────────────────────
export function Products() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="products"
      ref={ref}
      className="relative py-20 sm:py-24 overflow-hidden bg-[#0A1020]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(4,107,210,0.18) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-14"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-mono text-white/50">
              <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#0086F9]" />
              Products
            </div>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-[-0.025em] leading-[1.05]">
              The full{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                stack
              </span>
              , end to end.
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#9AA8BC] leading-relaxed max-w-md">
            From the seat your reps log into, all the way down to the SIP
            trunks carrying the call.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(240px,auto)]">
          {products.map((p, i) => (
            <ProductCard
              key={p.title}
              product={p}
              index={i}
              isInView={isInView}
              large={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
