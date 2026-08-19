export async function fetchRepoStars(url: string): Promise<number | null> {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (!match) return null
  const owner = match[1]
  const repo = match[2].replace(/\.git$/, '')
  const cacheKey = `repo_stars_${owner}_${repo}`
  const cached = localStorage.getItem(cacheKey)
  if (cached) {
    try {
      const parsed = JSON.parse(cached)
      if (parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        return parsed.stars
      }
    } catch {
      localStorage.removeItem(cacheKey)
    }
  }
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
    clearTimeout(timer)
    if (!res.ok) return null
    const data = await res.json()
    const stars = data.stargazers_count ?? 0
    localStorage.setItem(cacheKey, JSON.stringify({ stars, timestamp: Date.now() }))
    return stars
  } catch {
    return null
  }
}