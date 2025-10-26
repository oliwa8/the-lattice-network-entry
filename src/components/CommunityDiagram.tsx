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
        
        <div className="relative p-12 rounded-3xl border border-white/30 backdrop-blur-md shadow-2xl shadow-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-white/10 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-700" />
          
          <div
            className={`relative w-full h-[300px] transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <svg className="w-full h-full" viewBox="0 0 500 250">
              <g>
                {concepts.map((concept, i) =>
                  concepts.slice(i + 1).map((target, j) => (
                    <line
                      key={`${i}-${j}`}
                      x1={concept.x}
                      y1={concept.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="white"
                      strokeWidth="2.5"
                      className="transition-opacity duration-300"
                      style={{
                        opacity:
                          activeNode === null ||
                          activeNode === i ||
                          activeNode === i + j + 1
                            ? 0.7
                            : 0.25,
                      }}
                    />
                  ))
                )}
              </g>

              {concepts.map((concept, i) => (
                <g
                  key={i}
                  onMouseEnter={() => setActiveNode(i)}
                  onMouseLeave={() => setActiveNode(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={concept.x}
                    cy={concept.y}
                    r={activeNode === i ? 18 : 14}
                    fill="white"
                    opacity={activeNode === i ? 0.3 : 0.15}
                    className="transition-all duration-300"
                  />
                  
                  <circle
                    cx={concept.x}
                    cy={concept.y}
                    r={activeNode === i ? 9 : 7}
                    fill="white"
                    className="transition-all duration-300"
                    style={{
                      opacity: activeNode === null || activeNode === i ? 1 : 0.6,
                    }}
                  />
                  
                  <rect
                    x={concept.x - 65}
                    y={concept.y + 20}
                    width="130"
                    height="28"
                    fill="rgba(255, 255, 255, 0.2)"
                    rx="5"
                    className="transition-opacity duration-300"
                    style={{
                      opacity: activeNode === null || activeNode === i ? 0.9 : 0.4,
                    }}
                  />
                  
                  <text
                    x={concept.x}
                    y={concept.y + 36}
                    textAnchor="middle"
                    fill="white"
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