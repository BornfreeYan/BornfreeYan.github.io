import { useSearchParams, Link } from 'react-router-dom'
import { Folder } from 'lucide-react'
import { ArticleCard } from '../components/ArticleCard'
import { getAllCategories, getArticlesByCategory } from '../lib/articles'

/**
 * 分类页
 */
export function CategoriesPage() {
  const [searchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || ''

  const categories = getAllCategories()
  const filteredArticles = selectedCategory ? getArticlesByCategory(selectedCategory) : []

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-ink dark:text-ink-dark mb-4">
          Categories
        </h1>
        <p className="text-ink-muted dark:text-ink-muted-dark">
          {categories.length} 个分类
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/categories?category=${encodeURIComponent(category.name)}`}
            className={`p-4 rounded-2xl border card-hover pressable ${
              selectedCategory === category.name
                ? 'border-accent dark:border-accent-dark bg-accent/5 dark:bg-accent-dark/5'
                : 'border-border dark:border-border-dark bg-card dark:bg-card-dark hover:border-accent dark:hover:border-accent-dark'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Folder className="w-4 h-4 text-accent dark:text-accent-dark" />
              <span className="font-medium text-ink dark:text-ink-dark">{category.name}</span>
            </div>
            <div className="text-sm text-ink-muted dark:text-ink-muted-dark">
              {category.count} 篇文章
            </div>
          </Link>
        ))}
      </div>

      {selectedCategory && (
        <div>
          <h2 className="font-heading text-2xl font-semibold text-ink dark:text-ink-dark mb-6">
            {selectedCategory}
          </h2>
          <div className="space-y-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => <ArticleCard key={article.slug} article={article} />)
            ) : (
              <p className="text-ink-muted dark:text-ink-muted-dark">该分类下暂无文章</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
