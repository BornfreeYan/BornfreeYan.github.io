import type { Project } from '../types'

/**
 * 项目本地数据
 */
import projectsData from '../data/projects.json'

/**
 * 获取所有项目
 */
export function getAllProjects(): Project[] {
  return projectsData.projects as Project[]
}

/**
 * 获取单个项目
 */
export function getProjectById(id: string): Project | undefined {
  return getAllProjects().find((project) => project.id === id)
}
