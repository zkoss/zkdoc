---
title: "Tablelayout"
description: "Tablelayout lays out a container as an HTML table in which the columns can be specified, and rowspan and colspan of its child can also be specified to…"
---

- **Demonstration:** [Tablelayout](http://www.zkoss.org/zkdemo/layout/table_layout)
- **Java API:** [org.zkoss.zkmax.zul.Tablelayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Tablelayout.html)
- **JavaScript API:** [zkmax.layout.Tablelayout](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Tablelayout.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

{% include supported-since.html version="6.0.0" %}

# Employment/Purpose

Tablelayout lays out a container as an HTML table in which the columns
can be specified, and rowspan and colspan of its child can also be
specified to create complex layouts within the table.

## Common Use Cases

- **Fixed-column grid layout** — set `columns` to the desired number and add one `<tablechildren>` per cell; the layout engine wraps cells into rows automatically.
- **Complex spans** — nest a `<tablechildren>` with `colspan` or `rowspan` attributes to merge cells, enabling dashboard-style arrangements without nesting extra containers.

# Example

![Tablelayout Example](/zk_component_ref/images/ZKComRef_Tablelayout_Example.PNG)

```xml
<tablelayout columns="2">
    <tablechildren>
        <panel title="Table 1" border="normal" maximizable="true"
            collapsible="true" width="200px" height="200px">
            <panelchildren>Panel Content</panelchildren>
        </panel>
    </tablechildren>
    <tablechildren>
        <panel title="Table 2" border="normal" maximizable="true"
            collapsible="true" width="200px" height="200px">
            <panelchildren>Panel Content</panelchildren>
        </panel>
    </tablechildren>
    <tablechildren>
        <panel title="Table 3" border="normal" maximizable="true"
            collapsible="true" width="200px" height="200px">
            <panelchildren>Panel Content</panelchildren>
        </panel>
    </tablechildren>
    <tablechildren>
        <panel title="Table 4" border="normal" maximizable="true"
            collapsible="true" width="200px" height="200px">
            <panelchildren>Panel Content</panelchildren>
        </panel>
    </tablechildren>
</tablelayout>
```

The child of tablechildren can be any component:

![Tablelayout Example ZK6](/zk_component_ref/images/ZKComRef_Tablelayout_Example_ZK6.PNG)

```xml
<tablelayout columns="2">
    <tablechildren>
        <label value="Table 1" />
    </tablechildren>
    <tablechildren>
        <button label="Table 2" />
    </tablechildren>
    <tablechildren>
        <textbox value="Table 3" />
    </tablechildren>
    <tablechildren>
        <window border="normal">
            Table 4
        </window>
    </tablechildren>
</tablelayout>
```

# Properties

## Columns

**Default Value:** `1`

Sets the number of columns in the table layout. The value must be a positive integer; a value of zero or less throws a `WrongValueException`. Each `<tablechildren>` child occupies one cell; when the number of children exceeds `columns`, a new row is started automatically.

```xml
<tablelayout columns="3">
    <tablechildren><label value="Cell 1"/></tablechildren>
    <tablechildren><label value="Cell 2"/></tablechildren>
    <tablechildren><label value="Cell 3"/></tablechildren>
    <tablechildren><label value="Cell 4 — wraps to row 2"/></tablechildren>
</tablelayout>
```

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[` Tablechildren`]({{site.baseurl}}/zk_component_ref/tablechildren)
