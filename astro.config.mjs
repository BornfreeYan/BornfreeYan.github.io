import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import { unified } from '@astrojs/markdown-remark'

export default defineConfig({
  site: 'https://BornfreeYan.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified(),
  },
})