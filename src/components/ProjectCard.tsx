import { Github, ExternalLink, Star } from 'lucide-react'
import type { Project } from '../types'

/**
 * 项目卡片
 */
interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group p-5 rounded-2xl bg-card dark:bg-card-dark border border-border dark:border-border-dark hover:border-accent dark:hover:border-accent-dark card-hover pressable">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-heading text-lg font-semibold text-ink dark:text-ink-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
          {project.name || project.id}
        </h3>
        {typeof project.stars === 'number' && (
          <span className="inline-flex items-center gap-1 text-xs text-ink-muted dark:text-ink-muted-dark">
            <Star className="w-3 h-3" />
            {project.stars}
          </span>
        )}
      </div>

      <p className="text-sm text-ink-muted dark:text-ink-muted-dark mb-4 line-clamp-3">
        {project.description}
      </p>

      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-full bg-ivory dark:bg-ivory-dark text-ink-muted dark:text-ink-muted-dark border border-border dark:border-border-dark tracking-wide"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted dark:text-ink-muted-dark hover:text-accent dark:hover:text-accent-dark transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted dark:text-ink-muted-dark hover:text-accent dark:hover:text-accent-dark transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Demo
          </a>
        )}
      </div>
    </div>
  )
}
