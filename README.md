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
pnpm install
pnpm run dev        # 本地开发 http://localhost:4321
pnpm run build      # 构建 + 生成搜索索引到 dist/
pnpm run preview    # 预览构建产物
```

## 写一篇文章

文章在 Obsidian 知识库中编写，发布脚本会自动筛选**日期等于今天**的笔记并迁移到博客：

1. 在知识库任意文件夹写下文章（frontmatter 带当天日期 `date: 2026-08-21`）
2. 运行 `publish.ps1`，自动完成：迁移文章 + 复制本地图片 → 构建 → 双分支推送

frontmatter 示例：

```yaml
---
title: "文章标题"
date: "2026-08-21"
categories:
  - 分类
tags:
  - 标签
cover: ""        # 可选封面图
---
```

完整日常操作（发布、删除文章、更新 About/Project、发 Memo）见 `references/Guidance.md`。

## 发布部署

发布 = 迁移今日文章 + 构建 + 双分支推送，**不依赖 GitHub Actions**：

```powershell
.\scripts\publish.ps1                    # 默认提交信息
.\scripts\publish.ps1 -DryRun            # 仅预览今日待迁移文章，不发布
.\scripts\publish.ps1 -Message "feat: 新增 xx 文章"
```

流程：扫描知识库迁移今日文章（含本地图片）→ 构建站点 → 提交并推送 `main`（源码）→ 产物推送到 `gh-pages`（站点实际 serve 的分支）。每次构建前自动清理旧缓存，避免已删除的内容残留。

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

Memo 页还支持：

- **标签**：正文里写 `#标签` 会渲染成可点击标签，输入 `#` 会弹出已有标签候选（↑↓ 选择 / Enter 确认）；点击标签即可聚合显示该标签的 Memo（地址栏 `#tag=xxx` 可分享，刷新保持）
- **搜索**：列表上方的搜索框同时匹配正文和标签
- **引用跳转**：点击引用标识会跳到被引用 Memo 的**头部**（能看到它的发布时间和作者信息，而不是卡片中部）

> 读取顺序：带 token 走 GitHub API（实时）→ 无 token 走 API → jsDelivr CDN → raw.githubusercontent，层层降级。数据分支、文件路径可在 `src/config.ts` 的 `memoRepo` / `memoBranch` 修改。

## 配置站点信息

所有站点配置集中在 `src/config.ts`：站点名、Slogan、作者、头像、社媒链接、Memo 仓库地址。

- **社媒链接**：`socials` 数组，`url` 留空则不显示。支持小红书 / X / GitHub / RSS / Email，可随意扩展
- **头像 / Favicon**：`public/avatar.png`（Memo 头像）、`public/favicon.png`（站点图标），直接覆盖同名文件即可

## 关于页

编辑 `src/content/about.md`，写入你自己的介绍。AI 数字分身等扩展功能见 `references/PRD.md`。

## 目录结构

```
├── public/                 # 静态资源（favicon、avatar、images）
├── scripts/
│   └── publish.ps1         # 迁移今日文章 + 构建 + 双分支发布
├── src/
│   ├── components/         # 组件（Navbar/Hero/MemoApp/TableOfContents...）
│   ├── content/
│   │   ├── articles/       # 文章 Markdown（发布脚本自动迁移）
│   │   └── about.md        # 关于页
│   ├── data/projects.json  # 项目数据
│   ├── layouts/            # 布局
│   ├── lib/                # 工具（memo API、格式化）
│   ├── pages/              # 路由页面
│   ├── config.ts           # 站点配置
│   └── styles/             # 全局样式与主题
├── references/
│   ├── PRD.md              # 产品需求文档
│   └── Guidance.md         # 日常操作手册
└── astro.config.mjs
```

## 常见问题

- **搜索不生效**：搜索索引是 `pnpm run build` 时才生成的，`pnpm run dev` 下不可用，用 `pnpm run preview` 预览构建产物
- **Memo 照片打不开**：照片走 jsDelivr CDN 加载，若网络异常会自动降级重试
- **页面 404**：仓库 Settings → Pages 需选择 gh-pages 分支
