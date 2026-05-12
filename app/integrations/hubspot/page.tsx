import type { Metadata } from 'next'
import { HubSpotPageView } from '@/components/integrations/hubspot'

export const metadata: Metadata = {
  title: 'Rozper for HubSpot · Phone & CRM Integration | Rozper',
  description: 'Connect Rozper to HubSpot. Click-to-call, auto-logging, AI summaries, and deal-stage triggers. No manual entry. rozper.com.',
}

export default function HubSpotIntegrationPage() {
  return <HubSpotPageView />
}
