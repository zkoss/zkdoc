

# Treefooter

- Demonstration: N/A
- Java API: [org.zkoss.zul.Treefooter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Treefooter.html)
- JavaScript API:
  <javadoc directory="jsdoc">zul.sel.Treefooter</javadoc>


# Employment/Purpose

A treefooter is a bottom column of tree, Its parent must be Treefoot.
You could place any child in a tree footer.

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

- Inherited Supported Events: [ FooterElement]({{site.baseurl}}/zk_component_ref/base_components/footerelement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

[ Tree]({{site.baseurl}}/zk_component_ref/data/tree#Use_Cases)

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


