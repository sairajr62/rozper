import { Metadata } from 'next'
import { ProdAIConversationPageView } from '@/components/products/ai/conversation'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Conversation Analytics · Transcripts & Sentiment | Rozper',
  description: 'Transcripts, sentiment scoring, intent detection, and keyword trend tracking — on 100% of conversations, included free on every Rozper seat with no extra fees.',
  openGraph: {
    title: 'Conversation Analytics · Transcripts & Sentiment | Rozper',
    description: 'Transcripts, sentiment scoring, intent detection, and keyword trend tracking — on 100% of conversations, included free on every Rozper seat with no extra fees.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ai/conversation/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/ai/conversation#app/`,
      "name": "Conversation Analytics",
      "description": "Auto-transcription, sentiment detection, and keyword insights on every call",
      "url": `${SITE_URL}/products/ai/conversation/`,
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
        { "@type": "ListItem", "position": 3, "name": "Conversation Analytics", "item": `${SITE_URL}/products/ai/conversation/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Conversation Analytics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Conversation Analytics is Rozper's AI-powered tool that automatically transcribes every call, detects sentiment, identifies keywords, and surfaces intent trends across 100% of your conversations.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Conversation Analytics integrate with existing systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Conversation Analytics is built into the Rozper platform and works automatically on all calls. Transcripts and insights can be pushed to your CRM or exported via API.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a free trial for Conversation Analytics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features.",
          },
        },
      ],
    },
  ],
}

export default function ConversationAnalyticsProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdAIConversationPageView />
    </>
  )
}
