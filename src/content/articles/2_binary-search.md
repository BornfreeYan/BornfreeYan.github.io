---
title: "2_二分查找"
date: "2026-08-28"
tags:
  - 数组
  - leetcode
categories:
  - CS
state:
  - finished
---
# 704.二分查找
[704. 二分查找 - 力扣（LeetCode）](https://leetcode.cn/problems/binary-search/description/)
给定一个 `n` 个元素有序的（升序）整型数组 `nums` 和一个目标值 `target`  ，写一个函数搜索 `nums` 中的 `target`，如果 `target` 存在返回**下标**，否则返回 `-1`。
你必须编写一个具有 `O(log n)` 时间复杂度的算法。
示例 1:
输入: `nums` = [-1,0,3,5,9,12], `target` = 9
输出: 4
解释: 9 出现在 `nums` 中并且下标为 4

示例 2:
输入: `nums` = [-1,0,3,5,9,12], `target` = 2
输出: -1
解释: 2 不存在 `nums` 中因此返回 -1

## 思路
这道题目的前提是数组为**有序**数组，同时题目还强调**数组中无重复元素**，因为一旦有重复元素，使用二分查找法返回的元素下标可能不是唯一的，这些都是使用二分法的前提条件，当看到题目描述满足如上条件的时候，可要想一想是不是可以用二分法了。二分，就是按照＞=＜三种情况对于一个有序的数组进行分割，相比一个for循环（O(n)复杂度）更加快速，况且题目要求O(log n)。
写二分法经常写乱，主要是因为**对区间的定义没有想清楚，区间的定义就是不变量**。要在二分查找的过程中，保持不变量，就是在while寻找中每一次边界的处理都要坚持根据区间的定义来操作，这就是**循环不变量**规则。
写二分法，区间的定义一般为两种，左闭右闭即[left, right]，或者左闭右开即[left, right)
建议固定一种写法。
## 左闭右闭写法
```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1  # 定义target在左闭右闭的区间里，[left, right]

        while left <= right:
            middle = left + (right - left) // 2
            
            if nums[middle] > target:
                right = middle - 1  # target在左区间，所以[left, middle - 1]
            elif nums[middle] < target:
                left = middle + 1  # target在右区间，所以[middle + 1, right]
            else:
                return middle  # 数组中找到目标值，直接返回下标
        return -1  # 未找到目标值
```

## 左闭右开写法
```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1  # 定义target在左闭右闭的区间里，[left, right]

        while left <= right:
            middle = left + (right - left) // 2
            
            if nums[middle] > target:
                right = middle - 1  # target在左区间，所以[left, middle - 1]
            elif nums[middle] < target:
                left = middle + 1  # target在右区间，所以[middle + 1, right]
            else:
                return middle  # 数组中找到目标值，直接返回下标
        return -1  # 未找到目标值
```

## 拓展：爱吃香蕉的珂珂
https://leetcode.cn/problems/koko-eating-bananas/description/
```python
class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        def canFinish(speed):
            total_hours = 0
            for pile in piles:
                total_hours += (pile+speed-1)//speed
                if total_hours>h:
                    return False
            return True
        left,right = 1,max(piles)
        while left<right:
            mid = left+(right-left)//2
            if canFinish(mid):
                right = mid
            else:
                left = mid + 1
        return left
```