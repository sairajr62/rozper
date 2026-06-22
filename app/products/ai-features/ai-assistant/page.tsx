import { Metadata } from 'next'
import { ProdUCaaSAIAssistantPageView } from '@/components/products/unified-communications/ai-assistant'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI Assistant · Per-Seat AI for Every Team Member | Rozper',
  description: 'Per-seat AI that answers, drafts, summarizes, and coaches — on every call and message. AI that works before your team arrives.',
  openGraph: {
    title: 'AI Assistant · Per-Seat AI for Every Team Member | Rozper',
    description: 'Per-seat AI that answers, drafts, summarizes, and coaches — on every call and message.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ai-features/ai-assistant` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Assistant",
      "description": "Per-seat AI assistant that answers calls, drafts messages, summarizes conversations, and coaches agents.",
      "url": `${SITE_URL}/products/ai-features/ai-assistant`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "provider": { "@type": "Organization", "@id": `${SITE_URL}#organization`, "name": "Rozper", "url": SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}/products` },
        { "@type": "ListItem", "position": 3, "name": "AI Features", "item": `${SITE_URL}/products/ai-features` },
        { "@type": "ListItem", "position": 4, "name": "AI Assistant", "item": `${SITE_URL}/products/ai-features/ai-assistant` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does the Rozper AI Assistant do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Rozper AI Assistant answers inbound calls, drafts message replies, summarizes conversations, and provides real-time coaching to agents — all on a per-seat basis.",
          },
        },
        {
          "@type": "Question",
          "name": "Does the AI Assistant work on all calls?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the AI Assistant operates across all inbound and outbound calls, SMS threads, and voicemails within the Rozper platform.",
          },
        },
        {
          "@type": "Question",
          "name": "Is the AI Assistant included in the base plan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Assistant features are available as a per-seat add-on and are included in select Rozper plans. Contact sales for details on your specific plan.",
          },
        },
      ],
    },
  ],
}

export default function UCaaSAIAssistantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdUCaaSAIAssistantPageView />
    </>
  )
}
