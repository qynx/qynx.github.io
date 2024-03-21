---
icon: java
date: 2024-03-22
title: idea闪退问题
category:
  - 博客
tag:
  - macos
  - java
  - bug
---

# 2024 idea闪退问题

<!-- more -->


## 2023-03-22

最近 idea 经常闪退, jetbrains[weibo](https://weibo.com/3220313942/O5JuPDOh5)官号发帖提示是因为最新版 macOS (Sonoma 14.4) 在基于 Apple 芯片的计算机上会导致运行在 JVM 上的软件崩溃, 详情见[https://blogs.oracle.com/java/post/java-on-macos-14-4?continueFlag=0d40a31a3b0f0f59a3609a5337af6bde](https://blogs.oracle.com/java/post/java-on-macos-14-4?continueFlag=0d40a31a3b0f0f59a3609a5337af6bde)

> [!note]
> 大致是因为macos14.4 修改了用户进程访问受保护内存地址的处理方法导致的。
14.4之前, 系统会发送 SIGBUS 或 SIGSEGV 给用户进程
14.4版本, 系统会发送 SIGKILL kill掉进程



当前oracle还没有给出解决方案, idea给了临时解决办法, （==只能降低发生频率，不能彻底避免==）, 可以下载临时打包的java Runtime更换为idea的RootRuntime, 详见链接[https://youtrack.jetbrains.com/issue/JBR-6802/Crash-EXCBADINSTRUCTION-from-ObjectMonitorTrySpin-on-macOS-14.4#focus=Change-27-9471539.0-0%3FcontinueFlag=27b51d2bf0e9b9bc938a9a8ac14d3b9c](https://youtrack.jetbrains.com/issue/JBR-6802/Crash-EXCBADINSTRUCTION-from-ObjectMonitorTrySpin-on-macOS-14.4#focus=Change-27-9471539.0-0%3FcontinueFlag=27b51d2bf0e9b9bc938a9a8ac14d3b9c)

