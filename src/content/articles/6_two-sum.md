---
title: "6_两数之和"
date: "2026-08-31"
state:
  - finished
categories:
  - CS
tags:
  - 哈希表
  - leetcode
---
# 1.两数之和
[1.两数之和](https://leetcode.cn/problems/two-sum/description/)
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应**一个答案**。但是，数组中同一个元素不能使用两遍。
**示例:**
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

## 思路
如用c语言，显然不如python方便，要自己实现哈希表。
首先暴力解法肯定可以，注意一下题目要求**数组中同一个元素不能使用两遍**。但是时间复杂度为$O(n^2)$。
想要用c实现哈希表，必须使用uthash 库，这是一个c语言的有关哈希的头文件库。
**哈希法核心思路**：用空间换时间。以 **值→索引** 的映射存入哈希表，遍历时计算 `complement = target - nums[i]`，查表判断差值是否已出现——命中则 O(1) 返回两索引，未命中则将当前元素入表。整体 O(n) 时间复杂度。

## 题解
### C暴力
```c
/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {//暴力
    *returnSize = 2;
    int *result = (int*)malloc(sizeof(int)*2);
    for(int i = 0;i<numsSize;i++){
        for(int j = i+1;j<numsSize;j++){//j = i+1，题目说了不能重复下标
            int sum = nums[i]+nums[j];
            if(sum==target){
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    free(result);
    *returnSize = 0;
    return 0;
}
```

### C哈希法
```c
//leetcode自带uthash 库

// ========== 1. 定义哈希表节点结构 ==========
typedef struct {
    int key;        // 哈希表的键：存储数组元素的值 (nums[i])
    int value;      // 哈希表的值：存储该元素在原数组中的索引 i
    UT_hash_handle hh;  // uthash 必需的句柄，用于内部链表管理
} HashNode;

// ========== 2. 两数之和主函数 ==========
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    HashNode* hashTable = NULL;  // 初始化哈希表指针，必须设为 NULL
    HashNode* node = NULL;       // 用于临时存储查找到的节点
    
    // 遍历数组
    for (int i = 0; i < numsSize; i++) {
        int complement = target - nums[i];  // 计算需要找的另一个数
        
        // ========== 3. 查找 complement 是否在哈希表中 ==========
        // 参数：哈希表头指针, 要查找的 key 的地址, 结果存储变量
        HASH_FIND_INT(hashTable, &complement, node);
        
        if (node != NULL) {
            // 找到了！node->value 是 complement 的索引，i 是当前索引
            int* result = (int*)malloc(sizeof(int) * 2);
            result[0] = node->value;  // 先出现的数的索引
            result[1] = i;            // 当前数的索引
            *returnSize = 2;
            
            // ========== 4. 清理内存（重要！）==========
            HashNode *current, *tmp;
            HASH_ITER(hh, hashTable, current, tmp) {
                HASH_DEL(hashTable, current);  // 从哈希表删除
                free(current);                  // 释放节点内存
            }
            
            return result;
        }
        
        // ========== 5. 没找到，把当前数加入哈希表 ==========
        // 先创建新节点
        node = (HashNode*)malloc(sizeof(HashNode));
        node->key = nums[i];    // key 是数组元素的值
        node->value = i;        // value 是该元素的索引
        
        // 添加到哈希表
        // 参数：哈希表头指针, key 字段名, 要添加的节点
        HASH_ADD_INT(hashTable, key, node);
    }
    
    // 没找到答案（按题意不会发生）
    *returnSize = 0;
    return NULL;
}
```
### Python哈希
这题可以用字典解决。
1. 创建一个空字典 `{}`，用来存"数字→下标"
2. 遍历数组，`i` 从 0 到 `len(nums)-1`：  
    a. 当前数字是 `num`  
    b. 计算补数 `complement = target - num`  
    c. 在字典里**查找** `complement` 是否存在  
    d. 如果存在，返回 `[字典中complement对应的下标, i]`  
    e. 如果不存在，把 `num` 和 `i` 存入字典
3. 循环结束还没返回，说明没有解（但题目保证有解）

**常见错误做法**：先把所有数字存入字典，再遍历查找
问题：如果有重复数字（比如 `[3, 3]`），后一个会覆盖前一个的下标，导致找不到正确结果。
**正确做法**：**边遍历边存**，保证每个数字只被用一次。

补充一些字典的常见操作，比如新增键值对

|操作|列表|字典|
|---|---|---|
|新增元素|`append()` / `insert()`|`dict[key] = value`|
|访问元素|`list[0]`（数字下标）|`dict['key']`（键）|
|修改元素|`list[0] = 10`|`dict['key'] = 10`|
|删除元素|`pop()` / `remove()`|`pop(key)` / `del dict[key]`|
|检查存在|`item in list`|`key in dict`|
另外，值得想想：键值对是用数字做键、下标做值，还是用下标做键、数字做值？
```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        count = {}
        for i in range(0, len(nums)):  # 遍历全部
            complement = target - nums[i]
            if complement in count:  # 检查键是否存在
                return [count[complement], i]  # 获取补数的下标
            else:
                count[nums[i]] = i  # 用数字作键，下标作值
```