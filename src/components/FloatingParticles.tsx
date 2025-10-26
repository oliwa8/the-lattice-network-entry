"use client"

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  opacity: number
  pulsePhase: number
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
      const particleCount = Math.floor((canvas.width * canvas.height) / 30000)
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedY: -Math.random() * 0.3 - 0.1,
          opacity: Math.random() * 0.5 + 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
    }

    const draw = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.y += particle.speedY
        
        // Reset particle when it goes off screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10
          particle.x = Math.random() * canvas.width
        }

        // Pulsing effect
        const pulse = Math.sin(time * 2 + particle.pulsePhase) * 0.3 + 0.7

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity * pulse})`)
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${particle.opacity * pulse * 0.5})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
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
