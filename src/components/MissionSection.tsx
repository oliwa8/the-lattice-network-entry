"use client";

import { useEffect, useRef, useState } from 'react';
import InteractiveConstellation from '@/components/InteractiveConstellation';

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
        <div className="mb-12 md:mb-16">
          <InteractiveConstellation />
        </div>
        
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white/90 text-center mb-8 px-4">
            We built The Lattice for those who <span className="text-white font-medium">think in systems</span> — the quiet, curious architects who seek <span className="text-white font-medium">structure in complexity</span> and <span className="text-white font-medium">meaning in connections</span>.
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/80 text-center px-4">
            Our mission is to forge a space where <span className="text-white font-medium">rigor, integrity, and foresight</span> define the architects of tomorrow.
          </p>
        </div>
        
        <div
          className={`mt-12 md:mt-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />
      </div>
    </section>
  );
}