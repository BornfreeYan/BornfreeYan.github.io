---
title: "4_有序数组的平方"
date: "2026-08-28"
state:
  - finished
tags:
  - 数组
  - 双指针
  - leetcode
categories:
  - CS
---
# 977.有序数组的平方
[977. 有序数组的平方 - 力扣（LeetCode）](https://leetcode.cn/problems/squares-of-a-sorted-array/description/)
给你一个按 非递减顺序 排序的整数数组 `nums`，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
示例 1：
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]

示例 2：
输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]
## 思路
最简单的就是暴力，每个数平方之后排个序。
c语言似乎要写比较函数qsort，很浪费时间。

可以观察到，**原数组是有序的（非递减）**，但平方后负数可能变成很大的正数。直接平方再排序是 O(n log n)，而**双指针可以做到 O(n)**。双指针思路（从两端向中间）：
- 数组两端（最大负数或最大正数）的平方值一定是当前最大的
- 用两个指针从两端向中间移动，每次比较平方值，把大的放到结果数组末尾
i指向起始位置，j指向终止位置。
定义一个新数组result，和A数组一样的大小，让k指向result数组终止位置。
如果`A[i] * A[i] < A[j] * A[j]` 那么`result[k--] = A[j] * A[j];` 。
如果`A[i] * A[i] = A[j] * A[j]` 那么`result[k--] = A[i] * A[i];` 。
![](https://file1.kamacoder.com/i/algo/977.%E6%9C%89%E5%BA%8F%E6%95%B0%E7%BB%84%E7%9A%84%E5%B9%B3%E6%96%B9.gif)
## 双指针法
```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        result = []
        left = 0
        right = len(nums) - 1
        while left<=right:
            if nums[left]**2 > nums[right]**2:
                result.append(nums[left]**2)
                left += 1
            else:
                result.append(nums[right]**2)
                right -= 1
        result.reverse()
        return result # 或者也可以切片翻转return result[::-1]
```
此时的时间复杂度为O(n)，相对于暴力排序的解法O(n + nlog n)还是提升不少的。