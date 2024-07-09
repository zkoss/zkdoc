

# Colorbox

- Demonstration:
  [Colorbox](http://www.zkoss.org/zkdemo/input/color_picker)
- Java API: <javadoc>org.zkoss.zkex.zul.Colorbox</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zkex.inp.Colorbox</javadoc>
- Style Guide: [
  Colorbox](ZK_Style_Guide/XUL_Component_Specification/Colorbox)

{% include edition-availability.html edition=pe %}

# Employment/Purpose

A Colorbox used to retrieve an input that the user can select a color.

# Example

<figure>
<img src="images/ZKComRef_Colorbox_Examples.PNG
title="ZKComRef_Colorbox_Examples.PNG" />
<figcaption>ZKComRef_Colorbox_Examples.PNG</figcaption>
</figure>

``` xml
<colorbox color="#FFFFFF" />
```

# Key control

{% include version-badge.html version=6.0.0 %}

Pressing left, right, up, or down arrow keys to change the selected
color.

# Colorbox in Menu

By setting `content` attribute of <code>

<menu>

</code> to create a colorbox in menu.

<figure>
<img src="images/ZKComRef_Colorbox_Examples2.PNG
title="ZKComRef_Colorbox_Examples2.PNG" />
<figcaption>ZKComRef_Colorbox_Examples2.PNG</figcaption>
</figure>

``` xml
    <menubar id="menubar" >
        <menu label="Color" iconSclass="z-icon-binoculars">
            <menupopup>
                <menuitem label="Index" onClick="alert(self.label)" />
                <menu label="Color Picker" content="#color=#184dc6"/>
            </menupopup>
        </menu>
    </menubar>
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
<td><center>
<p>onChange</p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc> Notifies the
application with the onChange event if its content is changed</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*None`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


