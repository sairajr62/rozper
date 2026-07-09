import type { Metadata } from 'next'
import { UcaasPageView } from '@/components/products/unified-communications/overview'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'UCaaS Platform · Unified Communications for Teams | Rozper',
  description: 'Voice, video, messaging, and AI in one unified platform for over 150 countries, starting at $9.99 per user per month. Start a no-pressure conversation today.',
  openGraph: {
    title: 'UCaaS Platform · Unified Communications for Teams | Rozper',
    description: 'Voice, video, messaging, and AI in one unified platform for over 150 countries, starting at $9.99 per user per month. Start a no-pressure conversation today.',
    type: 'website',
    url: `${SITE_URL}/products/unified-communications/`,
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/unified-communications#app/`,
      "name": "UCaaS Platform",
      "description": "Cloud phone, video, team chat, SMS, and fax unified for global teams",
      "url": `${SITE_URL}/products/unified-communications/`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": { "@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Starting at $9.99 per user/month" },
      "provider": {
        "@type": "Organization",
        "@id": ORG_ID,
        "name": "Rozper",
        "url": SITE_URL
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}/products/` },
        { "@type": "ListItem", "position": 3, "name": "Unified Communications", "item": `${SITE_URL}/products/unified-communications/` }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is UCaaS Platform?",
          "acceptedAnswer": { "@type": "Answer", "text": "UCaaS Platform is Rozper's unified communications solution that brings together cloud phone, video meetings, team chat, SMS, MMS, and fax in one platform for global teams." }
        },
        {
          "@type": "Question",
          "name": "How much does UCaaS Platform cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's unified communications plans start at $9.99 per user per month, including UCaaS Platform and a 14-day free trial." }
        },
        {
          "@type": "Question",
          "name": "Does UCaaS Platform work on mobile?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, UCaaS Platform works on web browsers, iOS, and Android via the Rozper mobile app." }
        }
      ]
    }
  ]
}

export default function UcaasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UcaasPageView />
    </>
  )
}
