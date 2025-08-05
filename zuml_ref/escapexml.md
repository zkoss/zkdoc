---
title: "escapeXML"
---

```java
String escapeXML(String s);
```

  
i.e.,
[org.zkoss.xml.XMLs#escapeXML(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xml/XMLs.html#escapeXML(java.lang.String))

Encodes a string that special characters are quoted to be compatible
with HTML/XML. For example,

  
`<` is translated to `&lt;`

`>` to `&gt;`

`&` to `&amp;`

`"` to `&#034;`

`'` to `&#039;`

**Parameters:**

- s - the string to encode


