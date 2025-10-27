"use client"

import { useEffect, useRef } from 'react'

export default function AmbientGrid() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    let time = 0
    let animationFrameId: number

    const animate = () => {
      time += 0.0005
      
      // Slow drift animation
      const driftX = Math.sin(time) * 20
      const driftY = Math.cos(time * 0.7) * 15
      
      svg.style.transform = `translate(${driftX}px, ${driftY}px)`
      
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.03]"
      style={{ zIndex: 1 }}
    >
      <defs>
        <pattern
          id="ambient-grid"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
        </pattern>
        
        <pattern
          id="ambient-dots"
          x="0"
          y="0"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="25" cy="25" r="1" fill="white" opacity="0.4" />
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#ambient-grid)" />
      <rect width="100%" height="100%" fill="url(#ambient-dots)" />
      
      {/* Diagonal lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line
          key={i}
          x1={i * 100}
          y1="0"
          x2={i * 100 + 1000}
          y2="100%"
          stroke="white"
          strokeWidth="0.3"
          opacity="0.2"
        />
      ))}
    </svg>
  )
}
