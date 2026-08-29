---
title: "2_移除链表元素"
date: "2026-08-29"
state:
  - finished
tags:
  - 链表
  - leetcode
categories:
  - CS
---
# 203.移除链表元素
[203.移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/description/)
题意：删除链表中等于给定值 val 的所有节点。
示例 1： 输入：head = [1,2,6,3,4,5,6], val = 6 输出：[1,2,3,4,5]
示例 2： 输入：head = [], val = 1 输出：[]
示例 3： 输入：head = [7,7,7,7], val = 7 输出：[]
## 思路
这里以链表 1 4 2 4 来举例，移除元素4。
![](https://file1.kamacoder.com/i/algo/20210316095351161.png)
如果使用C，C++编程语言的话，不要忘了还要从内存中删除这两个移除的节点,最终剩下1 2：
![](https://file1.kamacoder.com/i/algo/20210316095418280.png)
这种情况下的移除操作，就是让节点next指针直接指向下下一个节点就可以了，
那么因为单链表的特殊性，只能指向下一个节点，刚刚删除的是链表的中第二个，和第四个节点，那么如果删除的是头结点又该怎么办呢？
这里就涉及如下链表操作的两种方式：
- **直接使用原来的链表来进行删除操作。**
- **设置一个虚拟头结点在进行删除操作。**

第一种操作：直接使用原来的链表来进行移除。
移除头结点和移除其他节点的操作是不一样的，因为链表的其他节点都是通过前一个节点来移除当前节点，而头结点没有前一个节点。
所以头结点如何移除呢，其实只要**将头结点向后移动一位**就可以，这样就从链表中移除了一个头结点。
![](https://file1.kamacoder.com/i/algo/20210316095512470.png)
依然别忘将原头结点从内存中删掉.
![](https://file1.kamacoder.com/i/algo/20210316095543775.png)
这样移除了一个头结点。在单链表中移除头结点 和 移除其他节点的操作方式是不一样，其实在写代码的时候也会发现，需要单独写一段逻辑来处理移除头结点的情况。

第二种操作：
其实**可以设置一个虚拟头结点**，这样原链表的所有节点就都可以按照统一的方式进行移除了。
![](https://file1.kamacoder.com/i/algo/20210316095619221.png)
这里来给链表添加一个虚拟头结点为新的头结点，此时要移除这个旧头结点元素1。
这样是不是就可以使用和移除链表其他节点的方式统一了呢？
来看一下，如何移除元素1 呢，还是熟悉的方式，然后从内存中删除元素1。
最后呢在题目中，return 头结点的时候，别忘了 `return dummyNode->next;`， **这才是新的头结点**
## Python实现
使用虚拟头节点：
```python
class Solution:
    def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:# 中这个 optional 是一个表示可选。既可以是 List node 数据类型，也可以是 none的意思，不用手动import ，leetcode内置。这是一个类型注解，也可以不用写，但是指定输入输出格式会比较易懂
        dummy = ListNode(next = head)
        current = dummy
        while current.next:
            if current.next.val == val:
                current.next = current.next.next
            else:
                current = current.next
        return dummy.next
```
## C实现
**方法一：直接使用原来的链表来进行移除节点操作：**
```c
struct ListNode* removeElements(struct ListNode* head, int val) {
    struct ListNode* temp;
    
    // 处理头节点是要删除的值的情况
    while (head && head->val == val) {//当头结点存在并且头结点的值等于val时
        temp = head;
        head = head->next;
        free(temp);//将新的头结点设置为head->next并删除原来的头结点
    }
    
    struct ListNode* current = head;
    
    // 处理非头节点
    while (current && current->next) {
        if (current->next->val == val) {  // ✅ 比较值，不是指针，容易漏->val
            temp = current->next;          // ✅ 保存要删除的节点
            current->next = current->next->next;
            free(temp);                    // ✅ 释放内存
            // 注意：这里不移动 current，继续检查新的 next
        } else {
            current = current->next;       // 只有不删除时才移动
        }
    }
    
    return head;  // ✅ 返回头节点(head始终指向链表的头结点，current会不断向后以最终达到NULL，不可以return current)
}
```
**方法二：设置一个虚拟头结点在进行移除节点操作：**
```c
struct ListNode* removeElements(struct ListNode* head, int val) {//使用虚拟头节点
    struct ListNode dummy;
    dummy.next = head;
    struct ListNode* current = &dummy;//指针需要指向地址，所以要有&
    while(current->next){//current->next==NULL就结束
        if(current->next->val==val){
            struct ListNode* temp = current->next;
            current->next = current->next->next;
            free(temp);//free函数输入是一个指针，所以前面是ListNode *temp
        }else{
            current = current->next;
        }
    }
    return dummy.next;
}
```
> 方法一大部分用的是结构体指针，如`struct ListNode* temp`，方法二大部分用的是结构体本身，如`struct ListNode dummy;`,他们调用的方式有所不同!!!

| 写法            | 含义             | 适用场景                      |
| ------------- | -------------- | ------------------------- |
| `dummy.next`  | 结构体**变量**的成员访问 | `struct ListNode dummy;`  |
| `dummy->next` | 结构体**指针**的成员访问 | `struct ListNode *dummy;` |
```text
dummy 是变量（房子本身）    &dummy 是地址（门牌号）
┌─────────┐                 ┌─────────┐
│ val: ?  │                 │ val: ?  │
│ next: ──┼──→ head         │ next: ──┼──→ head
└─────────┘                 └─────────┘
     ↑                            ↑
   dummy                        &dummy
  (用 . )                      (用 ->)
```