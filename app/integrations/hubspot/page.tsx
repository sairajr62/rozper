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

export default function HubSpotIntegrationPage() {
  return <HubSpotPageView />
}
