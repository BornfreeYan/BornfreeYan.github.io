import { parseFrontmatter } from '../lib/frontmatter'
import { MarkdownRenderer } from '../components/MarkdownRenderer'

/**
 * 关于页面
 */
const aboutModules = import.meta.glob('/src/content/about.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export function AboutPage() {
  const content = (Object.values(aboutModules)[0] as string) || ''
  const { content: body } = parseFrontmatter(content)

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-semibold text-ink dark:text-ink-dark mb-4">
          About
        </h1>
        <p className="text-ink-muted dark:text-ink-muted-dark">
          关于我，关于这个网站
        </p>
      </header>

      <MarkdownRenderer content={body} />
    </div>
  )
}
