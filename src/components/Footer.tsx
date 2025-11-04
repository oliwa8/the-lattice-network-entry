"use client"

import { useEffect, useRef, useState } from 'react'
import { useAudio } from '@/components/AudioManager'

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)
  const { playHover } = useAudio()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative py-12 md:py-16 px-4 md:px-6 border-t border-white/10"
    >
      <div
        className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-4 mb-6 md:mb-8">
          <a
            href="mailto:thelatticeorg@gmail.com"
            onMouseEnter={playHover}
            className="text-white/70 hover:text-white transition-colors duration-400 text-sm md:text-base hover:scale-105"
          >
            thelatticeorg@gmail.com
          </a>
        </div>
        <div className="text-center px-4">
          <p className="text-xs md:text-sm text-white/50 italic font-light">
            "Truth emerges from clarity, not noise."
          </p>
        </div>
      </div>
    </footer>
  )
}