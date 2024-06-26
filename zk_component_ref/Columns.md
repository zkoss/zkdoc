

# Columns

- Demonstration: [Grid (Simple
  Grid)](http://www.zkoss.org/zkdemo/grid/simple)
- Java API: <javadoc>org.zkoss.zul.Columns</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.grid.Columns</javadoc>
- Style Guide: [
  Columns](ZK_Style_Guide/XUL_Component_Specification/Column)

# Employment/Purpose

Defines the columns of a grid.

Each child of a columns element should be a org.zkoss.zul.Column
element.

# Example

<figure>
<img src="ZKComRef_Grid_Example.png‎"
title="ZKComRef_Grid_Example.png‎" />
<figcaption>ZKComRef_Grid_Example.png‎</figcaption>
</figure>

``` xml
    <grid>
        <columns sizable="true">
            <column label="Type" hflex="min"/>
            <column label="Content"/>
        </columns>
        <rows>
            <row>
                <label value="File:"/>
                <textbox width="99%"/>
            </row>
            <row>
                <label value="Type:"/>
                <hbox>
                    <listbox rows="1" mold="select">
                        <listitem label="Java Files,(*.java)"/>
                        <listitem label="All Files,(*.*)"/>
                    </listbox>
                    <button label="Browse..."/>
                </hbox>
            </row>
            <row>
                <label value="Options:"/>
                <textbox rows="3" width="99%"/>
            </row>
        </rows>
    </grid>
```

# Properties

## Menupopup

By default, the `none` is assumed, you can specify the `auto` to show a
default menu on each column. Or you can provide your own menupopup for
each column.

### Auto

<figure>
<img src="ZKComRef_Grid_Columns_Menu.png"
title="ZKComRef_Grid_Columns_Menu.png" />
<figcaption>ZKComRef_Grid_Columns_Menu.png</figcaption>
</figure>

``` xml
    <grid>
        <columns menupopup="auto">
            <column label="Author" sort="auto"/>
            <column label="Title" sort="auto"/>
            <column label="Publisher" sort="auto"/>
            <column label="Hardcover" sort="auto"/>
        </columns>
```

### Customized Menupopup

<figure>
<img src="ZKComRef_Grid_Columns_Customized_Menu.png"
title="ZKComRef_Grid_Columns_Customized_Menu.png" />
<figcaption>ZKComRef_Grid_Columns_Customized_Menu.png</figcaption>
</figure>

``` xml
<window title="Column's Menu Demo" border="normal" width="500px">
    <menupopup id="editPopup">
        <menuitem label="Group" image="~./zul/img/grid/menu-group.png"/>
        <menuitem label="Sort Ascending" image="~./zul/img/grid/menu-arrowup.png"/>
        <menuitem label="Sort Descending" image="~./zul/img/grid/menu-arrowdown.png"/>
    </menupopup>
    <grid>
        <columns sizable="true" menupopup="editPopup">
            <column id="col" label="Type" sortAscending="&#36;{asc}" sortDescending="&#36;{dsc}"/>
            <column id="col1" label="Type1" sortAscending="&#36;{asc}" sortDescending="&#36;{dsc}"/>
            <column id="col2" label="Content"/>
        </columns>
    </grid>
</window>
```

As you can see, the example above specify a customized menupopup to the
columns as its column menu.

## Sizable

Specifies whether a user is allowed to resize a column's width by
dragging the vertical bar between two adjacent columns.

![](Sizable.png)

### Double-Click to Auto-Fit

In additions to dragging, an end user can double-click on the vertical
bar between two adjacent columns, such that the grid will automatically
resize the column to fit its contents. In other words, all sizable
column provides the auto-fitting feature.

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
  HeadersElement](ZK_Component_Reference/Base_Components/HeadersElement#Supported_Events)

# Supported Children

`*`[` Column`](ZK_Component_Reference/Data/Grid/Column)

# Use Cases

[ Grid](ZK_Component_Reference/Data/Grid#Use_Cases)

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


