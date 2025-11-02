'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function PerspectiveScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 15])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <div ref={ref} className="relative" style={{ perspective: '1200px' }}>
      <motion.div
        style={{
          y,
          rotateX,
          scale,
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
