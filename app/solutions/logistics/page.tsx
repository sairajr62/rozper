import type { Metadata } from 'next'
import { LogisticsPageView } from '@/components/solutions/logistics'

export const metadata: Metadata = {
  title: 'Phone System for Logistics & Dispatch | Rozper',
  description: 'Dispatch communications, driver calls, customer updates, and coordination tools for logistics teams. rozper.com.',
}

export default function LogisticsPage() {
  return <LogisticsPageView />
}
