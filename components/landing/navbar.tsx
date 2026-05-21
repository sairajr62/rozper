"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Phone,
  Users,
  Building2,
  Bot,
  MessageSquare,
  Truck,
  PhoneCall,
  Globe2,
  Video,
  MessageCircle,
  Inbox,
  PhoneOutgoing,
  Brain,
  Headphones,
  BarChart3,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ComponentType } from "react";

type MenuItem = {
  label: string;
  subtitle?: string;
  description?: string;
  href?: string;
  icon?: ComponentType<{ className?: string }>;
  badge?: "New" | "Free" | "AI" | "Beta";
  iconGradient?: string;
};

type MenuColumn = {
  title?: string;
  items: MenuItem[];
};

// Mega menu configuration — card grid
const megaMenuConfig: Record<string, { columns: MenuColumn[] }> = {
  Products: {
    columns: [
      {
        items: [
          {
            label: "Cloud Contact Center",
            description:
              "AI-powered omnichannel CX with dialers and analytics, built to scale.",
            href: "/products/contact-center",
            icon: Phone,
            iconGradient: "from-[#046BD2] to-[#22D3EE]",
          },
          {
            label: "Unified Communications",
            description:
              "Voice, video, chat and SMS unified for every seat on the team.",
            href: "/products/ucaas",
            icon: Users,
            iconGradient: "from-[#0078E0] to-[#2575FC]",
            badge: "New",
          },
          {
            label: "Business Phone System",
            description:
              "Cloud PBX with extensions, IVR, recording and porting in 150+ countries.",
            href: "/products/ucaas/business-phone",
            icon: Building2,
            iconGradient: "from-[#2575FC] to-[#046BD2]",
          },
          {
            label: "AI Voice Agent",
            description:
              "24/7 autonomous calls — captures intent, qualifies leads, books meetings.",
            href: "/products/ai/receptionist",
            icon: Bot,
            iconGradient: "from-[#22D3EE] to-[#0086F9]",
            badge: "AI",
          },
          {
            label: "Website Chatbot",
            description:
              "Convert visitors instantly with an LLM-powered chat that hands off to a human.",
            href: "/products/ucaas/website-chatbot",
            icon: MessageSquare,
            iconGradient: "from-[#0086F9] to-[#22D3EE]",
          },
          {
            label: "HD Video Meetings",
            description:
              "Crisp 1080p video, screen share, recording and noise suppression.",
            href: "/products/ucaas/video-meetings",
            icon: Video,
            iconGradient: "from-[#046BD2] to-[#0078E0]",
          },
          {
            label: "Business SMS & MMS",
            description:
              "Two-way messaging, MMS attachments and campaign sending built in.",
            href: "/products/ucaas/sms-mms",
            icon: MessageCircle,
            iconGradient: "from-[#2575FC] to-[#22D3EE]",
          },
          {
            label: "Omnichannel Inbox",
            description:
              "One inbox for voice, email, SMS, WhatsApp, web chat and social.",
            href: "/products/contact-center/omnichannel",
            icon: Inbox,
            iconGradient: "from-[#0078E0] to-[#046BD2]",
          },
          {
            label: "Predictive Dialer",
            description:
              "Power, predictive and preview dialers tuned for connect rate.",
            href: "/products/contact-center/outbound-dialer",
            icon: PhoneOutgoing,
            iconGradient: "from-[#22D3EE] to-[#2575FC]",
          },
        ],
      },
    ],
  },
  Solutions: {
    columns: [
      {
        items: [
          {
            label: "Healthcare",
            description: "HIPAA-aligned voice, SMS and AI for patient teams.",
            href: "/solutions/healthcare",
            icon: Building2,
            iconGradient: "from-[#22D3EE] to-[#0086F9]",
          },
          {
            label: "Financial Services",
            description: "Compliant calling, recording and dialers for banks and fintechs.",
            href: "/solutions/finance",
            icon: Building2,
            iconGradient: "from-[#046BD2] to-[#2575FC]",
          },
          {
            label: "Retail & eCommerce",
            description: "Drive conversions across SMS, chat, voice and WhatsApp.",
            href: "/solutions/retail",
            icon: Building2,
            iconGradient: "from-[#0086F9] to-[#22D3EE]",
          },
          {
            label: "SaaS & Technology",
            description: "Embed calling and SMS in your product with our SDKs.",
            href: "/solutions/saas",
            icon: Building2,
            iconGradient: "from-[#2575FC] to-[#046BD2]",
          },
          {
            label: "Sales Teams",
            description: "Power dialers, AI coaching and CRM-synced workflows.",
            href: "/solutions/sales-teams",
            icon: PhoneOutgoing,
            iconGradient: "from-[#0078E0] to-[#22D3EE]",
          },
          {
            label: "Support Teams",
            description: "Omnichannel inbox, AI agent assist and quality scoring.",
            href: "/solutions/support-teams",
            icon: Headphones,
            iconGradient: "from-[#22D3EE] to-[#046BD2]",
          },
          {
            label: "Remote Teams",
            description: "One seat that works on web, mobile and desktop.",
            href: "/solutions/remote-teams",
            icon: Users,
            iconGradient: "from-[#046BD2] to-[#0078E0]",
          },
          {
            label: "Logistics & Transport",
            description: "Dispatch, alerts and driver routing across regions.",
            href: "/solutions/logistics",
            icon: Truck,
            iconGradient: "from-[#2575FC] to-[#0086F9]",
          },
          {
            label: "Enterprise IT",
            description: "SSO, SCIM, audit logs and dedicated routing.",
            href: "/solutions/enterprise-it",
            icon: Settings,
            iconGradient: "from-[#0086F9] to-[#046BD2]",
          },
        ],
      },
    ],
  },
  Integrations: {
    columns: [
      {
        items: [
          {
            label: "HubSpot",
            description: "Two-way CRM sync, click-to-call and AI call summaries.",
            href: "/integrations/hubspot",
            icon: Building2,
            iconGradient: "from-[#046BD2] to-[#22D3EE]",
          },
          {
            label: "Zoho CRM",
            description: "Automate sales workflows and log every call automatically.",
            href: "/integrations/zoho",
            icon: Building2,
            iconGradient: "from-[#0078E0] to-[#0086F9]",
          },
        ],
      },
    ],
  },
  Resources: {
    columns: [
      {
        items: [
          {
            label: "Blog",
            description: "Product updates, playbooks and industry trends.",
            href: "/blog",
            icon: MessageSquare,
            iconGradient: "from-[#22D3EE] to-[#0086F9]",
          },
          {
            label: "Documentation",
            description: "Guides, references and step-by-step setup.",
            href: "/docs",
            icon: Building2,
            iconGradient: "from-[#046BD2] to-[#0078E0]",
          },
          {
            label: "API Reference",
            description: "REST and webhooks to embed Rozper anywhere.",
            href: "/docs/api",
            icon: Settings,
            iconGradient: "from-[#2575FC] to-[#22D3EE]",
          },
          {
            label: "Contact Sales",
            description: "Talk to a specialist about volume pricing.",
            href: "/contact",
            icon: Phone,
            iconGradient: "from-[#0086F9] to-[#046BD2]",
          },
          {
            label: "Status Page",
            description: "Real-time uptime and incident history.",
            href: "/status",
            icon: BarChart3,
            iconGradient: "from-[#22D3EE] to-[#046BD2]",
          },
        ],
      },
    ],
  },
};

const topLevelNav = [
  { label: "Products", megaMenu: "Products" },
  { label: "Solutions", megaMenu: "Solutions" },
  { label: "Integrations", megaMenu: "Integrations" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", megaMenu: "Resources" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuTimeout, setMenuTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuEnter = (menuName: string) => {
    if (menuTimeout) clearTimeout(menuTimeout);
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    const timeout = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
    setMenuTimeout(timeout);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B1220]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-[#0B1220]/60 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/white-rozper-logo.png"
                  alt="Rozper"
                  width={160}
                  height={50}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </motion.div>

            {/* Center: Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {topLevelNav.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() =>
                    item.megaMenu && handleMenuEnter(item.megaMenu)
                  }
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={item.href ?? "/"}
                    className="text-white/90 hover:text-white font-normal text-sm flex items-center gap-1 transition-colors hover:-translate-y-px"
                  >
                    {item.label}
                    {item.megaMenu && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {item.megaMenu && activeMenu === item.megaMenu && (() => {
                      const cfg = megaMenuConfig[item.megaMenu as keyof typeof megaMenuConfig];
                      const allItems = cfg.columns.flatMap((c) => c.items);
                      const itemCount = allItems.length;
                      const panelWidth =
                        itemCount <= 2 ? "560px" : itemCount <= 5 ? "720px" : "880px";
                      const gridCols = itemCount <= 2 ? 1 : itemCount <= 5 ? 2 : 3;

                      return (
                        <motion.div
                          key={item.megaMenu}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="fixed left-1/2 -translate-x-1/2 top-[72px] z-50"
                          style={{
                            width: `min(calc(100vw - 2rem), ${panelWidth})`,
                          }}
                          onMouseEnter={() => handleMenuEnter(item.megaMenu!)}
                          onMouseLeave={handleMenuLeave}
                        >
                          {/* Gradient halo */}
                          <div
                            aria-hidden
                            className="absolute -inset-4 -z-10 rounded-3xl opacity-70 blur-2xl pointer-events-none"
                            style={{
                              background:
                                "radial-gradient(60% 60% at 50% 0%, rgba(4,107,210,0.35) 0%, rgba(34,211,238,0.10) 45%, transparent 75%)",
                            }}
                          />

                          {/* Panel */}
                          <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/30 to-white/5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                            <div className="rounded-2xl bg-[#0A1020]/95 backdrop-blur-2xl overflow-hidden">
                              {/* Top accent strip */}
                              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#046BD2]/60 to-transparent" />

                              {/* Card grid */}
                              <div className="p-5">
                                <div
                                  className="grid gap-3"
                                  style={{
                                    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                                  }}
                                >
                                  {allItems.map((menuItem, itemIdx) => {
                                    const IconComponent = menuItem.icon;
                                    return (
                                      <Link
                                        key={itemIdx}
                                        href={menuItem.href ?? "/"}
                                        className="group/item relative flex gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 p-3.5 transition-colors"
                                      >
                                        {IconComponent && (
                                          <span
                                            className={`relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${
                                              menuItem.iconGradient ??
                                              "from-[#046BD2] to-[#22D3EE]"
                                            } shadow-[0_8px_24px_-8px_rgba(4,107,210,0.6)] shrink-0`}
                                          >
                                            <IconComponent className="w-4 h-4 text-white" />
                                          </span>
                                        )}
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="text-sm font-medium text-white leading-tight">
                                              {menuItem.label}
                                            </span>
                                            {menuItem.badge && (
                                              <span
                                                className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-semibold uppercase tracking-wider ${
                                                  menuItem.badge === "New"
                                                    ? "bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30"
                                                    : menuItem.badge === "AI"
                                                    ? "bg-[#046BD2]/15 text-[#0086F9] border border-[#0086F9]/30"
                                                    : menuItem.badge === "Beta"
                                                    ? "bg-[#2575FC]/15 text-[#2D98F1] border border-[#2D98F1]/30"
                                                    : "bg-emerald-500/15 text-emerald-400 border border-emerald-400/30"
                                                }`}
                                              >
                                                {menuItem.badge}
                                              </span>
                                            )}
                                          </div>
                                          {(menuItem.description ||
                                            menuItem.subtitle) && (
                                            <p className="mt-1.5 text-xs text-white/55 leading-relaxed line-clamp-2">
                                              {menuItem.description ??
                                                menuItem.subtitle}
                                            </p>
                                          )}
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right: CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                className="bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm font-medium h-9 px-5 rounded-lg shadow-[0_0_24px_-8px_rgba(4,107,210,0.7)]"
                asChild
              >
                <Link href="/contact">Start a free trial</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 w-full h-screen bg-[#0B1220] z-40 md:hidden overflow-y-auto flex flex-col"
          >
            {/* Subtle background glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-0"
              style={{
                background:
                  "radial-gradient(60% 40% at 100% 0%, rgba(4,107,210,0.25) 0%, transparent 70%)",
              }}
            />

            {/* Mobile Header */}
            <div className="relative flex items-center justify-between h-16 px-6 border-b border-white/10">
              <Image
                src="/images/white-rozper-logo.png"
                alt="Rozper"
                width={130}
                height={40}
                className="h-9 w-auto"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="relative flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {topLevelNav.map((item) => (
                <div key={item.label}>
                  {item.megaMenu ? (
                    <details className="group rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between px-3 py-3 cursor-pointer text-white font-medium text-base list-none rounded-xl hover:bg-white/[0.04] transition-colors">
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4 text-white/50 group-open:rotate-180 group-open:text-[#22D3EE] transition-transform" />
                      </summary>
                      <div className="px-1 pb-3 pt-2">
                        <ul className="space-y-1">
                          {megaMenuConfig[
                            item.megaMenu as keyof typeof megaMenuConfig
                          ].columns
                            .flatMap((c) => c.items)
                            .map((subitem, subIdx) => {
                              const IconComponent = subitem.icon;
                              return (
                                <li key={subIdx}>
                                  <Link
                                    href={subitem.href ?? "/"}
                                    className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm text-white/85 hover:text-white hover:bg-white/[0.04] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {IconComponent && (
                                      <span
                                        className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${
                                          subitem.iconGradient ??
                                          "from-[#046BD2] to-[#22D3EE]"
                                        } shrink-0`}
                                      >
                                        <IconComponent className="w-4 h-4 text-white" />
                                      </span>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="text-sm font-medium text-white">
                                          {subitem.label}
                                        </span>
                                        {subitem.badge && (
                                          <span
                                            className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-semibold uppercase tracking-wider ${
                                              subitem.badge === "New"
                                                ? "bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30"
                                                : subitem.badge === "AI"
                                                ? "bg-[#046BD2]/15 text-[#0086F9] border border-[#0086F9]/30"
                                                : subitem.badge === "Beta"
                                                ? "bg-[#2575FC]/15 text-[#2D98F1] border border-[#2D98F1]/30"
                                                : "bg-emerald-500/15 text-emerald-400 border border-emerald-400/30"
                                            }`}
                                          >
                                            {subitem.badge}
                                          </span>
                                        )}
                                      </div>
                                      {(subitem.description || subitem.subtitle) && (
                                        <p className="mt-0.5 text-xs text-white/50 leading-snug">
                                          {subitem.description ?? subitem.subtitle}
                                        </p>
                                      )}
                                    </div>
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={item.href ?? "/"}
                      className="block px-3 py-3 text-white font-medium text-base rounded-xl hover:bg-white/[0.04] hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA Section */}
            <div className="relative border-t border-white/10 px-6 py-4 sticky bottom-0 bg-[#0B1220]">
              <Button
                className="w-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-medium h-12 rounded-xl shadow-[0_0_30px_-10px_rgba(4,107,210,0.7)]"
                asChild
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Start a free trial
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
