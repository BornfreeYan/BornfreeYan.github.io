---
title: "3_赎金信"
date: "2026-08-31"
state:
  - finished
categories:
  - CS
tags:
  - 哈希表
  - leetcode
---
# 383.赎金信
[383.赎金信](https://leetcode.cn/problems/ransom-note/)
给定一个赎金信 (ransom) 字符串和一个杂志(magazine)字符串，判断第一个字符串 ransom 能不能由第二个字符串 magazines 里面的字符构成。如果可以构成，返回 true ；否则返回 false。

(题目说明：为了不暴露赎金信字迹，要从杂志上搜索各个需要的字母，组成单词来表达意思。杂志字符串中的每个字符只能在赎金信字符串中使用一次。)

**注意：**
你可以假设两个字符串均只含有小写字母。
canConstruct("a", "b") -> false  
canConstruct("aa", "ab") -> false  
canConstruct("aa", "aab") -> true

## 思路
这道题目和[242.有效的字母异位词](https://programmercarl.com/0242.%E6%9C%89%E6%95%88%E7%9A%84%E5%AD%97%E6%AF%8D%E5%BC%82%E4%BD%8D%E8%AF%8D.html)很像，本题判断第一个字符串ransom能不能由第二个字符串magazines里面的字符构成。
当然用时间复杂度的$O(n^2)$的暴力枚举。也可以用哈希法，毕竟哈希表就是用来查找是否有某个元素以及对应的数量的。
题目说只有小写字母，那就是26种可能，用数组容纳。用一个长度为26的数组来记录magazine里字母出现的次数。
然后再去验证这个数组是否包含了ransom所需要的所有字母（注意，magazine 里的字母无论是种类还是数量都要大于等于 ransom）。
## 题解
注意c语言中，字符串字母其实就是数字ASCII码，比如'a'=97，所以有* magazine 的操作
```c
bool canConstruct(char* ransomNote, char* magazine) {
    int hashmap[26] = {0};
    // 对magazine中字符计数
    while (*magazine != '\0') hashmap[*magazine++ % 26]++;
    // 遍历ransomNote，对应的字符自减，小于0说明该字符magazine没有或不足够表示
    while (*ransomNote != '\0') hashmap[*ransomNote++ % 26]--;
    // 如果数组中存在负数，说明ransomNote不能由magazine里面的字符构成
    for (int i = 0; i < 26; i++) {
        if (hashmap[i] < 0) return false;
    }
    return true;
}
```

而python需要借助函数，order函数用于输出ASCII码数字编号。
```python
print(ord('a'))  # 输出 97
```
所以：
-  `ord()` 把字符变数字
-  `ord(char) - ord('a')` 把字母变 0-25 索引
-  `for char in string` 遍历字符串
```python
class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        if len(ransomNote)>len(magazine): return False
        count = [0]* 26
        for letter in magazine:
            count[ord(letter)-ord('a')] +=1
        for letter in ransomNote:
            count[ord(letter)-ord('a')] -=1
            if count[ord(letter)-ord('a')]<0:return False
        return True
```