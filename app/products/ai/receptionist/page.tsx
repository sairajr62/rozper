import { Metadata } from 'next'
import { ProdAIReceptionistPageView } from '@/components/products/ai/receptionist'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI Receptionist · 24/7 Call Answering | Rozper',
  description: 'Answers calls, qualifies leads, books meetings, and writes to your CRM — around the clock. Included on every Rozper seat.',
  openGraph: {
    title: 'AI Receptionist · 24/7 Call Answering | Rozper',
    description: 'Answers calls, qualifies leads, books meetings, and writes to your CRM — around the clock.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ai/receptionist` },
}

export default function AIReceptionistProductPage() {
  return <ProdAIReceptionistPageView />
}
