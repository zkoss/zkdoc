

# Treechildren

- Demonstration: [Tree (Dynamic
  Styling)](http://www.zkoss.org/zkdemo/tree/dynamic_styling)
- Java API: <javadoc>org.zkoss.zul.Treechildren</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.sel.Treechildren</javadoc>
- Style Guide: [
  Treechildren](ZK_Style_Guide/XUL_Component_Specification/Treechildren)

# Employment/Purpose

`Treechildren`contains a collection of treeitem components. It is main
body of the `Tree`and it also the main body of a `Treeitem`'s children.

You can change the page size of each `treechildren`instance by modifying
the `pageSize`property

# Example

![](images/ZKComRef_Treeitem.png)

``` xml
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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*`[` Treeitem`](ZK_Component_Reference/Data/Tree/Treeitem)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


