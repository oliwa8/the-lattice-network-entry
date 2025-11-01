"use client"

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  speed: number
  opacity: number
  size: number
}

export default function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: Particle[] = []
    const particleCount = 50

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.1 + Math.random() * 0.3,
        size: 1 + Math.random() * 2
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 27, 47, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        // Update position
        particle.y -= particle.speed
        
        // Reset if off screen
        if (particle.y < 0) {
          particle.y = canvas.height
          particle.x = Math.random() * canvas.width
        }

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw connection lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x
          const dy = particles[j].y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[3] opacity-40"
    />
  )
}
