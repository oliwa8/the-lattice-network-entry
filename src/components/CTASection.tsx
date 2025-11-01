"use client"

import { useEffect, useRef, useState } from 'react'
import MagneticButton from '@/components/MagneticButton'

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-12 md:mb-16 text-white leading-tight transition-all duration-1000 px-4 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Ready to transcend the ordinary?<br/>
          <span className="text-white/80">Join the minds redefining what's possible.</span>
        </h2>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <MagneticButton href="https://tally.so/r/3E9blL">
            Apply to Join
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}