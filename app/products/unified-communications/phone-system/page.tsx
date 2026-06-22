import { Metadata } from 'next'
import { ProdUCaaSPhoneSystemPageView } from '@/components/products/unified-communications/phone-system'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Hosted Phone System · Extensions, Hunt Groups, IVR | Rozper',
  description: 'Extensions, hunt groups, IVR, and dial plans — hosted on a carrier-grade network. Enterprise phone features, zero hardware.',
  openGraph: {
    title: 'Hosted Phone System · Extensions, Hunt Groups, IVR | Rozper',
    description: 'Extensions, hunt groups, IVR, and dial plans — hosted on a carrier-grade network.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/phone-system` },
}

export default function PhoneSystemPage() {
  return <ProdUCaaSPhoneSystemPageView />
}
