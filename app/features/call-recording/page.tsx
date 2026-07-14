import { Metadata } from 'next'
import { FeatCallRecordingPageView } from '@/components/features/call-recording'
import { localizeMetadata } from "@/lib/locale-metadata"
import { SITE_URL, ORG_ID } from "@/lib/site"

const metadata: Metadata = {
  title: 'Call Recording · AI Search & Compliance Tools | Rozper',
  description: 'Record every call with AI transcription, keyword search, and configurable retention policies, plus GDPR and HIPAA compliance options for regulated teams.',
  openGraph: {
    title: 'Call Recording · AI Search & Compliance Tools | Rozper',
    description: 'Record every call with AI transcription, keyword search, and configurable retention policies, plus GDPR and HIPAA compliance options for regulated teams.',
    type: 'website',
    url: `${SITE_URL}/features/call-recording/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/features/call-recording/` },
}
export const generateMetadata = localizeMetadata(metadata)


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/features/call-recording#service/`,
      "name": "Call Recording",
      "description": "Record every call with AI transcription, keyword search, and configurable retention. GDPR and HIPAA options.",
      "url": `${SITE_URL}/features/call-recording/`,
      "provider": {
        "@type": "Organization",
        "@id": ORG_ID,
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
        { "@type": "ListItem", "position": 3, "name": "Call Recording", "item": `${SITE_URL}/features/call-recording/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Call Recording?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Call Recording is an automatic cloud-based feature that captures every inbound and outbound call, generates AI-powered transcripts, and stores recordings securely with configurable retention policies to meet compliance requirements including GDPR and HIPAA.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Call Recording work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper automatically records calls as they happen and uploads them to secure cloud storage. AI transcription runs post-call, making every recording fully searchable by keyword. Retention rules, access controls, and compliance flags are all configurable from the dashboard.",
          },
        },
        {
          "@type": "Question",
          "name": "Who uses Call Recording?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Call Recording is used by businesses in regulated industries such as finance, healthcare, and legal services, as well as contact centers and sales teams that need recordings for quality assurance, dispute resolution, and agent coaching.",
          },
        },
      ],
    },
  ],
}

export default function CallRecordingFeaturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeatCallRecordingPageView />
    </>
  )
}
