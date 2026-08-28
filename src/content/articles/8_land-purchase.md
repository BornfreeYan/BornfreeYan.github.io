---
title: "8_开发商购买土地"
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
# 44. 开发商购买土地
[44. 开发商购买土地（第五期模拟笔试）](https://kamacoder.com/problempage.php?pid=1044)
在一个城市区域内，被划分成了n * m个连续的区块，每个区块都拥有不同的权值，代表着其土地价值。目前，有两家开发公司，A 公司和 B 公司，希望购买这个城市区域的土地。

现在，需要将这个城市区域的所有区块分配给 A 公司和 B 公司。

然而，由于城市规划的限制，只允许将区域按横向或纵向划分成两个子区域，而且每个子区域都必须包含一个或多个区块。

为了确保公平竞争，你需要找到一种分配方式，使得 A 公司和 B 公司各自的子区域内的土地总价值之差最小。

注意：区块不可再分。

输入描述：
第一行输入两个正整数，代表 n 和 m。
接下来的 n 行，每行输出 m 个正整数。

输出描述：
请输出一个整数，代表两个子区域内土地总价值之间的最小差距。

输入示例：
```text
3 3
1 2 3
2 1 3
1 2 3
```
输出示例：
0

提示：
如果将区域按照如下方式划分：
```text
1 2 | 3
2 1 | 3
1 2 | 3
```
两个子区域内土地总价值之间的最小差距可以达到 0。
## 题解
```c
#include<stdio.h>
#include<stdlib.h>
#include <limits.h>//用于无穷大的表示

int main(){
    int n = 0,m = 0;
    scanf("%d%d",&n,&m);
    int *a = (int*)malloc(sizeof(int)*n);//行前缀和数组
    int *b = (int*)malloc(sizeof(int)*m);//列前缀和数组
  
    //初始化数组
    for(int i = 0;i<n;i++){
        a[i] = 0;
    }
    for(int i = 0;i<m;i++){
        b[i] = 0;
    }
  
    //读取区块权值并计算每行和每列的总权值，也就是单行/单列的总和
    for(int i = 0;i<n;i++){
        for(int j = 0;j<m;j++){
            int temp;
            scanf("%d",&temp);
            a[i] += temp;
            b[j] += temp;
        }
    }
  
    //计算a/b前缀和,原地修改，a/b从原来的单行/单列的总和变成了前缀和的数组
    for(int i = 1;i<n;i++){
        a[i] += a[i-1];
    }
    for(int i = 1;i<m;i++){
        b[i] += b[i-1];
    }
  
    //使用abs()计算绝对值|total-2*a[i]|或|total-2*b[i]|
    /*
    A得到 prefix[i]，B得到 total - prefix[i]
    差距 = |prefix[i] - (total - prefix[i])|
         = |2*prefix[i] - total|
         = |total - 2*prefix[i]|
    */
    int test = INT_MAX;//初始化为无穷大
    int total = a[n-1];
    for(int i = 0;i<(n-1);i++){
        if(test>abs(total-2*a[i])){
            test = abs(total-2*a[i]);
        }
    }
    for(int i = 0;i<(m-1);i++){
        if(test>abs(total-2*b[i])){
            test = abs(total-2*b[i]);
        }
    }
  
    free(a);
    free(b);
    printf("%d\n", test);
    return 0;
}
```

python暂未理解：
```python
def main():
    import sys
    input = sys.stdin.read
    data = input().split()

    idx = 0
    n = int(data[idx])
    idx += 1
    m = int(data[idx])
    idx += 1
    sum = 0
    vec = []
    for i in range(n):
        row = []
        for j in range(m):
            num = int(data[idx])
            idx += 1
            row.append(num)
            sum += num
        vec.append(row)

    # 统计横向
    horizontal = [0] * n
    for i in range(n):
        for j in range(m):
            horizontal[i] += vec[i][j]

    # 统计纵向
    vertical = [0] * m
    for j in range(m):
        for i in range(n):
            vertical[j] += vec[i][j]

    result = float('inf')
    horizontalCut = 0
    for i in range(n):
        horizontalCut += horizontal[i]
        result = min(result, abs(sum - 2 * horizontalCut))

    verticalCut = 0
    for j in range(m):
        verticalCut += vertical[j]
        result = min(result, abs(sum - 2 * verticalCut))

    print(result)

if __name__ == "__main__":
    main()
```