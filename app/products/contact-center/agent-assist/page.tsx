import type { Metadata } from 'next'
import { ProdCCAgentAssistPageView } from '@/components/products/contact-center/agent-assist'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'AI Agent Assist · Live Coaching on Every Call | Rozper',
  description: 'AI that whispers the right answer, surfaces knowledge base articles, and scores call quality in real time — delivering live coaching on every single call.',
  openGraph: {
    title: 'AI Agent Assist · Live Coaching on Every Call | Rozper',
    description: 'AI that whispers the right answer, surfaces knowledge base articles, and scores call quality in real time — delivering live coaching on every single call.',
    type: 'website',
    url: `${SITE_URL}/products/contact-center/agent-assist/`,
  },
  alternates: { canonical: `${SITE_URL}/products/contact-center/agent-assist/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/contact-center/agent-assist#app/`,
      "name": "AI Agent Assist",
      "description": "Real-time AI coaching that surfaces answers and next-best-action on every call",
      "url": `${SITE_URL}/products/contact-center/agent-assist/`,
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
        { "@type": "ListItem", "position": 3, "name": "AI Agent Assist", "item": `${SITE_URL}/products/contact-center/agent-assist/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is AI Agent Assist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Agent Assist is Rozper's real-time coaching layer that listens to every call and instantly surfaces the right answers, knowledge articles, and next-best-action suggestions to agents without them having to search.",
          },
        },
        {
          "@type": "Question",
          "name": "How does AI Agent Assist integrate with existing systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Agent Assist connects to your knowledge base, CRM, and ticketing systems to pull relevant information and push disposition notes automatically at the end of each call.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a free trial for AI Agent Assist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features.",
          },
        },
      ],
    },
  ],
}

export default function CCAgentAssistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdCCAgentAssistPageView />
    </>
  )
}
