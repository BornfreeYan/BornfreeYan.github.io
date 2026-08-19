export interface Social {
  label: string
  url: string
  icon: string
}

export interface SiteConfig {
  title: string
  site: string
  description: string
  sloganEn: string
  sloganZh: string
  author: string
  lang: string
  socials: Social[]
  uptimeBadgeUrl: string
  memoRepo: string
  memoBranch: string
  memoFile: string
  memoImagesDir: string
}

export const siteConfig: SiteConfig = {
  title: 'Bornfree',
  site: 'https://BornfreeYan.github.io',
  description: '敬畏时间，捍卫注意力。永远好奇，永远乐观',
  sloganEn: 'Revere time, defend your attention. Forever curious, forever optimistic',
  sloganZh: '敬畏时间，捍卫注意力。永远好奇，永远乐观',
  author: 'Bornfree',
  lang: 'zh-CN',
  socials: [
    {
      label: '小红书',
      url: '',
      icon: 'xiaohongshu',
    },
    {
      label: 'X',
      url: '',
      icon: 'x',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/BornfreeYan',
      icon: 'github',
    },
    {
      label: 'RSS',
      url: '/rss.xml',
      icon: 'rss',
    },
    {
      label: 'Email',
      url: '',
      icon: 'email',
    },
  ],
  uptimeBadgeUrl: '',
  memoRepo: 'BornfreeYan/blog-data',
  memoBranch: 'main',
  memoFile: 'memos.json',
  memoImagesDir: 'images',
}

export function visibleSocials(): Social[] {
  return siteConfig.socials.filter((s) => s.url !== '')
}