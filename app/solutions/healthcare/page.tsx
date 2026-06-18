import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Healthcare page temporarily disabled — returns 404 and is excluded from indexing.
export const metadata: Metadata = {
  title: 'Not Found | Rozper',
  robots: { index: false, follow: false },
}

export default function HealthcarePage() {
  notFound()
}
