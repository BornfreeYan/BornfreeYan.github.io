import rss from '@astrojs/rss'
import { getSortedArticles } from '../lib/articles'
import { excerptFromMarkdown } from '../lib/format'
import { siteConfig } from '../config'

export async function GET(context: { site: string }) {
  const posts = await getSortedArticles()
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/articles/${post.id}/`,
      description: excerptFromMarkdown(post.body ?? ''),
    })),
    customData: `<language>zh-cn</language>`,
  })
}