import { Metadata } from 'next'
import { ProdAIReceptionistPageView } from '@/components/products/ai/receptionist'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'AI Receptionist · 24/7 Call Answering | Rozper',
  description: 'Answers calls, qualifies leads, books meetings, and writes to your CRM — around the clock. Included on every Rozper seat.',
  openGraph: {
    title: 'AI Receptionist · 24/7 Call Answering | Rozper',
    description: 'Answers calls, qualifies leads, books meetings, and writes to your CRM — around the clock.',
    type: 'website',
    url: `${SITE_URL}/products/ai/receptionist/`,
  },
  alternates: { canonical: `${SITE_URL}/products/ai/receptionist/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/ai/receptionist#app/`,
      "name": "AI Receptionist",
      "description": "24/7 AI voice agent that answers, routes and qualifies inbound calls",
      "url": `${SITE_URL}/products/ai/receptionist/`,
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
        { "@type": "ListItem", "position": 3, "name": "AI Receptionist", "item": `${SITE_URL}/products/ai/receptionist/` },
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
            "text": "AI Receptionist is Rozper's 24/7 AI voice agent that answers inbound calls, routes them to the right team, qualifies leads, books meetings, and writes call notes to your CRM — all without human intervention.",
          },
        },
        {
          "@type": "Question",
          "name": "How does AI Receptionist integrate with existing systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Receptionist integrates with your existing phone number, CRM, and calendar so it can log leads, book appointments, and transfer calls seamlessly using your current tools.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a free trial for AI Receptionist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features.",
          },
        },
      ],
    },
  ],
}

export default function AIReceptionistProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdAIReceptionistPageView />
    </>
  )
}
