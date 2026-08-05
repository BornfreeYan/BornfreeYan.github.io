import { formatMemoDate } from '../lib/memos'
import type { Memo } from '../types'

/**
 * Memo 时间线卡片
 */
interface MemoCardProps {
  memo: Memo
}

export function MemoCard({ memo }: MemoCardProps) {
  return (
    <div className="relative pl-8 pb-8 border-l border-border dark:border-border-dark last:pb-0">
      {/* Timeline dot */}
      <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-accent dark:bg-accent-dark ring-4 ring-ivory dark:ring-ivory-dark" />

      <div className="p-5 rounded-2xl bg-card dark:bg-card-dark border border-border dark:border-border-dark">
        <div className="text-xs text-ink-muted dark:text-ink-muted-dark mb-2">
          {formatMemoDate(memo.date)}
        </div>
        <p className="text-sm text-ink dark:text-ink-dark leading-relaxed whitespace-pre-wrap mb-3">
          {memo.content}
        </p>

        {memo.images && memo.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {memo.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="rounded-xl object-cover aspect-square"
              />
            ))}
          </div>
        )}

        {memo.tags && memo.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {memo.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-ivory dark:bg-ivory-dark text-ink-muted dark:text-ink-muted-dark"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
