import { Metadata } from 'next'
import { FeatAIAgentAssistPageView } from '@/components/features/ai-agent-assist'
import { localizeMetadata } from "@/lib/locale-metadata"
import { SITE_URL, ORG_ID } from "@/lib/site"

const metadata: Metadata = {
  title: 'AI Agent Assist · Live Whisper Coaching for Agents | Rozper',
  description: 'AI whispers answers, surfaces articles, and scores calls live so agents resolve issues faster, ramp quicker, and sound more confident on every single call.',
  openGraph: {
    title: 'AI Agent Assist · Live Whisper Coaching for Agents | Rozper',
    description: 'AI whispers answers, surfaces articles, and scores calls live so agents resolve issues faster, ramp quicker, and sound more confident on every single call.',
    type: 'website',
    url: `${SITE_URL}/features/ai-agent-assist/`,
  },
  alternates: { canonical: `${SITE_URL}/features/ai-agent-assist/` },
}
export const generateMetadata = localizeMetadata(metadata)


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/features/ai-agent-assist#service/`,
      "name": "AI Agent Assist",
      "description": "AI whispers answers, surfaces articles, and scores calls live. Faster resolution. Better agents.",
      "url": `${SITE_URL}/features/ai-agent-assist/`,
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
        { "@type": "ListItem", "position": 3, "name": "AI Agent Assist", "item": `${SITE_URL}/features/ai-agent-assist/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is AI Agent Assist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Agent Assist is a live coaching tool that listens to calls in real time and whispers relevant knowledge base answers, suggested responses, and next-best-action prompts directly to the agent — without the customer hearing.",
          },
        },
        {
          "@type": "Question",
          "name": "How does AI Agent Assist work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "During a live call, Rozper's AI engine transcribes the conversation in real time, detects customer intent, and surfaces the most relevant articles, scripts, and step-by-step guides on the agent's screen — all within seconds of the question being asked.",
          },
        },
        {
          "@type": "Question",
          "name": "Who uses AI Agent Assist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Agent Assist is used by contact centers, customer support teams, and sales organizations that want to reduce average handle time, accelerate agent onboarding, and improve first-call resolution rates.",
          },
        },
      ],
    },
  ],
}

export default function AIAgentAssistFeaturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeatAIAgentAssistPageView />
    </>
  )
}
