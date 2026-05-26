import type { Metadata } from 'next'
import { ProdCCOutboundDialerPageView } from '@/components/products/contact-center/outbound-dialer'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Outbound Dialer · Power & Predictive Dialing | Rozper',
  description: 'Power and predictive dialer with compliance tools, AI coaching, and CRM sync. Outbound dialing, compliant at scale.',
  openGraph: {
    title: 'Outbound Dialer · Power & Predictive Dialing | Rozper',
    description: 'Power and predictive dialer with compliance tools, AI coaching, and CRM sync.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/contact-center/outbound-dialer` },
}

export default function CCOutboundDialerPage() {
  return <ProdCCOutboundDialerPageView />
}
