---
title: "7_链表相交"
date: "2026-08-29"
state:
  - finished
categories:
  - CS
tags:
  - 链表
  - leetcode
---
# 160. 链表相交
给你两个单链表的头节点 `headA` 和 `headB`，请你找出并返回两个单链表**相交的起始节点**。如果两个链表不存在相交节点，返回 null。
例如，下面的两个链表在节点 c1 开始相交：
![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/14/160_statement.png)
在评测系统中，**相交的定义是基于节点地址而非节点值**。如果两个链表在某个节点相交，则该节点在两个链表中必须是同一个节点（即**内存地址相同**）。
**示例 1：**
- 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
- 输出：Intersected at '8'
**示例 2：**
- 输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
- 输出：Intersected at '2'
**示例 3：**
- 输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
- 输出：null
**进阶：** 你能设计一个时间复杂度为 O(n)、仅用 O(1) 内存的解决方案吗？

## 思路
简单来说，就是求两个链表交点节点的**指针**。题目已经说了，相交的定义是指针相等。

先让curA指向链表A的头结点，curB指向链表B的头结点
![](https://file1.kamacoder.com/i/algo/%E9%9D%A2%E8%AF%95%E9%A2%9802.07.%E9%93%BE%E8%A1%A8%E7%9B%B8%E4%BA%A4_1.png)
求出两个链表的长度，并求出两个链表长度的差值，然后让curA移动到，和curB 末尾对齐的位置，从此之后才可能找到相交的地方
![](https://file1.kamacoder.com/i/algo/%E9%9D%A2%E8%AF%95%E9%A2%9802.07.%E9%93%BE%E8%A1%A8%E7%9B%B8%E4%BA%A4_2.png)
此时我们就可以比较curA和curB是否相同，如果不相同，同时向后移动curA和curB，如果遇到curA == curB，则找到交点。
否则循环退出返回空指针。
## 题解
```c
struct ListNode *getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
    //初始化
    int lengthA = 0,lengthB=0;
    struct ListNode * curA = headA, *curB = headB;
  
    //获取链表长度
    while(curA){
        lengthA++;
        curA = curA->next;
    }
    while(curB){
        lengthB++;
        curB = curB->next;
    }
  
    //求链表长度差值，更长的需要缩短，并且二者的末端对齐
    int gap = (lengthA>=lengthB)?(lengthA-lengthB):(lengthB-lengthA);//简便的三目运算求长度差
    curA = headA;
    curB = headB;//都回退到头节点等待移动cur指针
    if(lengthA>=lengthB){
        while(gap--){
            curA=curA->next;
        }
    }else{
        while(gap--){
            curB=curB->next;
        }
    }
  
    //现在末端对齐且长链“缩短”，开始同步后退
    while(curA){
        if(curA==curB){
            return curA;
        }
        curA=curA->next;
        curB=curB->next;
    }
  
    return NULL;
}
```