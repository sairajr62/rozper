import { Metadata } from 'next'
import { FeatAISentimentPageView } from '@/components/features/ai-sentiment'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI Sentiment Analysis · Real-Time Call Emotion Scoring | Rozper',
  description: 'Live sentiment scoring on every call. Supervisors get alerts when calls go negative. 100% coverage. rozper.com.',
  openGraph: {
    title: 'AI Sentiment Analysis · Real-Time Call Emotion Scoring | Rozper',
    description: 'Live sentiment scoring on every call. Supervisors get alerts when calls go negative. 100% coverage.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/features/ai-sentiment/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/features/ai-sentiment#service/`,
      "name": "AI Sentiment Analysis",
      "description": "Live sentiment scoring on every call. Supervisors get alerts when calls go negative. 100% coverage.",
      "url": `${SITE_URL}/features/ai-sentiment/`,
      "provider": {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        "name": "Rozper",
        "url": SITE_URL,
      },
      "serviceType": "Cloud Communications",
      "category": "Telecommunications",
      "areaServed": { "@type": "Place", "name": "Worldwide" },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Features", "item": `${SITE_URL}/features/` },
        { "@type": "ListItem", "position": 3, "name": "AI Sentiment Analysis", "item": `${SITE_URL}/features/ai-sentiment/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is AI Sentiment Analysis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Sentiment Analysis is a real-time call analytics feature that detects the emotional tone of both the customer and agent during a live conversation, scoring sentiment as positive, neutral, or negative to flag at-risk interactions instantly.",
          },
        },
        {
          "@type": "Question",
          "name": "How does AI Sentiment Analysis work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper's AI Sentiment Analysis engine continuously transcribes and analyzes speech patterns during calls, assigning sentiment scores in real time. Supervisors receive automatic alerts when a call's sentiment trends negative, enabling immediate intervention.",
          },
        },
        {
          "@type": "Question",
          "name": "Who uses AI Sentiment Analysis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Sentiment Analysis is used by contact center managers, quality assurance teams, and customer experience leaders who need full visibility into call quality and customer satisfaction across 100% of their call volume.",
          },
        },
      ],
    },
  ],
}

export default function AISentimentFeaturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeatAISentimentPageView />
    </>
  )
}
