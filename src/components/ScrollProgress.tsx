"use client"

import { useEffect, useState, useRef } from 'react'
import { useAudio } from '@/components/AudioManager'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const lastMilestone = useRef(0)
  const { playScroll } = useAudio()

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalHeight) * 100
      setProgress(currentProgress)

      // Play subtle sound at milestones (every 10%)
      const currentMilestone = Math.floor(currentProgress / 10)
      if (currentMilestone > lastMilestone.current) {
        playScroll()
        lastMilestone.current = currentMilestone
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [playScroll])

  return (
    <>
      {/* Minimal top progress bar with gradient */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-white/5 z-[200]">
        <div
          className="h-full bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-pink-500/60 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Refined side indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[200] hidden lg:flex flex-col gap-4">
        {[0, 25, 50, 75, 100].map((point, i) => (
          <div key={i} className="relative group">
            <div 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                progress >= point 
                  ? 'bg-white/60 scale-125 shadow-lg shadow-white/50' 
                  : 'bg-white/15 scale-100'
              }`}
            />
            {progress >= point && (
              <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
            )}
          </div>
        ))}
        <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-white/8 via-white/15 to-white/8 -z-10" />
      </div>
    </>
  )
}