---
title: "Renderer"
---

A **renderer** is a Java class that produces child items based on a data
model. It renders your data into View. There are 2 kinds of renderers:

1.  . Render child components: like
    [org.zkoss.zul.ListitemRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListitemRenderer.html),
    [org.zkoss.zul.RowRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/RowRenderer.html)
2.  . Render HTML snippets:
    [org.zkoss.zul.ItemRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ItemRenderer.html).

The implementation of a renderer depends on the component. For example,
the display of [org.zkoss.zul.Listbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html) can be
customized by an implementation of
[org.zkoss.zul.ListitemRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListitemRenderer.html), and
[org.zkoss.zul.Grid](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html) by
[org.zkoss.zul.RowRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/RowRenderer.html).

If you prefer to define the rendering of each item in the ZUML document,
you can use
[templates]({{site.baseurl}}/zk_dev_ref/mvc/template)
instead.
