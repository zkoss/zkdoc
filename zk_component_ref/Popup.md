

# Popup

- Demonstration: [Tooltips and Popup](http://www.zkoss.org/zkdemo/popup)
- Java API: <javadoc>org.zkoss.zul.Popup</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Popup</javadoc>


# Employment/Purpose

The popup is a container that does not have any special frame. You can
associate a popup with any component by specifying the popup's id at one
of the following attributes:

```xml
    <button popup="popup_id"/>
    <button tooltip="popup_id"/>
    <button context="popup_id"/>

    <popup id="popup_id">
        this is a popup
    </popup>
```

# Example

![](/zk_component_ref/images/ZKComRef_Popup.PNG)

```xml
<separator bar="true" />
<label value="Tooptip for Another Popup" tooltip="any" />
<popup id="any" width="300px">
    <vbox>
        ZK simply rich.
        <toolbarbutton label="ZK your killer Web application now!"
            href="http://www.zkoss.org" />
    </vbox>
</popup>
```

![](/zk_component_ref/images/ZKComRef_Popup2.PNG)

```xml
<textbox popup="popup, position=after_start"/>
<popup id="popup" width="300px">
    <vbox>
        ZK simply rich.
        <toolbarbutton label="ZK your killer Web application now!"
            href="http://www.zkoss.org" />
    </vbox>
</popup>
```

# Position

You can simply specify a popup's position when attaching to a component
by

- built-in position
- x, y coordinate

```xml
<button popup="popup_id, position=overlap_end"/>
<button popup="popup_id, x=50,y=50"/>
```

{% include version-badge.html version=6.0.1 %} ZK supports the following position
string:

![](/zk_component_ref/images/ZKComRef_Popup_Position_601.png)

overlap, overlap_end, overlap_before, overlap_after are kept (still
available) for backward compatibility. They are identical with top_left,
top_right, bottom_left, and bottom_right, respectively.

`Before 6.0.0`

The 14 possible positions are provided below:

![](/zk_component_ref/images/ZKComRef_Popup_Position.png)

The following illustrates the simplicity of usage,

```xml
<popup id="pp">
    Here is popup
</popup>
<button label="before_start" onClick='pp.open(self, "before_start");' />
```

Upon clicking the button the popup component will appear in the relative
position specified. In this case the position is just above the button.

![](/zk_component_ref/images/ZKComRef_Popup_Beforestart.png)

## Methods

There are several overloading open() methods available, please check
[javadoc](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Popup.html)

# Toggle Popup

{% include version-badge.html version=7.0.0 %} If a popup/context menu is assigned
to a target component via the popup/context attribute, the popup will
show up when the user clicks on the target component. Click the target
component again, the popup will still show up by default. As of 7.0.0,
The popup/context attribute supports an additional toggle type, which
could make the target component act as a toggle switcher. If the popup
has not shown up yet, clicking the target component will cause the popup
to show up. If the popup is showing up, clicking on the target component
again will toggle the popup to hide. The usage is in the below code.

```xml
<button label="Popup" popup="id, type=toggle"/>
```

# Tooltip Delay

The tooltip attribute can also support a delay, the following code
outlines how to accomplish this.

```xml
<label value="Tooltip" tooltip="popup_id, position=before_start, delay=500"/>
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
<td></td>
<td></td>
</tr>
<tr class="even">
<td><center>
<p><code>onOpen</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc> Denotes a Popup has
been opened or <strong>closed</strong> (in this case OpenEvent::isOpen()
returns false).</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

| Version | Description                                          | Example Location                                                                                                                                                                                 |
|---------|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 3.6     | Smalltalk: Toolbar and Menus                         | [ZK Developer's Reference: Tooltips, Context Menus and Popups]({{site.baseurl}}/zk_dev_ref/ui_patterns/tooltips,_context_menus_and_popups)                                               |
| 3.6     | A way to specify the position of the Popup component | [New Features of ZK 3.6.1](https://www.zkoss.org/wiki/Small_Talks/2009/April/New_Features_of_ZK_3.6.1#A_way_to_specify_the_position_of_the_Popup_component_A_way_to_specify_the_position_of_the_Popup_component) |
| 3.6     | Popup, tooltip and context positions                 | [New Features of ZK 3.6.3](https://www.zkoss.org/wiki/Small_Talks/2009/November/New_Features_of_ZK_3.6.3#Popup.2C_tooltip_and_context_positions_Popup,_tooltip_and_context_positions)                            |

# Version History



| Version | Date     | Content                   |
|---------|----------|---------------------------|
| 7.0.0   | Nov 2013 | Popup support toggle type |


