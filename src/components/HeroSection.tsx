import { SocialLinks } from './SocialLinks'

/**
 * 首页 Hero 区域
 */
export function HeroSection() {
  return (
    <section className="min-h-[35vh] md:min-h-[30vh] flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-12 py-8 md:py-12">
      {/* Manifesto + Social Links */}
      <div className="flex-1 max-w-2xl order-2 md:order-1">
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight text-ink dark:text-ink-dark mb-4">
          Revere time, defend attention.
          <br />
          <span className="text-ink-muted dark:text-ink-muted-dark">
            Forever curious, forever optimistic.
          </span>
        </h1>
        <p className="text-base md:text-lg text-ink-muted dark:text-ink-muted-dark leading-relaxed mb-6">
          敬畏时间，捍卫注意力。永远好奇，永远乐观。
        </p>
        <SocialLinks className="justify-start" />
      </div>

      {/* Piano Placeholder */}
      <div className="flex-1 max-w-sm w-full order-1 md:order-2">
        <div className="aspect-square rounded-3xl bg-card dark:bg-card-dark border border-border dark:border-border-dark shadow-sm flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-ivory dark:bg-ivory-dark border border-border dark:border-border-dark flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-10 h-10 text-accent dark:text-accent-dark"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="10" width="18" height="10" rx="1" />
                <path d="M6 10V7a2 2 0 0 1 4 0v3" />
                <path d="M10 10V6a2 2 0 0 1 4 0v4" />
                <path d="M14 10V7a2 2 0 0 1 4 0v3" />
              </svg>
            </div>
            <p className="text-sm text-ink-muted dark:text-ink-muted-dark">
              三角钢琴动效预留位
            </p>
            <p className="text-xs text-ink-muted/60 dark:text-ink-muted-dark/60 mt-1">
              v1.1 接入 Three.js 3D 动画
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
