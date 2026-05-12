import type { Metadata } from 'next'
import { RetailPageView } from '@/components/solutions/retail'

export const metadata: Metadata = {
  title: 'Contact Center for Retail & eCommerce | Rozper',
  description: 'Omnichannel support for retail and eCommerce. Voice, chat, SMS, and social — unified. Peaks covered. rozper.com.',
}

export default function RetailPage() {
  return <RetailPageView />
}
