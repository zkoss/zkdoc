

# Treefoot

- Demonstration: N/A
- Java API: [org.zkoss.zul.Treefoot](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Treefoot.html)
- JavaScript API: [zul.sel.Treefoot](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.sel.Treefoot.html)


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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[` Treefooter`]({{site.baseurl}}/zk_component_ref/treefooter)

# Use Cases

[ Tree]({{site.baseurl}}/zk_component_ref/tree#Use_Cases)



