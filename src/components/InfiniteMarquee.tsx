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
    'GROWTH',
  ]

  return (
    <div className="relative w-full overflow-hidden py-8 border-y border-white/10">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: [0, -1920],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          },
        }}
      >
        {[...words, ...words, ...words].map((word, index) => (
          <span
            key={index}
            className="text-4xl font-bold text-white/10 tracking-wider"
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
