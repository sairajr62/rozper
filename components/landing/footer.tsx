'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, Linkedin, Twitter, Facebook } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const footerColumns = [
  {
    title: 'Unified Communication',
    href: '/products/ucaas',
    links: [
      { label: 'Business Phone System', href: '/products/ucaas/business-phone' },
      { label: 'HD Video Meetings', href: '/products/ucaas/video-meetings' },
      { label: 'Business SMS & MMS', href: '/products/ucaas/sms-mms' },
      { label: 'Team Chat', href: '/products/ucaas/team-chat' },
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
      { label: 'AI Assistant', href: '/products/ucaas/ai-assistant' },
      { label: 'Customer Engagement', href: '/products/ucaas/customer-engagement' },
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
      className="relative bg-[#070B14] overflow-hidden"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <Image
              src="/images/white-rozper-logo.png"
              alt="Rozper"
              width={140}
              height={40}
              className="h-8 w-auto"
              loading="lazy"
            />
            <p className="mt-5 text-sm text-[#9AA8BC] leading-relaxed max-w-md">
              Carrier-grade unified communications, cloud contact center, and
              wholesale VoIP — one platform built to scale.
            </p>

            {/* Social */}
            <div className="mt-7">
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 mb-3">
                Follow us
              </div>
              <div className="flex items-center gap-2.5">
                {socials.map(({ Icon, href, label }) => {
                  const className =
                    'group w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/10 text-white/65 hover:text-white hover:bg-white/[0.06] hover:border-[#22D3EE]/30 transition-colors'
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
          {footerColumns.map((column, idx) => {
            /* product cols (0-2) get 2 spans, company/resources (3-4) get 1 span each */
            const colSpan = idx < 3 ? 'sm:col-span-1 lg:col-span-2' : 'sm:col-span-1 lg:col-span-1'
            return (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={colSpan}
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
            )
          })}
        </div>

      </div>

      {/* Bottom strip */}
      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono uppercase tracking-widest text-white/40">
              <span>© 2026 Rozper, Inc.</span>
              <span className="hidden sm:inline">·</span>
              <a
                href="/status"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-white transition-colors"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                All systems normal
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-mono uppercase tracking-widest text-white/40">
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
