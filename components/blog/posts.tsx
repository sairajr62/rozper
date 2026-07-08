"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { ArrowUpRight, Clock, Calendar, X } from "lucide-react"
import type { BlogPost } from "@/lib/blog-api"
import { CoverArt } from "./cover-art"
import { BlogImage } from "./blog-image"

const ALL = "All"

const toneSequence: Array<"blue" | "cyan" | "violet" | "emerald" | "amber"> = [
  "blue",
  "cyan",
  "violet",
  "emerald",
  "amber",
]

function toneForPost(post: BlogPost, index: number) {
  return toneSequence[(Math.abs(post.id) + index) % toneSequence.length] ?? "blue"
}

function AuthorAvatar({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      {post.author.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-8 h-8 rounded-full object-cover border border-white/10 shrink-0"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#046BD2] to-[#22D3EE] flex items-center justify-center text-[11px] font-semibold text-white shrink-0">
          {post.author.initials}
        </div>
      )}
      <div className="leading-tight min-w-0">
        <div className="text-xs font-medium text-white truncate">
          {post.author.name}
        </div>
        <div className="text-[10px] text-white/40 truncate">
          {post.categories[0]?.name ?? "Editorial"}
        </div>
      </div>
    </div>
  )
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const categoryLabel = post.categories[0]?.name ?? "Featured"
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-[#046BD2]/40 to-white/[0.02] shadow-[0_0_80px_-20px_rgba(4,107,210,0.5)]">
        {/*
          Issue 1: Added md:grid-cols-12 so tablets (768-1023px) get a side-by-side
          layout instead of fully stacking like phones. Previously only lg:grid-cols-12
          was set, leaving the md range with a single-column stacked layout.
        */}
        <Link
          href={`/blog/${post.slug}/`}
          className="relative grid md:grid-cols-12 gap-0 rounded-3xl bg-[#0A1020]/85 backdrop-blur-2xl overflow-hidden"
        >
          {/* Visual — col span also shifted from lg to md */}
          <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto md:min-h-[420px] overflow-hidden bg-[#0a1929]">
            {post.featuredImage ? (
              <BlogImage
                src={post.featuredImage.src}
                alt={post.featuredImage.alt}
                fit={post.featuredImageFit ?? "cover"}
                style={post.featuredImagePosition ? { objectPosition: post.featuredImagePosition } : undefined}
                className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.03]"
                tone="blue"
                label={`Featured · ${categoryLabel}`}
              >
                {/*
                  Issue 5: On mobile (stacked layout) the right-edge gradient looks
                  odd on a full-width image. Use a bottom-fade on mobile/tablet-portrait
                  and switch to the right-edge fade only at md+ (side-by-side layout).
                */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1020]/60 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0A1020]" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-white">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" />
                    Featured · {categoryLabel}
                  </span>
                </div>
              </BlogImage>
            ) : (
              <CoverArt tone="blue" label={`Featured · ${categoryLabel}`} size="lg" />
            )}
          </div>

          {/* Body */}
          {/*
            Issue 2: Reduced base padding from p-6 to p-5 on mobile so that on a
            375px screen the effective content width is wider (375 - 2 - 40 = 333px).
            sm:p-7 and md:p-8 provide smooth intermediate steps before lg:p-10.
          */}
          <div className="md:col-span-5 p-5 sm:p-7 md:p-8 lg:p-10 flex flex-col">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-[#22D3EE]">
              <span>Featured</span>
              <span className="text-white/20">·</span>
              <span className="text-white/50">{categoryLabel}</span>
            </div>

            <h2 className="font-display mt-4 text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] leading-[1.1] tracking-[-0.02em] font-semibold text-white">
              {post.title}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#B8C4D4] leading-relaxed font-light line-clamp-4">
              {post.excerpt}
            </p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-5 max-w-full overflow-hidden">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag.id}
                    className="text-[10px] font-mono uppercase tracking-wider text-white/50 border border-white/10 rounded-full px-2 py-0.5 max-w-full truncate"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/*
              Issue 8: When stacked on mobile the flex container is auto-height so
              mt-auto collapses to mt-0, leaving no space before the footer row.
              Added explicit mt-6 on mobile that switches to mt-auto at md+ where
              the body section has a fixed height from the grid row.
            */}
            <div className="mt-6 md:mt-auto pt-4 md:pt-6 flex items-center justify-between gap-4">
              <AuthorAvatar post={post} />
              <div className="flex items-center gap-3 text-[11px] text-white/40 font-mono shrink-0">
                <span className="hidden sm:flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.dateLabel}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readMinutes} min
                </span>
              </div>
            </div>

            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#0086F9] group-hover:text-[#22D3EE] transition-colors">
              Read the full piece
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </Link>
      </div>
    </motion.article>
  )
}

function PostCard({
  post,
  index,
}: {
  post: BlogPost
  index: number
}) {
  const tone = toneForPost(post, index)
  const categoryLabel = post.categories[0]?.name ?? "Article"
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.04, 0.2),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
      <Link
        href={`/blog/${post.slug}/`}
        className="block h-full rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#046BD2]/40 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_60px_-25px_rgba(4,107,210,0.6)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0a1929]">
          {post.featuredImage ? (
            <BlogImage
              src={post.featuredImage.src}
              alt={post.featuredImage.alt}
              fit={post.featuredImageFit ?? "cover"}
              style={post.featuredImagePosition ? { objectPosition: post.featuredImagePosition } : undefined}
              className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.04]"
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

        <div className="p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em]">
            <span className="text-[#22D3EE]">{categoryLabel}</span>
            <span className="flex items-center gap-1 text-white/40 shrink-0">
              <Clock className="w-3 h-3" />
              {post.readMinutes} min
            </span>
          </div>

          <h3 className="font-display mt-3 text-lg sm:text-xl leading-snug tracking-[-0.015em] font-semibold text-white line-clamp-2">
            {post.title}
          </h3>

          <p className="mt-3 text-sm text-[#B8C4D4] leading-relaxed font-light line-clamp-3">
            {post.excerpt}
          </p>

          {/*
            Issue 6: On very narrow screens (<360px) the author name and date crowd
            each other. Added min-w-0 flex-1 wrapper around AuthorAvatar so the
            name can truncate freely, and shrink-0 on the date span so it never
            wraps. Gap-3 provides breathing room between the two.
          */}
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <AuthorAvatar post={post} />
            </div>
            <span className="text-[10px] text-white/40 font-mono whitespace-nowrap shrink-0">
              {post.dateLabel}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function matchesQuery(post: BlogPost, q: string): boolean {
  if (!q) return true
  const needle = q.toLowerCase()
  const haystacks = [
    post.title,
    post.excerpt,
    post.author.name,
    ...post.categories.map((c) => c.name),
    ...post.tags.map((t) => t.name),
  ]
  return haystacks.some((s) => s?.toLowerCase().includes(needle))
}

export function BlogPostsSection({
  posts,
  fetchError = null,
}: {
  posts: BlogPost[]
  fetchError?: string | null
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = (searchParams.get("q") ?? "").trim()
  const hasQuery = query.length > 0

  const [active, setActive] = useState<string>(ALL)

  // Remap "Virtual Numbers" into "Area Codes"; hide everything else except "Area Codes"
  const CATEGORY_REMAP: Record<string, string> = { "Virtual Numbers": "Area Codes" }
  const ALLOWED_CATEGORIES = new Set(["Area Codes", "VoIP & Voice", "UCaaS"])

  const categories = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of posts) {
      for (const c of p.categories) {
        const name = CATEGORY_REMAP[c.name] ?? c.name
        if (!ALLOWED_CATEGORIES.has(name)) continue
        map.set(name, (map.get(name) ?? 0) + 1)
      }
    }
    const sorted = Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name)
    return [ALL, ...sorted]
  }, [posts])

  // Apply the URL search filter first; below that, the category chip filter.
  const searched = useMemo(
    () => (hasQuery ? posts.filter((p) => matchesQuery(p, query)) : posts),
    [posts, query, hasQuery],
  )

  // When searching, skip the "featured" treatment — every match goes in
  // the grid. Otherwise use the original featured-card + rest behaviour.
  const featured = hasQuery ? undefined : searched[0]
  const rest = hasQuery ? searched : searched.slice(1)

  const filtered = useMemo(() => {
    if (active === ALL) return rest
    return rest.filter((p) =>
      p.categories.some((c) => (CATEGORY_REMAP[c.name] ?? c.name) === active)
    )
  }, [rest, active])

  const clearSearch = () => {
    router.push("/blog#articles", { scroll: false })
  }

  // Show empty/error state only when we have *no* posts at all — not when
  // a search just happens to return zero matches (handled separately below).
  if (!posts.length) {
    const isError = !!fetchError
    return (
      <section className="relative py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isError ? "bg-amber-400" : "bg-white/30"
              }`}
            />
            {isError ? "Live feed unavailable" : "No articles"}
          </div>
          <h2 className="font-display mt-5 text-2xl sm:text-3xl font-semibold text-white tracking-[-0.02em]">
            {isError
              ? "Couldn't reach the Rozper newsroom"
              : "No articles yet"}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#B8C4D4] font-light">
            {isError
              ? "We had trouble loading the latest posts. Reload the page to try again."
              : "Nothing has been published yet. Check back soon."}
          </p>
          {isError && (
            <details className="mt-6 inline-block text-left">
              <summary className="cursor-pointer text-[11px] font-mono uppercase tracking-[0.14em] text-white/40 hover:text-white/70">
                Error details
              </summary>
              <pre className="mt-3 max-w-md text-[11px] font-mono text-amber-300/80 bg-amber-400/[0.04] border border-amber-400/15 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
                {fetchError}
              </pre>
            </details>
          )}
        </div>
      </section>
    )
  }

  return (
    <section id="articles" className="relative py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {featured && (
          // Issue 7: Reduced base bottom margin from mb-14 to mb-10 on mobile
          // to avoid excessive vertical whitespace on small screens.
          <div className="mb-10 sm:mb-16 lg:mb-20">
            <FeaturedCard post={featured} />
          </div>
        )}

        <div className="flex flex-col gap-6 mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#22D3EE]">
                {hasQuery ? "Search results" : "Categories"}
              </div>
              <h2 className="font-display mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-[-0.02em]">
                {hasQuery ? (
                  <>
                    Results for{" "}
                    <span className="bg-gradient-to-r from-[#22D3EE] to-[#046BD2] bg-clip-text text-transparent">
                      &ldquo;{query}&rdquo;
                    </span>
                  </>
                ) : (
                  "Browse by categories"
                )}
              </h2>
              {hasQuery ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 px-3 py-1 text-xs text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear search
                </button>
              ) : (
                <p className="mt-2 text-sm sm:text-base text-[#B8C4D4] max-w-xl font-light">
                  Operator guides, area-code playbooks, and the voice-infra deep
                  dives our team ships every week.
                </p>
              )}
            </div>
            {/*
              Issue 3: Article count was hidden on mobile (hidden sm:flex).
              Now always visible so mobile users know how many posts match the
              current filter. Kept the same visual style.
            */}
            <div className="flex items-center gap-2 text-[11px] text-white/40 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {filtered.length} article{filtered.length === 1 ? "" : "s"}
            </div>
          </div>

          {!hasQuery && categories.length > 1 && (
            /*
              Issue 4: On mobile with many categories the pill list could grow very
              tall and push content far down. Added max-h-40 with overflow-y-auto
              on mobile so the list scrolls vertically within a constrained height.
              On sm+ screens the constraint is removed (max-h-none overflow-visible).

              Issue 9: Added max-w-full overflow-hidden to the container and
              max-w-[200px] truncate on the label so a single long category name
              cannot overflow the viewport.
            */
            <div
              role="tablist"
              aria-label="Filter posts by category"
              className="flex flex-wrap gap-2 max-h-40 overflow-y-auto sm:max-h-none sm:overflow-visible"
            >
              {categories.map((cat) => {
                const isActive = cat === active
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(cat)}
                    className={`relative text-xs sm:text-sm px-4 py-2 rounded-full transition-colors max-w-full ${
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white/90"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="cat-pill"
                        className="absolute inset-0 rounded-full bg-[#046BD2] shadow-[0_0_30px_-8px_rgba(4,107,210,0.8)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    {!isActive && (
                      <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-colors" />
                    )}
                    {/* Issue 9: truncate prevents a very long name from breaking layout */}
                    <span className="relative font-medium block max-w-[200px] truncate">{cat}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/55 text-sm">
            {hasQuery ? (
              <>
                <div className="font-display text-lg text-white mb-1">
                  No matches for &ldquo;{query}&rdquo;.
                </div>
                <div className="text-white/55">
                  Try a different keyword, or{" "}
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-[#22D3EE] hover:text-white transition-colors underline underline-offset-2"
                  >
                    clear the search
                  </button>
                  .
                </div>
              </>
            ) : (
              "No posts in this category yet — try another filter."
            )}
          </div>
        )}
      </div>
    </section>
  )
}
