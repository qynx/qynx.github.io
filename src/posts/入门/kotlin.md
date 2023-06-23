---
icon: edit
date: 2023-06-22
category:
  - 入门
tag:
  - kotlin
  - 语法
---

# kotlin

<!-- more -->

## if 条件

```java
fun maxOf(a: Int, b: Int) = if (a > b) a else b
```

## enum 


### 枚举构造函数

```java
enum class TestEnum(val value: Int) {
    FIRST(1),
    ;
}
```

### 枚举值遍历

```java
for (label in TestEnum.values()) {
    println(labal.toStirng())
}
```

## jackson


### JsonProperty

使用 `@JsonProperty` 标识类的属性时和java 不一样要用 `@get:JsonProperty`

详情见 [stackoverflow-47982148](https://stackoverflow.com/questions/47982148/usage-of-jackson-jsonproperty-annotation-for-kotlin-data-classes)

## 高阶函数

### let

::: tip

作用域函数 取最后一行作为返回值

:::

## null 判断


### safe null



```java
// a 不为 null时执行
a?.apply {

}
```

### null || 


```java
// a为null时默认值
a?:false
```