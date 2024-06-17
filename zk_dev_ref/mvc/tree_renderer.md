When a tree (<javadoc>org.zkoss.zul.Tree</javadoc>) is assigned with a
model, a default renderer is assigned too[^1]. The default renderer will
assume that each tree item has only one column, and it converts the data
into a string directly[^2]. If you want to display multiple columns or
retrieve a particular field of the data, you have to implement
<javadoc type="interface">org.zkoss.zul.TreeitemRenderer</javadoc> to
handle the rendering.

For example,

``` java
public class HostTreeRenderer implements TreeitemRenderer {
    public void render(Treeitem treeitem, Object data, int index) throws Exception {
        Treerow row = treeitem.getTreerow();
        if (row == null) { // tree row not create yet.
            row = new Treerow();
            treeitem.appendChild(row);
        }
        if (data instanceof HostTreeModel.FakeGroup) {
            treeitem.getTreerow().appendChild(new Treecell(((HostTreeModel.FakeGroup)data).getName()));
        } else if (data instanceof HostTreeModel.FakeHost) {
            treeitem.getTreerow().appendChild(new Treecell(((HostTreeModel.FakeHost)data).getName()));
        } else if (data instanceof HostTreeModel.FakeProcess) {
            treeitem.getTreerow().appendChild(new Treecell(((HostTreeModel.FakeProcess)data).getName()));
        }
    }
}
```

> ------------------------------------------------------------------------
>
> <references/>

# Version History

| Version | Date          | Content                            |
|---------|---------------|------------------------------------|
| 6.0.0   | February 2012 | The index argument was introduced. |

[^1]: For the concept about component, model and renderer, please refer
    to [the Model-driven Display
    section](ZK_Developer's_Reference/MVC/Model/List_Model#Model-driven_Display).

[^2]: If the tree is assigned a template called `model`, then the
    template will be used to render the tree. For more information,
    please refer to [the Tree Template
    section](ZK_Developer's_Reference/MVC/View/Template/Tree_Template).
