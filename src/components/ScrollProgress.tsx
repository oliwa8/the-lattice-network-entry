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
      {/* Minimal top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-white/5 z-[200]">
        <div
          className="h-full bg-white/40 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Refined side indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[200] hidden lg:flex flex-col gap-4">
        {[0, 25, 50, 75, 100].map((point, i) => (
          <div key={i} className="relative">
            <div 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                progress >= point 
                  ? 'bg-white/60 scale-125' 
                  : 'bg-white/15 scale-100'
              }`}
            />
          </div>
        ))}
        <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-white/8 -z-10" />
      </div>
    </>
  )
}