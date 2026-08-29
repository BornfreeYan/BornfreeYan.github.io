---
title: "1_反转字符串"
date: "2026-08-29"
state:
  - finished
categories:
  - CS
tags:
  - 字符串
  - 双指针
  - leetcode
media:
  - 小红书
---
# 344.反转字符串
[344.反转字符串](https://leetcode.cn/problems/reverse-string/)
编写一个函数，其作用是**原地**反转输入字符串。
**示例：**
```
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]

输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```
## 思路
- 使用**双指针**从字符串两端向中间移动
- 每次循环交换两个指针指向的字符
- left < right 时继续，left >= right 时停止
- 这是反转问题的**基础模板**
## 题解
C:
```c
void reverseString(char* s, int sSize) {
    int left = 0;
    int right = sSize - 1;
    while(left<right){
        char temp = s[right];//用一个中间变量交换
        s[right] = s[left];
        s[left] = temp;
        left++;
        right--;
    }
}
```

Python:
```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        left = 0
        right = len(s)-1
        while left<right :
            temp = s[right]
            s[right] = s[left]
            s[left] = temp
            left +=1
            right -=1
```