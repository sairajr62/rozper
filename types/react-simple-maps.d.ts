// Ambient type declarations for react-simple-maps@^1.x, which ships no types.
// Covers the subset used in the app (ComposableMap / Geographies / Geography).
declare module "react-simple-maps" {
  import * as React from "react"

  export interface RSMGeography {
    rsmKey: string
    id?: string
    properties?: Record<string, unknown>
    [key: string]: unknown
  }

  export interface ComposableMapProps
    extends React.SVGProps<SVGSVGElement> {
    projection?: string
    projectionConfig?: Record<string, unknown>
    width?: number
    height?: number
    children?: React.ReactNode
  }
  export const ComposableMap: React.FC<ComposableMapProps>

  export interface GeographiesProps {
    geography: string | Record<string, unknown> | unknown[]
    children: (args: {
      geographies: RSMGeography[]
      projection: unknown
      path: unknown
    }) => React.ReactNode
    [key: string]: unknown
  }
  export const Geographies: React.FC<GeographiesProps>

  export interface GeographyProps {
    geography: RSMGeography
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: Record<string, React.CSSProperties>
    [key: string]: unknown
  }
  export const Geography: React.FC<GeographyProps>

  export const ZoomableGroup: React.FC<
    { children?: React.ReactNode } & Record<string, unknown>
  >
  export const Marker: React.FC<
    { coordinates?: [number, number]; children?: React.ReactNode } & Record<
      string,
      unknown
    >
  >
  export const Line: React.FC<Record<string, unknown>>
  export const Annotation: React.FC<
    { children?: React.ReactNode } & Record<string, unknown>
  >
}
