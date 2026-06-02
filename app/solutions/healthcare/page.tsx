import type { Metadata } from 'next'
import { HealthcarePageView } from '@/components/solutions/healthcare'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Phone System for Healthcare · HIPAA-Compliant | Rozper',
  description: 'HIPAA-compliant phone, fax, and messaging for healthcare teams. Call recording, AI receptionist, and patient communications. rozper.com.',
  alternates: { canonical: `${SITE_URL}/solutions/healthcare` },
}

export default function HealthcarePage() {
  return <HealthcarePageView />
}
