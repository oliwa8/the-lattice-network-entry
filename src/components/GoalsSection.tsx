"use client";

import { useEffect, useRef, useState } from 'react';
import TiltCard from '@/components/TiltCard';

const goals = [
{
  title: 'Belonging',
  description: 'A sanctuary for the intellectually curious — where depth trumps noise and authenticity reigns.',
  icon: '🧩'
},
{
  title: 'Recognition',
  description: 'Celebrating the architects of insight who build with precision, think with clarity, and act with conviction.',
  icon: '⭐'
},
{
  title: 'Collaboration',
  description: 'Co-creating the future with minds that challenge, elevate, and inspire breakthrough thinking.',
  icon: '🤝'
},
{
  title: 'Evolution',
  description: 'Continuous metamorphosis through systems thinking, rigorous discourse, and relentless curiosity.',
  icon: '🚀'
}];


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
    <section ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-center mb-4 md:mb-6 text-white transition-all duration-1000 tracking-tight ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          Our Pillars
        </h2>
        <p className={`text-center text-white/60 text-base md:text-lg mb-12 md:mb-20 max-w-2xl mx-auto transition-all duration-1000 delay-100 px-4 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
        }>
          Four foundations upon which exceptional communities are built
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {goals.map((goal, index) =>
          <div
            key={goal.title}
            className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${
            hoveredIndex !== null && hoveredIndex !== index ? 'scale-95 opacity-60' : 'scale-100 opacity-100'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <TiltCard maxTilt={12}>
              <div className="group relative p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 hover:border-white/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10 h-full">
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="text-4xl mb-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {goal.icon}
                </div>
                
                <h3 className="text-xl md:text-2xl lg:text-3xl font-medium mb-4 md:mb-5 text-white relative z-10 transition-colors duration-300">
                  {goal.title}
                </h3>
                <p className="text-white/70 leading-relaxed relative z-10 text-sm md:text-base">
                  {goal.description}
                </p>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-2xl md:rounded-b-3xl" />
              </div>
            </TiltCard>
          </div>
          )}
        </div>
      </div>
    </section>);

}