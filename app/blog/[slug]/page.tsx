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

// Refresh each post every 30 min via ISR.
export const revalidate = 1800
// Allow on-demand rendering of any new slug that wasn't pre-built.
export const dynamicParams = true

const SITE_URL = "https://www.rozper.com"

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
  if (!post) {
    return {
      title: "Article not found · Rozper Blog",
      description: "This article doesn't exist or has been moved.",
    }
  }

  const description =
    post.seoDescription ||
    post.excerpt ||
    `Read "${post.title}" on the Rozper blog.`

  const title = post.seoTitle || `${post.title} · Rozper Blog`

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author.name],
      url: `${SITE_URL}/blog/${post.slug}`,
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
  }
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

  const shareUrl = `${SITE_URL}/blog/${post.slug}`

  // JSON-LD for search
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.featuredImage?.src,
    datePublished: post.date,
    dateModified: post.modified,
    author: { "@type": "Person", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: "Rozper",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/white-rozper-logo.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": shareUrl },
  }

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <PostProgress />
      <Navbar />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
