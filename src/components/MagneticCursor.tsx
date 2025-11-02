'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20)
      cursorY.set(e.clientY - 20)
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        className="fixed w-10 h-10 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-white" />
      </motion.div>
      <motion.div
        className="fixed w-2 h-2 pointer-events-none z-[9999] bg-white rounded-full"
        style={{
          left: cursorX,
          top: cursorY,
          x: 9,
          y: 9,
        }}
      />
    </>
  )
}
