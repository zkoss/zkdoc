---
title: "Frozen"
---


- Demonstration: [Spreadsheet Functionalities](http://www.zkoss.org/zkdemo/grid/spreadsheet_functionalities)
- Java API: [org.zkoss.zul.Frozen](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Frozen.html)
- JavaScript API: [zul.mesh.Frozen](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.mesh.Frozen.html)


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

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}{% include supported-since.html version="8.5.0" %} The frozen columns
position are maintained, and the other columns uses CSS scrolling to
move smoothly while the scroll position is updated.

# Column scrolling

 The frozen columns positions are maintained, and
the other columns are replaced while the scroll position is updated.

## Scroll to Hide Columns

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}{% include supported-since.html version="8.5.0" %} With smooth
scrolling, the Grid does not add white space to the last column by
default.

 With column scrolling, Grid will render extra space
(larger width) after the last column. So that you can drag to hide all
columns except the last one. ![](/zk_component_ref/images/hide-columns.png)

# Frozen on the Right

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} {% include supported-since.html version="8.6.2" %}

Make columns frozen at the right-hand side.

```xml
<listbox>
    <frozen rightColumns="1"/>
...
</listbox>
```

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*ALL`
