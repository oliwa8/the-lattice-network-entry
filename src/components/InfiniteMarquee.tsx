'use client'

import { motion } from 'framer-motion'

export default function InfiniteMarquee() {
  const words = [
    'SYSTEMS THINKING',
    'ANALYTICAL MINDS',
    'DEEP COLLABORATION',
    'FORESIGHT',
    'INTEGRITY',
    'INNOVATION',
    'CLARITY',
    'STRATEGIC DEPTH',
    'PRECISION',
    'EXPONENTIAL GROWTH',
  ]

  return (
    <div className="relative w-full overflow-hidden py-12 md:py-16 border-y border-white/10 bg-white/[0.02]">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[#0a1b2f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#0a1b2f] to-transparent z-10 pointer-events-none" />
      
      {/* Animated line accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <motion.div
        className="flex gap-12 md:gap-16 whitespace-nowrap"
        animate={{
          x: [0, -2200],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 40,
            ease: 'linear',
          },
        }}
      >
        {[...words, ...words, ...words, ...words].map((word, index) => (
          <div key={index} className="inline-flex items-center gap-4 md:gap-6">
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/10 tracking-wider hover:text-white/20 transition-colors duration-300">
              {word}
            </span>
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}