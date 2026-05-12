import type { Metadata } from 'next'
import { FinancePageView } from '@/components/solutions/finance'

export const metadata: Metadata = {
  title: 'Contact Center for Financial Services | Rozper',
  description: 'Compliant contact center for banks, insurance, and fintech. Call recording, PCI compliance, and regulatory controls. rozper.com.',
}

export default function FinancePage() {
  return <FinancePageView />
}
