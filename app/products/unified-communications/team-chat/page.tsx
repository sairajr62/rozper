import { Metadata } from 'next'
import { ProdUCaaSTeamChatPageView } from '@/components/products/unified-communications/team-chat'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Team Chat · Built Into Your Phone System | Rozper',
  description: 'Chat, share files, and start calls from one app — no extra tools. Team messaging built into your phone system.',
  openGraph: {
    title: 'Team Chat · Built Into Your Phone System | Rozper',
    description: 'Chat, share files, and start calls from one app — no extra tools.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/team-chat/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/unified-communications/team-chat#app/`,
      "name": "Team Chat",
      "description": "Persistent team messaging built directly into your Rozper phone system",
      "url": `${SITE_URL}/products/unified-communications/team-chat/`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": { "@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Starting at $9.99 per user/month" },
      "provider": {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        "name": "Rozper",
        "url": SITE_URL
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}/products/` },
        { "@type": "ListItem", "position": 3, "name": "Unified Communications", "item": `${SITE_URL}/products/unified-communications/` },
        { "@type": "ListItem", "position": 4, "name": "Team Chat", "item": `${SITE_URL}/products/unified-communications/team-chat/` }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Team Chat?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's Team Chat is persistent team messaging built directly into the Rozper phone system, letting teams chat, share files, and start calls from one app without switching tools." }
        },
        {
          "@type": "Question",
          "name": "How much does Team Chat cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's unified communications plans start at $9.99 per user per month, including Team Chat and a 14-day free trial." }
        },
        {
          "@type": "Question",
          "name": "Does Team Chat work on mobile?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, Team Chat works on web browsers, iOS, and Android via the Rozper mobile app." }
        }
      ]
    }
  ]
}

export default function TeamChatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdUCaaSTeamChatPageView />
    </>
  )
}
