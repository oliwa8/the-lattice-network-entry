"use client"

import { useEffect, useRef, useState } from 'react'

const values = [
  'Merit',
  'Integrity',
  'Curiosity',
  'Humility',
  'Courage',
  'Generosity',
  'Discipline',
  'Openness',
  'Excellence',
  'Systems Thinking',
]

export default function ValuesSection() {
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
    <section ref={sectionRef} className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-light text-center mb-6 text-white transition-all duration-1000 tracking-tight ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Our Values
        </h2>
        <p className={`text-center text-white/60 text-lg mb-20 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Ten principles that shape how we think, act, and build together
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((value, index) => (
            <div
              key={value}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${hoveredIndex !== null && hoveredIndex !== index ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Multi-layer blue glow */}
              <div className="absolute -inset-3 bg-gradient-to-br from-blue-500/40 via-cyan-500/30 to-blue-500/40 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute -inset-2 bg-blue-400/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-400" />
              
              <div className="relative p-7 rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-950/40 to-cyan-950/30 backdrop-blur-sm transition-all duration-600 hover:border-blue-400/50 hover:bg-blue-950/50 hover:shadow-xl hover:shadow-blue-500/30 h-full flex items-center justify-center">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-600" />
                
                {/* Glowing ring */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 group-hover:ring-blue-400/40 transition-all duration-600" />
                
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-2xl bg-blue-500/10 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                {/* Shimmer sweep */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <p className="text-center text-white font-light text-sm md:text-base lg:text-lg relative z-10 transition-all duration-300 group-hover:font-medium group-hover:tracking-wide group-hover:text-blue-100 group-hover:scale-105">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}