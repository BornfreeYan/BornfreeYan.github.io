---
title: "3_设计链表"
date: "2026-08-29"
state:
  - finished
categories:
  - CS
tags:
  - 链表
  - leetcode
---
> 这道题其实就是头插法、尾插法、删除、增加节点等考研计算机都常见的操作，但是由于`MyLinkedList`这个类导致容易望而却步，其实代码逻辑不难，如果实在写不出来，直接看答案
# 707.设计链表
你可以选择使用单链表或者双链表，设计并实现自己的链表。

单链表中的节点应该具备两个属性：`val` 和 `next` 。`val` 是当前节点的值，`next` 是指向下一个节点的指针/引用。

如果是双向链表，则还需要属性 `prev` 以指示链表中的上一个节点。假设链表中的所有节点下标从 **0** 开始。

实现 `MyLinkedList` 类：

- `MyLinkedList()` 初始化 `MyLinkedList` 对象。
- `int get(int index)` 获取链表中下标为 `index` 的节点的值。如果下标无效，则返回 `-1` 。
- `void addAtHead(int val)` 将一个值为 `val` 的节点插入到链表中第一个元素之前。在插入完成后，新节点会成为链表的第一个节点。
- `void addAtTail(int val)` 将一个值为 `val` 的节点追加到链表中作为链表的最后一个元素。
- `void addAtIndex(int index, int val)` 将一个值为 `val` 的节点插入到链表中下标为 `index` 的节点之前。如果 `index` 等于链表的长度，那么该节点会被追加到链表的末尾。如果 `index` 比长度更大，该节点将 **不会插入** 到链表中。
- `void deleteAtIndex(int index)` 如果下标有效，则删除链表中下标为 `index` 的节点。

## 思路
这道题目设计链表的五个接口，覆盖了链表的常见操作：

- 获取链表第index个节点的数值
- 在链表的最前面插入一个节点
- 在链表的最后面插入一个节点
- 在链表第index个节点前面插入一个节点
- 删除链表的第index个节点

这里涉及对链表的一些增删操作，还是设置一个虚拟头节点。
## 题解
```c
typedef struct Node {
	int val;
	struct Node* next;
} Node;


typedef struct {
	int size;
	Node* data;
} MyLinkedList;


MyLinkedList* myLinkedListCreate() {
	//1. 分配链表管理器的空间
	MyLinkedList* obj = (MyLinkedList*)malloc(sizeof(MyLinkedList));
	//2. 创建虚拟头节点
    Node* head = (Node*)malloc(sizeof(Node));
    //3. 初始化虚拟头节点的next指针
	head->next = (void*)0;//空指针的意思，也可以写成NULL
	//4. 将虚拟头节点连接到链表管理器
	obj->data = head;
	//5. 初始化链表大小
    obj->size = 0;
    
	return obj;
}

//获取链表中第 index 个节点的值。如果索引无效，则返回-1。
int myLinkedListGet(MyLinkedList* obj, int index) {
	if (index < 0 || index >= obj->size) return -1;

	Node* cur = obj->data;//这其实就是虚拟头节点
	while (index-- >= 0) {//题目说了链表节点从下标0开始
        cur = cur->next;
    }

	return cur->val;
}

//在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。其实就是头插法
void myLinkedListAddAtHead(MyLinkedList* obj, int val) {
	Node* node = (Node*)malloc(sizeof(Node));
	node->val = val;

	node->next = obj->data->next;//新插入节点指向虚拟头节点的下一个节点，即第一个节点
	obj->data->next = node;
	obj->size++;
}

//将值为 val 的节点追加到链表的最后一个元素
void myLinkedListAddAtTail(MyLinkedList* obj, int val) {
	Node* cur = obj->data;
	while (cur->next != ((void*)0)) {
        cur = cur->next;
    }

	Node* tail = (Node*)malloc(sizeof(Node));
	tail->val = val;
	tail->next = (void*)0;
	cur->next = tail;
	obj->size++;
}

//在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点
void myLinkedListAddAtIndex(MyLinkedList* obj, int index, int val) {
	if (index > obj->size) return;

	Node* cur = obj->data;
	while (index-- > 0) { 
        cur = cur->next;
    }

	Node* node = (Node*)malloc(sizeof(Node));
	node->val = val;
	node->next = cur->next;
	cur->next = node;
	obj->size++;
}

//如果索引 index 有效，则删除链表中的第 index 个节点
void myLinkedListDeleteAtIndex(MyLinkedList* obj, int index) {
	if (index < 0 || index >= obj->size) return;

	Node* cur = obj->data;
	while (index-- > 0) {
        cur = cur->next;
    }

	Node* temp = cur->next;
	cur->next = temp->next;
	free(temp);
	obj->size--;
}

//释放内存函数
void myLinkedListFree(MyLinkedList* obj) {
	Node* tmp = obj->data;
	while (tmp != NULL) {
		Node* n = tmp;
		tmp = tmp->next;
		free(n);
	}
	free(obj);
}

/**
 * Your MyLinkedList struct will be instantiated and called as such:
 * MyLinkedList* obj = myLinkedListCreate();
 * int param_1 = myLinkedListGet(obj, index);
 
 * myLinkedListAddAtHead(obj, val);
 
 * myLinkedListAddAtTail(obj, val);
 
 * myLinkedListAddAtIndex(obj, index, val);
 
 * myLinkedListDeleteAtIndex(obj, index);
 
 * myLinkedListFree(obj);
*/
```
C代码解释:
Q：创建后的链表状态：
A：
```text
外部视角:
MyLinkedList* obj ──→ [size: 0]
                       [data: ──→ 指向下面的节点]

内部结构:
虚拟头节点 ──→ [val: 任意值] → NULL
              [next: NULL]    
                ↑
              (实际链表为空，无其他节点)
```

Python:
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
        
class MyLinkedList:
    def __init__(self):
        self.dummy_head = ListNode()
        self.size = 0

    def get(self, index: int) -> int:
        if index < 0 or index >= self.size:
            return -1
        
        current = self.dummy_head.next
        for i in range(index):
            current = current.next
            
        return current.val

    def addAtHead(self, val: int) -> None:
        self.dummy_head.next = ListNode(val, self.dummy_head.next)
        self.size += 1

    def addAtTail(self, val: int) -> None:
        current = self.dummy_head
        while current.next:
            current = current.next
        current.next = ListNode(val)
        self.size += 1

    def addAtIndex(self, index: int, val: int) -> None:
        if index < 0 or index > self.size:
            return
        
        current = self.dummy_head
        for i in range(index):
            current = current.next
        current.next = ListNode(val, current.next)
        self.size += 1

    def deleteAtIndex(self, index: int) -> None:
        if index < 0 or index >= self.size:
            return
        
        current = self.dummy_head
        for i in range(index):
            current = current.next
        current.next = current.next.next
        self.size -= 1


# Your MyLinkedList object will be instantiated and called as such:
# obj = MyLinkedList()
# param_1 = obj.get(index)
# obj.addAtHead(val)
# obj.addAtTail(val)
# obj.addAtIndex(index,val)
# obj.deleteAtIndex(index)
```