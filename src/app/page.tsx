import LatticeBackground from '@/components/LatticeBackground'
import AmbientGrid from '@/components/AmbientGrid'
import WaveAnimation from '@/components/WaveAnimation'
import DataStream from '@/components/DataStream'
import CursorInteraction from '@/components/CursorInteraction'
import NeuralNetwork from '@/components/NeuralNetwork'
import FloatingOrbs from '@/components/FloatingOrbs'
import ScrollProgress from '@/components/ScrollProgress'
import SectionTransition from '@/components/SectionTransition'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MissionSection from '@/components/MissionSection'
import ValuesSection from '@/components/ValuesSection'
import BenefitsSection from '@/components/BenefitsSection'
import FoundersSection from '@/components/FoundersSection'
import CommunityDiagram from '@/components/CommunityDiagram'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import MagneticCursor from '@/components/MagneticCursor'
import ParticleMorph from '@/components/ParticleMorph'
import LiquidBlob from '@/components/LiquidBlob'
import MouseTrail from '@/components/MouseTrail'
import InfiniteMarquee from '@/components/InfiniteMarquee'
import AudioManager from '@/components/AudioManager'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <LatticeBackground />
      <AmbientGrid />
      <WaveAnimation />
      <DataStream />
      <CursorInteraction />
      <NeuralNetwork />
      <FloatingOrbs />
      <ParticleMorph />
      <LiquidBlob />
      <MouseTrail />
      <MagneticCursor />
      <ScrollProgress />
      <AudioManager />
      <Header />
      <div className="relative z-10">
        <HeroSection />
        
        <InfiniteMarquee />
        
        <SectionTransition direction="diagonal-right" delay={100}>
          <MissionSection />
        </SectionTransition>
        
        <SectionTransition direction="diagonal-left" delay={200}>
          <ValuesSection />
        </SectionTransition>
        
        <SectionTransition direction="right" delay={100}>
          <BenefitsSection />
        </SectionTransition>
        
        <SectionTransition direction="diagonal-right" delay={150}>
          <FoundersSection />
        </SectionTransition>
        
        <SectionTransition direction="left" delay={200}>
          <CommunityDiagram />
        </SectionTransition>
        
        <SectionTransition direction="diagonal-left" delay={100}>
          <CTASection />
        </SectionTransition>
        
        <Footer />
      </div>
    </div>
  )
}