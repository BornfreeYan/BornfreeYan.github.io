import { Archive } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getArchiveByYear, formatDate } from '../lib/articles'

/**
 * 归档页
 */
export function ArchivePage() {
  const archive = getArchiveByYear()

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-ink dark:text-ink-dark mb-4">
          Archive
        </h1>
        <p className="text-ink-muted dark:text-ink-muted-dark">
          文章按时间归档
        </p>
      </header>

      <div className="space-y-12">
        {archive.map((yearGroup) => (
          <div key={yearGroup.year}>
            <h2 className="font-heading text-2xl font-semibold text-ink dark:text-ink-dark mb-6 flex items-center gap-2">
              <Archive className="w-5 h-5 text-accent dark:text-accent-dark" />
              {yearGroup.year}
            </h2>

            <div className="space-y-6">
              {yearGroup.months.map((monthGroup) => (
                <div key={monthGroup.month} className="pl-4 border-l-2 border-border dark:border-border-dark">
                  <h3 className="text-lg font-medium text-ink-muted dark:text-ink-muted-dark mb-3">
                    {monthGroup.month} 月
                  </h3>
                  <div className="space-y-3">
                    {monthGroup.articles.map((article) => (
                      <Link
                        key={article.slug}
                        to={`/articles/${article.slug}`}
                        className="group flex items-center justify-between p-4 rounded-xl bg-card dark:bg-card-dark border border-border dark:border-border-dark hover:border-accent dark:hover:border-accent-dark card-hover pressable"
                      >
                        <span className="font-medium text-ink dark:text-ink-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                          {article.title}
                        </span>
                        <span className="text-sm text-ink-muted dark:text-ink-muted-dark">
                          {formatDate(article.date)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
