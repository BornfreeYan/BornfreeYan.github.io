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
  stats51laId: string
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
      url: 'https://xhslink.cn/m/5DbIxl50YGT',
      icon: 'book',
    },
    {
      label: 'X',
      url: 'https://x.com/yanbornfree',
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
      url: 'mailto:1700807190@qq.com',
      icon: 'email',
    },
  ],
  // UptimeRobot 状态徽章地址；留空则不显示徽章（显示 "—" 占位）
  uptimeBadgeUrl: '',
  // 51.la 站点 ID（https://www.51.la 注册后获取）；留空则统计卡片显示"待接入"
  stats51laId: '',
  memoRepo: 'BornfreeYan/BornfreeYan.github.io',
  memoBranch: 'data',
  memoFile: 'memos.json',
  memoImagesDir: 'images',
}

export function visibleSocials(): Social[] {
  return siteConfig.socials.filter((s) => s.url !== '')
}