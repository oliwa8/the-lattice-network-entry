"use client";

import { useEffect, useRef, useState } from 'react';

const values = [
'Curiosity',
'Humility',
'Rigor',
'Courage',
'Generosity',
'Discipline',
'Openness',
'Excellence',
'Systems Thinking',
'Integrity'];


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
          Our Values
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-12 md:mt-16">
          {values.map((value, index) =>
          <div
            key={value}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${
            hoveredIndex !== null && hoveredIndex !== index ? 'md:scale-90 md:opacity-50' : 'scale-100 opacity-100'}`}
            style={{ transitionDelay: `${index * 80}ms` }}>
              {/* Animated glow orbs */}
              <div className="hidden md:block absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 left-0 w-20 h-20 bg-blue-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }} />
                <div className="absolute top-1/2 right-0 w-16 h-16 bg-cyan-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '3s' }} />
              </div>
              
              {/* Outer glow rings */}
              <div className="hidden md:block absolute -inset-2 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700">
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-cyan-400/20 blur-xl animate-pulse" />
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-tr from-white/20 to-white/5 blur-md" />
              </div>
              
              <div className="relative p-5 md:p-7 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-600 hover:border-white/40 hover:bg-white/15 hover:shadow-2xl hover:shadow-white/30 h-full flex items-center justify-center min-h-[80px] md:min-h-[100px] overflow-hidden">
                {/* Animated background gradient */}
                <div className="hidden md:block absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/20 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                {/* Scanning line effect */}
                <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent h-full w-full -translate-y-full group-hover:translate-y-full transition-transform duration-1500 ease-in-out" />
                </div>
                
                {/* Corner accents */}
                <div className="hidden md:block absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/0 group-hover:border-white/60 transition-all duration-500 rounded-tl-xl" />
                <div className="hidden md:block absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/60 transition-all duration-500 delay-75 rounded-tr-xl" />
                <div className="hidden md:block absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-white/60 transition-all duration-500 delay-150 rounded-bl-xl" />
                <div className="hidden md:block absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/0 group-hover:border-white/60 transition-all duration-500 delay-200 rounded-br-xl" />
                
                {/* Shimmer effect */}
                <div className="hidden md:block absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
                </div>
                
                <p className="text-center text-white font-light text-xs sm:text-sm md:text-base lg:text-lg relative z-10 transition-all duration-300 group-hover:font-medium md:group-hover:tracking-wider md:group-hover:scale-110 md:group-hover:text-shadow-lg">
                  {value}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}