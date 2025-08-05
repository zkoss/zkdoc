---
title: "encodeURIComponent"
---

```java
java.lang.String encodeURIComponent(java.lang.String)
```

  
i.e.,
[org.zkoss.web.servlet.http.Encodes#encodeURIComponent(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/servlet/http/Encodes.html#encodeURIComponent(java.lang.String))

Does the HTTP encoding for an URI query parameter. For example, '/' is
translated to '%2F'. Both name and value must be encoded separately.
Example, encodeURIComponent(name) + '=' + encodeURIComponent(value).


