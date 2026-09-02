---
title: "3_用队列实现栈"
date: "2026-09-02"
state:
  - finished
categories:
  - CS
tags:
  - leetcode
  - 栈
  - 队列
---
# 225 用队列实现栈
https://leetcode.cn/problems/implement-stack-using-queues

请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（`push`、`top`、`pop` 和 `empty`）。

实现 `MyStack` 类：

- `void push(int x)` 将元素 x 压入栈顶。
- `int pop()` 移除并返回栈顶元素。
- `int top()` 返回栈顶元素。
- `boolean empty()` 如果栈是空的，返回 `true`；否则，返回 `false`。

注意：

- 你只能使用队列的标准操作 —— 也就是 `push to back`、`peek/pop from front`、`size` 和 `is empty` 这些操作。
- 你所使用的语言也许不支持队列。你可以使用 list 或者 deque（双端队列）来模拟一个队列，只要是标准的队列操作即可。

**示例 1：**

```
输入：
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 2, 2, false]

解释：
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top();   // 返回 2
myStack.pop();   // 返回 2
myStack.empty(); // 返回 False
```

**提示：**

- `1 <= x <= 9`
- 最多调用 `100` 次 `push`、`pop`、`top` 和 `empty`
- 每次调用 `pop` 和 `top` 都保证栈不为空

# 思路

**方法一：两个队列**

用两个队列 `q1` 和 `q2`。每次 push 时，将新元素放入 `q2`，然后将 `q1` 中的所有元素依次出队并放入 `q2`，最后交换 `q1` 和 `q2`。这样 `q1` 的队首始终是栈顶元素。

**方法二：一个队列（更简洁）**

每次 push 时，先入队，然后将新元素之前的所有元素依次出队再入队。这样队首始终是最新 push 的元素（即栈顶）。

**复杂度**：`push` O(n)（要把前面的元素轮转一遍），`pop`/`top`/`empty` O(1)，空间 O(n)。

# 题解

```python
from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x: int) -> None:
        n = len(self.q)
        self.q.append(x)
        # 把新元素之前的元素依次出队再入队，让新元素到队首（即栈顶）
        for _ in range(n):
            self.q.append(self.q.popleft())

    def pop(self) -> int:
        return self.q.popleft()  # 队首就是栈顶

    def top(self) -> int:
        return self.q[0]

    def empty(self) -> bool:
        return not self.q


# Your MyStack object will be instantiated and called as such:
# obj = MyStack()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.top()
# param_4 = obj.empty()
```
