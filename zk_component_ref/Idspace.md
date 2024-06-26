

# Idspace

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.Idspace</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Idspace</javadoc>

# Employment/Purpose

`Idspace` is just like a
[Div](ZK_Component_Reference/Containers/Div) but implements
the [ID
space](ZK_Developer's_Reference/UI_Composing/ID_Space), all
descendant components of Idspace (including the Idspace itself) form an
independent ID space. Thus, you could use an idspace as the topmost
component to group components. This way developers only need to maintain
the uniqueness of each subset separately.

{% include versionSince\| 8.0.3 %}

To group components without rendering a Div, `Idspace` provides "nodom"
mold. It would render no-dom widget in client-side. It only renders
comment nodes for positioning.

Notice that it's not recommended to use hflex/vflex in the children of
nodom element.

# Example

<figure>
<img src="ZKComRef_Idspace_Example.png"
title="ZKComRef_Idspace_Example.png" />
<figcaption>ZKComRef_Idspace_Example.png</figcaption>
</figure>

``` xml
<idspace>
    <window border="normal">
        <button id="btn" label="button" />
    </window>
    <div>
        <button id="btn" label="button" />
    </div>
</idspace>
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

`*ALL`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


