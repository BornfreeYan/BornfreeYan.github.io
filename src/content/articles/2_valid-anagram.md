---
title: "2_有效的字母异位词"
date: "2026-08-31"
state:
  - finished
categories:
  - CS
tags:
  - 哈希表
  - 字符串
  - leetcode
---
# 242.有效的字母异位词
[242.有效的字母异位词](https://leetcode.cn/problems/valid-anagram/description/)

给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

示例 1: 输入: s = "anagram", t = "nagaram" 输出: true

示例 2: 输入: s = "rat", t = "car" 输出: false

**说明:** 你可以假设字符串只包含小写字母。字母异位词是通过重新排列不同单词或短语的字母而形成的单词或短语，并使用所有原字母一次。
## 思路
暴力的解法，两层for循环，同时还要记录字符是否重复出现，很明显时间复杂度是 $O(n^2)$

**数组其实就是一个简单哈希表**，而且这道题目中字符串只有小写字符，那么就可以定义一个数组，来记录字符串s里字符出现的次数。

定义一个数组叫做record用来记录字符串s里字符出现的次数。
需要把字符映射到数组也就是哈希表的索引下标上，**因为字符a到字符z的ASCII是26个连续的数值，所以字符a映射为下标0，相应的字符z映射为下标25。**

再遍历 字符串s的时候，**只需要将 s[i] - ‘a’ 所在的元素做+1 操作即可，并不需要记住字符a的ASCII，只要求出一个相对数值就可以了。** 这样就将字符串s中字符出现的次数，统计出来了。

那看一下如何检查字符串t中是否出现了这些字符，同样在遍历字符串t的时候，对t中出现的字符映射哈希表索引上的数值再做-1的操作。

那么最后检查一下，**record数组如果有的元素不为零0，说明字符串s和t一定是谁多了字符或者谁少了字符，return false。**

最后如果record数组所有元素都为零0，说明字符串s和t是字母异位词，return true。

时间复杂度为O(n)，空间上因为定义是的一个常量大小的辅助数组，所以空间复杂度为O(1)。
## 补充C语言知识点：字符串的一些用法
在解决此题之前，先了解一下字符串的相关操作：
### 1. 字符串基本属性
- `strlen(str)`：获取C风格字符串长度（python是len(str)）
- `str[i]`：访问第i个字符（从0开始）（python没有）

### 2. 字符串遍历
```c
// C风格字符串遍历
for(int i = 0; i < strlen(str); i++) {
    printf("%c\n", str[i]);
}
```

### 3. 字符串与字符操作
- 字符可以通过ASCII码进行运算，如 `'c' - 'a'` 得到2
- 字符串本质上是字符数组，在C风格中用字符指针访问
- 可以通过 `s[i]` 直接访问字符串中特定位置的字符

### 4. 在哈希表中的应用
- 字符可以直接作为哈希表的键值
- 通过 `s[i] - 'a'` 可以将字符映射到数组索引（适用于小写字母）
- 可用于统计字符频次、判断字符存在性等

## 题解
C:
```c
bool isAnagram(char* s, char* t) {
    int len1 = strlen(s),len2 = strlen(t);
    if(len1 != len2){
        return false;//长度不同
    }
  
    int map1[26] = {0},map2[26] = {0};//赋一个0，剩余25个也都会自动补0
    for (int i = 0; i < len1; i++) {
        // char - char = int，比如 'c'-'a' = 99-97 = 2；字符串就是char型数组，用指针访问而已，s[0]就是第一个字符
        map1[s[i] - 'a'] += 1;//这样a就是数组下标为0的
        map2[t[i] - 'a'] += 1;
    }
  
    for(int i = 0;i<26;i++){
        if(map1[i]!=map2[i]){
            return false;
        }
    }
  
    return true;
}
```

Python:
```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s)!=len(t): return False
        count = [0]*26
        for letter in t:
            count[ord(letter)-ord('a')] +=1
        for letter in s:
            count[ord(letter)-ord('a')] -=1
        for i in range(0,26):
            if count[i]!= 0:return False
        return True
```