"use client"

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  opacity: number
  pulsePhase: number
  hue: number
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 25000)
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 1,
          speedY: -Math.random() * 0.4 - 0.15,
          speedX: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.6 + 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
          hue: Math.random() * 60 + 190, // Blue to cyan range
        })
      }
    }

    const draw = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.y += particle.speedY
        particle.x += particle.speedX
        
        // Reset particle when it goes off screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10
          particle.x = Math.random() * canvas.width
        }
        if (particle.x < -10 || particle.x > canvas.width + 10) {
          particle.x = Math.random() * canvas.width
        }

        // Enhanced pulsing effect
        const pulse = Math.sin(time * 2 + particle.pulsePhase) * 0.4 + 0.6

        // Blue/cyan glow based on hue
        const r = particle.hue < 210 ? 59 : 96
        const g = particle.hue < 210 ? 130 : 165
        const b = particle.hue < 210 ? 246 : 250

        // Multi-layer glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4
        )
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${particle.opacity * pulse})`)
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${particle.opacity * pulse * 0.6})`)
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${particle.opacity * pulse * 0.3})`)
        gradient.addColorStop(1, 'rgba(96, 165, 250, 0)')

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity * pulse})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}