

# Column

- Demonstration: [Grid (Simple
  Grid)](http://www.zkoss.org/zkdemo/grid/simple)
- Java API: <javadoc>org.zkoss.zul.Column</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.grid.Column</javadoc>
- Style Guide:
  [Column](ZK_Style_Guide/XUL_Component_Specification/Column)

# Employment/Purpose

A single column in a Columns element. Each child of the Column element
is placed in each successive cell of the grid. The column with the most
child elements determines the number of rows in each column. The use of
column is mainly to define attributes for each cell in the grid.

# Example

<figure>
<img src="images/ZKComRef_Grid_Example.png‎
title="ZKComRef_Grid_Example.png‎" />
<figcaption>ZKComRef_Grid_Example.png‎</figcaption>
</figure>

``` xml
    <window title="Grid Demo" border="normal" width="50%">
        <grid>
            <columns sizable="true">
                <column label="Type" hflex="min"/>
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
                        <listbox mold="select">
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
<td><center>
<p><code>onSort</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.SortEvent</javadoc> Denotes user has
sorted the row of this column.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onGroup</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.SortEvent</javadoc> {% include edition-availability.html edition=pe %}
Denotes user has grouped all the cells under a column.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onUngroup</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.SortEvent</javadoc> {% include edition-availability.html edition=pe %}
{% include version-badge.html version=6.5.0 %} Denotes user has ungrouped all the
cells under a column.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  HeaderElement](ZK_Component_Reference/Base_Components/HeaderElement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

[ Grid](ZK_Component_Reference/Data/Grid#Use_Cases)

# Version History



| Version | Date      | Content                                                                                  |
|---------|-----------|------------------------------------------------------------------------------------------|
| 6.5.0   | June 2012 | [ZK-147](http://tracker.zkoss.org/browse/ZK-147): Support ungroup for grid's column menu |


