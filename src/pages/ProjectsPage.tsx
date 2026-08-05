import { useEffect, useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { getAllProjects } from '../lib/projects'
import { enrichProjectsWithGitHub } from '../lib/github'
import type { Project } from '../types'

/**
 * 项目列表页
 */
export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(() => getAllProjects())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    enrichProjectsWithGitHub(getAllProjects()).then((enriched) => {
      if (mounted) {
        setProjects(enriched)
        setLoading(false)
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-semibold text-ink dark:text-ink-dark mb-4">
          Project
        </h1>
        <p className="text-ink-muted dark:text-ink-muted-dark">
          开源项目与技术实践
        </p>
      </header>

      {loading && projects.length === 0 && (
        <p className="text-center text-ink-muted dark:text-ink-muted-dark">加载中...</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => <ProjectCard key={project.id} project={project} />)
        ) : (
          <p className="text-center text-ink-muted dark:text-ink-muted-dark md:col-span-2">
            暂无项目，去 `src/data/projects.json` 添加吧
          </p>
        )}
      </div>
    </div>
  )
}
