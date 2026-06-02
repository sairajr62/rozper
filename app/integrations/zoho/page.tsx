import type { Metadata } from 'next'
import { ZohoPageView } from '@/components/integrations/zoho'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Rozper for Zoho · Phone & CRM Integration | Rozper',
  description: 'Connect Rozper to Zoho CRM. Click-to-call, auto-logging, AI summaries, and contact pop. No manual entry. rozper.com.',
  alternates: { canonical: `${SITE_URL}/integrations/zoho` },
}

export default function ZohoIntegrationPage() {
  return <ZohoPageView />
}
