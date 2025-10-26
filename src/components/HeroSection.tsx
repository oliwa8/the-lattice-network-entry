"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 text-white transition-all duration-700 hover:scale-[1.02]">
          Welcome to The Lattice
        </h1>
        <p className="text-xl md:text-2xl font-light text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed transition-all duration-700 hover:text-white/90">
          A community for young, analytical, systems-oriented minds shaping business with depth, foresight, and integrity.
        </p>
        
        <div className="relative inline-block group">
          {/* Multi-layer blue glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/40 via-cyan-500/60 to-blue-500/40 rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-all duration-700 animate-pulse" />
          <div className="absolute -inset-1 bg-blue-400/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Animated expanding rings */}
          <div className="absolute -inset-2 border border-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
          <div className="absolute -inset-3 border border-cyan-400/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
          
          <Button
            size="lg"
            className="relative bg-white text-[#0a1b2f] hover:bg-white font-medium px-12 py-7 text-lg rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/40 overflow-hidden"
            asChild>
            <a href="https://tally.so/r/3E9blL" target="_blank" rel="noopener noreferrer">
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Radial pulse */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-cyan-200/30 to-blue-100/0 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full" />
              
              <span className="relative flex items-center gap-3">
                Apply to Join
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}