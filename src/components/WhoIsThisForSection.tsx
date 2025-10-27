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
      <div
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mb-12 flex items-center justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-10 text-white tracking-tight">
          Who is The Lattice for?
        </h2>
        
        <p className="text-xl md:text-2xl font-light text-white/85 leading-relaxed">
          The Lattice is for young, analytical, systems-oriented minds who want to shape business with depth, foresight, and integrity. If you've ever felt like an outsider in noisy, ego-driven spaces — this is your place.
        </p>
        
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-white/30" />
          <div className="w-2 h-2 rounded-full bg-white/40" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent via-white/30 to-white/30" />
        </div>
      </div>
    </section>
  )
}
