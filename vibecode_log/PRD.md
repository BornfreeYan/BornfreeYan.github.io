# Blog PRD v1.0.0

## Metadata

```yaml
title: "Bornfree — 超级个体成长档案馆"
version: "1.0.0"
date: "2026-08-05"
status: "需求已确认 / 待开工"
repo: "https://github.com/BornfreeYan/BornfreeYan.github.io"
local_project: "D:/Local Knowledge_Base/1 Job/17 Projects/Blog"
```

## 1. 项目定位

> 不是单纯的技术博客，也不是纯生活记录，而是一个 **综合性个人数字档案馆（Digital Garden）**，记录学习、技术、项目、生活痕迹与思考，最终呈现为一张“超级个体”的成长时间线。

### 1.1 核心目标
- 打造长期可维护的个人网站与社交名片。
- 作为简历项目：展示 TypeScript、React、Tailwind CSS、GitHub Pages 部署与内容工程能力。
- 沉淀学习笔记，反哺自己的知识体系。
- 产出代码与内容，都可作为后续社交媒体/博客素材。

### 1.2 目标受众
- 未来的招聘官 / 技术面试官。
- 关注成长记录的同行、读者、社群。
- 未来的自己。

## 2. 内容策略

### 2.1 内容类型
| 内容频道 | 定义 | 内容来源 | 当前形式 |
|---|---|---|---|
| **Article** | 结构化文章（技术博客、学习笔记） | Markdown + frontmatter | 文章列表 + 分类/标签/归档 |
| **Project** | 开源项目/练手项目展示 | `projects.json`（手动维护） | 项目卡片列表，GitHub API 拉取名称与 star 数 |
| **Memo** | 推特风短动态、随笔、照片 | 手动维护（暂不与 Obsidian 同步） | 时间线卡片 |
| **About** | 个人介绍与宣言 | 独立 `about.md` | 个人化介绍页 |

### 2.2 文章模型（Article）
文章使用 Markdown 编写，包含 frontmatter：

```yaml
---
title: ""
date: ""
categories: []
tags: []
description: ""
cover: ""
---
```

### 2.3 内容工作流
1. 用户自行在 Obsidian 中写作笔记（Markdown + frontmatter）。
2. 用户通过已有脚本或个人手动挑选，将文章放入 Blog 仓库 `src/content/articles/`。
3. 构建时解析 frontmatter，生成分类、标签、归档。

## 3. 技术栈

### 3.1 当前技术栈（v1.0.0）
- **托管平台**：GitHub Pages
- **前端框架**：React（Vite 脚手架）
- **构建工具**：Vite
- **样式方案**：Tailwind CSS
- **语言**：TypeScript（有基本类型规范，便于阅读源码）
- **Hero 视觉**：巨型衬线水印 "Born Free." + 细线太阳纹章，融入米白背景（纯 SVG/CSS，无 3D 依赖）
- **部署**：GitHub Actions 自动构建并部署到 GitHub Pages

### 3.2 技术栈说明
- **不使用 Python / FastAPI**：GitHub Pages 仅支持静态托管，v1.0.0 无需后端；若后续迁移至服务器或需要后端功能，再引入 FastAPI。
- **不使用 Next.js**：用户尚未学习 Next.js，且 v1.0.0 以“能跑起来、代码少、好维护”优先，React + Vite 已足够。
- **TypeScript 深度**：采用基本类型规范，代码可读性强，模块级注释说明用途，不过度注释细节。
- GitHub Pages 个人站点仓库 `BornfreeYan/BornfreeYan` 可直接通过 `https://BornfreeYan.github.io` 访问。

## 4. 设计系统

### 4.1 设计基调
- 大气、优雅、克制、不花哨。
- 参考 Claude 官网及 Anthropic 团队设计理念：留白、低饱和、衬线字体、信息层级清晰、圆润圆角、自然滚动。
- 不做复杂背景图、不做高饱和度色彩。

### 4.2 色彩方案（初稿）
| 角色 | 色值 | 说明 |
|---|---|---|
| 页面底色 | `#f5f1ec` | 暖象牙白，纸质感 |
| 主文字 | `#1a1a1a` 或 `#2c2c2c` | 深灰黑，避免纯黑 |
| 次要文字 | `#6b6b6b` | 灰色 |
| 强调色 | `#c4a77d` 或 `#9c8c6b` | 低饱和金/棕色，用于链接、hover |
| 边框/分隔线 | `#e0d8cd` | 暖灰 |

### 4.3 暗色模式（v1.0.0 支持）
- 使用 Tailwind `dark:` 类实现。
- 暗色底色建议 `#1a1a1a` 或 `#121212`，文字 `#f5f1ec`。
- 跟随系统或提供切换按钮。

### 4.4 字体方案
- 标题：衬线体（如 `Source Han Serif CN`、`Noto Serif SC`、`Playfair Display`）
- 正文：无衬线体（如 `Inter`、`Noto Sans SC`）
- 代码：等宽字体（如 `JetBrains Mono`、`Fira Code`）

### 4.5 通用组件
- 顶部导航栏（固定，移动端兼容）
- Hero 区域
- 内容卡片（文章、项目、Memo）
- 分类/标签/归档列表
- 时间线
- 底部 Footer

## 5. 页面与布局

### 5.1 全局导航栏
- 左侧：个人图标 + “Bornfree” 文字
- 右侧：
  - **Article**（悬停下拉：分类 / 标签 / 归档）
  - **Project**
  - **Memo**
  - **About**
- 移动端：汉堡菜单或折叠为图标。

### 5.2 首页（/）
1. **Hero 区域**
   - 左侧（桌面端）/ 上方（移动端）：个人宣言
     - 英文在上，字体较大：
       > Revere time, defend attention. Forever curious, forever optimistic.
     - 中文在下，字体较小：
       > 敬畏时间，捍卫注意力。永远好奇，永远乐观。
   - 右侧（桌面端）/ 上方（移动端）：细线太阳纹章 + 柔和辉光（背景层）
   - 背景：巨型衬线水印 "Born Free."（融入米白，杂志封面感）
   - 下方：社交媒体图标（X、公众号、Bilibili、小红书、RSS、Email）
2. **三核心展示**
   - 三栏布局：最新 Article / 精选 Project / 最近 Memo
   - 每栏展示若干条目卡片
3. **数据/统计展示（待确认位置）**
   - 可选：文章总数、项目数、运行天数、访客数等
   - 用于填充首页空白，避免空荡；可能与底部或 Hero 附近合并
4. **Footer**
   - 版权信息（Copyright © Bornfree）
   - 可选：RSS、GitHub、回到顶部

### 5.3 Article 频道
- **Article 列表页**：默认按时间倒序展示文章
- **分类页**（/categories）：列出所有分类及文章数
- **标签页**（/tags）：列出所有标签云
- **归档页**（/archive）：按年月时间线展示文章
- **单篇文章页**：渲染 Markdown，支持代码高亮

### 5.4 Project 频道
- 项目卡片列表
- 每个项目字段：名称、描述、技术栈、GitHub 链接、Demo 链接、封面图
- 名称与 star 数优先从 GitHub API 拉取，可 fallback 到本地 JSON
- 数据源：`src/data/projects.json`

### 5.5 Memo 频道
- 推特风时间线展示
- 每条 Memo：内容、可选图片、发布时间、标签
- 不做公开评论，不做日记，不与 Obsidian 自动同步
- 数据源：手动维护的 JSON/Markdown（暂定 `src/content/memos/`）

### 5.6 About 页面
- 独立 Markdown 文件 `src/content/about.md`
- 内容：个人简介、示例宣言、联系方式占位
- 用户后续自行补充真实内容

## 6. 核心功能

### 6.1 v1.0.0 必须实现（MVP）
- [ ] 项目初始化：Vite + React + TypeScript + Tailwind CSS
- [ ] 首页布局与导航（响应式）
- [ ] Hero 区域 + 个人宣言 + 社媒图标
- [ ] 暗色模式切换 / 跟随系统
- [ ] Article 列表、分类、标签、归档
- [ ] Markdown 文章渲染 + 代码高亮
- [ ] Project 列表页（读取 JSON + GitHub API）
- [ ] Memo 列表页（推特风）
- [ ] About 页面
- [ ] Footer
- [ ] GitHub Pages 部署

### 6.2 v1.1 及以后
- [x] Hero 视觉：巨型衬线水印 "Born Free." + 细线太阳纹章（方案 A，替代 3D 钢琴与飞鸟图样）
- [ ] 首页数据统计展示（文章数/项目数/运行天数/访客数）
- [ ] 搜索功能
- [ ] RSS 订阅
- [ ] 评论系统（如 Giscus）
- [ ] 数字分身聊天入口（远期）

## 7. 数据与构建

### 7.1 内容目录结构（建议）
```
Blog/
├── vibecode_log/          # 需求、决策、任务记录
│   ├── PRD.md
│   ├── task.md
│   └── spec.md
├── public/                # 静态资源
├── src/
│   ├── content/
│   │   ├── articles/      # Markdown 文章
│   │   ├── memos/         # Memo 内容
│   │   └── about.md       # 关于页面
│   ├── data/
│   │   └── projects.json  # 项目数据
│   ├── components/        # React 组件
│   ├── pages/             # 页面组件
│   ├── hooks/             # 自定义 Hooks
│   ├── lib/               # 工具函数
│   ├── styles/            # 全局样式
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── .github/
│   └── workflows/
│       └── deploy.yml     # 如采用 GitHub Actions
└── README.md
```

### 7.2 内容生成
- 构建时扫描 `src/content/articles/` 下的 Markdown 文件。
- 解析 frontmatter，生成文章索引。
- 分类、标签、归档信息从索引中动态生成。
- Memo 可暂用 JSON 数组，便于快速实现。

## 8. 非目标（本期不做）

- Python / FastAPI 后端
- 用户登录 / 后台管理系统
- 评论系统
- 数据库
- 数字分身聊天
- 多语言支持
- Obsidian 自动同步
- 更丰富的首屏交互视觉（视差 / 粒子，若未来需要）

## 9. 风险与依赖

- ~~三角钢琴 3D 动画~~：已废弃。最终采用巨型衬线水印 + 太阳纹章（方案 A），纯 SVG/CSS，避免 Three.js 复杂度与首屏体积。
- GitHub API 拉取项目信息可能受速率限制，需考虑 fallback。
- GitHub Pages 对客户端路由（React Router）刷新 404 问题需要配置。
- Memo 展示方式较简单，后续可能扩展为更复杂的时间线。

## 10. 已确认决策清单

| 序号 | 问题 | 决策 | 影响范围 |
|---|---|---|---|
| 1 | 部署方式 | **GitHub Actions 自动部署** | 部署流程 |
| 2 | 数据展示位置 | **三核心展示下方、Footer 上方** | 首页布局 |

## 10. 首页布局确认

首页内容顺序（从上到下）：

1. **导航栏**（固定顶部）
2. **Hero 区域**
   - 桌面端：左侧宣言，右侧太阳纹章背景
   - 移动端：宣言 + 背景水印/纹章
3. **社媒图标栏**
4. **三核心展示**（Article / Project / Memo 最新内容预览）
5. **数据统计区**（文章总数、项目数、运行天数、标签数等）
6. **Footer**

---
## 11. 部署方式（已确认）

采用 **GitHub Actions 自动部署**：
- 每次 `git push` 到 `main` 分支，Actions 自动安装依赖、构建、推送到 `gh-pages` 分支。
- 优点：无需本地构建，多设备协作方便，CI/CD 规范。
- 实现文件：`.github/workflows/deploy.yml`。

---

*本文件为 v1.0.0 的需求确认文档，后续随实现更新。*
