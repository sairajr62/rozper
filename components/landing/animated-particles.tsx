'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function AnimatedParticles() {
  // Generate random particles with higher count for better visibility
  const particles = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4.5 + 1.2,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.9 + 0.5,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* SVG for better performance */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <radialGradient id="particleGradient1">
            <stop offset="0%" stopColor="#0086F9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#046BD2" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="particleGradient2">
            <stop offset="0%" stopColor="#0086F9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#046BD2" stopOpacity="0" />
          </radialGradient>

          <filter id="particleGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Animated particles */}
        {particles.map((particle) => (
          <g key={particle.id}>
            {/* Glow effect circle */}
            <motion.circle
              cx={`${particle.x}%`}
              cy={`${particle.y}%`}
              r={particle.size}
              fill={particle.id % 3 === 0 ? 'url(#particleGradient1)' : 'url(#particleGradient2)'}
              opacity={particle.opacity}
              initial={{ 
                opacity: 0,
                r: particle.size * 0.5,
              }}
              animate={{
                opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
                r: [particle.size * 0.5, particle.size, particle.size * 0.8],
                y: [`${particle.y}%`, `${particle.y - 10}%`, `${particle.y}%`],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              filter="url(#particleGlow)"
            />

            {/* Core dot */}
            <motion.circle
              cx={`${particle.x}%`}
              cy={`${particle.y}%`}
              r={particle.size * 0.4}
              fill={particle.id % 2 === 0 ? '#0086F9' : '#0086F9'}
              opacity={particle.opacity * 1.2}
              initial={{ 
                opacity: particle.opacity * 0.5,
              }}
              animate={{
                opacity: [particle.opacity * 0.5, particle.opacity * 1.2, particle.opacity * 0.5],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </g>
        ))}
      </svg>

      {/* Alternative HTML particles for enhanced visibility */}
      {particles.slice(0, 85).map((particle) => (
        <motion.div
          key={`html-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.id % 2 === 0 
              ? 'radial-gradient(circle, #0086F9 0%, #046BD2 100%)'
              : 'radial-gradient(circle, #0086F9 0%, #046BD2 100%)',
            boxShadow: particle.id % 3 === 0 
              ? '0 0 10px rgba(101, 217, 255, 0.6)'
              : '0 0 8px rgba(101, 217, 255, 0.4)',
          }}
          initial={{ 
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [particle.opacity * 0.4, particle.opacity, particle.opacity * 0.4],
            scale: [0.5, 1, 0.8],
            y: [-20, 10, -20],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
