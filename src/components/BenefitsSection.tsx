"use client";

import { useEffect, useRef, useState } from 'react';

const benefits = [
{
  title: 'Curated Network',
  description: 'Connect with exceptional thinkers, builders, and leaders who value depth and integrity.',
  gradient: 'from-blue-500/20 to-cyan-500/20'
},
{
  title: 'Systems Mastery',
  description: 'Develop frameworks and mental models for understanding complexity in business and beyond.',
  gradient: 'from-purple-500/20 to-pink-500/20'
},
{
  title: 'Intentional Growth',
  description: 'Access resources, mentorship, and opportunities designed for long-term excellence.',
  gradient: 'from-amber-500/20 to-orange-500/20'
}];


export default function BenefitsSection() {
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
    <section ref={sectionRef} className="relative py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-light text-center mb-6 text-white transition-all duration-1000 tracking-tight ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>

          Benefits
        </h2>
        <p className={`text-center text-white/60 text-lg mb-24 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
        }>
          What you gain from joining our elite community of thinkers
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) =>
          <div
            key={benefit.title}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${
            hoveredIndex !== null && hoveredIndex !== index ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}
            style={{ transitionDelay: `${index * 200}ms` }}>

              {/* Outer glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative h-full">
                {/* Main card */}
                <div className="relative p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 hover:border-white/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/20 h-full overflow-hidden group-hover:-translate-y-2">
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Glowing border */}
                  <div className="absolute inset-0 rounded-3xl ring-2 ring-white/0 group-hover:ring-white/30 transition-all duration-700" />
                  
                  {/* Number badge */}
                  <div className="absolute top-6 right-6 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white/50 font-light text-lg transition-all duration-500 group-hover:scale-110 group-hover:border-white/40 group-hover:text-white/80 !w-8 !h-[35px]">
                    {index + 1}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-medium mb-6 text-white relative z-10 transition-all duration-300 group-hover:scale-105">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed relative z-10 text-base md:text-lg">
                    {benefit.description}
                  </p>
                  
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-white/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}