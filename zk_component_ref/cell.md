---
title: "Cell"
---


- Demonstration: [Grid (Spreadsheet Functionalities)](http://www.zkoss.org/zkdemo/grid/spreadsheet_functionalities)
- Java API: [org.zkoss.zul.Cell](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Cell.html)
- JavaScript API: [zul.wgt.Cell](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Cell.html)


# Employment/Purpose

We design this generic cell component to be embedded into [ Row]({{site.baseurl}}/zk_component_ref/row) or [ Hbox]({{site.baseurl}}/zk_component_ref/hbox) or [ Vbox]({{site.baseurl}}/zk_component_ref/vbox) in order to fully
control the alignment and row/column span.

# Example

![](/zk_component_ref/images/ZKComRef_Cell_Example.png)

```xml
<zk>
    <grid>
        <columns>
            <column label="A" />
            <column label="B" />
            <column label="C" />
            <column label="D" />
        </columns>
        <rows>
            <row>
                <cell rowspan="4" align="center" valign="bottom">
                    <label value="item 1" />
                </cell>
                <cell colspan="3">
                    <label value="item 2" />
                </cell>
            </row>
            <row>
                <cell colspan="2"  align="center">
                    <label value="item 3" />
                </cell>
                <label value="item 4" />
            </row>
            <row>
                <label value="item 5" />
                <label value="item 6" />
                <label value="item 7" />
            </row>
            <row>
                <label value="item 8" />
                <label value="item 9" />
                <label value="item 10" />
            </row>
        </rows>
    </grid>
</zk>
```

![](/zk_component_ref/images/ZKComRef_Cell_Example_Hbox.png)

```xml
<zk>
    <window title="hbox" border="normal" width="320px">
        <hbox width="300px" pack="center">
            <cell hflex="1" align="center">
                <label value="item 1" />
            </cell>
            <cell hflex="1" align="center">
                <label value="item 2" />
            </cell>
        </hbox>
    </window>
</zk>
```

# Properties

## The Rowspan Property

It specifies the number of rows this cell should occupy. It has the same
effect as HTML TR tag's rowspan attribute does.

# Miscellaneous

## Comparison to default (no Cell) scenario

The Cell component is meant to provide full controll of the DOM
structure, so the user needs to expect to handle some lower level
styling.

For example, consider the following scenario:

```xml
    <grid>
        <columns>
            <column label="A" />
            <column label="B" />
        </columns>
        <rows>
            <row>
                <label>A</label>
                <cell>
                    <label>B</label>
                </cell>
            </row>
        </rows>
    </grid>
```

Although they look alike, the DOM structures generated for the two table
cells are slightly different:

![](/zk_component_ref/images/ZK5ComRef_Cell_DOM_Comparison.png)

With a Cell component given, there is no inner `<div>` element
generated, which grants you a more flexible control to the DOM
structure, but as a result you may need to provide more style handling.
It is also recommended to use Cell for handling row span, column span,
and alignment. In neither of the above cases, it is recommended not to
use Cell. To put more than 1 Component in a grid cell, you can also use
a Div to wrap them.

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*ALL`
