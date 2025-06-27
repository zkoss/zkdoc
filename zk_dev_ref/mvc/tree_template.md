Similar to
[Listbox]({{site.baseurl}}/zk_dev_ref/mvc/view/template/listbox_template),
you can also define a customer rendering with a template for a tree:

```xml
<tree model="${files}">
    <treecols>
        <treecol label="Path"/>
        <treecol label="Description"/>
    </treecols>
    <template name="model">
        <treeitem context="menupopup">
            <treerow>
                <treecell label="${each.data.path}"/>
                <treecell label="${each.data.description}"/>
            </treerow>
        </treeitem>
    </template>
</tree>
```

assume `files` is an instance of
[org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html). Notice since
[org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html) is used, `each`
references an instance of
[org.zkoss.zul.DefaultTreeNode](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeNode.html). Thus, to retrieve the
real data, use
[org.zkoss.zul.DefaultTreeNode#getData()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeNode.html#getData())

# Version History

| Version | Date      | Content                              |
|---------|-----------|--------------------------------------|
| 6.0.0   | July 2011 | The template feature was introduced. |
