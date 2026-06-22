import type { Metadata } from 'next'
import { FinancePageView } from '@/components/solutions/finance'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Center for Financial Services | Rozper',
  description: 'Compliant contact center for banks, insurance, and fintech. Call recording, PCI compliance, and regulatory controls. rozper.com.',
  openGraph: {
    title: 'Contact Center for Financial Services | Rozper',
    description: 'Compliant contact center for banks, insurance, and fintech. Call recording, PCI compliance, and regulatory controls.',
    type: 'website',
    url: `${SITE_URL}/solutions/finance`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/finance` },
}

export default function FinancePage() {
  return <FinancePageView />
}
