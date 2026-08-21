---
title: "test文章"
date: "2026-08-21"
categories:
  - CS
tags:
  - 八股
state:
  - finished
---
```dataviewjs
// 获取今天的日期字符串，格式为 YYYY-MM-DD
const today = dv.date('today').toISODate();

// 筛选所有 Front Matter 中 date 等于今天的页面
const pages = dv.pages()
    .where(p => p.date && dv.date(p.date)?.toISODate() === today);

// 输出结果
if (pages.length > 0) {
    dv.header(3, `📅 今天（${today}）更新的文章共 ${pages.length} 篇`);
    dv.list(pages.file.link);
} else {
    dv.paragraph(`📭 今天（${today}）没有找到匹配的文章。`);
}
```
![A-router-B](/images/A-router-B.jpg)
# 测试1
## 测试2
> 哈哈哈😄