import type { Metadata } from 'next'
import { AIPageView } from '@/components/products/ai/overview'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI Suite · Receptionist, Assistant & Analytics | Rozper',
  description: 'Three AI tools — receptionist, assistant, and analytics — included on every Rozper seat. No extra charge for AI.',
  openGraph: {
    title: 'AI Suite · Receptionist, Assistant & Analytics | Rozper',
    description: 'Three AI tools — receptionist, assistant, and analytics — included on every Rozper seat.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ai` },
}

export default function AIPage() {
  return <AIPageView />
}
