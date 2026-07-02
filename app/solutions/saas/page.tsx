import type { Metadata } from 'next'
import { SaaSPageView } from '@/components/solutions/saas'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Cloud Phone for SaaS & Tech Companies | Rozper',
  description: 'Phone, video, and AI for fast-growing SaaS teams. CRM integration, global coverage, scales with headcount. rozper.com.',
  openGraph: {
    title: 'Cloud Phone for SaaS & Tech Companies | Rozper',
    description: 'Phone, video, and AI for fast-growing SaaS teams. CRM integration, global coverage, scales with headcount.',
    type: 'website',
    url: `${SITE_URL}/solutions/saas/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/saas/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/saas#service/`,
      "name": "Cloud Phone for SaaS & Tech",
      "description": "Cloud communications platform built for SaaS companies and tech startups",
      "url": `${SITE_URL}/solutions/saas/`,
      "provider": {
        "@type": "Organization",
        "@id": ORG_ID,
        "name": "Rozper",
        "url": SITE_URL,
      },
      "serviceType": "Cloud Communications",
      "category": "Telecommunications",
      "areaServed": { "@type": "Place", "name": "Worldwide" },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${SITE_URL}/solutions/` },
        { "@type": "ListItem", "position": 3, "name": "Cloud Phone for SaaS & Tech", "item": `${SITE_URL}/solutions/saas/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help SaaS companies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper gives SaaS companies and tech startups a scalable cloud communications platform with phone, video, AI, and CRM integrations that grow with their headcount and support global expansion without infrastructure overhead.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for SaaS companies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers cloud phone, video conferencing, team messaging, AI assistant, CRM integrations, global number coverage, REST APIs, and developer-friendly tools built to scale with fast-growing SaaS organizations.",
          },
        },
        {
          "@type": "Question",
          "name": "Does Rozper offer a free trial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features. No credit card required.",
          },
        },
      ],
    },
  ],
}

export default function SaaSPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SaaSPageView />
    </>
  )
}
