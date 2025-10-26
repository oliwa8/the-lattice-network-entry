"use client"

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 px-6">
      <div
        className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-8 text-white leading-tight tracking-tight transition-all duration-700 hover:scale-[1.01]">
          Join the network redefining how<br />thoughtful people connect and build.
        </h2>
        
        <p className="text-lg md:text-xl text-white/60 mb-16 max-w-2xl mx-auto leading-relaxed transition-all duration-700 hover:text-white/75">
          Application opens the door to a curated community of analytical minds, meaningful collaboration, and lasting impact.
        </p>
        
        {/* Premium CTA with layered blue effects */}
        <div className="relative inline-block group">
          {/* Multi-layer blue glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-cyan-500/50 to-blue-500/30 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-700 animate-pulse" />
          <div className="absolute -inset-3 bg-blue-400/25 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute -inset-2 bg-cyan-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-400" />
          
          {/* Animated border rings */}
          <div className="absolute -inset-3 border border-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
          <div className="absolute -inset-3 border border-cyan-400/15 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-1000" />
          
          <Button
            size="lg"
            className="relative bg-white text-[#0a1b2f] hover:bg-white font-semibold px-16 py-8 text-xl rounded-full transition-all duration-500 hover:scale-105 shadow-2xl shadow-blue-500/20 overflow-hidden"
            asChild
          >
            <a href="https://tally.so/r/3E9blL" target="_blank" rel="noopener noreferrer" className="group/btn">
              {/* Animated gradient overlay */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              
              {/* Radial pulse on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-100/0 via-blue-100/40 to-cyan-100/0 scale-0 group-hover/btn:scale-100 transition-transform duration-700 rounded-full" />
              
              <span className="relative flex items-center gap-4">
                <span>Apply to Join</span>
                <svg 
                  className="w-6 h-6 transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110" 
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
        
        {/* Subtle supporting text */}
        <p className="mt-12 text-sm text-white/40 tracking-wide transition-all duration-500 hover:text-white/60">
          Limited spots · Selective admission · Rolling applications
        </p>
      </div>
    </section>
  )
}