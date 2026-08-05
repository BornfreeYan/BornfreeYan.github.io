import { useSearchParams } from 'react-router-dom'
import { Hash } from 'lucide-react'
import { ArticleCard } from '../components/ArticleCard'
import { getAllTags, getArticlesByTag } from '../lib/articles'

/**
 * 标签页
 */
export function TagsPage() {
  const [searchParams] = useSearchParams()
  const selectedTag = searchParams.get('tag') || ''

  const tags = getAllTags()
  const filteredArticles = selectedTag ? getArticlesByTag(selectedTag) : []

  const maxCount = tags.length > 0 ? Math.max(...tags.map((t) => t.count)) : 1

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-semibold text-ink dark:text-ink-dark mb-4">
          Tags
        </h1>
        <p className="text-ink-muted dark:text-ink-muted-dark">
          {tags.length} 个标签
        </p>
      </header>

      <div className="flex flex-wrap gap-3 mb-12">
        {tags.map((tag) => {
          const size = Math.max(0.875, 1 + (tag.count / maxCount) * 0.5)
          return (
            <a
              key={tag.name}
              href={`/tags?tag=${encodeURIComponent(tag.name)}`}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all duration-300 ${
                selectedTag === tag.name
                  ? 'border-accent dark:border-accent-dark bg-accent/5 dark:bg-accent-dark/5'
                  : 'border-border dark:border-border-dark bg-card dark:bg-card-dark hover:border-accent dark:hover:border-accent-dark'
              }`}
              style={{ fontSize: `${size}rem` }}
            >
              <Hash className="w-4 h-4 text-accent dark:text-accent-dark" />
              <span className="text-ink dark:text-ink-dark">{tag.name}</span>
              <span className="text-ink-muted dark:text-ink-muted-dark text-sm">{tag.count}</span>
            </a>
          )
        })}
      </div>

      {selectedTag && (
        <div>
          <h2 className="font-heading text-2xl font-semibold text-ink dark:text-ink-dark mb-6">
            #{selectedTag}
          </h2>
          <div className="space-y-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => <ArticleCard key={article.slug} article={article} />)
            ) : (
              <p className="text-ink-muted dark:text-ink-muted-dark">该标签下暂无文章</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
