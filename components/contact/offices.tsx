"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

const offices = [
  {
    region: "Americas · HQ",
    city: "San Francisco",
    address: "535 Mission Street, Floor 14, San Francisco, CA 94105",
    phone: "+1 (415) 555-0199",
    hours: "Mon–Fri · 8a–7p PT",
  },
  {
    region: "EMEA",
    city: "London",
    address: "8 Devonshire Square, London EC2M 4PL",
    phone: "+44 20 7946 0312",
    hours: "Mon–Fri · 9a–7p BST",
  },
  {
    region: "MENA",
    city: "Dubai",
    address: "Sheikh Zayed Road, DIFC Gate Avenue, Dubai",
    phone: "+971 4 555 0188",
    hours: "Sun–Thu · 9a–7p GST",
  },
  {
    region: "APAC",
    city: "Singapore",
    address: "8 Marina Boulevard, Marina Bay Financial Centre",
    phone: "+65 6555 0144",
    hours: "Mon–Fri · 9a–7p SGT",
  },
]

// Equirectangular projection — x=(lng+180)/360*100, y=(90-lat)/180*100
const nodes = [
  { x: 16.0, y: 29.0, code: 'SFO', labelRight: true  }, // San Francisco
  { x: 50.0, y: 21.4, code: 'LON', labelRight: true  }, // London
  { x: 65.4, y: 36.0, code: 'DXB', labelRight: true  }, // Dubai
  { x: 78.8, y: 49.3, code: 'SIN', labelRight: false }, // Singapore
]

// Draw lines: SFO↔LON, LON↔DXB, DXB↔SIN
const connections: [number, number][] = [[0, 1], [1, 2], [2, 3]]

export function ContactOffices() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
            Offices · always open somewhere
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Follow-the-sun support.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Global map with city pins */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[280px] rounded-2xl border border-white/10 overflow-hidden bg-[#0F1A2E]/60 backdrop-blur-md shadow-[0_30px_60px_-20px_rgba(0,134,249,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/WorldMap.avif"
                alt="Rozper global office locations — San Francisco, London, Dubai, Singapore"
                className="block w-full h-full object-cover opacity-90"
              />

              {/* Subtle overlay to blend map with page dark theme */}
              <div className="absolute inset-0 pointer-events-none bg-[#0B1220]/30" />

              {/* SVG connection lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="line-glow">
                    <feGaussianBlur stdDeviation="0.4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {connections.map(([a, b], i) => (
                  <motion.path
                    key={i}
                    d={`M ${nodes[a].x} ${nodes[a].y} L ${nodes[b].x} ${nodes[b].y}`}
                    stroke="#0086F9"
                    strokeWidth="0.22"
                    strokeDasharray="1.2 1.2"
                    fill="none"
                    filter="url(#line-glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.55 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.4 + i * 0.35, ease: 'easeOut' }}
                  />
                ))}
              </svg>

              {/* City pin dots */}
              {nodes.map((node, i) => (
                <div
                  key={node.code}
                  className="absolute"
                  style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute rounded-full bg-[#0086F9]/25 border border-[#0086F9]/40"
                    style={{ width: 10, height: 10, top: 0, left: 0 }}
                    animate={{ scale: [1, 3.2], opacity: [0.7, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.55, ease: 'easeOut' }}
                  />
                  {/* Core dot */}
                  <motion.div
                    className="relative z-10 w-2.5 h-2.5 rounded-full bg-[#0086F9] shadow-[0_0_10px_3px_rgba(0,134,249,0.65)]"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 + i * 0.15 }}
                  />
                  {/* City code label */}
                  <span
                    className="absolute top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-white/80 whitespace-nowrap tracking-widest z-20"
                    style={node.labelRight ? { left: '16px' } : { right: '16px' }}
                  >
                    {node.code}
                  </span>
                </div>
              ))}

              {/* Bottom labels */}
              <div className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-widest text-white/40">
                4 offices · ops in 150+ countries
              </div>
              <div className="absolute bottom-3 right-4 text-right">
                <div className="text-[8px] font-mono uppercase tracking-[0.18em] text-white/30">Edge Pops</div>
                <div className="text-[22px] font-mono font-bold text-white/55 leading-tight">42</div>
              </div>
            </div>
          </div>

          {/* Office list */}
          <div className="lg:col-span-5 space-y-3">
            {offices.map((o, i) => (
              <motion.div
                key={o.city}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 p-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-md bg-[#046BD2]/15 border border-[#046BD2]/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-[#22D3EE]" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40">
                      {o.region}
                    </div>
                    <div className="mt-0.5 font-semibold text-white">
                      {o.city}
                    </div>
                    <div className="mt-1.5 text-xs text-[#9AA8BC] leading-relaxed">
                      {o.address}
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-[11px] font-mono text-white/50">
                      <span>{o.phone}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{o.hours}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
