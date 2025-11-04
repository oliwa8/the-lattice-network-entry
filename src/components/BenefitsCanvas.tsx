"use client"

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

export default function BenefitsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      initParticles()
    }

    const initParticles = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      const isMobile = width < 768
      const particleCount = isMobile ? 30 : 60
      
      particlesRef.current = []
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          hue: Math.random() * 60 + 200 // Blue to cyan range
        })
      }
    }

    const drawConnections = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      const isMobile = width < 768
      const maxDistance = isMobile ? 80 : 120
      
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            gradient.addColorStop(0, `hsla(${p1.hue}, 80%, 70%, ${opacity})`)
            gradient.addColorStop(1, `hsla(${p2.hue}, 80%, 70%, ${opacity})`)
            
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })
    }

    const animate = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      
      ctx.clearRect(0, 0, width, height)
      
      // Draw connections first
      drawConnections()
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxInteractionDistance = 150
        
        if (distance < maxInteractionDistance) {
          const force = (maxInteractionDistance - distance) / maxInteractionDistance
          const angle = Math.atan2(dy, dx)
          particle.vx -= Math.cos(angle) * force * 0.5
          particle.vy -= Math.sin(angle) * force * 0.5
        }
        
        // Apply velocity
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Spring back to base position
        const baseDx = particle.baseX - particle.x
        const baseDy = particle.baseY - particle.y
        particle.vx += baseDx * 0.001
        particle.vy += baseDy * 0.001
        
        // Apply damping
        particle.vx *= 0.95
        particle.vy *= 0.95
        
        // Wrap around edges
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0
        
        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        )
        gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 70%, ${particle.opacity})`)
        gradient.addColorStop(0.5, `hsla(${particle.hue}, 80%, 60%, ${particle.opacity * 0.5})`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 50%, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw core
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 80%, ${particle.opacity * 1.5})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        }
      }
    }

    resizeCanvas()
    animate()

    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
