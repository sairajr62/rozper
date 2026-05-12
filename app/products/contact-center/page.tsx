import type { Metadata } from 'next'
import { ContactCenterPageView } from '@/components/products/contact-center/overview'

export const metadata: Metadata = {
  title: 'Contact Center · AI-Powered, Omnichannel | Rozper',
  description: 'Omnichannel inbox, AI agents, supervisor tools, and analytics — one platform. Contact center that handles itself.',
  openGraph: {
    title: 'Contact Center · AI-Powered, Omnichannel | Rozper',
    description: 'Omnichannel inbox, AI agents, supervisor tools, and analytics — one platform.',
    type: 'website',
  },
}

export default function ContactCenterPage() {
  return <ContactCenterPageView />
}
