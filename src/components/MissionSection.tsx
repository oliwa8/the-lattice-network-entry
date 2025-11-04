"use client";

import { useEffect, useRef, useState } from 'react';
import ParticleCanvas from '@/components/ParticleCanvas';

export default function MissionSection() {
  const [isVisible, setIsVisible] = useState(false);
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-center mb-8 md:mb-12 text-white transition-all duration-1000 tracking-tight ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Who is The Lattice for?
        </h2>
        
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-white/90 text-center mb-8 px-4">
            We built The Lattice for those who think in systems - the quiet, curious architects who seek structure in complexity and meaning in connection.
          </p>
          <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-white/80 text-center mb-8 px-4">
            Our mission is to forge a space where <span className="text-white font-medium">rigor, integrity, and foresight</span> define the architects of tomorrow.
          </p>
          <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-white/80 text-center px-4 mb-12">
            Designed for students and early professionals aged 16-30, The Lattice is a refuge from ego-driven spaces. A place where integrity replaces performance, and systems thinkers can grow with depth and purpose.
          </p>
        </div>
        
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <ParticleCanvas />
        </div>
      </div>
    </section>
  );
}