---
icon: java
date: 2024-09-09
category:
  - 博客
---

# docker

<!-- more -->



# docker + spring + mac


1. 制作镜像

> docker build --build-arg JAR_FILE=build/libs/\*.jar -t {镜像名称}

2. 运行

> docker run --name {容器名称} -p 9000:9000 -d {镜像名称}


::: tip 网络问题
mac上不支持host模式，如果在容器中访问宿主机里面的服务需要用域名 `host.docker.internal`
:::