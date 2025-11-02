'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface TextScrambleProps {
  text: string
  className?: string
  delay?: number
  onScramble?: () => void
}

export default function TextScramble({ text, className = '', delay = 0, onScramble }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('')
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    let iteration = 0

    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        // Play sound effect on each scramble iteration
        if (onScramble && iteration % 2 === 0) {
          onScramble()
        }

        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < iteration) return text[index]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('')
        )

        iteration += 1 / 3

        if (iteration >= text.length) {
          clearInterval(interval)
          setDisplayText(text)
        }
      }, 30)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startDelay)
  }, [text, isInView, delay, onScramble])

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  )
}