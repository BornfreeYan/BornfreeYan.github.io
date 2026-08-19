export interface Project {
  title: string
  description: string
  github?: string
  demo?: string
  tags: string[]
  featured?: boolean
}

export interface ProjectFile {
  projects: Project[]
}