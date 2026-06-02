"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function PostProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#22D3EE]"
      style={{ scaleX: progress }}
    />
  )
}
