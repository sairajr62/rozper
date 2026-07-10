import { ImageResponse } from "next/og"

export const alt = "Rozper · UCaaS, Contact Center & AI for Global Teams"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const BRAND_BLUE = "#046BD2"
const BRAND_CYAN = "#22D3EE"
const BACKGROUND = "#0B1220"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          position: "relative",
          overflow: "hidden",
          background: BACKGROUND,
          padding: "64px",
        }}
      >
        {/* Ambient glow, top-right */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(4,107,210,0.35) 0%, transparent 70%)`,
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_CYAN})`,
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "48px",
            left: "64px",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: `linear-gradient(135deg, ${BRAND_BLUE}, ${BRAND_CYAN})`,
            }}
          >
            <div style={{ display: "flex", color: "#fff", fontSize: "18px", fontWeight: 700 }}>
              R
            </div>
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            Rozper
          </div>
        </div>

        {/* Stat pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
            padding: "6px 16px",
            borderRadius: "999px",
            background: "rgba(4,107,210,0.15)",
            border: "1px solid rgba(4,107,210,0.4)",
          }}
        >
          <div style={{ display: "flex", color: BRAND_CYAN, fontSize: "14px", fontWeight: 600 }}>
            150+ Countries · 99.99% Uptime
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
            color: "#ffffff",
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
          }}
        >
          <span style={{ display: "flex" }}>UCaaS, Contact Center</span>
          <span style={{ display: "flex", color: BRAND_CYAN }}>&amp; AI for Global Teams</span>
        </div>

        {/* Subhead */}
        <div style={{ display: "flex", color: "rgba(255,255,255,0.6)", fontSize: "20px" }}>
          Voice, video, SMS, and AI on one carrier-grade platform
        </div>
      </div>
    ),
    { ...size },
  )
}
