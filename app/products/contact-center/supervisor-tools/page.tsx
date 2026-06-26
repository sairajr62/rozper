import type { Metadata } from 'next'
import { ProdCCSupervisorToolsPageView } from '@/components/products/contact-center/supervisor-tools'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Supervisor Tools · Barge, Whisper, Monitor | Rozper',
  description: 'Barge, whisper, and monitor live — with AI alerts when calls need attention. See every call and fix it before it ends.',
  openGraph: {
    title: 'Supervisor Tools · Barge, Whisper, Monitor | Rozper',
    description: 'Barge, whisper, and monitor live — with AI alerts when calls need attention.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/contact-center/supervisor-tools/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/contact-center/supervisor-tools#app/`,
      "name": "Supervisor Tools",
      "description": "Barge, whisper, monitor, and real-time dashboards for contact center supervisors",
      "url": `${SITE_URL}/products/contact-center/supervisor-tools/`,
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
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}/products/` },
        { "@type": "ListItem", "position": 3, "name": "Supervisor Tools", "item": `${SITE_URL}/products/contact-center/supervisor-tools/` },
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
            "text": "Supervisor Tools gives contact center managers the ability to barge into live calls, whisper coaching to agents, silently monitor conversations, and view real-time wallboard dashboards — with AI alerts when a call needs immediate attention.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Supervisor Tools integrate with existing systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Supervisor Tools is natively built into the Rozper Contact Center platform and works alongside your existing reporting, QA, and workforce management tools.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a free trial for Supervisor Tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features.",
          },
        },
      ],
    },
  ],
}

export default function CCSupervisorToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdCCSupervisorToolsPageView />
    </>
  )
}
