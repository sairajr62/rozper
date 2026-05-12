"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, MessageCircle, ArrowUpRight, Sparkles } from "lucide-react";

const faqs = [
  {
    category: "About",
    question: "What exactly is Rozper?",
    answer:
      "Rozper is a global business communications platform offering UCaaS, wholesale voice, virtual phone numbers (150+ countries), SIP trunking, and bulk SMS — backed by 99.999% uptime and 24/7 human support. No fixed plans. You pay for what you actually use."
  },
  {
    category: "Coverage",
    question: "Does Rozper work internationally?",
    answer:
      "Yes. Rozper covers 150+ countries with local virtual numbers, global outbound, carrier-grade routing, and 24/7 support from our Hong Kong HQ.",
  },
  {
    category: "Migration",
    question: "Can I use my existing phones and CRM?",
    answer:
      "Yes. Rozper works with all major SIP phones and integrates with Salesforce, HubSpot, Zoho, Zendesk, and 300+ apps — no forced replacements.",
  },
  {
    category: "Contracts",
    question: "Is there a long-term contract?",
    answer:
      "No. Start with a 14-day free trial. After that, the plan runs month-to-month — no annual lock-in required to get started.",
  },
  {
    category: "Differentiator",
    question: "What makes Rozper different from other UCaaS platforms?",
    answer:
      "Three things: 99.999% uptime on a carrier-grade network, 150+ country coverage, and genuine human support. We're partners, not just a platform.",
  },
];

export function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 overflow-hidden bg-[#0A1020]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(4,107,210,0.10) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky left rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-mono text-white/50">
              <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#0086F9]" />
              FAQ
            </div>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl font-semibold text-white tracking-[-0.025em] leading-[1.05]">
              Questions,{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent">
                answered straight.
              </span>
            </h2>
            <p className="mt-6 text-base text-[#9AA8BC] leading-relaxed">
              Everything you need to know before a 30-minute call. Don&apos;t
              see your question?
            </p>

            {/* Help card */}
            <div className="mt-8 relative group">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/10 via-[#046BD2]/30 to-transparent" />
              <div className="relative rounded-2xl bg-[#0A1020] border border-white/5 p-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      Live
                    </div>
                    <div className="text-sm font-semibold text-white">
                      Talk to a human
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">
                  Avg response 47 seconds. No bot loop, no queue.
                </p>
                <a
                  href="#contact"
                  className="mt-4 group inline-flex items-center gap-1.5 text-sm font-medium text-[#22D3EE] hover:text-white transition-colors"
                >
                  Start a chat
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: FAQ list */}
          <div className="lg:col-span-8 space-y-2">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="relative group"
                >
                  {isOpen && (
                    <motion.div
                      layoutId="faq-active-glow"
                      className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#046BD2]/40 via-[#22D3EE]/20 to-transparent"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <div
                    className={`relative rounded-2xl overflow-hidden transition-colors ${
                      isOpen
                        ? "bg-[#0A1020] border border-transparent"
                        : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.04]"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-6 p-5 sm:p-6 text-left"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span
                          className={`shrink-0 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border transition-colors ${
                            isOpen
                              ? "border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]"
                              : "border-white/10 bg-white/[0.03] text-white/50"
                          }`}
                        >
                          {faq.category}
                        </span>
                        <span
                          className={`font-semibold text-base sm:text-lg truncate transition-colors ${
                            isOpen ? "text-white" : "text-white/85"
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                          isOpen
                            ? "bg-[#22D3EE]/15 text-[#22D3EE]"
                            : "bg-white/[0.03] text-white/40"
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-0 pl-5 sm:pl-[7.25rem] text-[#9AA8BC] leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex items-center gap-2 text-sm text-white/50"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
              Most teams onboard in under 14 days. Ask us how.
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
