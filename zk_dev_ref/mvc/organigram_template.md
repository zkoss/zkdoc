Similar to
[Listbox](ZK_Developer's_Reference/MVC/View/Template/Listbox_Template),
you can also define a customer rendering with a template for an
organigram:

``` xml
    <zscript><![CDATA[
    DefaultTreeNode root = new DefaultTreeNode(null, new DefaultTreeNode[]{
        new DefaultTreeNode("Item1", new DefaultTreeNode[]{
            new DefaultTreeNode("Item2"), new DefaultTreeNode("Item3"), new DefaultTreeNode("Item4")
        })
    });
    DefaultTreeModel model = new DefaultTreeModel(root);
    model.addOpenPath(new int[]{0});
    ]]></zscript>
    <organigram model="${model}">
        <template name="model">
            <orgitem>
                <orgnode label="${each.data}"/>
            </orgitem>
        </template>
    </organigram>
```
