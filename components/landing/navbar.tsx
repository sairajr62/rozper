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
  Eye,
  FileText,
  Hash,
  PhoneIncoming,
  Zap,
  Shield,
  BookOpen,
  Database,
  Activity,
  Layers,
  Cpu,
  Target,
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

// Mega menu configuration
const megaMenuConfig: Record<string, { columns: MenuColumn[]; sectioned?: boolean; width?: string }> = {
  Products: {
    sectioned: true,
    columns: [
      {
        title: "Unified Communication",
        items: [
          {
            label: "Unified Communications",
            description: "Voice, video, chat and SMS unified for every seat.",
            href: "/products/ucaas",
            icon: Layers,
            iconGradient: "from-[#0078E0] to-[#2575FC]",
            badge: "New",
          },
          {
            label: "Business Phone System",
            description: "Cloud PBX with IVR, recording and porting in 150+ countries.",
            href: "/products/ucaas/business-phone-system",
            icon: Building2,
            iconGradient: "from-[#2575FC] to-[#046BD2]",
          },
          {
            label: "HD Video Meetings",
            description: "1080p video, screen share, recording and noise suppression.",
            href: "/products/ucaas/hd-video-meetings",
            icon: Video,
            iconGradient: "from-[#046BD2] to-[#0078E0]",
          },
          {
            label: "Business SMS & MMS",
            description: "Two-way messaging, MMS and bulk campaign sending.",
            href: "/products/ucaas/business-sms-mms",
            icon: MessageCircle,
            iconGradient: "from-[#2575FC] to-[#22D3EE]",
          },
          {
            label: "Team Chat",
            description: "Channels, DMs and file sharing for internal teams.",
            href: "/products/ucaas/team-chat",
            icon: Hash,
            iconGradient: "from-[#0086F9] to-[#2575FC]",
          },
          {
            label: "Online Fax",
            description: "Send and receive faxes from any device, no hardware needed.",
            href: "/products/ucaas/online-fax",
            icon: FileText,
            iconGradient: "from-[#046BD2] to-[#22D3EE]",
          },
          {
            label: "Website Chatbot",
            description: "Convert visitors with LLM-powered chat and human handoff.",
            href: "/products/ucaas/website-chatbot",
            icon: MessageSquare,
            iconGradient: "from-[#0086F9] to-[#22D3EE]",
          },
        ],
      },
      {
        title: "Contact Center",
        items: [
          {
            label: "Cloud Contact Center",
            description: "AI-powered omnichannel CX with dialers and analytics.",
            href: "/products/contact-center",
            icon: Phone,
            iconGradient: "from-[#046BD2] to-[#22D3EE]",
          },
          {
            label: "Omnichannel Inbox",
            description: "One inbox for voice, email, SMS, WhatsApp and web chat.",
            href: "/products/contact-center/omnichannel",
            icon: Inbox,
            iconGradient: "from-[#0078E0] to-[#046BD2]",
          },
          {
            label: "Outbound Dialer",
            description: "Power, predictive and preview dialers for max connect rate.",
            href: "/products/contact-center/outbound-dialer",
            icon: PhoneOutgoing,
            iconGradient: "from-[#22D3EE] to-[#2575FC]",
          },
          {
            label: "Supervisor Tools",
            description: "Monitor, whisper and barge with live AI escalation alerts.",
            href: "/products/contact-center/supervisor-tools",
            icon: Eye,
            iconGradient: "from-[#2575FC] to-[#0086F9]",
          },
          {
            label: "Analytics & Reporting",
            description: "Real-time dashboards, CSAT scoring and call analytics.",
            href: "/products/contact-center/interaction-analytics",
            icon: BarChart3,
            iconGradient: "from-[#0086F9] to-[#046BD2]",
          },
        ],
      },
      {
        title: "AI Features",
        items: [
          {
            label: "AI Overview",
            description: "The full suite of Rozper AI capabilities in one place.",
            href: "/products/ai",
            icon: Cpu,
            iconGradient: "from-[#22D3EE] to-[#0086F9]",
            badge: "AI",
          },
          {
            label: "AI Receptionist",
            description: "24/7 autonomous calls — captures intent, qualifies leads.",
            href: "/products/ai/receptionist",
            icon: Bot,
            iconGradient: "from-[#22D3EE] to-[#0086F9]",
            badge: "AI",
          },
          {
            label: "AI Assistant",
            description: "Real-time agent guidance, summaries and next-best-action.",
            href: "/products/ucaas/ai-assistant",
            icon: Brain,
            iconGradient: "from-[#0086F9] to-[#2575FC]",
            badge: "AI",
          },
          {
            label: "Customer Engagement",
            description: "AI-driven campaigns, scoring and proactive outreach.",
            href: "/products/ucaas/customer-engagement",
            icon: Target,
            iconGradient: "from-[#2575FC] to-[#22D3EE]",
          },
        ],
      },
    ],
  },
  Solutions: {
    sectioned: true,
    width: "780px",
    columns: [
      {
        title: "By Industry",
        items: [
          {
            label: "Healthcare",
            description: "HIPAA-aligned voice, SMS and AI for patient teams.",
            href: "/solutions/healthcare",
            icon: Activity,
            iconGradient: "from-[#22D3EE] to-[#0086F9]",
          },
          {
            label: "Financial Services",
            description: "Compliant calling, recording and dialers for banks and fintechs.",
            href: "/solutions/financial-services",
            icon: Building2,
            iconGradient: "from-[#046BD2] to-[#2575FC]",
          },
          {
            label: "Retail & eCommerce",
            description: "Drive conversions across SMS, chat, voice and WhatsApp.",
            href: "/solutions/retail-ecommerce",
            icon: Globe2,
            iconGradient: "from-[#0086F9] to-[#22D3EE]",
          },
          {
            label: "SaaS & Technology",
            description: "Embed calling and SMS in your product with our SDKs.",
            href: "/solutions/saas-tech",
            icon: Settings,
            iconGradient: "from-[#2575FC] to-[#046BD2]",
          },
          {
            label: "Logistics & Transport",
            description: "Dispatch, alerts and driver routing across regions.",
            href: "/solutions/logistics",
            icon: Truck,
            iconGradient: "from-[#2575FC] to-[#0086F9]",
          },
        ],
      },
      {
        title: "By Team",
        items: [
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
            label: "Enterprise IT",
            description: "SSO, SCIM, audit logs and dedicated routing.",
            href: "/solutions/enterprise-ucaas",
            icon: Shield,
            iconGradient: "from-[#0086F9] to-[#046BD2]",
          },
        ],
      },
    ],
  },
  Integrations: {
    sectioned: true,
    width: "420px",
    columns: [
      {
        title: "CRM & Tools",
        items: [
          {
            label: "HubSpot",
            description: "Two-way CRM sync, click-to-call and AI call summaries.",
            href: "/integrations/hubspot",
            icon: Building2,
            iconGradient: "from-[#046BD2] to-[#0086F9]",
          },
          {
            label: "Zoho CRM",
            description: "Automate sales workflows and log every call automatically.",
            href: "/integrations/zoho",
            icon: Database,
            iconGradient: "from-[#0086F9] to-[#22D3EE]",
          },
        ],
      },
    ],
  },
  Resources: {
    sectioned: true,
    width: "660px",
    columns: [
      {
        title: "Learn",
        items: [
          {
            label: "Blog",
            description: "Product updates, playbooks and industry trends.",
            href: "/blog",
            icon: BookOpen,
            iconGradient: "from-[#22D3EE] to-[#0086F9]",
          },
          {
            label: "Documentation",
            description: "Guides, references and step-by-step setup.",
            href: "/docs",
            icon: FileText,
            iconGradient: "from-[#046BD2] to-[#0078E0]",
          },
          {
            label: "API Reference",
            description: "REST and webhooks to embed Rozper anywhere.",
            href: "/docs/api",
            icon: Settings,
            iconGradient: "from-[#2575FC] to-[#22D3EE]",
          },
        ],
      },
      {
        title: "Company",
        items: [
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
            icon: Activity,
            iconGradient: "from-[#22D3EE] to-[#046BD2]",
          },
          {
            label: "Security",
            description: "SOC 2 Type II, HIPAA BAA and trust documentation.",
            href: "/security",
            icon: Shield,
            iconGradient: "from-[#046BD2] to-[#2575FC]",
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
                  sizes="(max-width: 640px) 120px, 160px"
                  className="h-8 sm:h-10 w-auto max-w-[120px] sm:max-w-[160px]"
                  priority
                />
              </Link>
            </motion.div>

            {/* Center: Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
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
                      const isSectioned = cfg.sectioned === true;

                      if (isSectioned) {
                        /* ── Sectioned Products layout (3 columns with titles) ── */
                        return (
                          <motion.div
                            key={item.megaMenu}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed left-1/2 -translate-x-1/2 top-[72px] z-50"
                            style={{ width: `min(calc(100vw - 2rem), ${cfg.width ?? "960px"})` }}
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
                                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#046BD2]/60 to-transparent" />
                                <div className="flex divide-x divide-white/[0.06]">
                                  {cfg.columns.map((col, colIdx) => (
                                    <div key={colIdx} className="flex-1 min-w-0 p-4">
                                      {/* Section title */}
                                      <p className="px-2 pb-2.5 text-[10px] font-semibold uppercase tracking-widest text-white/35 select-none">
                                        {col.title}
                                      </p>
                                      {/* Items */}
                                      <ul className="space-y-0.5">
                                        {col.items.map((menuItem, itemIdx) => {
                                          const IconComponent = menuItem.icon;
                                          return (
                                            <li key={itemIdx}>
                                              <Link
                                                href={menuItem.href ?? "/"}
                                                className="group/item flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/[0.05] transition-colors"
                                              >
                                                {IconComponent && (
                                                  <span
                                                    className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${
                                                      menuItem.iconGradient ?? "from-[#046BD2] to-[#22D3EE]"
                                                    } shrink-0`}
                                                  >
                                                    <IconComponent className="w-3.5 h-3.5 text-white" />
                                                  </span>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                  <div className="flex items-center gap-1.5">
                                                    <span className="text-sm font-medium text-white/90 group-hover/item:text-white leading-tight transition-colors">
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
                                                  {menuItem.description && (
                                                    <p className="text-[11px] text-white/45 leading-snug mt-0.5 line-clamp-1">
                                                      {menuItem.description}
                                                    </p>
                                                  )}
                                                </div>
                                              </Link>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      }

                      /* ── Standard card-grid layout (Solutions, Resources, etc.) ── */
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
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/[0.06] text-sm font-medium h-9 px-4 rounded-lg"
                asChild
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button
                className="bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm font-medium h-9 px-5 rounded-lg shadow-[0_0_24px_-8px_rgba(4,107,210,0.7)]"
                asChild
              >
                <Link href="/free-trial">Start a free trial</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white active:scale-95 transition-transform"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu — drops below navbar, keeps hamburger visible */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop — closes menu on tap outside */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 top-[72px] z-[39] lg:hidden bg-black/30"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown panel */}
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[72px] left-0 right-0 z-40 lg:hidden max-h-[calc(100vh-72px)] overflow-y-auto bg-[#0B1220] border-b border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)]"
            >
              {/* Nav items */}
              <div className="px-4 py-3 space-y-0.5">
                {topLevelNav.map((item) => (
                  <div key={item.label}>
                    {item.megaMenu ? (
                      <details className="group">
                        <summary className="flex items-center justify-between px-3 py-3 cursor-pointer text-white font-medium text-base list-none rounded-xl hover:bg-white/[0.04] transition-colors">
                          <span>{item.label}</span>
                          <ChevronDown className="w-4 h-4 text-white/50 group-open:rotate-180 group-open:text-[#22D3EE] transition-transform duration-200" />
                        </summary>
                        <div className="px-1 pb-2 pt-0.5">
                          {megaMenuConfig[item.megaMenu as keyof typeof megaMenuConfig].sectioned ? (
                            <div className="space-y-2">
                              {megaMenuConfig[item.megaMenu as keyof typeof megaMenuConfig].columns.map((col, colIdx) => (
                                <div key={colIdx}>
                                  <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/35">
                                    {col.title}
                                  </p>
                                  <ul className="space-y-0.5">
                                    {col.items.map((subitem, subIdx) => {
                                      const IconComponent = subitem.icon;
                                      return (
                                        <li key={subIdx}>
                                          <Link
                                            href={subitem.href ?? "/"}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/[0.04] transition-colors"
                                            onClick={() => setIsOpen(false)}
                                          >
                                            {IconComponent && (
                                              <span className={`flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br ${subitem.iconGradient ?? "from-[#046BD2] to-[#22D3EE]"} shrink-0`}>
                                                <IconComponent className="w-3.5 h-3.5 text-white" />
                                              </span>
                                            )}
                                            <span className="font-medium text-white">{subitem.label}</span>
                                            {subitem.badge && (
                                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-semibold uppercase tracking-wider ${
                                                subitem.badge === "New" ? "bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30"
                                                : subitem.badge === "AI" ? "bg-[#046BD2]/15 text-[#0086F9] border border-[#0086F9]/30"
                                                : "bg-emerald-500/15 text-emerald-400 border border-emerald-400/30"
                                              }`}>{subitem.badge}</span>
                                            )}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-0.5">
                              {megaMenuConfig[item.megaMenu as keyof typeof megaMenuConfig].columns
                                .flatMap((c) => c.items)
                                .map((subitem, subIdx) => {
                                  const IconComponent = subitem.icon;
                                  return (
                                    <li key={subIdx}>
                                      <Link
                                        href={subitem.href ?? "/"}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/[0.04] transition-colors"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {IconComponent && (
                                          <span className={`flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br ${subitem.iconGradient ?? "from-[#046BD2] to-[#22D3EE]"} shrink-0`}>
                                            <IconComponent className="w-3.5 h-3.5 text-white" />
                                          </span>
                                        )}
                                        <span className="font-medium text-white">{subitem.label}</span>
                                        {subitem.badge && (
                                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-semibold uppercase tracking-wider ${
                                            subitem.badge === "New" ? "bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30"
                                            : subitem.badge === "AI" ? "bg-[#046BD2]/15 text-[#0086F9] border border-[#0086F9]/30"
                                            : subitem.badge === "Beta" ? "bg-[#2575FC]/15 text-[#2D98F1] border border-[#2D98F1]/30"
                                            : "bg-emerald-500/15 text-emerald-400 border border-emerald-400/30"
                                          }`}>{subitem.badge}</span>
                                        )}
                                      </Link>
                                    </li>
                                  );
                                })}
                            </ul>
                          )}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.href ?? "/"}
                        className="block px-3 py-3 text-white font-medium text-base rounded-xl hover:bg-white/[0.04] transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-4 pt-2 pb-4 border-t border-white/10 flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full border-white/15 bg-white/[0.04] hover:bg-white/10 text-white font-medium h-11 rounded-xl"
                  asChild
                >
                  <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button
                  className="w-full bg-[#046BD2] hover:bg-[#0078E0] text-white font-medium h-11 rounded-xl"
                  asChild
                >
                  <Link href="/free-trial" onClick={() => setIsOpen(false)}>
                    Start a free trial
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
