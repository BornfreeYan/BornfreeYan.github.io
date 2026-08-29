---
title: "5_右旋转字符串"
date: "2026-08-29"
state:
  - finished
categories:
  - CS
tags:
  - 字符串
  - 模拟
  - leetcode
---
# 右旋转字符串
[右旋转字符串](https://kamacoder.com/problempage.php?pid=1065)
字符串的右旋转操作是把字符串尾部的若干个字符转移到字符串的前面。给定一个字符串 s 和一个正整数 k，请编写一个函数，将字符串中的后面 k 个字符移到字符串的前面，实现字符串的右旋转操作。

例如，对于输入字符串 "abcdefg" 和整数 2，函数应该将其转换为 "fgabcde"。

输入：输入共包含两行，第一行为一个正整数 k，代表右旋转的位数。第二行为字符串 s，代表需要旋转的字符串。

输出：输出共一行，为进行了右旋转操作后的字符串。

样例输入：
```
2
abcdefg 
```
样例输出：
```
fgabcde
```
## 思路
其实还是和上题一样的思路，整个字符串倒序，然后分块倒序：
![](https://file1.kamacoder.com/i/algo/20231106172058.png)

## 题解
```c
#include <stdio.h>
#include <string.h>
  
void reverse(char *s, int left, int right){
    while(left <= right)
    {
        char c = s[left];
        s[left] = s[right];
        s[right] = c;
        left++;
        right--;
    }
}
  
void rightRotate(char *s, int k){
    int len = strlen(s);
    reverse(s, 0, len - 1);       // 整体反转
    reverse(s, 0, k - 1);   // 反转前k位
    reverse(s, k, len - 1); // 反转后部分
}
int main(){
    int k;
    scanf("%d",&k);
  
    char s[10000];
    scanf("%s", s);
  
    rightRotate(s, k);
    printf("%s\n", s);
  
    return 0;
}
```