---
title: "1_栈与队列理论基础"
date: "2026-09-02"
state:
  - finished
categories:
  - CS
tags:
  - 栈
  - 队列
  - leetcode
---
# 栈与队列理论基础
栈和队列是两种基本的数据结构：**队列是先进先出（FIFO），栈是先进后出（LIFO）**。
## 一、Python中的栈与队列
与 C 语言需要自己手写结构体不同，**Python 标准库直接提供了栈、队列、双端队列和优先级队列所需的一切容器**：`list`、`collections.deque`、`heapq`。刷题时直接用内置容器即可；下面同时给出内置用法和手动实现，帮助理解底层原理（数组版 / 链表版）以及时间复杂度的来源。
### 1.1 栈（Stack）
栈是一种**后进先出（LIFO, Last In First Out）的数据结构，只允许在一端（栈顶）进行插入和删除操作。**
```
       push →   ┌───┐
                │ 4 │  ← top
                ├───┤
                │ 3 │
                ├───┤
                │ 2 │
                ├───┤
                │ 1 │
                └───┘
```
栈提供的基本操作（括号内为 Python 中最直接的写法）：
- `push(x)`：元素x入栈（压入栈顶）— `list.append(x)`
- `pop()`：弹出栈顶元素 — `list.pop()`
- `top()` / `peek()`：查看栈顶元素（不弹出）— `s[-1]`
- `empty()`：判断栈是否为空 — `not s`
- `size()`：获取栈内元素个数 — `len(s)`
**栈不提供遍历功能**，即不能像数组或链表那样随意访问任意位置的元素，所有操作只能在栈顶进行。
#### Python实现栈
**方式一：基于 list（刷题首选）**
Python 的 `list` 天然就是栈：末尾追加、末尾弹出，`append`/`pop` 都是 O(1)。
```python
stack = []
stack.append(1)     # 入栈 push
stack.append(2)
top = stack[-1]     # 查看栈顶 peek，不弹出 → 2
x = stack.pop()     # 出栈 pop，弹出栈顶元素 → 2
len(stack)          # 栈内元素个数 size → 1
not stack           # 判空 empty（空列表为 False → False）
```
**方式二：基于链表实现**
```python
class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

class Stack:  # 链表栈：头节点即栈顶，头插/头删
    def __init__(self):
        self.head = None   # 指向栈顶节点
        self._size = 0

    def push(self, x):
        self.head = Node(x, self.head)  # 头插法，新节点指向原栈顶
        self._size += 1

    def pop(self):
        if self.head is None:
            raise IndexError("pop from empty stack")
        val = self.head.val
        self.head = self.head.next      # 头删法
        self._size -= 1
        return val

    def top(self):
        return self.head.val

    def empty(self):
        return self.head is None

    def size(self):
        return self._size
```
**底层容器的选择**：list 访问快、缓存友好；链表无需预估容量但每个节点有额外指针开销。Python 工程与刷题中直接使用 `list`（或 `collections.deque`）即可，几乎不需要手写链表栈。
### 1.2 队列（Queue）
队列是一种**先进先出（FIFO, First In First Out）的数据结构，在一端（队尾）插入，另一端（队首）删除。**
```
  dequeue ←   ┌───┬───┬───┬───┐   ← enqueue
              │ 1 │ 2 │ 3 │ 4 │
              └───┴───┴───┴───┘
              front           rear
```
队列提供的基本操作（括号内为 Python 中最直接的写法）：
- `push(x)` / `enqueue(x)`：元素x入队（加入队尾）— `q.append(x)`
- `pop()` / `dequeue()`：队首元素出队 — `q.popleft()`
- `front()` / `peek()`：查看队首元素（不移除）— `q[0]`
- `empty()`：判断队列是否为空 — `not q`
- `size()`：获取队列元素个数 — `len(q)`
**队列同样不提供遍历功能**，只允许在两端操作。
#### Python实现队列
**方式一：基于 collections.deque（标准库，刷题首选）**
```python
from collections import deque

q = deque()
q.append(1)         # 入队 enqueue（队尾）
q.append(2)
front = q[0]        # 查看队首 front / peek，不移除 → 1
x = q.popleft()     # 出队 dequeue（队首）→ 1
len(q)              # 队列长度 size → 1
not q               # 判空 empty → False
```
> 注意：不要用 `list.pop(0)` 模拟出队——它会整体前移所有元素，是 O(n) 的。队列必须用 `deque`。

**方式二：基于链表实现（尾插法）**
```python
class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

class Queue:  # 链表队列：队首出、队尾入
    def __init__(self):
        self.front = None   # 队首
        self.rear = None    # 队尾
        self._size = 0

    def push(self, x):
        node = Node(x)
        if self.rear is None:            # 空队列：首尾都指向新节点
            self.front = self.rear = node
        else:
            self.rear.next = node        # 尾插法
            self.rear = node
        self._size += 1

    def pop(self):
        if self.front is None:
            raise IndexError("pop from empty queue")
        val = self.front.val
        self.front = self.front.next     # 头删法
        if self.front is None:           # 删空后要重置 rear，否则尾指针悬空
            self.rear = None
        self._size -= 1
        return val

    def peek(self):
        return self.front.val

    def empty(self):
        return self.front is None

    def size(self):
        return self._size
```
### 1.3 双端队列（Deque）
双端队列是队列的扩展，**允许在首尾两端进行插入和删除操作**，可以看作栈和队列的结合体。
```
      popFront ← ┌───┬───┬───┬───┐ → popBack
      pushFront →├───┼───┼───┼───┤ ← pushBack
                 └───┴───┴───┴───┘
                 front           rear
```
额外提供的操作（括号内为 `collections.deque` 的写法）：
- `pushFront(x)`：从队首插入 — `appendleft(x)`
- `pushBack(x)`：从队尾插入（等价于普通队列的push）— `append(x)`
- `popFront()`：从队首删除（等价于普通队列的pop）— `popleft()`
- `popBack()`：从队尾删除 — `pop()`
- `front()` / `back()`：查看队首/队尾元素 — `d[0]` / `d[-1]`
#### Python实现双端队列
**方式一：collections.deque（标准库，直接可用）**
```python
from collections import deque

d = deque()
d.append(1)         # pushBack：从队尾插入
d.appendleft(0)     # pushFront：从队首插入
d.pop()             # popBack：从队尾删除 → 1
d.popleft()         # popFront：从队首删除 → 0
first = d[0]        # front：查看队首，O(1)
last = d[-1]        # back：查看队尾，O(1)
```
`deque` 的两端操作都是 O(1)（基于循环数组/双向链表实现），可放心用于滑动窗口等场景。
**方式二：基于循环数组手动实现（理解原理用）**
```python
class Deque:  # 循环数组双端队列：多开一个位置用于区分空/满
    def __init__(self, capacity):
        self.data = [None] * (capacity + 1)
        self.head = 0    # 队首下标
        self.tail = 0    # 队尾下标
        self.cap = capacity + 1

    def empty(self):
        return self.head == self.tail

    def full(self):
        return (self.tail + 1) % self.cap == self.head

    def push_back(self, x):
        if self.full():
            raise OverflowError("deque full")
        self.data[self.tail] = x
        self.tail = (self.tail + 1) % self.cap

    def push_front(self, x):
        if self.full():
            raise OverflowError("deque full")
        self.head = (self.head - 1 + self.cap) % self.cap
        self.data[self.head] = x

    def pop_front(self):
        if self.empty():
            raise IndexError("pop from empty deque")
        val = self.data[self.head]
        self.head = (self.head + 1) % self.cap
        return val

    def pop_back(self):
        if self.empty():
            raise IndexError("pop from empty deque")
        self.tail = (self.tail - 1 + self.cap) % self.cap
        return self.data[self.tail]

    def peek_front(self):
        return self.data[self.head]

    def peek_back(self):
        return self.data[(self.tail - 1 + self.cap) % self.cap]
```
应用场景：需要从两端操作的数据，如滑动窗口最大值、回文判断等。**与普通队列相比，Deque 提供了从队尾删除的能力，这让它在某些场景下比队列更灵活。**
### 1.4 优先级队列（Priority Queue / 堆）
优先级队列是一种特殊的队列，**出队顺序不由入队时间决定，而由元素的优先级决定**。每次出队的总是优先级最高（或最低）的元素。
底层通常用**堆（Heap）**实现，堆是一棵完全二叉树：
- **大顶堆（Max Heap）**：父节点值 ≥ 子节点值，每次取出的都是最大值
- **小顶堆（Min Heap）**：父节点值 ≤ 子节点值，每次取出的都是最小值
```
        大顶堆示例：
            100
          /    \
         50     70
        /  \   /  \
       30  40 20  10
```
基本操作（括号内为 `heapq` 的写法）：
- `push(x)`：插入元素，时间复杂度 O(log n) — `heapq.heappush(heap, x)`
- `pop()`：弹出堆顶元素，时间复杂度 O(log n) — `heapq.heappop(heap)`
- `top()`：查看堆顶元素，时间复杂度 O(1) — `heap[0]`
- `empty()` / `size()`：判空 / 大小 — `not heap` / `len(heap)`
#### Python实现优先级队列
Python 标准库 `heapq` 直接提供堆操作，**默认是小顶堆**（堆顶为最小值）：
```python
import heapq

heap = []
heapq.heappush(heap, 3)     # push：O(log n)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)
heap[0]                     # top：查看堆顶（最小值）→ 1
heapq.heappop(heap)         # pop：弹出堆顶 → 1

# 需要大顶堆（每次取最大）时，存入负值即可
max_heap = []
heapq.heappush(max_heap, -5)
big = -heapq.heappop(max_heap)   # 取出时取负还原 → 5

# 已有列表原地建堆：O(n)
nums = [3, 1, 2, 5, 4]
heapq.heapify(nums)

# Top K 问题常用套路：维护大小为 k 的堆
k = 2
topk = nums[:k]
heapq.heapify(topk)
for x in nums[k:]:
    if x > topk[0]:                     # 小顶堆堆顶是当前最小的，比它大则替换
        heapq.heapreplace(topk, x)
# topk 中即为前 k 大的元素
```
应用场景：需要动态获取最值的问题，如 Top K 问题、合并有序序列、Dijkstra 最短路径等。
> 注意：Python 的 `heapq` 在底层用**数组从下标 0 开始**存储完全二叉树（节点 i 的左右孩子是 2i+1、2i+2），且只提供小顶堆。下标起点（0 还是 1）只是写法差异，上浮/下沉的堆调整逻辑与手写版本完全一致。
## 二、栈与队列的扩展应用理论
### 2.1 互相模拟
栈和队列虽然进出规则相反，但可以用**两个同种结构模拟另一种结构**：
- **两个栈实现队列**：一个栈负责入队，另一个栈负责出队。当出队栈为空时，将入队栈的所有元素依次弹出并压入出队栈——两次 LIFO 抵消后等效于 FIFO。
- **两个队列实现栈**：一个队列为主存储，另一个作为辅助。每次入栈时，先将新元素放入空队列，再把主队列全部移过来，保持新元素始终在队首。
这说明栈和队列在表达能力上是等价的，只是操作方式不同。
### 2.2 配对与消除
栈的 LIFO 特性天然适合处理**嵌套配对**和**相邻消除**问题：
- **嵌套配对**：左括号入栈，遇到右括号时检查栈顶是否匹配（如括号匹配、HTML 标签解析等）。栈能记住"最近的未匹配项"，天然对应嵌套结构。
- **相邻消除**：逐个扫描元素，与栈顶比较，若满足消除条件则弹出栈顶，否则入栈。这个过程就像"消消乐"，栈顶元素就是最近一个"存活"的元素。
这两种模式的核心在于：**栈能保存历史信息，且总是操作最近的历史**。
### 2.3 逆波兰表达式（后缀表达式）
通常的数学表达式是中缀表达式，如 `(1+2)*(3+4)`，运算符在两个操作数中间。
逆波兰表达式（后缀表达式）将运算符写在操作数**之后**，如 `1 2 + 3 4 + *`。其核心特点是：
- **不需要括号**确定运算顺序
- **适合用栈求值**：遇到数字入栈，遇到运算符弹出两个数字计算，结果再入栈
- 计算机处理后缀表达式比中缀表达式更高效，无需考虑运算符优先级
### 2.4 单调栈与单调队列
**单调栈**指栈内元素保持单调递增或递减，通常用于求解**下一个更大/更小元素**问题：
- 入栈时破坏单调性的元素会被弹出，因此每个元素入栈前，栈顶就是它之前最近的大于/小于它的元素
- 典型场景：找数组中每个元素右边第一个比它大的数
**单调队列**指队列内元素保持单调性。与单调栈不同，单调队列通常需要**两端操作**（用 Deque 实现）：
- 队尾入队时保持单调性（破坏单调性的从队尾弹出）
- 队首出队移除过期元素
- 典型场景：固定窗口内的最大值/最小值问题
> 单调栈和单调队列属于**优化技巧**，利用单调性将暴力解法中的 O(n²) 优化到 O(n)。它们本身不是独立的数据结构，而是栈和队列的**维护策略**。
## 三、栈与队列的核心区别

| 特性 | 栈（Stack） | 队列（Queue） | 双端队列（Deque） | 优先级队列（Priority Queue） |
|------|------------|-------------|------------------|------------------------------|
| 数据进出 | LIFO（后进先出） | FIFO（先进先出） | 两端皆可进出 | 按优先级出队 |
| 操作端 | 仅栈顶一端 | 队首出、队尾入 | 队首/队尾均可入、出 | 仅堆顶操作 |
| 遍历 | 不支持 | 不支持 | 不支持 | 不支持（堆无序） |
| 典型应用 | 函数调用栈、括号匹配、表达式求值 | BFS、消息队列、滑动窗口 | 滑动窗口最大值、回文判断 | Top K、Dijkstra、合并有序序列 |
| Python实现 | `list`（或 `deque`） | `collections.deque` | `collections.deque` | `heapq`（小顶堆） |