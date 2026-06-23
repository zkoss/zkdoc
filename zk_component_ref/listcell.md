---
title: "Listcell"
---

- **Demonstration:** [Listbox (Keystroke Command)](http://www.zkoss.org/zkdemo/listbox/keystroke_command)
- **Java API:** [org.zkoss.zul.Listcell](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listcell.html)
- **JavaScript API:** [zul.sel.Listcell](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.sel.Listcell.html)

# Employment/Purpose

A list cell.

## Common Use Cases

- **Tabular data display** — place one `<listcell>` per column inside a `<listitem>` to populate a row of a `<listbox>`, showing text, images, or nested components in each cell.
- **Column spanning** — use the `span` attribute to merge two or more adjacent cells into a single wide cell, useful for summary rows or section dividers within a list.
- **Tagging rows with domain data** — store a domain object (e.g. a database ID or a DTO) in the `value` attribute so that event listeners can retrieve it without searching the data model.

# Example

[ Listbox]({{site.baseurl}}/zk_component_ref/listbox#Example)

# Properties

## Span

**Default Value:** `1`

Sets the number of columns this cell spans — equivalent to the `colspan` attribute of an HTML `<td>`. A value greater than `1` causes the cell to occupy that many adjacent column positions in the row.

```xml
<listbox>
    <listhead>
        <listheader label="Name"/>
        <listheader label="Age"/>
        <listheader label="Address"/>
    </listhead>
    <listitem>
        <listcell label="Jane Doe" span="2"/>
        <listcell label="123 Main St"/>
    </listitem>
</listbox>
```

## Value

**Default Value:** `null`

Attaches an arbitrary application-defined value to this cell. The value is not rendered and has no effect on the UI; it exists solely for the application to associate domain data with the cell. Any Java object may be stored here.

Because the value is an arbitrary Java object, set it from a `<zscript>` block or a ViewModel/composer and reference it via EL:

```xml
<zscript>
    // Any object can be stored as the cell value.
    Object payload = new Object[] { "order-42", 99.99 };
</zscript>
<listbox>
    <listitem>
        <listcell label="Order #42" value="${payload}"/>
    </listitem>
</listbox>
```

# Supported Events

Listcell does not define any own events. Inherited events are listed on the [LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement#Supported_Events) ancestor page.

# Supported Children

`*ALL`
