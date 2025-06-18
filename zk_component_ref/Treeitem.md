

# Treeitem

- Demonstration: [Tree (Dynamic Styling)](http://www.zkoss.org/zkdemo/tree/dynamic_styling)
- Java API: <javadoc>org.zkoss.zul.Treeitem</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.sel.Treeitem</javadoc>


# Employment/Purpose

`Treeitem`contains a row of data (`treerow),`and an optional
treechildren.

If the component doesn't contain a `treechildren,`it is a leaf node that
doesn't accept any child items.

If it contains a `treechildren,`it is a branch node that might contain
other items.

For a branch node, an +/- button will appear at the beginning of the
row, such that user could open and close the item by clicking on the +/-
button.

# Example

![](/zk_component_ref/images/ZKComRef_Treeitem.png)

```xml

<window title="tree demo" border="normal" width="400px">
    <tree id="tree" width="90%">
        <treecols sizable="true">
            <treecol label="Name" />
            <treecol label="Description" />
        </treecols>
        <treechildren>
            <treeitem>
                <treerow>
                    <treecell>
                        <image src="/img/folder.gif" />
                        Item 1
                    </treecell>
                    <treecell>
                        <textbox value="Item 1 description" />
                    </treecell>
                </treerow>
            </treeitem>
            <treeitem>
                <treerow>
                    <treecell label="Item 2" />
                    <treecell label="Item 2 description" />
                </treerow>
                <treechildren>
                    <treeitem open="false">
                        <treerow>
                            <treecell label="Item 2.1">
                                <image src="/img/folder.gif" />
                            </treecell>
                        </treerow>
                        <treechildren>
                            <treeitem>
                                <treerow>
                                    <treecell label="Item 2.1.1" />
                                </treerow>
                            </treeitem>
                        </treechildren>
                    </treeitem>
                </treechildren>
            </treeitem>
            <treeitem label="Item 3" />
        </treechildren>
    </tree>
 </window>
```

More examples please refer to [ Tree]({{site.baseurl}}/zk_component_ref/data/tree#The_open_Property_and_the_onOpen_Event)

# Label and Image

Treeitem provides
<javadoc method="setImage(java.lang.String)">org.zkoss.zul.Treeitem</javadoc>
and
<javadoc method="setLabel(java.lang.String)">org.zkoss.zul.Treeitem</javadoc>
to simplify the assignment of image and label to a treeitem. However,
they are actually placed in the first treecell (of the child treerow).
Furthermore, if the treecell or treerow are not created, they will be
created automatically. For example,

```xml
<treeitem label="hello"/>
```

is equivalent to

```xml
<treeitem>
  <treerow>
    <treecell label="hello"/>
  </treerow>
```

It also means you cannot attach a treerow child to the treeitem, after
setImage or setLabel was invoked. It means, though a bit subtle, the
following will cause an exception:

```xml
<treeitem label="hello"> <!-- treerow is created automatically because of setLabel -->
  <treerow/> <!-- exception since only one treerow is allowed per treeitem -->
</treeitem>
```

# Selectable treeitem

By default, all treeitems are selectable (they can be selected with
mouse or keyboard).

It is possible to set a Treeitem to non-selectable, using either
`myTreeitem.setSelected(false)` or <treeitem selectable="false"> in zul.

If the tree uses a TreeModel which implements
`org.zkoss.zul.ext.TreeSelectableModel`, the selectable status of
individual treeitems will be ignored, and the selectable status will be
retrieved from the treemodel instead.

NOTE: the out-of-the-box `org.zkoss.zul.DefaultTreeModel`<E> implements
`org.zkoss.zul.ext.TreeSelectableModel` with a default SelectionControl
always returning True (meaning that by default, all TreeItems will be
marked as selectable during rendering)

Refer to
[{{site.baseurl}}/zk_dev_ref/mvc/model/tree_model#Selection]({{site.baseurl}}/zk_dev_ref/mvc/model/tree_model#Selection)
in regard to SelectionControl customization.

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
<p><code>onOpen</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc> Denotes user has
opened or closed a component. It is useful to implement load-on-demand
by listening to the onOpen event, and creating components when the first
time the component is opened.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*`[` Treerow`]({{site.baseurl}}/zk_component_ref/data/tree/treerow)`, `[` Treechildren`]({{site.baseurl}}/zk_component_ref/data/tree/treechildren)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


