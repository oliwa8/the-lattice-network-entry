"use client";

import { useEffect, useRef, useState } from 'react';
import { Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-16 px-6 border-t border-white/10">

      <div
        className={`max-w-4xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
        }>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@thelattice.com"
              className="text-white/70 hover:text-white transition-colors duration-400 flex items-center gap-2 hover:scale-105">

              <Mail size={20} />
              <span className="text-sm !whitespace-pre-line">thelatticeorg@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://discord.gg/lattice"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-all duration-400 hover:scale-110"
              aria-label="Discord">

              <MessageSquare size={24} />
            </a>
            <a
              href="https://linkedin.com/company/thelattice"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-all duration-400 hover:scale-110"
              aria-label="LinkedIn">

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">

                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  fill="currentColor" />

              </svg>
            </a>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-white/50 italic font-light">
            "Truth emerges from clarity, not noise."
          </p>
        </div>
      </div>
    </footer>);

}