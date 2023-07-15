---
icon: java
date: 2023-07-15
title: java aes 加密/解密
category:
  - 博客
tag:
  - aes
  - java
---

# java aes 加密/解密

<!-- more -->


aes 对key的长度有要求 下面是key填充方法

```java
fun fillKey(key: String): ByteArray {
    val random = SecureRandom.getInstance("SHA1PRNG")
    random.setSeed(key.toByteArray())
    val generator = KeyGenerator.getInstance("AES")
    generator.init(random)
    return generator.generateKey().encoded
}

```

基于hutool封装的工具类 


```java

fun ktAes(key: String, source: String): String {
    val keyBytes = fillKey(key)
    return SecureUtil.aes(keyBytes).encryptBase64(source)
}

fun ktDeAes(key: String, source: String): String {
    val keyBytes = fillKey(key)
    return SecureUtil.aes(keyBytes).decryptStr(source)
}
```