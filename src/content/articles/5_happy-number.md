---
title: "5_快乐数"
date: "2026-08-31"
state:
  - finished
categories:
  - CS
tags:
  - 双指针
  - 哈希表
  - leetcode
---
# 202.快乐数
[202.快乐数](https://leetcode.cn/problems/happy-number/description/)

编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。如果 可以变为  1，那么这个数就是快乐数。

如果 n 是快乐数就返回 True ；不是，则返回 False 。

**示例：**
输入：19  
输出：true  
解释：  
$1^2 + 9^2 = 82$
$8^2 + 2^2 = 68$  
$6^2 + 8^2 = 100$
$1^2 + 0^2 + 0^2 = 1$

提示：$1 <= n <= 2^{31} - 1$
## 思路
首先要编写一个函数来实现快乐数的计算，方便后续循环中的调用。回顾一下c语言整除/取余的计算，这个很简单。

其次，要关注题目的要求，要么重复计算快乐数，直到成为1，要么**无限循环**但永不为1，注意这个无限循环，意思就是一定会在某几个固定的数字中循环，比如：2->4->16->37->58->89->145->42->20->4,这里就会反复出现一个4，这就是所谓的循环。可以多用几个大概率是非快乐数的数字试一试，感受一下，这就是逻辑判断的关键点，因为一旦有重复的数字，就可以用哈希表存储：第一次存储后，再次得出这个数即可判断非快乐数，而有限循环且得出1的就是快乐数。

当然，个人体感上这道题是为了用哈希表而用，快慢指针的O(1)时间复杂度优于哈希的O(logn)。

## C题解1：哈希表/哈希数组
如果n是任意无穷大的数字，那这题用一个限定大小的数组是很难的，好在题目限制了$1 <= n <= 2^{31} - 1$，n最大不能大于2的31次方，也就是10位数，一个10位数最多就是10个9，而$9999999999^2$是810，那数组就可以限制在810大小。
```c
int getSum(int n){
    int count = 0;
    while(n!=0){
        int x = n%10;//取余操作，比如81就能取出1
        n /= 10;//取整，比如81就剩8，而如果是8，就剩0，也就是最终n=0
        count += x * x;
    }
    return count;
}

bool isHappy(int n) {
    int hash[810] = {0};//全员赋0
    while(n!=1){
        n = getSum(n);//原地计算快乐数
        if(hash[n]==1){
            return false;//重复出现，返回false
        }else{
            hash[n] ++;//记录每一个快乐数
        }
    }
    return true;
}
```
## C题解2：快慢指针/双指针
```c
int getSum(int n){
    int count = 0;
    while(n!=0){
        int x = n%10;
        n /= 10;
        count += x * x;
    }
    return count;
}

bool isHappy(int n) {
    int fast = n,slow = n;
    do{
        /*  
            1、当n为快乐数时，fast和slow最后都会变为1，并保持不变，fast和slow相等
            2、当n不为快乐数时，fast和slow会在一些数内重复循环，但fast每次走两步，
               slow每次走一步，fast最终会和slow相等
            综上：fast和slow在两种情况下，最终都会相等
        */
        slow = getSum(slow);
        fast = getSum(fast);
        fast = getSum(fast);//老传统了，快指针走两步，慢指针走一步
    }while(slow!=fast);

    return fast == 1;//如果真为1，就是快乐数，返回true，反之返回false
}
```
## Python题解
```python
class Solution:
    def get_num(self,n):# 注意self参数别漏
        sum = 0
        while n>0:
            digit = n % 10
            sum += digit*digit
            n = n//10
        return sum
  
    def isHappy(self, n: int) -> bool:
        seen = set()
        while n != 1 and n not in seen:
            seen.add(n)
            n = self.get_num(n)# 需要self.调用，不加self就放在class外面当全局
        if n == 1:
            return True
        else:
            return False
```