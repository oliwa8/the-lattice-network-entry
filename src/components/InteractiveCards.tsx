'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useAudio } from '@/components/AudioManager'

interface CardProps {
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
}

function Card({ title, description, icon, delay = 0 }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { playHover, playFlip } = useAudio()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
  }

  const handleMouseEnter = () => {
    playHover()
    playFlip()
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 cursor-pointer transition-all duration-300 group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Holographic effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
        <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-white/70 text-sm">{description}</p>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-300 -z-10" />
      
      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/20 group-hover:border-white/50 transition-all duration-300 group-hover:w-6 group-hover:h-6" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/20 group-hover:border-white/50 transition-all duration-300 group-hover:w-6 group-hover:h-6" />
    </motion.div>
  )
}

export default function InteractiveCards() {
  const cards = [
    {
      title: 'Depth',
      description: 'Dive beneath surface-level thinking into systems and structures',
      icon: '🔬',
    },
    {
      title: 'Foresight',
      description: 'Anticipate patterns and build for what comes next',
      icon: '🔮',
    },
    {
      title: 'Integrity',
      description: 'Build with honesty, clarity, and long-term thinking',
      icon: '⚖️',
    },
    {
      title: 'Collaboration',
      description: 'Connect with minds that challenge and elevate yours',
      icon: '🤝',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 py-20">
      {cards.map((card, index) => (
        <Card key={card.title} {...card} delay={index * 0.1} />
      ))}
    </div>
  )
}