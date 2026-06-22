import { Metadata } from 'next'
import { ProdUCaaSCustomerEngagementPageView } from '@/components/products/unified-communications/customer-engagement'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Customer Engagement · Every Channel, One Inbox | Rozper',
  description: 'Voice, SMS, WhatsApp, Instagram, Facebook, and web chat — unified for every agent. One inbox for all customer conversations.',
  openGraph: {
    title: 'Customer Engagement · Every Channel, One Inbox | Rozper',
    description: 'Voice, SMS, WhatsApp, Instagram, Facebook, and web chat — unified for every agent.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/customer-engagement` },
}

export default function CustomerEngagementPage() {
  return <ProdUCaaSCustomerEngagementPageView />
}
