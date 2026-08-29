---
title: "1_链表理论基础"
date: "2026-08-29"
state:
  - finished
tags:
  - 链表
  - leetcode
categories:
  - CS
---
链表是一种通过指针串联在一起的线性结构，每一个节点由两部分组成，一个是数据域一个是指针域（存放指向下一个节点的指针），最后一个节点的指针域指向null（空指针的意思）。
链表的入口节点称为链表的头结点也就是head。
![](https://file1.kamacoder.com/i/algo/20200806194529815.png)
# 链表的类型
## 单链表
上面就是单链表
## 双链表
单链表中的指针域只能指向节点的下一个节点。
双链表：每一个节点有两个指针域，一个指向下一个节点，一个指向上一个节点。
双链表 既可以向前查询也可以向后查询。
![](https://file1.kamacoder.com/i/algo/20200806194559317.png)
## 循环链表
顾名思义，就是链表首尾相连。
循环链表可以用来解决约瑟夫环问题。
![](https://file1.kamacoder.com/i/algo/20200806194629603.png)
# 链表的存储方式
数组是在内存中是连续分布的，但是链表在内存中可以不是连续分布的。

链表是通过指针域的指针链接在内存中各个节点。
所以链表中的节点在内存中不是连续分布的 ，而是散乱分布在内存中的某地址上，分配机制取决于操作系统的内存管理。
![](https://file1.kamacoder.com/i/algo/20200806194613920.png)
# 链表的定义
C，结构体定义：
```c
typedef struct ListNode {
    int val;
    struct ListNodeT *next;
} ListNode;//这是对应typedef取得别名，如果没写这个就需要struct ListNode *next，写了就可以ListNodeT *next
```
Python，类定义：
```python
class ListNode:
     def __init__(self, val=0, next=None):# None 就是 C语言的NULL
         self.val = val
         self.next = next
```
# 链表的基本操作
## 删除节点
如图：
![](https://file1.kamacoder.com/i/algo/20200806195114541-20230310121459257.png)
只要将C节点的next指针指向E节点就可以了。
## 添加节点
![](https://file1.kamacoder.com/i/algo/20200806195134331-20230310121503147.png)
可以看出链表的增添和删除都是O(1)操作，也不会影响到其他节点。

但是要注意，要是删除第五个节点，需要从头节点查找到第四个节点通过next指针进行删除操作，查找的时间复杂度是O(n)。
# 与数组对比

|        | 插入删除的时间复杂度 | 查询的时间复杂度 | 使用场景             |
| ------ | ---------- | -------- | ---------------- |
| **数组** | O(n)       | O(1)     | 数据量固定、频繁查询，较少增删  |
| **链表** | O(1)       | O(n)     | 数据量不固定，频繁增删，较少查询 |
