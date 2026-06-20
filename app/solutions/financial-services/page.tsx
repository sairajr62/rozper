import type { Metadata } from 'next'
import { FinancePageView } from '@/components/solutions/finance'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Center for Financial Services | Rozper',
  description: 'Compliant contact center for banks, insurance, and fintech. Call recording, PCI compliance, and regulatory controls.',
  openGraph: {
    title: 'Contact Center for Financial Services | Rozper',
    description: 'Compliant contact center for banks, insurance, and fintech. Call recording, PCI compliance, and regulatory controls.',
    type: 'website',
    url: `${SITE_URL}/solutions/financial-services`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/financial-services` },
}

export default function FinancePage() {
  return <FinancePageView />
}
