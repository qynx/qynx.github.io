---
icon: edit
date: 2023-07-03
category:
  - 入门
tag:
  - 邮件
---

# java 发送邮件

## 1. outlook邮箱

<!-- more -->

### 1.1 依赖

```groovy

	implementation("com.sun.mail:jakarta.mail:2.0.1")
	implementation("com.sun.activation:jakarta.activation:2.0.1")
```

### 1.2 客户端配置

- 邮件地址和请求配置

```java
    fun properties(): Properties {
        val properties = Properties();
        properties.setProperty("mail.smtp.host", "smtp.office365.com")
        properties.setProperty("mail.smtp.port", "587")
        properties.setProperty("mail.smtp.auth", "true")
        properties.setProperty("mail.smtp.timeout", "25000")
        properties.setProperty("mail.smpt.auth", "true")
        properties.setProperty("mail.smtp.starttls.enable", "true")
        properties.setProperty("mail.smtp.ssl.socketFactory.class", "com.sun.mail.util.MailSSLSocketFactory")
        properties.setProperty("smtp.ssl.socketFactory.fallback", "false")
        return properties
    }
```

-  发送账户配置

```java
fun mailSession(): Session {
        val session = Session.getInstance(properties(), MyMailAuth("you account", "your password")
        return session
    }
```

### 1.3 发送邮件

```java
    fun sendMsg(to:String, text:String, subject:String?) {
        val message = MimeMessage(session)
        message.setFrom("you account")
        message.setRecipient(Message.RecipientType.TO, InternetAddress(to))
        message.setText(text)
        message.setSubject(subject?:text)
        Transport.send(message)
    }
```