import { Metadata } from 'next'
import { ProdUCaaSOnlineFaxPageView } from '@/components/products/ucaas/online-fax'

export const metadata: Metadata = {
  title: 'Online Fax · Digital Fax for Business Teams | Rozper',
  description: 'Send and receive faxes from your browser, mobile, or email — in 150+ countries. Digital fax, no machine, no desk.',
  openGraph: {
    title: 'Online Fax · Digital Fax for Business Teams | Rozper',
    description: 'Send and receive faxes from your browser, mobile, or email — in 150+ countries.',
    type: 'website',
  },
}

export default function OnlineFaxPage() {
  return <ProdUCaaSOnlineFaxPageView />
}
