import type { Metadata } from 'next'
import { LogisticsPageView } from '@/components/solutions/logistics'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Phone System for Logistics & Dispatch | Rozper',
  description: 'Dispatch communications, driver calls, customer updates, and coordination tools for logistics teams. rozper.com.',
  alternates: { canonical: `${SITE_URL}/solutions/logistics` },
}

export default function LogisticsPage() {
  return <LogisticsPageView />
}
