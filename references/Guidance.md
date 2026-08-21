# BornfreeYan 个人博客 · 日常操作手册

> 面向非代码维护场景：发布文章、更新 About / Project、发 Memo、换图标头像等。
> 核心思路：**内容在知识库里写，一条命令发布到线上。**

---

## 0. 一句话流程

**改内容 → 跑 `publish.ps1` → 上线。**

只有 Memo 例外：Memo 是网页上直接发的，不需要脚本。

---

## 1. 发布文章（最常用）

文章在 Obsidian 知识库里写，脚本会自动挑选**日期等于今天**的笔记迁移过来。

### 步骤

1. **在知识库写文章**（任意文件夹都行）
   - frontmatter 必须带 `date: 2026-08-21`（等于发布当天）
   - `title`、`categories`、`tags` 建议都写上（`categories`/`tags` 可选，留空也行）
   - 可选 `cover: "图片URL"` 显示封面图（用图床链接或本地图片）
2. **确认今天要发的文章**：用你的 DataViewJS 看板，检查今天 `date` 的文章是不是你要发的
3. **发布前预览（可选）**：
   ```powershell
   powershell -ExecutionPolicy Bypass -File "D:\Local Knowledge_Base\1 Job\17 Projects\BornfreeYan\scripts\publish.ps1" -DryRun
   ```
   会列出今天将被迁移的文章，不实际发布。
4. **正式发布**：
   ```powershell
   powershell -ExecutionPolicy Bypass -File "D:\Local Knowledge_Base\1 Job\17 Projects\BornfreeYan\scripts\publish.ps1"
   ```
5. 等脚本跑完，打开 https://BornfreeYan.github.io 查看

### 脚本会自动做什么

```
[1/5] 扫描知识库 → 挑出 date=今天 的笔记
      ├─ 补 frontmatter 引号
      ├─ 把 ![[图片.png]] 复制到博客 public/images/ 并转成 ![alt](/images/图片.png)
      └─ 复制到博客 src/content/articles/
[2/5] pnpm build（构建站点 + 搜索索引 + sitemap）
[3/5] git commit + push 源码 main
[4/5] 发布构建产物到 gh-pages
[5/5] 完成
```

### 文章图片说明

- 笔记里的本地图片 `![[xxx.png]]`：脚本自动复制到博客，引用自动转换，**你不用管**
- 图床图片：文章里直接写 `![描述](https://你的图床.com/xxx.png)`，脚本不动它
- `cover:` 封面图同理：本地图会自动搬运，图床 URL 直接用

### 文件名规则

- 文章文件名建议用英文（如 `fastapi-notes.md`），脚本会原样迁移（空格自动转 `-`）
- 文件名会变成文章 URL，中文名会有编码问题，尽量避免

---

## 2. 更新 About 页

1. 打开 `D:\Local Knowledge_Base\1 Job\17 Projects\BornfreeYan\src\content\about.md`
2. 直接编辑内容（用任意文本编辑器或 Obsidian 打开该文件所在文件夹）
3. 保存后运行发布脚本：
   ```powershell
   powershell -ExecutionPolicy Bypass -File "D:\Local Knowledge_Base\1 Job\17 Projects\BornfreeYan\scripts\publish.ps1"
   ```

---

## 3. 更新 Project 页

1. 打开 `D:\Local Knowledge_Base\1 Job\17 Projects\BornfreeYan\src\data\projects.json`
2. 按下面的格式加/改项目：
   ```json
   {
     "title": "项目名",
     "description": "一句话简介",
     "github": "https://github.com/BornfreeYan/xxx",   // 可选，填了会显示 star 数
     "demo": "https://xxx.com",                        // 可选，在线演示地址
     "tags": ["FastAPI", "MySQL"],
     "featured": true
   }
   ```
3. 保存后运行发布脚本

---

## 4. 发 Memo（不用脚本）

Memo 就像朋友圈，直接在网页上发：

1. 打开 https://BornfreeYan.github.io/memos
2. 右上角点"连接"，粘贴 GitHub token（只保存在当前浏览器）
3. 写文字 + 图片
   - **本地上传**：点"本地上传"，选图（自动压缩到 1600px / JPEG 0.8）
   - **图床链接**：点"图床链接"，粘贴 `https://...` 图片 URL（只存链接，不占仓库）
4. 点"发布"

其他：
- 删除：悬停 memo 出现垃圾桶按钮（需已连接）
- 引用：点引用按钮，回复别人的 memo
- 点图片：打开灯箱大图，可左右切换、ESC 关闭

> Memo 数据存在博客仓库的 `data` 分支，发 Memo 不会触发站点构建，是实时生效的。

---

## 5. 换 Favicon / 头像

| 图标 | 文件位置 | 显示位置 |
|---|---|---|
| Favicon | `public/favicon.png` | 浏览器标签页 + 导航栏 Bornfree 左侧 |
| Memo 头像 | `public/avatar.png` | Memo 列表每条的头像 |

替换方法：用同名的新图片**覆盖**对应文件，然后跑发布脚本。

---

## 6. 常见问题

| 问题 | 处理 |
|---|---|
| 脚本说"今日没有文章" | 检查知识库笔记的 `date` 是不是今天、格式是不是 `2026-08-21` |
| 想发布昨天/前天的文章 | 把笔记里 `date` 改成今天，或手动把 md 复制到 `src/content/articles/` |
| 构建失败（报 title 缺失） | 文章 frontmatter 缺 `title`，补上 |
| 图片显示裂图 | 检查 `public/images/` 是否有对应图片；图床链接是否失效 |
| Memo 发不出去 | 检查是否已"连接"、token 是否过期、是否超过 6 张图 |
| 只想改一个文件但不想全量发布 | 目前脚本是全量流程，改完直接跑即可，没改的不会重复提交 |

---

## 7. 脚本位置速查

| 脚本 | 路径 | 作用 |
|---|---|---|
| 发布 | `D:\Local Knowledge_Base\1 Job\17 Projects\BornfreeYan\scripts\publish.ps1` | 迁移今日文章 + 构建 + 双分支发布 |
| 预览 | 同上，加 `-DryRun` 参数 | 只列今日文章，不发布 |
