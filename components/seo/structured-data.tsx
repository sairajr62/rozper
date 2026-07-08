import { SITE_URL, ORG_ID } from "@/lib/site"

/**
 * Normalizes a date string/Date into RFC-3339 with an explicit timezone.
 * Handles bare "YYYY-MM-DD" dates and naive "YYYY-MM-DDTHH:mm:ss" datetimes
 * (no timezone designator) by assuming UTC, since that's what this site's
 * data sources (local markdown frontmatter, WP REST `date` field) use.
 */
function toRfc3339(input?: string | Date | null): string | undefined {
  if (!input) return undefined
  if (input instanceof Date) {
    return isNaN(input.getTime()) ? undefined : input.toISOString()
  }
  const trimmed = input.trim()
  if (!trimmed) return undefined

  const hasTime = trimmed.includes("T")
  const hasTz = /Z$|[+-]\d{2}:?\d{2}$/.test(trimmed)
  const candidate = hasTime && !hasTz ? `${trimmed}Z` : trimmed

  const parsed = new Date(candidate)
  if (!isNaN(parsed.getTime())) return parsed.toISOString()

  const fallback = new Date(trimmed)
  return isNaN(fallback.getTime()) ? undefined : fallback.toISOString()
}

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Site-wide Organization schema. Mount once in the root layout so it
 * appears on every page without per-page setup.
 *
 * Only includes offices Rozper actually operates — currently just Hong Kong.
 * Add more locations here (as additional `address`/`location` entries) once
 * real addresses for other offices are confirmed; don't fabricate them.
 */
export function SiteStructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Rozper",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/white-rozper-logo.png`,
    },
    sameAs: ["https://www.linkedin.com/company/rozper", "https://twitter.com/rozper"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_URL}/contact/`,
      availableLanguage: "English",
    },
    founder: [{ "@type": "Person", name: "-" }],
    areaServed: {
      "@type": "GeoCircle",
      geoRadius: "1000 km",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "22.2775601",
        longitude: "114.1685159",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "8/F, China Hong Kong Tower, 8-12 Hennessy Road",
      addressLocality: "Wan Chai",
      addressRegion: "Hong Kong",
      postalCode: "999077",
      addressCountry: "HK",
    },
  }

  return <JsonLd data={organizationSchema} />
}

export type BreadcrumbItem = { name: string; url: string }

/**
 * Emits a BreadcrumbList matching a visual breadcrumb trail.
 * `items` should be in order, e.g. [{ name: "Home", url: SITE_URL }, ...].
 */
export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={schema} />
}

export type FaqItem = { question: string; answer: string }

/**
 * Emits an FAQPage schema from a list of Q&A pairs.
 */
export function FaqPageStructuredData({ items }: { items: FaqItem[] }) {
  if (!items.length) return null

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return <JsonLd data={schema} />
}

export type BlogPostingInput = {
  url: string
  title: string
  description?: string
  image?: { url: string; width?: number; height?: number }
  datePublished?: string | Date | null
  dateModified?: string | Date | null
  authorName: string
  authorImage?: string
  category?: string
  keywords?: string
}

/**
 * Emits a BlogPosting (Article) schema for a blog post.
 */
export function BlogPostingStructuredData(post: BlogPostingInput) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": post.url,
    url: post.url,
    headline: post.title,
    name: post.title,
    ...(post.description ? { description: post.description } : {}),
    ...(post.image
      ? {
          image: {
            "@type": "ImageObject",
            url: post.image.url,
            ...(post.image.width ? { width: post.image.width } : {}),
            ...(post.image.height ? { height: post.image.height } : {}),
          },
        }
      : {}),
    ...(toRfc3339(post.datePublished) ? { datePublished: toRfc3339(post.datePublished) } : {}),
    ...(toRfc3339(post.dateModified) ? { dateModified: toRfc3339(post.dateModified) } : {}),
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: post.authorName,
      ...(post.authorImage ? { image: post.authorImage } : {}),
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Rozper",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/white-rozper-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
    ...(post.keywords ? { keywords: post.keywords } : {}),
    ...(post.category ? { articleSection: post.category } : {}),
  }

  return <JsonLd data={schema} />
}
