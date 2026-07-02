'use client'

import { motion } from "framer-motion"
import { Home, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const QUICK_LINKS = [
  { label: "Contact Center", href: "/products/contact-center/" },
  { label: "Unified Comms",  href: "/products/ucaas/" },
  { label: "AI Voice Agent", href: "/products/ai/receptionist/" },
  { label: "Pricing",        href: "/pricing/" },
]

const NotFoundPage = () => {
  const router = useRouter()

  return (
    <div className="relative flex items-center justify-center px-4 sm:px-6 py-24 sm:py-32 lg:py-40 overflow-x-hidden">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] rounded-full bg-[#046BD2]/12 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-1/2 max-w-[300px] h-[300px] rounded-full bg-[#22D3EE]/8 blur-[100px]" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(4,107,210,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(4,107,210,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#046BD2]/30 bg-[#046BD2]/10 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#2D98F1]">
            Error 404
          </span>
        </motion.div>

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="leading-none tracking-tighter font-display font-black bg-gradient-to-b from-white via-white to-[#046BD2] bg-clip-text text-transparent mb-6 select-none"
          style={{ fontSize: "clamp(4.5rem, 20vw, 13rem)" }}
        >
          404
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4"
        >
          Lost connection to this page
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="text-base sm:text-lg text-white/50 leading-relaxed max-w-lg mx-auto mb-10"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col xs:flex-row sm:flex-row items-center justify-center gap-3 mb-14 sm:mb-16"
        >
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0086F9] hover:to-[#22D3EE] text-white font-semibold text-sm transition-all shadow-[0_4px_20px_-4px_rgba(4,107,210,0.55)] w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <button
            onClick={() => router.back()}
            className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-white/15 text-white font-medium text-sm hover:bg-white/[0.05] transition-all w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Go Back
          </button>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="border-t border-white/[0.07] pt-10"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30 mb-6">
            Popular destinations
          </p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-y-3 max-w-xs sm:max-w-none mx-auto">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-center justify-center sm:justify-start gap-1.5 text-sm text-white/50 hover:text-[#2D98F1] transition-colors"
              >
                {item.label}
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Support */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-8 text-xs text-white/30"
        >
          Think this is a mistake?{" "}
          <a
            href="mailto:support@rozper.com"
            className="text-white/50 hover:text-white transition-colors font-medium"
          >
            Contact support
          </a>
        </motion.p>

      </div>
    </div>
  )
}

export default NotFoundPage
export { NotFoundPage as NotFoundAnimation }
export { NotFoundPage as Component }
