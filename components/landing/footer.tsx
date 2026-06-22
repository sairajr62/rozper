'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, Linkedin, Twitter, Facebook } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const footerColumns = [
  {
    title: 'Unified Communication',
    href: '/products/unified-communications',
    links: [
      { label: 'Business Phone System', href: '/products/unified-communications/business-phone' },
      { label: 'HD Video Meetings', href: '/products/unified-communications/video-meetings' },
      { label: 'Business SMS & MMS', href: '/products/unified-communications/sms-mms' },
      { label: 'Team Chat', href: '/products/unified-communications/team-chat' },
    ],
  },
  {
    title: 'Contact Center',
    href: '/products/contact-center',
    links: [
      { label: 'Omnichannel Inbox', href: '/products/contact-center/omnichannel' },
      { label: 'Outbound Dialer', href: '/products/contact-center/outbound-dialer' },
      { label: 'Supervisor Tools', href: '/products/contact-center/supervisor-tools' },
    ],
  },
  {
    title: 'AI Features',
    href: '/products/ai',
    links: [
      { label: 'AI Receptionist', href: '/products/ai/receptionist' },
      { label: 'AI Assistant', href: '/products/unified-communications/ai-assistant' },
      { label: 'Customer Engagement', href: '/products/unified-communications/customer-engagement' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'HubSpot Integration', href: '/integrations/hubspot' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Status', href: '/status' },
      { label: 'Blog', href: '/blog' },
      { label: 'Security', href: '/security' },
    ],
  },
]

type Social = { Icon: LucideIcon; label: string; href?: string }

const socials: Social[] = [
  { Icon: Linkedin, href: 'https://linkedin.com/company/rozper', label: 'LinkedIn' },
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Facebook, label: 'Facebook' },
]

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative bg-[#070B14] overflow-x-hidden overflow-y-visible"
    >
      {/* Top hairline gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#046BD2]/50 to-transparent" />

      {/* Faint background grid */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 70% 80% at 50% 0%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 80% at 50% 0%, black 30%, transparent 80%)',
        }}
      />

      {/* Main */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/*
          Fix #1 & #5: Replace the problematic sm:grid-cols-2 breakpoint with a layout that
          avoids cramming 5 link columns into a 2-col grid at sm. Use a single-column layout
          on mobile/sm, then jump straight to the 12-col grid at lg. Reduce sm-breakpoint gap
          to sm:gap-6 to prevent wide horizontal spacing at the 2-col size.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Brand */}
          {/*
            Fix #4 & #6: Add min-w-0 to allow proper flex shrinking; constrain max-w-md
            only at sm+ so the paragraph fills its column naturally on mobile.
          */}
          <div className="col-span-1 lg:col-span-4 min-w-0">
            <Image
              src="/images/white-rozper-logo.png"
              alt="Rozper"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
            {/*
              Fix #6: Remove unconditional max-w-md so text wraps naturally in narrow columns.
              Apply max-w-md only at sm+ where there is enough width.
            */}
            <p className="mt-5 text-sm text-[#9AA8BC] leading-relaxed sm:max-w-md">
              Carrier-grade unified communications, cloud contact center, and
              wholesale VoIP — one platform built to scale.
            </p>

            {/* Social */}
            {/*
              Fix #4: Add min-w-0 on the social container and ensure icon row
              can wrap if needed on very narrow screens.
            */}
            <div className="mt-7 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 mb-3">
                Follow us
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {socials.map(({ Icon, href, label }) => {
                  const className =
                    'group w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/10 text-white/65 hover:text-white hover:bg-white/[0.06] hover:border-[#22D3EE]/30 transition-colors shrink-0'
                  const inner = (
                    <Icon className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  )
                  return href ? (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={className}
                    >
                      {inner}
                    </a>
                  ) : (
                    <span
                      key={label}
                      aria-label={label}
                      role="presentation"
                      className={className}
                    >
                      {inner}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {/*
            Fix #1: On mobile and sm, render the 5 link columns in a 2-col grid sub-layout
            so they are evenly distributed without relying on the parent 12-col grid at sm.
            At lg+ each column gets its individual span within the 12-col parent grid.
          */}
          <div className="col-span-1 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {footerColumns.map((column, idx) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="min-w-0"
              >
                {'href' in column && column.href ? (
                  <a
                    href={column.href}
                    className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 hover:text-white/70 transition-colors mb-5 block"
                  >
                    {column.title}
                  </a>
                ) : (
                  <h4 className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 mb-5">
                    {column.title}
                  </h4>
                )}
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-sm text-white/75 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom strip */}
      {/*
        Fix #2, #3, #8: Restructure the bottom strip so that on narrow screens the
        copyright/status group and the legal links group each sit on their own rows
        (flex-col). The separator dot is removed from the flex-wrap flow on mobile to
        prevent overflow — it only appears at md+ where there is room. Reduce
        tracking-widest to tracking-wider on very small screens to prevent text overflow,
        and ensure the status link can break onto its own line via flex-col on xs screens.
      */}
      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
            {/* Left group: copyright + status */}
            <div className="flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-x-3 gap-y-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest text-white/40 min-w-0">
              <span className="shrink-0">© 2026 Rozper, Inc.</span>
              {/* Fix #3: Show separator only at md+ where layout is guaranteed horizontal */}
              <span className="hidden md:inline shrink-0">·</span>
              <a
                href="/status"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-white transition-colors shrink-0"
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {/* Fix #8: Use normal-case for the status text on very narrow screens */}
                <span className="normal-case sm:uppercase">All systems normal</span>
                <ArrowUpRight className="w-3 h-3 shrink-0" />
              </a>
            </div>

            {/* Right group: legal links */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest text-white/40">
              <a href="/legal/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/legal/terms" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>

          </div>
        </div>
      </div>
    </motion.footer>
  )
}
