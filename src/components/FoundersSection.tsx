"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const founders = [
  {
    name: "Oliwier Zaluski",
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/profile_picture-1761525008279.jpg',
    bio: "Systems thinker and builder focused on creating meaningful connections within business communities.",
    linkedin: "https://www.linkedin.com/in/ozaluski/"
  },
  {
    name: "Aleks Nitecki",
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/prof-1761525012505.png',
    bio: "Analytical mind passionate about fostering depth, integrity, and collaborative growth.",
    linkedin: "https://www.linkedin.com/in/anitecki/"
  }
]

export default function FoundersSection() {
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
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-light text-center mb-16 text-white transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Founders
        </h2>
        <div className="grid md:grid-cols-2 gap-16 md:gap-20">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className={`text-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-2 border-white/20 transition-all duration-700 hover:border-white/40 hover:scale-105 hover:shadow-xl hover:shadow-white/20">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-white">{founder.name}</h3>
              <p className="text-white/80 leading-relaxed max-w-md mx-auto mb-6">
                {founder.bio}
              </p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 text-sm hover:scale-105"
              >
                Read more
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          ))}
        </div>
        <p
          className={`text-center text-white/70 mt-16 max-w-2xl mx-auto transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Together, they're building a community where thinkers, builders, and leaders can grow with depth and humility.
        </p>
      </div>
    </section>
  )
}