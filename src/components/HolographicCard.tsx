"use client"

import { ReactNode, useRef, useState } from 'react'

interface HolographicCardProps {
  children: ReactNode
  className?: string
}

export default function HolographicCard({ children, className = '' }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    setRotation({ x: rotateX, y: rotateY })
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setGlowPosition({ x: 50, y: 50 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative transition-transform duration-500 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Holographic glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle 120px at ${glowPosition.x}% ${glowPosition.y}%, rgba(255,255,255,0.3), transparent 50%)`,
        }}
      />
      
      {/* Rainbow holographic edge */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `conic-gradient(from ${glowPosition.x * 3.6}deg at ${glowPosition.x}% ${glowPosition.y}%, 
            rgba(255,0,255,0.2), 
            rgba(0,255,255,0.2), 
            rgba(255,255,0,0.2), 
            rgba(255,0,255,0.2))`,
          filter: 'blur(20px)',
        }}
      />

      {children}
    </div>
  )
}
