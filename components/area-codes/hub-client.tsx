"use client"

import { useState } from "react"
import {
  HubHero,
  WhyVirtualNumbers,
  PopularAreaCodes,
  AreaCodeDirectory,
  HubFAQ,
  HubCTA,
  type StateGroup,
} from "@/components/area-codes/hub"
import type { AreaCodeMeta } from "@/lib/area-code-data"

interface Props {
  codes: AreaCodeMeta[]
  stateGroups: StateGroup[]
  totalCodes: number
  totalStates: number
}

export function AreaCodesHubClient({ codes, stateGroups, totalCodes, totalStates }: Props) {
  const [query, setQuery] = useState("")

  const isSearching = query.trim().length > 0

  return (
    <>
      {/* 1. Hero + search + stats */}
      <HubHero
        totalCodes={totalCodes}
        totalStates={totalStates}
        stateGroups={stateGroups}
        query={query}
        setQuery={setQuery}
      />

      {/* 2. Why virtual numbers (hidden while searching) */}
      {!isSearching && <WhyVirtualNumbers />}

      {/* 3. Directory (always shown — doubles as search results) */}
      <AreaCodeDirectory codes={codes} stateGroups={stateGroups} query={query} setQuery={setQuery} />

      {/* 4 & 5. Popular codes + FAQ + CTA (hidden while searching) */}
      {!isSearching && (
        <>
          <PopularAreaCodes />
          <HubFAQ />
          <HubCTA />
        </>
      )}
    </>
  )
}
