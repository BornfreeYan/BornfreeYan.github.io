---
title: "1_数组理论"
date: "2026-08-28"
tags:
  - 数组
  - leetcode
categories:
  - CS
state:
  - finished
---
# 数组理论基础
## 核心要点
数组是存放**在连续内存空间上的相同类型数据的集合**。数组可以方便地通过下标索引的方式获取下标对应的数据。
## 重要注意事项
1. **数组下标都是从0开始的**
2. **数组内存空间的地址是连续的**
3. 因为数组在内存空间地址连续，所以在删除或增添元素时，**需要移动**其他元素的地址
4. **数组的元素是不能删的，只能覆盖**
![](https://file1.kamacoder.com/i/algo/%E7%AE%97%E6%B3%95%E9%80%9A%E5%85%B3%E6%95%B0%E7%BB%841.png)
## 二维数组内存分布
在C语言中，二维数组是连续分布的。示例代码：
```C
#include <stdio.h>

void test_arr() {
    int array[2][3] = {
        {0, 1, 2},
        {3, 4, 5}
    };
    printf("%p %p %p\n", &array[0][0], &array[0][1], &array[0][2]);
    printf("%p %p %p\n", &array[1][0], &array[1][1], &array[1][2]);
}

int main() {
    test_arr();
    return 0;
}
```
测试地址结果：
```
0x7ffee4065820 0x7ffee4065824 0x7ffee4065828
0x7ffee406582c 0x7ffee4065830 0x7ffee4065834
```
相邻数组元素地址相差4个字节（int型）。
**结论：在C语言中二维数组在地址空间上是连续的。**
