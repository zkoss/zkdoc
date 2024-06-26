

# Hbox

- Demonstration: [Hbox](http://www.zkoss.org/zkdemo/layout/box)
- Java API: <javadoc>org.zkoss.zul.Hbox</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.box.Box</javadoc>
- Style Guide: [
  Hbox](ZK_Style_Guide/XUL_Component_Specification/Hbox)

# Employment/Purpose

The hbox component is used to layout its child components horizontally
and control those children's horizontal and vertical position..

## Recommend Hlayout

Notice that hbox and vbox are designed to provide a more sophisticated
layout, such as splitter, alignment, and packing. ZK renders these 2
components with an HTML table. If you only need the components for
layout, we suggest using [
Hlayout](ZK_Component_Reference/Layouts/Hlayout) and [
Vlayout](ZK_Component_Reference/Layouts/Vlayout) instead,
since the performance is much better (due to the use of HTML DIV instead
of TABLE).

# Example

<figure>
<img src="ZKComRef_Hbox_Simple_Examples.PNG"
title="ZKComRef_Hbox_Simple_Examples.PNG" />
<figcaption>ZKComRef_Hbox_Simple_Examples.PNG</figcaption>
</figure>

``` xml
<zk>
    <vbox>
        <button label="Button 1" />
        <button label="Button 2" />
    </vbox>
    <hbox>
        <button label="Button 3" />
        <button label="Button 4" />
    </hbox>
</zk>
```

# Properties

- **Inherited Properties**: [
  Box](ZK_Component_Reference/Containers/Box#Properties)

## Align and Pack

<figure>
<img src="ZKComRef_Hbox_Simple_Examples_align_pack.PNG"
title="ZKComRef_Hbox_Simple_Examples_align_pack.PNG" />
<figcaption>ZKComRef_Hbox_Simple_Examples_align_pack.PNG</figcaption>
</figure>

``` xml
<zk xmlns:n="native">
    <style content=".box {| class='wikitable' | 
    <custom-attributes 
        packs="${['', 'start', 'center', 'end']}"
        aligns="${['', 'stretch', 'start', 'center', 'end']}"
    />

    <vlayout>
        <hlayout height="70px" width="900px">
            <div hflex="1" vflex="1" sclass="box">
              <n:h3>pack / align</n:h3>
            </div>
            <div forEach="${packs}" hflex="1" vflex="1" sclass="box">
              <n:h3>${each}</n:h3>
            </div>
        </hlayout>
        <hlayout forEach="${aligns}" height="100px" width="900px">
            <custom-attributes align="${each}"/> 
            <div hflex="1" vflex="1" sclass="box">
              <n:h3>${align}</n:h3>
            </div>
          
            <hbox forEach="${packs}" align="${align}" pack="${each}" hflex="1" vflex="1" sclass="box">
                <button label="1" />
                <button label="2" />
                <button label="3" />
            </hbox>
        </hlayout>
    </vlayout>
</zk>
```

{% include versionSince\| 5.0.0 %}

# Cell Component

In ZK5, we have introduced a new component named Cell which can be
embedded into a Grid or Box (Hbox and Vbox) to fully control the layout
and the style. You can now use the rowspan or the colspan property to
layout your Grid, for example a content cell can now cross over multiple
rows. The code below demonstrates how to do this:

``` xml
<hbox>
    <cell sclass="years">
        ...
    </cell>
</hbox>
```

{% include versionSince\| 5.0.0 %}

# Limitation

Box component is consisted by Table element. Therefore, when put Input
element like Textbox, Combobox inside Box component, specify width and
height to Box component will be ignored when browser try to render table
element.

For example,

``` xml
<hbox height="200px" width="200px" style="border: 1px solid red">
    <textbox hflex="1" value="1" />
    <textbox hflex="1" value="1" />
</hbox>
```

You will see the Box width exceed 200px. Also check the
[sample](http://jsfiddle.net/A5g9q/) with pure HTML in jsfiddle.

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
  Box](ZK_Component_Reference/Containers/Box#Supported_Events)

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


