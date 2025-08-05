---
title: "new"
---

```java
Object new(Object cls);
```

  
i.e. it calls
[org.zkoss.xel.fn.CommonFns#new_(java.lang.Object)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/fn/CommonFns.html#new_(java.lang.Object))

Instantiates the given class. It assumes the given class has a default
constructor.

**Paramters**

- cls - the class. It could be an instance of either String or Class.

# Usage

You can use it to convert a number to the correct type(class),
`${c:int(1)}`.

Notice that a number specified in EL is interpreted as long by default.
For example, in `${c:new('foo.Mine', 10)}`, 10 is interpreted as long.
If you're using 5.0.5 and prior, you have to convert it to integer
manually : `${c:new('foo.Mine', c:int(10))}`.

# Version History

| Version | Date          | Content                                                             |
|---------|---------------|---------------------------------------------------------------------|
| 5.0.6   | December 2010 | Automatically converted a number to the correct type (aka., class). |
