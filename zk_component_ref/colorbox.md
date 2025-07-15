

# Colorbox

- Demonstration:
  [Colorbox](http://www.zkoss.org/zkdemo/input/color_picker)
- Java API: [org.zkoss.zkex.zul.Colorbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/zul/Colorbox.html)
- JavaScript API: [zkex.inp.Colorbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkex.inp.Colorbox.html)


{% include edition-availability.html edition="pe" %}

# Employment/Purpose

A Colorbox used to retrieve an input that the user can select a color.

# Example

![](/zk_component_ref/images/ZKComRef_Colorbox_Examples.PNG)

```xml
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

![](/zk_component_ref/images/ZKComRef_Colorbox_Examples2.PNG)

```xml
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
[org.zkoss.zk.ui.event.InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html) Notifies the
application with the onChange event if its content is changed</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*None`
