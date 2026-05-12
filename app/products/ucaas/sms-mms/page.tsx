import { Metadata } from 'next'
import { ProdUCaaSSMSMMSPageView } from '@/components/products/ucaas/sms-mms'

export const metadata: Metadata = {
  title: 'Business SMS & MMS · Messaging Built for Teams | Rozper',
  description: 'Two-way messaging, bulk sends, and WhatsApp — all from your business number. SMS and MMS built for business scale.',
  openGraph: {
    title: 'Business SMS & MMS · Messaging Built for Teams | Rozper',
    description: 'Two-way messaging, bulk sends, and WhatsApp — all from your business number.',
    type: 'website',
  },
}

export default function SMSMMSPage() {
  return <ProdUCaaSSMSMMSPageView />
}
