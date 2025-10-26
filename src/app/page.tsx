import LatticeBackground from '@/components/LatticeBackground'
import FloatingParticles from '@/components/FloatingParticles'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MissionSection from '@/components/MissionSection'
import WhoIsThisForSection from '@/components/WhoIsThisForSection'
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
      <FloatingParticles />
      <Header />
      <div className="relative z-10">
        <HeroSection />
        <MissionSection />
        <WhoIsThisForSection />
        <GoalsSection />
        <ValuesSection />
        <BenefitsSection />
        <FoundersSection />
        <CommunityDiagram />
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}