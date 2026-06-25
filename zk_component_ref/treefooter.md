---
title: "Treefooter"
---

- **Demonstration:** N/A
- **Java API:** [org.zkoss.zul.Treefooter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Treefooter.html)
- **JavaScript API:**
  [zul.sel.Treefooter](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.sel.Treefooter.html)

# Employment/Purpose

A treefooter is a bottom column of tree, Its parent must be Treefoot.
You could place any child in a tree footer.

## Common Use Cases

- **Summarizing column data:** Place a `<treefooter>` inside `<treefoot>` to display totals, counts, or summary labels beneath each tree column — for example, showing a row count under the first column and an aggregate value under the second.
- **Spanning multiple columns:** Use the inherited `span` attribute (from `FooterElement`) to have a single footer cell stretch across several columns, useful when one summary applies to a whole group of columns.
- **Mixed content footers:** Because `<treefooter>` accepts `*ALL` children, you can embed a `<label>`, `<textbox>`, or any other ZUL component inside the footer cell for interactive or richly formatted summaries.

See also: [Tree — Use Cases]({{site.baseurl}}/zk_component_ref/tree#Use_Cases)

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

- Inherited Supported Events: [ FooterElement]({{site.baseurl}}/zk_component_ref/footerelement#Supported_Events)

# Supported Children

`*ALL`
