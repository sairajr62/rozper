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
    coords: { x: 18, y: 42 },
  },
  {
    region: "EMEA",
    city: "London",
    address: "8 Devonshire Square, London EC2M 4PL",
    phone: "+44 20 7946 0312",
    hours: "Mon–Fri · 9a–7p BST",
    coords: { x: 48, y: 33 },
  },
  {
    region: "MENA",
    city: "Dubai",
    address: "Sheikh Zayed Road, DIFC Gate Avenue, Dubai",
    phone: "+971 4 555 0188",
    hours: "Sun–Thu · 9a–7p GST",
    coords: { x: 60, y: 48 },
  },
  {
    region: "APAC",
    city: "Singapore",
    address: "8 Marina Boulevard, Marina Bay Financial Centre",
    phone: "+65 6555 0144",
    hours: "Mon–Fri · 9a–7p SGT",
    coords: { x: 74, y: 58 },
  },
]

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
          {/* Global map image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[260px] rounded-2xl border border-white/10 overflow-hidden bg-[#0F1A2E]/60 backdrop-blur-md shadow-[0_30px_60px_-20px_rgba(0,134,249,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/global-map.webp"
                alt="Rozper global office locations — San Francisco, London, Dubai, Singapore"
                className="block w-full h-full object-cover"
              />
              {/* Soft gradient overlay to blend with page background */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B1220]/40 via-transparent to-transparent" />
              {/* Globe label */}
              <div className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-widest text-white/40">
                4 offices · ops in 150+ countries
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
