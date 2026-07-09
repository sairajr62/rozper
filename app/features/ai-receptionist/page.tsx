import { Metadata } from 'next'
import { FeatAIReceptionistPageView } from '@/components/features/ai-receptionist'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'AI Receptionist · Automated 24/7 Call Answering | Rozper',
  description: 'AI receptionist that answers, qualifies, routes, and books appointments 24/7. No missed calls and automatic CRM sync for every conversation your business has.',
  openGraph: {
    title: 'AI Receptionist · Automated 24/7 Call Answering | Rozper',
    description: 'AI receptionist that answers, qualifies, routes, and books appointments 24/7. No missed calls and automatic CRM sync for every conversation your business has.',
    type: 'website',
    url: `${SITE_URL}/features/ai-receptionist/`,
  },
  alternates: { canonical: `${SITE_URL}/features/ai-receptionist/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/features/ai-receptionist#service/`,
      "name": "AI Receptionist",
      "description": "AI receptionist that answers, qualifies, routes, and books 24/7. No missed calls. CRM sync.",
      "url": `${SITE_URL}/features/ai-receptionist/`,
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
        { "@type": "ListItem", "position": 3, "name": "AI Receptionist", "item": `${SITE_URL}/features/ai-receptionist/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is AI Receptionist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Receptionist is a 24/7 virtual receptionist powered by AI that automatically answers incoming calls, greets callers, qualifies their needs, and routes them to the right team or takes a message — all without a human agent.",
          },
        },
        {
          "@type": "Question",
          "name": "How does AI Receptionist work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When a call comes in, Rozper's AI Receptionist uses natural language processing to understand the caller's intent, asks qualifying questions, and intelligently routes the call based on configurable business rules — syncing call outcomes and caller data directly to your CRM.",
          },
        },
        {
          "@type": "Question",
          "name": "Who uses AI Receptionist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Receptionist is ideal for small businesses, professional services firms, medical offices, and any organization that wants to ensure every call is answered and handled professionally around the clock without additional staffing costs.",
          },
        },
      ],
    },
  ],
}

export default function AIReceptionistFeaturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeatAIReceptionistPageView />
    </>
  )
}
