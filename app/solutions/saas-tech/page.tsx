import type { Metadata } from 'next'
import { SaaSPageView } from '@/components/solutions/saas'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cloud Phone for SaaS & Tech Companies | Rozper',
  description: 'Phone, video, and AI for fast-growing SaaS teams. CRM integration, global coverage, scales with headcount. rozper.com.',
  openGraph: {
    title: 'Cloud Phone for SaaS & Tech Companies | Rozper',
    description: 'Phone, video, and AI for fast-growing SaaS teams. CRM integration, global coverage, scales with headcount.',
    type: 'website',
    url: `${SITE_URL}/solutions/saas-tech`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/saas-tech` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/saas-tech#service`,
      "name": "Cloud Phone for SaaS & Tech Companies",
      "description": "Developer-friendly cloud communications for SaaS and tech companies with API access",
      "url": `${SITE_URL}/solutions/saas-tech`,
      "provider": {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
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
        { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${SITE_URL}/solutions` },
        { "@type": "ListItem", "position": 3, "name": "Cloud Phone for SaaS & Tech Companies", "item": `${SITE_URL}/solutions/saas-tech` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help SaaS & tech companies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper provides developer-friendly cloud communications with REST APIs, webhooks, and CRM integrations so SaaS and tech companies can embed voice and messaging into their workflows and scale headcount globally without complexity.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for SaaS & tech companies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers REST APIs, webhooks, CRM integrations, global phone numbers, video, team messaging, AI assistant, SSO, and developer documentation for building custom communication workflows.",
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
