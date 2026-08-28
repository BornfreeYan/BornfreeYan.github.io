---
title: "3_移除元素"
date: "2026-08-28"
state:
  - finished
tags:
  - 双指针
  - 数组
  - leetcode
categories:
  - CS
---
# 27.移除元素
[27. 移除元素 - 力扣（LeetCode）](https://leetcode.cn/problems/remove-element/description/)
给你一个数组 nums 和一个值 val，你需要 **原地** 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并**原地**修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
示例 1: 给定 nums = [3,2,2,3], val = 3, 函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。 你不需要考虑数组中超出新长度后面的元素。
示例 2: 给定 nums = [0,1,2,2,3,0,4,2], val = 2, 函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。
**你不需要考虑数组中超出新长度后面的元素**。

## 思路
**数组的元素在内存地址中是连续的，不能单独删除数组中的某个元素，只能覆盖。**
## 暴力解法
两层for循环，一个for循环遍历数组元素 ，第二个for循环更新数组。暴力解法的时间复杂度是O(n^2)
删除过程如下：
![](https://file1.kamacoder.com/i/algo/27.%E7%A7%BB%E9%99%A4%E5%85%83%E7%B4%A0-%E6%9A%B4%E5%8A%9B%E8%A7%A3%E6%B3%95.gif)
## 双指针解法
题目只要求返回新长度，并保证数组前 `k` 个元素是结果。**它并不关心数组后面是什么**。
这给了你什么"操作空间"？
双指针法（快慢指针法）： **通过一个快指针和慢指针在一个for循环下完成两个for循环的工作。**
定义快慢指针:
- 快指针：寻找新数组的元素 ，新数组就是不含有目标元素的数组
- 慢指针：指向更新 新数组下标的位置
![](https://file1.kamacoder.com/i/algo/27.%E7%A7%BB%E9%99%A4%E5%85%83%E7%B4%A0-%E5%8F%8C%E6%8C%87%E9%92%88%E6%B3%95.gif)
代码如下：
```python
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        left = 0
        right = 0
        while right<len(nums):
            if nums[right]==val:
                right += 1
            else:
                nums[left] = nums[right]
                left +=1
                right+=1
        return left
```
快指针负责探路，慢指针负责指向需要修改的地方；如果没有遇到目标值，快慢指针同时向前移动；如果遇到目标值，慢指针不动(等待快指针指向一个非目标值时被赋值)，快指针继续移动。