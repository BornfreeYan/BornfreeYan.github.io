import { useParams, Navigate, Link } from 'react-router-dom'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { getArticleBySlug, formatDate } from '../lib/articles'

/**
 * 单篇文章页
 */
export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return <Navigate to="/404" replace />
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        to="/articles"
        className="inline-flex items-center gap-1 text-sm text-ink-muted dark:text-ink-muted-dark hover:text-accent dark:hover:text-accent-dark transition-colors pressable mb-8 rounded-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        返回文章列表
      </Link>

      <header className="mb-10">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-ink dark:text-ink-dark mb-4">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-ink-muted dark:text-ink-muted-dark">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(article.date)}
          </span>

          {article.categories.length > 0 && (
            <span className="inline-flex items-center gap-2">
              {article.categories.map((category) => (
                <Link
                  key={category}
                  to={`/categories?category=${encodeURIComponent(category)}`}
                  className="hover:text-accent dark:hover:text-accent-dark transition-colors nav-link-underline"
                >
                  {category}
                </Link>
              ))}
            </span>
          )}
        </div>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Tag className="w-4 h-4 text-ink-muted dark:text-ink-muted-dark" />
            {article.tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags?tag=${encodeURIComponent(tag)}`}
                className="text-sm px-3 py-1 rounded-full bg-ivory dark:bg-ivory-dark text-ink-muted dark:text-ink-muted-dark hover:text-accent dark:hover:text-accent-dark transition-colors pressable tracking-wide"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <MarkdownRenderer content={article.content} />
    </article>
  )
}
