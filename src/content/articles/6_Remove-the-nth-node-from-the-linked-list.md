---
title: "6_删除链表的倒数第N个节点"
date: "2026-08-29"
state:
  - finished
categories:
  - CS
tags:
  - 链表
  - 双指针
  - leetcode
---
# 19. 删除链表的倒数第N个节点
[19. 删除链表的倒数第N个节点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/)
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
**示例 1：**
- 输入：head = [1,2,3,4,5], n = 2
- 输出：[1,2,3,5]
**示例 2：**
- 输入：head = [1], n = 1
- 输出：[]
**示例 3：**
- 输入：head = [1,2], n = 1
- 输出：[1]
**进阶：** 你能尝试使用一趟扫描实现吗？

## 思路
双指针的经典应用，如果要删除倒数第n个节点，让fast移动n步，然后让fast和slow同时移动，直到fast指向链表末尾。删掉slow所指向的节点就可以了。
另外最好加一个虚拟头节点dummy方便处理。

1. 定义fast指针和slow指针，初始值为虚拟头结点
2. fast首先走n步
3. 然后fast和slow同时移动，直到fast指向末尾
4. 删除slow指向的下一个节点
## 题解
C:
```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* removeNthFromEnd(struct ListNode* head, int n) {
    struct ListNode * dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->next = head;
  
    struct ListNode* fast = head;
    struct ListNode* slow = dummy;
  
    for(int i = 0;i<n;i++){//可以画图看看fast要先行几步，这里先行n步
        fast=fast->next;
    }
  
    while(fast){
        fast=fast->next;
        slow=slow->next;
    }//同步后移
  
  //删除操作
    struct ListNode* temp = slow->next;
    slow->next=slow->next->next;
    free(temp);
  
    return dummy->next;
}
```
**遇到的问题**
野指针：`struct ListNode *dummy;`,干脆就统一用栈上分配一个实在的结构体，针对于考研和力扣的题，基本上都是写函数，连 free 都不用。

| 方式           | 代码                                                          | 是否需要 malloc | 适用场景         |
| ------------ | ----------------------------------------------------------- | ----------- | ------------ |
| **栈上分配**（推荐） | `struct ListNode dummy;`                                    | ❌ 不需要       | 临时辅助节点，函数内使用 |
| **堆上分配**     | `struct ListNode *dummy = malloc(sizeof(struct ListNode));` | ✅ 需要        | 需要跨函数传递或动态管理 |


Python:
```python
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(next = head)
        if dummy.next == None:
            print("链表为空")
            return False
        left,right = dummy,dummy
        while n > 0:
            right = right.next
            n -= 1
        while right.next:
            left = left.next
            right = right.next
        left.next = left.next.next
        return dummy.next
```