import { MemoCard } from '../components/MemoCard'
import { getAllMemos } from '../lib/memos'

/**
 * Memo 列表页
 */
export function MemosPage() {
  const memos = getAllMemos()

  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-ink dark:text-ink-dark mb-4">
          Memo
        </h1>
        <p className="text-ink-muted dark:text-ink-muted-dark">
          碎片化的思考、日常与灵感
        </p>
      </header>

      <div>
        {memos.length > 0 ? (
          memos.map((memo) => <MemoCard key={memo.id} memo={memo} />)
        ) : (
          <p className="text-center text-ink-muted dark:text-ink-muted-dark">暂无 Memo</p>
        )}
      </div>
    </div>
  )
}
