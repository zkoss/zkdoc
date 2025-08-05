---
title: "new1"
---

```java
Object new1(Object cls, Object arg);
```

  
i.e.,
[org.zkoss.xel.fn.CommonFns#new_(java.lang.Object, java.lang.Object)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/fn/CommonFns.html#new_(java.lang.Object, java.lang.Object))

Instantiates the given class with an argument. It assumes the given
class has a proper constructor.

**Parameters**

- cls - the class. It could be an instance of either String or Class.
- arg - the argument to be passed to the constructor.

# Usage

`${c:new1('java.lang.Integer', 2)}`


