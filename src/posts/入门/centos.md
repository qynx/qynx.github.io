---
icon: blog
date: 2023-07-08
category:
  - 入门
tag:
  - linux
---

# centos 命令

<!-- more -->

## 安装

### 基础命令

yum install app


### redis


```
sudo yum install epel-release

sudo yum update
```

### mysql

```
sudo yum install mysql-server 

sudo systemctl sart mysqld.service


```

::: tip

刚安装的时候没密码 可以通过下面方式设置密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root123';


:::


### java

```
yum install java-1.8.0-openjdk
```