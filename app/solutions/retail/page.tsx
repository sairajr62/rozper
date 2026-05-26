import type { Metadata } from 'next'
import { RetailPageView } from '@/components/solutions/retail'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Center for Retail & eCommerce | Rozper',
  description: 'Omnichannel support for retail and eCommerce. Voice, chat, SMS, and social — unified. Peaks covered. rozper.com.',
  alternates: { canonical: `${SITE_URL}/solutions/retail` },
}

export default function RetailPage() {
  return <RetailPageView />
}
