import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

/**
 * 404 页面
 */
export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-heading text-6xl font-semibold text-ink dark:text-ink-dark mb-4">
        404
      </h1>
      <p className="text-lg text-ink-muted dark:text-ink-muted-dark mb-8">
        这个页面似乎不存在
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ink dark:bg-ink-dark text-ivory dark:text-ivory-dark hover:bg-accent dark:hover:bg-accent-dark transition-colors"
      >
        <Home className="w-4 h-4" />
        回到首页
      </Link>
    </div>
  )
}
