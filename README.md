# BornfreeYan.github.io

个人博客 / 超级个体展示站点。Astro 静态站点 + GitHub Pages 部署 + GitHub API 在线 Memo。

**在线地址**：https://BornfreeYan.github.io

## 技术栈

- [Astro](https://astro.build/)（SSG）
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Pagefind](https://pagefind.app/)（构建时搜索索引，支持中文）
- [@astrojs/rss](https://docs.astro.build/en/guides/rss/) + sitemap

## 快速开始

```bash
npm install
npm run dev        # 本地开发 http://localhost:4321
npm run build      # 构建 + 生成搜索索引到 dist/
npm run preview    # 预览构建产物
```

## 写一篇文章

```powershell
# 交互式创建带 frontmatter 的文章文件
.\scripts\new-article.ps1
```

或手动在 `src/content/articles/` 新建 Markdown：

```yaml
---
title: "文章标题"
date: "2026-08-19"
categories:
  - 分类
tags:
  - 标签
---
```

分类/标签用中文即可，页面会自动生成分类页、标签页、归档时间线。

## 发布部署

发布 = 构建 + 双分支推送，**不依赖 GitHub Actions**：

```powershell
.\scripts\publish.ps1            # 默认提交信息
.\scripts\publish.ps1 -Message "feat: 新增 xx 文章"
```

流程：构建站点 → 提交并推送 `main`（源码）→ 产物推送到 `gh-pages`（站点实际 serve 的分支）。

**首次部署**需在仓库 Settings → Pages 设置：
- Source：`Deploy from a branch`
- Branch：`gh-pages` / root

## 项目页（Projects）

编辑 `src/data/projects.json`：

```json
{
  "projects": [
    {
      "title": "项目名",
      "description": "一句话简介",
      "github": "https://github.com/owner/repo",
      "demo": "https://example.com",
      "tags": ["FastAPI"],
      "featured": true
    }
  ]
}
```

- `github`：可选，页面构建后会自动拉取 star 数（24h 本地缓存）
- `demo`：可选，项目在线演示地址
- 改完跑 `publish.ps1` 即可

## Memo（在线发布）

Memo 是碎碎念，存在**本仓库的 `data` 分支**上（不占额外仓库、不影响 `main` 发布），通过 GitHub API 在线读写，**不需要重新构建**。

### 首次设置

1. 生成 fine-grained token（Settings → Developer settings → Fine-grained tokens）：
   - Repository access：仅 `BornfreeYan/BornfreeYan.github.io`
   - Permissions → Contents：**Read and write**
2. 打开站点 `/memos`，粘贴 token 连接（token 只存本浏览器 localStorage）

之后就能在 Memo 页发文字、传照片（浏览器自动压缩后上传）、删除，实时生效。

> 读取顺序：带 token 走 GitHub API（实时）→ 无 token 走 API → jsDelivr CDN → raw.githubusercontent，层层降级。数据分支、文件路径可在 `src/config.ts` 的 `memoRepo` / `memoBranch` 修改。

## 配置站点信息

所有站点配置集中在 `src/config.ts`：站点名、Slogan、作者、社媒链接、统计开关、Memo 仓库地址。

- **社媒链接**：`socials` 数组，`url` 留空则不显示。支持小红书 / X / GitHub / RSS / Email，可随意扩展
- **正常运行时间**：去 [UptimeRobot](https://uptimerobot.com/) 免费建监控，拿到状态徽章 URL 填入 `uptimeBadgeUrl`
- **访问量**：使用不蒜子（busuanzi），无需配置

## 关于页

编辑 `src/content/about.md`，写入你自己的介绍。AI 数字分身等扩展功能见 `references/PRD.md`。

## 目录结构

```
├── public/                 # 静态资源（favicon）
├── scripts/
│   ├── publish.ps1         # 构建 + 双分支发布
│   └── new-article.ps1     # 新建文章
├── src/
│   ├── components/         # 组件（Navbar/Hero/Marquee/MemoApp...）
│   ├── content/
│   │   ├── articles/       # 文章 Markdown
│   │   └── about.md        # 关于页
│   ├── data/projects.json  # 项目数据
│   ├── layouts/            # 布局
│   ├── lib/                # 工具（memo API、github、格式化）
│   ├── pages/              # 路由页面
│   ├── config.ts           # 站点配置
│   └── styles/             # 全局样式与主题
├── references/PRD.md       # 产品需求文档
└── astro.config.mjs
```

## 常见问题

- **搜索不生效**：搜索索引是 `npm run build` 时才生成的，`npm run dev` 下不可用，用 `npm run preview` 预览构建产物
- **Memo 照片打不开**：照片走 jsDelivr CDN 加载，若网络异常会自动降级重试
- **页面 404**：仓库 Settings → Pages 需选择 gh-pages 分支
