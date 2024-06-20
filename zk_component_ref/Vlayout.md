{% include ZKComponentReferencePageHeader %}

# Vlayout

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.Vlayout</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.layout.Vlayout</javadoc>

# Employment/Purpose

The vlayout component is a simple vertical oriented layout. Added
components will be placed underneath each other in a column.

Notice that hlayout and vlayout do not support splitter, alignment and
packing. If you need them, please use [ZK Component
Reference/Layouts/Hbox](ZK_Component_Reference/Layouts/Hbox)
and [ZK Component
Reference/Layouts/Vbox](ZK_Component_Reference/Layouts/Vbox)
instead.

# Example

<figure>
<img src="ZKComRef_Hlayout_Simple_Example.PNG"
title="ZKComRef_Hlayout_Simple_Example.PNG" />
<figcaption>ZKComRef_Hlayout_Simple_Example.PNG</figcaption>
</figure>

``` xml
<zk>
     <vlayout>
         <button label="Button 1"/>
         <button label="Button 2"/>
     </vlayout>
     <hlayout>
         <button label="Button 3"/>
         <button label="Button 4"/>
     </hlayout>
</zk>
```

# Spacing

The default spacing between two child components is `0.3em`. You could
modify it if you like:

``` xml
<hlayout spacing="0">
  <textbox/>
  <button label="Click Me"/>
</hlayout>
```

# Resize Child Components' Height Dynamically

When a Vlayout's content changes (e.g. adding / removing components or
component's visibility changes), it will resize all its child
components' height dynamically.

The window's height below (line 6) will grow when we hide the
blue-background div. This also works for `vflex="min"` which doesn't
auto resize in a normal case.

``` xml
    <vlayout height="400px" style="border: solid 1px">
        <button onClick="div.setVisible(false)" label="hide the blue box below"/>
        <div style="height: 400px;background-color: lightblue" id="div">
            box
        </div>
        <window border="normal" vflex="1">
            0px height at first
        </window>
    </vlayout>
```

# Horizontal Alignment

The default align is left. You can change by specifying a CSS rule at
"style": `text-align:right`, `text-align:center`

``` XML
        <vlayout style="text-align:right">
            <button/>
            <button/>
            <button/>
        </vlayout>
```

# Supported events

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

# Supported Children

`*ALL`

# Version History

{% include LastUpdated %}

| Version | Date         | Content             |
|---------|--------------|---------------------|
| 5.0.4   | August, 2010 | new added component |

{% include ZKComponentReferencePageFooter %}
