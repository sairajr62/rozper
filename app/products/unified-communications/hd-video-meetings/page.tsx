import { Metadata } from 'next'
import { ProdUCaaSVideoMeetingsPageView } from '@/components/products/unified-communications/video-meetings'
import { localizeMetadata } from "@/lib/locale-metadata"
import { SITE_URL, ORG_ID } from "@/lib/site"

const metadata: Metadata = {
  title: 'HD Video Meetings · AI Transcripts Included | Rozper',
  description: 'Up to 200 participants, AI-generated meeting summaries, and screen sharing — all built inside Rozper. HD video meetings now include automatic AI transcripts.',
  openGraph: {
    title: 'HD Video Meetings · AI Transcripts Included | Rozper',
    description: 'Up to 200 participants, AI-generated meeting summaries, and screen sharing — all built inside Rozper. HD video meetings now include automatic AI transcripts.',
    type: 'website',
    url: `${SITE_URL}/products/unified-communications/hd-video-meetings/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/hd-video-meetings/` },
}
export const generateMetadata = localizeMetadata(metadata)


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/unified-communications/hd-video-meetings#app/`,
      "name": "HD Video Meetings",
      "description": "Browser-based HD video meetings with AI transcription and recording",
      "url": `${SITE_URL}/products/unified-communications/hd-video-meetings/`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": { "@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Starting at $9.99 per user/month" },
      "provider": {
        "@type": "Organization",
        "@id": ORG_ID,
        "name": "Rozper",
        "url": SITE_URL
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}/products/` },
        { "@type": "ListItem", "position": 3, "name": "Unified Communications", "item": `${SITE_URL}/products/unified-communications/` },
        { "@type": "ListItem", "position": 4, "name": "HD Video Meetings", "item": `${SITE_URL}/products/unified-communications/hd-video-meetings/` }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is HD Video Meetings?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's HD Video Meetings is a browser-based conferencing solution supporting up to 200 participants with AI transcription, AI summaries, screen sharing, and recording — all built into the Rozper platform." }
        },
        {
          "@type": "Question",
          "name": "How much does HD Video Meetings cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's unified communications plans start at $9.99 per user per month, including HD Video Meetings and a 14-day free trial." }
        },
        {
          "@type": "Question",
          "name": "Does HD Video Meetings work on mobile?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, HD Video Meetings works on web browsers, iOS, and Android via the Rozper mobile app." }
        }
      ]
    }
  ]
}

export default function VideoMeetingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdUCaaSVideoMeetingsPageView />
    </>
  )
}
