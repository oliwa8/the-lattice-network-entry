"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const founders = [
{
  name: "Aleksander Nitecki",
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  bio: "...",
  linkedin: "https://www.linkedin.com/in/alexprofile"
},
{
  name: "Oliwier Za\u0142uski",
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  bio: "...",
  linkedin: "https://www.linkedin.com/in/japrofile"
}];


export default function FoundersSection() {
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

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-light text-center mb-16 text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>

          Founders
        </h2>
        <div className="grid md:grid-cols-2 gap-16 md:gap-20">
          {founders.map((founder, index) =>
          <div
            key={founder.name}
            className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
            }
            style={{ transitionDelay: `${(index + 1) * 200}ms` }}>

              <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-2 border-white/20 transition-all duration-700 hover:border-white/40 hover:scale-105 hover:shadow-xl hover:shadow-white/20">
                <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="object-cover" />

              </div>
              <h3 className="text-2xl font-medium mb-4 text-white whitespace-pre-line !whitespace-pre-line">{founder.name}</h3>
              <p className="text-white/80 leading-relaxed max-w-md mx-auto whitespace-pre-line mb-6">
                {founder.bio}
              </p>
              
              <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 text-sm font-light hover:gap-3 group">

                <span>Read more</span>
                <ExternalLink size={16} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          )}
        </div>
        <p
          className={`text-center text-white/70 mt-16 max-w-2xl mx-auto transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>

          Together, they're building a community where thinkers, builders, and leaders can grow with depth and humility.
        </p>
      </div>
    </section>);

}