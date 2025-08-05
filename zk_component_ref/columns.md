
- Demonstration: [Grid (Simple Grid)](http://www.zkoss.org/zkdemo/grid/simple)
- Java API: [org.zkoss.zul.Columns](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Columns.html)
- JavaScript API: [zul.grid.Columns](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.grid.Columns.html)


# Employment/Purpose

Defines the columns of a grid.

Each child of a columns element should be a org.zkoss.zul.Column
element.

# Example

![](/zk_component_ref/images/ZKComRef_Grid_Example.png)

```xml
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

![](/zk_component_ref/images/ZKComRef_Grid_Columns_Menu.png)

```xml
    <grid>
        <columns menupopup="auto">
            <column label="Author" sort="auto"/>
            <column label="Title" sort="auto"/>
            <column label="Publisher" sort="auto"/>
            <column label="Hardcover" sort="auto"/>
        </columns>
```

### Customized Menupopup

![](/zk_component_ref/images/ZKComRef_Grid_Columns_Customized_Menu.png)

```xml
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

![](/zk_component_ref/images/Sizable.png)

### Double-Click to Auto-Fit

In additions to dragging, an end user can double-click on the vertical
bar between two adjacent columns, such that the grid will automatically
resize the column to fit its contents. In other words, all sizable
column provides the auto-fitting feature.

# Supported Events

- Inherited Supported Events: [ HeadersElement]({{site.baseurl}}/zk_component_ref/headerselement#Supported_Events)

# Supported Children

`*`[` Column`]({{site.baseurl}}/zk_component_ref/column)

# Use Cases

[ Grid]({{site.baseurl}}/zk_component_ref/grid#Use_Cases)



