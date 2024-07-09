

# Absolutechildren

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.Absolutechildren</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.layout.Absolutechildren</javadoc>
- Style Guide: N/A

# Employment/Purpose

A container component that can contain any other ZK component and can
only be contained as direct child of Absolutelayout component. It can be
absolutely positioned within Absolutelayout component by either setting
"x" and "y" attribute or calling setX(int) and setY(int) methods.

# Example

<figure>
<img src="images/ZKComRef_Absolutelayout_Example.png
title="ZKComRef_Absolutelayout_Example.png" />
<figcaption>ZKComRef_Absolutelayout_Example.png</figcaption>
</figure>

``` xml
<?component name="window" extends="window" border="normal" width="300px" height="300px"?>
<zk>
    <absolutelayout>
        <absolutechildren id="w1" x="60" y="100">
            <window title="X=60, Y=100">
            Window 1
            </window>
        </absolutechildren>
        <absolutechildren id="w2" x="160" y="200">
            <window title="X=60, Y=100">
            Window 2
            </window>
        </absolutechildren>
        <absolutechildren id="w3" x="260" y="300">
            <window title="X=60, Y=100">
            Window 3
            </window>
        </absolutechildren>
    </absolutelayout>
</zk>
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

`*All`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date            | Content                                |
|---------|-----------------|----------------------------------------|
| 6.0.0   | October 4, 2011 | Add the new Absolutechildren component |


