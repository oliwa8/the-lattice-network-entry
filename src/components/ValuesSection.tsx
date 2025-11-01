"use client";

import { useEffect, useRef, useState } from 'react';

const values = [
'Excellence',
'Integrity',
'Curiosity',
'Humility',
'Vision',
'Generosity',
'Precision',
'Adaptability',
'Innovation',
'Systems Thinking'];


export default function ValuesSection() {
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
    <section ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-center mb-4 md:mb-6 text-white transition-all duration-1000 tracking-tight ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          Our DNA
        </h2>
        <p className={`text-center text-white/60 text-base md:text-lg mb-12 md:mb-20 max-w-2xl mx-auto transition-all duration-1000 delay-100 px-4 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
        }>
          Ten principles that define how we think, build, and shape the future
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {values.map((value, index) =>
          <div
            key={value}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${
            hoveredIndex !== null && hoveredIndex !== index ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}`}
            style={{ transitionDelay: `${index * 80}ms` }}>
              <div className="absolute -inset-2 bg-gradient-to-br from-white/30 to-white/10 rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute -inset-1 bg-white/20 rounded-xl md:rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="relative p-5 md:p-7 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-600 hover:border-white/40 hover:bg-white/15 hover:shadow-xl hover:shadow-white/20 h-full flex items-center justify-center min-h-[80px] md:min-h-[100px]">
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-600" />
                
                <div className="absolute inset-0 rounded-xl md:rounded-2xl ring-2 ring-white/0 group-hover:ring-white/30 transition-all duration-600" />
                
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-white/10 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                <p className="text-center text-white font-light text-xs sm:text-sm md:text-base lg:text-lg relative z-10 transition-all duration-300 group-hover:font-medium group-hover:tracking-wide group-hover:scale-110">
                  {value}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}