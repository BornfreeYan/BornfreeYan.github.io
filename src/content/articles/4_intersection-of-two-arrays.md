---
title: "4_两个数组的交集"
date: "2026-08-31"
state:
  - finished
categories:
  - CS
tags:
  - 哈希表
  - leetcode
---
# 349.两个数组的交集
[349.两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/description/)

给定两个数组 `nums1` 和 `nums2` ，返回它们的交集 。输出结果中的每个元素一定是 **唯一** 的。我们可以 **不考虑输出结果的顺序** 。

示例 1：
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]

示例 2：
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
解释：[4,9] 也是可通过的
## 思路
这个问题的关键是**快速查找元素是否存在**。你需要找到在两个数组中都出现过的元素。
最直观的方法是遍历一个数组，在另一个数组中逐个查找对应元素。这样时间复杂度比较高。

**哈希表的作用**：哈希表可以提供O(1)的查找时间复杂度。考虑如何利用这个特性： 
- 用一个数组的元素构建哈希表
- 遍历另一个数组时快速判断元素是否存在于哈希表中
**去重问题**：题目要求返回的结果中不能有重复元素，你需要考虑：
- 找到交集元素后，如何避免重复添加
- C语言中通常需要手动处理去重逻辑
所以思路如下：
- 创建计数数组
- 遍历num1 统计个元素的出现情况
- 遍历num2检查各个元素是否在num1出现过
- 若出现过，加入结果数组result并对record对应的清零
## 题解
### C语言
```c
/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* intersection(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize) {
    int count[1001] = {0};//用于统计的数组，1000是题目已经限制输入数组大小不超过1000
    int lessSize = (nums1Size>nums2Size)?nums2Size:nums1Size;//返回的最小长度是二者更小的那个
    int *result = (int*)calloc(lessSize,sizeof(int));
  
    for(int i=0;i<nums1Size;i++){
        count[nums1[i]]++;//把nums1中出现的先统计一下
    }
  
    int resultIndex = 0;//返回的数组的下标
  
    //检查nums2中的元素是否在nums1出现过
    for(int i = 0;i<nums2Size;i++){
        if(count[nums2[i]]>0){//nums2中出现nums1中的元素
        result[resultIndex] = nums2[i];
        resultIndex++;
        count[nums2[i]] = 0;//既然已经写入result，为了避免重复，做一个删除操作，
        }
    }
    *returnSize = resultIndex;
    return result;
}
```

一些代码解释：
calloc vs malloc：malloc见多了，calloc是什么？`calloc` 用于动态分配一块连续的内存空间，并将该空间初始化为零。
它的函数原型是：
```c
void *calloc(size_t num, size_t size);
```
在本题题解中，意思是：分配 `lessSize` 个整型变量的空间，并将分配的空间全部初始化为 0

### Python
```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # 因为题目限制 0 <= nums1[i], nums2[i] <= 1000
        # 所以创建长度为 1001 的布尔数组
        # 下标表示数字，值表示该数字是否在 nums1 中出现过
        exists = [False] * 1001
        
        # 第一步：标记 nums1 中出现的所有数字
        for num in nums1:
            exists[num] = True
        
        # 第二步：遍历 nums2，找出同时在 nums1 中出现的数字
        result = []
        for num in nums2:
            if exists[num]:           # 如果这个数字在 nums1 中出现过
                result.append(num)    # 加入结果
                exists[num] = False   # 重要！标记为 False，防止重复添加
        
        return result
```
投机取巧：
```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        set1 = set(nums1)
        set2 = set(nums2)
        return list(set1 & set2)# 取交集并转换成List格式输出
```