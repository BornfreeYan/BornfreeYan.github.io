import { parse } from 'yaml'

/**
 * 解析 Markdown 文件的 frontmatter
 */
export interface FrontmatterResult<T = Record<string, unknown>> {
  data: T
  content: string
}

export function parseFrontmatter<T = Record<string, unknown>>(content: string): FrontmatterResult<T> {
  const trimmed = content.trim()

  if (!trimmed.startsWith('---')) {
    return { data: {} as T, content: trimmed }
  }

  const endIndex = trimmed.indexOf('---', 3)
  if (endIndex === -1) {
    return { data: {} as T, content: trimmed }
  }

  const frontmatterText = trimmed.slice(3, endIndex).trim()
  const body = trimmed.slice(endIndex + 3).trim()

  let data: Record<string, unknown> = {}
  if (frontmatterText) {
    try {
      data = parse(frontmatterText) as Record<string, unknown>
    } catch {
      data = {}
    }
  }

  return { data: data as T, content: body }
}
