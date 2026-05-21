"use client"

import { Link2, Twitter, Linkedin, Check } from "lucide-react"
import { useState } from "react"

export function ShareBar({
  url,
  title,
}: {
  url: string
  title: string
}) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  const links: Array<{
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
  }> = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: Twitter,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
  ]

  return (
    <div className="flex items-center gap-1.5">
      <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-[0.18em] text-white/40 pr-1">
        Share
      </span>
      {links.map((l) => {
        const Icon = l.icon
        return (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] hover:bg-[#046BD2]/15 hover:border-[#046BD2]/40 text-white/70 hover:text-white transition-colors"
          >
            <Icon className="w-4 h-4" />
          </a>
        )
      })}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] hover:bg-[#046BD2]/15 hover:border-[#046BD2]/40 text-white/70 hover:text-white transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}
