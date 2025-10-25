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
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const elementTop = rect.top
        const elementHeight = rect.height
        const windowHeight = window.innerHeight
        
        if (elementTop < windowHeight && elementTop > -elementHeight) {
          setScrollY((windowHeight - elementTop) * 0.15)
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-40 px-6">
      <div
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transform: `translateY(${scrollY}px)` }}
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