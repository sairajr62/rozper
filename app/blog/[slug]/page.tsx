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

// Statically generate at build time from local markdown posts.
export const dynamic = "force-static"
// Allow on-demand rendering of any new slug that wasn't pre-built.
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
    // WP posts carry an absolute link (the original rozper.com URL).
    // Local markdown posts carry a relative path — prefix with SITE_URL.
    alternates: {
      canonical: post.link.startsWith("http")
        ? post.link
        : `${SITE_URL}${post.link}`,
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

  // Canonical: WP posts carry an absolute link; local markdown posts are relative.
  const canonical = post.link.startsWith("http")
    ? post.link
    : `${SITE_URL}${post.link}`

  const shareUrl = `${SITE_URL}/blog/${post.slug}/`

  const category = post.categories[0]
  const keywords = post.tags.map((t) => t.name).join(", ") || undefined

  // BlogPosting structured data
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": canonical,
    url: canonical,
    headline: post.title,
    name: post.title,
    description: post.seoDescription || post.excerpt,
    ...(post.featuredImage
      ? {
          image: {
            "@type": "ImageObject",
            url: post.featuredImage.src,
            ...(post.featuredImage.width ? { width: post.featuredImage.width } : {}),
            ...(post.featuredImage.height ? { height: post.featuredImage.height } : {}),
          },
        }
      : {}),
    datePublished: post.date,
    dateModified: post.modified,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.avatar ? { image: post.author.avatar } : {}),
    },
    publisher: {
      "@type": "Organization",
      "@id": SITE_URL,
      name: "Rozper",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/white-rozper-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    ...(keywords ? { keywords } : {}),
    ...(category ? { articleSection: category.name } : {}),
  }

  // BreadcrumbList mirrors the visual breadcrumb: Home › Blog › Post Title
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <PostProgress />
      <Navbar />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
