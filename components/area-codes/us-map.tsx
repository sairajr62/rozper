"use client"
// v4
import { useState, useMemo } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const GEO_URL = "/states-10m.json"

const STATE_CENTROIDS: Record<string, [number, number]> = {
  Alabama: [-86.8, 32.8],
  Alaska: [-153.4, 61.4],
  Arizona: [-111.1, 34.3],
  Arkansas: [-92.4, 34.9],
  California: [-119.4, 36.8],
  Colorado: [-105.5, 39.0],
  Connecticut: [-72.7, 41.6],
  Delaware: [-75.5, 39.0],
  "District of Columbia": [-77.0, 38.9],
  Florida: [-81.7, 28.1],
  Georgia: [-83.4, 32.2],
  Hawaii: [-157.5, 20.3],
  Idaho: [-114.5, 44.4],
  Illinois: [-89.2, 40.0],
  Indiana: [-86.3, 39.9],
  Iowa: [-93.2, 42.1],
  Kansas: [-98.4, 38.5],
  Kentucky: [-85.3, 37.8],
  Louisiana: [-91.8, 31.1],
  Maine: [-69.4, 44.7],
  Maryland: [-77.0, 39.0],
  Massachusetts: [-71.6, 42.2],
  Michigan: [-85.4, 43.3],
  Minnesota: [-94.3, 46.4],
  Mississippi: [-89.7, 32.7],
  Missouri: [-92.5, 38.5],
  Montana: [-110.5, 46.9],
  Nebraska: [-99.9, 41.5],
  Nevada: [-116.4, 38.5],
  "New Hampshire": [-71.6, 43.7],
  "New Jersey": [-74.5, 40.1],
  "New Mexico": [-105.9, 34.4],
  "New York": [-75.1, 43.0],
  "North Carolina": [-79.0, 35.5],
  "North Dakota": [-100.5, 47.5],
  Ohio: [-82.8, 40.4],
  Oklahoma: [-97.5, 35.6],
  Oregon: [-120.5, 44.0],
  Pennsylvania: [-77.2, 40.9],
  "Rhode Island": [-71.5, 41.7],
  "South Carolina": [-80.9, 33.8],
  "South Dakota": [-100.2, 44.4],
  Tennessee: [-86.7, 35.9],
  Texas: [-99.3, 31.5],
  Utah: [-111.1, 39.3],
  Vermont: [-72.7, 44.0],
  Virginia: [-78.7, 37.5],
  Washington: [-120.5, 47.4],
  "West Virginia": [-80.7, 38.6],
  Wisconsin: [-89.8, 44.2],
  Wyoming: [-107.5, 43.1],
}

type CodeEntry = { code: string; city: string; stateSlug: string; excerpt: string }

export function USStateMap({ state, stateSlug, codes }: {
  state: string
  stateSlug: string
  codes: CodeEntry[]
}) {
  const centroid = STATE_CENTROIDS[state]
  const displayCodes = codes.slice(0, 9)
  const extra = codes.length - displayCodes.length

  // Badge grid layout
  const cols = displayCodes.length <= 2 ? 1 : displayCodes.length <= 4 ? 2 : 3
  const rows = Math.ceil(displayCodes.length / cols)
  const BW = 34, BH = 16, GAP = 5
  const gridW = cols * BW + (cols - 1) * GAP
  const gridH = rows * BH + (rows - 1) * GAP

  return (
    <div className="relative w-full">
      {/* Subtle glow behind the highlighted state */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(4,107,210,0.12) 0%, transparent 70%)",
        }}
      />

      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 880, translate: [480, 270] }}
        width={960}
        height={560}
        aria-label={`${state} on US map`}
        style={{ width: "100%", height: "auto", position: "relative", zIndex: 1, filter: "drop-shadow(0 0 10px rgba(34,211,238,0.18))" }}
      >
        <defs>
          <filter id="highlight-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x={0} y={0} width={960} height={560} fill="transparent" />

        <Geographies geography={GEO_URL}>
          {({ geographies }) => {
            const sorted = [...geographies].sort((a, b) =>
              a.properties.name === state ? 1 : b.properties.name === state ? -1 : 0
            )
            return sorted.map((geo) => {
              const isHighlighted = geo.properties.name === state
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? "#1462b8" : "#0F2540"}
                  stroke={isHighlighted ? "#22D3EE" : "#2A5A8C"}
                  strokeWidth={isHighlighted ? 2.0 : 0.6}
                  style={{
                    default: {
                      outline: "none",
                      filter: isHighlighted ? "url(#highlight-glow)" : "none",
                    },
                    hover: { outline: "none", fill: isHighlighted ? "#1870d5" : "#12253E" },
                    pressed: { outline: "none" },
                  }}
                />
              )
            })
          }}
        </Geographies>

        {/* Area-code badges pinned to the state centroid */}
        {centroid && (
          <Marker coordinates={centroid}>
            <g>
              {/* Pulse ring on highlighted state */}
              <circle r={Math.max(gridW, gridH) / 2 + 10} fill="rgba(4,107,210,0.06)" stroke="#22D3EE" strokeWidth={0.6} strokeOpacity={0.3} />

              {/* State label above badges */}
              <text
                y={-gridH / 2 - 11}
                textAnchor="middle"
                fill="white"
                fontSize={9}
                fontWeight="800"
                fontFamily="system-ui, sans-serif"
                letterSpacing="1.5"
                style={{ pointerEvents: "none", textShadow: "0 0 6px rgba(34,211,238,0.6)" }}
              >
                {state.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
              </text>

              {/* Clickable area-code badges */}
              {displayCodes.map((entry, i) => {
                const col = i % cols
                const row = Math.floor(i / cols)
                const ox = -gridW / 2 + col * (BW + GAP) + BW / 2
                const oy = -gridH / 2 + row * (BH + GAP) + BH / 2
                return (
                  <g key={entry.code}>
                    {/* Badge shadow */}
                    <rect
                      x={ox - BW / 2 + 1} y={oy - BH / 2 + 1}
                      width={BW} height={BH} rx={4}
                      fill="rgba(34,211,238,0.07)"
                    />
                    {/* Badge background */}
                    <a href={`/area-codes/${entry.stateSlug}/${entry.code}/`} style={{ cursor: "pointer" }}>
                      <rect
                        x={ox - BW / 2} y={oy - BH / 2}
                        width={BW} height={BH} rx={4}
                        fill="#020814"
                        stroke="#22D3EE"
                        strokeOpacity={0.7}
                        strokeWidth={0.8}
                      />
                      <text
                        x={ox} y={oy + 4.5}
                        textAnchor="middle"
                        fill="#22D3EE"
                        fontSize={8.5}
                        fontWeight="800"
                        fontFamily="system-ui, sans-serif"
                      >
                        {entry.code}
                      </text>
                    </a>
                  </g>
                )
              })}

              {/* "+N more" when truncated */}
              {extra > 0 && (
                <text
                  y={gridH / 2 + 12}
                  textAnchor="middle"
                  fill="rgba(34,211,238,0.5)"
                  fontSize={7}
                  fontFamily="system-ui, sans-serif"
                  style={{ pointerEvents: "none" }}
                >
                  +{extra} more
                </text>
              )}
            </g>
          </Marker>
        )}
      </ComposableMap>
    </div>
  )
}

// ─── Hub map (all states clickable, no highlight) ────────────────────────────

type HubStateGroup = {
  state: string
  stateSlug: string
  abbr: string
  totalCodes: number
}

export function USHubMap({ stateGroups }: { stateGroups: HubStateGroup[] }) {
  const [hoveredState, setHoveredState] = useState<string | null>(null)

  const stateInfo = useMemo(() => {
    const map: Record<string, HubStateGroup> = {}
    for (const g of stateGroups) map[g.state] = g
    return map
  }, [stateGroups])

  const hovered = hoveredState ? stateInfo[hoveredState] : null

  return (
    <div className="relative w-full">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(4,107,210,0.10) 0%, transparent 70%)" }} />

      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 880, translate: [480, 270] }}
        width={960}
        height={560}
        style={{ width: "100%", height: "auto", position: "relative", zIndex: 1, filter: "drop-shadow(0 0 10px rgba(34,211,238,0.18))" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name
              const info = stateInfo[name]
              const isHovered = hoveredState === name
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHovered ? "#1462b8" : "#0F2540"}
                  stroke={isHovered ? "#22D3EE" : "#2A5A8C"}
                  strokeWidth={isHovered ? 1.5 : 0.6}
                  onMouseEnter={() => info && setHoveredState(name)}
                  onMouseLeave={() => setHoveredState(null)}
                  style={{
                    default: { outline: "none", cursor: "default" },
                    hover:   { outline: "none", fill: "#1462b8" },
                    pressed: { outline: "none", fill: "#0f4f96" },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Hover info bar */}
      <div className="h-7 flex items-center justify-center">
        {hovered && (
          <div className="flex items-center gap-2 text-xs animate-in fade-in duration-150">
            <span className="text-white font-semibold">{hovered.state}</span>
            <span className="text-white/25">·</span>
            <span className="text-[#22D3EE]/80">{hovered.totalCodes} area code{hovered.totalCodes !== 1 ? "s" : ""}</span>
          </div>
        )}
      </div>
    </div>
  )
}
