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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
      <ContactHero />
      <ContactChannels />
      <ContactTestimonial />
      <ContactOffices />
      <ContactFAQ />
      <Footer />
    </main>
  )
}
