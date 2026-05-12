import type { Metadata } from 'next'
import { AIPageView } from '@/components/products/ai/overview'

export const metadata: Metadata = {
  title: 'AI Suite · Receptionist, Assistant & Conversation Analytics | Rozper',
  description: 'Three AI tools — receptionist, assistant, and analytics — included on every Rozper seat. No extra charge for AI.',
  openGraph: {
    title: 'AI Suite · Receptionist, Assistant & Conversation Analytics | Rozper',
    description: 'Three AI tools — receptionist, assistant, and analytics — included on every Rozper seat.',
    type: 'website',
  },
}

export default function AIPage() {
  return <AIPageView />
}
