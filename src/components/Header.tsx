"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
      <div
        className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`
        }>

        <div className="flex items-center gap-4 text-white">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/4da6d1c5-c3d4-45cf-9d42-c4a668df18e5/visual-edit-uploads/1761427348798-z17cirkc4bi.png"
              alt="The Lattice Logo"
              fill
              className="object-contain"
              priority />

          </div>
          <h1 className="text-2xl md:text-3xl font-light tracking-wide">
            The Lattice
          </h1>
        </div>
      </div>
    </header>);

}