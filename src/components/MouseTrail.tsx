'use client'

import { useEffect, useRef } from 'react'

interface TrailParticle {
  x: number
  y: number
  alpha: number
  size: number
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<TrailParticle[]>([])
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      
      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
        size: Math.random() * 3 + 1
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current = particles.current.filter(p => p.alpha > 0)

      particles.current.forEach(particle => {
        particle.alpha -= 0.02

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.alpha})`
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(99, 102, 241, 0.5)'
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
    />
  )
}
