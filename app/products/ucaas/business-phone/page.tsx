import { Metadata } from 'next'
import { ProdUCaaSBusinessPhonePageView } from '@/components/products/ucaas/business-phone'

export const metadata: Metadata = {
  title: 'Business Phone · Cloud Calling for Global Teams | Rozper',
  description: 'Cloud phone with local numbers, smart routing, and AI — wherever your team is. Business calling built for 150+ countries.',
  openGraph: {
    title: 'Business Phone · Cloud Calling for Global Teams | Rozper',
    description: 'Cloud phone with local numbers, smart routing, and AI — wherever your team is.',
    type: 'website',
  },
}

export default function BusinessPhonePage() {
  return <ProdUCaaSBusinessPhonePageView />
}
