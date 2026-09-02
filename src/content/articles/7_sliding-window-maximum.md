---
title: "7_滑动窗口最大值"
date: "2026-09-02"
state:
  - finished
categories:
  - CS
tags:
  - 队列
  - leetcode
---
# 239 滑动窗口最大值
https://leetcode.cn/problems/sliding-window-maximum/

给你一个整数数组 `nums`，有一个大小为 `k` 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 `k` 个数字。滑动窗口每次只向右移动一位。

返回 *滑动窗口中的最大值*。

**示例 1：**

```
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

**示例 2：**

```
输入：nums = [1], k = 1
输出：[1]
```

**提示：**

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

# 思路

使用**单调队列**（递减）。队列中存储元素**下标**，保证队首始终是当前窗口的最大值下标。

- 入队时，从队尾移除所有小于等于当前元素的元素（它们不可能是最大值），再加入当前元素。
- 当队首下标超出窗口范围时（`<= i - k`），从队首移除。
- 当窗口形成后（`i >= k - 1`），队首元素即为当前窗口最大值。

**复杂度**：每个下标最多入队、出队一次，时间 O(n)，空间 O(k)（队列最多存 k 个下标）。

# 题解

```python
from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        dq = deque()          # 单调递减队列，存元素下标
        res = []
        for i, x in enumerate(nums):
            # 队尾所有 <= 当前值的下标出队（它们不可能是最大值）
            while dq and nums[dq[-1]] <= x:
                dq.pop()
            dq.append(i)
            # 移除超出窗口范围的下标
            if dq[0] <= i - k:
                dq.popleft()
            # 窗口形成后，队首即当前窗口最大值
            if i >= k - 1:
                res.append(nums[dq[0]])
        return res
```
