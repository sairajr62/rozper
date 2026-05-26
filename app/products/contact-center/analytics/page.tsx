import type { Metadata } from 'next'
import { ProdCCAnalyticsPageView } from '@/components/products/contact-center/analytics'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Interaction Analytics · Transcripts, Sentiment & Intent | Rozper',
  description: 'Transcripts, sentiment, intent, and quality scores — on 100% of interactions. Every conversation analyzed, instantly.',
  openGraph: {
    title: 'Interaction Analytics · Transcripts, Sentiment & Intent | Rozper',
    description: 'Transcripts, sentiment, intent, and quality scores — on 100% of interactions.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/contact-center/analytics` },
}

export default function CCAnalyticsPage() {
  return <ProdCCAnalyticsPageView />
}
