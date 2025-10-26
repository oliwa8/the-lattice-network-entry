"use client"

import { useEffect, useRef, useState } from 'react'

const concepts = [
  { label: 'Ideas', x: 50, y: 50 },
  { label: 'Collaboration', x: 250, y: 80 },
  { label: 'Integrity', x: 450, y: 50 },
  { label: 'Systems Thinking', x: 150, y: 200 },
  { label: 'Growth', x: 350, y: 200 },
]

export default function CommunityDiagram() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-light text-center mb-16 text-white transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          The Community
        </h2>
        
        <div className="group relative p-12 rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-950/40 to-cyan-950/30 backdrop-blur-md shadow-2xl shadow-blue-500/20 hover:border-blue-400/50 hover:shadow-blue-500/30 transition-all duration-700">
          {/* Multi-layer glow */}
          <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
          
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-cyan-500/5 to-blue-600/10 rounded-3xl opacity-60 group-hover:opacity-100 transition-all duration-700" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 rounded-3xl" />
          
          <div
            className={`relative w-full h-[300px] transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <svg className="w-full h-full" viewBox="0 0 500 250">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <g>
                {concepts.map((concept, i) =>
                  concepts.slice(i + 1).map((target, j) => (
                    <line
                      key={`${i}-${j}`}
                      x1={concept.x}
                      y1={concept.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="url(#lineGradient)"
                      strokeWidth="2.5"
                      className="transition-all duration-300"
                      filter="url(#glow)"
                      style={{
                        opacity:
                          activeNode === null ||
                          activeNode === i ||
                          activeNode === i + j + 1
                            ? 0.8
                            : 0.3,
                      }}
                    />
                  ))
                )}
                
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(96, 165, 250)" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="rgb(34, 211, 238)" stopOpacity="1" />
                  <stop offset="100%" stopColor="rgb(96, 165, 250)" stopOpacity="0.8" />
                </linearGradient>
              </g>

              {concepts.map((concept, i) => (
                <g
                  key={i}
                  onMouseEnter={() => setActiveNode(i)}
                  onMouseLeave={() => setActiveNode(null)}
                  className="cursor-pointer"
                >
                  {/* Outer glow circle */}
                  <circle
                    cx={concept.x}
                    cy={concept.y}
                    r={activeNode === i ? 22 : 18}
                    fill="rgb(59, 130, 246)"
                    opacity={activeNode === i ? 0.4 : 0.2}
                    className="transition-all duration-300"
                    filter="url(#glow)"
                  />
                  
                  {/* Middle glow */}
                  <circle
                    cx={concept.x}
                    cy={concept.y}
                    r={activeNode === i ? 14 : 11}
                    fill="rgb(96, 165, 250)"
                    opacity={activeNode === i ? 0.6 : 0.3}
                    className="transition-all duration-300"
                  />
                  
                  {/* Core node */}
                  <circle
                    cx={concept.x}
                    cy={concept.y}
                    r={activeNode === i ? 9 : 7}
                    fill="rgb(147, 197, 253)"
                    className="transition-all duration-300"
                    filter="url(#glow)"
                    style={{
                      opacity: activeNode === null || activeNode === i ? 1 : 0.7,
                    }}
                  />
                  
                  {/* Label background */}
                  <rect
                    x={concept.x - 65}
                    y={concept.y + 20}
                    width="130"
                    height="28"
                    fill="rgba(30, 58, 138, 0.8)"
                    rx="5"
                    className="transition-all duration-300"
                    filter="url(#glow)"
                    style={{
                      opacity: activeNode === null || activeNode === i ? 0.95 : 0.5,
                    }}
                  />
                  
                  {/* Label text */}
                  <text
                    x={concept.x}
                    y={concept.y + 36}
                    textAnchor="middle"
                    fill="rgb(191, 219, 254)"
                    fontSize="15"
                    fontWeight="500"
                    className="transition-all duration-300 select-none"
                    style={{
                      opacity: activeNode === null || activeNode === i ? 1 : 0.7,
                    }}
                  >
                    {concept.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}