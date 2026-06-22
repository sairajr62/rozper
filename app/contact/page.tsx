import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { ContactHero } from "@/components/contact/hero"
import { ContactChannels } from "@/components/contact/channels"
import { ContactTestimonial } from "@/components/contact/testimonial"
import { ContactFAQ } from "@/components/contact/faq"
import { ContactOffices } from "@/components/contact/offices"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact Sales & Support · Get in Touch | Rozper",
  description:
    "Talk to a Rozper solutions engineer in under 60 seconds. Build the right UCaaS + AI plan for your volume, regions, and integrations.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Sales & Support · Get in Touch | Rozper",
    description:
      "Talk to a Rozper solutions engineer in under 60 seconds. Build the right UCaaS + AI plan for your volume, regions, and integrations.",
    type: "website",
    url: `${SITE_URL}/contact`,
    siteName: "Rozper",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "name": "Contact Rozper",
      "description": "Get in touch with the Rozper sales and support team. Start a free trial or talk to an expert.",
      "url": `${SITE_URL}/contact`,
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      "name": "Rozper",
      "url": SITE_URL,
      "contactPoint": [
        { "@type": "ContactPoint", "contactType": "sales", "url": `${SITE_URL}/contact`, "availableLanguage": "English" },
        { "@type": "ContactPoint", "contactType": "customer support", "url": `${SITE_URL}/contact`, "availableLanguage": "English" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${SITE_URL}/contact` },
      ],
    },
  ],
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#0B1220]">
        <Navbar />
        <ContactHero />
        <ContactChannels />
        <ContactTestimonial />
        <ContactOffices />
        <ContactFAQ />
        <Footer />
      </main>
    </>
  )
}
