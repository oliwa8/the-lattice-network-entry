"use client";

import { useEffect, useRef, useState } from 'react';

const concepts = [
{ label: 'Ideas', x: 0.167, y: 0.222 },
{ label: 'Collaboration', x: 0.5, y: 0.222 },
{ label: 'Integrity', x: 0.833, y: 0.222 },
{ label: 'Systems Thinking', x: 0.333, y: 0.778 },
{ label: 'Growth', x: 0.667, y: 0.778 }];


export default function CommunityDiagram() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [dimensions, setDimensions] = useState({ width: 900, height: 450 });
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDimensions);
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
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: (e.touches[0].clientX - rect.left) / rect.width,
        y: (e.touches[0].clientY - rect.top) / rect.height
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-center mb-6 md:mb-8 text-white tracking-tight transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>

          The Community
        </h2>
        
        <p className={`text-center text-white/60 text-base md:text-lg mb-10 md:mb-16 max-w-2xl mx-auto transition-all duration-1000 delay-100 px-4 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
        }>
          A living network of interconnected minds — dynamic, meaningful, and continuously evolving
        </p>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className={`relative w-full aspect-[16/10] sm:aspect-[2/1] bg-white/5 rounded-2xl md:rounded-3xl border border-white/15 backdrop-blur-md p-4 md:p-8 transition-all duration-1000 delay-200 overflow-hidden ${
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
              <rect width="100%" height="100%" fill="url(#grid)" className="!w-[1053px] !h-[528px]" />
            </svg>
          </div>

          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Glowing line gradient */}
              <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                <stop offset="50%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
              </linearGradient>
              
              {/* Node glow filter */}
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
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
                const distance = Math.hypot((target.x - concept.x) * 100, (target.y - concept.y) * 100);
                const flowSpeed = (timeRef.current * 10 + i * 5) % distance;

                return (
                  <g key={`${i}-${j}`}>
                      {/* Base line */}
                      <line
                      x1={concept.x * 100}
                      y1={concept.y * 100}
                      x2={target.x * 100}
                      y2={target.y * 100}
                      stroke="white"
                      strokeWidth="0.3"
                      opacity={isActive ? 0.3 : 0.1}
                      className="transition-opacity duration-500" />

                      
                      {/* Animated flowing line */}
                      <line
                      x1={concept.x * 100}
                      y1={concept.y * 100}
                      x2={target.x * 100}
                      y2={target.y * 100}
                      stroke="url(#lineGlow)"
                      strokeWidth="0.4"
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
              const mouseDistance = Math.hypot((mousePos.x - concept.x) * 100, (mousePos.y - concept.y) * 100);
              const proximity = Math.max(0, 1 - mouseDistance / 20);
              const baseSize = 2;
              const hoverSize = activeNode === i ? 3 : baseSize + proximity * 1;
              const pulseScale = 1 + Math.sin(timeRef.current * 2 + i) * 0.1;

              return (
                <g
                  key={i}
                  onMouseEnter={() => setActiveNode(i)}
                  onMouseLeave={() => setActiveNode(null)}
                  onTouchStart={() => setActiveNode(i)}
                  onTouchEnd={() => setActiveNode(null)}
                  className="cursor-pointer touch-none"
                  style={{ transformOrigin: `${concept.x * 100}% ${concept.y * 100}%` }}>

                  {/* Outer pulse ring */}
                  <circle
                    cx={concept.x * 100}
                    cy={concept.y * 100}
                    r={hoverSize * pulseScale * 2}
                    fill="none"
                    stroke="white"
                    strokeWidth="0.1"
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
                    cx={concept.x * 100}
                    cy={concept.y * 100}
                    r={hoverSize * 1.5}
                    fill="white"
                    opacity={activeNode === i ? 0.2 : 0.05}
                    filter="url(#nodeGlow)"
                    className="transition-all duration-500" />

                  
                  {/* Main node */}
                  <circle
                    cx={concept.x * 100}
                    cy={concept.y * 100}
                    r={hoverSize}
                    fill="white"
                    opacity={activeNode === null || activeNode === i ? 0.95 : 0.6}
                    className="transition-all duration-500"
                    filter="url(#nodeGlow)" />

                  
                  {/* Center dot */}
                  <circle
                    cx={concept.x * 100}
                    cy={concept.y * 100}
                    r={hoverSize * 0.3}
                    fill="rgba(10, 27, 47, 0.8)"
                    opacity={activeNode === i ? 1 : 0.7}
                    className="transition-all duration-500" />

                  
                  {/* Label */}
                  <text
                    x={concept.x * 100}
                    y={concept.y * 100 + hoverSize + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize={activeNode === i ? "3" : "2.5"}
                    fontWeight={activeNode === i ? "500" : "400"}
                    opacity={activeNode === null || activeNode === i ? 1 : 0.7}
                    className="transition-all duration-500 select-none pointer-events-none">

                    {concept.label}
                  </text>
                </g>);

            })}
          </svg>
        </div>
        
        {/* Caption */}
        <p className={`text-center text-white/50 text-xs md:text-sm mt-6 md:mt-8 italic transition-all duration-1000 delay-400 px-4 ${
        isVisible ? 'opacity-100' : 'opacity-0'}`
        }>
          Hover over nodes to explore connections · Watch the network pulse and flow
        </p>
      </div>
    </section>);

}