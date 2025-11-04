"use client";

import { useEffect, useState } from 'react';

export default function LiquidBlob() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Disable on mobile for performance
  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-blob-slow opacity-50" />

      <style jsx>{`
        @keyframes blob-slow {
          0%, 100% {
            transform: translate(-50%, 0) scale(1);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            transform: translate(-50%, -20px) scale(1.05);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            transform: translate(-50%, 0) scale(0.95);
            border-radius: 70% 30% 50% 50% / 30% 70% 50% 60%;
          }
          75% {
            transform: translate(-50%, 20px) scale(1.02);
            border-radius: 40% 70% 30% 60% / 70% 50% 60% 30%;
          }
        }

        .animate-blob-slow {
          animation: blob-slow 30s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}