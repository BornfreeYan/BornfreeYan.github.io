/**
 * 博客全局类型定义
 */

/** 文章 frontmatter 与元数据 */
export interface Article {
  slug: string
  title: string
  date: string
  categories: string[]
  tags: string[]
  description?: string
  cover?: string
  content: string
}

/** 项目数据 */
export interface Project {
  id: string
  name?: string
  description: string
  tech: string[]
  github: string
  demo?: string
  cover?: string
  stars?: number
}

/** Memo 数据 */
export interface Memo {
  id: string
  content: string
  images?: string[]
  date: string
  tags?: string[]
}

/** 文章索引，用于列表展示 */
export interface ArticleMeta {
  slug: string
  title: string
  date: string
  categories: string[]
  tags: string[]
  description?: string
  cover?: string
}
