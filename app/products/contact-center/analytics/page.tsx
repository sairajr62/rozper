import type { Metadata } from 'next'
import { ProdCCAnalyticsPageView } from '@/components/products/contact-center/analytics'

export const metadata: Metadata = {
  title: 'Interaction Analytics · Transcripts, Sentiment & Intent | Rozper',
  description: 'Transcripts, sentiment, intent, and quality scores — on 100% of interactions. Every conversation analyzed, instantly.',
  openGraph: {
    title: 'Interaction Analytics · Transcripts, Sentiment & Intent | Rozper',
    description: 'Transcripts, sentiment, intent, and quality scores — on 100% of interactions.',
    type: 'website',
  },
}

export default function CCAnalyticsPage() {
  return <ProdCCAnalyticsPageView />
}
