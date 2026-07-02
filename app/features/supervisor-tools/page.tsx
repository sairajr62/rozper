import { Metadata } from 'next'
import { FeatSupervisorToolsPageView } from '@/components/features/supervisor-tools'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Call Barge, Whisper & Monitoring | Rozper',
  description: 'Silent monitor, whisper coaching, and barge-in on any live call. Real-time supervisor control.',
  openGraph: {
    title: 'Call Barge, Whisper & Monitoring | Rozper',
    description: 'Silent monitor, whisper coaching, and barge-in on any live call. Real-time supervisor control.',
    type: 'website',
    url: `${SITE_URL}/features/supervisor-tools/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/features/supervisor-tools/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/features/supervisor-tools#service/`,
      "name": "Supervisor Tools",
      "description": "Silent monitor, whisper coaching, and barge-in on any live call. Real-time supervisor control.",
      "url": `${SITE_URL}/features/supervisor-tools/`,
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
        { "@type": "ListItem", "position": 3, "name": "Supervisor Tools", "item": `${SITE_URL}/features/supervisor-tools/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Supervisor Tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Supervisor Tools is a real-time contact center oversight suite that gives supervisors the ability to silently monitor live calls, whisper coaching tips to agents without the customer hearing, or barge into calls when immediate intervention is needed.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Supervisor Tools work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "From the Rozper supervisor dashboard, managers can see all active calls in real time and join any call in one click — choosing monitor mode (listen only), whisper mode (speak to the agent only), or barge mode (join the full conversation). No special hardware is required.",
          },
        },
        {
          "@type": "Question",
          "name": "Who uses Supervisor Tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Supervisor Tools is used by contact center supervisors, team leads, and quality assurance managers who need real-time visibility and control over agent calls to ensure service quality, support new agents, and resolve escalations quickly.",
          },
        },
      ],
    },
  ],
}

export default function SupervisorToolsFeaturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeatSupervisorToolsPageView />
    </>
  )
}
