"use client"
// v6
import { useState, useMemo } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const GEO_URL = "/states-10m.json"

type HubStateGroup = {
  state: string
  stateSlug: string
  abbr: string
  totalCodes: number
}

export default function USHubMap({
  stateGroups,
  onStateHover,
  onStateSelect,
}: {
  stateGroups: HubStateGroup[]
  onStateHover?: (state: string | null) => void
  onStateSelect?: (state: string) => void
}) {
  const [hoveredState, setHoveredState] = useState<string | null>(null)

  const stateInfo = useMemo(() => {
    const map: Record<string, HubStateGroup> = {}
    for (const g of stateGroups) map[g.state] = g
    return map
  }, [stateGroups])

  const hovered = hoveredState ? stateInfo[hoveredState] : null

  function handleEnter(name: string) {
    if (stateInfo[name]) {
      setHoveredState(name)
      onStateHover?.(name)
    }
  }

  function handleLeave() {
    setHoveredState(null)
    onStateHover?.(null)
  }

  function handleClick(name: string) {
    if (stateInfo[name]) onStateSelect?.(name)
  }

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(4,107,210,0.10) 0%, transparent 70%)" }}
      />

      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 880, translate: [480, 270] }}
        width={960}
        height={560}
        style={{ width: "100%", height: "auto", position: "relative", zIndex: 1, filter: "drop-shadow(0 0 10px rgba(34,211,238,0.18))" }}
      >
        <defs>
          <filter id="hub-hover-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
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
                  strokeWidth={isHovered ? 2.0 : 0.6}
                  onClick={() => handleClick(name)}
                  onMouseEnter={() => handleEnter(name)}
                  onMouseLeave={handleLeave}
                  style={{
                    default: {
                      outline: "none",
                      cursor: onStateSelect && stateInfo[geo.properties.name] ? "pointer" : "default",
                      filter: isHovered ? "url(#hub-hover-glow)" : "none",
                    },
                    hover: { outline: "none", fill: "#1462b8" },
                    pressed: { outline: "none", fill: "#0f4f96" },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Bottom info bar — only in standalone (hero) mode */}
      {!onStateHover && (
        <div className="h-7 flex items-center justify-center">
          {hovered && (
            <div className="flex items-center gap-2 text-xs animate-in fade-in duration-150">
              <span className="text-white font-semibold">{hovered.state}</span>
              <span className="text-white/25">·</span>
              <span className="text-[#22D3EE]/80">{hovered.totalCodes} area code{hovered.totalCodes !== 1 ? "s" : ""}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
