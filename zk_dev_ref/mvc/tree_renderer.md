When a tree ([org.zkoss.zul.Tree](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tree.html)) is assigned with a
model, a default renderer is assigned too. The default renderer will
assume that each tree item has only one column, and it converts the data
into a string directly. If you want to display multiple columns or
retrieve a particular field of the data, you have to implement
[org.zkoss.zul.TreeitemRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/TreeitemRenderer.html) to
handle the rendering.

The hierarchical structure is:

`Treeitem` > `Treerow` > `Treecell`

ZK passes a `Treeitem`, you need to create `Treerow` and `Treecell` upon your data and requirements.

For example:

```java
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

* For the concept about component, model and renderer, please refer
    to [the Model-driven Display section]({{site.baseurl}}/zk_dev_ref/mvc/list_model#Model-driven_Display).
* If the tree is assigned a template called `model`, then the
    template will be used to render the tree. For more information,
    please refer to [the Tree Template section]({{site.baseurl}}/zk_dev_ref/mvc/template/tree_template).
