"use client"

import { useEffect, useRef, useState } from 'react'

export default function NetworkIcon() {
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

    // Network nodes
    const nodes = [
      { x: 60, y: 30, radius: 4, angle: 0 },
      { x: 30, y: 60, radius: 3, angle: Math.PI / 3 },
      { x: 90, y: 60, radius: 3, angle: 2 * Math.PI / 3 },
      { x: 45, y: 90, radius: 3, angle: Math.PI },
      { x: 75, y: 90, radius: 3, angle: 4 * Math.PI / 3 },
      { x: 60, y: 60, radius: 5, angle: 5 * Math.PI / 3 }, // Center node
    ]

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, size, size)
      time += 0.02

      // Draw connections
      ctx.strokeStyle = isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = isHovered ? 1.5 : 1
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
          if (dist < 50) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes with pulse effect
      nodes.forEach((node, i) => {
        const pulse = isHovered ? Math.sin(time * 2 + node.angle) * 0.3 + 1 : 1
        const radius = node.radius * pulse
        
        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 3)
        gradient.addColorStop(0, isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2)
        ctx.fill()

        // Node core
        ctx.fillStyle = isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fill()

        // Inner highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
        ctx.beginPath()
        ctx.arc(node.x - radius * 0.3, node.y - radius * 0.3, radius * 0.4, 0, Math.PI * 2)
        ctx.fill()
      })

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