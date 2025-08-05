---
title: "org.zkoss.lang.contextClassLoader.class"
---

**Property:**

`org.zkoss.lang.contextClassLoader.class`

Default:  `none` (it implies `Thread.currentThread().getContextClassLoader()`)

It specifies the name of the class used to provide the customized
context class loader. The class must implement the
[org.zkoss.lang.ContextClassLoaderFactory](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/lang/ContextClassLoaderFactory.html)
interface.
