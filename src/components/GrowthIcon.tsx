"use client"

import { useEffect, useRef, useState } from 'react'

export default function GrowthIcon() {
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

    // Growth bars
    const bars = [
      { x: 20, baseHeight: 20, targetHeight: 40 },
      { x: 40, baseHeight: 30, targetHeight: 55 },
      { x: 60, baseHeight: 45, targetHeight: 70 },
      { x: 80, baseHeight: 60, targetHeight: 85 },
    ]

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, size, size)
      time += 0.04

      bars.forEach((bar, i) => {
        const progress = isHovered ? Math.min((Math.sin(time - i * 0.3) + 1) / 2, 1) : 0.5
        const currentHeight = bar.baseHeight + (bar.targetHeight - bar.baseHeight) * progress
        const y = 100 - currentHeight
        const width = 15

        // Bar shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
        ctx.fillRect(bar.x + 1, y + 1, width, currentHeight)

        // Bar gradient
        const opacity = isHovered ? 0.7 - (i * 0.1) : 0.5 - (i * 0.08)
        const gradient = ctx.createLinearGradient(bar.x, y, bar.x, y + currentHeight)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * 0.6})`)
        ctx.fillStyle = gradient
        ctx.fillRect(bar.x, y, width, currentHeight)

        // Bar border
        ctx.strokeStyle = isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)'
        ctx.lineWidth = 1.5
        ctx.strokeRect(bar.x, y, width, currentHeight)

        // Shine effect
        const shineGradient = ctx.createLinearGradient(bar.x, y, bar.x + width, y)
        shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
        shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)')
        shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = shineGradient
        ctx.fillRect(bar.x, y, width, currentHeight)

        // Glow on top
        if (isHovered) {
          const glowGradient = ctx.createRadialGradient(
            bar.x + width / 2, y, 0,
            bar.x + width / 2, y, 20
          )
          glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
          glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(bar.x + width / 2, y, 20, 0, Math.PI * 2)
          ctx.fill()
        }

        // Particle effect when hovering
        if (isHovered && Math.random() > 0.7) {
          const particleY = y + Math.random() * currentHeight
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
          ctx.beginPath()
          ctx.arc(bar.x + width / 2, particleY, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Arrow at the top
      if (isHovered) {
        const arrowY = 10 - Math.sin(time * 2) * 3
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.lineWidth = 2.5
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        
        ctx.beginPath()
        ctx.moveTo(50, arrowY + 10)
        ctx.lineTo(60, arrowY)
        ctx.lineTo(70, arrowY + 10)
        ctx.stroke()
      }

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