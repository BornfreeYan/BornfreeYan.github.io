import { HeroSection } from '../components/HeroSection'
import { CoreShowcase } from '../components/CoreShowcase'
import { StatsSection } from '../components/StatsSection'

/**
 * 首页
 */
export function HomePage() {
  return (
    <div>
      <HeroSection />
      <CoreShowcase />
      <StatsSection />
    </div>
  )
}
