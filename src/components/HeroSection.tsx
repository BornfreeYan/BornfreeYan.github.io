import { SocialLinks } from './SocialLinks'

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

      {/* Piano Placeholder */}
      <div className="flex-1 max-w-md lg:max-w-md w-full order-1 md:order-2 animate-fade-in-up hero-enter-4">
        <div className="aspect-[4/3] rounded-[2rem] bg-card dark:bg-card-dark border border-border dark:border-border-dark shadow-sm flex items-center justify-center p-10 card-hover">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-[1.25rem] bg-ivory dark:bg-ivory-dark border border-border dark:border-border-dark flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-12 h-12 text-accent dark:text-accent-dark"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="10" width="18" height="10" rx="1" />
                <path d="M6 10V7a2 2 0 0 1 4 0v3" />
                <path d="M10 10V6a2 2 0 0 1 4 0v4" />
                <path d="M14 10V7a2 2 0 0 1 4 0v3" />
              </svg>
            </div>
            <p className="text-base text-ink-muted dark:text-ink-muted-dark">
              三角钢琴动效预留位
            </p>
            <p className="text-sm text-ink-muted/60 dark:text-ink-muted-dark/60 mt-2">
              v1.1 接入 Three.js 3D 动画
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
