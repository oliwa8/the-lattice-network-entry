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
          className={`relative p-12 md:p-16 rounded-3xl border border-white/20 backdrop-blur-md transition-all duration-1000 delay-200 hover:border-white/30 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-700" />
          
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed mb-8 relative z-10 text-center">
            The Lattice is for young, analytical, systems-oriented minds who want to shape business with depth, foresight, and integrity.
          </p>
          
          <div className="flex items-center justify-center my-8">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
          
          <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed relative z-10 text-center italic">
            If you've ever felt like an outsider in noisy, ego-driven spaces — this is your place.
          </p>
          
          {/* Decorative corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg transition-all duration-500 group-hover:border-white/40" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg transition-all duration-500 group-hover:border-white/40" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg transition-all duration-500 group-hover:border-white/40" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg transition-all duration-500 group-hover:border-white/40" />
        </div>
      </div>
    </section>
  )
}