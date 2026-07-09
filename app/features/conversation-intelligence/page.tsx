import { Metadata } from 'next'
import { FeatConversationIntelligencePageView } from '@/components/features/conversation-intelligence'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Conversation Intelligence · Searchable Insights | Rozper',
  description: 'Every conversation transcribed, analyzed, and made searchable. Competitor mentions, deal risks, and coaching moments are all surfaced for your whole team.',
  openGraph: {
    title: 'Conversation Intelligence · Searchable Insights | Rozper',
    description: 'Every conversation transcribed, analyzed, and made searchable. Competitor mentions, deal risks, and coaching moments are all surfaced for your whole team.',
    type: 'website',
    url: `${SITE_URL}/features/conversation-intelligence/`,
  },
  alternates: { canonical: `${SITE_URL}/features/conversation-intelligence/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/features/conversation-intelligence#service/`,
      "name": "Conversation Intelligence",
      "description": "Every conversation transcribed, analyzed, and searchable. Competitor mentions, deal risks, coaching moments — all surfaced.",
      "url": `${SITE_URL}/features/conversation-intelligence/`,
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
        { "@type": "ListItem", "position": 2, "name": "Features", "item": `${SITE_URL}/features/` },
        { "@type": "ListItem", "position": 3, "name": "Conversation Intelligence", "item": `${SITE_URL}/features/conversation-intelligence/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Conversation Intelligence?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Conversation Intelligence is a call analytics platform that automatically transcribes every call, detects keywords and topics, identifies deal risks and competitor mentions, and surfaces coaching opportunities — turning every conversation into actionable business insight.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Conversation Intelligence work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper records and transcribes calls using AI, then applies natural language processing to detect patterns, keywords, sentiment, and outcomes. Results are indexed and made fully searchable, with automated coaching alerts and trend reports delivered to managers.",
          },
        },
        {
          "@type": "Question",
          "name": "Who uses Conversation Intelligence?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Conversation Intelligence is used by sales teams, customer success managers, and contact center leaders who want to understand what is being said on calls at scale, improve agent performance, and reduce churn by catching at-risk conversations early.",
          },
        },
      ],
    },
  ],
}

export default function ConversationIntelligenceFeaturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeatConversationIntelligencePageView />
    </>
  )
}
