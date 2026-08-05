import { parseFrontmatter } from './frontmatter'
import type { Article, ArticleMeta } from '../types'

/**
 * 构建时加载所有 Markdown 文章
 */
const articleModules = import.meta.glob('/src/content/articles/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

/**
 * 解析所有文章并返回完整文章列表
 */
export function getAllArticles(): Article[] {
  const articles: Article[] = []

  for (const [path, content] of Object.entries(articleModules)) {
    const slug = path
      .replace('/src/content/articles/', '')
      .replace(/\.md$/, '')
      .replace(/\\/g, '/')

    const { data, content: body } = parseFrontmatter<{
      title?: string
      date?: string
      categories?: string[]
      tags?: string[]
      description?: string
      cover?: string
    }>(content as string)

    articles.push({
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString().split('T')[0],
      categories: data.categories || [],
      tags: data.tags || [],
      description: data.description || '',
      cover: data.cover || '',
      content: body,
    })
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * 获取文章元数据（不包含正文）
 */
export function getAllArticleMetas(): ArticleMeta[] {
  return getAllArticles().map(({ slug, title, date, categories, tags, description, cover }) => ({
    slug,
    title,
    date,
    categories,
    tags,
    description,
    cover,
  }))
}

/**
 * 根据 slug 获取单篇文章
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug)
}

/**
 * 获取所有分类
 */
export function getAllCategories(): { name: string; count: number }[] {
  const articles = getAllArticles()
  const categories = new Map<string, number>()

  for (const article of articles) {
    for (const category of article.categories) {
      categories.set(category, (categories.get(category) || 0) + 1)
    }
  }

  return Array.from(categories.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

/**
 * 获取所有标签
 */
export function getAllTags(): { name: string; count: number }[] {
  const articles = getAllArticles()
  const tags = new Map<string, number>()

  for (const article of articles) {
    for (const tag of article.tags) {
      tags.set(tag, (tags.get(tag) || 0) + 1)
    }
  }

  return Array.from(tags.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

/**
 * 按年月归档文章
 */
export function getArchiveByYear(): { year: string; months: { month: string; articles: ArticleMeta[] }[] }[] {
  const articles = getAllArticleMetas()
  const grouped = new Map<string, Map<string, ArticleMeta[]>>()

  for (const article of articles) {
    const date = new Date(article.date)
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')

    if (!grouped.has(year)) {
      grouped.set(year, new Map())
    }

    const yearGroup = grouped.get(year)!
    if (!yearGroup.has(month)) {
      yearGroup.set(month, [])
    }

    yearGroup.get(month)!.push(article)
  }

  return Array.from(grouped.entries())
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, months]) => ({
      year,
      months: Array.from(months.entries())
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([month, articles]) => ({ month, articles })),
    }))
}

/**
 * 按分类筛选文章
 */
export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticleMetas().filter((article) => article.categories.includes(category))
}

/**
 * 按标签筛选文章
 */
export function getArticlesByTag(tag: string): ArticleMeta[] {
  return getAllArticleMetas().filter((article) => article.tags.includes(tag))
}

/**
 * 格式化日期
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
