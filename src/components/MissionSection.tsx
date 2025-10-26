"use client"

import { useEffect, useRef, useState } from 'react'

export default function MissionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
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
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const parallaxOffset = (scrollY - 600) * 0.3

  return (
    <section ref={sectionRef} className="relative py-20 px-6">
      <div
        className="max-w-4xl mx-auto text-center transition-all duration-1000 delay-200"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? parallaxOffset : 8}px)`
        }}
      >
        <div className="mb-16 flex items-center justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
        
        <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed mb-8">
          We built The Lattice for those who think differently — the quiet, curious builders who seek structure in complexity and meaning in systems.
        </p>
        
        <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed">
          Our mission is to create a space where rigor, integrity, and foresight define the next generation of collaboration and leadership.
        </p>
        
        <div className="mt-20 flex items-center justify-center gap-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-white/30" />
          <div className="w-2 h-2 rounded-full bg-white/40" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent via-white/30 to-white/30" />
        </div>
      </div>
    </section>
  )
}