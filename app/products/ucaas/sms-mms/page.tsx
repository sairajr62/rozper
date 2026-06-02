import { Metadata } from 'next'
import { ProdUCaaSSMSMMSPageView } from '@/components/products/ucaas/sms-mms'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Business SMS & MMS · Messaging Built for Teams | Rozper',
  description: 'Two-way messaging, bulk sends, and WhatsApp — all from your business number. SMS and MMS built for business scale.',
  openGraph: {
    title: 'Business SMS & MMS · Messaging Built for Teams | Rozper',
    description: 'Two-way messaging, bulk sends, and WhatsApp — all from your business number.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ucaas/sms-mms` },
}

export default function SMSMMSPage() {
  return <ProdUCaaSSMSMMSPageView />
}
