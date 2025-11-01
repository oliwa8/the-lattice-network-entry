"use client";

import { useEffect, useRef, useState } from 'react';
import TiltCard from '@/components/TiltCard';

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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-6 pt-24 md:pt-32">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          <TiltCard maxTilt={8}>
            <div className="relative p-6 md:p-10 lg:p-16 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="space-y-8 md:space-y-12 text-center">
                <div className="space-y-4 md:space-y-6">
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                    We built The Lattice for those who <span className="text-white font-medium">think in systems</span> — visionaries who see patterns where others see chaos, and <span className="text-white font-medium">meaning in complexity</span>.
                  </p>
                  
                  <p className="text-base md:text-lg lg:text-xl font-light text-white/70 leading-relaxed">
                    Our mission: forge a sanctuary where <span className="text-white/90 font-medium">rigor meets intuition</span>, integrity transcends ego, and foresight shapes the future of collaboration.
                  </p>
                </div>

                <div className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />

                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white tracking-tight">
                    Who Belongs Here?
                  </h3>
                  
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                    <span className="text-white font-medium">The architects of tomorrow</span> — young minds who wield analysis as their sword and integrity as their shield
                  </p>
                  
                  <p className="text-base md:text-lg lg:text-xl font-light text-white/80 leading-relaxed italic pt-4">
                    If conventional networking feels hollow and surface-level thinking makes you restless —{' '}
                    <span className="text-white not-italic font-medium">you've found your tribe.</span>
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>);

}