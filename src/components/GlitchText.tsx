"use client"

import { useState } from 'react'

interface GlitchTextProps {
  children: string
  className?: string
}

export default function GlitchText({ children, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <span className="relative z-10">{children}</span>
      
      {isGlitching && (
        <>
          {/* Glitch layer 1 - Red */}
          <span
            className="absolute inset-0 text-red-500 opacity-70 pointer-events-none"
            style={{
              animation: 'glitch-1 0.3s infinite',
            }}
            aria-hidden="true"
          >
            {children}
          </span>
          
          {/* Glitch layer 2 - Blue */}
          <span
            className="absolute inset-0 text-blue-500 opacity-70 pointer-events-none"
            style={{
              animation: 'glitch-2 0.4s infinite',
              animationDelay: '0.1s',
            }}
            aria-hidden="true"
          >
            {children}
          </span>
          
          {/* Glitch layer 3 - Green */}
          <span
            className="absolute inset-0 text-green-500 opacity-50 pointer-events-none"
            style={{
              animation: 'glitch-3 0.5s infinite',
              animationDelay: '0.2s',
            }}
            aria-hidden="true"
          >
            {children}
          </span>
        </>
      )}
    </span>
  )
}