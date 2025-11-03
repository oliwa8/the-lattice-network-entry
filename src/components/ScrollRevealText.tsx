"use client";

import { useEffect, useState, useRef } from 'react';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  underlineColor?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export default function ScrollRevealText({ 
  text, 
  className = '', 
  underlineColor = 'rgba(255, 255, 255, 0.8)' 
}: ScrollRevealTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [revealProgress, setRevealProgress] = useState(0);
  const [underlineProgress, setUnderlineProgress] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when element is in view
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      // Start animation when element enters viewport
      if (elementTop < windowHeight && elementBottom > 0) {
        if (!hasStarted) setHasStarted(true);
        
        // Calculate scroll progress (0 to 1) based on element position
        const scrollStart = windowHeight * 0.7; // Start revealing at 70% viewport
        const scrollEnd = windowHeight * 0.3;   // Finish revealing at 30% viewport
        
        const progress = Math.max(0, Math.min(1, 
          (scrollStart - elementTop) / (scrollStart - scrollEnd)
        ));
        
        setRevealProgress(progress);
        // Underline follows slightly behind the text reveal
        setUnderlineProgress(Math.max(0, progress - 0.1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const revealedChars = Math.floor(text.length * revealProgress);
    
    // Create scrambled text that gradually reveals
    const newText = text.split('').map((char, index) => {
      if (char === ' ') return ' ';
      
      if (index < revealedChars) {
        return text[index];
      } else {
        // Show random character for unrevealed letters
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }).join('');
    
    setDisplayText(newText);
  }, [revealProgress, text, hasStarted]);

  return (
    <span 
      ref={elementRef}
      className={`relative inline-block ${className}`}
      style={{ whiteSpace: 'nowrap' }}
    >
      {displayText}
      <span 
        className="absolute bottom-0 left-0 h-[2px] transition-all duration-100"
        style={{
          width: `${underlineProgress * 100}%`,
          background: `linear-gradient(to right, transparent, ${underlineColor}, transparent)`,
          boxShadow: `0 0 8px ${underlineColor}`,
        }}
      />
    </span>
  );
}
