---
title: "8_前K个高频元素"
date: "2026-09-02"
state:
  - finished
categories:
  - CS
tags:
  - 队列
  - leetcode
  - 堆
---
# 347 前K个高频元素
https://leetcode.cn/problems/top-k-frequent-elements/

给你一个整数数组 `nums` 和一个整数 `k`，请你返回其中出现频率前 `k` 高的元素。你可以按**任意顺序**返回答案。

**示例 1：**

```
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
```

**示例 2：**

```
输入: nums = [1], k = 1
输出: [1]
```

**示例 3：**

```
输入: nums = [1,2,1,2,1,2,3,1,3,2], k = 2
输出: [1,2]
```

**提示：**

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `k` 的取值范围是 `[1, 数组中不重复元素的个数]`
- 题目数据保证答案唯一，换句话说，数组中前 `k` 个高频元素的集合是唯一的

**进阶：** 你所设计算法的时间复杂度**必须**优于 `O(n log n)`，其中 `n` 是数组大小。

# 思路

1. **统计频率**：用哈希表（Python 用 `dict` 手写统计，或 `collections.Counter`）。
2. **建桶**：`bucket[freq]` 存放出现 `freq` 次的所有元素，下标即频率。最大频率不超过 `len(nums)`，所以桶数组长度取 `len(nums) + 1`。
3. **从后往前扫桶**：频率高的先取，取够 `k` 个即返回（题目保证答案唯一，桶内顺序无所谓）。

时间复杂度 `O(n)`，优于 `O(n log n)`，也优于小顶堆的 `O(n log k)`。

# 题解

```python
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        # 1. 手工统计频率
        freq = {}
        for num in nums:
            if num in freq:
                freq[num] += 1   # 修正：用 num 而不是 i
            else:
                freq[num] = 1    # 修正：用 num 而不是 i

        # 2. 建桶（长度 = nums长度+1，因为最大频率不超过 len(nums)）
        bucket = [[] for _ in range(len(nums) + 1)]
        for num, count in freq.items():   # 修正：英文逗号，且改名 count 避免冲突
            bucket[count].append(num)

        # 3. 从后往前取
        res = []
        for i in range(len(bucket) - 1, -1, -1):   # 修正：用 len(bucket)-1
            if bucket[i]:
                res.extend(bucket[i])
                if len(res) >= k:      # 更干脆的截断
                    return res[:k]
        return res
```
