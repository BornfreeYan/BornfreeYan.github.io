import { SocialLinks } from './SocialLinks'
import { SunOrnament } from './SunOrnament'

/**
 * 首页 Hero 区域
 * 方案 A：巨型衬线水印 "Born Free." + 细线太阳纹章，融入米白背景，无卡片、无边框。
 * 整体内容上移约 8mm（保持 hero min-height 不变，不露出下方内容）。
 */
export function HeroSection() {
  return (
    <section className="full-bleed relative overflow-hidden min-h-[80vh] md:min-h-[85vh]">
      {/* 整体内容上移 8mm 的包装层 */}
      <div className="absolute inset-0 -translate-y-6 md:-translate-y-8">
        {/* 背景层：巨型衬线水印 + 柔和辉光 + 太阳纹章 */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          {/* 巨型衬线水印：斜体 + 倾斜 30°（以左下角为锚点，避免被裁掉），与正文格言区分 */}
          <span className="absolute left-[1%] bottom-[4%] origin-bottom-left whitespace-nowrap font-heading font-semibold italic leading-none tracking-tight text-accent/[0.09] dark:text-accent-dark/[0.08] text-[clamp(4.5rem,17vw,17rem)] skew-x-[-30deg]">
            Born&nbsp;Free.
          </span>

          {/* 柔和辉光（太阳背后） */}
          <div className="absolute right-[1%] top-1/2 -translate-y-1/2 w-[min(64vw,620px)] aspect-square">
            <div className="w-full h-full rounded-full hero-glow glow-pulse" />
          </div>

          {/* 太阳纹章 */}
          <div className="absolute right-[1%] top-1/2 -translate-y-1/2 w-[min(58vw,540px)] aspect-square">
            <SunOrnament className="w-full h-full" />
          </div>
        </div>

        {/* 前景内容：与页面容器（max-w-6xl）对齐 */}
        <div className="relative z-10 flex h-full items-center">
          <div className="w-full max-w-6xl mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] tracking-tight text-ink dark:text-ink-dark mb-5 animate-fade-in-up hero-enter-1 [text-shadow:0_2px_6px_rgba(44,40,36,0.10)] dark:[text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
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
          </div>
        </div>
      </div>
    </section>
  )
}
