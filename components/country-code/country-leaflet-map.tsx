"use client"

import { useEffect, useRef } from "react"

interface Props {
  capital: string
  lat: number
  lon: number
  dialCode: string
  isoCode2: string
  countryName: string
}

export function CountryLeafletMap({ capital, lat, lon, dialCode, isoCode2, countryName }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Destroy existing instance so we always re-init for the current country
    if (instanceRef.current) {
      instanceRef.current.remove()
      instanceRef.current = null
    }

    import("leaflet").then(async L => {
      if (!mapRef.current) return

      const map = L.map(mapRef.current, {
        center: [lat, lon],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
        doubleClickZoom: true,
        attributionControl: false,
      })

      instanceRef.current = map

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map)

      // Highlight country borders
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(countryName)}&format=geojson&polygon_geojson=1&limit=1`)
        const data = await res.json()
        if (data.features?.length) {
          const layer = L.geoJSON(data.features[0], {
            style: {
              color: "#0086F9",
              weight: 3,
              fillColor: "#0086F9",
              fillOpacity: 0.25,
            }
          }).addTo(map)
          // Fit map to country bounds
          map.fitBounds(layer.getBounds(), { padding: [30, 30] })
        }
      } catch {}

      // Google Maps style red pin on capital
      const pinIcon = L.divIcon({
        html: `
          <svg width="36" height="52" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg"
            style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.4))">
            <path d="M18 0C8.06 0 0 8.06 0 18C0 31.5 18 52 18 52C18 52 36 31.5 36 18C36 8.06 27.94 0 18 0Z" fill="url(#gpin_grad)"/>
            <circle cx="18" cy="18" r="8" fill="white"/>
            <defs>
              <radialGradient id="gpin_grad" cx="35%" cy="25%" r="65%">
                <stop offset="0%" stop-color="#ff6b5b"/>
                <stop offset="100%" stop-color="#c62828"/>
              </radialGradient>
            </defs>
          </svg>
        `,
        className: "",
        iconSize: [36, 52],
        iconAnchor: [18, 52],
      })

      L.marker([lat, lon], { icon: pinIcon }).addTo(map)
        .bindTooltip(capital, {
          permanent: true,
          direction: "right",
          offset: [12, -26],
          className: "leaflet-capital-label",
        })
    })

    return () => {
      instanceRef.current?.remove()
      instanceRef.current = null
    }
  }, [lat, lon, capital, countryName])

  return (
    <div className="relative w-full" style={{ zIndex: 0, isolation: "isolate" }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>{`
        .leaflet-capital-label {
          background: white !important;
          border: 1.5px solid rgba(0,134,249,0.4) !important;
          border-radius: 6px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25) !important;
          color: #1a1a2e !important;
          font-family: system-ui, sans-serif !important;
          font-size: 13px !important;
          font-weight: 800 !important;
          padding: 3px 10px !important;
          white-space: nowrap !important;
        }
        .leaflet-capital-label::before { display: none !important; }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
        }
        .leaflet-control-zoom a {
          background: white !important;
          color: #333 !important;
          font-size: 16px !important;
          font-weight: bold !important;
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f0f0f0 !important;
        }
      `}</style>
      <div
        ref={mapRef}
        style={{ height: "440px", width: "100%", borderRadius: "16px 16px 0 0", overflow: "hidden", cursor: "grab" }}
      />
      <div className="flex items-center gap-3 px-4 py-2.5 border border-t-0 border-[#0086F9]/20 rounded-b-2xl"
        style={{ background: "#040d1a" }}>
        <div className="w-1.5 h-1.5 rounded-full bg-[#0086F9] animate-pulse" />
        <span className="text-[11px] font-mono font-bold text-[#0086F9]">{dialCode}</span>
        <span className="text-[10px] font-mono text-white/30">{isoCode2} · <span className="text-white/70 font-bold">{capital}</span></span>
        <span className="ml-auto text-[9px] font-mono tracking-widest text-white/15 uppercase">{countryName}</span>
      </div>
    </div>
  )
}
