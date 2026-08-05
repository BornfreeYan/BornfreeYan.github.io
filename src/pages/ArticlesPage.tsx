import { ArticleCard } from '../components/ArticleCard'
import { getAllArticleMetas } from '../lib/articles'

/**
 * 文章列表页
 */
export function ArticlesPage() {
  const articles = getAllArticleMetas()

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-semibold text-ink dark:text-ink-dark mb-4">
          Article
        </h1>
        <p className="text-ink-muted dark:text-ink-muted-dark">
          技术博客、学习笔记与思考记录
        </p>
      </header>

      <div className="space-y-6">
        {articles.length > 0 ? (
          articles.map((article) => <ArticleCard key={article.slug} article={article} />)
        ) : (
          <p className="text-center text-ink-muted dark:text-ink-muted-dark">暂无文章</p>
        )}
      </div>
    </div>
  )
}
