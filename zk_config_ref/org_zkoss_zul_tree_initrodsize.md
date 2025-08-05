---
title: "org.zkoss.zul.tree.initRodSize"
---

**Property:**

`org.zkoss.zul.tree.initRodSize`

`Default: 50`

Specifies the number of items rendered when the Tree first render. It is
used only if live data
([org.zkoss.zul.Tree#setModel(org.zkoss.zul.TreeModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tree.html#setModel(org.zkoss.zul.TreeModel)))
and not paging
([org.zkoss.zul.Tree#getPagingChild()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tree.html#getPagingChild())).

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

```xml
<tree>
  <custom-attributes org.zkoss.zul.tree.initRodSize="30"/>
...
```

# Version History

| Version | Date        | Content                                                                          |
|---------|-------------|----------------------------------------------------------------------------------|
| 7.0.0   | August 2013 | [ZK-1898-Tree support render on demand](http://tracker.zkoss.org/browse/ZK-1898) |
