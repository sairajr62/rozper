import { Metadata } from 'next'
import { ProdAIConversationPageView } from '@/components/products/ai/conversation'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Conversation Analytics · Transcripts, Sentiment & Intent | Rozper',
  description: 'Transcripts, sentiment, intent, and keyword trends — on 100% of conversations. Included on every Rozper seat.',
  openGraph: {
    title: 'Conversation Analytics · Transcripts, Sentiment & Intent | Rozper',
    description: 'Transcripts, sentiment, intent, and keyword trends — on 100% of conversations.',
    type: 'website',
    url: `${SITE_URL}/products/ai/conversation-analytics`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/products/ai/conversation-analytics` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/ai/conversation-analytics#app`,
      "name": "Conversation Analytics",
      "description": "Full call transcripts, sentiment scoring, and intent analysis",
      "url": `${SITE_URL}/products/ai/conversation-analytics`,
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
        { "@type": "ListItem", "position": 3, "name": "Conversation Analytics", "item": `${SITE_URL}/products/ai/conversation-analytics` },
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
            "text": "Conversation Analytics provides full transcripts of every call alongside sentiment scoring and intent analysis, giving teams visibility into what is being said, how customers feel, and what they need.",
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
