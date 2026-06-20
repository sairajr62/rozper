import type { Metadata } from 'next'
import { SalesTeamsPageView } from '@/components/solutions/sales-teams'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cloud Phone for Sales Teams | Rozper',
  description: 'Power dialer, AI coaching, CRM sync, and conversation intelligence for sales teams. More dials. Better calls. More closed. rozper.com.',
  openGraph: {
    title: 'Cloud Phone for Sales Teams | Rozper',
    description: 'Power dialer, AI coaching, CRM sync, and conversation intelligence for sales teams. More dials. Better calls. More closed.',
    type: 'website',
    url: `${SITE_URL}/solutions/sales-teams`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/sales-teams` },
}

export default function SalesTeamsPage() {
  return <SalesTeamsPageView />
}
