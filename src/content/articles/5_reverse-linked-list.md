---
title: "5_反转链表"
date: "2026-08-30"
state:
  - finished
categories:
  - CS
tags:
  - 链表
  - 双指针
  - leetcode
---
# 206. 反转链表
https://leetcode.cn/problems/reverse-linked-list/description/

给你单链表的头节点 `head`，请你反转链表，并返回反转后的链表。
**示例 1：**
![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)
- 输入：head = [1,2,3,4,5]
- 输出：[5,4,3,2,1]
**示例 2：**
- 输入：head = [1,2]
- 输出：[2,1]
**示例 3：**
- 输入：head = []
- 输出：[]
**进阶：** 链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？
## 思路
如果再定义一个新的链表，实现链表元素的反转，其实这是对内存空间的浪费。
其实只需要改变链表的next指针的指向，直接将链表反转 ，而不用重新定义一个新的链表。
之前链表的头节点是元素1， 反转之后头结点就是元素5 ，这里并没有添加或者删除节点，仅仅是改变next指针的方向。
![](https://file1.kamacoder.com/i/algo/206.%E7%BF%BB%E8%BD%AC%E9%93%BE%E8%A1%A8.gif)
首先定义一个cur指针，指向头结点，再定义一个pre指针，初始化为null。

然后就要开始反转了，首先要把 cur->next 节点用tmp指针保存一下，也就是保存一下这个节点。

为什么要保存一下这个节点呢，因为接下来要**改变 cur->next 的指向**了，将cur->next 指向pre ，此时已经反转了第一个节点了。

接下来，就是循环走如下代码逻辑了，继续移动pre和cur指针。

最后，cur 指针已经指向了null，循环结束，链表也反转完毕了。 此时我们return pre指针就可以了，pre指针就指向了新的头结点。
## 题解
C:
```c
struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode *cur, *pre,*temp;
    cur = head;//当前指针
    pre = NULL;// 前一个节点（新链表的尾）
  
    while(cur){
        temp = cur->next;// 1. 保存下一个节点
        cur->next = pre;// 2. 反转当前指针
        pre = cur;// 3. pre前移
        cur = temp;// 4. cur前移
    }
  
    return pre;
}
```
Python:
```python
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        pre = None
        cur = head
  
        while cur:
            temp = cur.next
            cur.next = pre
            pre = cur
            cur = temp
        return pre
```
