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
import { SITE_URL } from '@/lib/site'

export const metadata = {
  title: 'Phone System for Remote Teams | Rozper',
  description: 'Cloud calling, video, chat, and AI for distributed teams. Works from any device, any country. 150+ countries. rozper.com.',
  openGraph: {
    title: 'Phone System for Remote Teams | Rozper',
    description: 'Cloud calling, video, chat, and AI for distributed teams. Works from any device, any country. 150+ countries.',
    type: 'website',
    url: `${SITE_URL}/solutions/remote-teams`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/remote-teams` },
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
