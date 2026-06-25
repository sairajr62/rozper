"use client"
import { useEffect, useRef } from "react"

interface Props {
  ctryCoords: [number, number]  // [lon, lat]
  usCoords: [number, number]    // [lon, lat]
  countryIso3: string
}

export default function LeafletMap({ ctryCoords, usCoords, countryIso3 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }
    if (!containerRef.current) return

    async function init() {
      const L = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")

      if (!containerRef.current) return

      // Start zoomed in on the country so it's clearly visible
      const map = L.map(containerRef.current, {
        center: [ctryCoords[1], ctryCoords[0]],
        zoom: 6,
        minZoom: 2,
        maxZoom: 10,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
        dragging: true,
        doubleClickZoom: true,
        boxZoom: false,
        keyboard: false,
      })

      mapRef.current = map

      // Force correct size after mount
      setTimeout(() => map.invalidateSize(), 100)

      // Light tile layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 10,
      }).addTo(map)

      // Load GeoJSON — highlight only the target country
      const res = await fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
      const data = await res.json()

      let ctryBounds: any = null

      const geoLayer = L.geoJSON(data, {
        style: (feature: any) => {
          const iso3 = feature?.properties?.["ISO3166-1-Alpha-3"]
          const isCtry = iso3 === countryIso3
          return {
            fillColor: isCtry ? "#0086F9" : "transparent",
            fillOpacity: isCtry ? 0.6 : 0,
            color: "#0086F9",
            weight: isCtry ? 3 : 1,
            opacity: isCtry ? 1 : 0.5,
          }
        },
        onEachFeature: (feature: any, layer: any) => {
          if (feature?.properties?.["ISO3166-1-Alpha-3"] === countryIso3) {
            ctryBounds = layer.getBounds()
          }
        },
      }).addTo(map)

      // Always draw a circle to mark the country capital — ensures visibility on all pages
      const ctryLatLng: [number, number] = [ctryCoords[1], ctryCoords[0]]
      const diagMeters = ctryBounds
        ? ctryBounds.getNorthEast().distanceTo(ctryBounds.getSouthWest())
        : 0
      // For small/island countries use a fixed radius; for large countries scale to country size
      const radius = diagMeters < 100000 ? 35000 : Math.min(diagMeters * 0.08, 200000)
      L.circle(ctryLatLng, {
        radius,
        fillColor: "#0086F9",
        fillOpacity: 0.35,
        color: "#0086F9",
        weight: 2,
      }).addTo(map)

      // US marker only
      L.circleMarker([usCoords[1], usCoords[0]], {
        radius: 8,
        fillColor: "#0086F9",
        color: "#fff",
        fillOpacity: 1,
        weight: 2,
      }).addTo(map)
    }

    init()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [countryIso3, ctryCoords[0], ctryCoords[1]])

  const zoomIn  = () => mapRef.current?.zoomIn()
  const zoomOut = () => mapRef.current?.zoomOut()

  return (
    <div className="relative" style={{ height: 340 }}>
      <div ref={containerRef} style={{ width: "100%", height: 340 }} />
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1">
        <button onClick={zoomIn}
          style={{ background: "#0d2040", border: "1px solid rgba(0,134,249,0.4)", color: "white", width: 28, height: 28, borderRadius: 6, fontSize: 18, lineHeight: 1, cursor: "pointer" }}>+</button>
        <button onClick={zoomOut}
          style={{ background: "#0d2040", border: "1px solid rgba(0,134,249,0.4)", color: "white", width: 28, height: 28, borderRadius: 6, fontSize: 18, lineHeight: 1, cursor: "pointer" }}>−</button>
      </div>
    </div>
  )
}
