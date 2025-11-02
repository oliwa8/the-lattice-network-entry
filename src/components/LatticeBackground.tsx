"use client"

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

export default function LatticeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let nodes: Node[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 25000)
      nodes = []
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
        })
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 27, 47, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes - minimal and refined
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1
          node.x = Math.max(0, Math.min(canvas.width, node.x))
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1
          node.y = Math.max(0, Math.min(canvas.height, node.y))
        }

        // Simple subtle glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2)
        ctx.fill()

        // Core node - small and refined
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
        ctx.fill()
      })

      // Clean, simple connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.12
            
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

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
      style={{ zIndex: 0 }}
    />
  )
}