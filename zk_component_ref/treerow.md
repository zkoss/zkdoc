---
title: "Treerow"
---


- Demonstration: [Tree (Dynamic Styling)](http://www.zkoss.org/zkdemo/tree/dynamic_styling)
- Java API: [org.zkoss.zul.Treerow](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Treerow.html)
- JavaScript API: [zul.sel.Treerow](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.sel.Treerow.html)


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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[` Treecell`]({{site.baseurl}}/zk_component_ref/treecell)

# Use Cases

[ Tree]({{site.baseurl}}/zk_component_ref/tree#Use_Cases)

# Version History



| Version | Date       | Content                                                                     |
|---------|------------|-----------------------------------------------------------------------------|
| 5.0.1   | March 2010 | Allow the context, tooltip and popup properties to be specified in Treerow. |


