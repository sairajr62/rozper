import type { Metadata } from 'next'
import { ZohoPageView } from '@/components/integrations/zoho'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Rozper for Zoho · Phone & CRM Integration | Rozper',
  description: 'Connect Rozper to Zoho CRM. Click-to-call, auto-logging, AI summaries, and contact pop keep sales and support teams working from one accurate record every time.',
  openGraph: {
    title: 'Rozper for Zoho · Phone & CRM Integration | Rozper',
    description: 'Connect Rozper to Zoho CRM. Click-to-call, auto-logging, AI summaries, and contact pop keep sales and support teams working from one accurate record every time.',
    type: 'website',
    url: `${SITE_URL}/integrations/zoho/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/integrations/zoho/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Rozper for Zoho CRM",
      "description": "Sync calls, SMS, and voicemails into Zoho CRM with click-to-call and auto call logging.",
      "url": `${SITE_URL}/integrations/zoho/`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "provider": { "@type": "Organization", "@id": ORG_ID, "name": "Rozper", "url": SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Integrations", "item": `${SITE_URL}/integrations/` },
        { "@type": "ListItem", "position": 3, "name": "Zoho Integration", "item": `${SITE_URL}/integrations/zoho/` },
      ],
    },
  ],
}

export default function ZohoIntegrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ZohoPageView />
    </>
  )
}
