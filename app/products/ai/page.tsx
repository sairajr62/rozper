import type { Metadata } from 'next'
import { AIPageView } from '@/components/products/ai/overview'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI Suite · Receptionist, Assistant & Analytics | Rozper',
  description: 'Three AI tools — receptionist, assistant, and analytics — included on every Rozper seat. No extra charge for AI.',
  openGraph: {
    title: 'AI Suite · Receptionist, Assistant & Analytics | Rozper',
    description: 'Three AI tools — receptionist, assistant, and analytics — included on every Rozper seat.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ai` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/ai#app`,
      "name": "AI Suite",
      "description": "AI voice receptionist, assistant, and conversation analytics in one platform",
      "url": `${SITE_URL}/products/ai`,
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
        { "@type": "ListItem", "position": 3, "name": "AI Suite", "item": `${SITE_URL}/products/ai` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is AI Suite?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Suite is Rozper's bundled set of AI tools — including an AI receptionist, a per-seat AI assistant, and conversation analytics — included on every Rozper seat at no extra charge.",
          },
        },
        {
          "@type": "Question",
          "name": "How does AI Suite integrate with existing systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Suite integrates natively with Rozper's phone system and connects to popular CRMs, helpdesks, and calendars via pre-built integrations and open APIs.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a free trial for AI Suite?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features.",
          },
        },
      ],
    },
  ],
}

export default function AIPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AIPageView />
    </>
  )
}
