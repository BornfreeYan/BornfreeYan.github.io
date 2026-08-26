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
- 页脚：作者名 + 标语 + 社媒链接 + 版权 + "Powered by Astro"
- 站点语言 `lang="zh-CN"`，正文中文

### 3.2 首页（Home）

自上而下：

1. **Hero 区**：
   - 左右两栏布局：
     - 左侧：Slogan 双语 + 社媒图标（小红书、X、GitHub、RSS、Email），配置驱动可扩展（见 §4.4）
     - 右侧：About 摘要卡片，展示 Focus / Short-term / Long-term / Next / Language 等结构化信息
   - Slogan 双语：
     - Revere time, defend your attention. Forever curious, forever optimistic
     - 敬畏时间，捍卫注意力。永远好奇，永远乐观
2. **最近更新区**：横向三栏，各展示最近 5 条
   - 最近文章（链接到文章页）
   - 最近项目（链接到 Project 页）
   - 最近 Memo（链接到 Memo 页）

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
- **文章详情页** `/articles/[slug]`：Markdown 渲染（GFM）、代码高亮、TOC、阅读进度条、代码块复制按钮、上一篇/下一篇
- 文章源文件：`src/content/articles/*.md`，frontmatter 见 §4.1

### 3.5 Memo 页

- 推特/Moments 风格时间线：头像 + 昵称 + 内容 + 图片 + 时间
- 支持图片展示（多图），单张图保持原比例，多张图统一 1:1 网格
- 支持本地上传图片，也支持粘贴图床外链 URL
- 图片点击打开灯箱查看，支持关闭、左右切换、键盘导航
- 支持引用/回复其他 Memo
- 支持删除（作者本人在自己的浏览器）
- **在线发布**：页面内置输入框，发文字/传照片/贴图床链接，见 §5.3
- 实时更新：数据写入数据仓库后，页面即时刷新，无需重新构建

### 3.6 About 页

- 直接渲染 `src/content/about.md`（用户自填个人介绍、价值观、未来方向等）
- 首页 Hero 右侧同步展示 About 摘要卡片
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
cover: ""                  # 可选封面图 URL，会显示在文章卡片顶部和详情页标题下方
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
      "images": ["images/20260819-1530-abc-1.jpg", "https://图床.com/xxx.png"],
      "createdAt": "2026-08-19T15:30:00+08:00",
      "replyTo": "20260819-1000-xyz"
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

统一配置文件：站点名、Slogan、作者、头像、社媒链接数组（key/名称/URL，可扩展）、导航项、Memo 数据分支等。

## 5. 数据存储与 Memo 在线发布机制

### 5.1 存储分层

| 数据 | 存储位置 | 仓库 | 更新方式 |
|---|---|---|---|
| 文章 / About | `src/content/` | 博客仓库（main） | 本地写 md + 发布脚本 |
| Project | `src/data/projects.json` | 博客仓库（main） | 本地编辑 + 发布脚本 |
| Memo | `memos.json` + `images/` | 博客仓库 `BornfreeYan/BornfreeYan.github.io` 的 `data` 分支 | 浏览器 GitHub API 在线写 |
| 文章图片 | `src/assets/`（构建时优化） | 博客仓库 | 本地放入 |

> **Memo 放独立数据分支的原因**：发 Memo 不经过博客主分支 → 不触发站点构建/部署 → 真正实时更新；token 权限也最小化。

### 5.2 图床策略（本期）

- 文章图片：建议放外部图床或 `src/assets/`，减少仓库体积
- Memo 照片：支持两种方式
  - 本地上传：浏览器端压缩后经 API 写入 `data/images/`，展示时走 jsDelivr CDN
  - 图床外链：在发布框粘贴 `https://...` 图片 URL，只存链接不上传文件
- 预留：Cloudflare R2 + Worker 图床（图片量大/需要外链压缩时再上，见 §8）

### 5.3 Memo 在线发布流程（WebDesk 思路）

1. **Token**：用户第一次在 Memo 页输入 GitHub fine-grained token，存 localStorage（key: `bfy_memo_token`）。token 仅授权博客仓库 `data` 分支的 Contents 读写。**风险声明**：浏览器里任何人可见，仅限本人个人电脑浏览器使用
2. **发文字**：GET `contents/memos.json`（带 token + `?ref=data`）→ 取 sha → 修改内容 → PUT 回写（sha 冲突时重试）
3. **发照片**：浏览器端压缩（canvas，最长边 ≤1600px，JPEG 质量 0.8）→ base64 写入 `data/images/` → memo 记录路径；或粘贴外部图床 URL 直接引用
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

**`publish.ps1`**（发布文章/项目/全部改动，一条命令全自动）：

1. 扫描主知识库，筛选 `date` 等于今天的 Markdown 笔记
2. 补 frontmatter 引号、转换 Obsidian 图片引用（`![[img]]` → `![alt](/images/img)` 并复制图片到 `public/images/`）、迁移到 `src/content/articles/`
3. `pnpm run build`（含 Pagefind 索引；构建前自动清理旧内容缓存，避免已删除内容残留）
4. `git add/commit` 源码 → push `main`
5. 临时克隆产物到 `gh-pages` 分支 → force push
6. 打印站点 URL 供核对

参数：`-DryRun`（仅预览今日待迁移文章，不实际发布）、`-Message "提交信息"`（自定义提交信息）。

> 文章在知识库中编写，文件名用英文，`date` 等于发布当天才会被筛选迁移。

### 6.3 为什么不用 GitHub Actions

用户经历：Actions 队列阻塞 / deploy-pages API 不稳定导致旧博客流产。本地始终有 Node 环境，故**本地构建 + 双分支 push**，部署链路最短、零 CI 依赖。GitHub Pages 配置为从 `gh-pages` 分支 serve（Settings → Pages → Source: Deploy from a branch）。首次上线需在仓库 Settings 手动开启 Pages。

### 6.4 迁移预留

- 之后可导入 Cloudflare Pages（直连 GitHub 仓库或产物分支，域名更短/自定义域名）+ 保留 GitHub Pages 双活
- 域名购买后配置 `CNAME`；本期不买域名，域名维持 `BornfreeYan.github.io`

## 7. 数据统计

已删除实现。如未来需要访问量/运行时间/总字数统计，见 §8 预留扩展。

## 8. 本期不实现（预留扩展）

| 扩展 | 方案 | 触发条件 |
|---|---|---|
| 数据统计 | 不蒜子（PV/UV）+ UptimeRobot 状态徽章 + 构建时总字数 | 用户需要时 |
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
│   ├── components/          # 组件（Navbar、Hero、AboutCard、ArticleCard、ProjectCard、RecentMemos、MemoApp、TableOfContents…）
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
│   ├── lib/                 # 工具（memo API、日期格式化）
│   ├── config.ts            # 站点配置
│   └── styles/              # 全局样式（Tailwind + CSS 变量主题）
├── scripts/
│   └── publish.ps1          # 发布脚本（迁移今日文章 + 构建 + 双分支 push）
├── astro.config.mjs
├── package.json
└── README.md
```

## 10. 非功能需求

- **性能**：全静态输出，首页 JS 最小化；图片懒加载；社媒图标静态展示
- **SEO**：每页 meta description（正文自动摘要）、OG 标签、sitemap.xml、RSS、robots.txt、语义化 HTML
- **可访问性**：键盘可操作下拉菜单、focus-visible 轮廓、明暗对比度达标、图片 alt 文本
- **移动端**：导航折叠、三栏变单栏、Hero 双栏变单栏
- **健壮性**：GitHub API 全部失败降级（不显示/缓存），Memo 写入失败提示且不丢输入内容

## 11. 里程碑

| 阶段 | 内容 | 产出 |
|---|---|---|
| M1 骨架 | Astro 项目初始化、配置、布局、主题、导航、首页 Hero | 站点骨架可预览 |
| M2 内容页 | Article 列表/详情/分类/标签/Archive + 搜索 + RSS + TOC + 阅读进度 | 文章体系完成 |
| M3 项目 | Project 画廊、首页三栏 | 首页完整 |
| M4 Memo | Memo 页（时间线 UI）+ 在线发布（token/照片/图床/引用/灯箱/删除/实时刷新） | Memo 体系完成 |
| M5 部署 | 发布脚本、双分支部署、README、验证线上 | 正式上线 |

## 12. 验收标准

- [x] `pnpm run build` 零报错；本地 preview 全部路由可访问
- [x] 首页：导航（英文 + hover 下拉 Article）、Slogan、社媒图标、About 卡片、三栏最近更新
- [x] 文章：分类/标签/归档可筛选，分页正常，搜索（含中文）可用，TOC 与阅读进度条正常
- [x] Project：JSON 驱动画廊，GitHub 卡片可跳转，star 拉取失败优雅降级
- [x] Memo：能在线发文字/本地上传照片/图床链接/引用/删除，图片灯箱查看，刷新后实时可见，无 token 时只读
- [x] 发布脚本：一次运行完成 源码 push + 产物 push，线上可访问
- [x] 明暗切换记忆、移动端布局正常、RSS 可订阅、robots.txt 可访问
