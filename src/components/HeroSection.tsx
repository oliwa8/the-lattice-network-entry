"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 py-20">
      <div
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-6 md:mb-8 text-white px-4">
          Welcome to The Lattice
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/80 mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed px-4">
          A community for young, analytical, systems-oriented minds shaping business with depth, foresight, and integrity.
        </p>
        
        <div className="relative inline-block group">
          <div className="absolute -inset-1 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-all duration-700 animate-pulse" />
          
          <div className="absolute -inset-2 border border-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
          
          <Button
            size="lg"
            className="relative bg-white text-[#0a1b2f] hover:bg-white font-medium px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 text-base sm:text-lg rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/30 overflow-hidden"
            asChild
          >
            <a href="https://tally.so/r/3E9blL" target="_blank" rel="noopener noreferrer">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center gap-2 md:gap-3">
                Apply to Join
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
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