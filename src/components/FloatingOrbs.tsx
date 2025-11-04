"use client";

import { useEffect, useState } from 'react';

export default function FloatingOrbs() {
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
      {/* Orb 1 */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      
      {/* Orb 2 */}
      <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" />
      
      {/* Orb 3 */}
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float-medium" />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -40px) scale(1.2); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 25px) scale(1.05); }
          66% { transform: translate(25px, -25px) scale(0.95); }
        }

        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 25s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 22s ease-in-out infinite; }
      `}</style>
    </div>
  );
}