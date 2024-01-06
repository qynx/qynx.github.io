---
icon: edit
date: 2024-01-06
title: 560. 和为 K 的子数组
category:
  - 刷题
tag:
  - leetcode
  - java
  - 前缀和
---

# 560. 和为 K 的子数组

<!-- more -->


```
给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。

子数组是数组中元素的连续非空序列。

 

示例 1：

输入：nums = [1,1,1], k = 2
输出：2
示例 2：

输入：nums = [1,2,3], k = 3
输出：2

```



```java
class Solution {
    public int subarraySum(int[] nums, int k) {
        
       Map<Integer, Integer> map = new HashMap<>();
       map.put(0, 1);
       int sum = 0;
       int res = 0;
       for (int i = 0; i < nums.length; i++) {
           sum += nums[i];
           res += map.getOrDefault(sum - k, 0);
           map.put(sum, map.getOrDefault(sum, 0) + 1);
       }
       return res;
    }
}
```
