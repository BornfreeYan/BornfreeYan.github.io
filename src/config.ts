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
  avatar: string
  lang: string
  socials: Social[]
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
  avatar: '/avatar.png',
  lang: 'zh-CN',
  socials: [
    {
      label: 'GitHub',
      url: 'https://github.com/BornfreeYan',
      icon: 'github',
    },
    {
      label: '小红书',
      url: 'https://xhslink.cn/m/5DbIxl50YGT',
      icon: 'book',
    },
    {
      label: 'X',
      url: 'https://x.com/yanbornfree',
      icon: 'x',
    },
    {
      label: 'RSS',
      url: '/rss.xml',
      icon: 'rss',
    },
    {
      label: 'Email',
      url: '1700807190@qq.com',
      icon: 'email',
    },
  ],
  memoRepo: 'BornfreeYan/BornfreeYan.github.io',
  memoBranch: 'data',
  memoFile: 'memos.json',
  memoImagesDir: 'images',
}

export function visibleSocials(): Social[] {
  return siteConfig.socials.filter((s) => s.url !== '')
}