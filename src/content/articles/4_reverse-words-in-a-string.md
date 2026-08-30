---
title: "4_翻转字符串里的单词"
date: "2026-08-30"
state:
  - finished
categories:
  - CS
tags:
  - 字符串
  - 双指针
  - leetcode
---
# 151.翻转字符串里的单词
[151.翻转字符串里的单词](https://leetcode.cn/problems/reverse-words-in-a-string/description/)
给定一个字符串，逐个翻转字符串中的每个单词。

示例 1：  
输入: "the sky is blue"  
输出: "blue is sky the"

示例 2：  
输入: "  hello world!  "  
输出: "world! hello"  
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。

示例 3：  
输入: "a good     example"  
输出: "example good a"  
解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
## 思路
想一下，我们将整个字符串都反转过来，那么单词的顺序指定是倒序了，只不过单词本身也倒序了，那么再把单词反转一下，单词不就正过来了。

所以解题思路如下：
- 移除多余空格(包括字符串前面的、中间的、后面的)
- 将整个字符串反转
- 将每个单词反转
## 题解

```c
// 翻转字符串中指定范围的字符
void reverse(char* s, int start, int end){
    while(start<end){
        char temp = s[start];
        s[start] = s[end];
        s[end] = temp;
        start++;
        end--;
    }
}
  
//删除空格,快慢指针法
void deleteExtraSpace(char *s) {
    int slow = 0, fast = 0, len = strlen(s);
    int firstWord = 1;  // 标记是否是第一个单词
    while(fast < len){
        if(s[fast] != ' '){
            // 非空格：如果是第一个单词，直接复制
            // 如果不是第一个单词，先加个空格再复制
            if (!firstWord) {
                s[slow++] = ' ';
            }
            firstWord = 0;
            // 复制整个单词
            while (fast < len && s[fast] != ' ') {
                s[slow++] = s[fast++];
            }
        } else {
            fast++;  // 跳过空格
        }
    }
    s[slow] = '\0';
}

char* reverseWords(char* s) {
    deleteExtraSpace(s);
  
    //翻转整个字符串
    reverse(s,0,strlen(s)-1);
  
    //针对单词进行再翻转
    int slow = 0; // 指向每个单词的开头位置的指针
    for (int i = 0; i <= strlen(s); i++) { // 遍历整个字符串
        if (s[i] ==' ' || s[i] == '\0') { // 如果当前字符是空格或空字符，说明一个单词结束了
            reverse(s, slow, i-1); // 翻转单词
            slow = i + 1; // 将 slow 指针指向下一个单词的开头位置
        }
    }
    return s; // 返回处理后的字符串
}
```