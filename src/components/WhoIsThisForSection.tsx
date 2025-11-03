"use client";

import { useEffect, useRef, useState } from 'react';
import { useAudio } from '@/components/AudioManager';

interface Profile {
  title: string;
  description: string;
  traits: string[];
  canvasRenderer: (ctx: CanvasRenderingContext2D, width: number, height: number, time: number, isHovered: boolean) => void;
}

const profiles: Profile[] = [
  {
    title: "Strategic Thinkers",
    description: "You see patterns where others see chaos. You build frameworks that transform complexity into clarity.",
    traits: ["Systems architects", "Pattern recognizers", "Framework builders"],
    canvasRenderer: (ctx, width, height, time, isHovered) => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Draw interconnected nodes
      const nodes = 8;
      const radius = Math.min(width, height) * 0.35;
      const scale = isHovered ? 1.1 : 1;
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${isHovered ? 0.8 : 0.5})`;
      ctx.lineWidth = 2;
      
      // Draw connections
      for (let i = 0; i < nodes; i++) {
        const angle1 = (i / nodes) * Math.PI * 2 + time * 0.0005;
        const x1 = centerX + Math.cos(angle1) * radius * scale;
        const y1 = centerY + Math.sin(angle1) * radius * scale;
        
        for (let j = i + 1; j < nodes; j++) {
          const angle2 = (j / nodes) * Math.PI * 2 + time * 0.0005;
          const x2 = centerX + Math.cos(angle2) * radius * scale;
          const y2 = centerY + Math.sin(angle2) * radius * scale;
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
      
      // Draw nodes
      ctx.fillStyle = isHovered ? 'rgba(147, 197, 253, 0.9)' : 'rgba(255, 255, 255, 0.7)';
      for (let i = 0; i < nodes; i++) {
        const angle = (i / nodes) * Math.PI * 2 + time * 0.0005;
        const x = centerX + Math.cos(angle) * radius * scale;
        const y = centerY + Math.sin(angle) * radius * scale;
        
        ctx.beginPath();
        ctx.arc(x, y, isHovered ? 6 : 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },
  {
    title: "Analytical Builders",
    description: "You don't just solve problems — you dissect them, understand their structure, and rebuild them better.",
    traits: ["Deep analyzers", "Solution architects", "Relentless optimizers"],
    canvasRenderer: (ctx, width, height, time, isHovered) => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Draw analytical grid with flowing data
      const gridSize = 6;
      const cellWidth = width / gridSize;
      const cellHeight = height / gridSize;
      const scale = isHovered ? 1.05 : 1;
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${isHovered ? 0.6 : 0.3})`;
      ctx.lineWidth = 1.5;
      
      // Vertical lines
      for (let i = 0; i <= gridSize; i++) {
        const x = (i * cellWidth);
        const offset = Math.sin(time * 0.001 + i * 0.5) * 10 * (isHovered ? 1.5 : 1);
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x - offset, height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let i = 0; i <= gridSize; i++) {
        const y = (i * cellHeight);
        const offset = Math.cos(time * 0.001 + i * 0.5) * 10 * (isHovered ? 1.5 : 1);
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(width, y - offset);
        ctx.stroke();
      }
      
      // Draw flowing data points
      ctx.fillStyle = isHovered ? 'rgba(167, 139, 250, 0.9)' : 'rgba(255, 255, 255, 0.6)';
      for (let i = 0; i < 12; i++) {
        const x = (Math.sin(time * 0.0008 + i * 2) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.001 + i * 1.5) * 0.5 + 0.5) * height;
        const size = isHovered ? 5 : 3;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },
  {
    title: "Visionary Leaders",
    description: "You think three moves ahead. You see the future not as a destination, but as something you actively build.",
    traits: ["Forward thinkers", "Strategic planners", "Impact drivers"],
    canvasRenderer: (ctx, width, height, time, isHovered) => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Draw expanding horizons
      const rings = 5;
      const maxRadius = Math.min(width, height) * 0.45;
      
      for (let i = 0; i < rings; i++) {
        const progress = (time * 0.0003 + i * 0.2) % 1;
        const radius = progress * maxRadius;
        const alpha = (1 - progress) * (isHovered ? 0.6 : 0.4);
        
        ctx.strokeStyle = `rgba(251, 191, 36, ${alpha})`;
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Draw directional arrows
      const arrows = 8;
      const arrowRadius = maxRadius * 0.6;
      ctx.strokeStyle = isHovered ? 'rgba(251, 191, 36, 0.9)' : 'rgba(255, 255, 255, 0.7)';
      ctx.fillStyle = isHovered ? 'rgba(251, 191, 36, 0.9)' : 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < arrows; i++) {
        const angle = (i / arrows) * Math.PI * 2 + time * 0.0004;
        const x = centerX + Math.cos(angle) * arrowRadius;
        const y = centerY + Math.sin(angle) * arrowRadius;
        
        const arrowLength = isHovered ? 18 : 12;
        const arrowWidth = 6;
        
        // Arrow line
        ctx.beginPath();
        ctx.moveTo(x - Math.cos(angle) * arrowLength * 0.7, y - Math.sin(angle) * arrowLength * 0.7);
        ctx.lineTo(x + Math.cos(angle) * arrowLength * 0.3, y + Math.sin(angle) * arrowLength * 0.3);
        ctx.stroke();
        
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(angle) * arrowLength * 0.3, y + Math.sin(angle) * arrowLength * 0.3);
        ctx.lineTo(
          x + Math.cos(angle - 0.5) * arrowWidth,
          y + Math.sin(angle - 0.5) * arrowWidth
        );
        ctx.lineTo(
          x + Math.cos(angle + 0.5) * arrowWidth,
          y + Math.sin(angle + 0.5) * arrowWidth
        );
        ctx.closePath();
        ctx.fill();
      }
    }
  },
  {
    title: "Integrity-Driven Doers",
    description: "You build with purpose. Every decision is filtered through values, every action aligned with long-term thinking.",
    traits: ["Principled operators", "Ethical builders", "Purpose-aligned creators"],
    canvasRenderer: (ctx, width, height, time, isHovered) => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Draw balanced structure - like scales
      const scale = isHovered ? 1.1 : 1;
      const baseWidth = width * 0.7;
      const armHeight = height * 0.3;
      
      // Central pillar
      ctx.strokeStyle = isHovered ? 'rgba(134, 239, 172, 0.9)' : 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - armHeight * scale);
      ctx.lineTo(centerX, centerY + armHeight * scale);
      ctx.stroke();
      
      // Horizontal beam (slight wave for life/movement)
      const beamWave = Math.sin(time * 0.001) * 5;
      ctx.beginPath();
      ctx.moveTo(centerX - baseWidth / 2 * scale, centerY - armHeight * 0.5 + beamWave);
      ctx.lineTo(centerX + baseWidth / 2 * scale, centerY - armHeight * 0.5 - beamWave);
      ctx.stroke();
      
      // Left and right platforms
      const platformWidth = baseWidth * 0.25;
      const platformHeight = 15;
      
      // Left platform
      ctx.fillStyle = isHovered ? 'rgba(134, 239, 172, 0.7)' : 'rgba(255, 255, 255, 0.5)';
      ctx.fillRect(
        centerX - baseWidth / 2 * scale - platformWidth / 2,
        centerY - armHeight * 0.5 + beamWave + 10,
        platformWidth,
        platformHeight
      );
      
      // Right platform
      ctx.fillRect(
        centerX + baseWidth / 2 * scale - platformWidth / 2,
        centerY - armHeight * 0.5 - beamWave + 10,
        platformWidth,
        platformHeight
      );
      
      // Connection lines (chains)
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - baseWidth / 2 * scale, centerY - armHeight * 0.5 + beamWave);
      ctx.lineTo(centerX - baseWidth / 2 * scale, centerY - armHeight * 0.5 + beamWave + 10);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX + baseWidth / 2 * scale, centerY - armHeight * 0.5 - beamWave);
      ctx.lineTo(centerX + baseWidth / 2 * scale, centerY - armHeight * 0.5 - beamWave + 10);
      ctx.stroke();
      
      // Geometric foundation base
      ctx.fillStyle = isHovered ? 'rgba(134, 239, 172, 0.8)' : 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + armHeight * scale);
      ctx.lineTo(centerX - 20, centerY + armHeight * scale + 15);
      ctx.lineTo(centerX + 20, centerY + armHeight * scale + 15);
      ctx.closePath();
      ctx.fill();
    }
  }
];

function ProfileCard({ profile, index }: { profile: Profile; index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const { playHover, playFlip } = useAudio();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now() - startTime;
      profile.canvasRenderer(ctx, rect.width, rect.height, currentTime, isHovered);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [profile, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHover();
    playFlip();
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 hover:border-white/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-2 overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700" />
        
        {/* Canvas illustration */}
        <div className="relative mb-6">
          <canvas
            ref={canvasRef}
            className="w-full h-48 rounded-xl"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-medium mb-4 text-white transition-all duration-300 group-hover:scale-105">
            {profile.title}
          </h3>
          <p className="text-white/70 leading-relaxed mb-6 text-base md:text-lg">
            {profile.description}
          </p>
          
          {/* Traits */}
          <div className="space-y-2">
            {profile.traits.map((trait, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-white/60 text-sm md:text-base"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white/80 transition-colors" />
                <span>{trait}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-2xl md:rounded-b-3xl" />
        
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20 group-hover:border-white/50 transition-all duration-300 group-hover:w-6 group-hover:h-6" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20 group-hover:border-white/50 transition-all duration-300 group-hover:w-6 group-hover:h-6" />
      </div>
    </div>
  );
}

export default function WhoIsThisForSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-6 text-white transition-all duration-1000 tracking-tight ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Who is The Lattice For?
          </h2>
          <p
            className={`text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Built for the minds who see the world differently — who think in layers, build with intention, and lead with clarity.
          </p>
          
          {/* Age Range & Target Audience */}
          <div
            className={`mt-8 flex flex-col items-center gap-3 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <span className="text-white/50 text-sm uppercase tracking-wider font-medium">Ages 16-30</span>
              <span className="w-px h-4 bg-white/20"></span>
              <span className="text-white/90 text-base">Students & Early Professionals</span>
            </div>
            <p className="text-white/60 text-base md:text-lg max-w-2xl">
              Whether you're navigating university, launching your career, or building your first venture — if you think deeply and build intentionally, you belong here.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {profiles.map((profile, index) => (
            <ProfileCard key={profile.title} profile={profile} index={index} />
          ))}
        </div>

        {/* Bottom CTA text */}
        <div
          className={`mt-16 md:mt-20 text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xl md:text-2xl text-white/80 font-light">
            If this resonates —{' '}
            <span className="text-white font-medium">you belong here</span>.
          </p>
        </div>
      </div>
    </section>
  );
}