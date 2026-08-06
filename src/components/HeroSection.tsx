import { SocialLinks } from './SocialLinks'
import { SunOrnament } from './SunOrnament'

/**
 * 首页 Hero 区域
 * 方案 A：巨型衬线水印 "Born Free." + 细线太阳纹章，融入米白背景，无卡片、无边框。
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[80vh] md:min-h-[85vh] flex items-center py-12 md:py-16">
      {/* 背景层：巨型衬线水印 + 柔和辉光 + 太阳纹章 */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {/* 巨型衬线水印 */}
        <span className="absolute -left-[1%] bottom-[2%] whitespace-nowrap font-heading font-semibold leading-none tracking-tight text-accent/[0.09] dark:text-accent-dark/[0.08] text-[clamp(4.5rem,17vw,17rem)]">
          Born&nbsp;Free.
        </span>

        {/* 柔和辉光（太阳背后） */}
        <div className="absolute right-[-4%] top-1/2 -translate-y-1/2 w-[min(64vw,620px)] aspect-square">
          <div className="w-full h-full rounded-full hero-glow glow-pulse" />
        </div>

        {/* 细线太阳纹章 */}
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[min(58vw,540px)] aspect-square">
          <SunOrnament className="w-full h-full text-accent/70 dark:text-accent-dark/60" />
        </div>
      </div>

      {/* 前景内容 */}
      <div className="relative z-10 w-full max-w-3xl px-6 md:px-10">
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
    </section>
  )
}
