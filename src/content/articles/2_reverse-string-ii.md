---
title: "2_反转字符串II"
date: "2026-08-29"
state:
  - finished
categories:
  - CS
tags:
  - 字符串
  - 双指针
  - leetcode
---
# 541.反转字符串II
[541.反转字符串II](https://leetcode.cn/problems/reverse-string-ii/description/)
给定一个字符串 `s` 和一个整数 `k`，每计数至 `2k` 个字符，就反转这 `2k` 字符中的前 `k` 个字符。
- 若剩余字符少于 `k` 个，则反转剩余全部字符
- 若剩余字符在 `k` 到 `2k` 之间，则反转前 `k` 个字符
**示例：**
```
输入：s = "abcdefg", k = 2
输出："bacdfeg"

输入：s = "abcd", k = 2
输出："bacd"
```
## 思路
这道题目其实就是模拟，实现题目中规定的反转规则就可以了：
- 核心思路：每 `2k` 个字符为一组，**分批反转前 k 个字符**
- 使用**双指针**在每组内进行反转
- 循环变量 `i` 每次递增 `2k`
- 注意处理边界：剩余字符可能不足 `k` 个
## 题解
C：
```c
char* reverseStr(char* s, int k) {
    int len = strlen(s);//获取字符串长度
  
    for(int i = 0;i<len;i += (2*k)){
        if(i+k>len){
            k = len - i;
        }
        if(i+k<len){
            k = k;
        }
        int left = i;
        int right = i+k-1;
        while(left<right){
            char temp = s[right];
            s[right] = s[left];
            s[left] = temp;
            right--;
            left++;
        }
    }
    return s;
}
```

Python：
```python
class Solution:
    def reverseStr(self, s: str, k: int) -> str:
        # 转换为列表好原地操作
        chars = list(s)
        n = len(chars)
        for i  in range(0,n,2*k):
            chars[i:i+k] = reversed(chars[i:i+k]) # 调用一个reversed函数
        return ''.join(chars) # 用join拼接列表为字符串，引号里面为空的话，就是直接拼接。你也可以在引号里面加上任何符号
```