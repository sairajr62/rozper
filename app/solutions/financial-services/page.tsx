import type { Metadata } from 'next'
import { FinancePageView } from '@/components/solutions/finance'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Center for Financial Services | Rozper',
  description: 'Compliant contact center for banks, insurance, and fintech. Call recording, PCI compliance, and regulatory controls. rozper.com.',
  alternates: { canonical: `${SITE_URL}/solutions/financial-services` },
}

export default function FinancePage() {
  return <FinancePageView />
}
