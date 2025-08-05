---
title: "org.zkoss.zul.tree.maxRodPageSize"
---

**Property:**

`org.zkoss.zul.tree.maxRodPageSize`

`Default: 1`

Specifies how many pages (of treeitems) to keep rendered in memory (on
the server side) when navigating the tree using pagination. It is used
only if live data
([org.zkoss.zul.Tree#setModel(org.zkoss.zul.TreeModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tree.html#setModel(org.zkoss.zul.TreeModel)))
and in paging mold
([org.zkoss.zul.Tree#getPagingChild()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tree.html#getPagingChild())).

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

```xml
<tree>
  <custom-attributes org.zkoss.zul.tree.maxRodPageSize="5"/>
...
```

# Version History

| Version | Date        | Content                                                                          |
|---------|-------------|----------------------------------------------------------------------------------|
| 7.0.0   | August 2013 | [ZK-1898-Tree support render on demand](http://tracker.zkoss.org/browse/ZK-1898) |
