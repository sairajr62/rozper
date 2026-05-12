import { Metadata } from 'next'
import { FeatAISentimentPageView } from '@/components/features/ai-sentiment'

export const metadata: Metadata = {
  title: 'AI Sentiment Analysis · Real-Time Call Emotion Scoring | Rozper',
  description: 'Live sentiment scoring on every call. Supervisors get alerts when calls go negative. 100% coverage. rozper.com.',
  openGraph: {
    title: 'AI Sentiment Analysis · Real-Time Call Emotion Scoring | Rozper',
    description: 'Live sentiment scoring on every call. Supervisors get alerts when calls go negative. 100% coverage.',
    type: 'website',
  },
}

export default function AISentimentFeaturePage() {
  return <FeatAISentimentPageView />
}
