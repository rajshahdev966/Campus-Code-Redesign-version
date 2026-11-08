import useScrollReveal from '../../hooks/useScrollReveal'
import HeroSection from '../components/HeroSection'
import KeywordMarquee from '../components/KeywordMarquee'
import AboutSection from '../components/AboutSection'
import ExperienceSection from '../components/ExperienceSection'
import HowItWorksSection from '../components/HowItWorksSection'
import HackathonsSection from '../components/HackathonsSection'
import MissionSection from '../components/MissionSection'
import JoinSection from '../components/JoinSection'
import SiteFooter from '../components/SiteFooter'
import CursorGlow from '../components/CursorGlow'

export default function LandingPage() {
  const pageRef = useScrollReveal()

  return (
    <div ref={pageRef}>
      <a href="#main-content" className="fixed left-4 top-4 z-50 -translate-y-24 bg-ink px-5 py-3 text-paper focus:translate-y-0">Skip to content</a>
      <main id="main-content">
        <HeroSection />
        <KeywordMarquee />
        <AboutSection />
        <ExperienceSection />
        <HowItWorksSection />
        <HackathonsSection />
        <MissionSection />
        <JoinSection />
      </main>
      <SiteFooter />
      <CursorGlow />
    </div>
  )
}
