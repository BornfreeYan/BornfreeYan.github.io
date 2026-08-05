# Bornfree Blog

个人数字档案馆 / 博客，部署在 GitHub Pages。

**在线地址**：https://BornfreeYan.github.io

## 技术栈

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [yaml](https://github.com/eemeli/yaml) + [react-markdown](https://github.com/remarkjs/react-markdown)

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 部署

项目使用 GitHub Actions 自动部署。每次 push 到 `main` 分支时，Actions 会自动构建并发布到 GitHub Pages。

在首次部署前，请确保仓库 Settings > Pages 中的 Source 已选择 **GitHub Actions**。

## 目录结构

```
src/
├── components/      # React 组件
├── pages/           # 页面组件
├── hooks/           # 自定义 Hooks
├── lib/             # 工具函数
├── content/         # 内容文件
│   ├── articles/    # Markdown 文章
│   ├── memos/       # Memo 数据
│   └── about.md     # 关于页面
├── data/            # 结构化数据
│   └── projects.json
├── App.tsx          # 路由入口
└── main.tsx         # 应用入口
```

## 添加文章

在 `src/content/articles/` 下新建 Markdown 文件，包含 frontmatter：

```yaml
---
title: "文章标题"
date: "2026-08-05"
categories:
  - 分类
tags:
  - 标签
description: "文章描述"
---
```

## 添加项目

编辑 `src/data/projects.json`，页面会自动从 GitHub API 拉取项目名与 star 数。

## 添加 Memo

编辑 `src/content/memos/memos.json`。

## 作者

Bornfree — [GitHub](https://github.com/BornfreeYan)
