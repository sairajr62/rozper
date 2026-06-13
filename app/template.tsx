"use client"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ animation: "pageFadeIn 0.35s cubic-bezier(0.22, 1, 0.36, 1)" }}>
      {children}
    </div>
  )
}
