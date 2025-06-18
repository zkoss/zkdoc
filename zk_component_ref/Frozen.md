

# Frozen

- Demonstration: [Spreadsheet
  Functionalities](http://www.zkoss.org/zkdemo/grid/spreadsheet_functionalities)
- Java API: <javadoc>org.zkoss.zul.Frozen</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.mesh.Frozen</javadoc>


# Employment/Purpose

A frozen component to represent frozen "columns" in a Grid or a Listbox,
like MS Excel. Specify the `start` attribute to define the horizontal
scroll starting position.

# Example

![](/zk_component_ref/images/ZKComRef_Frozen_Example.png)

```xml
<grid width="600px">
    <frozen columns="2" start="1"/>
    <columns>
        <column width="50px">ID</column>
        <column width="50px">Priority</column>
        <column width="50px">Status</column>
        <column width="150px">Summary</column>
        <column width="250px">Detail</column>
        <column width="100px">Group</column>
        <column width="50px">Assign</column>
    </columns>
    <rows>
        <row>
            <cell>0001</cell>
            <cell>1</cell>
            <cell>closed</cell>
            <cell>Fix login issue</cell>
            <cell>Login does not work at all</cell>
            <cell>Account</cell>
            <cell>Bob</cell>
        </row>
        <row>
            <cell>0002</cell>
            <cell>3</cell>
            <cell>open</cell>
            <cell>Button style broken</cell>
            <cell>Check main.css</cell>
            <cell>Styling</cell>
            <cell>Alice</cell>
        </row>
        <row>
            <cell>0003</cell>
            <cell>2</cell>
            <cell>open</cell>
            <cell>Client search result</cell>
            <cell>Search service returns incomplete result</cell>
            <cell>Service</cell>
            <cell>Bob</cell>
        </row>
    </rows>
</grid>
```

# Smooth scrolling

{% include edition-availability.html edition="pe" %}{% include version-badge.html version=8.5.0 %} The frozen columns
position are maintained, and the other columns uses CSS scrolling to
move smoothly while the scroll position is updated.

# Column scrolling

 The frozen columns positions are maintained, and
the other columns are replaced while the scroll position is updated.

## Scroll to Hide Columns

{% include edition-availability.html edition="pe" %}{% include version-badge.html version=8.5.0 %} With smooth
scrolling, the Grid does not add white space to the last column by
default.

 With column scrolling, Grid will render extra space
(larger width) after the last column. So that you can drag to hide all
columns except the last one. ![](hide-columns.png)

# Frozen on the Right

{% include edition-availability.html edition="pe" %} {% include version-badge.html version=8.6.2 %}

Make columns frozen at the right-hand side.

```xml
<listbox>
    <frozen rightColumns="1"/>
...
</listbox>
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
  XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


