---
icon: java
date: 2024-04-02
title: mac安装多个python版本
category:
  - 博客
tag:
  - 技术
  - 环境配置
---

# mac安装多个python版本

<!-- more -->

> 推荐使用pyenv

1. brew install pyenv

2. pyenv install 3.6

3. 设置

>echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc

> pyenv global 3.6


## 2. pycurl 安装说明

```bash
https://gist.github.com/vidakDK/de86d751751b355ed3b26d69ecdbdb99?permalink_comment_id=4029319
```