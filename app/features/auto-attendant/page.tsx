import { Metadata } from 'next'
import { FeatAutoAttendantPageView } from '@/components/features/auto-attendant'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Auto-Attendant & Visual IVR Builder | Rozper',
  description: 'Multi-level auto-attendant and visual IVR builder. Route calls correctly from the first ring. No code needed. rozper.com.',
  alternates: { canonical: `${SITE_URL}/features/auto-attendant/` },
  openGraph: {
    title: 'Auto-Attendant & Visual IVR Builder | Rozper',
    description: 'Multi-level auto-attendant and visual IVR builder. Route calls correctly from the first ring. No code needed.',
    type: 'website',
    url: `${SITE_URL}/features/auto-attendant/`,
    siteName: 'Rozper',
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/features/auto-attendant#service/`,
      "name": "Auto Attendant",
      "description": "Multi-level auto-attendant and visual IVR builder. Route calls correctly from the first ring. No code needed.",
      "url": `${SITE_URL}/features/auto-attendant/`,
      "provider": {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
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
        { "@type": "ListItem", "position": 3, "name": "Auto Attendant", "item": `${SITE_URL}/features/auto-attendant/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Auto Attendant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Auto Attendant is a cloud-based IVR (Interactive Voice Response) system that automatically answers incoming calls, plays a professional greeting, and routes callers to the right department, extension, or voicemail — 24 hours a day, 7 days a week.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Auto Attendant work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "With Rozper's visual IVR builder, you design multi-level call flow menus without any coding. When a call arrives, the auto-attendant plays your recorded prompts, collects keypad input from the caller, and routes them instantly according to your configured rules.",
          },
        },
        {
          "@type": "Question",
          "name": "Who uses Auto Attendant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Auto Attendant is used by businesses of all sizes — from small offices wanting a professional phone presence to large enterprises managing high call volumes across multiple departments — who need reliable, no-code call routing from the first ring.",
          },
        },
      ],
    },
  ],
}

export default function AutoAttendantFeaturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeatAutoAttendantPageView />
    </>
  )
}
