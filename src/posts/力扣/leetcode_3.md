---
icon: edit
date: 2022-11-05
title: 不含有重复字符的最长子串的长度
category:
  - 刷题
tag:
  - leetcode
  - java
  - 思维
---

# 3. 不含有重复字符的最长子串的长度

<!-- more -->


```
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

 

示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 解法1 (2023/10)

用map记录字符是否出现过  若是回去遍历上次出现位置

```java
public class leetcode_3 {
    

    public int lengthOfLongestSubstring(String s) {
        int res = 0;
        if (null == s || s.length() == 0) {
            return res;
        }
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        int tmp = 0;
        for (int idx = 0; idx < s.length(); idx++) {
            String chars = s.substring(idx, idx+1);
            if (!map.containsKey(chars)) {
                map.put(chars, true);
                tmp += 1;
            } else {    
                int y = idx - 1;
                for (; y >= 0; y--) {
                    if (s.substring(y, y+1).equals(chars)) {
                        break;
                    }
                }
                y = y + 1;
                map.clear();
                for (; y <= idx; y++) {
                    map.put(s.substring(y, y+1), true);
                }
                tmp = map.size();
            }
            res = Math.max(tmp, res);
        }
        return res;
    }


    public static void main(String[] args) {
        leetcode_3 ins = new leetcode_3();
        System.out.println(ins.lengthOfLongestSubstring("dvdf"));
    }
}
```

## 解法2 (2024/01)

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
      if (s.length() == 0) {
            return 0;
        }

        Map<Character, Integer> posMap = new HashMap<>();
        int start = 0, end = 0, res = 1;
        posMap.put(s.charAt(0), 0);
        for (int i = 1; i < s.length(); i++) {
            char ch = s.charAt(i);
            Integer lastPos = posMap.get(ch);
            if (lastPos != null && lastPos >= start) {
                start = lastPos + 1;
            }
            end = i;
            res = Math.max(res, end-start+1);
            
            posMap.put(ch, i);
        }
        return res;
    }
}
```