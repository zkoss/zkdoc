# Cell

- Demonstration: [Grid (Spreadsheet
  Functionalities)](http://www.zkoss.org/zkdemo/grid/spreadsheet_functionalities)
- Java API: <javadoc>org.zkoss.zul.Cell</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Cell</javadoc>
- Style Guide: [
  Cell](ZK_Style_Guide/XUL_Component_Specification/Cell)

# Employment/Purpose

We design this generic cell component to be embedded into [
Row](ZK_Component_Reference/Data/Grid/Row) or [
Hbox](ZK_Component_Reference/Layouts/Hbox) or [
Vbox](ZK_Component_Reference/Layouts/Vbox) in order to fully
control the alignment and row/column span.

# Example

<figure>
<img src="ZKComRef_Cell_Example.png"
title="ZKComRef_Cell_Example.png" />
<figcaption>ZKComRef_Cell_Example.png</figcaption>
</figure>

``` xml
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

<figure>
<img src="ZKComRef_Cell_Example_Hbox.png"
title="ZKComRef_Cell_Example_Hbox.png" />
<figcaption>ZKComRef_Cell_Example_Hbox.png</figcaption>
</figure>

``` xml
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

``` xml
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

<figure>
<img src="ZK5ComRef_Cell_DOM_Comparison.png"
title="ZK5ComRef_Cell_DOM_Comparison.png" />
<figcaption>ZK5ComRef_Cell_DOM_Comparison.png</figcaption>
</figure>

With a Cell component given, there is no inner `<div>` element
generated, which grants you a more flexible control to the DOM
structure, but as a result you may need to provide more style handling.
It is also recommended to use Cell for handling row span, column span,
and alignment. In neither of the above cases, it is recommended not to
use Cell. To put more than 1 Component in a grid cell, you can also use
a Div to wrap them.

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

`*ALL`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
