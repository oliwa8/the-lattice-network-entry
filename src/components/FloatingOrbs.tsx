"use client"

import { useEffect, useRef } from 'react'

export default function FloatingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let orbs: Array<{
      x: number
      y: number
      z: number
      size: number
      speedX: number
      speedY: number
      speedZ: number
      hue: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create orbs
    const orbCount = 15
    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100,
        size: Math.random() * 60 + 40,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        speedZ: (Math.random() - 0.5) * 0.2,
        hue: Math.random() * 60 + 180 // Blue range
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 27, 47, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      orbs.forEach(orb => {
        // Update position
        orb.x += orb.speedX
        orb.y += orb.speedY
        orb.z += orb.speedZ

        // Wrap around edges
        if (orb.x < -100) orb.x = canvas.width + 100
        if (orb.x > canvas.width + 100) orb.x = -100
        if (orb.y < -100) orb.y = canvas.height + 100
        if (orb.y > canvas.height + 100) orb.y = -100
        if (orb.z < 0) orb.z = 100
        if (orb.z > 100) orb.z = 0

        // Calculate depth-based properties
        const scale = 1 + (orb.z / 100)
        const opacity = (orb.z / 100) * 0.4
        const currentSize = orb.size * scale

        // Draw orb with gradient
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, currentSize
        )
        gradient.addColorStop(0, `hsla(${orb.hue}, 70%, 70%, ${opacity})`)
        gradient.addColorStop(0.5, `hsla(${orb.hue}, 60%, 50%, ${opacity * 0.5})`)
        gradient.addColorStop(1, `hsla(${orb.hue}, 50%, 30%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, currentSize, 0, Math.PI * 2)
        ctx.fill()

        // Add glow
        ctx.shadowBlur = 30
        ctx.shadowColor = `hsla(${orb.hue}, 70%, 60%, ${opacity * 0.5})`
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, currentSize * 0.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
