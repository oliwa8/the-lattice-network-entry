"use client";

import { useEffect, useState } from 'react';

export default function WaveAnimation() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simplify on mobile for performance
  return (
    <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <div className={`absolute inset-0 bg-gradient-to-t from-white/5 to-transparent ${isMobile ? '' : 'animate-wave'}`} />
      
      {!isMobile && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-white/3 to-transparent animate-wave-slow" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/2 to-transparent animate-wave-slower" />
        </>
      )}

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes wave-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes wave-slower {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-wave { animation: wave 8s ease-in-out infinite; }
        .animate-wave-slow { animation: wave-slow 12s ease-in-out infinite; }
        .animate-wave-slower { animation: wave-slower 16s ease-in-out infinite; }
      `}</style>
    </div>
  );
}