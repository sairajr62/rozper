import type { Metadata } from 'next'
import { ZohoPageView } from '@/components/integrations/zoho'

export const metadata: Metadata = {
  title: 'Rozper for Zoho · Phone & CRM Integration | Rozper',
  description: 'Connect Rozper to Zoho CRM. Click-to-call, auto-logging, AI summaries, and contact pop. No manual entry. rozper.com.',
}

export default function ZohoIntegrationPage() {
  return <ZohoPageView />
}
