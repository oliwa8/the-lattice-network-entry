"use client"

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalHeight) * 100
      setProgress(currentProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-[200]">
        <div
          className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent to-white/50 blur-xl"
          style={{ 
            left: `${progress}%`, 
            transform: 'translateX(-50%)',
            transition: 'left 0.15s ease-out'
          }}
        />
      </div>

      {/* Side indicator with nodes */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[200] hidden lg:flex flex-col gap-3">
        {[0, 20, 40, 60, 80, 100].map((point, i) => (
          <div key={i} className="relative group">
            <div 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                progress >= point 
                  ? 'bg-white scale-150 shadow-lg shadow-white/50' 
                  : 'bg-white/20 scale-100'
              }`}
            />
            {progress >= point && (
              <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
            )}
          </div>
        ))}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-white/10 -z-10"
        />
      </div>

      {/* Scroll percentage indicator */}
      <div className="fixed bottom-8 right-8 z-[200] hidden md:block">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </>
  )
}
