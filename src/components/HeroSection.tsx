"use client";

import { useEffect, useState, useRef } from 'react';
import MagneticButton from '@/components/MagneticButton';
import CursorGlow from '@/components/CursorGlow';
import TypewriterText from '@/components/TypewriterText';
import AnimatedLogo from '@/components/AnimatedLogo';
import TextScramble from '@/components/TextScramble';
import ScrollRevealText from '@/components/ScrollRevealText';
import { useAudio } from '@/components/AudioManager';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { playType } = useAudio();

  useEffect(() => {
    setIsVisible(true);

    // Show subtitle after logo animation
    const timer = setTimeout(() => setShowSubtitle(true), 3200);

    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, 1 - rect.bottom / window.innerHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 md:px-6 py-20">

      <CursorGlow />
      
      <div className="max-w-6xl mx-auto text-center">
        {/* Animated Logo */}
        <div
          className={`flex justify-center mb-12 transition-all duration-1000 !w-full !h-[140px] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`
          }
          style={{
            opacity: Math.max(0.5, 1 - scrollProgress * 1.5),
            transform: `translateY(${scrollProgress * 50}px) scale(${1 - scrollProgress * 0.2})`
          }}>

          <AnimatedLogo size={140} />
        </div>

        {/* Main Title with Typewriter Effect */}
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight mb-8 md:mb-12 text-white transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'}`
          }
          style={{
            opacity: Math.max(0.3, 1 - scrollProgress * 1.5),
            transform: `scale(${1 - scrollProgress * 0.1})`,
            filter: `blur(${scrollProgress * 8}px)`
          }}>

          <span className="block mb-4">
            <TypewriterText
              text="Welcome to"
              speed={80}
              delay={800}
              className="text-white/80" />

          </span>
          <span
            className="block font-normal bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
            style={{
              backgroundSize: '200% auto',
              animation: 'gradient 8s ease infinite'
            }}>

            <TypewriterText
              text="The Lattice"
              speed={100}
              delay={1600} />

          </span>
        </h1>

        {/* Subtitle with Scramble Effect and Scroll Reveal */}
        <div
          className={`transition-all duration-1000 ${
          showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }
          style={{
            opacity: showSubtitle ? Math.max(0, 1 - scrollProgress * 2) : 0
          }}>

          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-16 md:mb-20 max-w-4xl mx-auto leading-relaxed">

            Where{' '}
            <span className="text-white font-medium relative inline-block">
              <TextScramble text="analytical minds" delay={200} onScramble={playType} />
              <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </span>{' '}
            converge to architect the future through{' '}
            <span className="text-white font-medium relative inline-block">
              <TextScramble text="systems thinking" delay={800} onScramble={playType} />
              <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </span>
            ,{' '}
            <span className="text-white font-semibold">
              <ScrollRevealText text="depth" className="text-white" />
            </span>
            , and{' '}
            <span className="text-white font-semibold">
              <ScrollRevealText text="unwavering integrity" className="text-white" />
            </span>
            .
          </p>

          {/* CTA Button with Delay */}
          <div
            className={`transition-all duration-1000 delay-1000 ${
            showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
            }
            style={{
              opacity: showSubtitle ? Math.max(0, 1 - scrollProgress * 2.5) : 0
            }}
            onTransitionEnd={() => {
              if (showSubtitle) setShowButton(true);
            }}>

            <MagneticButton href="https://tally.so/r/3E9blL">
              Apply to Join
            </MagneticButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
          showButton ? 'opacity-100' : 'opacity-0'}`
          }
          style={{
            opacity: showButton ? Math.max(0, 1 - scrollProgress * 3) : 0
          }}>

          <div className="flex flex-col items-center gap-2">
            <span className="text-white/40 text-sm font-light tracking-wider">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>);

}