"use client"

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

interface MagneticButtonProps {
  children: React.ReactNode
  href: string
  className?: string
}

export default function MagneticButton({ children, href, className = "" }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    // Magnetic pull effect - stronger when closer
    const pullStrength = 0.3
    setPosition({
      x: distanceX * pullStrength,
      y: distanceY * pullStrength
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div className="relative inline-block group">
      {/* Magnetic field visualization */}
      <div className="absolute -inset-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-full border border-white/10 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-4 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
      </div>

      {/* Glowing orb that follows cursor */}
      {isHovered && (
        <div 
          className="absolute w-32 h-32 rounded-full bg-white/20 blur-3xl pointer-events-none transition-all duration-200"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
          }}
        />
      )}
      
      <Button
        size="lg"
        className={`relative bg-white text-[#0a1b2f] hover:bg-white font-medium px-12 md:px-16 py-7 md:py-8 text-lg md:text-xl rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-white/50 overflow-hidden ${className}`}
        asChild
      >
        <a 
          ref={buttonRef}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        >
          {/* Shimmer effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {/* Ripple effect on hover */}
          <span className="absolute inset-0 rounded-full bg-white/30 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700" />
          
          <span className="relative flex items-center gap-3">
            {children}
            <svg 
              className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </a>
      </Button>
    </div>
  )
}
