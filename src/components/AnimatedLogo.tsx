"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface AnimatedLogoProps {
  size?: number
  className?: string
}

export default function AnimatedLogo({ size = 120, className = "" }: AnimatedLogoProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      className={`relative ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Animated Rings */}
      <div 
        className={`absolute inset-0 rounded-full border-2 border-white/20 transition-all duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
        style={{
          animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
      <div 
        className={`absolute inset-2 rounded-full border border-white/10 transition-all duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
        style={{
          animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          animationDelay: '0.5s',
        }}
      />
      
      {/* Logo Container */}
      <div 
        className={`absolute inset-4 flex items-center justify-center transition-all duration-1000 ${
          isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-45'
        }`}
      >
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/lattice_jest-removebg-preview-1762045680186.png?width=8000&height=8000&resize=contain"
          alt="The Lattice"
          width={size - 32}
          height={size - 32}
          className="object-contain"
          priority
        />
      </div>

      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 rounded-full bg-blue-500/20 blur-xl transition-all duration-1000 ${
          isVisible ? 'scale-150 opacity-50' : 'scale-50 opacity-0'
        }`}
        style={{
          animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
    </div>
  )
}