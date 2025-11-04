"use client"

import { useEffect, useRef, useState } from 'react'

export default function CollaborationIcon() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const size = 120
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    // Two circles that connect
    let time = 0
    const centerX = size / 2
    const centerY = size / 2

    const animate = () => {
      ctx.clearRect(0, 0, size, size)
      time += 0.03

      const offset = isHovered ? Math.sin(time) * 5 : 0
      const circle1X = centerX - 20 + offset
      const circle2X = centerX + 20 - offset
      const circleY = centerY
      const radius = 15

      // Connection flow
      if (isHovered) {
        const flowProgress = (Math.sin(time * 2) + 1) / 2
        const startX = circle1X + radius
        const endX = circle2X - radius
        const currentX = startX + (endX - startX) * flowProgress

        // Energy particle
        const particleGradient = ctx.createRadialGradient(currentX, circleY, 0, currentX, circleY, 8)
        particleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
        particleGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(currentX, circleY, 8, 0, Math.PI * 2)
        ctx.fill()
      }

      // Connection line
      ctx.strokeStyle = isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = isHovered ? 2.5 : 2
      ctx.beginPath()
      ctx.moveTo(circle1X + radius, circleY)
      ctx.lineTo(circle2X - radius, circleY)
      ctx.stroke()

      // Draw circles
      const drawCircle = (x: number, y: number) => {
        // Outer glow
        const glowGradient = ctx.createRadialGradient(x, y, radius, x, y, radius * 2)
        glowGradient.addColorStop(0, isHovered ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)')
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2)
        ctx.fill()

        // Circle fill
        const fillGradient = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 0, x, y, radius)
        fillGradient.addColorStop(0, isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)')
        fillGradient.addColorStop(1, isHovered ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)')
        ctx.fillStyle = fillGradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()

        // Circle border
        ctx.strokeStyle = isHovered ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.25)'
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.beginPath()
        ctx.arc(x - radius * 0.4, y - radius * 0.4, radius * 0.3, 0, Math.PI * 2)
        ctx.fill()
      }

      drawCircle(circle1X, circleY)
      drawCircle(circle2X, circleY)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered])

  return (
    <div 
      className="flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="cursor-pointer transition-transform duration-300 hover:scale-110" />
    </div>
  )
}