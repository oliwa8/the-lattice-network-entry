'use client'

import { useEffect, useRef } from 'react'

export default function LiquidBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 600
    canvas.height = 600

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 150

      // Create blob shape
      ctx.beginPath()
      
      for (let i = 0; i <= 360; i += 1) {
        const angle = (i * Math.PI) / 180
        const offsetX = Math.sin(angle * 3 + time) * 30
        const offsetY = Math.cos(angle * 5 + time) * 30
        const x = centerX + Math.cos(angle) * (radius + offsetX)
        const y = centerY + Math.sin(angle) * (radius + offsetY)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.closePath()

      // Gradient fill
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)')
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.2)')
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0.1)')
      
      ctx.fillStyle = gradient
      ctx.fill()

      // Glow effect
      ctx.shadowBlur = 40
      ctx.shadowColor = 'rgba(99, 102, 241, 0.5)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 2
      ctx.stroke()

      time += 0.01
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1] opacity-20">
      <canvas
        ref={canvasRef}
        className="absolute"
        style={{
          filter: 'blur(40px)',
          mixBlendMode: 'screen'
        }}
      />
    </div>
  )
}
