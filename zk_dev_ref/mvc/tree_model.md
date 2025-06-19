

Here we describe how to implement a tree model
(<javadoc type="interface">org.zkoss.zul.TreeModel</javadoc>). You shall
understand the interaction among a component, a model, and a renderer,
please refer to [the Model-driven Display section]({{site.baseurl}}/zk_dev_ref/mvc/model/list_model#Model-driven_Display).

# Choose a Proper Model Class

A <javadoc type="interface">org.zkoss.zul.TreeModel</javadoc> is the
data model of a tree-like component, such as
[org.zkoss.zul.Tree](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tree.html).

If the tree data is small enough to be loaded completely into a
TreeModel, you can use [org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html)
which accepts [org.zkoss.zul.DefaultTreeNode](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeNode.html) to
construct a tree[^1].

In a more complicated case, if you want to implement custom logic like
load-on-demand and caching. Maybe the data is too large to load them all
into a TreeModel at once. Then, we suggest you to extend
[org.zkoss.zul.AbstractTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractTreeModel.html), which will handle
the data listeners transparently.

> ------------------------------------------------------------------------
>
> <references/>

# Example: In-Memory Tree with DefaultTreeModel

If you prefer to use
<javadoc type="interface">org.zkoss.zul.TreeNode</javadoc> to construct
the tree dynamically, you can use
[org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html) and
[org.zkoss.zul.DefaultTreeNode](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeNode.html). The usage is
straightforward, but it means that the whole tree must be constructed
before it is displayed.

For example, suppose we want to show a tree of file information, and the
file information is stored as `FileInfo`:

```java
public class FileInfo {
    public final String path;
    public final String description;
    public FileInfo(String path, String description) {
           this.path = path;
           this.description = description;
    }
}
```

Then, we can create a tree of file information with
[org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html) as follows:

```java
TreeModel model = new DefaultTreeModel(
  new DefaultTreeNode(null,
    new DefaultTreeNode[] {
      new DefaultTreeNode(new FileInfo("/doc", "Release and License Notes")),
      new DefaultTreeNode(new FileInfo("/dist", "Distribution"),
        new DefaultTreeNode[] {
          new DefaultTreeNode(new FileInfo("/lib", "ZK Libraries"),
            new DefaultTreeNode[] {
              new DefaultTreeNode(new FileInfo("zcommon.jar", "ZK Common Library")),
              new DefaultTreeNode(new FileInfo("zk.jar", "ZK Core Library"))
            }),
          new DefaultTreeNode(new FileInfo("/src", "Source Code")),
          new DefaultTreeNode(new FileInfo("/xsd", "XSD Files"))
        })
      }
  ));
```

Here, we render `FileInfo` in a custom renderer:

```java
import org.zkoss.zul.*;
public class FileInfoRenderer implements TreeitemRenderer<DefaultTreeNode<FileInfo>> {
    public void render(Treeitem item, DefaultTreeNode<FileInfo> data, int index) throws Exception {
        FileInfo fi = data.getData();
        Treerow tr = new Treerow();
        item.appendChild(tr);
        tr.appendChild(new Treecell(fi.path));
        tr.appendChild(new Treecell(fi.description));
    }
}
```

Next, bind them together in a composer:

```java
public class FileInfoTreeController extends SelectorComposer {
    @Wire
    private Tree tree;

    @Override
    public void doAfterCompose(Div div) throws Exception{
        super.doAfterCompose(div);
        tree.setModel(new DefaultTreeModel(..../*as shown above*/));
        tree.setItemRenderer(new FileInfoRenderer());
    }
}
```

Then, we can put them together in a ZUML document:

```xml
<div apply="org.zkoss.reference.developer.mvc.model.FileInfoTreeController">
    <tree id="tree">
        <treecols>
            <treecol label="Path"/>
            <treecol label="Description"/>
        </treecols>
    </tree>
</div>
```

Then, the result:

![]({{site.baseurl}}/zk_dev_ref/images/drtreemodel2.png)

Notice that you can manipulate the tree dynamically (such as adding a
node with
<javadoc method="add(org.zkoss.zul.TreeNode)">org.zkoss.zul.DefaultTreeNode</javadoc>).
The tree shown at the browser will be modified accordingly.

# Example: Create/Update/Delete operation with DefaultTreeNode

The benefit of using `DefaultTreeNode` is it will notify Tree (or the
component associated with a TreeModel) about the node change including
adding, deleting, and updating. (The underlying implementation is
`DefaultTreeNode` will fire an event when you call its add(), insert(),
setData(), removeFromParent()).

To demonstrate the example, first we add create, update and delete
buttons in a .zul:

```xml
<tree id="tree">
...
</tree>
<grid>
    <auxhead>
        <auxheader colspan="2" label="Add/Edit FileInfo" />
    </auxhead>
    <columns visible="false">
        <column />
        <column />
    </columns>
    <rows>
        <row>
            <cell><textbox id="pathTbx" /></cell>
            <cell><textbox id="descriptionTbx" width="300px"/></cell>
        </row>
        <row>
            <cell colspan="2" align="center">
                index: <intbox id="index" />
                <button id="create" label="Add to selected parent node" />
                <button id="update" label="update" />
                <button id="delete" label="delete" />
            </cell>
        </row>
    </rows>
</grid>
```

The intbox here is for specifying index to insert before the selected
tree item.

## Add/Insert

[org.zkoss.zul.DefaultTreeNode](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeNode.html) provides
<javadoc method="add(org.zkoss.zul.TreeNode)">org.zkoss.zul.DefaultTreeNode</javadoc>
and
<javadoc method="insert(org.zkoss.zul.TreeNode, int)">org.zkoss.zul.DefaultTreeNode</javadoc>
that can manipulate the tree dynamically.

Here we register onClick event to create Button in
`foo.FileInfoTreeController`:

```java
//wire components as member fields
private Textbox pathTbx;
private Textbox descriptionTbx;
private Intbox index;
//register onClick event for creating new object into tree model
public void onClick$create() {
    String path = pathTbx.getValue();
    String description = descriptionTbx.getValue();
    if ("".equals(path)) {
        alert("no new content to add");
    } else {
        Treeitem selectedTreeItem = tree.getSelectedItem();
        DefaultTreeNode newNode = new DefaultTreeNode(new FileInfo(path, description));
        DefaultTreeNode selectedTreeNode = null;
        Integer i = index.getValue();
        // if no treeitem is selected, append child to root
        if (selectedTreeItem == null) {
            selectedTreeNode = (DefaultTreeNode) ((DefaultTreeModel) tree.getModel()).getRoot();
            if (i == null) // if no index specified, append to last.
                selectedTreeNode.add(newNode);
            else // if index specified, insert before the index number.
                selectedTreeNode.insert(newNode, i);
        } else {
            selectedTreeNode = (DefaultTreeNode) selectedTreeItem.getValue();

            if (selectedTreeNode.isLeaf())
                selectedTreeNode = selectedTreeNode.getParent();

            if (i == null)
                selectedTreeNode.add(newNode);
            else
                selectedTreeNode.insert(newNode, i);
        }
    }
}
```

If index is not specified, we add a new node using
<javadoc method="add(org.zkoss.zul.TreeNode)">org.zkoss.zul.DefaultTreeNode</javadoc>
at the bottom of the parent node by default, or we can also use
<javadoc method="insert(org.zkoss.zul.TreeNode, int)">org.zkoss.zul.DefaultTreeNode</javadoc>
to insert a new node before the specified index.

## Update/Delete

[org.zkoss.zul.DefaultTreeNode](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeNode.html) provides
<javadoc method="setData(java.lang.Object)">org.zkoss.zul.DefaultTreeNode</javadoc>
which can update selected tree items and
<javadoc method="removeFromParent()">org.zkoss.zul.DefaultTreeNode</javadoc>
that can delete the selected tree item from its parent node.

Here we register onClick event to update and delete Button in
`foo.FileInfoTreeController`:

```java
//register onClick event for updating edited data in tree model
public void onClick$update() {
    Treeitem selectedTreeItem = treeGrid.getSelectedItem();
    if(selectedTreeItem == null) {
        alert("select one item to update");
    } else {
        DefaultTreeNode selectedTreeNode = (DefaultTreeNode) selectedTreeItem.getValue();
        //get current FileInfo from selected tree node
        FileInfo fileInfo = (FileInfo) selectedTreeNode.getData();
        //set new value of current FileInfo
        fileInfo.setPath(pathTbx.getValue());
        fileInfo.setDescription(descriptionTbx.getValue());
        //set current FileInfo in the selected tree node
        selectedTreeNode.setData(fileInfo);
    }
}

//register onClick event for removing data in tree model
public void onClick$delete() {
    final Treeitem selectedTreeItem = treeGrid.getSelectedItem();
    if(selectedTreeItem == null) {
        alert("select one item to delete");
    } else {
        DefaultTreeNode selectedTreeNode = (DefaultTreeNode) selectedTreeItem.getValue();
        selectedTreeNode.removeFromParent();
    }
}
```

For updating tree node data, we have to modify `render()` of
`foo.FileInfoRenderer`:

```java
public void render(Treeitem item, DefaultTreeNode<FileInfo> data, int index) throws Exception {
    FileInfo fi = data.getData();
    if (tr == null) {
        tr = new Treerow();
    }else{
        tr.getChildren().clear();
    }    
    item.appendChild(tr);
    tr.appendChild(new Treecell(fi.path));
    tr.appendChild(new Treecell(fi.description));
}
```

# Example: Load-on-Demand Tree with AbstractTreeModel

Implementing all
<javadoc type="interface">org.zkoss.zul.TreeModel</javadoc> directly
provides the maximal flexibility, such as load-on-demand and caching.
For example, you don't have to load a node until
<javadoc method="getChild(java.lang.Object, int)" type="interface">org.zkoss.zul.TreeModel</javadoc>
is called. In addition, you could load and cache all children of a given
node when
<javadoc method="getChild(java.lang.Object, int)" type="interface">org.zkoss.zul.TreeModel</javadoc>
is called the first time against a particular node, and then return a
child directly if it is in the cache.

For example (pseudo code):

```java
public class MyModel extends AbstractTreeModel<Object> {
    public Object getChild(Object parent, int index) {
        Object[] children = _cache.get(parent); //assume you have a cache for children of a given node
        if (children == null)
            children = _cache.loadChildren(parent); //ask cache to load all children of a given node
        return children[index];
    }
...
```

By extending from [org.zkoss.zul.AbstractTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractTreeModel.html),
you have to implement three methods:
<javadoc method="getChild(java.lang.Object, int)" type="interface">org.zkoss.zul.TreeModel</javadoc>,
<javadoc method="getChildCount(java.lang.Object)" type="interface">org.zkoss.zul.TreeModel</javadoc>,
and
<javadoc method="isLeaf(java.lang.Object)" type="interface">org.zkoss.zul.TreeModel</javadoc>.
Optionally, you could implement
<javadoc method="getIndexOfChild(java.lang.Object, java.langObject)" type="interface">org.zkoss.zul.TreeModel</javadoc>[^2],
if you have a better algorithm than iterating through all children of a
given parent.

## Improving Performance

You **should** override
<javadoc method="getPath(E)" type="interface">org.zkoss.zul.TreeModel</javadoc>
to implement an efficient way to deduce the sibling index of each
ancestor of a node. Because the default implementation of `getPath()` in
`AbstractTreeModel` will traverse from the root node to compute the
index which is inefficient with lots of nodes. Such node traversing will
call `getChild()` and load unnecessary nodes from the data source which
consume more memory.

## An Example

Here is a simple example, which generates a 4-level tree and each branch
has 5 children:

```java
package foo;
public class LoadOnDemandModel extends AbstractTreeModel<Object> {
    public LoadOnDemandModel() {
        super("Root");
    }
    public boolean isLeaf(Object node) {
        return getLevel((String)node) >= 4; //at most 4 levels
    }
    public Object getChild(Object parent, int index) {
        return parent + "." + index;
    }
    public int getChildCount(Object parent) {
        return isLeaf(parent) ? 0: 5; //each node has 5 children
    }
    public int getIndexOfChild(Object parent, Object child) {
        String data = (String)child;
        int i = data.lastIndexOf('.');
        return Integer.parseInt(data.substring(i + 1));
    }
    private int getLevel(String data) {
        for (int i = -1, level = 0;; ++level)
            if ((i = data.indexOf('.', i + 1)) < 0)
                return level;
    }
};
```

Then, we assign this model to a tree:

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" ?>
<tree model="${c:new('org.zkoss.reference.developer.mvc.model.LoadOnDemandModel')}">
    <treecols>
        <treecol label="Names"/>
    </treecols>
</tree>
```

And, the result looks like this:

![]({{site.baseurl}}/zk_dev_ref/images/drtreemodel1.png)

# Sorting

`Interface: `<javadoc type="interface">`org.zkoss.zul.ext.Sortable`</javadoc>  
`Implementation: You have to implement it explicitly`

To support the sorting, the model must implement
<javadoc type="interface">org.zkoss.zul.ext.Sortable</javadoc> too.
Thus, when the end user clicks the header to request the sorting,
<javadoc method="sort(java.util.Comparator, boolean)" type="interface">org.zkoss.zul.ext.Sortable</javadoc>
will be called.

For example, (pseudo code)

```java
public class FooModel extends AbstractTreeModel implements Sortable {
    public void sort(Comparator cmpr, final boolean ascending) {
        sortData(cmpr); //sort your data here
        fireEvent(ListDataEvent.CONTENTS_CHANGED, -1, -1); //ask component to reload all
    }
...
```

Notice that the `ascending` parameter is used only for reference and you
usually don't need it, since the `cmpr` is already a comparator capable
to sort in the order specified in the `ascending` parameter.

# Selection

`Interface: `<javadoc type="interface">`org.zkoss.zul.ext.TreeSelectableModel`</javadoc>  
`Implementation: Implemented by `[`org.zkoss.zul.AbstractTreeModel`](https://www.zkoss.org/javadoc/latest/zk/`org/zkoss/zul/AbstractTreeModel`.html)

If your data model also provides the collection of selected elements,
you shall also implement
<javadoc type="interface">org.zkoss.zul.ext.TreeSelectableModel</javadoc>.
When using with a component supporting the selection (such as
[org.zkoss.zul.Tree](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tree.html)), the component will invoke
<javadoc method="isPathSelected(int[])" type="interface">org.zkoss.zul.ext.TreeSelectableModel</javadoc>
to display the selected elements correctly. In addition, if the end user
selects or deselects an item,
<javadoc method="addSelectionPath(int[])" type="interface">org.zkoss.zul.ext.TreeSelectableModel</javadoc>
and
<javadoc method="removeSelectionPath(int[])" type="interface">org.zkoss.zul.ext.TreeSelectableModel</javadoc>
will be called by the component to notify the model that the selection
is changed. Then, you can update the selection into the persistent layer
(such as database) if necessary.

On the other hand, when the model detects the selection is changed (such
as
<javadoc method="addSelectionPath(int[])" type="interface">org.zkoss.zul.ext.TreeSelectableModel</javadoc>
is called), it has to fire the event, such as
<javadoc method="SELECTION_CHANGED">org.zkoss.zul.event.TreeDataEvent
</javadoc> to notify the component. It will cause the component to
correct the selection[^3].

All default implementations, including
[org.zkoss.zul.AbstractTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractTreeModel.html) and
[org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html) implement
[org.zkoss.zul.ext.TreeSelectableModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/TreeSelectableModel.html). Thus, your
implementation generally doesn't have to implement it explicitly.

It is important to note that, once a tree is assigned with a tree model,
the application shall not manipulate the tree items and/or change the
selection of the tree directly. Rather, the application shall access
only the list model to add, remove and select data elements. Let the
model notify the component what has been changed.

> ------------------------------------------------------------------------
>
> <references/>

## Selection Control

With the multiple selection function in a data model, you have to
implement a class for the
<javadoc type="interface">org.zkoss.zul.ext.SelectionControl</javadoc>
to tell the data model which items are selectable and what it will
perform a "select all" function with. The following implementation which
extends
<javadoc type="class">org.zkoss.zul.AbstractTreeModel.DefaultSelectionControl</javadoc>
is a simple example to change "selectable" items.

Please note that if your data model is much larger, you may implement on
it your own to get rid of the performance impact.

```java
model.setSelectionControl(new AbstractTreeModel.DefaultSelectionControl(model) {
    public boolean isSelectable(Object e) {
        int i = model.indexOf(e);
        return i % 2 == 0;
    }
});
```

# Open Tree Nodes

`Interface: `<javadoc type="interface">`org.zkoss.zul.ext.TreeOpenableModel`</javadoc>  
`Implementation: Implemented by `[`org.zkoss.zul.AbstractTreeModel`](https://www.zkoss.org/javadoc/latest/zk/`org/zkoss/zul/AbstractTreeModel`.html)

By default, all tree nodes are closed. To control whether to open a tree
node, you could implement
<javadoc type="interface">org.zkoss.zul.ext.TreeOpenableModel</javadoc>.
More importantly, to open a tree node, the application shall access the
model's
<javadoc type="interface">org.zkoss.zul.ext.TreeOpenableModel</javadoc>
API, rather than accessing [org.zkoss.zul.Treeitem](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Treeitem.html)
directly.

All default implementations, including
[org.zkoss.zul.AbstractTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractTreeModel.html) and
[org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html) implement
[org.zkoss.zul.ext.TreeOpenableModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/TreeOpenableModel.html). Thus, your
implementation generally doesn't have to implement it explicitly.

**Note:** If your tree model contains a lot of nodes, please also
implement
<javadoc method="getPath(E)" type="interface">org.zkoss.zul.TreeModel</javadoc>
to get better performance, by default it is implemented by [Depth-first search](http://en.wikipedia.org/wiki/Depth-first_search) to get the path
from a tree node.

# Leaf Node

The [org.zkoss.zul.DefaultTreeNode](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeNode.html) has 2 constructors:

- `DefaultTreeNode(data)`: create a [leaf node](https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminology)which
  cannot have children added to it.
- `DefaultTreeNode(data, children)`: create a [branch node](https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminology)
  which can have children added to it.

ZK renders a rotating triangle to expand/collapse a node in front of a
branch node, but a leaf node doesn't have that triangle.

![]({{site.baseurl}}/zk_dev_ref/images/leafbranch.jpg)

If you want to display a leaf node, you should use
`DefaultTreeNode(data)`, otherwise even if you provide a zero-size list
for `DefaultTreeNode(data, children)` constructor, ZK tree will still
render the node as a branch node that contains no children. So when you
expand the node, it shows nothing. It might confuse users.

[org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html)'s constructor accepts
the 2nd boolean argument to determine whether to render a branch node
without children as a leaf node.

```java
DefaultTreeModel model2 = new DefaultTreeModel(root, true);
```

# Version History

| Version                | Date          | Content                                                                                                                                                                                                                                                                                                               |
|------------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.6                  | January 2011  | <javadoc type="interface">org.zkoss.zul.TreeNode</javadoc>, [org.zkoss.zul.DefaultTreeNode](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeNode.html) and [org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html) were intrdocued.                                                                                                                                   |
| 6.0.0                  | February 2012 | <javadoc type="interface">org.zkoss.zul.ext.TreeSelectableModel</javadoc> and <javadoc type="interface">org.zkoss.zul.ext.TreeOpenableModel</javadoc> were introduced to replace <javadoc type="interface">org.zkoss.zul.ext.Selectable</javadoc> and <javadoc type="interface">org.zkoss.zul.ext.Openable</javadoc>. |
| 5.0.12 / 6.0.3 / 6.5.1 | October 2012  | [org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html) adds a new constructor for configuring whether to treat the zero size of children node as a leaf node.                                                                                                                                                              |

[^1]: [org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html) is available
    since 5.0.6. For 5.0.5 or prior, please use
    [org.zkoss.zul.SimpleModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleModel.html), which is similar
    except it assumes the tree structure is immutable

[^2]: <javadoc method="getIndexOfChild(java.lang.Object, java.langObject)" type="interface">org.zkoss.zul.TreeModel</javadoc>
    is available in 5.0.6 and later.

[^3]: Don't worry. The component is smart enough to prevent the dead
    loop, even though the component invokes `addSelectionPath()` to
    notify the model while the model fires the event to notify the
    component.
