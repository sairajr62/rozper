'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'

export function GlobalConnectionCard() {
  // Avatar data
  const avatars = [
    { id: 1, name: 'Sarah', position: 'top', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop' },
    { id: 2, name: 'Mike', position: 'left', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop' },
    { id: 3, name: 'Emma', position: 'right', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop' },
  ]

  // Countries to fade in/out
  const countries = ['USA', 'India', 'Germany', 'Brazil', 'Japan', 'UK']

  // Connection dots on globe
  const connectionDots = [
    { id: 1, x: 30, y: 40 },
    { id: 2, x: 70, y: 35 },
    { id: 3, x: 50, y: 60 },
    { id: 4, x: 80, y: 55 },
    { id: 5, x: 20, y: 70 },
  ]

  // Avatar position calculations
  const getAvatarPosition = (position: string) => {
    const radius = 100
    const positions: Record<string, { x: string; y: string }> = {
      top: { x: '50%', y: '0%' },
      left: { x: '0%', y: '50%' },
      right: { x: '100%', y: '50%' },
    }
    return positions[position] || positions.top
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer neumorphic card container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md aspect-square"
      >
        {/* Main card background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40" />

        {/* Background subtle grid */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        {/* Content container */}
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
          {/* Avatar circles container */}
          <div className="absolute inset-0 w-full h-full">
            {avatars.map((avatar, idx) => {
              const pos = getAvatarPosition(avatar.position)
              return (
                <motion.div
                  key={avatar.id}
                  className="absolute"
                  style={{
                    left: pos.x,
                    top: pos.y,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3 + idx * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Avatar glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[#046BD2] to-[#0086F9] blur-md opacity-40"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: idx * 0.4,
                    }}
                    style={{
                      width: '56px',
                      height: '56px',
                    }}
                  />

                  {/* Avatar image */}
                  <div className="relative w-14 h-14 rounded-full border-2 border-white bg-white overflow-hidden shadow-lg">
                    <img
                      src={avatar.image}
                      alt={avatar.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Center globe section */}
          <motion.div
            className="relative w-40 h-40 flex items-center justify-center"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Gradient glow behind globe */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#046BD2] via-[#2575FC] to-[#0086F9] rounded-full blur-2xl opacity-40"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360],
              }}
              transition={{
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
            />

            {/* Pulsing rings */}
            {[0, 1, 2].map((ring) => (
              <motion.div
                key={`ring-${ring}`}
                className="absolute rounded-full border border-[#046BD2]/30"
                style={{
                  width: '100px',
                  height: '100px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [0.8, 1.4],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: ring * 0.4,
                }}
              />
            ))}

            {/* Globe container */}
            <motion.div
              className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white/80"
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {/* Gradient circle as globe representation */}
              <div className="w-full h-full bg-gradient-to-br from-[#046BD2] via-[#0086F9] to-[#2575FC]" />

              {/* Connection dots on globe */}
              {connectionDots.map((dot) => (
                <motion.div
                  key={`dot-${dot.id}`}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#0086F9] shadow-lg"
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + dot.id * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              {/* Globe overlay text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/90 font-semibold text-xs text-center px-2">
                  Connect
                </span>
              </div>
            </motion.div>

            {/* Connection lines from avatars to globe */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 320 320"
            >
              {avatars.map((avatar, idx) => {
                const pos = getAvatarPosition(avatar.position)
                let x1 = 160,
                  y1 = 160 // Center
                let x2 = 160,
                  y2 = 160
                if (avatar.position === 'top') {
                  x2 = 160
                  y2 = 40
                } else if (avatar.position === 'left') {
                  x2 = 40
                  y2 = 160
                } else if (avatar.position === 'right') {
                  x2 = 280
                  y2 = 160
                }

                return (
                  <motion.path
                    key={`line-${idx}`}
                    d={`M ${x1} ${y1} Q ${(x1 + x2) / 2 + 20} ${(y1 + y2) / 2}, ${x2} ${y2}`}
                    stroke="#046BD2"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="6 4"
                    opacity="0.4"
                    animate={{
                      strokeDashoffset: [-10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                )
              })}
            </svg>
          </motion.div>

          {/* Heading text */}
          <motion.div
            className="absolute bottom-1/4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Connecting <span className="text-[#046BD2]">150+</span> Countries
            </h3>
          </motion.div>

          {/* Floating country labels */}
          <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-8">
            {countries.slice(0, 3).map((country, idx) => (
              <motion.span
                key={country}
                className="text-xs text-gray-600 font-medium"
                animate={{
                  opacity: [0, 1, 0],
                  y: [10, 0, -10],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 1.3,
                }}
              >
                {country}
              </motion.span>
            ))}
          </div>

          {/* Bottom notification card */}
          <motion.div
            className="absolute bottom-6 left-6 right-6 flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg border border-white/50"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="w-4 h-4 text-[#046BD2] flex-shrink-0" />
            <span className="text-sm text-gray-700 font-medium">
              Global network ready
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
