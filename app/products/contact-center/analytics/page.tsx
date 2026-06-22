import type { Metadata } from 'next'
import { ProdCCAnalyticsPageView } from '@/components/products/contact-center/analytics'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Interaction Analytics · Transcripts, Sentiment & Intent | Rozper',
  description: 'Transcripts, sentiment, intent, and quality scores — on 100% of interactions. Every conversation analyzed, instantly.',
  openGraph: {
    title: 'Interaction Analytics · Transcripts, Sentiment & Intent | Rozper',
    description: 'Transcripts, sentiment, intent, and quality scores — on 100% of interactions.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/contact-center/analytics` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/contact-center/analytics#app`,
      "name": "Interaction Analytics",
      "description": "Call transcripts, sentiment analysis, and performance dashboards",
      "url": `${SITE_URL}/products/contact-center/analytics`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free trial available" },
      "provider": {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        "name": "Rozper",
        "url": SITE_URL,
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}/products` },
        { "@type": "ListItem", "position": 3, "name": "Interaction Analytics", "item": `${SITE_URL}/products/contact-center/analytics` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Interaction Analytics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Interaction Analytics delivers full call transcripts, AI-powered sentiment analysis, and performance dashboards so contact center managers can measure quality and identify coaching opportunities across every interaction.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Interaction Analytics integrate with existing systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Interaction Analytics is built into the Rozper Contact Center platform and can export data and reports to BI tools, CRMs, and data warehouses via API.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a free trial for Interaction Analytics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features.",
          },
        },
      ],
    },
  ],
}

export default function CCAnalyticsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdCCAnalyticsPageView />
    </>
  )
}
