---
title: "org.zkoss.zul.tree.autoSort"
---

**Property:**

`org.zkoss.zul.tree.autoSort`
{% include all-scopes-available.html %}

Default: `false`  
{% include version-badge.html version="5.0.7" %}

Specifies whether to sort the model when the following cases:

- [org.zkoss.zul.Tree#setModel (TreeModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tree.html#setModel (TreeModel))is
  called and
  [org.zkoss.zul.Treecol#setSortDirection(String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Treecol.html#setSortDirection(String))
  is set.
- [org.zkoss.zul.Treecol#setSortDirection(String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Treecol.html#setSortDirection(String))
  is called.
- Model receives `org.zkoss.zul.event.TreeDataEvent`
  and
  [org.zkoss.zul.Treecol#setSortDirection(String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Treecol.html#setSortDirection(String))
  is set.

If you want to ignore sorting when receiving
`org.zkoss.zul.event.TreeDataEvent`, you can specifies
the value as **ignore.change**.

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

```xml
<tree>
  <custom-attributes org.zkoss.zul.tree.autoSort="true"/>
...
```

# Version History

| Version | Date | Content | 5.0.7 | April 2011 | Tree shall sort model based on current state. |
|---------|------|---------|-------|------------|-----------------------------------------------|
