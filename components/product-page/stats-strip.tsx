'use client'

import { motion } from 'framer-motion'

interface Stat {
  value: string
  label: string
}

interface StatsStripProps {
  stats: Stat[]
}

export function StatsStrip({ stats }: StatsStripProps) {
  const mdCols: Record<number, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
  }
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#070707] border-y border-[#0C0D0E]">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-2 ${mdCols[stats.length] ?? 'md:grid-cols-4'} gap-6 sm:gap-8`}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#046BD2] mb-2">
                {stat.value}
              </p>
              <p className="text-[#CCD6DF] text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
