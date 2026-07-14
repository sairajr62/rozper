import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { localizeMetadata } from "@/lib/locale-metadata"

// Healthcare page temporarily disabled — returns 404 and is excluded from indexing.
const metadata: Metadata = {
  title: 'Not Found | Rozper',
  robots: { index: false, follow: false },
}

export const generateMetadata = localizeMetadata(metadata)

export default function HealthcarePage() {
  notFound()
}
