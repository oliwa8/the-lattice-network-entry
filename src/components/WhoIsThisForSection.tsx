"use client"

import { useEffect, useRef, useState } from 'react'

export default function WhoIsThisForSection() {
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
    <section ref={sectionRef} className="relative py-24 px-6">
      {/* Subtle geometric SVG background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <svg className="absolute left-0 top-1/4 w-64 h-64" viewBox="0 0 200 200">
          <path 
            d="M20,100 L100,20 L180,100 L100,180 Z" 
            fill="none" 
            stroke="white" 
            strokeWidth="0.5"
            className="animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <path 
            d="M40,100 L100,40 L160,100 L100,160 Z" 
            fill="none" 
            stroke="white" 
            strokeWidth="0.5"
            className="animate-pulse"
            style={{ animationDuration: '5s', animationDelay: '0.5s' }}
          />
        </svg>
        
        <svg className="absolute right-0 bottom-1/4 w-64 h-64" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="0.5" className="animate-pulse" style={{ animationDuration: '6s' }} />
          <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeWidth="0.5" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          <line x1="100" y1="40" x2="100" y2="160" stroke="white" strokeWidth="0.5" opacity="0.5" />
          <line x1="40" y1="100" x2="160" y2="100" stroke="white" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </div>

      <div
        className={`max-w-5xl mx-auto relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Top geometric divider */}
        <div className="mb-16 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/40" />
          <svg width="8" height="8" viewBox="0 0 8 8">
            <rect width="8" height="8" fill="white" opacity="0.4" transform="rotate(45 4 4)" />
          </svg>
          <div className="h-px flex-1 max-w-xs bg-white/20" />
          <svg width="8" height="8" viewBox="0 0 8 8">
            <rect width="8" height="8" fill="white" opacity="0.4" transform="rotate(45 4 4)" />
          </svg>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/40" />
        </div>
        
        {/* Title with abstract lattice lines */}
        <div className="relative mb-12">
          <svg className="absolute -left-24 top-1/2 -translate-y-1/2 w-16 h-32 opacity-20 hidden lg:block" viewBox="0 0 60 120">
            <line x1="0" y1="0" x2="60" y2="60" stroke="white" strokeWidth="1" />
            <line x1="60" y1="60" x2="0" y2="120" stroke="white" strokeWidth="1" />
          </svg>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-center text-white tracking-tight leading-tight">
            Who is The Lattice for?
          </h2>
          
          <svg className="absolute -right-24 top-1/2 -translate-y-1/2 w-16 h-32 opacity-20 hidden lg:block" viewBox="0 0 60 120">
            <line x1="60" y1="0" x2="0" y2="60" stroke="white" strokeWidth="1" />
            <line x1="0" y1="60" x2="60" y2="120" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        
        {/* Text blocks with structural lines */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Block 1 */}
          <div className="relative pl-8 border-l-2 border-white/20">
            <div className="absolute left-0 top-0 w-2 h-2 -translate-x-1/2 rounded-full bg-white/40" />
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
              The Lattice is for <span className="text-white font-normal">young, analytical, systems-oriented minds</span>
            </p>
          </div>
          
          {/* Block 2 */}
          <div className="relative pl-8 border-l-2 border-white/20">
            <div className="absolute left-0 top-0 w-2 h-2 -translate-x-1/2 rounded-full bg-white/40" />
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
              who want to shape business with <span className="text-white font-normal">depth, foresight, and integrity</span>
            </p>
          </div>
          
          {/* Block 3 */}
          <div className="relative pl-8 border-l-2 border-white/20">
            <div className="absolute left-0 top-0 w-2 h-2 -translate-x-1/2 rounded-full bg-white/40" />
            <div className="absolute left-0 bottom-0 w-2 h-2 -translate-x-1/2 rounded-full bg-white/40" />
            <p className="text-xl md:text-2xl font-light text-white/85 leading-relaxed italic">
              If you've ever felt like an outsider in noisy, ego-driven spaces — <span className="text-white not-italic font-normal">this is your place.</span>
            </p>
          </div>
        </div>
        
        {/* Bottom geometric divider */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-white/30" />
          <svg width="6" height="6" viewBox="0 0 6 6">
            <circle cx="3" cy="3" r="3" fill="white" opacity="0.3" />
          </svg>
          <div className="h-px w-32 bg-gradient-to-l from-transparent via-white/30 to-white/30" />
        </div>
      </div>
    </section>
  )
}