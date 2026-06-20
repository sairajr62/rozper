"use client"

import { useState } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import {
  CountryHubHero,
  WhyInternational,
  BrowseByRegion,
  PopularCountries,
  CountryDirectory,
  CountryHubFAQ,
  CountryHubCTA,
} from "@/components/country-code/hub"
import { COUNTRIES } from "@/lib/country-code-data"

export function CountryCodeHubClient() {
  const [query, setQuery] = useState("")

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
      <CountryHubHero total={COUNTRIES.length} query={query} setQuery={setQuery} />
      <WhyInternational />
      <BrowseByRegion countries={COUNTRIES} />
      <PopularCountries countries={COUNTRIES} />
      <CountryDirectory countries={COUNTRIES} query={query} setQuery={setQuery} />
      <CountryHubFAQ />
      <CountryHubCTA />
      <Footer />
    </main>
  )
}
