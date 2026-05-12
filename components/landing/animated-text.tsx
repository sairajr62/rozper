"use client"

import { motion, Variants, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

// Word-by-word animation component
interface AnimatedWordsProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedWords({ text, className = "", delay = 0 }: AnimatedWordsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const words = text.split(" ")

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.08,
      },
    },
  }

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Character-by-character animation
interface AnimatedCharsProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedChars({ text, className = "", delay = 0 }: AnimatedCharsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const chars = text.split("")

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.02,
      },
    },
  }

  const charVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Typewriter effect
interface TypewriterProps {
  text: string
  className?: string
  delay?: number
  speed?: number
}

export function Typewriter({ text, className = "", delay = 0, speed = 50 }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return
    
    const timeout = setTimeout(() => {
      setStarted(true)
    }, delay * 1000)
    
    return () => clearTimeout(timeout)
  }, [isInView, delay])

  useEffect(() => {
    if (!started) return
    
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, speed)
    
    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <span ref={ref} className={className}>
      {displayText}
      {started && displayText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-[1em] bg-current ml-0.5 align-middle"
        />
      )}
    </span>
  )
}

// Gradient text animation
interface GradientTextProps {
  text: string
  className?: string
  from?: string
  via?: string
  to?: string
}

export function GradientText({ 
  text, 
  className = "", 
  from = "from-[#046BD2]", 
  via = "via-[#0086F9]",
  to = "to-[#046BD2]" 
}: GradientTextProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
      animate={{
        backgroundPosition: ["0% center", "100% center", "0% center"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  )
}

// Counter animation for numbers
interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

export function AnimatedCounter({ 
  value, 
  suffix = "", 
  prefix = "", 
  className = "",
  duration = 2
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * value))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}

// Slide up text reveal
interface SlideUpTextProps {
  text: string
  className?: string
  delay?: number
}

export function SlideUpText({ text, className = "", delay = 0 }: SlideUpTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <span ref={ref} className={`overflow-hidden inline-block ${className}`}>
      <motion.span
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  )
}

// Text highlight effect
interface HighlightTextProps {
  children: React.ReactNode
  className?: string
  highlightColor?: string
}

export function HighlightText({ 
  children, 
  className = "",
  highlightColor = "bg-[#046BD2]/20"
}: HighlightTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <motion.span
        className={`absolute inset-0 ${highlightColor} -z-10`}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        style={{ transformOrigin: "left" }}
      />
      {children}
    </span>
  )
}

// Blur reveal effect
interface BlurRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function BlurReveal({ children, className = "", delay = 0 }: BlurRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.span>
  )
}

// Glowing text animation
interface GlowingTextProps {
  text: string
  className?: string
  glowColor?: string
  delay?: number
}

export function GlowingText({ 
  text, 
  className = "", 
  glowColor = "rgba(88, 80, 236, 0.8)",
  delay = 0 
}: GlowingTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`relative inline-block ${className}`}
    >
      <motion.span
        className="absolute inset-0 blur-2xl"
        style={{ color: glowColor }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="relative"
        animate={{
          textShadow: [
            `0 0 20px ${glowColor}, 0 0 40px ${glowColor}, 0 0 60px ${glowColor}`,
            `0 0 40px ${glowColor}, 0 0 80px ${glowColor}, 0 0 120px ${glowColor}`,
            `0 0 20px ${glowColor}, 0 0 40px ${glowColor}, 0 0 60px ${glowColor}`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  )
}

// Glowing gradient text with pulsing effect
interface GlowingGradientTextProps {
  text: string
  className?: string
  delay?: number
}

export function GlowingGradientText({ 
  text, 
  className = "",
  delay = 0
}: GlowingGradientTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`relative inline-block ${className}`}
    >
      {/* Glow layer */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#046BD2] bg-clip-text text-transparent blur-xl"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
      {/* Main text */}
      <motion.span
        className="relative bg-gradient-to-r from-[#046BD2] via-[#0086F9] to-[#046BD2] bg-[length:200%_auto] bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ["0% center", "100% center", "0% center"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  )
}

// Shimmer text effect
interface ShimmerTextProps {
  text: string
  className?: string
  delay?: number
}

export function ShimmerText({ text, className = "", delay = 0 }: ShimmerTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`relative inline-block overflow-hidden ${className}`}
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />
    </motion.span>
  )
}

// Neon flicker text
interface NeonTextProps {
  text: string
  className?: string
  color?: string
  delay?: number
}

export function NeonText({ 
  text, 
  className = "", 
  color = "rgb(88, 80, 236)",
  delay = 0 
}: NeonTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`relative inline-block ${className}`}
      style={{ color }}
    >
      <motion.span
        animate={{
          textShadow: [
            `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`,
            `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}, 0 0 25px ${color}`,
            `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`,
            `0 0 2px ${color}, 0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}`,
            `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`,
          ],
          opacity: [1, 0.9, 1, 0.95, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 4,
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  )
}

// Pulse glow text
interface PulseGlowTextProps {
  text: string
  className?: string
  delay?: number
}

export function PulseGlowText({ text, className = "", delay = 0 }: PulseGlowTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const chars = text.split("")

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`inline-flex ${className}`}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          animate={{
            textShadow: [
              "0 0 10px rgba(88, 80, 236, 0.5), 0 0 20px rgba(88, 80, 236, 0.3)",
              "0 0 20px rgba(88, 80, 236, 0.8), 0 0 40px rgba(88, 80, 236, 0.5), 0 0 60px rgba(88, 80, 236, 0.3)",
              "0 0 10px rgba(88, 80, 236, 0.5), 0 0 20px rgba(88, 80, 236, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}
