"use client"

import { useEffect, useRef } from 'react'

export default function WaveAnimation() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const path1 = svg.querySelector('#wave-1') as SVGPathElement
    const path2 = svg.querySelector('#wave-2') as SVGPathElement
    const path3 = svg.querySelector('#wave-3') as SVGPathElement

    if (!path1 || !path2 || !path3) return

    let time = 0
    let animationFrameId: number

    const animate = () => {
      time += 0.003

      // Create slow, flowing wave paths
      const createWavePath = (offset: number, amplitude: number) => {
        const width = window.innerWidth
        const height = window.innerHeight
        let path = `M 0 ${height / 2}`

        for (let x = 0; x <= width; x += 20) {
          const y = Math.sin((x / 200) + time + offset) * amplitude + height / 2
          path += ` L ${x} ${y}`
        }

        path += ` L ${width} ${height} L 0 ${height} Z`
        return path
      }

      path1.setAttribute('d', createWavePath(0, 50))
      path2.setAttribute('d', createWavePath(1, 60))
      path3.setAttribute('d', createWavePath(2, 40))

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
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.015)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.01)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <path id="wave-1" fill="url(#wave-gradient-1)" />
      <path id="wave-2" fill="url(#wave-gradient-2)" />
      <path id="wave-3" fill="url(#wave-gradient-3)" />
    </svg>
  )
}
