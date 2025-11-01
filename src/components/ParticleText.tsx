"use client"

import { useEffect, useRef, useState } from 'react'

interface ParticleTextProps {
  children: string
  className?: string
}

export default function ParticleText({ children, className = "" }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2 // Higher resolution
    canvas.height = rect.height * 2
    ctx.scale(2, 2)
    
    setDimensions({ width: rect.width, height: rect.height })

    // Draw text
    ctx.fillStyle = 'white'
    ctx.font = `bold ${rect.height * 0.6}px Inter`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(children, rect.width / 2, rect.height / 2)

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const particles: Array<{
      x: number
      y: number
      originX: number
      originY: number
      vx: number
      vy: number
    }> = []

    // Create particles from text pixels
    const gap = 3
    for (let y = 0; y < imageData.height; y += gap) {
      for (let x = 0; x < imageData.width; x += gap) {
        const index = (y * imageData.width + x) * 4
        const alpha = imageData.data[index + 3]
        
        if (alpha > 128) {
          particles.push({
            x: x / 2,
            y: y / 2,
            originX: x / 2,
            originY: y / 2,
            vx: 0,
            vy: 0
          })
        }
      }
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)

      particles.forEach(particle => {
        if (isHovered) {
          // Explode particles
          particle.vx += (Math.random() - 0.5) * 0.5
          particle.vy += (Math.random() - 0.5) * 0.5
          particle.x += particle.vx
          particle.y += particle.vy
          particle.vx *= 0.95
          particle.vy *= 0.95
        } else {
          // Return to origin
          const dx = particle.originX - particle.x
          const dy = particle.originY - particle.y
          particle.vx += dx * 0.1
          particle.vy += dy * 0.1
          particle.x += particle.vx
          particle.y += particle.vy
          particle.vx *= 0.9
          particle.vy *= 0.9
        }

        // Draw particle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [children, isHovered, dimensions])

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  )
}
