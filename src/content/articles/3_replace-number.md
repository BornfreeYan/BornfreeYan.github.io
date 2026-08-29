---
title: "3_替换数字"
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
# 替换数字
这是卡码网的一道题：[替换数字](https://kamacoder.com/problempage.php?pid=1064)。需要控制输入输出。
给定一个字符串 s，它包含**小写字母和数字字符**，请编写一个函数，将字符串中的字母字符保持不变，而将每个数字字符替换为number。

例如，对于输入字符串 "a1b2c3"，函数应该将其转换为 "anumberbnumbercnumber"。
对于输入字符串 "a5b"，函数应该将其转换为 "anumberb"

输入：一个字符串 s,s 仅包含小写字母和数字字符。
输出：打印一个新的字符串，其中每个数字字符都被替换为了number

样例输入：a1b2c3
样例输出：anumberbnumbercnumber

数据范围：  1 <= s.length < 10000
## 思路
- 这是一道**模拟题**，考察字符串操作
- 不能直接修改（因为数字变长），需要**先统计，再扩容，最后从后向前填入**
- 使用**双指针**从后向前填充
- 核心思想：**从后往前填充，避免数据覆盖**
![](https://file1.kamacoder.com/i/algo/20231030173058.png)
为什么要从后往前遍历？因为我们把输入字符串s放在了输出字符串str的前面，如果从前面开始向后覆盖的话，会把一些字母覆盖掉，比如输入 `a1b`，如果从前往后写，`str[0] = 'a'` ✓；发现 `str[1] = '1'`，要展开成 `number`（6个字符）；需要把 `str[1]到str[6]` 都占用；但 `str[2] = 'b'` 还没处理，就被覆盖了！

## 题解
先补充一下字符和数组的区别，在C语言中，字符可以认为是一个字符数组，数组是字符最常见的存储方式。把一个字符串存入一个数组时，也把结束符 '\0'存入数组，并以此作为该字符串是否结束的标志。

```c
#include<stdio.h>
#include <stdlib.h>

int main(){
    char s[10000];
    scanf("%s",s);
  
    //计算数字的数量以及需要扩充多大的数组
    int i = 0;
    int numcount = 0;//数字数量
    int strcount = 0;//输入字符串长度
    while(s[i]!='\0'){
        if(s[i]>='0'&&s[i]<='9'){
            numcount++,strcount++;
        }else{
            strcount++;
        }
        i++;
    }
    int len = numcount*5+strcount;//最终的长度,number是6个字母但是需要去掉strcount重复的部分
    char *str = (char*)malloc(sizeof(char)*(len+1));
    for(i = 0;i<strcount;i++){
        str[i] = s[i];//把输入的s字符串搬到str
    }
  
    int left = strcount - 1;
    int right = len - 1;
  
    while(left>=0){
        if(str[left]>='0'&&str[left]<='9'){
            str[right--] = 'r';//等价于先赋值str[right]，再自减
            str[right--] = 'e';
            str[right--] = 'b';
            str[right--] = 'm';
            str[right--] = 'u';
            str[right--] = 'n';
        }else{
            //原先就是字母
            str[right--] = str[left];
        }
        left--;
    }
  
    str[len] = '\0';
    printf("%s",str);
    free(str);
    return 0;
}
```

Python:
```python
def replace_digits(s: str) -> str:
    res = []
    for ch in s:
        if '0'<= ch <= '9':
            res.append('number')
        else:
            res.append(ch)
    return ''.join(res)
  
# ============= 关键在这下面（ACM模式的输入输出） =============
if __name__ == "__main__":
    s = input()          # 从控制台读取一行字符串（比如 "a1b2c3"）
    result = replace_digits(s)
    print(result)        # 必须打印出来，平台才能检测到
```