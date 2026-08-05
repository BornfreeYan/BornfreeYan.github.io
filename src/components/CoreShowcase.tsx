import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ArticleCard } from './ArticleCard'
import { ProjectCard } from './ProjectCard'
import { MemoCard } from './MemoCard'
import { getAllArticleMetas } from '../lib/articles'
import { getAllProjects } from '../lib/projects'
import { getAllMemos } from '../lib/memos'

/**
 * 首页三核心展示：Article / Project / Memo
 */
export function CoreShowcase() {
  const latestArticles = getAllArticleMetas().slice(0, 3)
  const latestProjects = getAllProjects().slice(0, 3)
  const latestMemos = getAllMemos().slice(0, 3)

  return (
    <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Article */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-semibold text-ink dark:text-ink-dark">Article</h2>
            <Link
              to="/articles"
              className="inline-flex items-center gap-1 text-sm text-ink-muted dark:text-ink-muted-dark hover:text-accent dark:hover:text-accent-dark transition-colors"
            >
              全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {latestArticles.length > 0 ? (
              latestArticles.map((article) => <ArticleCard key={article.slug} article={article} compact />)
            ) : (
              <p className="text-sm text-ink-muted dark:text-ink-muted-dark">暂无文章</p>
            )}
          </div>
        </div>

        {/* Project */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-semibold text-ink dark:text-ink-dark">Project</h2>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-sm text-ink-muted dark:text-ink-muted-dark hover:text-accent dark:hover:text-accent-dark transition-colors"
            >
              全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {latestProjects.length > 0 ? (
              latestProjects.map((project) => <ProjectCard key={project.id} project={project} />)
            ) : (
              <p className="text-sm text-ink-muted dark:text-ink-muted-dark">暂无项目</p>
            )}
          </div>
        </div>

        {/* Memo */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-semibold text-ink dark:text-ink-dark">Memo</h2>
            <Link
              to="/memos"
              className="inline-flex items-center gap-1 text-sm text-ink-muted dark:text-ink-muted-dark hover:text-accent dark:hover:text-accent-dark transition-colors"
            >
              全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-0">
            {latestMemos.length > 0 ? (
              latestMemos.map((memo) => <MemoCard key={memo.id} memo={memo} />)
            ) : (
              <p className="text-sm text-ink-muted dark:text-ink-muted-dark">暂无 Memo</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
