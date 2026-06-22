import { Metadata } from 'next'
import { ProdUCaaSBusinessPhonePageView } from '@/components/products/unified-communications/business-phone'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Business Phone · Cloud Calling for Global Teams | Rozper',
  description: 'Cloud phone with local numbers, smart routing, and AI — wherever your team is. Business calling built for 150+ countries.',
  openGraph: {
    title: 'Business Phone · Cloud Calling for Global Teams | Rozper',
    description: 'Cloud phone with local numbers, smart routing, and AI — wherever your team is.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/business-phone` },
}

export default function BusinessPhonePage() {
  return <ProdUCaaSBusinessPhonePageView />
}
