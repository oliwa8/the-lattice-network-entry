"use client"

import { useEffect, useRef, useState } from 'react'
import TiltCard from '@/components/TiltCard'

const benefits = [
  {
    title: 'Elite Network',
    description: 'Access an exclusive circle of exceptional thinkers, builders, and visionaries who operate at the intersection of analysis and action.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    icon: '🌐'
  },
  {
    title: 'Systems Mastery',
    description: 'Master the frameworks and mental models that transform complexity into clarity, chaos into strategic advantage.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    icon: '🧠'
  },
  {
    title: 'Exponential Growth',
    description: 'Accelerate your trajectory through curated resources, mentorship from industry leaders, and opportunities designed for outliers.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    icon: '📈'
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
    <section ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-center mb-4 md:mb-6 text-white transition-all duration-1000 tracking-tight ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          What Awaits You
        </h2>
        <p className={`text-center text-white/60 text-base md:text-lg mb-12 md:mb-20 max-w-2xl mx-auto transition-all duration-1000 delay-100 px-4 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Transform potential into impact through exclusive access and unparalleled resources
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${hoveredIndex !== null && hoveredIndex !== index ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <TiltCard maxTilt={10}>
                <div className="group relative h-full">
                  <div className="relative p-8 md:p-12 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 hover:border-white/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/20 h-full overflow-hidden group-hover:-translate-y-2">
                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="text-5xl mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                      {benefit.icon}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-medium mb-4 md:mb-6 text-white relative z-10 transition-all duration-300 group-hover:scale-105">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed relative z-10 text-sm md:text-base lg:text-lg">
                      {benefit.description}
                    </p>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-white/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-2xl md:rounded-b-3xl" />
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}