"use client"

import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export default function TypewriterText({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = "",
  onComplete 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDelayed, setIsDelayed] = useState(true)

  useEffect(() => {
    // Handle initial delay
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsDelayed(false)
      }, delay)
      return () => clearTimeout(delayTimer)
    } else {
      setIsDelayed(false)
    }
  }, [delay])

  useEffect(() => {
    if (isDelayed) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (onComplete && currentIndex === text.length) {
      onComplete()
    }
  }, [currentIndex, text, speed, isDelayed, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-0.5 h-[0.9em] bg-white/70 ml-1 animate-pulse" />
      )}
    </span>
  )
}
