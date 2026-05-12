import type { Metadata } from 'next'
import { ProdCCOutboundDialerPageView } from '@/components/products/contact-center/outbound-dialer'

export const metadata: Metadata = {
  title: 'Outbound Dialer · Power & Predictive Dialing | Rozper',
  description: 'Power and predictive dialer with compliance tools, AI coaching, and CRM sync. Outbound dialing, compliant at scale.',
  openGraph: {
    title: 'Outbound Dialer · Power & Predictive Dialing | Rozper',
    description: 'Power and predictive dialer with compliance tools, AI coaching, and CRM sync.',
    type: 'website',
  },
}

export default function CCOutboundDialerPage() {
  return <ProdCCOutboundDialerPageView />
}
