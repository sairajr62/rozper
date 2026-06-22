'use client'

import React, { useEffect, useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setAnimationLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: "#0B1220" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(4, 107, 210, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(4, 107, 210, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(4, 107, 210, 0.18), transparent)",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(4, 107, 210, 0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
          style={{
            borderColor: "rgba(4, 107, 210, 0.3)",
            backgroundColor: "rgba(4, 107, 210, 0.1)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "#046BD2" }}
          />
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#147ad9" }}
          >
            Error 404
          </span>
        </motion.div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center"
        >
          {animationLoaded ? (
            <span
              className="font-display font-black leading-none tracking-tighter bg-clip-text text-transparent"
              style={{
                fontSize: "clamp(7rem, 20vw, 11rem)",
                backgroundImage:
                  "linear-gradient(to bottom, #ffffff 40%, #147ad9)",
              }}
            >
              404
            </span>
          ) : (
            <div
              className="w-64 h-40 rounded-2xl flex items-center justify-center animate-pulse"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <span
                className="font-display font-bold text-3xl"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Loading…
              </span>
            </div>
          )}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white"
        >
          Lost connection to this page
        </motion.h1>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed px-4 sm:px-0"
          style={{ color: "#CCD6DF" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track — explore Rozper or return to the
          homepage.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 sm:px-0"
        >
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] w-full sm:w-auto"
            style={{ backgroundColor: "#046BD2" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0078E0")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#046BD2")
            }
            aria-label="Go to home"
          >
            <Home className="w-4 h-4 transition-transform duration-200 group-hover:scale-105" />
            Back to Home
          </Link>

          <button
            onClick={() => router.back()}
            className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded font-medium text-white bg-transparent border transition-all duration-200 hover:bg-white/5 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98] w-full sm:w-auto"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Go Back
          </button>
        </motion.div>

        {/* Popular destinations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pt-10 border-t border-white/10"
        >
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-5">
            Popular destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            {[
              { label: "Contact Center", href: "/products/contact-center" },
              { label: "Unified Comms", href: "/products/unified-communications" },
              { label: "AI Voice Agent", href: "/products/ai/receptionist" },
              { label: "Pricing", href: "/pricing" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 transition-colors inline-flex items-center gap-1.5 group hover:text-[#147ad9]"
              >
                {item.label}
                <ArrowLeft className="w-3 h-3 rotate-[135deg] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Support link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-xs sm:text-sm text-gray-500"
        >
          Think this is a mistake?{" "}
          <a
            href="mailto:support@rozper.com"
            className="text-gray-300 hover:text-white hover:underline transition-colors duration-200 font-medium"
          >
            Contact our support team
          </a>
        </motion.p>
      </div>
    </div>
  );
};

export default NotFoundPage;
export { NotFoundPage as NotFoundAnimation };
export { NotFoundPage as Component };
