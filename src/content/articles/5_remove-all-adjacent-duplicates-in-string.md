---
title: "5_删除字符串中所有相邻重复项"
date: "2026-09-02"
state:
  - finished
categories:
  - CS
tags:
  - 栈
  - leetcode
---
# 1047 删除字符串中的所有相邻重复项
https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/description/

给出由小写字母组成的字符串 `s`，**重复项删除操作**会选择两个相邻且相同的字母，并删除它们。

在 `s` 上反复执行重复项删除操作，直到无法继续删除。

在完成所有重复项删除操作后，返回最终的字符串。答案保证唯一。

**示例 1：**

```
输入："abbaca"
输出："ca"
解释：
例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，
这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，
其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
```

**示例 2：**

```
输入："azxxzy"
输出："ay"
```

**提示：**

- `1 <= s.length <= 10^5`
- `s` 仅由小写英文字母组成

# 思路

类似"消消乐"，遍历字符串，将字符依次压入栈：
- 当前字符与栈顶字符相同 → 弹出栈顶（消除一对）
- 当前字符与栈顶不同 → 压入栈

最后栈中剩余的字符即为结果，按序取出即可。

**复杂度**：时间 O(n)（每个字符最多入栈、出栈一次），空间 O(n)。

# 题解

```python
class Solution:
    def removeDuplicates(self, s: str) -> str:
        stack = []
        for ch in s:
            if stack and stack[-1] == ch:
                stack.pop()          # 相邻相同，消除一对
            else:
                stack.append(ch)     # 与栈顶不同，入栈
        return ''.join(stack)        # 栈中剩余字符即结果
```
