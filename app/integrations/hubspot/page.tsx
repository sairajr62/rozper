import type { Metadata } from 'next'
import { HubSpotPageView } from '@/components/integrations/hubspot'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Rozper for HubSpot · Phone & CRM Integration | Rozper',
  description: 'Connect Rozper to HubSpot. Click-to-call, auto-logging, AI summaries, and deal-stage triggers. No manual entry.',
  openGraph: {
    title: 'Rozper for HubSpot · Phone & CRM Integration | Rozper',
    description: 'Connect Rozper to HubSpot. Click-to-call, auto-logging, AI summaries, and deal-stage triggers. No manual entry.',
    type: 'website',
    url: `${SITE_URL}/integrations/hubspot`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/integrations/hubspot` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Rozper for HubSpot",
      "description": "Sync Rozper calls, SMS, and voicemails directly into HubSpot CRM. Click-to-call, auto-logging, and contact sync.",
      "url": `${SITE_URL}/integrations/hubspot`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "provider": { "@type": "Organization", "@id": `${SITE_URL}#organization`, "name": "Rozper", "url": SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Integrations", "item": `${SITE_URL}/integrations` },
        { "@type": "ListItem", "position": 3, "name": "HubSpot Integration", "item": `${SITE_URL}/integrations/hubspot` },
      ],
    },
  ],
}

export default function HubSpotIntegrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HubSpotPageView />
    </>
  )
}
