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
    url: `${SITE_URL}/solutions/smb/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/smb/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/smb#service/`,
      "name": "Phone System for Small Business",
      "description": "All-in-one phone, video, and messaging for small and medium businesses",
      "url": `${SITE_URL}/solutions/smb/`,
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
        { "@type": "ListItem", "position": 3, "name": "Phone System for Small Business", "item": `${SITE_URL}/solutions/smb/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help small and medium businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper gives small and medium businesses an all-in-one phone, video, and messaging platform with enterprise-grade features at affordable pricing, so SMBs can communicate professionally and scale without complexity.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for small and medium businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers cloud phone, video meetings, team messaging, AI receptionist, call recording, voicemail-to-email, business SMS, mobile apps, and CRM integrations — all in one platform starting at $9.99/user.",
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
