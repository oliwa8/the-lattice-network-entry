"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const founders = [
  {
    name: "Aleksander Nitecki",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/profile_picture-1761487213564.jpg?width=800&height=800&resize=contain",
    bio: "Strategic thinker with a passion for systems design and organizational excellence. Believes in building communities that prioritize depth over noise.",
    linkedin: "https://www.linkedin.com/in/anitecki/"
  },
  {
    name: "Oliwier Załuski",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/profile-oli-1761487241503.png?width=800&height=800&resize=contain",
    bio: "Analytical problem-solver focused on creating structures for meaningful collaboration. Dedicated to fostering spaces where integrity and innovation intersect.",
    linkedin: "https://www.linkedin.com/in/ozaluski/"
  }
];

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
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Founders
        </h2>
        <div className="grid md:grid-cols-2 gap-16 md:gap-20">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className={`group text-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-2 border-blue-400/30 transition-all duration-700 hover:border-blue-400/60 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40">
                {/* Multi-layer glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-blue-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover relative z-10 transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20" />
              </div>
              
              <h3 className="text-2xl font-medium mb-4 text-white transition-all duration-500 group-hover:text-blue-100 group-hover:scale-105">{founder.name}</h3>
              
              <p className="text-white/80 leading-relaxed max-w-md mx-auto mb-6 transition-all duration-500 group-hover:text-white/95">
                {founder.bio}
              </p>
              
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-blue-300 transition-all duration-300 text-sm font-light hover:gap-3 group/link relative"
              >
                {/* Glow effect on link */}
                <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-md opacity-0 group-hover/link:opacity-100 transition-all duration-500" />
                
                <span className="relative z-10">Read more</span>
                <ExternalLink size={16} className="relative z-10 group-hover/link:scale-110 transition-transform duration-300" />
              </a>
            </div>
          ))}
        </div>
        
        <p
          className={`text-center text-white/70 mt-16 max-w-2xl mx-auto transition-all duration-1000 delay-600 hover:text-white/85 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Together, they're building a community where thinkers, builders, and leaders can grow with depth and humility.
        </p>
      </div>
    </section>
  );
}