"use client"

import React from "react"

// ── GlobeOrb ───────────────────────────────────────────────────────────────────
// Bare rotating-world-map orb for embedding inside other layouts.
// Sizing is fully controlled by className / style from the parent.
export function GlobeOrb({
  className = "",
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`rounded-full overflow-hidden ${className}`}
      style={{
        backgroundImage:
          "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "left",
        animation: "earthRotate 30s linear infinite",
        boxShadow:
          "0 0 24px rgba(255,255,255,0.12), " +
          "-5px 0 10px #c3f4ff inset, " +
          "15px 2px 28px #000 inset, " +
          "-24px -2px 36px #c3f4ff99 inset, " +
          "80px 0 44px #00000055 inset",
        ...style,
      }}
    />
  )
}

// ── Globe (default export) ─────────────────────────────────────────────────────
// Full standalone demo — centered on screen with decorative stars.
const Globe: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="relative w-[250px] h-[250px] rounded-full overflow-hidden"
        style={{
          backgroundImage:
            "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "left",
          animation: "earthRotate 30s linear infinite",
          boxShadow:
            "0 0 20px rgba(255,255,255,0.2), " +
            "-5px 0 8px #c3f4ff inset, " +
            "15px 2px 25px #000 inset, " +
            "-24px -2px 34px #c3f4ff99 inset, " +
            "250px 0 44px #00000066 inset, " +
            "150px 0 38px #000000aa inset",
        }}
      >
        {/* Decorative star particles */}
        <div className="absolute left-[-20px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "globeTwinkling 3s infinite" }} />
        <div className="absolute left-[-40px] top-[30px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "globeTwinklingSlow 2s infinite" }} />
        <div className="absolute left-[350px] top-[90px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "globeTwinklingLong 4s infinite" }} />
        <div className="absolute left-[200px] top-[290px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "globeTwinkling 3s infinite" }} />
        <div className="absolute left-[50px] top-[270px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "globeTwinklingFast 1.5s infinite" }} />
        <div className="absolute left-[250px] top-[-50px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "globeTwinklingLong 4s infinite" }} />
        <div className="absolute left-[290px] top-[60px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "globeTwinklingSlow 2s infinite" }} />
      </div>
    </div>
  )
}

export default Globe
