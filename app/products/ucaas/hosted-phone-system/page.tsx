import { Metadata } from 'next'
import { ProdUCaaSPhoneSystemPageView } from '@/components/products/ucaas/phone-system'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Hosted Phone System · Extensions, Hunt Groups, IVR | Rozper',
  description: 'Extensions, hunt groups, IVR, and dial plans — hosted on a carrier-grade network. Enterprise phone features, zero hardware.',
  openGraph: {
    title: 'Hosted Phone System · Extensions, Hunt Groups, IVR | Rozper',
    description: 'Extensions, hunt groups, IVR, and dial plans — hosted on a carrier-grade network.',
    type: 'website',
    url: `${SITE_URL}/products/ucaas/hosted-phone-system`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/products/ucaas/hosted-phone-system` },
}

export default function PhoneSystemPage() {
  return <ProdUCaaSPhoneSystemPageView />
}
