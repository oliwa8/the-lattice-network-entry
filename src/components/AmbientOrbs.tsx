"use client"

import { useEffect, useState } from 'react'

export default function AmbientOrbs() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Large ambient orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(100, 150, 255, 0.4) 0%, rgba(100, 150, 255, 0) 70%)',
          animation: 'float 20s ease-in-out infinite, ambient-glow 8s ease-in-out infinite'
        }}
      />
      
      <div 
        className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(150, 100, 255, 0.3) 0%, rgba(150, 100, 255, 0) 70%)',
          animation: 'float 25s ease-in-out infinite reverse, ambient-glow 10s ease-in-out infinite 2s'
        }}
      />
      
      <div 
        className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(100, 200, 255, 0.3) 0%, rgba(100, 200, 255, 0) 70%)',
          animation: 'float 30s ease-in-out infinite, ambient-glow 12s ease-in-out infinite 4s'
        }}
      />
    </div>
  )
}
