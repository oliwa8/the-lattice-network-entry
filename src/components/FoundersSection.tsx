"use client";

import { useEffect, useState } from 'react';
import { useAudio } from '@/components/AudioManager';

const founders = [
  {
    name: 'Alex Chen',
    role: 'Co-Founder',
    background: 'Systems architect with a passion for behavioral economics and networked intelligence.',
    why: 'Built The Lattice to create a space where analytical minds can connect without the noise of status games.'
  },
  {
    name: 'Jordan Park',
    role: 'Co-Founder',
    background: 'Strategic thinker focused on organizational design and the intersection of technology and human systems.',
    why: 'Co-founded The Lattice to help the next generation of leaders think deeply, act with integrity, and build sustainably.'
  }
];

export default function FoundersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { playHover } = useAudio();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('founders-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const handleHover = (index: number) => {
    setHoveredIndex(index);
    playHover();
  };

  return (
    <section id="founders-section" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-center mb-6 md:mb-8 text-white tracking-tight transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          The Founders
        </h2>
        
        <p className={`text-center text-white/60 text-base md:text-lg mb-12 md:mb-20 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Together, they're building a community where thinkers, builders, and leaders can grow with depth and humility
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {founders.map((founder, index) => (
            <div
              key={index}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative transition-all duration-700 delay-${(index + 2) * 100} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Card with micro-interactions */}
              <div className={`relative p-8 md:p-10 bg-white/5 rounded-2xl md:rounded-3xl border border-white/15 backdrop-blur-md transition-all duration-500 ${
                hoveredIndex === index 
                  ? 'bg-white/10 border-white/30 scale-[1.02] shadow-2xl shadow-white/10' 
                  : 'hover:bg-white/8 hover:border-white/20'
              }`}>
                {/* Animated corner accents */}
                <div className={`absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20 rounded-tl-2xl transition-all duration-500 ${
                  hoveredIndex === index ? 'border-white/50 w-16 h-16' : ''
                }`} />
                <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20 rounded-br-2xl transition-all duration-500 ${
                  hoveredIndex === index ? 'border-white/50 w-16 h-16' : ''
                }`} />

                {/* Profile avatar placeholder with animation */}
                <div className={`relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border-2 border-white/20 transition-all duration-500 ${
                  hoveredIndex === index ? 'scale-110 border-white/40 shadow-lg shadow-white/20' : ''
                }`}>
                  <span className="text-2xl md:text-3xl font-light text-white/60 transition-all duration-500 group-hover:text-white/90">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </span>
                  
                  {/* Rotating ring on hover */}
                  <div className={`absolute inset-0 rounded-full border-2 border-dashed border-white/10 transition-all duration-700 ${
                    hoveredIndex === index ? 'animate-spin-slow opacity-100' : 'opacity-0'
                  }`} style={{ animationDuration: '8s' }} />
                </div>

                <h3 className={`text-2xl md:text-3xl font-light text-white mb-2 text-center transition-all duration-500 ${
                  hoveredIndex === index ? 'scale-105' : ''
                }`}>
                  {founder.name}
                </h3>
                
                <p className="text-white/50 text-sm md:text-base mb-6 text-center font-light">
                  {founder.role}
                </p>

                <div className="space-y-4">
                  <p className={`text-white/70 text-sm md:text-base leading-relaxed transition-all duration-500 ${
                    hoveredIndex === index ? 'text-white/90' : ''
                  }`}>
                    {founder.background}
                  </p>
                  
                  <div className={`pt-4 border-t border-white/10 transition-all duration-500 ${
                    hoveredIndex === index ? 'border-white/20' : ''
                  }`}>
                    <p className={`text-white/60 text-sm md:text-base leading-relaxed italic transition-all duration-500 ${
                      hoveredIndex === index ? 'text-white/80 translate-x-1' : ''
                    }`}>
                      {founder.why}
                    </p>
                  </div>
                </div>

                {/* Floating particles on hover */}
                {hoveredIndex === index && (
                  <>
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-float-up" />
                    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-float-up animation-delay-200" />
                    <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-float-up animation-delay-400" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-40px) scale(0);
            opacity: 0;
          }
        }

        .animate-float-up {
          animation: float-up 2s ease-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}