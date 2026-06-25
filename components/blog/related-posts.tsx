"use client"

import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/blog-api"
import { CoverArt } from "./cover-art"
import { BlogImage } from "./blog-image"

const toneSequence: Array<"blue" | "cyan" | "violet" | "emerald" | "amber"> = [
  "blue",
  "cyan",
  "violet",
  "emerald",
  "amber",
]

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 border-t border-white/5">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(4,107,210,0.16) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
              Keep reading
            </div>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-[-0.02em]">
              More from the field
            </h2>
          </div>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0086F9] hover:text-[#22D3EE] transition-colors"
          >
            Browse all articles
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((post, i) => {
            const tone = toneSequence[(post.id + i) % toneSequence.length]!
            const categoryLabel = post.categories[0]?.name ?? "Article"
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block h-full rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#046BD2]/40 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_60px_-25px_rgba(4,107,210,0.6)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {post.featuredImage ? (
                    <BlogImage
                      src={post.featuredImage.src}
                      alt={post.featuredImage.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      tone={tone}
                      label={categoryLabel}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/80 via-[#0A1020]/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-white">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" />
                          {categoryLabel}
                        </span>
                      </div>
                    </BlogImage>
                  ) : (
                    <CoverArt tone={tone} label={categoryLabel} />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em]">
                    <span className="text-[#22D3EE]">{categoryLabel}</span>
                    <span className="flex items-center gap-1 text-white/40">
                      <Clock className="w-3 h-3" />
                      {post.readMinutes} min
                    </span>
                  </div>
                  <h3 className="font-display mt-2.5 text-base sm:text-lg leading-snug tracking-[-0.015em] font-semibold text-white line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#B8C4D4] leading-relaxed font-light line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#0086F9] group-hover:text-[#22D3EE] transition-colors">
                    Read article
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
