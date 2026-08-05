import { FileText, GitBranch, StickyNote, Calendar } from 'lucide-react'
import { getAllArticleMetas } from '../lib/articles'
import { getAllProjects } from '../lib/projects'
import { getAllMemos } from '../lib/memos'

/**
 * 首页数据统计区
 */
export function StatsSection() {
  const articles = getAllArticleMetas()
  const projects = getAllProjects()
  const memos = getAllMemos()

  // 站点运行天数：从项目创建日期开始计算
  const startDate = new Date('2026-08-05')
  const runningDays = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  const stats = [
    { label: '文章', value: articles.length, icon: FileText },
    { label: '项目', value: projects.length, icon: GitBranch },
    { label: 'Memo', value: memos.length, icon: StickyNote },
    { label: '运行天数', value: runningDays, icon: Calendar },
  ]

  return (
    <section className="py-16 border-t border-border dark:border-border-dark">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card dark:bg-card-dark border border-border dark:border-border-dark"
            >
              <Icon className="w-6 h-6 mx-auto mb-3 text-accent dark:text-accent-dark" />
              <div className="font-heading text-3xl font-semibold text-ink dark:text-ink-dark mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-ink-muted dark:text-ink-muted-dark">{stat.label}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
