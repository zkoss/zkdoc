---
title: "Rows"
---

- **Demonstration:** [Grid (Simple Grid)](http://www.zkoss.org/zkdemo/grid/simple)
- **Java API:** [org.zkoss.zul.Rows](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Rows.html)
- **JavaScript API:** [zul.grid.Rows](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.grid.Rows.html)

# Employment/Purpose

Defines the rows of a grid. Each child of a rows element should be a
[org.zkoss.zul.Row](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Row.html) element.

## Common Use Cases

### Displaying Static Form-Like Layouts

Use `<rows>` with explicit `<row>` children to build label-input grids without a data model.

```xml
<grid>
    <columns>
        <column label="Field" width="120px"/>
        <column label="Value"/>
    </columns>
    <rows>
        <row>
            <label value="Name:"/>
            <textbox/>
        </row>
        <row>
            <label value="Email:"/>
            <textbox/>
        </row>
    </rows>
</grid>
```

### Grouping Rows with Group and Groupfoot

`<rows>` may contain [`<group>`]({{site.baseurl}}/zk_component_ref/group) and [`<groupfoot>`]({{site.baseurl}}/zk_component_ref/groupfoot) elements alongside `<row>` to render collapsible category sections inside a grid.

```xml
<grid>
    <columns>
        <column label="Item"/>
        <column label="Price"/>
    </columns>
    <rows>
        <group label="Fruits"/>
        <row><label value="Apple"/><label value="$1.00"/></row>
        <row><label value="Banana"/><label value="$0.50"/></row>
        <groupfoot><label value="Subtotal"/><label value="$1.50"/></groupfoot>
    </rows>
</grid>
```

# Example

![Grid Example](/zk_component_ref/images/ZKComRef_Grid_Example.png)

```xml
<window title="Grid Demo" border="normal" width="360px">
    <zscript>
        class Comp implements Comparator {
        private boolean _asc;
        public Comp(boolean asc) {
        _asc = asc;
        }
        public int compare(Object o1, Object o2) {
        String s1 = o1.getChildren().get(0).getValue(),
        s2 = o2.getChildren().get(0).getValue();
        int v = s1.compareTo(s2);
        return _asc ? v: -v;
        }
        }
        Comp asc = new Comp(true), dsc = new Comp(false);
     </zscript>
    <grid>
        <columns sizable="true">
            <column label="Type" sortAscending="&#36;{asc}"
                sortDescending="&#36;{dsc}" width="50px"/>
            <column label="Content" />
        </columns>
        <rows>
            <row>
                <label value="File:" />
                <textbox width="99%" />
            </row>
            <row>
                <label value="Type:" />
                <hbox>
                    <listbox rows="1" mold="select">
                        <listitem label="Java Files,(*.java)" />
                        <listitem label="All Files,(*.*)" />
                    </listbox>
                    <button label="Browse..." />
                </hbox>
            </row>
            <row>
                <label value="Options:" />
                <textbox rows="3" width="99%" />
            </row>
        </rows>
    </grid>
</window>
```

# Supported Events

Inherits supported events from [XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events). No additional events are introduced by this component.

# Supported Children

`*`[` Row`]({{site.baseurl}}/zk_component_ref/row)`, `[` Group`]({{site.baseurl}}/zk_component_ref/group)`, `[` Groupfoot`]({{site.baseurl}}/zk_component_ref/groupfoot)
