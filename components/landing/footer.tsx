'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Linkedin, Youtube, Github, ArrowUpRight, Send } from 'lucide-react'
import { useState } from 'react'

const footerColumns = [
  {
    title: 'Platform',
    links: [
      { label: 'Unified Comms', href: '/products/ucaas' },
      { label: 'Contact Center', href: '/products/contact-center' },
      { label: 'Wholesale Voice', href: '/solutions/wholesale' },
      { label: 'SIP Trunking', href: '/features/sip-trunking' },
      /*{ label: 'DID Numbers', href: '/features/did-numbers' },*/
      { label: 'API', href: '/developers' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Customers', href: '/customers' },
      { label: 'Careers', href: '/careers', badge: 'Hiring' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Status', href: '/status' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Security', href: '/security' },
    ],
  },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

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
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <Image
              src="/images/white-rozper-logo.png"
              alt="Rozper"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <p className="mt-5 text-sm text-[#9AA8BC] leading-relaxed max-w-md">
              Carrier-grade unified communications, cloud contact center, and
              wholesale VoIP — one platform built to scale.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="mt-7 max-w-sm">
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 mb-2.5">
                Get the changelog
              </div>
              <div className="relative flex items-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md focus-within:border-[#22D3EE]/40 transition-colors">
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="m-1 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#046BD2] hover:bg-[#0078E0] text-white text-sm font-medium transition-colors"
                >
                  {subscribed ? (
                    'Subscribed'
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Subscribe
                    </>
                  )}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-white/30">
                Monthly. Plain text. Unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Link columns */}
          {footerColumns.map((column, idx) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={idx === 0 ? 'md:col-span-3' : 'md:col-span-2'}
            >
              <h4 className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 mb-5">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/75 hover:text-white transition-colors"
                    >
                      {link.label}
                      {'badge' in link && link.badge && (
                        <span className="text-[9px] uppercase tracking-widest font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {[
            { v: '99.999%', l: 'Contracted uptime' },
            { v: '150+', l: 'Countries served' },
            { v: '300+', l: 'Native integrations' },
            { v: '24/7', l: 'Live engineer NOC' },
          ].map((s) => (
            <div key={s.l} className="bg-[#0A1020] px-5 py-4">
              <div className="font-display text-xl sm:text-2xl font-bold bg-gradient-to-br from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent tabular-nums">
                {s.v}
              </div>
              <div className="text-[10px] uppercase tracking-widest font-mono text-white/40 mt-1">
                {s.l}
              </div>
            </div>
          ))}
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
              <a href="/legal/dpa" className="hover:text-white transition-colors">
                DPA
              </a>
              <a href="/legal/cookies" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>

            <div className="flex items-center gap-2">
              {[
                { Icon: Linkedin, href: 'https://linkedin.com/company/rozper', label: 'LinkedIn' },
                { Icon: Youtube, href: 'https://youtube.com/rozper', label: 'YouTube' },
                { Icon: Github, href: 'https://github.com/rozper', label: 'GitHub' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/5 text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/10 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
              <a
                href="https://x.com/rozper"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/5 text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/10 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.665-5.835 6.665H2.306l7.644-8.77L2.25 2.25h6.734l4.615 6.111L17.939 2.25zM16.369 20.033h1.83L5.337 3.987H3.425l12.944 16.046z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
