import type { Metadata } from 'next'
import { HealthcarePageView } from '@/components/solutions/healthcare'

export const metadata: Metadata = {
  title: 'Phone System for Healthcare · HIPAA-Compliant | Rozper',
  description: 'HIPAA-compliant phone, fax, and messaging for healthcare teams. Call recording, AI receptionist, and patient communications. rozper.com.',
}

export default function HealthcarePage() {
  return <HealthcarePageView />
}
