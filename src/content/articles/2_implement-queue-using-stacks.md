---
title: "2_用栈实现队列"
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
# 232.用栈实现队列
https://leetcode.cn/problems/implement-queue-using-stacks/description/

请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（`push`、`pop`、`peek`、`empty`）。
实现 `MyQueue` 类：
- `void push(int x)` 将元素 x 推到队列的末尾
- `int pop()` 从队列的开头移除并返回元素
- `int peek()` 返回队列开头的元素
- `boolean empty()` 如果队列为空，返回 `true`；否则，返回 `false`
说明：
- 你**只能**使用标准的栈操作 —— 也就是只有 `push to top`, `peek/pop from top`, `size`, 和 `is empty` 操作是合法的。
- 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
**示例 1：**
```
输入：
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 1, 1, false]

解释：
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2]（最左侧是队列的前端）
myQueue.peek();  // 返回 1
myQueue.pop();   // 返回 1, queue is [2]
myQueue.empty(); // 返回 false
```
**提示：**
- `1 <= x <= 9`
- 最多调用 `100` 次 `push`、`pop`、`peek` 和 `empty`
- 假设所有 `pop` 和 `peek` 调用都是合法的
## 思路

使用两个栈来模拟队列：一个**入栈** `inStack`，一个**出栈** `outStack`。

- **push**：直接压入 `inStack`。
- **pop / peek**：如果 `outStack` 为空，将 `inStack` 中的所有元素依次弹出并压入 `outStack`，这样 `inStack` 的栈底元素就变成了 `outStack` 的栈顶，即队列的队首。然后从 `outStack` 弹出/查看栈顶即可。
- **empty**：两个栈都为空时队列为空。

**复杂度**：每个元素最多被搬运两次（push 进 `inStack` → 转移进 `outStack` → 再弹出），所以 `push`/`pop`/`peek` 均摊 O(1)，空间 O(n)。

## 题解

```python
class MyQueue:
    def __init__(self):
        self.instack = []
        self.outstack = []

    def push(self, x: int) -> None:
        self.instack.append(x)  # 修正1：加点号

    def pop(self) -> int:
        if not self.outstack:
            while self.instack:
                self.outstack.append(self.instack.pop())
        return self.outstack.pop()  # 修正2：只弹出一个

    def peek(self) -> int:
        if not self.outstack:
            while self.instack:
                self.outstack.append(self.instack.pop())
        return self.outstack[-1]  # 修正3：挪到循环外面

    def empty(self) -> bool:
        return not self.instack and not self.outstack  # 修正4：两个都为空


# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()
```
