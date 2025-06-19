

# Tree

- Demonstration: [Tree](http://www.zkoss.org/zkdemo/tree)
- Java API: [org.zkoss.zul.Tree](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tree.html)
- JavaScript API: <javadoc directory="jsdoc">zul.sel.Tree </javadoc>


# Employment/Purpose

A tree consists of three parts, the set of columns, the set of footers,
and the tree body. The set of columns is defined by a number of treecol
components, one for each column. Each column will appear as a header at
the top of the tree. The second part, The set of footers is defined by a
number of treefooter components, one for each column also. Each column
will appear as a footer at the bottom of the tree. The third part, the
tree body, contains the data to appear in the tree and is created with a
treechildren component.

Although treecols is optional, if it exists, notice that the number of
its child (treecol) should equal the number of treecell, so that tree
can display its content correctly. If treecols contains no treecol, the
tree will display nothing in its content.

# Example

## 2-Column Tree

![](/zk_component_ref/images/ZKComRef_Tree_Example.png)

```xml
<window title="tree demo" border="normal" width="400px" >
    <tree id="tree" rows="5">
        <treecols sizable="true">
            <treecol label="Name" />
            <treecol label="Description" />
        </treecols>
        <treechildren>
            <treeitem>
                <treerow>
                    <treecell label="Item 1" />
                    <treecell label="Item 1 description" />
                </treerow>
            </treeitem>
            <treeitem>
                <treerow>
                    <treecell label="Item 2" />
                    <treecell label="Item 2 description" />
                </treerow>
                <treechildren>
                    <treeitem>
                        <treerow>
                            <treecell label="Item 2.1" />
                        </treerow>
                    </treeitem>
                    <treeitem>
                        <treerow>
                            <treecell label="Item 2.2" />
                            <treecell
                                label="Item 2.2 is something who cares" />
                        </treerow>
                    </treeitem>
                </treechildren>
            </treeitem>
            <treeitem label="Item 3" />
        </treechildren>
        <treefoot>
            <treefooter label="Count" />
            <treefooter label="Summary" />
        </treefoot>
    </tree>
</window>
```

## Default Selection

![](/zk_component_ref/images/tree_onAfterRender.png)

```xml
    <zscript><![CDATA[
    DefaultTreeModel stm = new DefaultTreeModel(new DefaultTreeNode("ROOT",
        Arrays.asList(new DefaultTreeNode[]{
                new DefaultTreeNode("David",new ArrayList()),
                new DefaultTreeNode("Thomas",new ArrayList()),
                new DefaultTreeNode("Steven",new ArrayList())})));
    ]]></zscript>
    
    <tree width="300px" model="${stm}" onAfterRender="self.setSelectedItem(self.getTreechildren().getLastChild())"/>
```

# Change Style

To change the style of tree icon, you may call setZclass(String style).
Four built in style includes
"z-tree","z-dottree","z-filetree","z-vfiletree"

{% include DeprecatedSince.md version=7.0.0 %}

Since ZK 7.0.0, the dottree, filetree and vfiletree styles are
deprecated because designs are changed.

# Keyboard Navigation Tree

- Press `UP` and `DOWN` to move the selection up and down by one tree
  item.
- Press `PgUp` and `PgDn` to move the selection up and down by one page.
- Press `HOME` to move the selection to the first item, and `END` to the
  last item.
- Press `RIGHT` to open a tree item, and `LEFT` to close a tree item.
- Press `Ctrl+UP` and `Ctrl+DOWN` to move the focus up and down by one
  tree item without changing the selection.
- Press `SPACE` to select the item in focus.

# Paging

## Autopaging

When using the paging mold and vflex, you could also turn on autopaging
(<javadoc method="setAutopaging( boolean)">org.zkoss.zul.Tree</javadoc>)
such that the page size will be adjusted automatically based on the
available space. {% include version-badge.html version=5.0.2 %}

**Note:** If enable the autopaging, the height of each row will be
applied the following CSS by default. If you want to change the height,
please overwrite the CSS rule as your preference.

```css
.z-tree-autopaging .z-treecell-cnt,
.z-dottree-autopaging .z-treecell-cnt,
.z-filetree-autopaging .z-treecell-cnt,
.z-vfiletree-autopaging .z-treecell-cnt {
    height: 30px;
    overflow: hidden;
}
```

{% include version-badge.html version=5.0.8 %}

**Note:** In ZK 7, we change the naming *.z-treecell-cnt* to
*.z-treecell-content*. {% include version-badge.html version=7.0.3 %}

## PagingDisabled

{% include version-badge.html version=8.0.3 %} Once the `pagingDisabled` is set to
`true`, users will be blocked from navigating through the pagination.

## The onPaging and onPageSize Event

When a user clicks to scroll up and down the page, the `onPaging` event
is sent along with a `org.zkoss.zul.event.PagingEvent` instance.
Similarly, the `onPageSize` event is sent along with an
`org.zkoss.zul.event.PageSize` instance.

# Frozen Component

In ZK 7 you are now able to freeze columns within a Tree. This mirrors
functionality seen within Excel and makes data in these components
easier to read, interpret and handle.

The following code demonstrates how to freeze a column within a Tree:

```xml
<tree id="tree" rows="5" width="600px">
    <frozen columns="2" start="1" />
    <treecols sizable="true">
        <treecol width="100px">ID</treecol>
        <treecol width="50px">Priority</treecol>
        <treecol width="50px">Status</treecol>
        <treecol width="150px">Summary</treecol>
        <treecol width="250px">Detail</treecol>
    </treecols>
    <treechildren>
        <treeitem>
            <treerow>
                <treecell>0001</treecell>
                <treecell>1</treecell>
                <treecell>closed</treecell>
                <treecell>Fix login issue</treecell>
                <treecell>Login does not work at all</treecell>
            </treerow>
        </treeitem>
        <treeitem>
            <treerow>
                <treecell>0002</treecell>
                <treecell>3</treecell>
                <treecell>open</treecell>
                <treecell>Button style broken</treecell>
                <treecell>Check main.css</treecell>
            </treerow>
            <treechildren>
                <treeitem>
                    <treerow>
                        <treecell>00021</treecell>
                        <treecell>1</treecell>
                        <treecell>closed</treecell>
                        <treecell>Fix logout issue</treecell>
                        <treecell>Logout does not work at all</treecell>
                    </treerow>
                </treeitem>
            </treechildren>
        </treeitem>
        <treeitem>
            <treerow>
                <treecell>0003</treecell>
                <treecell>2</treecell>
                <treecell>open</treecell>
                <treecell>Client search result</treecell>
                <treecell>Search service returns incomplete result</treecell>
            </treerow>
        </treeitem>
    </treechildren>
</tree>
```

{% include version-badge.html version=7.0.0 %}

- For further details, please refer to [ Frozen component]({{site.baseurl}}/zk_component_ref/frozen)
  directly.

# Selection

## Nonselectable Tags

{% include version-badge.html version=5.0.5 %}

By default, when a user clicks on an HTML element like <code><button>,
<input>,

<textarea>

</code>, or <a> tag, the selection state of the item won't be changed.
For example, when a user clicks the textbox in the following example,
the selection state of the item won't be changed (only the textbox gains
the focus).

```xml
<treeitem>
  <treerow>
    <treecell><textbox/></treecell>
```

Sometimes it is not intuitive, such as using with inplace editing
(<javadoc method="isInplace()">org.zkoss.zul.impl.InputElement</javadoc>).
If you want to have more control of whether to select an item, you could
specify a list of tags in the nonselectableTags property
(<javadoc method="setNonselectableTags(java.lang.String)">org.zkoss.zul.Tree</javadoc>).
For example, if you want to select the item, no matter what tag the user
clicks, you could specify an empty string as follows.

```xml
<tree nonselectableTags="">
  <treechildren>
    <treeitem>
      <treerow>
        <treecell><textbox/></treecell>
```

{% include version-badge.html version=5.0.6 %} If you want to toggle the selection
only when the user clicks on the checkmark, you could specify `*`.
Notice that you have to specify checkmark="true" as well (otherwise, no
item is selectable).

```xml
<tree checkmark="true" nonselectableTags="*">
```

## Multiple Selection

When the user clicks on a tree item, the whole item is selected and the
`onSelect` event is sent back to the server to notify the application.
You can control whether a tree control allows multiple selections by
setting the `multiple` attribute to true. The default value is false.

**Note:** If you use a model, the multiple attribute should be set to
the model instead of the tree itself.

## The Checkmark Property

![](/zk_component_ref/images/ZKComRef_Tree_checkmark.png)

The `checkmark` attribute controls whether to display a checkbox or a
radio button in front of each tree item. If the `multiple` attribute is
set to true and the `checkmark` is set to true then a checkbox will be
displayed in front of every item. However, if `multiple` is set to false
then a radio button will be displayed instead.

## Deselect Others when Clicking an Item with Checkmark

If a tree's checkmark
(<javadoc method="isCheckmark()">org.zkoss.zul.Tree</javadoc>) is
enabled, the selection will be toggled when an user clicks an item. In
other words, all other items will remain the same.

If you prefer to deselect all other items and select the item being
clicked (which the behavior of ZK 5.0.4 and earlier), you could specify
true to this library property called
`org.zkoss.zul.tree.checkmarkDeselectOthers` in `WEB-INF/zk.xml`:

```xml
<library-property>
    <name>org.zkoss.zul.tree.checkmarkDeselectOthers</name>
    <value>true</value>
</library-property>
```

## Toggle Selection when Right Clicking an Item with Checkmark

If a tree's checkmark
(<javadoc method="isCheckmark()">org.zkoss.zul.Tree</javadoc>) is
enabled, the selection will be toggled when user right click on item.

If you prefer not to select/deselect item on right click, you could
specify false to this library property called
`org.zkoss.zul.tree.rightSelect` in `WEB-INF/zk.xml`:

```xml
<library-property>
    <name>org.zkoss.zul.tree.rightSelect</name>
    <value>false</value>
</library-property>
```

{% include version-badge.html version=5.0.5 %}

## Tristate Selection

{% include version-badge.html version=10.0.0 %}

Allowing users to enable tristate selection with Model. In tristate
mode, when users click on the checkbox, depending on whether the current
checkbox is checked or unchecked, it will perform 2 actions:

1\. Update all the descendants checkboxes to the selection state of the
current checkbox **(UNSELECTED or SELECTED)**.

2\. Update all the ancestors checkboxes into tristate selection
**(UNSELECTED, SELECTED or PARTIAL)**.

### How to enable

1\. Build tree using a model that is an instance of **TristateModel**.

2\. Set attribute **multiple = true**, if you don't set it to multiple,
will throw a IllegalArgumentException.

### DefaultTristateTreeModel

{% include edition-availability.html edition="pe" %} If you don't want to implement yourself, there's a
default tristate tree model is provided in ZK EE, let's take a look at a
simple demonstration.

```java
DefaultTristateTreeModel model = new DefaultTristateTreeModel(
    new DefaultTreeNode(null,
        new DefaultTreeNode[] {
            new DefaultTreeNode("0",
                new DefaultTreeNode[] {
                    new DefaultTreeNode("1"),
                    new DefaultTreeNode("2")
                }
            ),
            new DefaultTreeNode("3"),
            new DefaultTreeNode("4",
                new DefaultTreeNode[] {
                    new DefaultTreeNode("5",
                        new DefaultTreeNode[] {
                            new DefaultTreeNode("6"),
                            new DefaultTreeNode("7"),
                            new DefaultTreeNode("8",
                                new DefaultTreeNode[] {
                                    new DefaultTreeNode("9"),
                                    new DefaultTreeNode("10"),
                                    new DefaultTreeNode("11"),
                                }
                            )
                        }
                    ),
                    new DefaultTreeNode("12"),
                    new DefaultTreeNode("13")
                }
            )
        }
    )
);
tree.setModel(model);
tree.setMultiple(true);
```


<video src="DefaultTristateTreeModel_demo.mov")

Treecols's header checkmark also support tristate
![](/zk_component_ref/images/DefaultTristateTreeModelwithTreecol.png)

# Properties

## Auxiliary Headers

Like grids, you can specify auxiliary headers with the `auxhead` and
`auxheader` components.

Please refer to the [ Grid]({{site.baseurl}}/zk_component_ref/data/grid#Auxiliary_Headers) for
more details.

## SizedByContent

By default, the widths of columns have to be specified explicitly, or
they will be split equally among columns regardless of what content they
might have. If you want to have the minimal width (that fit the
content), you could specify `hflex="min"` at the column (not the tree).

However, the tree has a special mode called sized-by-content
(<javadoc method="setSizedByContent(boolean)">org.zkoss.zul.Tree</javadoc>).
By specifying it to true, the column width will be adjusted
automatically. However, it is controlled by the browser, so you have no
100% control of it. For example, if a user resized a column, the final
width might not be exactly the same as what he resized.

In general, we suggest specifying hflex in columns, rather than
specifying `sizedByContent` at a tree for a much more predictable
result.

## Rows

The `rows` attribute is used to control how many rows are visible. By
setting it to zero, the tree control will resize itself to hold as many
as items as possible.

## Vflex

The `vflex` attribute controls whether to grow or shrink vertically to
fit their given space. It is so-called vertical flexibility. For
example, if the tree is too big to fit in the browser window, it will
shrink to make the whole tree visible in the browser window.

This property is ignored if the `rows` attribute is specified.

## Maxlength

The `maxlength` attribute defines the maximal allowed characters being
visible at the browser. By setting this property, you can make a
narrower tree control.

## Sizable

Like `columns`, you can set the `sizable` attribute of `treecols` to
`true` in order to allow users to resize the width of the tree headers.
Similarly, the `onColSize` event is sent when a user resizes the widths.

### Auto Fitting Columns

{% include version-badge.html version=5.0.0 %} When you want to resize a column of a
Tree or Listbox, all you now need to do is double click the column when
the mouse is over where the columns meet and the column will
automatically resize to fit its contents. To enable this functionality
Tree's treecols need the attribute sizable="true". In other words, all
sizable column provides the auto-fitting functionality.

## Scrollable Tree

A tree will be scrollable if you specify the rows attribute or the
height attribute and there is not enough space to display all the tree
items.

![](/zk_component_ref/images/scrollable_tree.png)

```xml
<tree rows="4">
    <treecols>
        <treecol label="Name"/>
        <treecol label="Description"/>
    </treecols>
    <treechildren>
        <treeitem>
            <treerow>
                <treecell label="Item 1"/>
                <treecell label="Item 1 description"/>
            </treerow>
        </treeitem>
        <treeitem>
            <treerow>
                <treecell label="Item 2"/>
                <treecell label="Item 2 description"/>
            </treerow>
            <treechildren>
                <treeitem>
                    <treerow>
                        <treecell label="Item 2.1"/>
                    </treerow>
                    <treechildren>
                        <treeitem>
                            <treerow>
                                <treecell label="Item 2.1.1"/>
                            </treerow>
                        </treeitem>
                        <treeitem>
                            <treerow>
                                <treecell label="Item 2.1.2"/>
                            </treerow>
                        </treeitem>
                    </treechildren>
                </treeitem>
                <treeitem>
                    <treerow>
                        <treecell label="Item 2.2"/>
                        <treecell label="Item 2.2 is something who cares"/>
                    </treerow>
                </treeitem>
            </treechildren>
        </treeitem>
        <treeitem label="Item 3"/>
    </treechildren>
</tree>
```

{% include version-badge.html version=7.0.0 %}

The browser's default scrollbar is replaced by floating scrollbar and it
is not visible unless user mouse over on the content. To turn off the
floating scrollbar and use original scrollbar, please add the following
configuration in zk.xml.

```xml
<library-property>
    <name>org.zkoss.zul.nativebar</name>
    <value>true</value>
</library-property>
```

**Note**: the value of org.zkoss.zul.nativebar is true by default (since
7.0.2)

## The Open Property and the onOpen Event

Each tree item contains the `open` property which is used to control
whether to display its child items if the Tree is not controlled by a
<javadoc type="interface">org.zkoss.zul.ext.TreeOpenableModel</javadoc>.
The default value is true. By setting this property to false, you are
able to control what part of the tree is invisible.

If the Tree is controlled by a
<javadoc type="interface">org.zkoss.zul.ext.TreeOpenableModel</javadoc>
such as [org.zkoss.zul.AbstractTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractTreeModel.html) or
<javadoc type="interface">org.zkoss.zul.DefaultTreeModel</javadoc>, the
model open state is authoritative and will override the individual
component's open state. please refer to [ the TreeModel documentation]({{site.baseurl}}/zk_dev_ref/mvc/model/tree_model#Open_Tree_Nodes)
on this topic.

```xml
<treeitem open="false">
```

When a user clicks on the +/- button, he opens the tree item and makes
its children visible. The `onOpen` event is then sent to the server to
notify the application.

For sophisticated applications, you can defer the creation of the
content of the tree item or manipulate its content dynamically until the
`onOpen` event is received. Refer to the **Load on Demand** section in
the **ZK User Interface Markup Language** chapter for details.

## Sticky Header

{% include version-badge.html version=9.6.0 %}

After adding a sclass "z-sticky-header", when we scroll down a page and
make a Tree's header out of visible range in a viewport, the Tree's
header becomes floating and sticky on the top of the page.

```xml
  <tree sclass="z-sticky-header">
    <!-- treecols, treeitem... -->
  </tree>
```

# Create-on-Open for Tree Controls

As illustrated below, you could listen to the `onOpen` event, and then
load the children of a tree item. You can do the same thing using group
boxes.

```xml
<zk>
    <tree width="200px">
        <treecols>
            <treecol label="Subject"/>
            <treecol label="From"/>
        </treecols>
        <treechildren>
            <treeitem open="false" onOpen="load()">
                <treerow>
                    <treecell label="Intel Snares XML"/>
                    <treecell label="David Needle"/>
                </treerow>
                <treechildren/>
            </treeitem>
        </treechildren>
        <zscript>
            void load() {
                Treechildren tc = self.getTreechildren();
                if (tc.getChildren().isEmpty()) {
                    Treeitem ti = new Treeitem();
                    ti.setLabel("New added");
                    ti.setParent(tc);
                }
            }
        </zscript>
    </tree>
</zk>
```

# Custom Attributes

## org.zkoss.zul.tree.rightSelect

`[default: true]`  
`[inherit: true]`[^1]

It specifies the selection should be toggled when user right clicks on
an item, if the checkmark is enabled
(<javadoc method="isCheckmark()">org.zkoss.zul.Tree</javadoc>). If it is
turned off, right clicking on an item will change its selection state.

> ------------------------------------------------------------------------
>
> <references/>

## org.zkoss.zul.tree.autoSort

`[default: false]`  
`[inherit: true]`[^2]

{% include version-badge.html version=5.0.7 %} It specifies whether to sort the model
when the following cases:

- <javadoc method="setModel (TreeModel)">org.zkoss.zul.Tree</javadoc>is
  called and
  <javadoc method="setSortDirection(String)">org.zkoss.zul.Treecol</javadoc>
  is set.
- <javadoc method="setSortDirection(String)">org.zkoss.zul.Treecol</javadoc>
  is called.
- Model receives [org.zkoss.zul.event.TreeDataEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/TreeDataEvent.html)
  and
  <javadoc method="setSortDirection(String)">org.zkoss.zul.Treecol</javadoc>
  is set.

If you want to ignore sort when receiving
[org.zkoss.zul.event.TreeDataEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/TreeDataEvent.html), you can specifies
the value as **ignore.change**.

## org.zkoss.zul.tree.autohidePaging

`[default: true]`  
`[inherit: true]`[^3]

{% include version-badge.html version=7.0.1 %}

It specifies whether to enable autohide property for internal paging
component.

> ------------------------------------------------------------------------
>
> <references/>

# Supported Events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p><code>onSelect</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html) Notifies one that
the user has selected a new item in the tree.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onFocus</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes when a component
gets the focus. Remember event listeners execute at the server, so the
focus at the client might be changed when the event listener for onFocus
got executed.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onBlur</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes when a component
loses the focus. Remember event listeners execute at the server, so the
focus at the client might be changed when the event listener for onBlur
got executed.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onAfterRender</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html)</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onPageSize</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zul.event.PageSizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/PageSizeEvent.html) Notifies the paging
size has been changed when the autopaging
(<javadoc method="setAutopaging(boolean)">org.zkoss.zul.Tree</javadoc>)
is enabled and user changed the size of the content.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Snapshot</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>default</p>
</center></td>
<td>![](/zk_component_ref/images/tree_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>paging</p>
</center></td>
<td>![](/zk_component_ref/images/tree_mold_paging.png)</td>
</tr>
</tbody>
</table>

# Supported Children

`*`[` Treecols`]({{site.baseurl}}/zk_component_ref/data/tree/treecols)`, `[` Treechildren`]({{site.baseurl}}/zk_component_ref/data/tree/treechildren)`, `[` Treefoot`]({{site.baseurl}}/zk_component_ref/data/tree/treefoot)

# Use Cases

| Version | Description                                          | Example Location                                                                                                             |
|---------|------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| 3.6     | Smalltalk: Building a Complex Tree with Grid-in-Grid | [Building a Complex Tree with Grid-in-Grid](https://www.zkoss.org/wiki/Small_Talks/2009/September/Building_a_Complex_Tree_with_Grid-in-Grid) |
| 3.6     | Expand all items of a Tree at start                  | [<http://www.zkoss.org/forum/listComment/9379>](http://www.zkoss.org/forum/listComment/9379)                                 |

# Browser Limitations

<table>
<thead>
<tr class="header">
<th><p>Browser</p></th>
<th><p>description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Chrome &amp; Safari</p></td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">zk</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">hbox</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">tree</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">treecols</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>                &lt;<span class="kw">treecol</span><span class="ot"> label=</span><span class="st">&quot;Name&quot;</span> /&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>                &lt;<span class="kw">treecol</span><span class="ot"> label=</span><span class="st">&quot;Description&quot;</span> /&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>            &lt;/<span class="kw">treecols</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">treechildren</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>                &lt;<span class="kw">treeitem</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>                    &lt;<span class="kw">treerow</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>                        &lt;<span class="kw">treecell</span><span class="ot"> label=</span><span class="st">&quot;Item 1&quot;</span> /&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>                        &lt;<span class="kw">treecell</span><span class="ot"> label=</span><span class="st">&quot;Item 1 description&quot;</span> /&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>                    &lt;/<span class="kw">treerow</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>                &lt;/<span class="kw">treeitem</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>            &lt;/<span class="kw">treechildren</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>        &lt;/<span class="kw">tree</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">hbox</span>&gt;</span>
<span id="cb1-18"><a href="#cb1-18" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">zk</span>&gt;</span></code></pre></div>
<p>The width of the tree will be zero with Chrome &amp; Safari. the
Webkit considers the width of tree as zero. please specify the width to
tree to work around.</p></td>
</tr>
</tbody>
</table>

# Version History



| Version | Date           | Content                                                                                                                                                                                         |
|---------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.2   | May 2010       | Support the autopaging                                                                                                                                                                          |
| 5.0.4   | July 2010      | Support onAfterRender event                                                                                                                                                                     |
| 5.0.5   | September 2010 | The nonselectabletag property was introduced to enhance the control of when to select an item                                                                                                   |
| 5.0.5   | September 2010 | When a tree's checkmar is enabled and an item is clicked, it will toggle the selection of the item and the other remains the same.                                                              |
| 5.0.5   | October 2010   | When a tree's checkmark is enabled and an item is right clicked, it will toggle the selection of the item.                                                                                      |
| 5.0.6   | February 2011  | Sorting was supported                                                                                                                                                                           |
| 5.0.6   | February 2011  | The nonselectableTags property supported "\*".                                                                                                                                                  |
| 5.0.7   | April 2011     | Tree shall sort model based on current state.                                                                                                                                                   |
| 5.0.7   | April 2011     | The onPageSize event was introduced.                                                                                                                                                            |
| 7.0.0   | December 2013  | Change Style and Scrollable Tree were updated.                                                                                                                                                  |
| 7.0.0   | December 2013  | Frozen Component was introduced.                                                                                                                                                                |
| 7.0.1   | January 2014   | [ZK-2079](http://tracker.zkoss.org/browse/ZK-2079): Add a custom attributes "org.zkoss.zul.tree.autohidePaging" for control autohide in internal paging component                               |
| 7.0.2   | April 2014     | Due to the better user-firendly for the scrollbar layout, we changed the org.zkoss.zul.nativebar of the library property to true by default for Grid, Listbox, Tree and Borderlayout component. |
| 7.0.3   | July 2014      | [ZK-2359](http://tracker.zkoss.org/browse/ZK-2359): Since ZK 7, the style class naming of autopaging has changed.                                                                               |
| 9.6.0   | Mar 2021       | [ZK-4795](http://tracker.zkoss.org/browse/ZK-4795): Grid/Listbox/Tree supports sticky column headers                                                                                            |
| 10.0.0  | Jan 2024       | [ZK-3853](http://tracker.zkoss.org/browse/ZK-3853): Tree supports 3-states selection model                                                                                                      |



[^1]: `The custom attribute could be specified in this component, or any of its ancestor. In addition, it could be specified as `[`a library property`]({{site.baseurl}}/zk_config_ref/the_library-property_element)` to enable or disable it for the whole application.`

[^2]: `The custom attribute could be specified in this component, or any of its ancestor. In addition, it could be specified as `[`a library property`]({{site.baseurl}}/zk_config_ref/the_library-property_element)` to enable or disable it for the whole application.`

[^3]: `Same as above.`
