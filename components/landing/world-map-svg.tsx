'use client'

import { motion } from 'framer-motion'

interface WorldMapProps {
  isInView?: boolean
}

export function WorldMapSVG({ isInView = true }: WorldMapProps) {
  // Global hub locations for connections
  const hubs = [
    { x: 20, y: 35, label: 'US' },
    { x: 47, y: 25, label: 'Europe' },
    { x: 58, y: 35, label: 'Middle East' },
    { x: 72, y: 50, label: 'Singapore' },
    { x: 85, y: 60, label: 'Australia' },
    { x: 35, y: 60, label: 'Brazil' },
  ]

  // Connection paths between hubs
  const connections = [
    { from: 0, to: 1, delay: 0 },
    { from: 1, to: 2, delay: 0.6 },
    { from: 2, to: 3, delay: 1.2 },
    { from: 3, to: 4, delay: 1.8 },
    { from: 4, to: 5, delay: 2.4 },
    { from: 5, to: 0, delay: 3 },
  ]

  const generateCurvedPath = (from: any, to: any) => {
    const dx = to.x - from.x
    const dy = to.y - from.y
    const mx = (from.x + to.x) / 2
    const my = (from.y + to.y) / 2
    const offsetX = -dy * 0.15
    const offsetY = dx * 0.15
    return `M ${from.x} ${from.y} Q ${mx + offsetX} ${my + offsetY} ${to.x} ${to.y}`
  }

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 100 80"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(4, 107, 210, 0.45)" />
            <stop offset="100%" stopColor="rgba(101, 217, 255, 0.30)" />
          </linearGradient>

          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#046BD2" stopOpacity="0" />
            <stop offset="50%" stopColor="#046BD2" stopOpacity="1" />
            <stop offset="100%" stopColor="#046BD2" stopOpacity="0" />
          </linearGradient>

          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
          </filter>

          <radialGradient id="glow">
            <stop offset="0%" stopColor="#0086F9" />
            <stop offset="100%" stopColor="#046BD2" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Realistic World Map Continents */}
        <g fill="url(#mapGrad)" stroke="rgba(4, 107, 210, 0.5)" strokeWidth="0.3" opacity="1">
          {/* North America */}
          <path d="M 8 15 L 18 12 L 22 18 L 24 28 L 20 32 L 12 30 L 8 22 Z" />
          
          {/* Central America & Caribbean */}
          <path d="M 20 32 L 28 32 L 26 38 L 22 36 Z" />
          
          {/* South America */}
          <path d="M 18 38 L 26 38 L 28 50 L 26 62 L 20 65 L 16 55 L 16 40 Z" />
          
          {/* Greenland */}
          <path d="M 35 8 L 40 6 L 42 16 L 38 18 Z" />
          
          {/* Europe */}
          <path d="M 42 18 L 52 16 L 56 24 L 52 28 L 46 26 Z" />
          
          {/* Africa */}
          <path d="M 50 28 L 62 25 L 68 35 L 70 52 L 64 62 L 52 58 L 48 42 Z" />
          
          {/* Middle East */}
          <path d="M 56 28 L 66 26 L 68 35 L 62 38 Z" />
          
          {/* Russia & Central Asia */}
          <path d="M 52 16 L 78 12 L 82 24 L 70 28 L 56 24 Z" />
          
          {/* Asia */}
          <path d="M 62 28 L 82 24 L 90 32 L 92 50 L 82 56 L 70 50 Z" />
          
          {/* Southeast Asia */}
          <path d="M 72 50 L 82 48 L 84 58 L 78 60 Z" />
          
          {/* Australia */}
          <path d="M 78 58 L 88 56 L 90 70 L 82 72 L 76 68 Z" />
          
          {/* New Zealand */}
          <path d="M 92 70 L 95 72 L 94 78 L 90 76 Z" />
          
          {/* India */}
          <path d="M 68 38 L 74 36 L 76 48 L 72 52 Z" />
        </g>

        {/* Static Connection Lines */}
        {connections.map((conn, idx) => {
          const pathD = generateCurvedPath(hubs[conn.from], hubs[conn.to])
          return (
              <path
                d={pathD}
                stroke="rgba(4, 107, 210, 0.08)"
                strokeWidth="0.4"
                fill="none"
                strokeLinecap="round"
              />
          )
        })}

        {/* Animated Connection Arcs with Flow */}
        {connections.map((conn, idx) => {
          const pathD = generateCurvedPath(hubs[conn.from], hubs[conn.to])
          return (
            <g key={`arc-${idx}`}>
              {/* Glowing flowing line */}
              <motion.path
                d={pathD}
                stroke="url(#flowGrad)"
                strokeWidth="0.6"
                fill="none"
                strokeLinecap="round"
                filter="url(#blur)"
                strokeDasharray="4 3"
                initial={{ strokeDashoffset: 7, opacity: 0 }}
                animate={isInView ? { strokeDashoffset: -7, opacity: 0.8 } : {}}
                transition={{
                  duration: 2,
                  delay: conn.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Pulsing gradient accent */}
              <motion.path
                d={pathD}
                stroke="#046BD2"
                strokeWidth="0.25"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
                transition={{
                  duration: 1.5,
                  delay: conn.delay + 0.1,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                }}
              />
            </g>
          )
        })}

        {/* Animated Particles Moving Along Paths */}
        {connections.map((conn, idx) => {
          const pathD = generateCurvedPath(hubs[conn.from], hubs[conn.to])
          return (
            <motion.circle
              key={`particle-${idx}`}
              cx="0"
              cy="0"
              r="0.5"
              fill="#0086F9"
              opacity="0.7"
              initial={{ offsetDistance: '0%' }}
              animate={isInView ? { offsetDistance: '100%' } : {}}
              transition={{
                duration: 2.5,
                delay: conn.delay + 0.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                offsetPath: `path('${pathD}')`,
                filter: 'drop-shadow(0 0 3px #0086F9)',
              }}
            />
          )
        })}

        {/* Hub Nodes with Pulsing Glow */}
        {hubs.map((hub, idx) => (
          <g key={`hub-${idx}`}>
            {/* Outer pulse ring */}
            <motion.circle
              cx={hub.x}
              cy={hub.y}
              r="2.5"
              fill="none"
              stroke="url(#glow)"
              strokeWidth="0.25"
              opacity="0.4"
              animate={{
                r: [2.5, 4, 2.5],
                opacity: [0.4, 0.1, 0.4],
              }}
              transition={{
                duration: 2.8,
                delay: idx * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Middle ring */}
            <motion.circle
              cx={hub.x}
              cy={hub.y}
              r="1.5"
              fill="none"
              stroke="#0086F9"
              strokeWidth="0.2"
              opacity="0.6"
              animate={{
                r: [1.5, 2.3, 1.5],
                opacity: [0.6, 0.25, 0.6],
              }}
              transition={{
                duration: 2.3,
                delay: idx * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Center bright dot */}
            <motion.circle
              cx={hub.x}
              cy={hub.y}
              r="0.6"
              fill="#0086F9"
              animate={{
                r: [0.6, 0.85, 0.6],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 2,
                delay: idx * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              filter="url(#blur)"
              style={{
                boxShadow: '0 0 6px #0086F9',
              }}
            />
          </g>
        ))}
      </svg>

      {/* Status Indicator */}
      <motion.div
        className="absolute bottom-2 left-3 text-xs text-[#757575]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      >
        <span>Connected Globally</span>
      </motion.div>
    </div>
  )
}
