---
title: "5_两两交换链表中的节点"
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
# 24. 两两交换链表中的节点
给定一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部值的情况下完成本题（即，只能进行节点交换）。
**示例 1：**
![](https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg)
- 输入：head = [1,2,3,4]
- 输出：[2,1,4,3]
**示例 2：**
- 输入：head = []
- 输出：[]
**示例 3：**
- 输入：head = [1]
- 输出：[1]
**示例 4：**
- 输入：head = [1,2,3]
- 输出：[2,1,3]

## 思路
首先建议，对链表有增删等改动的操作，都加一个虚拟头节点dummy。
这道题正常的画图模拟过程即可：
初始时，cur指向虚拟头结点，然后进行如下三步：
![](https://file1.kamacoder.com/i/algo/24.%E4%B8%A4%E4%B8%A4%E4%BA%A4%E6%8D%A2%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B91.png)
操作之后，链表如下：
![](https://file1.kamacoder.com/i/algo/24.%E4%B8%A4%E4%B8%A4%E4%BA%A4%E6%8D%A2%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B92.png)

## 题解
```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* swapPairs(struct ListNode* head) {
    typedef struct ListNode ListNode;//上面的定义没有typedef，这里要创建别名
    ListNode *dummy = (ListNode*)malloc(sizeof(ListNode));
    dummy->next = head;
  
    ListNode * right = head;
    ListNode * left = dummy;
  
    while(right && left && right->next){//当存在2个以上的节点时进入while，一个节点或者空链表直接return 虚拟头节点的next
        left->next = right->next;
        right->next = left->next->next;
        left->next->next=right;
        left=right;
        right = right ->next;
    }
  
    return dummy->next;//不能用head，因为head可能被后置
}
```

```python
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(next = head)
        left = dummy
        right = head
        while right and right.next:
            left.next = right.next
            right.next = right.next.next
            left.next.next = right
            left = right
            right = right.next
        return dummy.next
```