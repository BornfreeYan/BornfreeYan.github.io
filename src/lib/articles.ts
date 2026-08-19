import { getCollection, type CollectionEntry } from 'astro:content'

export const PAGE_SIZE = 10

export async function getSortedArticles(): Promise<CollectionEntry<'articles'>[]> {
  const all = await getCollection('articles')
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

export function getPageCount(total: number): number {
  return Math.max(1, Math.ceil(total / PAGE_SIZE))
}