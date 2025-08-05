---
title: "In Pure Java"
---



It is also possible to create XHTML components in Java. The XHTML
components are mapped to classes by ZK which means you can implement
something like this:

```java
Td myTd = new Td();
```

This enables you to use XHTML components from ZUL or within Java just
like anything ZK related. If you need to output an XHTML component which
is not present in ZK you can use the Raw object.

### Raw

A special component, [org.zkoss.zhtml.Raw](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zhtml/Raw.html) is used to
represent any component that is not declared in the following section
(i.e., not in lang.xml). In other words, if any unrecognized component
name is found, an instance of [org.zkoss.zhtml.Raw](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zhtml/Raw.html) is
created and a proper HTML tag will be generated accordingly. In other
words, any component name is legal as long as the targeted browser
supports.

```xml
<marquee align="top">...</marquee>
```

is equivalent to

```java
new Raw("marquee").setDynamicProperty("align", "top");
```

Next let's investigate the differences between XUL and XHTML components.


