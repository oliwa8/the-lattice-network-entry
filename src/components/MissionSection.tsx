"use client";

import { useEffect, useRef, useState } from 'react';

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
          className={`relative p-6 md:p-10 lg:p-16 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>

          <div className="space-y-8 md:space-y-12 text-center">
            <div className="space-y-4 md:space-y-6">
              <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                We built The Lattice for those who <span className="text-white font-medium">think differently</span> - the quiet, curious builders who seek <span className="text-white font-medium">structure in complexity</span> and <span className="text-white font-medium">meaning in systems</span>.
              </p>
              
              <p className="text-base md:text-lg lg:text-xl font-light text-white/70 leading-relaxed">
                Our mission is to create a space where <span className="text-white/90 font-medium">rigor, integrity, and foresight</span> define the next generation of collaboration and leadership.
              </p>
            </div>

            <div className="h-px w-24 md:w-32 bg-white/20 mx-auto" />

            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white tracking-tight">
                Who is The Lattice for?
              </h3>
              
              <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                The Lattice is for <span className="text-white font-medium">young, analytical, systems-oriented minds</span>
              </p>
              
              <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                who want to shape business with <span className="text-white font-medium">depth, foresight, and integrity</span>
              </p>
              
              <p className="text-base md:text-lg lg:text-xl font-light text-white/80 leading-relaxed italic pt-4 !whitespace-pre-line">If you've ever felt like an outsider in noisy, ego-driven spaces - 
                <span className="text-white not-italic font-medium">this is your place.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}