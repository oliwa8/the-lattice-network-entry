"use client";

import { useEffect, useState } from 'react';

export default function CursorInteraction() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Disable on mobile (no cursor on touch devices)
  if (isMobile) return null;

  return null; // This component can be fully disabled for performance
}