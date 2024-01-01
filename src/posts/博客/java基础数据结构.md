---
icon: java
date: 2024-01-01
title: java 基础数据结构
category:
  - 博客
tag:
  - java
  - 数据结构
---

# java 基础数据结构

<!-- more -->


## 1. 优先队列(堆)

### 1.0 初始化


```java
PriorityQueue<Integer> priorityQueue = new PriorityQueue<>((a, b) -> a-b);
```

### 1.1 入队列 

```java
priorityQueue.offer(1);
```

### 1.2 出队列

```java
priorityQueue.poll()
``` 

### 1.3 demo

<iframe src="https://pl.kotl.in/tBnF-3eSf" height='220' width='600'></iframe>


## 2. 栈

### 1.0 初始化

```java
Deque<Integer> deque = new ArrayDeque<>();
```

### 1.1 入栈

```java
deque.push(1);
deque.push(2);
```

### 1.2 出栈


```java
deque.pop()
```