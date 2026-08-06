import { SocialLinks } from './SocialLinks'
import { BirdEmblem } from './BirdEmblem'

/**
 * 首页 Hero 区域
 */
export function HeroSection() {
  return (
    <section className="min-h-[80vh] md:min-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 lg:gap-12 py-12 md:py-16">
      {/* Manifesto + Social Links */}
      <div className="flex-[1.5] max-w-3xl order-2 md:order-1">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] tracking-tight text-ink dark:text-ink-dark mb-5 animate-fade-in-up hero-enter-1">
          Revere time, defend attention.
          <br />
          <span className="text-ink-muted dark:text-ink-muted-dark">
            Forever curious, forever optimistic.
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-ink-muted dark:text-ink-muted-dark leading-relaxed mb-8 max-w-xl animate-fade-in-up hero-enter-2">
          敬畏时间，捍卫注意力。永远好奇，永远乐观。
        </p>
        <div className="animate-fade-in-up hero-enter-3">
          <SocialLinks className="justify-start" size="lg" />
        </div>
      </div>

      {/* 飞鸟图样 */}
      <div className="flex-1 max-w-md lg:max-w-lg w-full h-[340px] md:h-[420px] lg:h-[480px] order-1 md:order-2 animate-fade-in-up hero-enter-4">
        <BirdEmblem />
      </div>
    </section>
  )
}
