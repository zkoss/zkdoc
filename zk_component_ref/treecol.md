---
title: "Treecol"
---


- Demonstration: [Tree (Dynamic Styling)](http://www.zkoss.org/zkdemo/tree/dynamic_styling)
- Java API: [org.zkoss.zul.Treecol](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Treecol.html)
- JavaScript API: [zul.sel.Treecol](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.sel.Treecol.html)


# Employment/Purpose

A `treecol`is a top column of tree, Its parent must be `Treecols`.

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

| Name | Event Type |
|---|---|
| `onSort` | **Event:**
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes user has sorted
the treeitem of this treecol. |

- Inherited Supported Events: [ HeaderElement]({{site.baseurl}}/zk_component_ref/headerelement#Supported_Events)

# Supported Children

`*ALL`



# Version History



| Version | Date     | Content              |
|---------|----------|----------------------|
| 5.0.6   | Feb 2011 | Support onSort event |


