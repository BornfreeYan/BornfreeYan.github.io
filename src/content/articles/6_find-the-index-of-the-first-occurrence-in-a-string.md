---
title: "6_实现strSTR"
date: "2026-08-29"
state:
  - finished
categories:
  - CS
tags:
  - 字符串
  - KMP
  - 双指针
  - leetcode
---
# 28.实现 strStr()
[实现 strStr()](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)
给你两个字符串 `haystack` 和 `needle`，返回 `needle` 在 `haystack` 中**首次出现的位置**，若不存在则返回 `-1`
**说明：**
- 当 `needle` 是空字符串时，返回 `0`
- 题目要求不使用语言内置的 `find` / `indexOf` 等函数
**示例：**
```
输入：haystack = "sadbutsad", needle = "sad"
输出：0
解释："sad" 在 "sadbutsad" 中首次出现的位置是 0

输入：haystack = "leetcode", needle = "leeto"
输出：-1
```
## 思路
- 暴力解法：双层循环，时间复杂度 O(m×n)
- **KMP算法**：时间复杂度 O(m+n)，重点掌握
- KMP 核心思想：**当匹配失败时，利用已匹配信息，不回退主串指针**，关键点是不回退！！！
## 暴力解法(Brute-Force)
```c
int strStr(char* haystack, char* needle) {//暴力解法
    int hlen = strlen(haystack);
    int nlen = strlen(needle);
  
    if (nlen == 0) return 0;  // 空串匹配
    for(int i = 0; i <= hlen - nlen; i++){
        int j = 0;
        while(j<nlen&&haystack[i + j] == needle[j]){
            j++;
        }
        if(j==nlen){
            return i;
        }
    }
    return -1;
}
```
---
>  暴力解法每一次都要回溯一下，有不必要的消耗，因此引入KMP算法：
## KMP算法详解
KMP主要应用在字符串匹配上。

KMP的主要思想是**当出现字符串不匹配时，可以知道一部分之前已经匹配的文本内容，可以利用这些信息避免从头再去做匹配了。**

所以如何记录已经匹配的文本内容，是KMP的重点，也是next数组肩负的重任。
### 前缀表（next数组）
KMP 的关键是计算 **前缀表**，也叫 `next` 数组。
以主串`aabaabaaf`,子串`aabaaf`为例
**前缀**：包含首字符但不包含尾字符的连续子串，例如a/aa/aab/aaba/aabaa
**后缀**：包含尾字符但不包含首字符的连续子串，例如f/af/aaf/baaf/abaaf
**前缀表含义**：当匹配失败时，子串可以跳过匹配的字符个数，本质是寻找子串中**相同前后缀的最长的长度**
![](https://file1.kamacoder.com/i/algo/KMP%E7%B2%BE%E8%AE%B21.gif)
可以看出，文本串中第六个字符**b** 和 模式串的第六个字符**f**，不匹配了。如果暴力匹配，发现不匹配，此时就要从头匹配了。

但如果使用前缀表，就不会从头匹配，而是从上次已经匹配的内容开始匹配，找到了模式串中第三个字符b继续开始匹配。

此时就要问了**前缀表是如何记录的呢？**
首先要知道前缀表的任务是当前位置匹配失败，找到之前已经匹配上的位置，再重新匹配，此也意味着在某个字符失配时，前缀表会告诉你下一步匹配中，模式串应该跳到哪个位置。
那么什么是前缀表：**记录下标i之前（包括i）的字符串中，有多大长度的相同前缀后缀**
### 最长相同前后缀/前缀表的计算
对于上面的例子，有以下的最长相同前后缀表格：

| 下标i之前（包括i）的串 | 下标i | 最大相同前后缀长度                          | 备注                   |
| ------------ | --- | ---------------------------------- | -------------------- |
| a            | 0   | 0                                  | 单字母没有                |
| aa           | 1   | 1                                  | 前缀a，后缀a              |
| aab          | 2   | 0                                  | 前缀为a/aa，后缀为b/ab，没有相同 |
| aaba         | 3   | 1                                  | 前缀为a，后缀为a            |
| aabaa        | 4   | <font color="#ff0000">2（最长）</font> | aa和aa                |
| aabaaf       | 5   | 0                                  | 不存在                  |
### 为什么要用前缀表？
刚刚匹配的过程在下标5的地方遇到不匹配，模式串是指向f，如图：
![](https://file1.kamacoder.com/i/algo/KMP%E7%B2%BE%E8%AE%B21.png)
然后就找到了下标2，也就是b：
![](https://file1.kamacoder.com/i/algo/KMP%E7%B2%BE%E8%AE%B22.png)
**下标5之前这部分的字符串（也就是字符串aabaa）的最长相等的前缀 和 后缀字符串是 子字符串aa ，因为找到了最长相等的前缀和后缀，匹配失败的位置是后缀子串的后面，那么我们找到与其相同的前缀的后面重新匹配就可以了。**
### KMP 匹配过程
![](https://file1.kamacoder.com/i/algo/KMP%E7%B2%BE%E8%AE%B22.gif)
找到的不匹配的位置， 那么此时我们要看它的前一个字符的前缀表的数值是多少。
为什么要前一个字符的前缀表的数值呢，因为要找前面字符串的最长相同的前缀和后缀。
所以要看前一位的 前缀表的数值。
前一个字符的前缀表的数值是2， 所以把下标移动到下标2的位置继续比配。
### 前缀表与next数组关系
next数组就可以是前缀表本身，但是很多实现都是把前缀表统一减一（右移一位，初始位置为-1）、或者全体减1 之后作为next数组。这和KMP算法本身没啥关系，就是具体实现的方式不同。
为了初学的方便理解就不再对前缀表过多操作，就用其本身作为next数组。
## KMP题解（以前缀表本身为next数组）
### 前缀表（next数组）计算逻辑详解
**核心思想**：用已经计算好的next信息来加速计算当前位的next值
**以`needle = "aabaaf"`为例，手动计算前缀表：**

| 下标i | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| 字符 | a | a | b | a | a | f |
| next[i] | 0 | ? | ? | ? | ? | ? |
**手动计算过程：**
- `i=0`：单个字符，无前后缀，next[0]=0
- `i=1`（字符'a'）：前缀"a"，后缀"a"，相同长度1 → next[1]=1
- `i=2`（字符'b'）：前缀"a"/"aa"，后缀"b"/"ab"，无相同 → next[2]=0
- `i=3`（字符'a'）：前缀"a"，后缀"a"，相同长度1 → next[3]=1
- `i=4`（字符'a'）：前缀"a"/"aa"/"aab"，后缀"a"/"aa"/"baa"，最长相同是"aa" → next[4]=2
- `i=5`（字符'f'）：前缀"a"/"aa"/...，后缀"f"/"af"/...，无相同 → next[5]=0

**代码如何实现这个逻辑：**
```
j的双重含义：
1. 已匹配前后缀的长度
2. 指向前缀的下一个位置

当s[i] == s[j]时：长度+1，j++
当s[i] != s[j]时：j回退到next[j-1]（利用已知的匹配信息）
```

```c
int *getNext(char *s,int len){
    int *next = (int*)malloc(sizeof(int)*len);
  
    next[0] = 0;
    int j= 0;//j指向前缀末尾位置
    for(int i = 1;i<len;i++){//i指向后缀末尾位置
        while (j > 0 && s[i] != s[j]) {//前后缀不相同
            j = next[j - 1];
        }
        if (s[i] == s[j]) {//前后缀相同
            j++;
        }
        next[i] = j;
    }
    return next;
}
  
int strStr(char* haystack, char* needle) {//KMP
    int hlen = strlen(haystack);
    int nlen = strlen(needle);
    if (nlen == 0) return 0;    // 空串匹配，返回0
    int *next = getNext(needle,nlen);
  
    int j = 0;
    for(int i = 0;i<hlen;i++){
        while (j > 0 && haystack[i] != needle[j]) {
            j = next[j - 1];//回退
        }
        if (haystack[i] == needle[j]) {
            j++;
        }
        if(j == nlen){
            free(next);
            return i - nlen + 1;
        }
    }
    return -1;
}
```
**代码逻辑要点：**

| 要点 | 说明 |
| --- | --- |
| next数组含义 | `next[i]` = 以下标i结尾的子串的**最长相同前后缀长度** |
| j的双重角色 | 构建next时指向前缀末尾；匹配时指向已匹配位置 |
| 回退条件 | `while (j > 0 && s[i] != s[j]) j = next[j - 1]` |
| 易错点 | 回退到`next[j-1]`而非`next[j]` |
## KMP vs 暴力

| 对比项   | 暴力法    | KMP     |
| ----- | ------ | ------- |
| 时间复杂度 | O(m×n) | O(m+n)  |
| 空间复杂度 | O(1)   | O(n)    |
| 主串指针  | 会回退    | 不回退     |
| 核心思想  | 无      | 利用已匹配信息 |
