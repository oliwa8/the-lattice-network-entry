"use client"

import { useEffect, useRef, useState } from 'react'
import { useAudio } from '@/components/AudioManager'
import Image from 'next/image'

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
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <a
            href="mailto:thelatticeorg@gmail.com"
            onMouseEnter={playHover}
            className="text-white/70 hover:text-white transition-all duration-400 text-sm md:text-base hover:scale-105 order-2 sm:order-1"
          >
            thelatticeorg@gmail.com
          </a>
          
          <a
            href="https://www.linkedin.com/company/the-lattice-network"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            className="transition-all duration-400 hover:scale-110 hover:opacity-80 order-1 sm:order-2"
            aria-label="Visit our LinkedIn page"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 relative">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/4da6d1c5-c3d4-45cf-9d42-c4a668df18e5/generated_images/linkedin-logo-icon-simple-monochrome-whi-20216aa7-20251104194519.jpg"
                alt="LinkedIn"
                fill
                className="object-contain filter brightness-90 hover:brightness-100 transition-all"
              />
            </div>
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