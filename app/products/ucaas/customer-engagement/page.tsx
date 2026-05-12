import { Metadata } from 'next'
import { ProdUCaaSCustomerEngagementPageView } from '@/components/products/ucaas/customer-engagement'

export const metadata: Metadata = {
  title: 'Customer Engagement · Every Channel, One Inbox | Rozper',
  description: 'Voice, SMS, WhatsApp, Instagram, Facebook, and web chat — unified for every agent. One inbox for all customer conversations.',
  openGraph: {
    title: 'Customer Engagement · Every Channel, One Inbox | Rozper',
    description: 'Voice, SMS, WhatsApp, Instagram, Facebook, and web chat — unified for every agent.',
    type: 'website',
  },
}

export default function CustomerEngagementPage() {
  return <ProdUCaaSCustomerEngagementPageView />
}
