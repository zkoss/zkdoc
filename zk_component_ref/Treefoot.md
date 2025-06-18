

# Treefoot

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.Treefoot</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.sel.Treefoot</javadoc>


# Employment/Purpose

A treefoot is main part of tree which contains set of footers. The set
of footers is defined by a number of treefooter components. Each column
will appear as a footer at the bottom of the tree.

# Example

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

`*`[` Treefooter`]({{site.baseurl}}/zk_component_ref/data/tree/treefooter)

# Use Cases

[ Tree]({{site.baseurl}}/zk_component_ref/data/tree#Use_Cases)

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


