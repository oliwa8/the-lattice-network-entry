"use client"

import { useEffect, useRef, useState } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  connections: number[]
  pulse: number
  energy: number
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollProgressRef = useRef(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize nodes based on scroll progress
    const initNodes = (count: number) => {
      const nodes: Node[] = []
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          connections: [],
          pulse: Math.random() * Math.PI * 2,
          energy: Math.random()
        })
      }
      return nodes
    }

    nodesRef.current = initNodes(30)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Track scroll progress
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY / scrollHeight
      scrollProgressRef.current = scrolled

      // Add more nodes as user scrolls
      const targetNodeCount = Math.floor(30 + scrolled * 50)
      while (nodesRef.current.length < targetNodeCount) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          connections: [],
          pulse: Math.random() * Math.PI * 2,
          energy: Math.random()
        })
      }
    }
    window.addEventListener('scroll', handleScroll)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const nodes = nodesRef.current
      const mouse = mouseRef.current
      const maxDistance = 150
      const mouseInfluence = 100

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Move nodes
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Mouse interaction - repel nodes
        const dx = node.x - mouse.x
        const dy = node.y - mouse.y
        const distToMouse = Math.sqrt(dx * dx + dy * dy)
        
        if (distToMouse < mouseInfluence) {
          const force = (mouseInfluence - distToMouse) / mouseInfluence
          node.vx += (dx / distToMouse) * force * 0.5
          node.vy += (dy / distToMouse) * force * 0.5
          node.energy = Math.min(1, node.energy + 0.1)
        }

        // Damping
        node.vx *= 0.99
        node.vy *= 0.99

        // Update pulse
        node.pulse += 0.05
        node.energy *= 0.99

        // Draw connections
        node.connections = []
        nodes.forEach((other, j) => {
          if (i >= j) return
          const dx = other.x - node.x
          const dy = other.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            node.connections.push(j)
            const opacity = (1 - dist / maxDistance) * 0.3
            const energyBoost = (node.energy + other.energy) * 0.3
            
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            
            // Create gradient for connections
            const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y)
            gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity + energyBoost})`)
            gradient.addColorStop(0.5, `rgba(100, 150, 255, ${opacity + energyBoost * 1.5})`)
            gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity + energyBoost})`)
            
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5 + energyBoost
            ctx.stroke()
          }
        })

        // Draw node with pulsing effect
        const pulseSize = Math.sin(node.pulse) * 0.5 + 0.5
        const nodeRadius = node.radius + pulseSize + node.energy * 2

        // Outer glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeRadius * 3)
        glowGradient.addColorStop(0, `rgba(100, 150, 255, ${0.3 + node.energy * 0.4})`)
        glowGradient.addColorStop(1, 'rgba(100, 150, 255, 0)')
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeRadius * 3, 0, Math.PI * 2)
        ctx.fill()

        // Inner node
        const nodeGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeRadius)
        nodeGradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 + node.energy * 0.1})`)
        nodeGradient.addColorStop(1, `rgba(100, 150, 255, ${0.6 + node.energy * 0.4})`)
        ctx.fillStyle = nodeGradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isClient])

  if (!isClient) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
