import LatticeBackground from '@/components/LatticeBackground'
import AmbientGrid from '@/components/AmbientGrid'
import WaveAnimation from '@/components/WaveAnimation'
import CursorInteraction from '@/components/CursorInteraction'
import NeuralNetwork from '@/components/NeuralNetwork'
import FloatingOrbs from '@/components/FloatingOrbs'
import DataStream from '@/components/DataStream'
import ScrollProgress from '@/components/ScrollProgress'
import SectionTransition from '@/components/SectionTransition'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MissionSection from '@/components/MissionSection'
import GoalsSection from '@/components/GoalsSection'
import ValuesSection from '@/components/ValuesSection'
import BenefitsSection from '@/components/BenefitsSection'
import FoundersSection from '@/components/FoundersSection'
import CommunityDiagram from '@/components/CommunityDiagram'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

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
      <ScrollProgress />
      <Header />
      <div className="relative z-10">
        <HeroSection />
        
        <SectionTransition direction="diagonal-right" delay={100}>
          <MissionSection />
        </SectionTransition>
        
        <SectionTransition direction="left" delay={150}>
          <GoalsSection />
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