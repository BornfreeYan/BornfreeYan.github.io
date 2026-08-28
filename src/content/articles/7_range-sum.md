---
title: "7_区间和"
date: "2026-08-28"
state:
  - finished
tags:
  - 数组
  - 前缀和
  - leetcode
categories:
  - CS
---
# 58.区间和
[58. 区间和（第九期模拟笔试）](https://kamacoder.com/problempage.php?pid=1070)
本题是ACM模式的，不是leetcode模式。

题目描述
给定一个整数数组 Array，请计算该数组在每个指定区间内元素的总和。
输入描述：第一行输入为整数数组 Array 的长度 n，接下来 n 行，每行一个整数，表示数组的元素。随后的输入为需要计算总和的区间，直至文件结束。
输出描述：输出每个指定区间内元素的总和。

输入示例：
```text
5
1
2
3
4
5
0 1
1 3
```
输出示例：
```text
3
9
```
## 思路
暴力解法会超时：查询m次，每次查询的范围都是从0 到 n - 1，时间复杂度是 O(n * m)，查询次数非常大的话，这个时间复杂度也是非常大的。
而前缀和可以解决这个问题。
前缀和的思想是**重复利用计算过的子数组之和，从而降低区间查询需要累加计算的次数。**
例如，我们要统计 vec[i] 这个数组上的区间和。
我们先做累加，即 p[i] 表示 下标 0 到 i 的 vec[i] 累加 之和。
如图：
![](https://file1.kamacoder.com/i/algo/20240627110604.png)
如果，我们想统计，在vec数组上 下标 2 到下标 5 之间的累加和，那是不是就用 p[5] - p[1] 就可以了。

**特别注意**： 在使用前缀和求解的时候，要特别**注意求解区间**。
如上图，如果我们要求区间下标 [2, 5] 的区间和，那么应该是 p[5] - p[1]，而不是 p[5] - p[2]。
# 代码实现
```c
#include <stdio.h>
#include <stdlib.h>//使用malloc必须

int main(){
    int num;
    scanf("%d",&num);
  
    int *a = (int*)malloc((num+1)*sizeof(int));
    a[0] = 0;
  
    for(int i = 1;i<=num;i++){
        int mm;
        scanf("%d",&mm);
        a[i] = a[i-1] + mm;
    }
    int m,n;//区间
    while (scanf("%d%d", &m, &n) == 2){//成功读取了 2 个整数时
        printf("%d\n",a[n+1]-a[m]);
    }
    free(a);
    return 0;
}
```
要点：
1. 前缀和数组多开一个空间，下标0设为0
2. 边读入边构建前缀和

python需要import用于输入输出的库，以下代码暂时未理解：
```python
import sys
input = sys.stdin.read

def main():
    data = input().split()
    index = 0
    n = int(data[index])
    index += 1
    vec = []
    for i in range(n):
        vec.append(int(data[index + i]))
    index += n

    p = [0] * n
    presum = 0
    for i in range(n):
        presum += vec[i]
        p[i] = presum

    results = []
    while index < len(data):
        a = int(data[index])
        b = int(data[index + 1])
        index += 2

        if a == 0:
            sum_value = p[b]
        else:
            sum_value = p[b] - p[a - 1]

        results.append(sum_value)

    for result in results:
        print(result)

if __name__ == "__main__":
    main()
```