# Blog 操作手册

> 本手册说明如何手动发布文章、管理图片、执行 Git 流程。

## 1. 项目路径

```
D:/Local Knowledge_Base/1 Job/17 Projects/Blog
```

仓库地址：

```
https://github.com/BornfreeYan/BornfreeYan.github.io
```

线上地址：

```
https://bornfreeyan.github.io/
```

## 2. 文章放哪里

所有文章放在：

```
src/content/articles/
```

例如：

```
src/content/articles/
├── hello-world.md
├── why-digital-garden.md
└── my-new-post.md
```

### 文章格式

每篇文章必须是 Markdown 文件，开头带 YAML frontmatter：

```yaml
---
title: "文章标题"
date: "2026-08-06"
categories:
  - 随笔
tags:
  - 博客
  - 分享
description: "这篇文章的简短描述，会显示在卡片列表中"
---

# 文章正文

正文支持 Markdown 语法。

## 二级标题

- 列表项
- 列表项

**加粗**、*斜体*、`行内代码`。

```python
# 代码块
print("Hello")
```
```

### 字段说明

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，`YYYY-MM-DD` 格式 |
| `categories` | 否 | 分类数组，建议 1 个 |
| `tags` | 否 | 标签数组 |
| `description` | 否 | 文章描述，用于列表页卡片 |
| `cover` | 否 | 封面图路径（见第 3 节） |

## 3. 图片放哪里

所有图片放在：

```
public/images/
```

例如：

```
public/images/
├── cover.png
├── diagram.svg
└── 2026-08-06/
    └── screenshot.png
```

### 图片引用方式

在 Markdown 中，使用相对网站根目录的路径引用：

```markdown
![描述](/images/cover.png)
```

如果是子目录：

```markdown
![描述](/images/2026-08-06/screenshot.png)
```

### 封面图

在 frontmatter 中设置 `cover`：

```yaml
---
title: "我的新文章"
date: "2026-08-06"
cover: "/images/cover.png"
---
```

## 4. 手动发布流程

### 第一步：写文章

在 `src/content/articles/` 下新建 Markdown 文件，按上述格式写好 frontmatter 和正文。

### 第二步：添加图片（如有）

把图片放到 `public/images/` 下，并在文章中引用。

### 第三步：本地验证（可选但推荐）

```bash
cd "D:/Local Knowledge_Base/1 Job/17 Projects/Blog"
npm run build
```

如果构建成功，没有报错，说明格式基本正确。

### 第四步：Git 提交

在项目根目录执行：

```bash
git add .
git commit -m "post: 添加文章《文章标题》"
git push origin main
```

### 第五步：等待自动部署

push 后 GitHub Actions 会自动构建并部署到 Pages，大约 1-2 分钟完成。

可以在仓库的 Actions 页面查看进度：

```
https://github.com/BornfreeYan/BornfreeYan.github.io/actions
```

部署完成后，访问 `https://bornfreeyan.github.io/` 即可看到新文章。

## 5. 使用脚本发布（可选）

obsidian  vault 中有一个发布脚本，用于把当天笔记自动发布到博客：

```powershell
powershell -ExecutionPolicy Bypass -File "D:/Local Knowledge_Base/3 Filestorage/Files/scripts/publish-to-blog.ps1"
```

这个脚本会自动：
- 扫描 vault 中当天 `date` 字段等于今日的 Markdown 文件
- 复制到 `src/content/articles/`
- 执行 Git add / commit / push

具体用法见脚本说明。

## 6. 常见问题

### Q1：分类/标签页面不显示新文章？

确认 frontmatter 中 `categories` 和 `tags` 是数组格式：

```yaml
categories:
  - 随笔
tags:
  - 博客
  - 分享
```

不是字符串：

```yaml
# 错误示例
categories: "随笔"
tags: "博客"
```

### Q2：图片在线上不显示？

- 图片必须放在 `public/images/` 下
- 引用路径必须以 `/images/` 开头
- 不要放在 `src/content/articles/` 下

### Q3：push 后网站没有更新？

1. 查看 Actions 是否成功：`https://github.com/BornfreeYan/BornfreeYan.github.io/actions`
2. 清除浏览器缓存后刷新
3. 等待 1-2 分钟，GitHub Pages 有缓存延迟

### Q4：想新增项目怎么操作？

编辑 `src/data/projects.json`，添加项目对象后 push 即可。

```json
{
  "id": "project-id",
  "description": "项目描述",
  "tech": ["React", "TypeScript"],
  "github": "https://github.com/BornfreeYan/xxx",
  "demo": "https://xxx.github.io"
}
```

### Q5：想新增 Memo 怎么操作？

编辑 `src/content/memos/memos.json`，添加对象后 push 即可。

```json
{
  "id": "memo-3",
  "content": "Memo 内容",
  "date": "2026-08-06T10:00:00",
  "tags": ["标签"]
}
```

---

*本手册随项目更新，如有新流程会同步补充。*
