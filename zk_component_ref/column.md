---
title: "Column"
---


- Demonstration: [Grid (Simple Grid)](http://www.zkoss.org/zkdemo/grid/simple)
- Java API: [org.zkoss.zul.Column](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Column.html)
- JavaScript API: [zul.grid.Column](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.grid.Column.html)


# Employment/Purpose

A single column in a Columns element. Each child of the Column element
is placed in each successive cell of the grid. The column with the most
child elements determines the number of rows in each column. The use of
column is mainly to define attributes for each cell in the grid.

# Example

![](/zk_component_ref/images/ZKComRef_Grid_Example.png)

```xml
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

| Name | Event Type |
|---|---|
| `onSort` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.SortEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SortEvent.html) Denotes user has
sorted the row of this column. |
| `onGroup` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.SortEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SortEvent.html) <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}
Denotes user has grouped all the cells under a column. |
| `onUngroup` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.SortEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SortEvent.html) <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}
{% include version-badge.html version="6.5.0" %} Denotes user has ungrouped all the
cells under a column. |

- Inherited Supported Events: [ HeaderElement]({{site.baseurl}}/zk_component_ref/headerelement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

[ Grid]({{site.baseurl}}/zk_component_ref/grid#Use_Cases)

# Version History



| Version | Date      | Content                                                                                  |
|---------|-----------|------------------------------------------------------------------------------------------|
| 6.5.0   | June 2012 | [ZK-147](http://tracker.zkoss.org/browse/ZK-147): Support ungroup for grid's column menu |


