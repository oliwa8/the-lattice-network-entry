"use client";

import { useEffect, useRef, useState } from 'react';

const concepts = [
{ label: 'Ideas', x: 150, y: 100 },
{ label: 'Collaboration', x: 450, y: 100 },
{ label: 'Integrity', x: 750, y: 100 },
{ label: 'Systems Thinking', x: 300, y: 350 },
{ label: 'Growth', x: 600, y: 350 }];


export default function CommunityDiagram() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const animationFrame = useRef<number>();
  const timeRef = useRef(0);

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

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.01;
      animationFrame.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width * 900,
      y: (e.clientY - rect.top) / rect.height * 450
    });
  };

  return (
    <section ref={sectionRef} className="relative py-32 px-6 !w-full !h-[1139px]">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-light text-center mb-8 text-white tracking-tight transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>

          The Community
        </h2>
        
        <p className={`text-center text-white/60 text-lg mb-16 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
        }>
          A living network of interconnected minds — dynamic, meaningful, and continuously evolving
        </p>

        <div
          onMouseMove={handleMouseMove}
          className={`relative w-full aspect-[2/1] bg-white/5 rounded-3xl border border-white/15 backdrop-blur-md p-8 transition-all duration-1000 delay-200 overflow-hidden ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`
          }>

          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <svg className="w-full h-full" viewBox="0 0 900 450" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Glowing line gradient */}
              <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                <stop offset="50%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
              </linearGradient>
              
              {/* Node glow filter */}
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Animated connection lines with flow */}
            <g>
              {concepts.map((concept, i) =>
              concepts.slice(i + 1).map((target, j) => {
                const targetIndex = i + j + 1;
                const isActive = activeNode === null || activeNode === i || activeNode === targetIndex;
                const distance = Math.hypot(target.x - concept.x, target.y - concept.y);
                const flowSpeed = (timeRef.current * 100 + i * 50) % distance;

                return (
                  <g key={`${i}-${j}`}>
                      {/* Base line */}
                      <line
                      x1={concept.x}
                      y1={concept.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="white"
                      strokeWidth="2"
                      opacity={isActive ? 0.3 : 0.1}
                      className="transition-opacity duration-500" />

                      
                      {/* Animated flowing line */}
                      <line
                      x1={concept.x}
                      y1={concept.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="url(#lineGlow)"
                      strokeWidth="3"
                      strokeDasharray={`${distance * 0.2} ${distance * 0.8}`}
                      strokeDashoffset={-flowSpeed}
                      opacity={isActive ? activeNode === i || activeNode === targetIndex ? 1 : 0.6 : 0.2}
                      className="transition-opacity duration-500">

                        <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to={-distance}
                        dur={`${5 + i}s`}
                        repeatCount="indefinite" />

                      </line>
                    </g>);

              })
              )}
            </g>

            {/* Interactive nodes with pulsing */}
            {concepts.map((concept, i) => {
              const mouseDistance = Math.hypot(mousePos.x - concept.x, mousePos.y - concept.y);
              const proximity = Math.max(0, 1 - mouseDistance / 200);
              const baseSize = 16;
              const hoverSize = activeNode === i ? 24 : baseSize + proximity * 8;
              const pulseScale = 1 + Math.sin(timeRef.current * 2 + i) * 0.1;

              return (
                <g
                  key={i}
                  onMouseEnter={() => setActiveNode(i)}
                  onMouseLeave={() => setActiveNode(null)}
                  className="cursor-pointer"
                  style={{ transformOrigin: `${concept.x}px ${concept.y}px` }}>

                  {/* Outer pulse ring */}
                  <circle
                    cx={concept.x}
                    cy={concept.y}
                    r={hoverSize * pulseScale * 2}
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    opacity={activeNode === i ? 0.3 : 0.1}
                    className="transition-all duration-500">

                    <animate
                      attributeName="r"
                      from={hoverSize * 1.5}
                      to={hoverSize * 2.5}
                      dur="3s"
                      repeatCount="indefinite" />

                    <animate
                      attributeName="opacity"
                      from="0.3"
                      to="0"
                      dur="3s"
                      repeatCount="indefinite" />

                  </circle>
                  
                  {/* Glow halo */}
                  <circle
                    cx={concept.x}
                    cy={concept.y}
                    r={hoverSize * 1.5}
                    fill="white"
                    opacity={activeNode === i ? 0.2 : 0.05}
                    filter="url(#nodeGlow)"
                    className="transition-all duration-500" />

                  
                  {/* Main node */}
                  <circle
                    cx={concept.x}
                    cy={concept.y}
                    r={hoverSize}
                    fill="white"
                    opacity={activeNode === null || activeNode === i ? 0.95 : 0.6}
                    className="transition-all duration-500"
                    filter="url(#nodeGlow)" />

                  
                  {/* Center dot */}
                  <circle
                    cx={concept.x}
                    cy={concept.y}
                    r={hoverSize * 0.3}
                    fill="rgba(10, 27, 47, 0.8)"
                    opacity={activeNode === i ? 1 : 0.7}
                    className="transition-all duration-500" />

                  
                  {/* Label */}
                  <text
                    x={concept.x}
                    y={concept.y + hoverSize + 35}
                    textAnchor="middle"
                    fill="white"
                    fontSize={activeNode === i ? "20" : "18"}
                    fontWeight={activeNode === i ? "500" : "400"}
                    opacity={activeNode === null || activeNode === i ? 1 : 0.7}
                    className="transition-all duration-500 select-none">

                    {concept.label}
                  </text>
                </g>);

            })}
          </svg>
        </div>
        
        {/* Caption */}
        <p className={`text-center text-white/50 text-sm mt-8 italic transition-all duration-1000 delay-400 ${
        isVisible ? 'opacity-100' : 'opacity-0'}`
        }>
          Hover over nodes to explore connections · Watch the network pulse and flow
        </p>
      </div>
    </section>);

}