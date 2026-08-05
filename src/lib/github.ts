import type { Project } from '../types'

/**
 * 从 GitHub URL 中提取 owner 和 repo
 */
export function parseGitHubRepo(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (!match) return null
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') }
}

/**
 * 获取 GitHub 仓库信息（name, stars）
 * 失败时返回 null
 */
export async function fetchGitHubRepoInfo(url: string): Promise<{ name: string; stars: number } | null> {
  const parsed = parseGitHubRepo(url)
  if (!parsed) return null

  const { owner, repo } = parsed
  const cacheKey = `github_repo_${owner}_${repo}`
  const cached = localStorage.getItem(cacheKey)

  if (cached) {
    try {
      const data = JSON.parse(cached)
      if (data.timestamp && Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
        return data.info
      }
    } catch {
      localStorage.removeItem(cacheKey)
    }
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) return null

    const data = await response.json()
    const info = {
      name: data.full_name || `${owner}/${repo}`,
      stars: data.stargazers_count || 0,
    }

    localStorage.setItem(cacheKey, JSON.stringify({ info, timestamp: Date.now() }))
    return info
  } catch {
    return null
  }
}

/**
 * 批量获取项目 GitHub 信息并合并到项目中
 */
export async function enrichProjectsWithGitHub(projects: Project[]): Promise<Project[]> {
  const enriched = await Promise.all(
    projects.map(async (project) => {
      if (!project.github) return project
      const info = await fetchGitHubRepoInfo(project.github)
      if (!info) return project
      return {
        ...project,
        name: info.name,
        stars: info.stars,
      }
    })
  )

  return enriched
}
