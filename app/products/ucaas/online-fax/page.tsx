import { Metadata } from 'next'
import { ProdUCaaSOnlineFaxPageView } from '@/components/products/ucaas/online-fax'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Online Fax · Digital Fax for Business Teams | Rozper',
  description: 'Send and receive faxes from your browser, mobile, or email — in 150+ countries. Digital fax, no machine, no desk.',
  openGraph: {
    title: 'Online Fax · Digital Fax for Business Teams | Rozper',
    description: 'Send and receive faxes from your browser, mobile, or email — in 150+ countries.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ucaas/online-fax` },
}

export default function OnlineFaxPage() {
  return <ProdUCaaSOnlineFaxPageView />
}
