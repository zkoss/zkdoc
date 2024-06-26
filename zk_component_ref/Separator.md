

# Separator

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.Separator</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Separator</javadoc>
- Style Guide: [
  Separator](ZK_Style_Guide/XUL_Component_Specification/Separator)

# Employment/Purpose

A separator is used to insert a space between two components. There are
several ways to customize the separator.

- By use of the orient attribute, you are able to specify whether the
  separator is vertical or horizontal. By default it is a horizontal
  separator, which inserts a line break. On the other hand, a vertical
  separator inserts white space.
- By use of the bar attribute, you can control whether to show a
  horizontal or vertical line between components.
- By use of the spacing attribute, you can control the size of spacing.

# Example

<figure>
<img src="ZKComRef_Separator_Example.png"
title="ZKComRef_Separator_Example.png" />
<figcaption>ZKComRef_Separator_Example.png</figcaption>
</figure>

``` xml
 line 1 by separator
 <separator />
 line 2 by separator
 <separator />
 line 3 by separator
 <space bar="true" />
 another piece
 <separator spacing="20px" />
 line 4 by separator
 <space bar="true" spacing="20px" />
 another piece
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

`*NONE `

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


