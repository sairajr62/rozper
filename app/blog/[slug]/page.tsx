import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { PostArticleHero } from "@/components/blog/post-article"
import { PostLayout } from "@/components/blog/post-layout"
import { RelatedPosts } from "@/components/blog/related-posts"
import { PostProgress } from "@/components/blog/post-progress"
import { BlogNewsletter } from "@/components/blog/newsletter"
import {
  fetchAllSlugs,
  fetchPostBySlug,
  fetchRelatedPosts,
} from "@/lib/blog-api"
import { SITE_URL } from "@/lib/site"
import { applyLocale, getRequestLocale } from "@/lib/locale-metadata"
import { BlogPostingStructuredData, BreadcrumbStructuredData } from "@/components/seo/structured-data"

// Pre-built at build time via generateStaticParams below; rendered per-request
// (not force-static) so generateMetadata can read the x-locale header and
// serve translated title/description per locale — force-static makes
// headers() return empty values unconditionally, which silently pinned
// every locale's blog metadata to English.
export const dynamicParams = true

type RouteParams = { slug: string }

export async function generateStaticParams(): Promise<RouteParams[]> {
  try {
    const slugs = await fetchAllSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug(slug).catch(() => null)
  const locale = await getRequestLocale()

  if (!post) {
    return applyLocale({
      title: "Article not found · Rozper Blog",
      description: "This article doesn't exist or has been moved.",
    }, locale)
  }

  const description =
    post.seoDescription ||
    post.excerpt ||
    `Read "${post.title}" on the Rozper blog.`

  const title = post.seoTitle || `${post.title} · Rozper Blog`

  return applyLocale({
    title,
    description,
    // WP posts carry an absolute link (the original rozper.com URL).
    // Local markdown posts carry a relative path — prefix with SITE_URL.
    alternates: {
      canonical: post.link.startsWith("http")
        ? post.link
        : `${SITE_URL}/blog/${post.slug}/`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author.name],
      url: `${SITE_URL}/blog/${post.slug}/`,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage.src,
              alt: post.featuredImage.alt,
              width: post.featuredImage.width,
              height: post.featuredImage.height,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.featuredImage ? [post.featuredImage.src] : undefined,
    },
  }, locale)
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>
}) {
  const { slug } = await params
  const post = await fetchPostBySlug(slug).catch(() => null)
  if (!post) notFound()

  const related = await fetchRelatedPosts(post, 3).catch(() => [])

  // Canonical: WP posts carry an absolute link; local markdown posts use slug.
  const canonical = post.link.startsWith("http")
    ? post.link
    : `${SITE_URL}/blog/${post.slug}/`

  const shareUrl = `${SITE_URL}/blog/${post.slug}/`

  const category = post.categories[0]
  const keywords = post.tags.map((t) => t.name).join(", ") || undefined

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <PostProgress />
      <Navbar />
      <BlogPostingStructuredData
        url={canonical}
        title={post.title}
        description={post.seoDescription || post.excerpt}
        image={
          post.featuredImage
            ? {
                url: post.featuredImage.src,
                width: post.featuredImage.width,
                height: post.featuredImage.height,
              }
            : undefined
        }
        datePublished={post.date}
        dateModified={post.modified}
        authorName={post.author.name}
        authorImage={post.author.avatar}
        category={category?.name}
        keywords={keywords}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog/` },
          { name: post.title, url: canonical },
        ]}
      />
      <PostArticleHero post={post} />
      <PostLayout
        html={post.contentHtml}
        shareUrl={shareUrl}
        title={post.title}
        tags={post.tags}
        author={post.author}
      />
      <RelatedPosts posts={related} />
      <BlogNewsletter />
      <Footer />
    </main>
  )
}
