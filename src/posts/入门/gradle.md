---
icon: edit
date: 2023-06-22
category:
  - 入门
tag:
  - gradle
  - maven
  - 镜像
  - java
---

# maven 镜像配置

<!-- more -->

```
allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public/' }
    }
}
```