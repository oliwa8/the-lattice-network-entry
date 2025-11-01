"use client"

import { useEffect, useState } from 'react'

interface WaveTextProps {
  children: string
  className?: string
  delay?: number
}

export default function WaveText({ children, className = "", delay = 0 }: WaveTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span className={className}>
      {children.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: `${index * 30}ms`,
            animation: isVisible ? `wave 2s ease-in-out ${index * 0.05}s infinite` : 'none',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      
      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }
      `}</style>
    </span>
  )
}
