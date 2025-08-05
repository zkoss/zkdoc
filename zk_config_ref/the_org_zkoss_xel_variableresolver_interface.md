---
title: "The org.zkoss.xel.VariableResolver interface"
---

**Listener:**

`org.zkoss.xel.VariableResolver`

A listener could implement
[org.zkoss.xel.VariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/VariableResolver.html), and
then it will be used as the default variable resolver of each page. In
other words, the variable resolver defined will be available to all
pages. It is also called the system-level variable resolver.

ZK will instantiate an instance of the given class for each page, so the
variable resolver is no need to be thread safe.

This feature is useful for tools and utilities to provide the default
variable resolvers (aka., implicit variables). A tool can specify the
listeners in `metainfo/zk/config.xml` (locatable by the class loader) --
not just in `WEB-INF/zk.xml`.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
