# Tablelayout

- Demonstration:
  [Tablelayout](http://www.zkoss.org/zkdemo/layout/table_layout)
- Java API: <javadoc>org.zkoss.zkmax.zul.Tablelayout</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zkmax.layout.Tablelayout</javadoc>
- Style Guide: [
  TableLayout](ZK_Style_Guide/XUL_Component_Specification/Tablelayout)

# Employment/Purpose

Tablelayout lays out a container as an HTML table in which the columns
can be specified, and rowspan and colspan of its child can also be
specified to create complex layouts within the table.

# Example

<figure>
<img src="ZKComRef_Tablelayout_Example.PNG"
title="ZKComRef_Tablelayout_Example.PNG" />
<figcaption>ZKComRef_Tablelayout_Example.PNG</figcaption>
</figure>

``` xml
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

<figure>
<img src="ZKComRef_Tablelayout_Example_ZK6.PNG‎"
title="ZKComRef_Tablelayout_Example_ZK6.PNG‎" />
<figcaption>ZKComRef_Tablelayout_Example_ZK6.PNG‎</figcaption>
</figure>

``` xml
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

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*`[` Tablechildren`](ZK_Component_Reference/Layouts/Tablelayout/TableChildren)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
