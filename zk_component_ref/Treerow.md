

# Treerow

- Demonstration: [Tree (Dynamic Styling)](http://www.zkoss.org/zkdemo/tree/dynamic_styling)
- Java API: <javadoc>org.zkoss.zul.Treerow</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.sel.Treerow</javadoc>


# Employment/Purpose

Treerow is a single row in the tree. It is the main content of treeitem.
Treerow can contains multiple treecell, each treecell represent one
column in this row by sequencial. A treecell can contains any component
in it, such as label, image, textbox etc.

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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*`[` Treecell`]({{site.baseurl}}/zk_component_ref/data/tree/treecell)

# Use Cases

[ Tree]({{site.baseurl}}/zk_component_ref/data/tree#Use_Cases)

# Version History



| Version | Date       | Content                                                                     |
|---------|------------|-----------------------------------------------------------------------------|
| 5.0.1   | March 2010 | Allow the context, tooltip and popup properties to be specified in Treerow. |


