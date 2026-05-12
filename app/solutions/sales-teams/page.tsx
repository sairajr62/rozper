import type { Metadata } from 'next'
import { SalesTeamsPageView } from '@/components/solutions/sales-teams'

export const metadata: Metadata = {
  title: 'Cloud Phone for Sales Teams | Rozper',
  description: 'Power dialer, AI coaching, CRM sync, and conversation intelligence for sales teams. More dials. Better calls. More closed. rozper.com.',
}

export default function SalesTeamsPage() {
  return <SalesTeamsPageView />
}
