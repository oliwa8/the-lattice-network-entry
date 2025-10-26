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
    <section ref={sectionRef} className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-light text-center mb-12 text-white transition-all duration-1000 tracking-tight ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Who is The Lattice for?
        </h2>
        
        <div
          className={`group relative p-12 md:p-16 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950/30 to-cyan-950/20 backdrop-blur-md transition-all duration-1000 delay-200 hover:border-blue-400/40 hover:bg-blue-950/40 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Multi-layer glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
          <div className="absolute -inset-1 bg-blue-500/10 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/5 rounded-3xl opacity-50 group-hover:opacity-100 transition-all duration-700" />
          
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed mb-8 relative z-10 text-center transition-all duration-500 group-hover:text-white group-hover:scale-[1.01]">
            The Lattice is for young, analytical, systems-oriented minds who want to shape business with depth, foresight, and integrity.
          </p>
          
          <div className="flex items-center justify-center my-8 relative z-10">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent group-hover:via-cyan-400/50 transition-all duration-700" />
          </div>
          
          <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed relative z-10 text-center italic transition-all duration-500 group-hover:text-white/90">
            If you've ever felt like an outsider in noisy, ego-driven spaces — this is your place.
          </p>
          
          {/* Animated corner accents with glow */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-400/30 rounded-tl-lg transition-all duration-500 group-hover:border-cyan-400/60 group-hover:w-12 group-hover:h-12 group-hover:shadow-lg group-hover:shadow-blue-400/50" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-blue-400/30 rounded-tr-lg transition-all duration-500 group-hover:border-cyan-400/60 group-hover:w-12 group-hover:h-12 group-hover:shadow-lg group-hover:shadow-blue-400/50" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-blue-400/30 rounded-bl-lg transition-all duration-500 group-hover:border-cyan-400/60 group-hover:w-12 group-hover:h-12 group-hover:shadow-lg group-hover:shadow-blue-400/50" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-400/30 rounded-br-lg transition-all duration-500 group-hover:border-cyan-400/60 group-hover:w-12 group-hover:h-12 group-hover:shadow-lg group-hover:shadow-blue-400/50" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 rounded-3xl" />
        </div>
      </div>
    </section>
  )
}