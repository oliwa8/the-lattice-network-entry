"use client"

import { useEffect, useRef, useState } from 'react'

export default function CursorInteraction() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorGlowRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const cursor = cursorRef.current
    const cursorGlow = cursorGlowRef.current
    if (!cursor || !cursorGlow) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let glowX = 0
    let glowY = 0
    let animationFrameId: number

    const updateCursor = () => {
      // Smooth cursor movement with easing
      const ease = 0.15
      cursorX += (mouseX - cursorX) * ease
      cursorY += (mouseY - cursorY) * ease
      
      // Slower glow movement for trailing effect
      const glowEase = 0.08
      glowX += (mouseX - glowX) * glowEase
      glowY += (mouseY - glowY) * glowEase

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
      cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`

      animationFrameId = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')

      setIsPointer(!!isInteractive)

      // Magnetic pull effect on interactive elements
      if (isInteractive) {
        const element = target.tagName === 'BUTTON' || target.tagName === 'A' ? target : (target.closest('button') || target.closest('a'))
        if (element) {
          const rect = element.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const distance = Math.sqrt(
            Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
          )

          // Pull cursor towards center if within range
          if (distance < 100) {
            const pullStrength = (100 - distance) / 100 * 0.3
            mouseX += (centerX - mouseX) * pullStrength
            mouseY += (centerY - mouseY) * pullStrength
          }
        }
      }
    }

    updateCursor()
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (!isMounted) return null

  return (
    <>
      {/* Glow effect */}
      <div
        ref={cursorGlowRef}
        className={`hidden md:block fixed w-8 h-8 pointer-events-none z-[9999] transition-all duration-300 ${
          isPointer ? 'scale-150 opacity-30' : 'scale-100 opacity-20'
        }`}
        style={{
          left: '-16px',
          top: '-16px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`hidden md:block fixed w-3 h-3 pointer-events-none z-[9999] rounded-full border border-white/60 transition-all duration-200 ${
          isPointer ? 'scale-150 border-white bg-white/20' : 'scale-100 bg-white/40'
        }`}
        style={{
          left: '-6px',
          top: '-6px',
        }}
      />
    </>
  )
}