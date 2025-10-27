"use client"

import { useEffect, useRef, useState } from 'react'

interface SectionTransitionProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'diagonal-left' | 'diagonal-right'
  delay?: number
}

export default function SectionTransition({
  children,
  direction = 'diagonal-right',
  delay = 0,
}: SectionTransitionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [delay])

  const getTransitionClasses = () => {
    const base = 'transition-all duration-1000 ease-out'
    
    if (!isVisible) {
      switch (direction) {
        case 'left':
          return `${base} opacity-0 -translate-x-16`
        case 'right':
          return `${base} opacity-0 translate-x-16`
        case 'diagonal-left':
          return `${base} opacity-0 -translate-x-12 translate-y-12`
        case 'diagonal-right':
          return `${base} opacity-0 translate-x-12 translate-y-12`
        default:
          return `${base} opacity-0 translate-y-12`
      }
    }
    
    return `${base} opacity-100 translate-x-0 translate-y-0`
  }

  return (
    <div ref={sectionRef} className={getTransitionClasses()}>
      {children}
    </div>
  )
}
