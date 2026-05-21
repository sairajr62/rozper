import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { ContactHero } from "@/components/contact/hero"
import { ContactChannels } from "@/components/contact/channels"
import { ContactTestimonial } from "@/components/contact/testimonial"
import { ContactFAQ } from "@/components/contact/faq"
import { ContactOffices } from "@/components/contact/offices"

export const metadata: Metadata = {
  title: "Contact Sales · Rozper",
  description:
    "Talk to a solutions engineer in under 60 seconds. Build the right plan for your volume, regions, and integrations.",
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
