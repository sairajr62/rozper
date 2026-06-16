"use client"

import Link from "next/link"
import {
  ChevronRight,
  Clock,
  Calendar,
  ArrowLeft,
  Hash,
} from "lucide-react"
import type { BlogPostDetail } from "@/lib/blog-api"
import { BlogImage } from "./blog-image"

export function PostArticleHero({ post }: { post: BlogPostDetail }) {
  const category = post.categories[0]

  return (
    <header className="relative overflow-hidden pt-28 pb-10 lg:pt-36 lg:pb-14">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#070B14]" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120, 160, 220, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120, 160, 220, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
        <div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[900px] h-[560px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(4,107,210,0.38) 0%, rgba(4,107,210,0) 65%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute top-[20%] right-[5%] w-[420px] h-[420px] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.22) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] text-white/40"
        >
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-white/70 transition-colors">Blog</Link>
          {category && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#22D3EE] truncate max-w-[200px]">{category.name}</span>
            </>
          )}
        </nav>

        {/* Animated category chip */}
        {category && (
          <div className="mt-7">
            <span className="group relative inline-flex items-center gap-1.5 rounded-full border border-[#22D3EE]/25 bg-[#22D3EE]/[0.06] backdrop-blur-md px-3 py-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
              </span>
              {category.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="font-display mt-6 text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.02] tracking-[-0.035em] font-semibold text-white">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-[#B8C4D4] leading-relaxed font-light max-w-3xl">
            {post.excerpt}
          </p>
        )}

        {/* Hairline */}
        <div className="mt-9 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Meta — author + date + reading time */}
        <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 sm:justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative shrink-0">
              {post.author.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="relative w-12 h-12 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center text-xs font-semibold text-white border border-white/15 shadow-[0_8px_24px_-8px_rgba(34,211,238,0.5)]">
                  {post.author.initials}
                </div>
              )}
              <span
                aria-hidden
                className="absolute -inset-1.5 rounded-full -z-10"
                style={{
                  background: "conic-gradient(from 0deg, rgba(34,211,238,0.3), transparent 60%)",
                  filter: "blur(8px)",
                }}
              />
            </div>
            <div className="leading-tight min-w-0">
              <div className="text-sm font-medium text-white truncate">{post.author.name}</div>
              <div className="mt-1 flex items-center gap-2.5 text-[11px] text-white/45 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.dateLabel}
                </span>
                <span className="text-white/20">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readMinutes} min read
                </span>
              </div>
            </div>
          </div>

          {/* Inline tag chips */}
          {post.tags.length > 0 && (
            <div className="hidden sm:flex flex-wrap items-center gap-1.5 max-w-md">
              <Hash className="w-3 h-3 text-white/35" />
              {post.tags.slice(0, 4).map((t) => (
                <span
                  key={t.id}
                  className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/55 px-2 py-1 rounded-md border border-white/[0.08] bg-white/[0.02]"
                >
                  {t.name}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Featured image — full width below author row */}
      {post.featuredImage && (
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="relative">
            {/* Yellow accent block behind image */}
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-[88%] h-[88%] rounded-2xl sm:rounded-3xl bg-[#FCD34D]/50 -z-10" />
            <div className="relative rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/30 to-white/[0.02] shadow-[0_20px_80px_-30px_rgba(4,107,210,0.6)] sm:shadow-[0_40px_140px_-50px_rgba(4,107,210,0.7)]">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A1020]">
                <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2114/941]">
                  <BlogImage
                    src={post.featuredImage.src}
                    alt={post.featuredImage.alt}
                    tone="blue"
                    label={post.categories[0]?.name ?? "Article"}
                    className="absolute inset-0 w-full h-full object-cover object-center sm:object-left"
                    style={post.featuredImagePosition ? { objectPosition: post.featuredImagePosition } : undefined}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#046BD2]/8 via-transparent to-[#22D3EE]/8 mix-blend-overlay opacity-60" />
                  </BlogImage>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to blog */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] text-white/45 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          All articles
        </Link>
      </div>
    </header>
  )
}
