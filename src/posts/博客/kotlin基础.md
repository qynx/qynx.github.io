---
icon: java
date: 2024-04-14
title: kotlin协程
category:
  - 博客
tag:
  - kotlin
---

# kotlin 基础

<!-- more -->


##  async

[https://kotlinlang.org/docs/coroutines-and-channels.html#task-5](https://kotlinlang.org/docs/coroutines-and-channels.html#task-5)

```java
 coroutineScope {
            async {
                delay(1000)
            }
            async {
                delay(1000)
            }
        }
```


## kotlin lombok

[https://kotlinlang.org/docs/lombok.html#using-with-kapt](https://kotlinlang.org/docs/lombok.html#using-with-kapt)


## kotlin for循环

```kotlin
println(4 in 1..4)

```