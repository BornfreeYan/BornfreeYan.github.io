---
title: "9_三数之和"
date: "2026-08-30"
state:
  - finished
categories:
  - CS
tags:
  - 双指针
  - 数组
  - leetcode
---
# 15.三数之和
https://leetcode.cn/problems/3sum/description/

给你一个整数数组 `nums` ，判断是否存在三元组 `[nums[i], nums[j], nums[k]]` 满足 `i != j`、`i != k` 且 `j != k` ，同时还满足 `nums[i] + nums[j] + nums[k] == 0` 。请你返回所有和为 `0` 且不重复的三元组。

注意：答案中不可以包含重复的三元组。
示例 1：
输入：nums = [-1,0,1,2,-1,-4]
输出：[ [-1,-1,2],[-1,0,1] ]

解释：

nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。

nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。

nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。

不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。

注意，输出的顺序和三元组的顺序并不重要。

示例 2：

输入：nums = [0,1,1]

输出：[]

解释：唯一可能的三元组和不为 0 。

示例 3：

输入：nums = [0,0,0]

输出：[ [0,0,0] ]

解释：唯一可能的三元组和为 0 。

备注：3 <= nums.length <= 3000
## 思路
这题推荐用双指针法。

双指针（理论上有三个指针）思路如下：
![](https://file1.kamacoder.com/i/algo/15.%E4%B8%89%E6%95%B0%E4%B9%8B%E5%92%8C.gif)
首先将数组排序，然后有一层for循环，i从下标0的地方开始，同时定一个下标left 定义在i+1的位置上，定义下标right 在数组结尾的位置上。

依然还是在数组中找到 abc 使得a + b +c =0，我们这里相当于 a = nums[i]，b = nums[left]，c = nums[right]。

接下来如何移动left 和right呢， 如果nums[i] + nums[left] + nums[right] > 0 就说明 此时三数之和大了，因为数组是排序后了，所以right下标就应该向左移动，这样才能让三数之和小一些。

如果 nums[i] + nums[left] + nums[right] < 0 说明 此时 三数之和小了，left 就向右移动，才能让三数之和大一些，直到left与right相遇为止。

上面讲完了探索的策略，现在讨论一下要如何返回结果：
可以看到题目中有一个输出：[ [-1,-1,2],[-1,0,1] ]，也有一个[ [0,0,0] ]，显然结果是需要malloc的，并且是一个动态的二维数组，大小是n(行) × 3（列），每个小数组的大小都是3，因为是三元组嘛。
## 题解
```c
/**
 * Return an array of arrays of size *returnSize.
 * The sizes of the arrays are returned as *returnColumnSizes array.
 * Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().
 */
 //qsort辅助cmp函数
int cmp(const void* ptr1, const void* ptr2) {
    return *((int*)ptr1) > *((int*)ptr2);
}

int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    //开辟ans数组空间
    int **ans = (int**)malloc(sizeof(int*) * 18000);
    int ansTop = 0;
    //若传入nums数组大小小于3，则需要返回数组大小为0
    if(numsSize < 3) {
        *returnSize = 0;
        return 0;
    }
    //对nums数组进行排序
    qsort(nums, numsSize, sizeof(int), cmp);
    
    int i;
    //用for循环遍历数组，结束条件为i < numsSize - 2(要预留左右指针的位置)
    for(i = 0; i < numsSize - 2; i++) {
        //若当前i指向元素>0，则代表left和right以及i的和大于0。直接break
        if(nums[i] > 0)
            break;
        //去重：i > 0 && nums[i] == nums[i-1]，如果当前数和前一个数一样，就跳过
        if(i > 0 && nums[i] == nums[i-1])
            continue;
        //定义左指针和右指针
        int left = i + 1;
        int right = numsSize - 1;
        //当右指针比左指针大时进行循环
        while(right > left) {
            //求出三数之和
            int sum = nums[right] + nums[left] + nums[i];
            //若和小于0，则左指针+1（因为左指针右边的数比当前所指元素大）
            if(sum < 0)
                left++;
            //若和大于0，则将右指针-1
            else if(sum > 0)
                right--;
            //若和等于0
            else {
                //开辟一个大小为3的数组空间，存入nums[i], nums[left]和nums[right]
                int* arr = (int*)malloc(sizeof(int) * 3);
                arr[0] = nums[i];
                arr[1] = nums[left];
                arr[2] = nums[right];
                //将开辟数组存入ans中
                ans[ansTop++] = arr;
                //去重
                while(right > left && nums[right] == nums[right - 1])
                    right--;
                while(left < right && nums[left] == nums[left + 1])
                    left++;
                //更新左右指针
                left++;
                right--;
            }
        }
    }
  
    //设定返回的数组大小
    *returnSize = ansTop;//解引用一次，可以赋值int类型的数字给它
    *returnColumnSizes = (int*)malloc(sizeof(int) * ansTop);//解引用一次，可以赋值int*类型的指针
    for(int z = 0; z < ansTop; z++) {
        (*returnColumnSizes)[z] = 3;
    }
    return ans;
}
```

Python解法如下：
```python
class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        res = []
        for i in range(len(nums)):
            if nums[i] > 0:
                break
            if i > 0 and nums[i] == nums[i-1]:
                continue
            left, right = i + 1, len(nums) - 1
            while left < right:
                s = nums[i] + nums[left] + nums[right]
                if s < 0:
                    left += 1
                elif s > 0:
                    right -= 1
                else:
                    res.append([nums[i], nums[left], nums[right]])
                    left += 1
                    right -= 1
                    while left < right and nums[left] == nums[left - 1]:
                        left += 1
                    while left < right and nums[right] == nums[right + 1]:
                        right -= 1
        return res
```