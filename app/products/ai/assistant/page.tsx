import { Metadata } from 'next'
import { ProdAIAssistantPageView } from '@/components/products/ai/assistant'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'AI Virtual Assistant · Per-Seat AI for Every Agent | Rozper',
  description: 'Live coaching, auto-summaries, and suggested replies — on every call and message. Included on every Rozper seat.',
  openGraph: {
    title: 'AI Virtual Assistant · Per-Seat AI for Every Agent | Rozper',
    description: 'Live coaching, auto-summaries, and suggested replies — on every call and message.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ai/assistant/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/ai/assistant#app/`,
      "name": "AI Virtual Assistant",
      "description": "Per-seat AI that drafts responses, summarizes calls, and coaches agents",
      "url": `${SITE_URL}/products/ai/assistant/`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free trial available" },
      "provider": {
        "@type": "Organization",
        "@id": ORG_ID,
        "name": "Rozper",
        "url": SITE_URL,
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}/products/` },
        { "@type": "ListItem", "position": 3, "name": "AI Virtual Assistant", "item": `${SITE_URL}/products/ai/assistant/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is AI Virtual Assistant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Virtual Assistant is a per-seat AI tool included with every Rozper seat that drafts suggested replies, auto-summarizes calls, and provides live coaching to agents during every interaction.",
          },
        },
        {
          "@type": "Question",
          "name": "How does AI Virtual Assistant integrate with existing systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Virtual Assistant works within the Rozper agent interface and integrates with your CRM and helpdesk to surface relevant context and push call summaries automatically.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a free trial for AI Virtual Assistant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features.",
          },
        },
      ],
    },
  ],
}

export default function AIAssistantProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdAIAssistantPageView />
    </>
  )
}
