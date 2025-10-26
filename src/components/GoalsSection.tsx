"use client";

import { useEffect, useRef, useState } from 'react';

const goals = [
  {
    title: 'Belonging',
    description: 'A space where curious, analytical minds find genuine connection and shared purpose.'
  },
  {
    title: 'Recognition',
    description: 'Acknowledging excellence, depth, and integrity in thought and action.'
  },
  {
    title: 'Collaboration',
    description: 'Building together with clarity, intention, and mutual respect.'
  },
  {
    title: 'Growth',
    description: 'Continuous development through systems thinking and thoughtful discourse.'
  }
];

export default function GoalsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-light text-center mb-6 text-white transition-all duration-1000 tracking-tight ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Our Goals
        </h2>
        <p className={`text-center text-white/60 text-lg mb-20 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Four pillars that define our community and guide our collective journey
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {goals.map((goal, index) => (
            <div
              key={goal.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${
                hoveredIndex !== null && hoveredIndex !== index ? 'scale-95 opacity-60' : 'scale-100 opacity-100'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Multi-layer blue glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-blue-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute -inset-1 bg-blue-400/20 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="relative p-10 rounded-3xl border border-blue-400/15 bg-gradient-to-br from-blue-950/30 to-cyan-950/20 backdrop-blur-sm transition-all duration-700 hover:border-blue-400/40 hover:bg-blue-950/40 hover:shadow-2xl hover:shadow-blue-500/20 h-full">
                {/* Gradient overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200" />
                
                <h3 className="text-2xl md:text-3xl font-medium mb-5 text-white relative z-10 transition-all duration-300 group-hover:text-blue-100 group-hover:scale-105">
                  {goal.title}
                </h3>
                <p className="text-white/70 leading-relaxed relative z-10 text-base transition-all duration-300 group-hover:text-white/85">
                  {goal.description}
                </p>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl" />
                
                {/* Glowing ring */}
                <div className="absolute inset-0 rounded-3xl ring-2 ring-blue-500/0 group-hover:ring-blue-400/30 transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}