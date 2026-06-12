"use client"

import NextImage from "next/image"
import { useState } from "react"
import { CoverArt } from "./cover-art"

type Tone = "blue" | "cyan" | "violet" | "emerald" | "amber"

interface BlogImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  tone?: Tone
  label?: string
  fit?: "cover" | "contain"
  children?: React.ReactNode
}

export function BlogImage({
  src,
  alt,
  className = "absolute inset-0 w-full h-full object-cover",
  style,
  tone = "blue",
  label = "Article",
  fit = "cover",
  children,
}: BlogImageProps) {
  const [broken, setBroken] = useState(false)

  if (broken) {
    return <CoverArt tone={tone} label={label} />
  }

  const isBlobUrl = src.includes("blob.vercel-storage.com")

  if (isBlobUrl) {
    return (
      <>
        <NextImage
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
          style={{
            objectFit: fit,
            objectPosition: fit === "contain" ? "center" : "left center",
            mixBlendMode: "multiply",
            ...style,
          }}
          className={className.replace(/object-\S+/g, "")}
          onError={() => setBroken(true)}
        />
        {children}
      </>
    )
  }

  // Fallback for WordPress-hosted or other external images
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ mixBlendMode: "multiply", ...style }}
        onError={() => setBroken(true)}
      />
      {children}
    </>
  )
}
