"use client"

import { useEffect, useRef, useState } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
}

export default function InteractiveConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initNodes()
    }

    const nodes: Node[] = []
    const nodeCount = 12

    const initNodes = () => {
      nodes.length = 0
      const spacing = canvas.width / (nodeCount + 1)
      for (let i = 0; i < nodeCount; i++) {
        const x = spacing * (i + 1)
        const y = canvas.height / 2 + (Math.random() - 0.5) * 100
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0
        })
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update node positions
      nodes.forEach(node => {
        const dx = mousePos.x - node.x
        const dy = mousePos.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          node.vx -= (dx / distance) * force * 2
          node.vy -= (dy / distance) * force * 2
        }

        // Spring back to base position
        node.vx += (node.baseX - node.x) * 0.05
        node.vy += (node.baseY - node.y) * 0.05

        // Damping
        node.vx *= 0.9
        node.vy *= 0.9

        node.x += node.vx
        node.y += node.vy
      })

      // Draw connections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length - 1; i++) {
        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y)
        ctx.stroke()
      }

      // Draw nodes
      nodes.forEach((node, i) => {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2)
        ctx.fill()

        // Inner core
        ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [mousePos])

  return (
    <div className="w-full h-32 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
}
