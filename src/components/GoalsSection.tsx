"use client"

import { useEffect, useRef, useState } from 'react'

const goals = [
  {
    title: 'Belonging',
    description: 'A space where curious, analytical minds find genuine connection and shared purpose.',
  },
  {
    title: 'Recognition',
    description: 'Acknowledging excellence, depth, and integrity in thought and action.',
  },
  {
    title: 'Collaboration',
    description: 'Building together with clarity, intention, and mutual respect.',
  },
  {
    title: 'Growth',
    description: 'Continuous development through systems thinking and thoughtful discourse.',
  },
]

export default function GoalsSection() {
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
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-light text-center mb-6 text-white transition-all duration-1000 tracking-tight ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Our Goals
        </h2>
        <p className={`text-center text-white/60 text-lg mb-20 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Four pillars that define our community and guide our collective journey
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {goals.map((goal, index) => (
            <div
              key={goal.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${hoveredIndex !== null && hoveredIndex !== index ? 'scale-95 opacity-60' : 'scale-100 opacity-100'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 hover:border-white/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10 h-full">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <h3 className="text-2xl md:text-3xl font-medium mb-5 text-white relative z-10 transition-colors duration-300">
                  {goal.title}
                </h3>
                <p className="text-white/70 leading-relaxed relative z-10 text-base">
                  {goal.description}
                </p>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}