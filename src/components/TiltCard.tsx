"use client"

import { useRef, useState } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}

export default function TiltCard({ children, className = "", maxTilt = 15 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const tiltX = ((y - centerY) / centerY) * maxTilt
    const tiltY = ((x - centerX) / centerX) * -maxTilt
    
    setTilt({ x: tiltX, y: tiltY })
    setGlare({ 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100,
      opacity: 0.3
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glare effect */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 50%)`,
        }}
      />
      
      {/* Holographic edge glow */}
      <div 
        className="absolute -inset-1 rounded-2xl md:rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(${(tilt.y + 90) * 2}deg, rgba(255,255,255,0.1) 0%, rgba(100,200,255,0.2) 50%, rgba(255,100,200,0.1) 100%)`,
          filter: 'blur(8px)',
        }}
      />
      
      {children}
    </div>
  )
}
