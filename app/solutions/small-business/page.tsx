import type { Metadata } from 'next'
import { SMBPageView } from '@/components/solutions/smb'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Phone System for Small Business · AI Included | Rozper',
  description: 'Small business phone system with an AI receptionist, call recording, voicemail-to-email, and CRM sync — enterprise-grade features starting at $9.99 per user.',
  openGraph: {
    title: 'Phone System for Small Business · AI Included | Rozper',
    description: 'Small business phone system with an AI receptionist, call recording, voicemail-to-email, and CRM sync — enterprise-grade features starting at $9.99 per user.',
    type: 'website',
    url: `${SITE_URL}/solutions/small-business/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/small-business/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/small-business#service/`,
      "name": "Phone System for Small Business",
      "description": "Affordable cloud phone system with AI features for small and growing businesses",
      "url": `${SITE_URL}/solutions/small-business/`,
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
        { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${SITE_URL}/solutions/` },
        { "@type": "ListItem", "position": 3, "name": "Phone System for Small Business", "item": `${SITE_URL}/solutions/small-business/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help small businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper gives small businesses enterprise-grade phone, AI receptionist, call recording, and CRM sync starting at $9.99/user — so growing teams can project professionalism and scale communications without complexity.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for small businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers an AI receptionist, auto-attendant, call recording, voicemail-to-email, CRM integrations, mobile apps, business SMS, and easy setup with no IT expertise required.",
          },
        },
        {
          "@type": "Question",
          "name": "Does Rozper offer a free trial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features. No credit card required.",
          },
        },
      ],
    },
  ],
}

export default function SMBPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SMBPageView />
    </>
  )
}
