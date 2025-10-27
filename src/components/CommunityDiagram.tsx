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
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-light text-center mb-16 text-white transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          The Community
        </h2>
        <div
          className={`relative w-full h-[300px] bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm p-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <svg className="w-full h-full" viewBox="0 0 500 250">
            {/* Draw connections */}
            <g className="opacity-50">
              {concepts.map((concept, i) =>
                concepts.slice(i + 1).map((target, j) => (
                  <line
                    key={`${i}-${j}`}
                    x1={concept.x}
                    y1={concept.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="white"
                    strokeWidth="1.5"
                    className="transition-opacity duration-300"
                    style={{
                      opacity:
                        activeNode === null ||
                        activeNode === i ||
                        activeNode === i + j + 1
                          ? 0.6
                          : 0.2,
                    }}
                  />
                ))
              )}
            </g>

            {/* Draw nodes */}
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
                  r={activeNode === i ? 10 : 8}
                  fill="white"
                  className="transition-all duration-300"
                  style={{
                    opacity: activeNode === null || activeNode === i ? 1 : 0.5,
                  }}
                />
                <text
                  x={concept.x}
                  y={concept.y + 30}
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="400"
                  className="transition-all duration-300 select-none"
                  style={{
                    opacity: activeNode === null || activeNode === i ? 1 : 0.6,
                  }}
                >
                  {concept.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}