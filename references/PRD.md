# BornfreeYan 个人博客 PRD

> 项目：`BornfreeYan/BornfreeYan.github.io` 个人博客重建
> 状态：待审核（审核通过后进入开发）
> 日期：2026-08-19

## 1. 项目概述

个人"超级个体"展示站点，用于记录技术学习、人生观/价值观、方法论、阅读、投资等个人成长内容，并作为社媒（小红书、X、GitHub）与未来个人品牌的入口。目标读者：中文互联网用户（含国内访问场景）。

### 1.1 核心原则

- **内容与展示分离**：文章/项目/Memo 均为纯数据文件（Markdown / JSON），网站只是渲染层
- **静态优先**：全站静态生成，零后端依赖（除 Memo 在线发布走 GitHub API）
- **低维护**：发布流程脚本化，无 CI 依赖，不怕 Actions 队列问题
- **可扩展**：社媒链接、AI 分身、R2 图床、Cloudflare Pages 迁移均在设计中预留位置

## 2. 技术栈

| 项 | 选型 | 说明 |
|---|---|---|
| 框架 | **Astro 5+**（SSG） | 内容型站点首选，Markdown 原生支持，静态输出 |
| UI | Tailwind CSS | 与旧项目一致，快速实现设计 |
| 搜索 | **Pagefind** | 构建时索引，支持中文分词 |
| RSS | `@astrojs/rss` | 生成 feed.xml |
| 部署 | GitHub Pages（gh-pages 分支）+ 本地构建 | 见 §6 |
| 图表/动画 | 纯 CSS/SVG | 走马灯、明暗切换均为轻量实现 |

**明确不用**：React 前端框架（页面全部静态输出，交互用少量原生 JS）、GitHub Actions（发布不依赖 CI，见 §6）、评论系统（本期不做）。

## 3. 信息架构与页面规格

### 3.1 全局

- 导航栏（**全英文**）：`Home` `Project` `Article` `Memo` `About` + 明暗切换按钮 + 搜索栏（Pagefind）
  - `Article` 为 **hover 下拉菜单**：Categories / Tags / Archive，直接点击无行为
- 明暗模式：默认跟随系统，手动切换后 localStorage 记忆
- 页脚：版权 + 社媒链接 + "Powered by Astro"
- 站点语言 `lang="zh-CN"`，正文中文

### 3.2 首页（Home）

自上而下：

1. **Hero 区**：
   - Slogan 双语：
     - Revere time, defend your attention. Forever curious, forever optimistic
     - 敬畏时间，捍卫注意力。永远好奇，永远乐观
   - 社媒走马灯（CSS 滚动 + hover 暂停）：小红书、X、GitHub、RSS、Email，配置驱动可扩展（见 §4.4）
   - **预留附加位**（hero-extra 插槽，本期空置）：slogan 铺满全屏亦可，之后有想法再填充（如 AI 分身入口、头像、名句）
2. **最近更新区**：横向三栏，各展示最近 5 条
   - 最近文章（链接到文章页）
   - 最近项目（链接到 Project 页）
   - 最近 Memo（链接到 Memo 页）
3. **数据统计区**：网站访问量（不蒜子）、正常运行时间（UptimeRobot 徽章）、总字数（构建时统计文章正文+Memo 字数）

### 3.3 Project 页

- 数据源：`src/data/projects.json`，构建时读取渲染为**卡片画廊**（桌面 3 列 / 平板 2 列 / 移动 1 列）
- 每张卡片：标题、简介、标签、GitHub 地址、演示地址、star 数（构建时可选调 GitHub API 拉取，失败时降级不显示）
- 卡片可跳转 GitHub / 演示站点
- 数据格式见 §4.3

### 3.4 Article 体系

- **文章列表页** `/articles`：全量文章按时间倒序，分页（10 条/页）
- **Categories 页** `/categories`：全部分类及计数 → 点击进入 `/categories/[分类]` 筛选文章
- **Tags 页** `/tags`：全部标签及计数 → 点击进入 `/tags/[标签]` 筛选文章
- **Archive 页** `/archive`：时间线 Timeline，按年/月分组展示文章创建时间
- **文章详情页** `/articles/[slug]`：Markdown 渲染（GFM）、代码高亮、TOC（可选）、上一篇/下一篇
- 文章源文件：`src/content/articles/*.md`，frontmatter 见 §4.1

### 3.5 Memo 页

- 推特风格时间线：头像 + 昵称 + 内容 + 图片 + 时间
- 支持图片展示（多图）
- 支持删除（作者本人在自己的浏览器）
- **在线发布**：页面内置输入框，发文字/传照片，见 §5.3
- 实时更新：数据写入数据仓库后，页面即时刷新，无需重新构建

### 3.6 About 页

- 直接渲染 `src/content/about.md`（用户自填个人介绍、价值观、未来方向等）
- AI 数字分身**预留位**：后期在 About 页底部内嵌聊天窗（本期不实现，见 §8）

## 4. 数据格式

### 4.1 文章 frontmatter

```yaml
---
title: "文章标题"
date: "2026-08-19"        # 创建日期
categories:
  - 分类一
tags:
  - 标签一
cover: ""                  # 可选封面图
---
```

- 分类/标签名用中文，URL 侧由框架 slug 化处理
- 列表卡片与 SEO 的摘要：自动截取正文开头（不设 description 字段）

### 4.2 Memo 数据（数据仓库 `memos.json`）

```json
{
  "version": 1,
  "memos": [
    {
      "id": "20260819-1530-abc",
      "text": "碎碎念内容",
      "images": ["images/20260819-1530-abc-1.jpg"],
      "createdAt": "2026-08-19T15:30:00+08:00"
    }
  ]
}
```

### 4.3 Project 数据（`src/data/projects.json`）

```json
{
  "projects": [
    {
      "title": "项目名",
      "description": "一句话简介",
      "github": "https://github.com/BornfreeYan/xxx",
      "demo": "https://xxx.com",
      "tags": ["FastAPI", "MySQL"],
      "featured": true
    }
  ]
}
```

- `github` 可选：填写后构建时拉取 star 数（失败降级）
- `demo` 可选：项目在线演示地址（没有可留空），卡片上出现"在线演示"跳转按钮
- 新项目 = 编辑此 JSON + 跑发布脚本，**不做在线便捷发布**（用户已确认）

### 4.4 站点配置（`src/config.ts`）

统一配置文件：站点名、Slogan、作者、社媒链接数组（key/名称/URL，可扩展）、统计开关、导航项等。

## 5. 数据存储与 Memo 在线发布机制

### 5.1 存储分层

| 数据 | 存储位置 | 仓库 | 更新方式 |
|---|---|---|---|
| 文章 / About | `src/content/` | 博客仓库（main） | 本地写 md + 发布脚本 |
| Project | `src/data/projects.json` | 博客仓库（main） | 本地编辑 + 发布脚本 |
| Memo | `memos.json` + `images/` | **独立私有数据仓库 `BornfreeYan/blog-data`** | 浏览器 GitHub API 在线写 |
| 文章图片 | `src/assets/`（构建时优化） | 博客仓库 | 本地放入 |

> **Memo 放独立仓库的原因**：发 Memo 不经过博客仓库 → 不触发任何构建/部署 → 真正实时更新；token 权限也最小化。

### 5.2 图床策略（本期）

- 文章图片：放博客仓库 `src/assets/`，Astro 构建时自动压缩优化，随站点 CDN 分发
- Memo 照片：浏览器端压缩后经 API 写入 `blog-data/images/`，展示时走 jsDelivr CDN（`cdn.jsdelivr.net/gh/BornfreeYan/blog-data@main/...`）
- **不做独立图床**。预留：Cloudflare R2 + Worker 图床（图片量大/需要外链压缩时再上，见 §8）

### 5.3 Memo 在线发布流程（WebDesk 思路）

1. **Token**：用户第一次在 Memo 页输入 GitHub fine-grained token，存 localStorage（key: `blog_token`）。token 仅授权 `blog-data` 仓库的 Contents 读写。**风险声明**：浏览器里任何人可见，仅限本人个人电脑浏览器使用
2. **发文字**：GET `contents/memos.json`（带 token）→ 取 sha → 修改内容 → PUT 回写（sha 冲突时重试）
3. **发照片**：浏览器端压缩（canvas，最长边 ≤1600px，JPEG 质量 0.8）→ base64 写入 `images/` → memo 记录路径
4. **读取渲染**：页面加载时 fetch `blog-data` 的 `memos.json`（优先 jsDelivr CDN，失败降级 GitHub API/raw）→ 渲染时间线
5. **删除**：重写 `memos.json`（个人使用频率低，整文件重写足够）
6. **数据规模**：`memos.json` 单文件维护（按 ~200B/条估算，5000 条约 1MB，可用数年）；照片独立文件不占 JSON 体积。预留：单文件超限后按年份分片（`memos-2026.json`）

## 6. 发布与部署流程

### 6.1 分支策略

仓库当前为空白新仓库（旧项目已删除），从零建立：

| 分支 | 内容 |
|---|---|
| `main` | 博客源码（Astro 项目 + content + data） |
| `gh-pages` | 构建产物（`dist/` 内容，站点实际 serve 的分支） |

### 6.2 发布脚本（PowerShell，`scripts/` 目录）

**`publish.ps1`**（发布文章/项目/全部改动，交互式）：

1. 可选：`git add -A && git commit`（输入 commit message）
2. `npm run build`（含 Pagefind 索引 + 字数统计）
3. `git add/commit` 产物 → 切到 `gh-pages` 分支 → push
4. 切回 `main`，push 源码
5. 打印站点 URL 供核对

**`new-article.ps1`**（可选便利脚本）：根据模板创建带 frontmatter 的文章 md 文件。

### 6.3 为什么不用 GitHub Actions

用户经历：Actions 队列阻塞 / deploy-pages API 不稳定导致旧博客流产。本地始终有 Node 环境，故**本地构建 + 双分支 push**，部署链路最短、零 CI 依赖。GitHub Pages 配置为从 `gh-pages` 分支 serve（Settings → Pages → Source: Deploy from a branch）。首次上线需在仓库 Settings 手动开启 Pages。

### 6.4 迁移预留

- 之后可导入 Cloudflare Pages（直连 GitHub 仓库或产物分支，域名更短/自定义域名）+ 保留 GitHub Pages 双活
- 域名购买后配置 `CNAME`；本期不买域名，域名维持 `BornfreeYan.github.io`

## 7. 数据统计

| 指标 | 方案 | 说明 |
|---|---|---|
| 访问量 | 不蒜子（busuanzi） | 免费，中文博客常用，一行脚本，显示 PV/UV |
| 正常运行时间 | UptimeRobot | 免费监控博客 URL，公共状态徽章/状态页嵌入首页 |
| 总字数 | 构建时统计 | Astro 构建时统计全部文章正文 + Memo 字数，写入配置供首页展示 |

## 8. 本期不实现（预留扩展）

| 扩展 | 方案 | 触发条件 |
|---|---|---|
| AI 数字分身 | About 页底部内嵌聊天窗；前端调 Cloudflare Worker 代理 LLM API（key 存 Worker 侧，防盗刷）；用户提供 prompt 描述自我 | 用户觉得需要时 |
| Cloudflare Pages / 自定义域名 | 导入仓库或产物分支，CNAME 绑定 | 用户购买域名后 |
| Cloudflare R2 图床 | Worker 上传/压缩/分发，自定义域名 | 图片量大或需要外部图床链接时 |
| 评论系统 | giscus（基于 GitHub Discussions） | 用户需要互动时 |
| Memo 分片 | `memos-YYYY.json` | memos.json 超 1MB 时 |

## 9. 目录结构（目标）

```
BornfreeYan/
├── public/                  # 静态资源（favicon、robots.txt 等）
├── src/
│   ├── components/          # 组件（Navbar、Hero、Marquee、ArticleCard、MemoCard、Stats…）
│   ├── layouts/             # 布局
│   ├── pages/               # 路由页面
│   │   ├── index.astro
│   │   ├── articles/        # 列表 + 详情 + 分页
│   │   ├── categories/      # 分类页
│   │   ├── tags/            # 标签页
│   │   ├── archive.astro
│   │   ├── projects.astro
│   │   ├── memos.astro
│   │   └── about.astro
│   ├── content/
│   │   ├── articles/        # 文章 Markdown
│   │   └── about.md
│   ├── data/
│   │   └── projects.json
│   ├── lib/                 # 工具（memo API、统计、日期格式化）
│   ├── config.ts            # 站点配置
│   └── styles/              # 全局样式（Tailwind + CSS 变量主题）
├── scripts/
│   ├── publish.ps1          # 发布脚本（构建 + 双分支 push）
│   └── new-article.ps1      # 新文章模板脚本
├── astro.config.mjs
├── package.json
└── README.md
```

## 10. 非功能需求

- **性能**：全静态输出，首页 JS 最小化；图片懒加载；走马灯纯 CSS 动画
- **SEO**：每页 meta description（正文自动摘要）、OG 标签、sitemap.xml、RSS、语义化 HTML
- **可访问性**：键盘可操作下拉菜单、走马灯提供可访问名、明暗对比度达标
- **移动端**：导航折叠、三栏变单栏、走马灯可横向滑动
- **健壮性**：GitHub API 全部失败降级（不显示/缓存），Memo 写入失败提示且不丢输入内容

## 11. 里程碑

| 阶段 | 内容 | 产出 |
|---|---|---|
| M1 骨架 | Astro 项目初始化、配置、布局、主题、导航、首页 Hero + 走马灯 | 站点骨架可预览 |
| M2 内容页 | Article 列表/详情/分类/标签/Archive + 搜索 + RSS | 文章体系完成 |
| M3 项目与统计 | Project 画廊、首页三栏 + 统计区 | 首页完整 |
| M4 Memo | Memo 页（时间线 UI）+ 在线发布（token/照片/删除/实时刷新） | Memo 体系完成 |
| M5 部署 | 发布脚本、双分支部署、README、验证线上 | 正式上线 |

## 12. 验收标准

- [ ] `npm run build` 零报错；本地 preview 全部路由可访问
- [ ] 首页：导航（英文 + hover 下拉 Article）、Slogan、走马灯（hover 暂停）、三栏最近更新、统计区
- [ ] 文章：分类/标签/归档可筛选，分页正常，搜索（含中文）可用
- [ ] Project：JSON 驱动画廊，GitHub 卡片可跳转，star 拉取失败优雅降级
- [ ] Memo：能在线发文字/照片/删除，刷新后实时可见，无 token 时只读
- [ ] 发布脚本：一次运行完成 源码 push + 产物 push，线上可访问
- [ ] 明暗切换记忆、移动端布局正常、RSS 可订阅
