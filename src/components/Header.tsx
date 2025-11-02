"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-6 bg-gradient-to-b from-[#0a1b2f] via-[#0a1b2f]/80 to-transparent pointer-events-none">
      <div
        className={`transition-all duration-1000 ease-out pointer-events-auto flex items-center justify-between ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`
        }>

        <Link href="/" className="flex items-center gap-4 text-white hover:opacity-80 transition-opacity">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/4da6d1c5-c3d4-45cf-9d42-c4a668df18e5/visual-edit-uploads/1762045589304-5x6q1x7vf2.png"
              alt="The Lattice Logo"
              fill
              className="object-contain"
              priority />

          </div>
          <h1 className="text-2xl md:text-3xl font-light tracking-wide">
            The Lattice
          </h1>
        </Link>
      </div>
    </header>);

}