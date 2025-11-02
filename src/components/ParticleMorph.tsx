'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
}

export default function ParticleMorph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 150

    // Create lattice pattern
    const createLatticePattern = () => {
      particles.length = 0
      const spacing = 80
      const cols = Math.floor(canvas.width / spacing)
      const rows = Math.floor(canvas.height / spacing)
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            targetX: i * spacing + spacing / 2,
            targetY: j * spacing + spacing / 2,
            size: 2
          })
        }
      }
    }

    // Create circle pattern
    const createCirclePattern = () => {
      particles.length = 0
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.3

      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2
        particles.push({
          x: particles[i]?.x ?? Math.random() * canvas.width,
          y: particles[i]?.y ?? Math.random() * canvas.height,
          targetX: centerX + Math.cos(angle) * radius,
          targetY: centerY + Math.sin(angle) * radius,
          size: 3
        })
      }
    }

    // Create wave pattern
    const createWavePattern = () => {
      particles.length = 0
      const amplitude = canvas.height * 0.2
      const frequency = 0.01

      for (let i = 0; i < particleCount; i++) {
        const x = (i / particleCount) * canvas.width
        const y = canvas.height / 2 + Math.sin(x * frequency) * amplitude
        particles.push({
          x: particles[i]?.x ?? Math.random() * canvas.width,
          y: particles[i]?.y ?? Math.random() * canvas.height,
          targetX: x,
          targetY: y,
          size: 2.5
        })
      }
    }

    createLatticePattern()

    let patternIndex = 0
    const patterns = [createLatticePattern, createCirclePattern, createWavePattern]

    const morphInterval = setInterval(() => {
      patternIndex = (patternIndex + 1) % patterns.length
      patterns[patternIndex]()
    }, 5000)

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 27, 47, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Move towards target
        particle.x += (particle.targetX - particle.x) * 0.05
        particle.y += (particle.targetY - particle.y) * 0.05

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      patterns[patternIndex]()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(morphInterval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.4 }}
    />
  )
}
