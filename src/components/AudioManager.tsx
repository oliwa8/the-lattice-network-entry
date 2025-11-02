"use client";

import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

class AudioSystem {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.enabled = localStorage.getItem('audioEnabled') !== 'false';
    }
  }

  private getContext(): AudioContext {
    if (!this.audioContext && typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext!;
  }

  toggle() {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('audioEnabled', String(this.enabled));
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  // Soft chime for hover effects
  playHover() {
    if (!this.enabled) return;
    
    try {
      const ctx = this.getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Silently fail if audio context isn't available
    }
  }

  // Button click sound
  playClick() {
    if (!this.enabled) return;
    
    try {
      const ctx = this.getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Silently fail
    }
  }

  // Success chime for apply/join
  playSuccess() {
    if (!this.enabled) return;
    
    try {
      const ctx = this.getContext();
      
      // Play three notes in a chord
      [600, 800, 1000].forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.02 + i * 0.03);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        
        oscillator.start(ctx.currentTime + i * 0.03);
        oscillator.stop(ctx.currentTime + 0.4);
      });
    } catch (e) {
      // Silently fail
    }
  }

  // Subtle pulse for node interactions
  playPulse() {
    if (!this.enabled) return;
    
    try {
      const ctx = this.getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // Silently fail
    }
  }
}

const audioSystem = new AudioSystem();

export function useAudio() {
  const [enabled, setEnabled] = useState(audioSystem.isEnabled());

  const toggle = () => {
    const newState = audioSystem.toggle();
    setEnabled(newState);
  };

  return {
    enabled,
    toggle,
    playHover: () => audioSystem.playHover(),
    playClick: () => audioSystem.playClick(),
    playSuccess: () => audioSystem.playSuccess(),
    playPulse: () => audioSystem.playPulse(),
  };
}

export default function AudioManager() {
  const { enabled, toggle } = useAudio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300 group"
      aria-label={enabled ? 'Disable audio' : 'Enable audio'}
    >
      {enabled ? (
        <Volume2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-5 h-5 text-white/50 group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
}
