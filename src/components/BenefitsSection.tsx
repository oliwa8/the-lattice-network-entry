"use client"

import { useEffect, useRef, useState } from 'react'
import HolographicCard from '@/components/HolographicCard'
import BenefitsCanvas from '@/components/BenefitsCanvas'

const benefits = [
  {
    title: 'Elite Network',
    description: 'Connect with carefully curated peers who value depth, integrity, and systems-level thinking.',
    icon: '◆'
  },
  {
    title: 'Meaningful Collaboration',
    description: 'Work alongside ambitious builders on projects that create lasting impact.',
    icon: '◇'
  },
  {
    title: 'Continuous Growth',
    description: 'Access exclusive workshops, discussions, and resources designed for analytical minds.',
    icon: '◈'
  },
]

export default function BenefitsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      {/* Interactive Canvas Background */}
      <div className="absolute inset-0 opacity-40">
        <BenefitsCanvas />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-center mb-4 md:mb-6 text-white transition-all duration-1000 tracking-tight ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Why Join The Lattice?
        </h2>
        <p className={`text-center text-white/60 text-base md:text-lg mb-12 md:mb-20 max-w-2xl mx-auto transition-all duration-1000 delay-100 px-4 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          What you gain by becoming part of this community
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${hoveredIndex !== null && hoveredIndex !== index ? 'md:scale-95 md:opacity-70' : 'scale-100 opacity-100'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <HolographicCard>
                <div className="group relative h-full">
                  <div className="relative p-8 md:p-12 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 hover:border-white/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/20 h-full overflow-hidden md:group-hover:-translate-y-2">
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="text-white/60 mb-6 transition-all duration-500 group-hover:text-white text-center text-4xl md:text-5xl">
                      {benefit.icon}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 text-white relative z-10 transition-all duration-300 md:group-hover:scale-105 text-center">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed relative z-10 text-sm md:text-base lg:text-lg text-center">
                      {benefit.description}
                    </p>
                    
                    <div className="hidden md:block absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-white/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-2xl md:rounded-b-3xl" />
                  </div>
                </div>
              </HolographicCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}