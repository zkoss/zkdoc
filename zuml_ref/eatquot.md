---
title: "eatQuot"
---

```java
java.lang.String eatQuot(java.lang.String)
```

  
i.e.,
[org.zkoss.xel.fn.StringFns#eatQuot(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/fn/StringFns.html#eatQuot(java.lang.String))

Eliminates single and double quotations to avoid JavaScript injection.
It eliminates all quotations. In other words, the specified string shall
NOT contain any quotations. It is used to avoid JavaScript injection.
For exmple, in DSP or JSP pages, the following codes is better to escape
with this method.

```xml
<input value="${c:eatQuot(param.some)}"/>
```


