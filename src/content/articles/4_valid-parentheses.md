---
title: "4_有效的括号"
date: "2026-09-02"
state:
  - finished
categories:
  - CS
tags:
  - 栈
  - leetcode
---
# 20 有效的括号
https://leetcode.cn/problems/valid-parentheses/description/

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s`，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

**示例 1：**

```
输入：s = "()"
输出：true
```

**示例 2：**

```
输入：s = "()[]{}"
输出：true
```

**示例 3：**

```
输入：s = "(]"
输出：false
```

**示例 4：**

```
输入：s = "([])"
输出：true
```

**示例 5：**

```
输入：s = "([)]"
输出：false
```

**提示：**

- `1 <= s.length <= 10^4`
- `s` 仅由括号 `'()[]{}'` 组成

# 思路

遍历字符串，遇到左括号就压入栈中；遇到右括号时，检查栈顶元素是否是对应的左括号：
- 如果匹配，弹出栈顶元素继续。
- 如果不匹配（或栈为空），直接返回 `false`。

最后检查栈是否为空：空则全部匹配，否则有多余左括号。

**复杂度**：时间 O(n)（每个字符最多入栈、出栈一次），空间 O(n)（最坏情况全是左括号）。

# 题解

```python
class Solution:
    def isValid(self, s: str) -> bool:
        arr = []
        length = len(s)
        if length==0: return True
        if length==1: return False
        for ch in s:
            if ch == '(' or ch == '{' or ch == '[':
                arr.append(ch)
            elif ch == ')':
                if not arr or arr[-1] != '(':
                    return False
                else:arr.pop()

            elif ch == '}':
                if not arr or arr[-1] != '{':
                    return False
                else:arr.pop()
            else:
                if not arr or arr[-1] != '[':
                    return False
                else:arr.pop()
        return len(arr)==0
```
