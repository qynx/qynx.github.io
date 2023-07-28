---
icon: blog
date: 2023-06-22
category:
  - 入门
tag:
  - gradle
  - maven
  - 镜像
  - java
---

# maven/gradle 镜像配置

<!-- more -->

## gradle

```groovy
allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public/' }
    }
}
```

## maven


```xml
<!-- 配置阿里云仓库 -->
<repositories>
    <repository>
        <id>aliyun-repos</id>
        <url>https://maven.aliyun.com/repository/public</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>
<pluginRepositories>
    <pluginRepository>
        <id>aliyun-repos</id>
        <url>https://maven.aliyun.com/repository/public</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </pluginRepository>
</pluginRepositories>
```