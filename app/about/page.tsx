import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { AboutHero } from "@/components/about/hero"
import { AboutStory } from "@/components/about/story"
import { AboutPrinciples } from "@/components/about/principles"
import { AboutTimeline } from "@/components/about/timeline"
import { AboutTeam } from "@/components/about/team"
import { AboutCTA } from "@/components/about/cta"

export const metadata: Metadata = {
  title: "About · Rozper",
  description:
    "Rozper unifies voice, video, contact center, and AI on one carrier-grade platform. Founded in 2018 — built so every call just works.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutPrinciples />
      <AboutTimeline />
      <AboutTeam />
      <AboutCTA />
      <Footer />
    </main>
  )
}
