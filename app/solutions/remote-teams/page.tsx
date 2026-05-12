import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Breadcrumb,
  Hero,
  Stats,
  BentoFeatures,
  HowItWorks,
  CollaborationSection,
  Testimonials,
  FAQ,
  RelatedLinks,
  CTA,
} from './sections'

export const metadata = {
  title: 'Phone System for Remote Teams | Rozper',
  description: 'Cloud calling, video, chat, and AI for distributed teams. Works from any device, any country. 150+ countries. rozper.com.',
}

export default function RemoteTeamsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Breadcrumb />
      <Hero />
      <Stats />
      <BentoFeatures />
      <HowItWorks />
      <CollaborationSection />
      <Testimonials />
      <FAQ />
      <RelatedLinks />
      <CTA />
      <Footer />
    </main>
  )
}
