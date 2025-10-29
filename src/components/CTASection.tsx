"use client"

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

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
          Join the network redefining how thoughtful people connect and build.
        </h2>

        <div
          className={`relative inline-block group transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-all duration-700 animate-pulse" />
          <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/30 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-all duration-500" />
          
          <div className="absolute -inset-3 border border-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
          
          <Button
            size="lg"
            className="relative bg-white text-[#0a1b2f] hover:bg-white font-medium px-10 sm:px-12 md:px-16 py-6 sm:py-7 md:py-8 text-base sm:text-lg md:text-xl rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/40 overflow-hidden"
            asChild
          >
            <a href="https://tally.so/r/3E9blL" target="_blank" rel="noopener noreferrer">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center gap-2 md:gap-3">
                Apply to Join
                <svg 
                  className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}