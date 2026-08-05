import type { Memo } from '../types'

/**
 * Memo 本地数据
 */
import memosData from '../content/memos/memos.json'

/**
 * 获取所有 Memo，按时间倒序
 */
export function getAllMemos(): Memo[] {
  return (memosData.memos as Memo[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * 格式化 Memo 日期
 */
export function formatMemoDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
