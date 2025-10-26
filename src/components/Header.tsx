"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 transition-all duration-500 ${
      scrolled ? 'bg-[#0a1b2f]/80 backdrop-blur-md shadow-lg shadow-blue-500/10' : ''
    }`}>
      <div
        className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`
        }>

        <div className="group flex items-center gap-4 text-white cursor-pointer hover:scale-105 transition-transform duration-500">
          <div className="relative w-10 h-10 md:w-12 md:h-12 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-500/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/4da6d1c5-c3d4-45cf-9d42-c4a668df18e5/visual-edit-uploads/1761427348798-z17cirkc4bi.png"
              alt="The Lattice Logo"
              fill
              className="object-contain relative z-10"
              priority />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-light tracking-wide transition-all duration-500 group-hover:text-blue-200 group-hover:tracking-wider">
            The Lattice
          </h1>
          
          {/* Animated underline */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </div>
      </div>
    </header>);

}