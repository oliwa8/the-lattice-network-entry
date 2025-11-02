"use client"

import { useEffect, useState, useRef } from 'react'
import MagneticButton from '@/components/MagneticButton'
import ParallaxText from '@/components/ParallaxText'
import CursorGlow from '@/components/CursorGlow'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, 1 - (rect.bottom / window.innerHeight)))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 md:px-6 py-20"
    >
      <CursorGlow />
      
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Title with Parallax and Scroll Effects */}
        <ParallaxText speed={-0.2}>
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight mb-8 md:mb-12 text-white transition-all duration-700"
            style={{
              opacity: Math.max(0.3, 1 - scrollProgress * 1.5),
              transform: `scale(${1 - scrollProgress * 0.1})`,
              filter: `blur(${scrollProgress * 8}px)`,
            }}
          >
            <span className="block">Welcome to</span>
            <span 
              className="block font-normal bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-gradient"
              style={{
                backgroundSize: '200% auto',
              }}
            >
              The Lattice
            </span>
          </h1>
        </ParallaxText>

        {/* Subtitle with Different Parallax Speed */}
        <ParallaxText speed={0.1}>
          <p 
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-16 md:mb-20 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '200ms',
              opacity: Math.max(0, 1 - scrollProgress * 2),
            }}
          >
            Where{' '}
            <span className="text-white font-medium relative inline-block">
              analytical minds
              <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </span>{' '}
            converge to architect the future through{' '}
            <span className="text-white font-medium relative inline-block">
              systems thinking
              <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </span>
            , depth, and unwavering integrity.
          </p>
        </ParallaxText>
        
        {/* CTA Button */}
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '400ms',
            opacity: Math.max(0, 1 - scrollProgress * 2.5),
          }}
        >
          <MagneticButton href="https://tally.so/r/3E9blL">
            Apply to Join
          </MagneticButton>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-500"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 3),
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/40 text-sm font-light tracking-wider">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}