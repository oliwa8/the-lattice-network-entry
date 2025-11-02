"use client";

import { useState, useEffect } from 'react';
import { useAudio } from '@/components/AudioManager';

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const { playSuccess, playHover } = useAudio();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleApplyClick = () => {
    playSuccess();
  };

  return (
    <section className="relative py-24 md:py-32 lg:py-40 px-4 md:px-6 overflow-hidden">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-6 md:mb-8 text-white tracking-tight leading-tight">
          Join the network redefining<br />
          how thoughtful people<br />
          connect and build
        </h2>

        <p className="text-white/60 text-lg md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto">
          Be part of a community where depth, integrity, and systems thinking shape the future
        </p>

        {/* Pulsating Apply Button with gradient glow */}
        <div className="relative inline-block">
          {/* Animated gradient glow rings */}
          <div className="absolute -inset-4 animate-pulse-glow">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-xl opacity-75 animate-gradient" />
          </div>
          <div className="absolute -inset-2 animate-pulse-glow-delayed">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 via-blue-500/40 to-purple-500/40 rounded-full blur-lg opacity-50 animate-gradient" />
          </div>
          
          <button
            onClick={handleApplyClick}
            onMouseEnter={playHover}
            className="relative px-10 md:px-12 py-4 md:py-5 bg-white text-[#0a1b2f] rounded-full text-base md:text-lg font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl group overflow-hidden"
          >
            {/* Button shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            <span className="relative z-10 flex items-center gap-3">
              Apply to Join
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

        <p className={`text-white/40 text-sm mt-8 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          Applications are reviewed on a rolling basis
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-glow-delayed {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.08);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-pulse-glow-delayed {
          animation: pulse-glow-delayed 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  );
}