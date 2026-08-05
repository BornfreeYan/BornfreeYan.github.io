import { Link } from 'react-router-dom'
import { Calendar, Tag } from 'lucide-react'
import type { ArticleMeta } from '../types'
import { formatDate } from '../lib/articles'

/**
 * 文章卡片
 */
interface ArticleCardProps {
  article: ArticleMeta
  compact?: boolean
}

export function ArticleCard({ article, compact = false }: ArticleCardProps) {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group block p-5 rounded-2xl bg-card dark:bg-card-dark border border-border dark:border-border-dark hover:border-accent dark:hover:border-accent-dark hover:shadow-sm transition-all duration-300"
    >
      <div className="flex items-center gap-2 text-xs text-ink-muted dark:text-ink-muted-dark mb-2">
        <Calendar className="w-3 h-3" />
        <span>{formatDate(article.date)}</span>
      </div>

      <h3 className="font-heading text-lg font-semibold text-ink dark:text-ink-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors mb-2">
        {article.title}
      </h3>

      {!compact && article.description && (
        <p className="text-sm text-ink-muted dark:text-ink-muted-dark line-clamp-2 mb-3">
          {article.description}
        </p>
      )}

      {article.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-ivory dark:bg-ivory-dark text-ink-muted dark:text-ink-muted-dark"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
