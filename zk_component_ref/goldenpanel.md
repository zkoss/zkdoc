

# GoldenPanel

- Java API: [org.zkoss.zkmax.zul.GoldenPanel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/GoldenPanel.html)
- JavaScript API:
  [zkmax.layout.GoldenPanel](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.GoldenPanel.html)
- <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

{% include version-badge.html version=8.6.0 %}

# Employment/Purpose

GoldenPanel is the only child type of GoldenLayout. It allows us to
rearrange them by dragging the tab.

# Example

![](/zk_component_ref/images/ZKCompRef_GoldenLayout.png )

```xml
    <goldenlayout vflex="1" hflex="1">
        <attribute name="areas">
            A A B
            A A B
            C C D
        </attribute>
        <goldenpanel area="A" title="Panel A">
            <window vflex="1" title="Window inside GoldenPanel A" border="normal"/>
        </goldenpanel>
        <goldenpanel area="B" title="Panel B">
            <button label="Button inside GoldenPanel B"/>
        </goldenpanel>
        <goldenpanel area="C" title="Panel C">
            <vlayout>
                SplitLayout inside GoldenPanel C
                <splitlayout hflex="1" height="500px">
                    <tbeditor vflex="1"/>
                    <window border="normal" title="Window" vflex="1"/>
                </splitlayout>
            </vlayout>
        </goldenpanel>
        <goldenpanel area="D" title="Panel D">
            <vlayout>
                Rating inside GoldenPanel D
                <rating max="10" rating="8"/>
            </vlayout>
        </goldenpanel>
    </goldenlayout>
```

# Properties and Features

## Area

The `area` attribute is a sugar for initializing the layout. The
GoldenPanels with the same `area` will be stacked together with the
added order. And will be placed at the position of the area in the
`areas` attribute of it's parent GoldenLayout.

## Title

The `title` attribute is the text on the tab of the GoldenPanel. If not
specified, tab will still be rendered but with default title `Panel`.

## Draggable

If false is specified, This GoldenPanel will not be able to dragged.

## Droppable

If false is specified, No other GoldenPanel is allowed to be dropped on
this GoldenPanel.

## Closable

If false is specified, This GoldenPanel will not be able to be close by
user action. And also the close icon will not show.

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
<p>`onActive`</p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes user has
activated this GoldenPanel.</p></td>
</tr>
<tr class="even">
<td><center>
<p>`onPanelDrop`</p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes user has dropped
this GoldenPanel.</p></td>
</tr>
<tr class="odd">
<td><center>
<p>`onFlexSize`</p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes user has resized
this GoldenPanel.</p></td>
</tr>
<tr class="even">
<td><center>
<p>`onClose`</p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes user has closed
this GoldenPanel.</p></td>
</tr>
<tr class="odd">
<td><center>
<p>`onMaximize`</p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes user has
maximized this GoldenPanel.</p></td>
</tr>
<tr class="even">
<td><center>
<p>`onMinimize`</p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes user has
minimized this GoldenPanel.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`* All`



