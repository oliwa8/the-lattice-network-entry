"use client"

import { useEffect, useRef, useState } from 'react'

export default function MissionSection() {
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

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 px-6">
      {/* Abstract lattice pattern background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="absolute top-0 left-1/4 w-96 h-96" viewBox="0 0 300 300">
          <path d="M50,50 L150,50 L150,150 L50,150 Z" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M150,50 L250,50 L250,150 L150,150 Z" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M50,150 L150,150 L150,250 L50,250 Z" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M150,150 L250,150 L250,250 L150,250 Z" fill="none" stroke="white" strokeWidth="0.5" />
          <line x1="50" y1="50" x2="250" y2="250" stroke="white" strokeWidth="0.3" opacity="0.5" />
          <line x1="250" y1="50" x2="50" y2="250" stroke="white" strokeWidth="0.3" opacity="0.5" />
        </svg>
      </div>

      <div
        className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Top divider with network nodes */}
        <div className="mb-16 flex items-center justify-center gap-2">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-white/40" />
          <svg width="12" height="12" viewBox="0 0 12 12">
            <circle cx="6" cy="6" r="2" fill="white" opacity="0.4" />
            <circle cx="6" cy="6" r="5" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
          </svg>
          <div className="h-px w-12 bg-white/30" />
          <svg width="12" height="12" viewBox="0 0 12 12">
            <circle cx="6" cy="6" r="2" fill="white" opacity="0.4" />
            <circle cx="6" cy="6" r="5" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
          </svg>
          <div className="h-px w-24 bg-gradient-to-l from-transparent via-white/40 to-white/40" />
        </div>
        
        <div className="space-y-10">
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed">
            We built The Lattice for those who <span className="text-white">think differently</span> — the quiet, curious builders who seek <span className="text-white">structure in complexity</span> and <span className="text-white">meaning in systems</span>.
          </p>
          
          {/* Structural separator */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="h-px w-16 bg-white/20" />
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M12,2 L22,12 L12,22 L2,12 Z" fill="none" stroke="white" strokeWidth="0.5" opacity="0.4" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="white" strokeWidth="0.5" opacity="0.3" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="0.5" opacity="0.3" />
            </svg>
            <div className="h-px w-16 bg-white/20" />
          </div>
          
          <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed max-w-3xl mx-auto">
            Our mission is to create a space where <span className="text-white/85">rigor, integrity, and foresight</span> define the next generation of collaboration and leadership.
          </p>
        </div>
        
        {/* Bottom divider */}
        <div className="mt-20 flex items-center justify-center gap-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-white/30" />
          <div className="w-2 h-2 rounded-full bg-white/40" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent via-white/30 to-white/30" />
        </div>
      </div>
    </section>
  )
}