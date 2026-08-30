---
title: "7_四数相加II"
date: "2026-08-31"
state:
  - finished
categories:
  - CS
tags:
  - 哈希表
  - leetcode
---
# 454.四数相加II
[454.四数相加II](https://leetcode.cn/problems/4sum-ii/)
给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。

为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 $-2^{28}$ 到 $2^{28} - 1$ 之间，最终结果不会超过 $2^{31} - 1$ 。

**例如:**
输入:
- A = [ 1, 2]
- B = [-2,-1]
- C = [-1, 2]
- D = [ 0, 2]
输出:
2

**解释:**
两个元组如下:
1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
## 思路
**问题本质**：从4个数组中各选一个数，四数之和为0，统计满足条件的元组数量。

**暴力枚举问题**：四层循环 O(N⁴)，N=500 时太慢。

**核心优化思路：两两配对 + 哈希表**
```
A[i] + B[j] + C[k] + D[l] = 0
→ 移项得：A[i] + B[j] = -(C[k] + D[l])
→ 只需找"互为相反数"的两组数之和
```
**具体步骤**：

| 阶段 | 操作 | 复杂度 |
|------|------|--------|
| 第一步 | 枚举 A+B 的所有可能和，存入哈希表 (key=sum, value=出现次数) | O(N²) |
| 第二步 | 枚举 C+D 的所有可能和，查找 `-(C[k]+D[l])` 在哈希表中的出现次数 | O(N²) |
| 第三步 | 累加所有匹配次数 | - |
**时间复杂度**：O(N²)  

**空间复杂度**：O(N²)（哈希表最多存 N² 个不同的和）

---
C代码中使用的是 **uthash** 库（C语言第三方哈希表实现）：
- `HASH_ADD_INT`：插入到哈希表
- `HASH_FIND_INT`：按整数键查找
- `HASH_FIND_INT` 返回 NULL 表示未找到

## C题解
```c
typedef struct {
    int key;
    int count;
    UT_hash_handle hh;
} HashItem;
  
int fourSumCount(int* nums1, int n1, int* nums2, int n2,
                 int* nums3, int n3, int* nums4, int n4) {
    HashItem *hashTable = NULL, *item, *tmp;
    // 插入A+B
    for (int i = 0; i < n1; i++)
        for (int j = 0; j < n2; j++) {
            int sum = nums1[i] + nums2[j];
            HASH_FIND_INT(hashTable, &sum, item);
            if (!item) {
                item = malloc(sizeof(HashItem));
                item->key = sum; item->count = 1;
                HASH_ADD_INT(hashTable, key, item);
            } else {
                item->count++;
            }
        }
    int ans = 0;
    // 查找-(C+D)
    for (int i = 0; i < n3; i++)
        for (int j = 0; j < n4; j++) {
            int target = -(nums3[i] + nums4[j]);
            HASH_FIND_INT(hashTable, &target, item);
            if (item) ans += item->count;
        }
    // 释放内存...
    return ans;
}
```

## Python题解
不需要实现数据结构，用字典。
```python
class Solution(object):
    def fourSumCount(self, nums1, nums2, nums3, nums4):
        # 使用字典存储nums1和nums2中的元素及其和
        hashmap = dict()
        for n1 in nums1:
            for n2 in nums2:
                if n1 + n2 in hashmap:
                    hashmap[n1+n2] += 1
                else:
                    hashmap[n1+n2] = 1
        
        # 如果 -(n1+n2) 存在于nums3和nums4, 存入结果
        count = 0
        for n3 in nums3:
            for n4 in nums4:
                key = - n3 - n4
                if key in hashmap:
                    count += hashmap[key]
        return count
```