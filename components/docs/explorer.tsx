"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  Phone,
  MessageSquare,
  Video,
  Bot,
  Shield,
  Webhook,
  Hash,
} from "lucide-react"
import type { ComponentType } from "react"

type Doc = {
  title: string
  slug: string
  excerpt: string
  read: string
  Icon: ComponentType<{ className?: string }>
}

const tree: Record<string, Doc[]> = {
  Voice: [
    {
      title: "Outbound calls",
      slug: "voice/outbound",
      excerpt: "Originate PSTN calls with two-leg control, recording, and DTMF capture.",
      read: "8 min",
      Icon: Phone,
    },
    {
      title: "Inbound IVR",
      slug: "voice/ivr",
      excerpt: "Build menus, route by skill, and stream to your handlers.",
      read: "12 min",
      Icon: Phone,
    },
    {
      title: "Call recording",
      slug: "voice/recording",
      excerpt: "Dual-channel, stereo, redacted, or streamed to your S3 bucket.",
      read: "5 min",
      Icon: Phone,
    },
  ],
  Messaging: [
    {
      title: "SMS & MMS",
      slug: "messaging/sms",
      excerpt: "Local, toll-free, and short-code messaging with delivery receipts.",
      read: "6 min",
      Icon: MessageSquare,
    },
    {
      title: "WhatsApp",
      slug: "messaging/whatsapp",
      excerpt: "Templated outbound, two-way inbox, and rich media.",
      read: "10 min",
      Icon: MessageSquare,
    },
  ],
  "Video & Meetings": [
    {
      title: "Rooms API",
      slug: "video/rooms",
      excerpt: "Spawn HD rooms with up to 250 participants, JWT-gated.",
      read: "7 min",
      Icon: Video,
    },
  ],
  "AI Agents": [
    {
      title: "Voice agent SDK",
      slug: "ai/voice-agent",
      excerpt: "Sub-300ms agents with built-in barge-in, tools, and memory.",
      read: "14 min",
      Icon: Bot,
    },
    {
      title: "Knowledge bases",
      slug: "ai/knowledge",
      excerpt: "Ingest docs, sites, and FAQs. Auto-refreshed and citation-aware.",
      read: "9 min",
      Icon: Bot,
    },
  ],
  Security: [
    {
      title: "Webhook signatures",
      slug: "security/webhooks",
      excerpt: "Verify every event with HMAC-SHA256 and replay protection.",
      read: "4 min",
      Icon: Webhook,
    },
    {
      title: "SOC 2 & GDPR",
      slug: "security/compliance",
      excerpt: "Region pinning, BAA, DPA — production-ready controls.",
      read: "6 min",
      Icon: Shield,
    },
  ],
}

const categories = Object.keys(tree)

export function DocsExplorer() {
  const [active, setActive] = useState<string>(categories[0])

  return (
    <section className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
              Browse · file tree
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Every guide, organized like your repo.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <Hash className="w-3.5 h-3.5" />
            148 articles · last updated 2 hours ago
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0F1A2E]/50 backdrop-blur-md overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Tree sidebar */}
          <aside className="md:col-span-4 lg:col-span-3 border-r border-white/5 bg-[#070B14]/50 p-3">
            <div className="px-2 py-2 text-[10px] uppercase tracking-[0.22em] font-mono text-white/30">
              ~/rozper-docs
            </div>
            <ul className="space-y-0.5">
              {categories.map((cat) => {
                const isActive = active === cat
                return (
                  <li key={cat}>
                    <button
                      onClick={() => setActive(cat)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                        isActive
                          ? "bg-[#046BD2]/15 text-white"
                          : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {isActive ? (
                        <FolderOpen className="w-4 h-4 text-[#22D3EE]" />
                      ) : (
                        <Folder className="w-4 h-4 text-white/40" />
                      )}
                      <span className="font-mono text-xs">{cat}</span>
                      <span className="ml-auto text-[10px] text-white/30 font-mono">
                        {tree[cat].length}
                      </span>
                    </button>
                    {isActive && (
                      <ul className="ml-5 mt-1 pl-3 border-l border-white/5 space-y-0.5">
                        {tree[cat].map((doc) => (
                          <li key={doc.slug}>
                            <a
                              href="/docs/api/"
                              className="flex items-center gap-2 px-2 py-1 rounded text-xs text-white/60 hover:text-white hover:bg-white/[0.03] transition-colors"
                            >
                              <FileText className="w-3 h-3 text-white/30" />
                              <span className="font-mono truncate">
                                {doc.title}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </aside>

          {/* Active panel */}
          <div className="md:col-span-8 lg:col-span-9 p-6 md:p-8">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/40 mb-6">
              <span>docs</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/70">{active.toLowerCase()}</span>
            </div>

            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {tree[active].map((doc) => {
                const Icon = doc.Icon
                return (
                  <a
                    key={doc.slug}
                    href="/docs/api/"
                    className="group relative rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#046BD2]/40 p-5 transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-9 h-9 rounded-lg bg-[#046BD2]/15 border border-[#046BD2]/30 flex items-center justify-center group-hover:bg-[#046BD2]/25 transition-colors">
                        <Icon className="w-4 h-4 text-[#22D3EE]" />
                      </div>
                      <span className="text-[10px] font-mono text-white/30">
                        {doc.read}
                      </span>
                    </div>
                    <h3 className="mt-3 font-semibold text-white text-sm">
                      {doc.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#9AA8BC] leading-relaxed">
                      {doc.excerpt}
                    </p>
                    <ChevronRight className="absolute bottom-4 right-4 w-4 h-4 text-white/20 group-hover:text-[#22D3EE] group-hover:translate-x-0.5 transition-all" />
                  </a>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
