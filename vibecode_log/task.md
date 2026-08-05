# Blog Task List v1.0.0

## 项目信息
- **项目路径**：`D:/Local Knowledge_Base/1 Job/17 Projects/Blog`
- **仓库**：`https://github.com/BornfreeYan/BornfreeYan`
- **域名**：`https://BornfreeYan.github.io`
- **技术栈**：Vite + React + TypeScript + Tailwind CSS
- **部署**：GitHub Actions（建议）

## Phase 1: 项目初始化

| 任务 | 说明 | 输出 |
|---|---|---|
| 1.1 初始化 Vite 项目 | 使用 `npm create vite@latest . -- --template react-ts` | `package.json`, `vite.config.ts`, `tsconfig.json` |
| 1.2 安装 Tailwind CSS | 配置 Tailwind v4 或 v3 + PostCSS | `tailwind.config.js`, `src/index.css` |
| 1.3 安装路由与工具库 | React Router DOM、gray-matter、react-markdown、prismjs 或 highlight.js | `package.json` 依赖更新 |
| 1.4 配置 Git | 初始化或关联 `BornfreeYan/BornfreeYan` 仓库 | `.git/`, 远程 origin |
| 1.5 创建基础目录结构 | 按 PRD 目录结构创建文件夹 | `src/content/`, `src/data/`, `src/components/` 等 |

## Phase 2: 全局布局与主题

| 任务 | 说明 | 输出 |
|---|---|---|
| 2.1 设计 Token / 色彩变量 | 定义 light/dark 配色、字体、圆角、间距 | `src/styles/theme.css` 或 Tailwind 配置 |
| 2.2 字体引入 | 衬线标题字体 + 无衬线正文字体 + 代码字体 | `index.html` 引入或本地字体 |
| 2.3 暗色模式实现 | 使用 Tailwind `dark:` 类 + localStorage/system 偏好 | `ThemeProvider` 或 hook |
| 2.4 导航栏组件 | 左侧 Logo + 右侧 Article/Project/Memo/About，移动端汉堡菜单 | `Navbar.tsx` |
| 2.5 Footer 组件 | 版权、RSS、GitHub、回到顶部 | `Footer.tsx` |
| 2.6 布局骨架 | 所有页面共享的 `Layout` 组件 | `Layout.tsx` |

## Phase 3: 首页（Hero + 三核心）

| 任务 | 说明 | 输出 |
|---|---|---|
| 3.1 Hero 区域布局 | 左侧宣言（中英双语），右侧钢琴占位区域，响应式上下堆叠 | `HeroSection.tsx` |
| 3.2 社媒图标栏 | X、公众号、Bilibili、小红书、RSS、Email 图标链接 | `SocialLinks.tsx` |
| 3.3 三核心展示 | Article / Project / Memo 三栏卡片预览 | `CoreShowcase.tsx` |
| 3.4 首页数据展示 | 文章数、项目数、运行天数等（位置待确认） | `StatsSection.tsx` |
| 3.5 钢琴占位 | v1.0 先用抽象图形或 CSS 占位，v1.1 接入 Three.js | `PianoPlaceholder.tsx` |

## Phase 4: Article 频道

| 任务 | 说明 | 输出 |
|---|---|---|
| 4.1 Markdown 内容扫描 | 读取 `src/content/articles/` 下所有 `.md`，解析 frontmatter | `src/lib/articles.ts` |
| 4.2 文章索引生成 | 构建时生成文章列表、分类、标签、归档 | 构建脚本或 Vite 插件 |
| 4.3 文章列表页 | 按时间倒序展示文章卡片 | `ArticlesPage.tsx` |
| 4.4 单篇文章页 | Markdown 渲染 + 代码高亮 + frontmatter 展示 | `ArticlePage.tsx` |
| 4.5 分类页 | 所有分类及文章数 | `CategoriesPage.tsx` |
| 4.6 标签页 | 标签云 | `TagsPage.tsx` |
| 4.7 归档页 | 按年月时间线 | `ArchivePage.tsx` |

## Phase 5: Project 频道

| 任务 | 说明 | 输出 |
|---|---|---|
| 5.1 创建 `projects.json` | 包含项目字段：name, description, tech, github, demo, cover | `src/data/projects.json` |
| 5.2 GitHub API 拉取 | 根据 `github` 字段拉取真实项目名与 star 数 | `src/lib/github.ts` |
| 5.3 项目列表页 | 项目卡片网格/列表展示 | `ProjectsPage.tsx` |

## Phase 6: Memo 频道

| 任务 | 说明 | 输出 |
|---|---|---|
| 6.1 创建 Memo 数据格式 | 推特风：content, images, date, tags | `src/content/memos/` 或 `src/data/memos.json` |
| 6.2 Memo 列表页 | 时间线卡片展示 | `MemosPage.tsx` |

## Phase 7: About 页面

| 任务 | 说明 | 输出 |
|---|---|---|
| 7.1 编写 `about.md` | 个人化介绍示例文案 | `src/content/about.md` |
| 7.2 About 页面渲染 | 渲染 Markdown | `AboutPage.tsx` |

## Phase 8: 路由与页面集成

| 任务 | 说明 | 输出 |
|---|---|---|
| 8.1 配置 React Router | 定义所有路由及 404 处理 | `src/App.tsx` |
| 8.2 导航下拉菜单 | Article 悬停下拉：分类/标签/归档 | `NavDropdown.tsx` |
| 8.3 404 页面 | 简洁 404 | `NotFoundPage.tsx` |

## Phase 9: 构建与部署

| 任务 | 说明 | 输出 | 状态 |
|---|---|---|---|
| 9.1 配置 Vite base path | 仓库名为 `BornfreeYan`，属于项目站点，base 为 `/BornfreeYan/` | `vite.config.ts` | ✅ |
| 9.2 配置 GitHub Actions | 已确认：push 到 main 自动构建并部署到 gh-pages | `.github/workflows/deploy.yml` | ✅ |
| 9.3 本地构建验证 | `npm run build` 无错误 | `dist/` | ✅ |
| 9.4 首次部署 | push 到 GitHub，验证 Pages 生效 | 线上站点可访问 | ✅ GitHub Actions 部署成功 |
| 9.5 配置 404 重定向 | 解决客户端路由刷新 404 问题 | `public/404.html` + 重定向脚本 | ✅ |

## Phase 10: 收尾与文档

| 任务 | 说明 | 输出 |
|---|---|---|
| 10.1 README.md | 项目说明、本地启动、部署方式 | `README.md` |
| 10.2 代码注释 | 模块级注释，说明组件/函数用途 | 源码 |
| 10.3 清理无用文件 | 删除 Vite 默认示例文件 | — |

## 依赖关系图

```
Phase 1 初始化
    ↓
Phase 2 全局布局/主题
    ↓
Phase 3 首页
    ↓
Phase 4 Article ← 依赖 Phase 1
Phase 5 Project ← 依赖 Phase 1
Phase 6 Memo    ← 依赖 Phase 1
Phase 7 About   ← 依赖 Phase 1
    ↓
Phase 8 路由集成
    ↓
Phase 9 构建部署
    ↓
Phase 10 文档收尾
```

## 风险与阻塞项

- **三角钢琴 3D 动画**：放到 v1.1，v1.0 先用占位。
- **GitHub API 速率限制**：项目少时不影响，后续可加 token。
- **GitHub Pages 部署路径**：个人站点仓库 `BornfreeYan/BornfreeYan` 通常部署在根路径，无需 `base`。

---

*Task List 随 PRD 更新，完成一项勾选一项。*
