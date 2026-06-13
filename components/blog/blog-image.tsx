"use client"

import { useState } from "react"
import { CoverArt } from "./cover-art"

type Tone = "blue" | "cyan" | "violet" | "emerald" | "amber"

interface BlogImageProps {
  src: string
  alt: string
  className?: string
  tone?: Tone
  label?: string
  /** Extra children rendered on top of the image (overlays, badges, etc.) */
  children?: React.ReactNode
}

/**
 * Renders a blog featured image with a graceful CoverArt fallback when the
 * WordPress-hosted image is missing or returns an error.
 */
export function BlogImage({
  src,
  alt,
  className = "absolute inset-0 w-full h-full object-cover",
  tone = "blue",
  label = "Article",
  children,
}: BlogImageProps) {
  const [broken, setBroken] = useState(false)

  if (broken) {
    return <CoverArt tone={tone} label={label} />
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setBroken(true)}
      />
      {children}
    </>
  )
}
