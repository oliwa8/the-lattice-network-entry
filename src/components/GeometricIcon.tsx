"use client"

import { useEffect, useRef } from 'react'

interface GeometricIconProps {
  type: 'hexagon' | 'triangle' | 'circle' | 'square'
  className?: string
}

export default function GeometricIcon({ type, className = '' }: GeometricIconProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 80
    const centerX = size / 2
    const centerY = size / 2
    let rotation = 0

    const drawShape = () => {
      ctx.clearRect(0, 0, size, size)
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)
      ctx.translate(-centerX, -centerY)

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.lineWidth = 2
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'

      switch (type) {
        case 'hexagon':
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i
            const x = centerX + 25 * Math.cos(angle)
            const y = centerY + 25 * Math.sin(angle)
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          break

        case 'triangle':
          ctx.beginPath()
          for (let i = 0; i < 3; i++) {
            const angle = (Math.PI * 2 / 3) * i - Math.PI / 2
            const x = centerX + 28 * Math.cos(angle)
            const y = centerY + 28 * Math.sin(angle)
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          break

        case 'circle':
          ctx.beginPath()
          ctx.arc(centerX, centerY, 25, 0, Math.PI * 2)
          ctx.closePath()
          break

        case 'square':
          ctx.beginPath()
          ctx.rect(centerX - 22, centerY - 22, 44, 44)
          ctx.closePath()
          break
      }

      ctx.fill()
      ctx.stroke()

      // Inner lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - 15)
      ctx.lineTo(centerX, centerY + 15)
      ctx.moveTo(centerX - 15, centerY)
      ctx.lineTo(centerX + 15, centerY)
      ctx.stroke()

      ctx.restore()
    }

    let animationId: number
    const animate = () => {
      rotation += 0.005
      drawShape()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [type])

  return (
    <canvas
      ref={canvasRef}
      width={80}
      height={80}
      className={`transition-transform duration-500 group-hover:scale-110 ${className}`}
    />
  )
}
