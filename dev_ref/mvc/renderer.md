A **renderer** is a Java class that produces child items based on a data
model. It renders your data into View. There are 2 kinds of renderers:

1.  . Render child components: like
    <javadoc type="interface">org.zkoss.zul.ListitemRenderer</javadoc>,
    <javadoc type="interface">org.zkoss.zul.RowRenderer</javadoc>
2.  . Render HTML snippets:
    <javadoc type="interface">org.zkoss.zul.ItemRenderer</javadoc>.

The implementation of a renderer depends on the component. For example,
the display of <javadoc>org.zkoss.zul.Listbox</javadoc> can be
customized by an implementation of
<javadoc type="interface">org.zkoss.zul.ListitemRenderer</javadoc>, and
<javadoc>org.zkoss.zul.Grid</javadoc> by
<javadoc type="interface">org.zkoss.zul.RowRenderer</javadoc>.

If you prefer to define the rendering of each item in the ZUML document,
you can use
[templates](ZK_Developer's_Reference/MVC/View/Template)
instead.
