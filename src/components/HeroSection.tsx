"use client"

import { useEffect, useState } from 'react'
import MagneticButton from '@/components/MagneticButton'
import WaveText from '@/components/WaveText'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 py-20">
      <div
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-6 md:mb-8 text-white px-4">
          <WaveText delay={300}>Welcome to The Lattice</WaveText>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/80 mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed px-4">
          Where <span className="text-white font-medium">analytical minds</span> converge to shape the future of business through <span className="text-white font-medium">depth, foresight, and unwavering integrity</span>.
        </p>
        
        <MagneticButton href="https://tally.so/r/3E9blL">
          Apply to Join
        </MagneticButton>
      </div>
    </section>
  )
}