---
title: "8_环形链表II"
date: "2026-08-29"
state:
  - finished
categories:
  - CS
tags:
  - 链表
  - leetcode
---
# 142. 环形链表II
[142. 环形链表II](https://leetcode.cn/problems/linked-list-cycle-ii/description/)
给定一个链表的头节点 `head`，返回链表开始入环的第一个节点。如果链表无环，则返回 `null`。

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。为了表示给定链表中的环，评测系统内部使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 `pos` 是 -1，则在该链表中没有环。注意：`pos` 不作为参数进行传递，仅仅是为了标识链表的实际情况。

不允许修改链表。

**示例 1：**
![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)
- 输入：head = [3,2,0,-4], pos = 1
- 输出：返回索引为 1 的链表节点
- 解释：链表中有一个环，其尾部连接到第二个节点。
**示例 2：**
- 输入：head = [1,2], pos = 0
- 输出：返回索引为 0 的链表节点
- 解释：链表中有一个环，其尾部连接到第一个节点。
**示例 3：**
- 输入：head = [1], pos = -1
- 输出：返回 null
- 解释：链表中没有环。
**进阶：** 你能用 O(1)（即，常量）内存解决此问题吗？

## 思路
pos不是一个参数，只是告诉你在有环的情况下你应该返回哪个节点。有没有环、以及需要返回哪个节点需要自己探索
这道题目，不仅考察对链表的操作，而且还需要一些数学推导。

主要考察两知识点：
- 判断链表是否环
- 如果有环，如何找到这个环的入口

### 判断链表是否环
可以使用快慢指针法，分别定义 fast 和 slow 指针，从头结点出发，fast指针每次移动两个节点，slow指针每次移动一个节点，如果 fast 和 slow指针在途中相遇 ，说明这个链表有环。
**fast指针一定先进入环中，如果fast指针和slow指针相遇的话，一定是在环中相遇，这是毋庸置疑的。** 可以自己任意画几个环试试，他们终将相遇。
![](https://file1.kamacoder.com/i/algo/141.%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8.gif)
### 如何找到这个环的入口
这就需要数学推导了。
假设从头结点到环形入口节点 的节点数为x。 环形入口节点到 fast指针与slow指针相遇节点 节点数为y。 从相遇节点 再到环形入口节点节点数为 z。
![](https://file1.kamacoder.com/i/algo/20220925103433.png)
那么相遇时： slow指针走过的节点数为: `x + y`， fast指针走过的节点数：`x + y + n (y + z)`，n为fast指针在环内走了n圈才遇到slow指针， （y+z）为 一圈内节点的个数A。

因为fast指针是一步走两个节点，slow指针一步走一个节点， 所以 fast指针走过的节点数 = slow指针走过的节点数 * 2：
`(x + y) * 2 = x + y + n (y + z)`
两边消掉一个（x+y）: `x + y = n (y + z)`
因为要找环形的入口，那么要求的是x，因为x表示 头结点到 环形入口节点的的距离。
所以要求x ，将x单独放在左面：`x = n (y + z) - y` ,

再从n(y+z)中提出一个 （y+z）来，整理公式之后为如下公式：`x = (n - 1) (y + z) + z` 注意这里n一定是大于等于1的，因为 fast指针至少要多走一圈才能相遇slow指针。
这个公式说明什么呢？
先拿n为1的情况来举例，意味着fast指针在环形里转了一圈之后，就遇到了 slow指针了。
当 n为1的时候，公式就化解为 `x = z`，
这就意味着，**从头结点出发一个指针，从相遇节点 也出发一个指针，这两个指针每次只走一个节点， 那么当这两个指针相遇的时候就是 环形入口的节点**。
也就是在相遇节点处，定义一个指针index1，在头结点处定一个指针index2。
让index1和index2同时移动，每次移动一个节点， 那么他们相遇的地方就是 环形入口的节点。

n如果大于1是什么情况呢，就是fast指针在环形转n圈之后才遇到 slow指针。
其实这种情况和n为1的时候 效果是一样的，一样可以通过这个方法找到 环形的入口节点，只不过，index1 指针在环里 多转了(n-1)圈，然后再遇到index2，相遇点依然是环形的入口节点。
## 题解
C：
```c
struct ListNode *detectCycle(struct ListNode *head) {
    struct ListNode *fast = head, *slow = head;
    while (fast && fast->next) {
        // 这里判断两个指针是否相等，所以移位操作放在前面
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) { // 相交，开始找环形入口：分别从头部和从交点出发，找到相遇的点就是环形入口
            struct ListNode *f = fast, *h = head;
            while (f != h) f = f->next, h = h->next;
            return h;
        }
    }
    return NULL;
}
```

Python：
```python
class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        slow = head
        fast = head
        
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            
            # If there is a cycle, the slow and fast pointers will eventually meet
            if slow == fast:
                # Move one of the pointers back to the start of the list
                slow = head
                while slow != fast:
                    slow = slow.next
                    fast = fast.next
                return slow
        # If there is no cycle, return None
        return None
```