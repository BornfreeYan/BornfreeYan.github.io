import { HeroSection } from '../components/HeroSection'
import { SocialLinks } from '../components/SocialLinks'
import { CoreShowcase } from '../components/CoreShowcase'
import { StatsSection } from '../components/StatsSection'

/**
 * 首页
 */
export function HomePage() {
  return (
    <div>
      <HeroSection />
      <SocialLinks />
      <CoreShowcase />
      <StatsSection />
    </div>
  )
}
