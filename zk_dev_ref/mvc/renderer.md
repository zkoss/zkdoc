A **renderer** is a Java class that produces child items based on a data
model. It renders your data into View. There are 2 kinds of renderers:

1.  . Render child components: like
    <javadoc type="interface">org.zkoss.zul.ListitemRenderer</javadoc>,
    <javadoc type="interface">org.zkoss.zul.RowRenderer</javadoc>
2.  . Render HTML snippets:
    <javadoc type="interface">org.zkoss.zul.ItemRenderer</javadoc>.

The implementation of a renderer depends on the component. For example,
the display of [org.zkoss.zul.Listbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html) can be
customized by an implementation of
<javadoc type="interface">org.zkoss.zul.ListitemRenderer</javadoc>, and
[org.zkoss.zul.Grid](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html) by
<javadoc type="interface">org.zkoss.zul.RowRenderer</javadoc>.

If you prefer to define the rendering of each item in the ZUML document,
you can use
[templates]({{site.baseurl}}/zk_dev_ref/mvc/view/template)
instead.
