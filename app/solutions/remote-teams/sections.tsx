'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Globe, Smartphone, RefreshCw, Shield, FileText,
  MessageSquare, Video, BarChart3, Quote, ChevronDown,
  ChevronRight, Star, Zap, Users, ArrowRight, Wifi,
} from 'lucide-react'

// ─── DATA ──────────────────────────────────────────────────────────────────

const stats = [
  { value: '150+', label: 'Countries Supported' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '12', label: 'Time Zones Covered' },
  { value: '0', label: 'VPNs Required' },
]

const steps = [
  {
    number: '01',
    Icon: Users,
    title: 'Add your remote team',
    description: 'Invite agents anywhere in the world. They\'re live in minutes with a dedicated local number.',
  },
  {
    number: '02',
    Icon: Wifi,
    title: 'Connect on any device',
    description: 'Desktop app, browser, iOS, or Android. No hardware, no VPN, no IT setup.',
  },
  {
    number: '03',
    Icon: Zap,
    title: 'Communicate like one team',
    description: 'Same call quality, same AI tools, same dashboard — regardless of location.',
  },
]

const testimonials = [
  {
    quote: 'We went fully remote across 8 countries. Rozper made it invisible — same call quality, same numbers, same platform as when we were in one office.',
    author: 'Chloe Martin',
    role: 'COO',
    company: 'Forma Global Consulting',
    stars: 5,
  },
  {
    quote: 'Setting up a distributed support team across three continents used to be a nightmare. With Rozper, we had everyone live in a weekend.',
    author: 'Marcus Reyes',
    role: 'Head of Support',
    company: 'Stackline Technologies',
    stars: 5,
  },
  {
    quote: 'Our agents in São Paulo, London, and Singapore all sound like they\'re in the same room. The uptime has been flawless for 18 months.',
    author: 'Anika Patel',
    role: 'VP of Operations',
    company: 'Orbital CX',
    stars: 5,
  },
]

const faqs = [
  {
    question: 'Does call quality suffer on home internet?',
    answer: 'Adaptive audio codecs and automatic quality management maintain quality on varied connections.',
  },
  {
    question: 'Can remote agents use their mobile number?',
    answer: 'Agents use their Rozper number on mobile — personal numbers stay private.',
  },
  {
    question: 'How do managers see remote agent availability?',
    answer: 'Real-time dashboard shows every agent\'s status regardless of location.',
  },
]

const relatedLinks = [
  { title: 'UCaaS Platform', href: '/products/ucaas', desc: 'Unified comms for your whole org' },
  { title: 'Video Meetings', href: '/products/ucaas/video-meetings', desc: 'HD video, no downloads' },
  { title: 'SaaS & Tech Solutions', href: '/solutions/saas', desc: 'Built for fast-growing teams' },
  { title: 'Pricing', href: '/pricing', desc: 'Simple, scalable plans' },
]

// ─── BREADCRUMB ─────────────────────────────────────────────────────────────

export function Breadcrumb() {
  return (
    <div className="pt-20 pb-0 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-[#757575]">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#CCD6DF]">Remote Teams</span>
        </nav>
      </div>
    </div>
  )
}

// ─── WORLD VISUALIZATION ────────────────────────────────────────────────────
// Positions derived from equirectangular projection:
// x% = (lng + 180) / 360 * 100   y% = (90 - lat) / 180 * 100

function WorldVisualization() {
  const nodes = [
    { x: 29.4, y: 27.4, label: 'New York',   labelLeft: false },
    { x: 50.0, y: 21.4, label: 'London',      labelLeft: false },
    { x: 78.8, y: 49.3, label: 'Singapore',   labelLeft: true  },
    { x: 37.1, y: 63.1, label: 'São Paulo',   labelLeft: false },
    { x: 65.4, y: 36.0, label: 'Dubai',       labelLeft: false },
    { x: 28.0, y: 25.0, label: 'Toronto',     labelLeft: true  },
  ]

  const connections: [number, number][] = [
    [0, 1], // New York → London
    [1, 2], // London → Singapore
    [0, 3], // New York → São Paulo
    [2, 4], // Singapore → Dubai
    [3, 4], // São Paulo → Dubai
    [0, 5], // New York → Toronto
    [5, 1], // Toronto → London
  ]

  return (
    <div className="relative w-full max-w-[520px] aspect-[8/5] rounded-2xl overflow-hidden border border-[#046BD2]/20 shadow-2xl shadow-[#046BD2]/10">
      {/* Real world map */}
      <Image
        src="/images/global-map.webp"
        alt="World map"
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay to match page theme and improve dot visibility */}
      <div className="absolute inset-0 bg-[#030C18]/60" />

      {/* Subtle blue vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#046BD2]/8 via-transparent to-[#0086F9]/5" />

      {/* SVG connection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {connections.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="#0086F9"
            strokeWidth="0.18"
            strokeOpacity="0.45"
            strokeDasharray="0.6 0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.4 + i * 0.14, ease: 'easeOut' }}
          />
        ))}
      </svg>

      {/* City dots */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.5 + i * 0.15, ease: 'backOut' }}
        >
          <div className="relative flex items-center">
            {/* Label — left side */}
            {node.labelLeft && (
              <span className="absolute right-[calc(100%+6px)] top-1/2 -translate-y-1/2 text-[8.5px] text-white/65 whitespace-nowrap font-medium tracking-wide">
                {node.label}
              </span>
            )}

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-[-4px] rounded-full bg-[#046BD2]/20"
              animate={{ scale: [1, 2.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.35 }}
            />

            {/* Core dot */}
            <motion.div
              className="relative z-10 w-2.5 h-2.5 rounded-full bg-[#0086F9] border border-[#2D98F1]/70 shadow-[0_0_6px_rgba(0,134,249,0.7)]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.35 }}
            />

            {/* Label — right side */}
            {!node.labelLeft && (
              <span className="absolute left-[calc(100%+6px)] top-1/2 -translate-y-1/2 text-[8.5px] text-white/65 whitespace-nowrap font-medium tracking-wide">
                {node.label}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-10 pb-16">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(#046BD2 1px, transparent 1px), linear-gradient(90deg, #046BD2 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#046BD2]/15 rounded-full blur-[130px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#0086F9]/10 rounded-full blur-[100px]"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#046BD2]/30 bg-[#046BD2]/5 backdrop-blur-sm mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#046BD2] animate-pulse" />
              <span className="text-sm font-medium text-[#046BD2]">Solutions · Remote Teams</span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white mb-6 leading-[1.05]">
              Your team is{' '}
              <span className="bg-gradient-to-r from-[#046BD2] to-[#0086F9] bg-clip-text text-transparent">
                everywhere.
              </span>
              <br />
              Rozper&nbsp;too.
            </h1>

            <p className="text-lg sm:text-xl text-[#CCD6DF] mb-4 leading-relaxed max-w-xl">
              Cloud calling, video, and chat for fully remote and hybrid teams — in 150+ countries.
            </p>
            <p className="text-base text-[#757575] mb-10 leading-relaxed max-w-xl">
              Your team works in 12 time zones. Your phone system should work in all of them. Every remote seat gets a local number, a full comms suite, and 99.99% uptime.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#046BD2] hover:bg-[#046BD2]/90 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#046BD2]/40 hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-[#1A2638] hover:border-[#046BD2]/50 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/[0.04]"
              >
                Talk to Sales
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Slack', 'Microsoft Teams', 'Google Workspace', 'Zoom'].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 text-xs text-[#CCD6DF] bg-white/[0.04] border border-[#1A2638] rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:flex items-center justify-center"
          >
            <WorldVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── STATS ───────────────────────────────────────────────────────────────────

export function Stats() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-[#1A2638] bg-[#070B14]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#046BD2] to-[#0086F9] bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-[#CCD6DF] text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PLATFORM FEATURES ───────────────────────────────────────────────────────

export function BentoFeatures() {
  const features = [
    {
      Icon: Globe,
      title: 'Local Numbers Worldwide',
      desc: 'Local numbers in 150+ countries — your remote team looks local everywhere.',
      tags: ['US', 'UK', 'DE', 'SG', 'BR', 'AU', '+145 more'],
    },
    {
      Icon: Smartphone,
      title: 'Any Device, Anywhere',
      desc: 'Calls, video, chat, and SMS on desktop, browser, iOS, and Android.',
    },
    {
      Icon: RefreshCw,
      title: 'Automatic Failover',
      desc: 'If one connection drops, calls route to backup instantly.',
    },
    {
      Icon: Shield,
      title: 'SSO — No VPN',
      desc: 'Secure remote access with SSO. No VPN required, ever.',
    },
    {
      Icon: FileText,
      title: 'Remote Recording & AI',
      desc: 'Call recording and AI-generated summaries work the same remotely as in-office. Every conversation captured, every insight available.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">

          {/* Left — sticky heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28"
          >
            <span className="inline-block px-3 py-1 text-xs font-medium text-[#046BD2] bg-[#046BD2]/10 rounded-full border border-[#046BD2]/20 mb-6">
              Platform Features
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Full phone features from{' '}
              <span className="bg-gradient-to-r from-[#046BD2] to-[#0086F9] bg-clip-text text-transparent">
                any location
              </span>
            </h2>
            <p className="text-[#CCD6DF] leading-relaxed">
              Everything your office phone does — available on any device, anywhere on Earth.
            </p>
          </motion.div>

          {/* Right — feature rows */}
          <div className="divide-y divide-[#1A2638]">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group flex items-start gap-6 py-8 first:pt-0 last:pb-0"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 group-hover:border-[#046BD2]/40 transition-all duration-300 mt-0.5">
                  <f.Icon className="w-5 h-5 text-[#046BD2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-white group-hover:text-[#046BD2] transition-colors duration-300 mb-2">
                        {f.title}
                      </h3>
                      <p className="text-[#CCD6DF] text-sm leading-relaxed">{f.desc}</p>
                      {'tags' in f && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {f.tags!.map((tag) => (
                            <span key={tag} className="px-3 py-1 text-xs text-[#046BD2] bg-[#046BD2]/10 border border-[#046BD2]/20 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="font-mono text-xs text-[#1A2638] shrink-0 mt-1 hidden sm:block">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ────────────────────────────────────────────────────────────

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#070B14]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-[#046BD2] bg-[#046BD2]/10 rounded-full border border-[#046BD2]/20 mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Up and running in{' '}
            <span className="bg-gradient-to-r from-[#046BD2] to-[#0086F9] bg-clip-text text-transparent">
              minutes
            </span>
          </h2>
          <p className="text-[#CCD6DF] text-lg max-w-2xl mx-auto">
            No hardware. No VPN. No IT tickets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-[3rem] left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-gradient-to-r from-transparent via-[#046BD2]/40 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#046BD2]/10 border border-[#046BD2]/30 mb-6">
                <step.Icon className="w-8 h-8 text-[#046BD2]" />
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#046BD2] flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">{step.number}</span>
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-[#CCD6DF] leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── COLLABORATION SECTION ───────────────────────────────────────────────────

export function CollaborationSection() {
  const features = [
    {
      Icon: MessageSquare,
      title: 'Team Chat & Files',
      description: 'Team chat, file sharing, and video meetings built into one app.',
    },
    {
      Icon: Video,
      title: 'One-Click Calls',
      description: 'One-click call or video from chat — no separate meeting link needed.',
    },
    {
      Icon: BarChart3,
      title: 'Real-Time Dashboard',
      description: 'Agent status, call activity, and availability regardless of location.',
    },
  ]

  const chatMessages = [
    { name: 'Sarah K.', msg: 'Just joined from Tokyo 🇯🇵', time: '9:02 AM', mine: false },
    { name: 'You', msg: 'Great! Starting the call now', time: '9:03 AM', mine: true },
    { name: 'Marcus', msg: 'Connected from São Paulo 🇧🇷', time: '9:03 AM', mine: false },
    { name: 'System', msg: '📞 All 5 members connected', time: '9:04 AM', mine: false, system: true },
  ]

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium text-[#046BD2] bg-[#046BD2]/10 rounded-full border border-[#046BD2]/20 mb-6">
              Collaboration
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Collaboration that{' '}
              <span className="bg-gradient-to-r from-[#046BD2] to-[#0086F9] bg-clip-text text-transparent">
                doesn&apos;t need an office
              </span>
            </h2>
            <p className="text-[#CCD6DF] text-lg mb-10 leading-relaxed">
              Everything your team needs to work together — without being together.
            </p>

            <div className="space-y-6 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#046BD2]/10 border border-[#046BD2]/20 flex items-center justify-center group-hover:bg-[#046BD2]/20 transition-colors duration-300">
                    <f.Icon className="w-5 h-5 text-[#046BD2]" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-white mb-1">{f.title}</h4>
                    <p className="text-[#CCD6DF] text-sm leading-relaxed">{f.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#046BD2] hover:bg-[#046BD2]/90 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#046BD2]/40"
            >
              See it in action
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Mock chat UI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto rounded-2xl bg-gradient-to-br from-[#046BD2]/8 to-[#0086F9]/4 border border-[#046BD2]/20 p-6 flex flex-col gap-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#046BD2]/8 rounded-full blur-[60px] pointer-events-none" />

              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-[#046BD2]" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Remote Team · General</p>
                  <p className="text-[#757575] text-[10px]">5 members online</p>
                </div>
                <div className="ml-auto flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#046BD2] animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-[#046BD2] animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-2 h-2 rounded-full bg-[#046BD2] animate-pulse" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>

              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                  viewport={{ once: true }}
                  className={`relative z-10 flex ${msg.mine ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.system ? (
                    <div className="w-full text-center py-2 px-4 text-xs text-[#046BD2] bg-[#046BD2]/10 rounded-xl border border-[#046BD2]/20">
                      {msg.msg}
                    </div>
                  ) : (
                    <div className={`max-w-[78%] px-4 py-2.5 rounded-xl ${msg.mine ? 'bg-[#046BD2] text-white' : 'bg-white/[0.05] border border-[#1A2638] text-white'}`}>
                      {!msg.mine && (
                        <p className="text-[10px] text-[#046BD2] font-semibold mb-0.5">{msg.name}</p>
                      )}
                      <p className="text-sm">{msg.msg}</p>
                      <p className={`text-[10px] mt-1 ${msg.mine ? 'text-white/50' : 'text-[#757575]'}`}>{msg.time}</p>
                    </div>
                  )}
                </motion.div>
              ))}

              <div className="relative z-10 mt-2 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-[#1A2638]">
                <span className="text-xs text-[#757575] flex-1">Message team...</span>
                <Video className="w-4 h-4 text-[#046BD2]" />
                <MessageSquare className="w-4 h-4 text-[#046BD2]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#070B14]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-[#046BD2] bg-[#046BD2]/10 rounded-full border border-[#046BD2]/20 mb-4">
            Customer Stories
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Teams that went{' '}
            <span className="bg-gradient-to-r from-[#046BD2] to-[#0086F9] bg-clip-text text-transparent">
              fully remote
            </span>{' '}
            with Rozper
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="flex flex-col p-8 rounded-2xl bg-white/[0.03] border border-[#1A2638] hover:border-[#046BD2]/30 hover:bg-white/[0.05] transition-all duration-300 group"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 text-[#046BD2] fill-[#046BD2]" />
                ))}
              </div>

              <Quote className="w-7 h-7 text-[#046BD2]/35 mb-4 flex-shrink-0" />

              <p className="text-[#CCD6DF] leading-relaxed text-base flex-1 mb-8">
                {t.quote}
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[#1A2638] group-hover:border-[#046BD2]/20 transition-colors duration-300">
                <div className="w-11 h-11 rounded-full bg-[#046BD2]/20 border border-[#046BD2]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#046BD2] font-bold text-sm">
                    {t.author.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.author}</p>
                  <p className="text-[#757575] text-xs">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-[#046BD2] bg-[#046BD2]/10 rounded-full border border-[#046BD2]/20 mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Common questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.05] border border-[#1A2638] group-hover:border-[#046BD2]/30 rounded-xl transition-all duration-300"
              >
                <span className="font-display font-semibold text-white text-left">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 text-[#046BD2]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-white/[0.02] border-x border-b border-[#1A2638] rounded-b-xl">
                      <p className="text-[#CCD6DF] leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── RELATED LINKS ───────────────────────────────────────────────────────────

export function RelatedLinks() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-black border-t border-[#1A2638]">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-medium text-[#757575] mb-6 uppercase tracking-widest">
          Explore more
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-start gap-3 p-4 rounded-xl border border-[#1A2638] hover:border-[#046BD2]/30 hover:bg-white/[0.03] transition-all duration-300 group"
            >
              <div className="flex-1">
                <p className="font-medium text-white text-sm group-hover:text-[#046BD2] transition-colors">
                  {link.title}
                </p>
                <p className="text-xs text-[#757575] mt-1">{link.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#757575] group-hover:text-[#046BD2] transition-colors flex-shrink-0 mt-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

export function CTA() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#070B14] border-t border-[#1A2638]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#046BD2]/15 blur-[80px] rounded-full pointer-events-none" />
            <h2 className="relative font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Your team works everywhere.{' '}
              <span className="bg-gradient-to-r from-[#046BD2] to-[#0086F9] bg-clip-text text-transparent">
                Your phone system should too.
              </span>
            </h2>
          </div>

          <p className="text-[#CCD6DF] text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of remote teams using Rozper across 150+ countries. Get started in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#046BD2] hover:bg-[#046BD2]/90 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#046BD2]/40 hover:-translate-y-0.5"
            >
              Start a No-Pressure Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-[#757575] text-sm mt-6">
            No credit card required · 14-day free trial · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}
