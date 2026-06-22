import type { Metadata } from "next"
import { WholesaleVoipPageView } from "@/components/solutions/wholesale-voip"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Wholesale VoIP · Global Voice Termination | Rozper",
  description:
    "Wholesale VoIP termination with direct A-Z routes, secure SIP interconnections, and optimized global voice delivery. Built for carriers and VoIP providers.",
  openGraph: {
    title: "Wholesale VoIP · Global Voice Termination | Rozper",
    description:
      "Direct A-Z routes, secure carrier interconnections, and performance-optimized global VoIP termination — built for carriers, VoIP providers, and telecom operators.",
    type: "website",
    url: `${SITE_URL}/wholesale-voip`,
    siteName: "Rozper",
  },
  alternates: { canonical: `${SITE_URL}/wholesale-voip` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/wholesale-voip#service`,
      "name": "Wholesale VoIP Termination",
      "alternateName": "Wholesale Voice Termination",
      "description": "Carrier-grade wholesale VoIP termination with direct A-Z routes, secure SIP interconnections, and performance-optimized global voice delivery. Built for carriers, VoIP providers, and telecom operators.",
      "url": `${SITE_URL}/wholesale-voip`,
      "provider": {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        "name": "Rozper",
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/icon.svg`,
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "sales",
          "url": `${SITE_URL}/contact`,
          "availableLanguage": "English",
        },
      },
      "serviceType": "VoIP Termination",
      "category": "Telecommunications",
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Wholesale VoIP Plans",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "A-Z Voice Termination",
              "description": "Direct routes to 150+ countries with competitive per-minute rates and guaranteed SLA.",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SIP Trunk Interconnection",
              "description": "Secure SIP interconnections with redundant PoPs and real-time monitoring.",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "High-Volume Call Routing",
              "description": "Intelligent LCR (Least Cost Routing) optimized for quality and cost at enterprise scale.",
            },
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": SITE_URL,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Wholesale VoIP",
          "item": `${SITE_URL}/wholesale-voip`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is wholesale VoIP termination?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Wholesale VoIP termination is the process of routing large volumes of voice calls over IP networks from one carrier to another. Rozper provides direct A-Z routes with carrier-grade quality for businesses, carriers, and VoIP providers.",
          },
        },
        {
          "@type": "Question",
          "name": "How many countries does Rozper's wholesale VoIP cover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper's wholesale VoIP termination covers 150+ countries with direct routes and competitive per-minute pricing, backed by a carrier-grade global network.",
          },
        },
        {
          "@type": "Question",
          "name": "What SLA does Rozper offer for wholesale VoIP?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers a 99.99% uptime SLA for wholesale VoIP services, with redundant infrastructure, real-time monitoring, and 24/7 technical support.",
          },
        },
      ],
    },
  ],
}

export default function WholesaleVoipPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WholesaleVoipPageView />
    </>
  )
}
