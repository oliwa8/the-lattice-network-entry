"use client"

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  pulsePhase: number
  baseRadius: number
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
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 18000)
      nodes = []
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          pulsePhase: Math.random() * Math.PI * 2,
          baseRadius: 1.5 + Math.random() * 1,
        })
      }
    }

    const draw = () => {
      time += 0.008
      ctx.fillStyle = 'rgba(10, 27, 47, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes with enhanced glow
      nodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges with smooth damping
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1
          node.x = Math.max(0, Math.min(canvas.width, node.x))
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1
          node.y = Math.max(0, Math.min(canvas.height, node.y))
        }

        // Enhanced pulsing effect
        const pulse = Math.sin(time * 1.5 + node.pulsePhase) * 0.4 + 0.6
        const glowSize = node.baseRadius + pulse * 1.5

        // Multi-layer glow for depth
        const gradient1 = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize * 5)
        gradient1.addColorStop(0, `rgba(255, 255, 255, ${0.3 * pulse})`)
        gradient1.addColorStop(0.3, `rgba(255, 255, 255, ${0.15 * pulse})`)
        gradient1.addColorStop(0.6, `rgba(255, 255, 255, ${0.05 * pulse})`)
        gradient1.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = gradient1
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowSize * 5, 0, Math.PI * 2)
        ctx.fill()

        // Inner glow
        const gradient2 = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize * 2)
        gradient2.addColorStop(0, `rgba(255, 255, 255, ${0.6 * pulse})`)
        gradient2.addColorStop(0.5, `rgba(255, 255, 255, ${0.3 * pulse})`)
        gradient2.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = gradient2
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowSize * 2, 0, Math.PI * 2)
        ctx.fill()

        // Core node
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + pulse * 0.3})`
        ctx.fill()
      })

      // Enhanced connections with gradient and glow
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 180) {
            const opacity = (1 - distance / 180) * 0.25
            const pulse = Math.sin(time * 2 + i * 0.5 + j * 0.5) * 0.15 + 0.85
            
            // Gradient line
            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
            gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * pulse})`)
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * pulse * 1.2})`)
            gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * pulse})`)
            
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1.2
            ctx.stroke()
            
            // Glow on connection
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * pulse * 0.3})`
            ctx.lineWidth = 2.5
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