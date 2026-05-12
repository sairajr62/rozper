"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
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
  Eye,
  Mic,
  Settings,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ComponentType } from "react";

type MenuItem = {
  label: string;
  subtitle?: string;
  href?: string;
  icon?: ComponentType<{ className?: string }>;
  badge?: string;
};

type MenuColumn = {
  title: string;
  featured?: boolean;
  items?: MenuItem[];
  headline?: string;
  description?: string;
  quote?: string;
  attribution?: string;
  ctaText?: string;
  ctaHref?: string;
};

// Mega menu configuration matching the design
const megaMenuConfig: Record<string, { columns: MenuColumn[] }> = {
  Products: {
    columns: [
      {
        title: "CORE PRODUCTS",
        items: [
          { label: "Cloud Contact Center", subtitle: "AI-powered omnichannel CX", href: "/products/contact-center", icon: Phone },
          { label: "Unified Communications", subtitle: "Voice, video, chat in one", href: "/products/ucaas", icon: Users },
          { label: "Business Phone System", subtitle: "Cloud PBX for teams", href: "/products/ucaas/business-phone", icon: Building2 },
          { label: "AI Voice Agent", subtitle: "24/7 autonomous calls", href: "/products/ai/receptionist", icon: Bot },
          { label: "Website Chatbot", subtitle: "Convert visitors instantly", href: "/products/ucaas/website-chatbot", icon: MessageSquare },
          { label: "Wholesale Voice", subtitle: "Carrier-grade routing", href: "/solutions/wholesale", icon: PhoneCall },
          { label: "Wholesale VOIP", subtitle: "Carrier-grade VoIP termination", href: "/wholesale-voip", icon: Globe2 },
        ],
      },
      {
        title: "FEATURES & CHANNELS",
        items: [
          { label: "HD Video Meetings", href: "/products/ucaas/video-meetings", icon: Video },
          { label: "Business SMS & MMS", href: "/products/ucaas/sms-mms", icon: MessageCircle },
          { label: "Team Chat", href: "/products/ucaas/team-chat", icon: MessageSquare },
          { label: "Omnichannel Inbox", href: "/products/contact-center/omnichannel", icon: Inbox },
          { label: "Predictive Dialer", href: "/products/contact-center/outbound-dialer", icon: PhoneOutgoing },
        ],
      },
      {
        title: "INTELLIGENCE & TOOLS",
        items: [
          { label: "AI Sentiment Analysis", href: "/features/ai-sentiment", icon: Brain },
          { label: "AI Agent Assist", href: "/features/ai-agent-assist", icon: Headphones },
          { label: "Conversation Intelligence", href: "/features/conversation-intelligence", icon: BarChart3 },
          { label: "Call Monitoring & Barge", href: "/features/supervisor-tools", icon: Eye },
          { label: "Call Recording", href: "/features/call-recording", icon: Mic },
          { label: "Auto Attendant & IVR", href: "/features/auto-attendant", icon: Phone },
        ],
      },
      {
        title: "Featured",
        featured: true,
        headline: "AI Contact Center + Cloud Phone",
        description: "NLP routing, real-time analytics, and 100+ integrations — on one unified platform.",
        ctaText: "Learn more",
        ctaHref: "/products/contact-center",
      },
    ],
  },
  Solutions: {
    columns: [
      {
        title: "BY INDUSTRY",
        items: [
          {
            label: "Healthcare",
            href: "/solutions/healthcare",
            icon: Building2,
          },
          {
            label: "Financial Services",
            href: "/solutions/finance",
            icon: Building2,
          },
          {
            label: "Retail & eCommerce",
            href: "/solutions/retail",
            icon: Building2,
          },
          {
            label: "SaaS & Technology",
            href: "/solutions/saas",
            icon: Building2,
          },
          {
            label: "Logistics & Transport",
            href: "/solutions/logistics",
            icon: Truck,
          },
        ],
      },
      {
        title: "BY TEAM",
        items: [
          {
            label: "Sales Teams",
            href: "/solutions/sales-teams",
            icon: PhoneOutgoing,
          },
          {
            label: "Support Teams",
            href: "/solutions/support-teams",
            icon: Headphones,
          },
          {
            label: "Remote Teams",
            href: "/solutions/remote-teams",
            icon: Users,
          },
          { label: "Small Business", href: "/solutions/smb", icon: Building2 },
          {
            label: "Enterprise IT",
            href: "/solutions/enterprise-it",
            icon: Settings,
          },
        ],
      },
      /* BY USE CASE — hidden
      {
        title: "BY USE CASE",
        items: [
          {
            label: "Inbound Contact Center",
            href: "/solutions/inbound",
            icon: Phone,
          },
          {
            label: "Outbound Sales",
            href: "/solutions/outbound",
            icon: PhoneOutgoing,
          },
          {
            label: "Customer Support",
            href: "/solutions/support",
            icon: Headphones,
          },
          { label: "Remote Work", href: "/solutions/remote", icon: Users },
          {
            label: "International Expansion",
            href: "/solutions/international",
            icon: Truck,
          },
        ],
      },
      */
      {
        title: "Featured",
        featured: true,
        quote: '"We cut costs 40% and improved CSAT by 25 points in 90 days."',
        attribution: "Sarah Chen, VP Operations — TechFlow Inc.",
        ctaText: "Read the story",
        ctaHref: "/customers",
      },
    ],
  },
  Resources: {
    columns: [
      {
        title: "LEARN",
        items: [
          { label: "Blog", href: "/blog", icon: MessageSquare },
          {
            label: "Guides & Ebooks",
            href: "/resources/guides",
            icon: Building2,
          },
          { label: "Webinars", href: "/resources/webinars", icon: Video },
          {
            label: "VoIP Glossary",
            href: "/resources/glossary",
            icon: MessageCircle,
          },
        ],
      },
      {
        title: "BUILD",
        items: [
          { label: "Documentation", href: "/docs", icon: Building2 },
          { label: "API Reference", href: "/docs/api", icon: Settings },
          { label: "SDKs & Libraries", href: "/docs/sdks", icon: Settings },
          { label: "Changelog", href: "/changelog", icon: MessageSquare },
        ],
      },
      {
        title: "SUPPORT",
        items: [
          { label: "Help Center", href: "/support", icon: Headphones },
          { label: "Status Page", href: "/status", icon: BarChart3 },
          { label: "Contact Sales", href: "/contact", icon: Phone },
          { label: "Security & Compliance", href: "/security", icon: Settings },
        ],
      },
    ],
  },
};

const topLevelNav = [
  { label: "Products", megaMenu: "Products" },
  { label: "Solutions", megaMenu: "Solutions" },
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
                  {item.megaMenu && activeMenu === item.megaMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="fixed left-1/2 -translate-x-1/2 top-[80px] bg-white border border-gray-200 rounded-lg shadow-xl"
                      style={{
                        width: `min(calc(100vw - 2rem), ${item.megaMenu === "Resources" ? "800px" : "1000px"})`,
                      }}
                      onMouseEnter={() => handleMenuEnter(item.megaMenu!)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div
                        className="grid gap-0 p-6"
                        style={{
                          gridTemplateColumns: `repeat(${megaMenuConfig[item.megaMenu as keyof typeof megaMenuConfig].columns.length}, 1fr)`,
                        }}
                      >
                        {megaMenuConfig[
                          item.megaMenu as keyof typeof megaMenuConfig
                        ].columns.map((column, idx) => (
                          <div
                            key={idx}
                            className={`px-4 ${idx < megaMenuConfig[item.megaMenu as keyof typeof megaMenuConfig].columns.length - 1 ? "border-r border-gray-100" : ""}`}
                          >
                            {column.featured ? (
                              <div className="bg-[#F0F7FF] border border-[#D1E5FA] p-5 rounded-lg h-full">
                                <div className="flex items-center gap-1.5 mb-3">
                                  <Star className="w-4 h-4 text-[#046BD2] fill-[#046BD2]" />
                                  <span className="text-xs font-semibold text-[#046BD2] uppercase tracking-wide">
                                    Featured
                                  </span>
                                </div>
                                {column.headline && (
                                  <h3 className="font-bold text-gray-900 text-base mb-2">
                                    {column.headline}
                                  </h3>
                                )}
                                {column.description && (
                                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                    {column.description}
                                  </p>
                                )}
                                {column.quote && (
                                  <>
                                    <p className="text-sm italic text-gray-700 mb-2">
                                      {column.quote}
                                    </p>
                                    {column.attribution && (
                                      <p className="text-xs text-gray-500 mb-4">
                                        {column.attribution}
                                      </p>
                                    )}
                                  </>
                                )}
                                <Link
                                  href={column.ctaHref ?? "/"}
                                  className="text-sm font-semibold text-[#046BD2] hover:text-[#0078E0] transition-colors inline-flex items-center gap-1"
                                >
                                  {column.ctaText} <span>→</span>
                                </Link>
                              </div>
                            ) : (
                              <>
                                <h4 className="font-bold text-[#046BD2] text-xs uppercase tracking-wider mb-4">
                                  {column.title}
                                </h4>
                                <ul className="space-y-2.5">
                                  {column.items?.map((menuItem, itemIdx) => {
                                    const IconComponent = menuItem.icon;
                                    return (
                                      <li key={itemIdx}>
                                        <Link
                                          href={menuItem.href ?? "/"}
                                          className="flex items-start gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors hover:translate-x-0.5 group"
                                        >
                                          {IconComponent && (
                                            <IconComponent className="w-5 h-5 text-[#046BD2] flex-shrink-0 mt-0.5" />
                                          )}
                                          <div>
                                            <span className="font-medium">
                                              {menuItem.label}
                                            </span>
                                            {menuItem.subtitle && (
                                              <span className="block text-xs text-gray-500 mt-0.5">
                                                {menuItem.subtitle}
                                              </span>
                                            )}
                                          </div>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/sign-in"
                className="text-white/90 hover:text-white text-sm font-normal transition-colors hover:-translate-y-px"
              >
                Sign in
              </Link>
              <Button
                className="bg-[#1A3C5E] hover:bg-[#162d45] text-white text-sm font-medium h-9 px-5 rounded"
                asChild
              >
                <Link href="/get-started">Get started</Link>
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
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full h-screen bg-white z-40 md:hidden overflow-y-auto flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-[#E5E5E5]">
              <div className="text-lg font-bold text-gray-900">
                Roz<span className="text-[#1A3C5E]">per</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-900"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
              {topLevelNav.map((item) => (
                <div key={item.label}>
                  {item.megaMenu ? (
                    <details className="group">
                      <summary className="flex items-center justify-between py-3 cursor-pointer text-gray-900 font-medium text-base hover:text-[#1A3C5E] transition-colors">
                        {item.label}
                        <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="pl-4 space-y-3 pb-4">
                        {megaMenuConfig[
                          item.megaMenu as keyof typeof megaMenuConfig
                        ].columns.map((column, idx) => (
                          <div key={idx}>
                            {!column.featured && (
                              <>
                                <h4 className="font-semibold text-xs uppercase text-gray-700 mb-2">
                                  {column.title}
                                </h4>
                                <ul className="space-y-2">
                                  {column.items?.map((subitem, subIdx) => (
                                    <li key={subIdx}>
                                      <Link
                                        href={subitem.href ?? "/"}
                                        className="text-sm text-gray-600 hover:text-[#1A3C5E] transition-colors block"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {subitem.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={item.href ?? "/"}
                      className="block py-3 text-gray-900 font-medium text-base hover:text-[#1A3C5E] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA Section */}
            <div className="border-t border-[#E5E5E5] px-6 py-4 space-y-3 sticky bottom-0 bg-white">
              <Link
                href="/sign-in"
                className="block py-3 text-center text-gray-700 text-sm font-medium hover:text-[#1A3C5E] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
              <Button
                className="w-full bg-[#1A3C5E] hover:bg-[#162d45] text-white font-medium h-12 rounded"
                asChild
              >
                <Link href="/get-started" onClick={() => setIsOpen(false)}>
                  Get started
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
