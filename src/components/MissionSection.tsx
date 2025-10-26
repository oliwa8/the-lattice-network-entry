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

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 px-6 group">
      <div
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mb-16 flex items-center justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent group-hover:via-blue-300/60 transition-all duration-700" />
        </div>
        
        <div className="relative p-8 rounded-3xl border border-blue-500/10 bg-gradient-to-br from-blue-950/20 to-transparent backdrop-blur-sm transition-all duration-700 hover:border-blue-400/30 hover:bg-blue-950/30 hover:shadow-2xl hover:shadow-blue-500/10">
          {/* Animated glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
          
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed mb-8 relative z-10 transition-all duration-500 group-hover:text-white group-hover:scale-[1.02]">
            We built The Lattice for those who think differently — the quiet, curious builders who seek structure in complexity and meaning in systems.
          </p>
          
          <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed relative z-10 transition-all duration-500 group-hover:text-white/85">
            Our mission is to create a space where rigor, integrity, and foresight define the next generation of collaboration and leadership.
          </p>
          
          {/* Pulse effect on hover */}
          <div className="absolute inset-0 rounded-3xl bg-blue-500/5 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700" />
        </div>
        
        <div className="mt-20 flex items-center justify-center gap-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-400/30 to-blue-400/30 group-hover:via-cyan-400/50 transition-all duration-700" />
          <div className="w-2 h-2 rounded-full bg-blue-400/40 group-hover:bg-cyan-400/60 group-hover:scale-125 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-400/50" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent via-blue-400/30 to-blue-400/30 group-hover:via-cyan-400/50 transition-all duration-700" />
        </div>
      </div>
    </section>
  )
}