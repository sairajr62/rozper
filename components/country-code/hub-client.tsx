"use client"

import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import {
  CountryHubHero,
  WhyInternational,
  BrowseByRegion,
  CountryHubFAQ,
  CountryHubCTA,
} from "@/components/country-code/hub"
import { COUNTRIES } from "@/lib/country-code-data"

export function CountryCodeHubClient() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
      <CountryHubHero total={COUNTRIES.length} query="" setQuery={() => {}} />
      <WhyInternational />
      <BrowseByRegion countries={COUNTRIES} />
      <CountryHubFAQ />
      <CountryHubCTA />
      <Footer />
    </main>
  )
}
