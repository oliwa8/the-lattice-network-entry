"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const founders = [
{
  name: "Aleksander Nitecki",
  image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/profile_picture-1761525008279.jpg',
  bio: "Analytical mind passionate about fostering depth, integrity, and collaborative growth.",
  linkedin: "https://www.linkedin.com/in/anitecki/"
},
{
  name: "Oliwier Załuski",
  image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/prof-1761525012505.png',
  bio: "Systems thinker and builder focused on creating meaningful connections within business communities.",
  linkedin: "https://www.linkedin.com/in/ozaluski/"
}];


export default function FoundersSection() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-light text-center mb-12 md:mb-20 text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>

          Founders
        </h2>
        
        {/* Improved photo layout with asymmetric balance */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 mb-12 md:mb-16">
          {founders.map((founder, index) =>
          <div
            key={founder.name}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative flex flex-col items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${
            hoveredIndex !== null && hoveredIndex !== index ? 'scale-95 opacity-60' : 'scale-100'}`}
            style={{
              transitionDelay: `${(index + 1) * 200}ms`,
            }}>

              {/* Decorative corner elements - hidden on mobile */}
              <div className="hidden md:block absolute -top-4 -left-4 w-10 h-10 lg:w-12 lg:h-12 opacity-0 group-hover:opacity-30 transition-all duration-700">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <path d="M0,40 L0,0 L40,0" fill="none" stroke="white" strokeWidth="1" />
                </svg>
              </div>
              <div className="hidden md:block absolute -bottom-4 -right-4 w-10 h-10 lg:w-12 lg:h-12 opacity-0 group-hover:opacity-30 transition-all duration-700">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <path d="M40,0 L40,40 L0,40" fill="none" stroke="white" strokeWidth="1" />
                </svg>
              </div>
              
              {/* Enhanced photo with parallax hover effect */}
              <div className="relative mb-6 md:mb-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110" />
                
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-white/20 transition-all duration-700 group-hover:border-white/50 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                  <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110" />

                </div>
                
                {/* Orbital ring animation - hidden on mobile */}
                <div className="hidden md:block absolute inset-0 rounded-full border border-white/10 animate-ping opacity-0 group-hover:opacity-20" style={{ animationDuration: '3s' }} />
              </div>
              
              {/* Text content with structural lines */}
              <div className="text-center max-w-sm px-4">
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="h-px w-6 md:w-8 bg-gradient-to-r from-transparent to-white/30" />
                  <h3 className="text-xl md:text-2xl font-medium text-white !whitespace-pre-line">{founder.name}</h3>
                  <div className="h-px w-6 md:w-8 bg-gradient-to-l from-transparent to-white/30" />
                </div>
                
                <p className="text-white/75 leading-relaxed mb-5 md:mb-6 text-sm md:text-[15px]">
                  {founder.bio}
                </p>
                
                <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 text-sm group/link">

                  <span className="relative">
                    Read more
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover/link:w-full" />
                  </span>
                  <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
        
        {/* Closing statement with geometric frame */}
        <div className="relative px-4">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-6 md:h-8 bg-gradient-to-b from-white/30 to-transparent" />
          
          <p
            className={`text-center text-white/70 text-sm md:text-base max-w-2xl mx-auto pt-8 md:pt-12 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
            }>

            Together, they're building a community where thinkers, builders, and leaders can grow with depth and humility.
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
            <svg width="16" height="16" viewBox="0 0 16 16" className="opacity-30">
              <circle cx="8" cy="8" r="3" fill="white" />
              <circle cx="8" cy="8" r="7" fill="none" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>);

}