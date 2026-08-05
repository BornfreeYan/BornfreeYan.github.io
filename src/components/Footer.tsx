import { ArrowUp, Github, Rss } from 'lucide-react'

/**
 * 页面底部
 */
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-border dark:border-border-dark bg-ivory dark:bg-ivory-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-ink-muted dark:text-ink-muted-dark">
            © {new Date().getFullYear()} Bornfree. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/BornfreeYan/BornfreeYan"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-ink-muted dark:text-ink-muted-dark hover:bg-ivory dark:hover:bg-ivory-dark/50 hover:text-ink dark:hover:text-ink-dark transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="/rss.xml"
              className="p-2 rounded-lg text-ink-muted dark:text-ink-muted-dark hover:bg-ivory dark:hover:bg-ivory-dark/50 hover:text-ink dark:hover:text-ink-dark transition-colors"
              aria-label="RSS"
            >
              <Rss className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg text-ink-muted dark:text-ink-muted-dark hover:bg-ivory dark:hover:bg-ivory-dark/50 hover:text-ink dark:hover:text-ink-dark transition-colors"
              aria-label="回到顶部"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
