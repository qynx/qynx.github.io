---
icon: edit
date: 2023-06-23
category:
  - 入门
tag:
  - mybatis
  - java
  - orm
---


# Mybatis

> mybatis 简单使用

<!-- more -->



## mapper scan 配置

```java
    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setBasePackage("mybatis.mapper");
        return mapperScannerConfigurer;
    }
```

## xml 扫描目录配置

```java
ResourcePatternResolver resourceResolver = new PathMatchingResourcePatternResolver();
Resource[] xmlResource = resourceResolver.getResources("classpath:*.xml");
bean.setMapperLocations(xmlResource);
```