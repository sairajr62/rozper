import type { Metadata } from 'next'
import { ContactCenterPageView } from '@/components/products/contact-center/overview'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Center · AI-Powered, Omnichannel | Rozper',
  description: 'Omnichannel inbox, AI agents, supervisor tools, and analytics — one platform. Contact center that handles itself.',
  openGraph: {
    title: 'Contact Center · AI-Powered, Omnichannel | Rozper',
    description: 'Omnichannel inbox, AI agents, supervisor tools, and analytics — one platform.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/contact-center` },
}

export default function ContactCenterPage() {
  return <ContactCenterPageView />
}
