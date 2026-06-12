"use client"

import { useState } from "react"
import {
  HubHero,
  WhyVirtualNumbers,
  BrowseByState,
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

  // When searching, skip all non-directory sections and jump straight to results
  const isSearching = query.trim().length > 0

  return (
    <>
      {/* 1. Hero + search + stats */}
      <HubHero
        totalCodes={totalCodes}
        totalStates={totalStates}
        query={query}
        setQuery={setQuery}
      />

      {/* 2–6. Only show when not searching */}
      {!isSearching && (
        <>
          {/* 2. Why virtual numbers */}
          <WhyVirtualNumbers />

          {/* 3. Browse by state */}
          <BrowseByState stateGroups={stateGroups} />

          {/* 4. Popular area codes */}
          <PopularAreaCodes />
        </>
      )}

      {/* 5. Full searchable directory (always shown) */}
      <AreaCodeDirectory codes={codes} query={query} setQuery={setQuery} />

      {/* 6 & 7. FAQ + CTA (hidden while searching) */}
      {!isSearching && (
        <>
          <HubFAQ />
          <HubCTA />
        </>
      )}
    </>
  )
}
